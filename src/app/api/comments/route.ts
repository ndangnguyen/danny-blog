import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

function getDb() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    return neon(url);
}

// ─── Initialize table if it doesn't exist ──────────────────────────
async function ensureTable() {
    const sql = getDb();
    await sql`
    CREATE TABLE IF NOT EXISTS blog_comments (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      text TEXT NOT NULL,
      avatar_color TEXT NOT NULL,
      created_at BIGINT NOT NULL
    )
  `;
    await sql`
    CREATE INDEX IF NOT EXISTS idx_blog_comments_slug
    ON blog_comments (slug)
  `;
}

let tableReady = false;

// ─── GET: Fetch comments for a slug ────────────────────────────────
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json(
                { error: "Missing slug parameter" },
                { status: 400 }
            );
        }

        if (!tableReady) {
            await ensureTable();
            tableReady = true;
        }

        const sql = getDb();
        const comments = await sql`
      SELECT id, slug, name, text, avatar_color, created_at
      FROM blog_comments
      WHERE slug = ${slug}
      ORDER BY created_at DESC
    `;

        return NextResponse.json(comments);
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}

// ─── POST: Create a new comment ────────────────────────────────────
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, slug, name, text, avatarColor } = body;

        if (!slug || !text?.trim()) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!tableReady) {
            await ensureTable();
            tableReady = true;
        }

        const sql = getDb();
        const commentId = id || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        const displayName = name?.trim() || "Anonymous";
        const trimmedText = text.trim();
        const createdAt = Date.now();

        await sql`
      INSERT INTO blog_comments (id, slug, name, text, avatar_color, created_at)
      VALUES (${commentId}, ${slug}, ${displayName}, ${trimmedText}, ${avatarColor || '#82aaff'}, ${createdAt})
    `;

        return NextResponse.json({
            id: commentId,
            slug,
            name: displayName,
            text: trimmedText,
            avatar_color: avatarColor,
            created_at: createdAt,
        }, { status: 201 });
    } catch (error) {
        console.error("Failed to create comment:", error);
        return NextResponse.json(
            { error: "Failed to create comment" },
            { status: 500 }
        );
    }
}
