import { notes } from "../data/notes";

export default function NotesPage() {

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
