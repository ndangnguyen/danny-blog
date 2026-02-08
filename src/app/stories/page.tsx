export default function StoriesPage() {
  const stories = [
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
