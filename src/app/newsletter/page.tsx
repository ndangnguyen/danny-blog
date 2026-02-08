export default function NewsletterPage() {
  const newsletter = [
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
