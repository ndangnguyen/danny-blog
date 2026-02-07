export default function NotesPage() {
  const notes = [
    {
      title: "SOLID Principles: 5 Nguyên Tắc Nền Tảng Của Clean Code",
      date: "Feb 8, 2026",
      slug: "solid-principles",
      excerpt: "5 nguyên tắc thiết kế hướng đối tượng giúp code dễ bảo trì, mở rộng, và test. Từ SRP đến DIP với ví dụ thực tế."
    },
    {
      title: "DRY, KISS, YAGNI: Ba Nguyên Tắc Vàng Của Lập Trình",
      date: "Feb 8, 2026",
      slug: "dry-kiss-yagni",
      excerpt: "Ba nguyên tắc tưởng đơn giản nhưng là nền tảng để viết code chất lượng. Tránh được 80% các vấn đề phổ biến."
    },
    {
      title: "Clean Architecture: Kiến Trúc Phần Mềm Bền Vững",
      date: "Feb 8, 2026",
      slug: "clean-architecture",
      excerpt: "Áp dụng Clean Architecture trong Flutter và Backend — từ Dependency Rule đến folder structure thực tế."
    },
    {
      title: "Design Patterns: Các Pattern Thực Chiến Trong Dự Án",
      date: "Feb 8, 2026",
      slug: "design-patterns",
      excerpt: "Repository, Observer, Singleton, Strategy, Builder — 5 patterns mình dùng hàng ngày trong mọi dự án."
    },
    {
      title: "Flutter State Management: Riverpod vs Bloc",
      date: "Feb 7, 2026",
      slug: "flutter-state-management",
      excerpt: "So sánh chi tiết hai giải pháp State Management phổ biến nhất trong Flutter: Riverpod và Bloc."
    },
    {
      title: "Flutter Rendering Deep Dive: Từ Code đến Điểm Ảnh",
      date: "Feb 7, 2026",
      slug: "flutter-rendering-deep-dive",
      excerpt: "Khám phá cơ chế rendering độc đáo của Flutter từ Widget Tree đến RenderObject Tree."
    },
    {
      title: "Flutter Custom Painter: Vẽ Mọi Thứ Bạn Muốn",
      date: "Feb 5, 2026",
      slug: "flutter-custom-painter",
      excerpt: "Hướng dẫn sử dụng CustomPainter trong Flutter để tạo ra những hiệu ứng đồ hoạ ấn tượng."
    },
    {
      title: "Flutter Performance: 10 Tips Tối Ưu Hiệu Năng",
      date: "Feb 4, 2026",
      slug: "flutter-performance-tips",
      excerpt: "Tổng hợp 10 kỹ thuật tối ưu hiệu năng Flutter mà mình đã áp dụng thực tế trong LumiLED."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <h1 className="text-2xl font-bold">Notes</h1>

      <div className="space-y-12">
        {notes.map((note) => (
          <article key={note.slug} className="group">
            <time className="text-xs text-text-muted mb-2 block">{note.date}</time>
            <h2 className="text-xl font-bold mb-2">
              <a href={`/notes/${note.slug}`} className="no-underline hover:underline">
                {note.title}
              </a>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              {note.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
