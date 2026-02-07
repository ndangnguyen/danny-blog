export default function NotesPage() {
  const notes = [
    {
      title: "Flutter Rendering Deep Dive: Từ Code đến Điểm Ảnh",
      date: "February 7",
      slug: "flutter-rendering-deep-dive",
      excerpt: "Khám phá cơ chế rendering độc đáo của Flutter từ Widget Tree đến RenderObject Tree."
    },
    {
      title: "Building with OpenClaw",
      date: "Feb 7, 2026",
      slug: "building-with-openclaw",
      excerpt: "How I use a multi-agent system to automate my software engineering workflow."
    },
    {
      title: "The LumiLED Journey",
      date: "Feb 6, 2026",
      slug: "lumiled-journey",
      excerpt: "From a simple pixel grid to a high-performance neo-retro LED scroller."
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
