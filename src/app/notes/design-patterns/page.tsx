import type { Metadata } from "next";
import { getNoteBySlug } from "../../data/notes";
import NoteContent from "./NoteContent";

const slug = "design-patterns";
const note = getNoteBySlug(slug)!;

export const metadata: Metadata = {
    title: note.title,
    description: note.excerpt,
    openGraph: {
        title: note.title,
        description: note.excerpt,
        type: "article",
        url: `/notes/${slug}`,
        images: [
            {
                url: `/api/og?title=${encodeURIComponent(note.title)}&date=${encodeURIComponent(note.date)}`,
                width: 1200,
                height: 630,
                alt: note.title,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: note.title,
        description: note.excerpt,
        images: [`/api/og?title=${encodeURIComponent(note.title)}&date=${encodeURIComponent(note.date)}`],
    },
};

export default function Page() {
    return <NoteContent />;
}
