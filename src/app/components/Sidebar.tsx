"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    notes: true,
    projects: false,
  });

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notes = [
    { title: "building-with-openclaw.md", slug: "building-with-openclaw" },
    { title: "lumiled-journey.md", slug: "lumiled-journey" },
  ];

  return (
    <aside className="sidebar hidden md:flex">
      <div className="sidebar-header">
        Danny Nguyen <span className="opacity-30">/ v1.0</span>
      </div>
      
      <nav className="flex-1 overflow-y-auto pt-4">
        <Link 
          href="/" 
          className={`sidebar-item mx-2 ${pathname === "/" ? "active bg-white/5" : ""}`}
        >
          <span className="opacity-50">📄</span> README.md
        </Link>

        {/* Notes Folder */}
        <div>
          <div 
            className="sidebar-item mx-2 mt-4 text-[10px] uppercase tracking-tighter cursor-pointer hover:text-foreground"
            onClick={() => toggleFolder("notes")}
          >
            <span className="text-[8px] mr-2 transition-transform inline-block" style={{ transform: openFolders.notes ? 'rotate(90deg)' : 'none' }}>▶</span>
            Notes
          </div>
          
          {openFolders.notes && (
            <div className="ml-4 mt-1 space-y-1">
              {notes.map((note) => (
                <Link 
                  key={note.slug}
                  href={`/notes/${note.slug}`}
                  className={`sidebar-item mx-2 text-[12px] ${pathname.includes(note.slug) ? "active text-accent" : ""}`}
                >
                  <span className="opacity-30">📄</span> {note.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Projects Folder */}
        <div>
          <div 
            className="sidebar-item mx-2 mt-4 text-[10px] uppercase tracking-tighter cursor-pointer"
            onClick={() => toggleFolder("projects")}
          >
            <span className="text-[8px] mr-2 transition-transform inline-block" style={{ transform: openFolders.projects ? 'rotate(90deg)' : 'none' }}>▶</span>
            Projects
          </div>
          {openFolders.projects && (
            <div className="ml-4 mt-1">
              <Link href="/projects/lumiled" className="sidebar-item mx-2 text-[12px]">
                <span className="opacity-30">📁</span> LumiLED.app
              </Link>
            </div>
          )}
        </div>

        <div className="folder-label mt-8">Channels</div>
        <a href="https://discord.com" target="_blank" className="sidebar-item mx-2">
          <span className="opacity-30">💬</span> #work
        </a>
        <a href="https://github.com/ndangnguyen" target="_blank" className="sidebar-item mx-2">
          <span className="opacity-30">📦</span> GitHub
        </a>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-[9px] text-text-muted mb-2 uppercase font-bold opacity-50">Search</div>
        <input 
          type="text" 
          placeholder="Type to filter..." 
          className="w-full bg-black border border-border rounded px-2 py-1.5 text-xs outline-none focus:border-accent transition-colors"
        />
      </div>
    </aside>
  );
}
