"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────
interface Comment {
    id: string;
    name: string;
    text: string;
    avatar_color: string;
    created_at: number;
}

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

// ─── Main CommentSection Component ──────────────────────────────────
export default function CommentSection({ slug }: { slug: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [justPosted, setJustPosted] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Load saved name from localStorage
    useEffect(() => {
        const savedName = localStorage.getItem("blog-comment-name");
        if (savedName) setName(savedName);
    }, []);

    const localKey = `blog-comments-${slug}`;

    // Fetch comments from API, fallback to localStorage
    const fetchComments = useCallback(async () => {
        try {
            setError(null);
            const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setComments(data);
            localStorage.setItem(localKey, JSON.stringify(data));
        } catch {
            const local = localStorage.getItem(localKey);
            if (local) {
                try {
                    setComments(JSON.parse(local));
                } catch {
                    setComments([]);
                }
            } else {
                setComments([]);
            }
        } finally {
            setIsLoading(false);
        }
    }, [slug, localKey]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // Submit new comment
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        const displayName = name.trim() || "Anonymous";
        const avatarColor = getAvatarColor(displayName);
        const commentId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        // Optimistic update
        const optimisticComment: Comment = {
            id: commentId,
            name: displayName,
            text: text.trim(),
            avatar_color: avatarColor,
            created_at: Date.now(),
        };
        setComments((prev) => [optimisticComment, ...prev]);
        setJustPosted(commentId);
        setText("");

        // Save name
        if (name.trim()) {
            localStorage.setItem("blog-comment-name", name.trim());
        }

        try {
            const res = await fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: commentId,
                    slug,
                    name: displayName,
                    text: optimisticComment.text,
                    avatarColor,
                }),
            });

            if (!res.ok) throw new Error("Failed to post");
        } catch {
            // Fallback: keep optimistic comment in localStorage
            setComments((prev) => {
                localStorage.setItem(localKey, JSON.stringify(prev));
                return prev;
            });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setJustPosted(null), 2000);
        }
    };

    // Auto-resize textarea
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

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

            {/* Error Banner */}
            {error && (
                <div className="mb-4 px-3 py-2 bg-[#ff5370]/10 border border-[#ff5370]/20 rounded-lg text-xs text-[#ff5370] flex items-center gap-2">
                    <span>⚠️</span>
                    <span className="flex-1">{error}</span>
                    <button
                        onClick={() => { setError(null); fetchComments(); }}
                        className="px-2 py-0.5 bg-[#ff5370]/20 rounded hover:bg-[#ff5370]/30 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center py-8 text-[#555]">
                    <div className="flex gap-1 mb-2">
                        <span className="w-1.5 h-1.5 bg-[#82aaff] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-[#82aaff] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-[#82aaff] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <p className="text-xs">Đang tải bình luận...</p>
                </div>
            )}

            {/* Comments List */}
            {!isLoading && (
                <>
                    {/* Separator */}
                    {comments.length > 0 && (
                        <div className="flex items-center gap-3 text-[#444] text-xs mb-4">
                            <div className="flex-1 border-t border-border/40" />
                            <span>{comments.length} bình luận</span>
                            <div className="flex-1 border-t border-border/40" />
                        </div>
                    )}

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
                                        backgroundColor: c.avatar_color,
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
                                            {timeAgo(c.created_at)}
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
                </>
            )}
        </section>
    );
}
