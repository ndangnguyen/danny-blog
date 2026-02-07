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

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
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
      <aside className={`sidebar fixed inset-y-0 left-0 z-50 md:relative md:flex transition-transform duration-300 transform ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Header Section */}
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
              <Link 
                href={`/${item.slug}`}
                className={`sidebar-item group ${pathname === `/${item.slug}` ? "active" : ""}`}
                onContextMenu={(e) => handleContextMenu(e, item.slug)}
                onClick={(e) => {
                  if (item.isFolder) {
                    e.preventDefault();
                    toggleFolder(item.slug);
                  } else {
                    setMobileOpen(false);
                  }
                }}
              >
                <span className={`text-[10px] transition-transform ${openFolders[item.slug] ? "rotate-90" : ""}`}>
                  {item.isFolder ? "▶" : ""}
                </span>
                <span className="opacity-70">{item.icon}</span>
                <span className="font-medium uppercase text-[12px]">{item.label}</span>
              </Link>

              {/* Sub-items */}
              {item.slug === "notes" && openFolders.notes && (
                <div className="ml-4 border-l border-border/50 my-1">
                  <Link 
                    href="/notes/building-with-openclaw"
                    className="sidebar-item !py-1 text-[11px] opacity-60 hover:opacity-100"
                    onClick={() => setMobileOpen(false)}
                    onContextMenu={(e) => handleContextMenu(e, "building-with-openclaw")}
                  >
                    <span>📄</span> building-with-openclaw.md
                  </Link>
                  <Link 
                    href="/notes/lumiled-journey"
                    className="sidebar-item !py-1 text-[11px] opacity-60 hover:opacity-100"
                    onClick={() => setMobileOpen(false)}
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

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

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
