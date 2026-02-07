"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

interface MinimapProps {
    scrollContainerSelector: string;
}

const MINIMAP_WIDTH = 108;
const SCALE = 0.11;
const LINE_HEIGHT = 3;
const LINE_GAP = 1;

// Seeded random for consistent rendering (no flicker)
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Snap to whole pixel for maximum crispness
function snap(v: number) {
    return Math.round(v);
}

export default function Minimap({ scrollContainerSelector }: MinimapProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const dragStartRef = useRef<{ y: number; scrollTop: number } | null>(null);
    const scrollElRef = useRef<HTMLElement | null>(null);
    const rafRef = useRef<number>(0);
    const viewportRef = useRef<HTMLDivElement>(null);
    const minimapHeightRef = useRef(0);
    const renderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();

    const getScrollEl = useCallback(() => {
        if (!scrollElRef.current) {
            scrollElRef.current = document.querySelector(scrollContainerSelector);
        }
        return scrollElRef.current;
    }, [scrollContainerSelector]);

    // Render minimap — expensive, only call on mount/route change/resize
    const renderMinimap = useCallback(() => {
        const canvas = canvasRef.current;
        const scrollEl = getScrollEl();
        if (!canvas || !scrollEl) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const containerHeight = containerRef.current?.clientHeight || 600;

        const totalScrollHeight = scrollEl.scrollHeight;
        const minimapContentHeight = totalScrollHeight * SCALE;
        minimapHeightRef.current = minimapContentHeight;

        canvas.width = MINIMAP_WIDTH * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = `${MINIMAP_WIDTH}px`;
        canvas.style.height = `${containerHeight}px`;
        ctx.scale(dpr, dpr);

        // Disable smoothing for pixel-crisp lines
        ctx.imageSmoothingEnabled = false;

        ctx.clearRect(0, 0, MINIMAP_WIDTH, containerHeight);

        const contentEl = scrollEl.querySelector(".content-area");
        if (!contentEl) return;

        const scrollRect = scrollEl.getBoundingClientRect();

        // Collect blocks — include code elements and images
        const elements = contentEl.querySelectorAll("h1, h2, h3, p, li, a, blockquote, strong, pre, code, img, figure");
        const blocks: { y: number; h: number; type: string; width: number }[] = [];

        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.height < 1 || rect.width < 1) return;

            const tag = el.tagName.toLowerCase();

            // pre, img, code, and figure don't need direct text check
            if (tag !== "pre" && tag !== "img" && tag !== "code" && tag !== "figure") {
                const hasDirectText = Array.from(el.childNodes).some(
                    (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
                );
                if (!hasDirectText) return;
            }

            blocks.push({
                y: snap((rect.top - scrollRect.top + scrollEl.scrollTop) * SCALE),
                h: rect.height * SCALE,
                type: tag,
                width: Math.min((rect.width / scrollRect.width) * MINIMAP_WIDTH, MINIMAP_WIDTH - 10),
            });
        });

        // Syntax color palette — maximum contrast
        const colors: Record<string, string[]> = {
            h1: ["rgba(229,192,123,1)", "rgba(255,220,150,0.85)"],
            h2: ["rgba(210,160,110,0.9)", "rgba(230,190,140,0.75)"],
            h3: ["rgba(190,150,110,0.75)", "rgba(210,170,130,0.6)"],
            strong: ["rgba(198,120,221,0.8)", "rgba(220,150,240,0.6)"],
            a: ["rgba(97,175,239,0.8)", "rgba(130,190,255,0.6)"],
            li: ["rgba(152,195,121,0.55)", "rgba(180,210,150,0.4)"],
            p: ["rgba(171,178,191,0.4)", "rgba(200,205,210,0.3)"],
            blockquote: ["rgba(86,182,194,0.6)", "rgba(100,200,210,0.45)"],
            pre: ["rgba(152,195,121,0.6)", "rgba(120,170,100,0.45)", "rgba(97,175,239,0.5)"],
            code: ["rgba(229,192,123,0.9)", "rgba(255,200,100,0.7)"],
            img: ["rgba(198,120,221,0.3)", "rgba(130,100,180,0.2)"],
            figure: ["rgba(150,150,150,0.15)"],
        };

        let seed = 1;
        blocks.forEach((block) => {
            const { y, h, type, width } = block;
            const palette = colors[type] || colors.p;

            // Special rendering for images — solid rectangle
            if (type === "img") {
                const imgH = Math.max(snap(h), 6);
                ctx.fillStyle = "rgba(40,35,50,0.6)";
                ctx.fillRect(snap(6), y, snap(width), imgH);
                ctx.strokeStyle = "rgba(198,120,221,0.35)";
                ctx.lineWidth = 1;
                ctx.strokeRect(snap(6) + 0.5, y + 0.5, snap(width) - 1, imgH - 1);
                ctx.fillStyle = "rgba(160,120,200,0.25)";
                for (let iy = 0; iy < imgH; iy += 3) {
                    ctx.fillRect(snap(6), y + iy, snap(width), 1);
                }
                return;
            }

            // Special rendering for figure (image containers)
            if (type === "figure") {
                const figH = Math.max(snap(h), 8);
                ctx.fillStyle = "rgba(40,35,50,0.4)";
                ctx.fillRect(snap(6), y, snap(width), figH);
                ctx.strokeStyle = "rgba(150,120,200,0.2)";
                ctx.lineWidth = 1;
                ctx.strokeRect(snap(6) + 0.5, y + 0.5, snap(width) - 1, figH - 1);
                return;
            }

            // Special rendering for inline code — bright highlighted block
            if (type === "code") {
                const codeW = Math.max(snap(width * 0.3), 6);
                ctx.fillStyle = "rgba(40,35,25,0.5)";
                ctx.fillRect(snap(6), y, codeW + 4, Math.max(snap(h), 3));
                ctx.fillStyle = palette[0];
                ctx.fillRect(snap(8), y, codeW, Math.max(snap(h), LINE_HEIGHT));
                return;
            }

            // Special rendering for code blocks — background + dense lines
            if (type === "pre") {
                const codeH = Math.max(snap(h), 8);
                // Draw code block background
                ctx.fillStyle = "rgba(30,35,30,0.7)";
                ctx.fillRect(snap(6), y, snap(width), codeH);
                // Left accent bar
                ctx.fillStyle = "rgba(152,195,121,0.5)";
                ctx.fillRect(snap(6), y, 2, codeH);
                // Draw code lines inside
                const codeLineH = 2;
                const codeGap = 2;
                const numCodeLines = Math.max(1, Math.floor(codeH / (codeLineH + codeGap)));
                for (let i = 0; i < numCodeLines && i < 20; i++) {
                    const ly = snap(y + 2 + i * (codeLineH + codeGap));
                    if (ly > y + codeH - 2) break;
                    seed++;
                    // Multiple colored segments per code line
                    let cx = snap(12);
                    const segs = 2 + Math.floor(seededRandom(seed) * 4);
                    for (let s = 0; s < segs; s++) {
                        seed++;
                        const sw = snap(4 + seededRandom(seed) * (width * 0.2));
                        const gap = snap(2 + seededRandom(seed + 1) * 3);
                        ctx.fillStyle = palette[Math.floor(seededRandom(seed + 2) * palette.length)];
                        ctx.fillRect(cx, ly, Math.max(sw, 3), codeLineH);
                        cx += sw + gap;
                        if (cx > snap(6) + snap(width) - 4) break;
                    }
                }
                return;
            }

            // Normal text rendering
            const numLines = Math.max(1, Math.round(h / (LINE_HEIGHT + LINE_GAP)));
            for (let i = 0; i < numLines && i < 10; i++) {
                const lineY = snap(y + i * (LINE_HEIGHT + LINE_GAP));
                if (lineY > containerHeight) break;

                seed++;
                const ratio = i === numLines - 1
                    ? 0.2 + seededRandom(seed) * 0.4
                    : 0.5 + seededRandom(seed + 1) * 0.5;
                const totalLineW = width * ratio;

                const numSegments = type === "h1" || type === "h2" ? 1 : Math.floor(1 + seededRandom(seed + 2) * 3);
                let xOffset = snap(6);

                for (let s = 0; s < numSegments; s++) {
                    seed++;
                    const segWidth = snap((totalLineW / numSegments) * (0.5 + seededRandom(seed) * 0.8));
                    const gapBetween = snap(2 + seededRandom(seed + 1) * 3);

                    ctx.fillStyle = palette[Math.floor(seededRandom(seed + 2) * palette.length)];
                    ctx.fillRect(snap(xOffset), lineY, Math.max(snap(segWidth), 4), LINE_HEIGHT);
                    xOffset += segWidth + gapBetween;

                    if (xOffset > MINIMAP_WIDTH - 4) break;
                }
            }
        });
    }, [getScrollEl]);

    // Lightweight viewport update — only repositions the slider
    const updateViewport = useCallback(() => {
        const scrollEl = getScrollEl();
        const viewport = viewportRef.current;
        const container = containerRef.current;
        if (!scrollEl || !viewport || !container) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollEl;
        const containerHeight = container.clientHeight;
        const minimapContentHeight = minimapHeightRef.current;

        if (scrollHeight <= clientHeight) {
            viewport.style.top = "0px";
            viewport.style.height = `${Math.min(minimapContentHeight, containerHeight)}px`;
            return;
        }

        const viewportH = Math.max((clientHeight / scrollHeight) * minimapContentHeight, 20);
        const viewportTop = Math.min(
            (scrollTop / scrollHeight) * minimapContentHeight,
            containerHeight - viewportH
        );

        viewport.style.top = `${viewportTop}px`;
        viewport.style.height = `${viewportH}px`;
    }, [getScrollEl]);

    // Debounced render for mutations
    const scheduleRender = useCallback(() => {
        if (renderTimerRef.current) clearTimeout(renderTimerRef.current);
        renderTimerRef.current = setTimeout(() => {
            renderMinimap();
            updateViewport();
        }, 500);
    }, [renderMinimap, updateViewport]);

    // Setup — scroll only updates viewport, never re-renders canvas
    useEffect(() => {
        scrollElRef.current = null;
        const scrollEl = getScrollEl();
        if (!scrollEl) return;

        // Scroll handler — ultra lightweight, only moves viewport slider
        const handleScroll = () => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(updateViewport);
        };

        const handleResize = () => {
            scheduleRender();
        };

        // Initial render
        const timer = setTimeout(() => {
            renderMinimap();
            updateViewport();
        }, 400);

        scrollEl.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        // Only observe direct childList changes (not subtree scroll-induced changes)
        const observer = new MutationObserver(scheduleRender);
        const contentEl = scrollEl.querySelector(".content-area");
        if (contentEl) {
            observer.observe(contentEl, { childList: true, subtree: true });
        }

        return () => {
            clearTimeout(timer);
            if (renderTimerRef.current) clearTimeout(renderTimerRef.current);
            cancelAnimationFrame(rafRef.current);
            scrollEl.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
        };
    }, [getScrollEl, renderMinimap, updateViewport, scheduleRender]);

    // Re-render on route change
    useEffect(() => {
        const timer = setTimeout(() => {
            renderMinimap();
            updateViewport();
        }, 400);
        return () => clearTimeout(timer);
    }, [pathname, renderMinimap, updateViewport]);

    // Click to jump
    const handleMouseDown = (e: React.MouseEvent) => {
        const scrollEl = getScrollEl();
        const container = containerRef.current;
        if (!scrollEl || !container) return;

        e.preventDefault();
        setIsDragging(true);

        const containerRect = container.getBoundingClientRect();
        const clickY = e.clientY - containerRect.top;
        const minimapContentHeight = minimapHeightRef.current;

        const scrollRatio = clickY / minimapContentHeight;
        const targetScroll = scrollRatio * scrollEl.scrollHeight - scrollEl.clientHeight / 2;
        scrollEl.scrollTop = Math.max(0, Math.min(targetScroll, scrollEl.scrollHeight - scrollEl.clientHeight));

        dragStartRef.current = {
            y: e.clientY,
            scrollTop: scrollEl.scrollTop,
        };
    };

    // Drag to scroll
    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const scrollEl = getScrollEl();
            if (!scrollEl || !dragStartRef.current) return;

            const deltaY = e.clientY - dragStartRef.current.y;
            const scrollDelta = (deltaY / minimapHeightRef.current) * scrollEl.scrollHeight;
            scrollEl.scrollTop = dragStartRef.current.scrollTop + scrollDelta;
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            dragStartRef.current = null;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, getScrollEl]);

    return (
        <div
            ref={containerRef}
            className="hidden xl:fixed xl:block select-none"
            style={{
                width: `${MINIMAP_WIDTH}px`,
                right: "16px",
                top: "88px",
                bottom: "28px",
                zIndex: 10,
            }}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 pointer-events-none"
                style={{
                    opacity: isHovering || isDragging ? 1 : 0.9,
                    transition: "opacity 0.3s ease",
                }}
            />
            {/* Viewport slider */}
            <div
                ref={viewportRef}
                className="absolute left-0 pointer-events-none"
                style={{
                    width: `${MINIMAP_WIDTH}px`,
                    background: isHovering || isDragging
                        ? "linear-gradient(90deg, rgba(97,175,239,0.08) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.03) 100%)"
                        : "linear-gradient(90deg, rgba(97,175,239,0.04) 0%, rgba(255,255,255,0.03) 40%, transparent 100%)",
                    borderLeft: isHovering || isDragging
                        ? "2px solid rgba(97,175,239,0.35)"
                        : "2px solid rgba(97,175,239,0.15)",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "background 0.2s ease, border-color 0.2s ease",
                    willChange: "top, height",
                    borderRadius: "1px",
                }}
            />
        </div>
    );
}
