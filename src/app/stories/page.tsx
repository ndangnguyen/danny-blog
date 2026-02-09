export default function StoriesPage() {
  const stories = [
    {
      title: "Giải mã cấu trúc bên trong một OpenClaw Workspace",
      date: "February 9",
      slug: "cau-truc-workspace-openclaw",
      excerpt: "Khám phá các thành phần cốt lõi định nghĩa nên một Agent chuyên nghiệp, từ IDENTITY, SOUL đến bộ nhớ MEMORY."
    },
    {
      title: "Từ điển thuật ngữ OpenClaw cho người mới",
      date: "February 9",
      slug: "thuat-ngu-openclaw",
      excerpt: "Giải thích các khái niệm cốt lõi như Gateway, Agent, Skill, Session... giúp bạn hiểu rõ hệ sinh thái OpenClaw vận hành như thế nào."
    },
    {
      title: "Làm chủ bộ lệnh CLI của OpenClaw",
      date: "February 9",
      slug: "huong-dan-cli-openclaw",
      excerpt: "Hướng dẫn chi tiết các câu lệnh Command Line Interface để quản trị Gateway, cấu hình Agent và xử lý lỗi hệ thống chuyên sâu."
    },
    {
      title: "Tổng hợp các lệnh OpenClaw quan trọng",
      date: "February 9",
      slug: "tong-hop-lenh-openclaw",
      excerpt: "Nắm vững các nhóm lệnh cốt lõi từ quản lý File, thực thi Shell đến điều phối đa Agent để làm chủ hoàn toàn hệ thống."
    },
    {
      title: "Nghệ thuật Ghi nhớ & Tự động hóa trong OpenClaw",
      date: "February 9",
      slug: "nghe-thuat-ghi-nho-trong-openclaw",
      excerpt: "Làm thế nào để AI hiểu và nhớ lâu những yêu cầu của bạn? Bí mật nằm ở cơ chế quản lý bộ nhớ thông minh qua File."
    },
    {
      title: "Hướng dẫn làm chủ OpenClaw: Từ Cơ bản đến Nâng cao",
      date: "February 9",
      slug: "huong-dan-lam-chu-openclaw",
      excerpt: "Khám phá cách vận hành hiệu quả hệ thống OpenClaw, từ quản lý Workspace đến phối hợp đa Agent."
    },
    {
      title: "Bi Story: Câu chuyện vận hành & Tầm nhìn 2026",
      date: "February 8",
      slug: "bi-story-2026-02-08",
      excerpt: "Khám phá quy trình điều phối Sub-Agents siêu phàm và lý do tại sao AI Newsletter sẽ là tương lai của ngành tài chính."
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <h1 className="text-2xl font-bold">Stories</h1>

      <div className="space-y-12">
        {stories.map((story) => (
          <article key={story.slug} className="group">
            <time className="text-xs text-text-muted mb-2 block">{story.date}</time>
            <h2 className="text-xl font-bold mb-2">
              <a href={`/stories/${story.slug}`} className="no-underline hover:underline">
                {story.title}
              </a>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              {story.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
