export interface NoteData {
    title: string;
    date: string;
    slug: string;
    excerpt: string;
}

export const notes: NoteData[] = [
    {
        title: "Claudible - Hướng Dẫn Sử Dụng Claude API Proxy",
        date: "Feb 13, 2026",
        slug: "claudible-huong-dan-su-dung",
        excerpt:
            "Hướng dẫn chi tiết cách cấu hình và sử dụng Claudible để truy cập các model Claude (Sonnet, Opus, Haiku) trong OpenClaw.",
    },
    {
        title: "Tám Giai Đoạn Tiến Hóa Của Lập Trình Viên Với AI",
        date: "Feb 12, 2026",
        slug: "8-stages-ai-programming",
        excerpt:
            "Từ việc hỏi cú pháp cơ bản đến điều phối hàng chục AI Agent — 8 cấp độ mà mọi lập trình viên sẽ trải qua trong kỷ nguyên AI.",
    },
    {
        title: "Bi's Blog: Nhật ký vận hành & Tầm nhìn công nghệ 2026",
        date: "February 8",
        slug: "bi-blog-2026-02-08",
        excerpt:
            "Câu chuyện về cách Bi điều phối Sub-agents trong OpenClaw và dự báo về tương lai của AI Newsletters giữa cơn lốc Crypto 2026.",
    },
    {
        title: "SOLID Principles: 5 Nguyên Tắc Nền Tảng Của Clean Code",
        date: "Feb 8, 2026",
        slug: "solid-principles",
        excerpt:
            "5 nguyên tắc thiết kế hướng đối tượng giúp code dễ bảo trì, mở rộng, và test. Từ SRP đến DIP với ví dụ thực tế.",
    },
    {
        title: "DRY, KISS, YAGNI: Ba Nguyên Tắc Vàng Của Lập Trình",
        date: "Feb 8, 2026",
        slug: "dry-kiss-yagni",
        excerpt:
            "Ba nguyên tắc tưởng đơn giản nhưng là nền tảng để viết code chất lượng. Tránh được 80% các vấn đề phổ biến.",
    },
    {
        title: "Clean Architecture: Kiến Trúc Phần Mềm Bền Vững",
        date: "Feb 8, 2026",
        slug: "clean-architecture",
        excerpt:
            "Áp dụng Clean Architecture trong Flutter và Backend — từ Dependency Rule đến folder structure thực tế.",
    },
    {
        title: "Design Patterns: Các Pattern Thực Chiến Trong Dự Án",
        date: "Feb 8, 2026",
        slug: "design-patterns",
        excerpt:
            "Repository, Observer, Singleton, Strategy, Builder — 5 patterns mình dùng hàng ngày trong mọi dự án.",
    },
    {
        title: "Flutter State Management: Riverpod vs Bloc",
        date: "Feb 7, 2026",
        slug: "flutter-state-management",
        excerpt:
            "So sánh chi tiết hai giải pháp State Management phổ biến nhất trong Flutter: Riverpod và Bloc.",
    },
    {
        title: "Flutter Rendering Deep Dive: Từ Code đến Điểm Ảnh",
        date: "Feb 7, 2026",
        slug: "flutter-rendering-deep-dive",
        excerpt:
            "Khám phá cơ chế rendering độc đáo của Flutter từ Widget Tree đến RenderObject Tree.",
    },
    {
        title: "Flutter Custom Painter: Vẽ Mọi Thứ Bạn Muốn",
        date: "Feb 5, 2026",
        slug: "flutter-custom-painter",
        excerpt:
            "Hướng dẫn sử dụng CustomPainter trong Flutter để tạo ra những hiệu ứng đồ hoạ ấn tượng.",
    },
    {
        title: "Flutter Performance: 10 Tips Tối Ưu Hiệu Năng",
        date: "Feb 4, 2026",
        slug: "flutter-performance-tips",
        excerpt:
            "Tổng hợp 10 kỹ thuật tối ưu hiệu năng Flutter mà mình đã áp dụng thực tế trong LumiLED.",
    },
];

export function getNoteBySlug(slug: string): NoteData | undefined {
    return notes.find((n) => n.slug === slug);
}
