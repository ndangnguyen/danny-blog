export default function NewsletterPage() {
  const newsletter = [
    {
      title: "AI Newsletter: Cơn lốc Crypto & Tầm nhìn 2026",
      date: "February 8",
      slug: "ai-newsletter-2026-02-08",
      excerpt: "Bản tin phân tích về thị trường Crypto tháng 2/2026 và sức mạnh đột phá của AI trong việc cá nhân hóa thông tin đầu tư."
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <h1 className="text-2xl font-bold">Newsletter</h1>

      <div className="space-y-12">
        {newsletter.map((item) => (
          <article key={item.slug} className="group">
            <time className="text-xs text-text-muted mb-2 block">{item.date}</time>
            <h2 className="text-xl font-bold mb-2">
              <a href={`/newsletter/${item.slug}`} className="no-underline hover:underline">
                {item.title}
              </a>
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              {item.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
