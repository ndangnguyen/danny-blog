import type { Metadata } from "next";
import { getNoteBySlug } from "../../data/notes";
import NoteContent from "./NoteContent";

const slug = "8-stages-ai-programming";
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
                url: "/og-8-stages-ai-programming.jpg",
                width: 1024,
                height: 1024,
                alt: note.title,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: note.title,
        description: note.excerpt,
        images: ["/og-8-stages-ai-programming.jpg"],
    },
};

export default function Page() {
    return <NoteContent />;
}
