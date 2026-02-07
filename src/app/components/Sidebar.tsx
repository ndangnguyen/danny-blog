"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ContextMenuState {
  x: number;
  y: number;
  visible: boolean;
  itemSlug: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    notes: true,
    stories: false,
    newsletter: false,
    photos: false,
  });

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    visible: false,
    itemSlug: "",
  });

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContextMenu = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
      itemSlug: slug,
    });
  };

  const closeContextMenu = useCallback(() => {
    if (contextMenu.visible) {
      setContextMenu((prev) => ({ ...prev, visible: false }));
    }
  }, [contextMenu.visible]);

  useEffect(() => {
    window.addEventListener("click", closeContextMenu);
    return () => window.removeEventListener("click", closeContextMenu);
  }, [closeContextMenu]);

  const navItems = [
    { label: "README", icon: "📄", slug: "", isFolder: false },
    { label: "Notes", icon: "📁", slug: "notes", isFolder: true },
    { label: "Stories", icon: "📁", slug: "stories", isFolder: true },
    { label: "Newsletter", icon: "📁", slug: "newsletter", isFolder: true },
    { label: "Photos", icon: "📁", slug: "photos", isFolder: true },
  ];

  return (
    <>
      <aside className="sidebar hidden md:flex">
        {/* Header Section from Image */}
        <div className="sidebar-header">
          <div className="sidebar-header-left">
            <div className="w-6 h-6 rounded-full bg-gray-500 overflow-hidden flex-shrink-0">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Danny" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold">Danny Nguyen</span>
            <span className="opacity-30 text-xs">/ v1.0</span>
          </div>
          <div className="sidebar-header-right">
            <span className="cursor-pointer hover:text-white">↕</span>
            <span className="cursor-pointer hover:text-white">🗄</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto pt-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link 
                href={`/${item.slug}`}
                className={`sidebar-item group ${pathname === `/${item.slug}` ? "active" : ""}`}
                onContextMenu={(e) => handleContextMenu(e, item.slug)}
                onClick={(e) => {
                  if (item.isFolder) {
                    e.preventDefault();
                    toggleFolder(item.slug);
                  }
                }}
              >
                <span className={`text-[10px] transition-transform ${openFolders[item.slug] ? "rotate-90" : ""}`}>
                  {item.isFolder ? "▶" : ""}
                </span>
                <span className="opacity-70">{item.icon}</span>
                <span className="font-medium uppercase text-[12px]">{item.label}</span>
              </Link>

              {/* Sub-items (only for Notes for now) */}
              {item.slug === "notes" && openFolders.notes && (
                <div className="ml-4 border-l border-border/50 my-1">
                  <Link 
                    href="/notes/building-with-openclaw"
                    className="sidebar-item !py-1 text-[11px] opacity-60 hover:opacity-100"
                    onContextMenu={(e) => handleContextMenu(e, "building-with-openclaw")}
                  >
                    <span>📄</span> building-with-openclaw.md
                  </Link>
                  <Link 
                    href="/notes/lumiled-journey"
                    className="sidebar-item !py-1 text-[11px] opacity-60 hover:opacity-100"
                    onContextMenu={(e) => handleContextMenu(e, "lumiled-journey")}
                  >
                    <span>📄</span> lumiled-journey.md
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-black border border-border rounded px-2 py-1 text-xs outline-none focus:border-white/20 transition-colors"
          />
        </div>
      </aside>

      {/* Custom Context Menu */}
      {contextMenu.visible && (
        <div 
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div 
            className="context-menu-item"
            onClick={() => window.open(`/${contextMenu.itemSlug}`, '_blank')}
          >
            Open in New Tab
          </div>
          <div className="context-menu-item border-t border-border mt-1">
            Copy Link
          </div>
        </div>
      )}
    </>
  );
}
