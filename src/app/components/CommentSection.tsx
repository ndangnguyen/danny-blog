"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────
interface AnonymousComment {
    id: string;
    name: string;
    text: string;
    timestamp: number;
    avatar: string;
}

type TabMode = "facebook" | "anonymous";

// ─── Avatar Generator ───────────────────────────────────────────────
const AVATAR_COLORS = [
    "#c792ea", "#82aaff", "#c3e88d", "#f78c6c", "#ff5370",
    "#89ddff", "#ffcb6b", "#f07178", "#bb80b3", "#80cbc4",
];

function getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

// ─── Time Formatter ─────────────────────────────────────────────────
function timeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "vừa xong";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} ngày trước`;
    const months = Math.floor(days / 30);
    return `${months} tháng trước`;
}

// ─── Facebook Comments Component ────────────────────────────────────
function FacebookComments({ url }: { url: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Facebook SDK
        if (!(window as unknown as Record<string, unknown>).FB) {
            const script = document.createElement("script");
            script.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v21.0&appId=1608200317096545";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);

            script.onload = () => {
                if ((window as unknown as Record<string, unknown>).FB && containerRef.current) {
                    (window as unknown as { FB: { XFBML: { parse: (el: HTMLElement) => void } } }).FB.XFBML.parse(containerRef.current);
                }
            };
        } else {
            // SDK already loaded, just parse
            if (containerRef.current) {
                (window as unknown as { FB: { XFBML: { parse: (el: HTMLElement) => void } } }).FB.XFBML.parse(containerRef.current);
            }
        }
    }, [url]);

    return (
        <div ref={containerRef} className="fb-comments-wrapper">
            <div
                className="fb-comments"
                data-href={url}
                data-width="100%"
                data-numposts="10"
                data-colorscheme="dark"
                data-order-by="reverse_time"
            />
            {/* Fallback message when FB plugin doesn't render (e.g. localhost) */}
            <div id="fb-comments-fallback" className="fb-fallback">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mb-2 opacity-40">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <p className="text-sm text-[#555]">Facebook Comments đang tải...</p>
                <p className="text-xs text-[#444] mt-1">Plugin này chỉ hoạt động trên domain thực (không hỗ trợ localhost)</p>
            </div>
            <style jsx>{`
                .fb-comments-wrapper {
                    min-height: 200px;
                    position: relative;
                }
                .fb-comments-wrapper .fb-comments {
                    width: 100%;
                }
                .fb-comments-wrapper iframe {
                    background: transparent !important;
                }
                .fb-fallback {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 180px;
                    color: #555;
                }
                /* Hide fallback when FB iframe has rendered with content */
                .fb-comments-wrapper .fb-comments span:not(:empty) ~ .fb-fallback,
                .fb-comments-wrapper iframe[height]:not([height="0"]) ~ .fb-fallback {
                    display: none;
                }
            `}</style>
        </div>
    );
}

// ─── Anonymous Comments Component ────────────────────────────────────
function AnonymousComments({ slug }: { slug: string }) {
    const [comments, setComments] = useState<AnonymousComment[]>([]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [justPosted, setJustPosted] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const storageKey = `blog-comments-${slug}`;

    // Load comments from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                setComments(JSON.parse(saved));
            }
        } catch {
            // ignore
        }

        // Load saved name
        const savedName = localStorage.getItem("blog-comment-name");
        if (savedName) setName(savedName);
    }, [storageKey]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!text.trim()) return;

            setIsSubmitting(true);

            const displayName = name.trim() || "Anonymous";
            const newComment: AnonymousComment = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                name: displayName,
                text: text.trim(),
                timestamp: Date.now(),
                avatar: getAvatarColor(displayName),
            };

            const updated = [newComment, ...comments];
            setComments(updated);

            // Persist
            localStorage.setItem(storageKey, JSON.stringify(updated));
            if (name.trim()) {
                localStorage.setItem("blog-comment-name", name.trim());
            }

            setText("");
            setJustPosted(newComment.id);
            setIsSubmitting(false);

            // Clear highlight after animation
            setTimeout(() => setJustPosted(null), 2000);
        },
        [name, text, comments, storageKey]
    );

    // Auto-resize textarea
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className="space-y-6">
            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                    {/* Avatar Preview */}
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors duration-300"
                        style={{
                            backgroundColor: getAvatarColor(name.trim() || "Anonymous"),
                            color: "#111",
                        }}
                    >
                        {getInitials(name.trim() || "Anonymous")}
                    </div>

                    <div className="flex-1 space-y-3">
                        {/* Name input */}
                        <input
                            type="text"
                            placeholder="Tên của bạn (để trống = Anonymous)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border-b border-border/60 text-sm text-white placeholder:text-[#555] py-1.5 outline-none focus:border-[#82aaff] transition-colors duration-300"
                        />

                        {/* Comment textarea */}
                        <textarea
                            ref={textareaRef}
                            placeholder="Viết bình luận..."
                            value={text}
                            onChange={handleTextChange}
                            rows={1}
                            className="w-full bg-[#1a1a2e]/50 border border-border/40 rounded-lg text-sm text-[#ccc] placeholder:text-[#555] p-3 outline-none focus:border-[#82aaff] transition-all duration-300 resize-none overflow-hidden min-h-[42px]"
                        />

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!text.trim() || isSubmitting}
                                className="px-4 py-1.5 bg-[#82aaff] text-[#111] text-xs font-bold rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#a3c0ff] active:scale-95 transition-all duration-200"
                            >
                                {isSubmitting ? "Đang gửi..." : "Bình luận"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Separator */}
            {comments.length > 0 && (
                <div className="flex items-center gap-3 text-[#444] text-xs">
                    <div className="flex-1 border-t border-border/40" />
                    <span>{comments.length} bình luận</span>
                    <div className="flex-1 border-t border-border/40" />
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
                {comments.map((c) => (
                    <div
                        key={c.id}
                        className={`flex gap-3 p-3 rounded-lg transition-all duration-500 ${justPosted === c.id
                            ? "bg-[#82aaff]/10 border border-[#82aaff]/20"
                            : "hover:bg-white/[0.02]"
                            }`}
                    >
                        {/* Avatar */}
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                            style={{
                                backgroundColor: c.avatar,
                                color: "#111",
                            }}
                        >
                            {getInitials(c.name)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs font-semibold text-white">
                                    {c.name}
                                </span>
                                <span className="text-[10px] text-[#555]">
                                    {timeAgo(c.timestamp)}
                                </span>
                            </div>
                            <p className="text-sm text-[#aaa] mt-1 whitespace-pre-wrap break-words leading-relaxed">
                                {c.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {comments.length === 0 && (
                <div className="text-center py-8 text-[#444] text-sm">
                    <div className="text-2xl mb-2">💬</div>
                    <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                </div>
            )}
        </div>
    );
}

// ─── Main CommentSection Component ───────────────────────────────────
export default function CommentSection({ slug }: { slug: string }) {
    const [activeTab, setActiveTab] = useState<TabMode>("anonymous");
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    return (
        <section className="mt-12 pt-8 border-t border-border">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-[#82aaff] text-sm font-mono">{"//"}</span>
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    Bình luận
                </h3>
                <div className="flex-1 border-t border-border/30 ml-2" />
            </div>

            {/* Tab Switcher */}
            <div className="flex mb-6 bg-[#1a1a1a] rounded-lg p-1 border border-border/30">
                <button
                    onClick={() => setActiveTab("anonymous")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all duration-300 ${activeTab === "anonymous"
                        ? "bg-[#82aaff]/15 text-[#82aaff] shadow-sm"
                        : "text-[#666] hover:text-[#999]"
                        }`}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Ẩn danh
                </button>
                <button
                    onClick={() => setActiveTab("facebook")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all duration-300 ${activeTab === "facebook"
                        ? "bg-[#1877f2]/15 text-[#1877f2] shadow-sm"
                        : "text-[#666] hover:text-[#999]"
                        }`}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
                {activeTab === "anonymous" && <AnonymousComments slug={slug} />}
                {activeTab === "facebook" && currentUrl && (
                    <FacebookComments url={currentUrl} />
                )}
            </div>
        </section>
    );
}
