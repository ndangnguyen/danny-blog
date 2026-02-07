"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTabs } from "../context/TabContext";

interface ContextMenuState {
  x: number;
  y: number;
  visible: boolean;
  itemSlug: string;
  itemPath: string;
}

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const { openTab } = useTabs();
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
    itemPath: "",
  });

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContextMenu = (e: React.MouseEvent, slug: string, path: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
      itemSlug: slug,
      itemPath: path,
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
    { label: "README", icon: "📄", slug: "", path: "/", isFolder: false },
    { label: "Notes", icon: "📁", slug: "notes", path: "/notes", isFolder: true },
    { label: "Stories", icon: "📁", slug: "stories", path: "/stories", isFolder: true },
    { label: "Newsletter", icon: "📁", slug: "newsletter", path: "/newsletter", isFolder: true },
    { label: "Photos", icon: "📁", slug: "photos", path: "/photos", isFolder: true },
  ];

  const notes = [
    { title: "building-with-openclaw.md", slug: "building-with-openclaw", path: "/notes/building-with-openclaw" },
    { title: "lumiled-journey.md", slug: "lumiled-journey", path: "/notes/lumiled-journey" },
  ];

  return (
    <>
      <aside className={`sidebar fixed inset-y-0 left-0 z-50 md:relative md:flex transition-transform duration-300 transform ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
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
            <button onClick={() => setMobileOpen(false)} className="md:hidden text-lg">×</button>
            <span className="hidden md:inline cursor-pointer hover:text-white">↕</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto pt-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <div 
                className={`sidebar-item group ${pathname === item.path ? "active" : ""}`}
                onContextMenu={(e) => handleContextMenu(e, item.label, item.path)}
                onClick={() => {
                  if (item.isFolder) {
                    toggleFolder(item.slug);
                  } else {
                    openTab({ title: `${item.label}.md`, path: item.path });
                    setMobileOpen(false);
                  }
                }}
              >
                <span className={`text-[10px] transition-transform ${openFolders[item.slug] ? "rotate-90" : ""}`}>
                  {item.isFolder ? "▶" : ""}
                </span>
                <span className="opacity-70">{item.icon}</span>
                <span className="font-medium uppercase text-[12px]">{item.label}</span>
              </div>

              {item.slug === "notes" && openFolders.notes && (
                <div className="ml-4 border-l border-border/50 my-1">
                  {notes.map((note) => (
                    <div 
                      key={note.slug}
                      onClick={() => {
                        openTab({ title: note.title, path: note.path });
                        setMobileOpen(false);
                      }}
                      className={`sidebar-item !py-1 text-[11px] opacity-60 hover:opacity-100 ${pathname === note.path ? "!opacity-100 text-white font-bold bg-white/5" : ""}`}
                      onContextMenu={(e) => handleContextMenu(e, note.title, note.path)}
                    >
                      <span>📄</span> {note.title}
                    </div>
                  ))}
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

      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {contextMenu.visible && (
        <div 
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <div 
            className="context-menu-item"
            onClick={() => window.open(contextMenu.itemPath, '_blank')}
          >
            Open in New Tab
          </div>
          <div 
            className="context-menu-item border-t border-border mt-1"
            onClick={() => {
              navigator.clipboard.writeText(window.location.origin + contextMenu.itemPath);
              closeContextMenu();
            }}
          >
            Copy Link
          </div>
        </div>
      )}
    </>
  );
}
