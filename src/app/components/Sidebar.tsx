"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTabs } from "../context/TabContext";
import { photoData } from "../data/photos";

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
  const { openTab, replaceTab } = useTabs();
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    notes: true,
    stories: false,
    newsletter: false,
    photos: false,
  });
  const [searchQuery, setSearchQuery] = useState("");

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
    { title: "8-stages-ai-programming.md", slug: "8-stages-ai-programming", path: "/notes/8-stages-ai-programming" },
    { title: "bi-blog-2026-02-08.md", slug: "bi-blog-2026-02-08", path: "/notes/bi-blog-2026-02-08" },
    { title: "solid-principles.md", slug: "solid-principles", path: "/notes/solid-principles" },
    { title: "dry-kiss-yagni.md", slug: "dry-kiss-yagni", path: "/notes/dry-kiss-yagni" },
    { title: "clean-architecture.md", slug: "clean-architecture", path: "/notes/clean-architecture" },
    { title: "design-patterns.md", slug: "design-patterns", path: "/notes/design-patterns" },
    { title: "flutter-state-management.md", slug: "flutter-state-management", path: "/notes/flutter-state-management" },
    { title: "flutter-rendering-deep-dive.md", slug: "flutter-rendering-deep-dive", path: "/notes/flutter-rendering-deep-dive" },
    { title: "flutter-custom-painter.md", slug: "flutter-custom-painter", path: "/notes/flutter-custom-painter" },
    { title: "flutter-performance-tips.md", slug: "flutter-performance-tips", path: "/notes/flutter-performance-tips" },
  ];

  const stories = [
    { title: "cau-truc-workspace-openclaw.md", slug: "cau-truc-workspace-openclaw", path: "/stories/cau-truc-workspace-openclaw" },
    { title: "thuat-ngu-openclaw.md", slug: "thuat-ngu-openclaw", path: "/stories/thuat-ngu-openclaw" },
    { title: "huong-dan-cli-openclaw.md", slug: "huong-dan-cli-openclaw", path: "/stories/huong-dan-cli-openclaw" },
    { title: "tong-hop-lenh-openclaw.md", slug: "tong-hop-lenh-openclaw", path: "/stories/tong-hop-lenh-openclaw" },
    { title: "nghe-thuat-ghi-nho-trong-openclaw.md", slug: "nghe-thuat-ghi-nho-trong-openclaw", path: "/stories/nghe-thuat-ghi-nho-trong-openclaw" },
    { title: "huong-dan-lam-chu-openclaw.md", slug: "huong-dan-lam-chu-openclaw", path: "/stories/huong-dan-lam-chu-openclaw" },
    { title: "bi-story-2026-02-08.md", slug: "bi-story-2026-02-08", path: "/stories/bi-story-2026-02-08" },
  ];

  const newsletter = [
    { title: "ai-newsletter-2026-02-08.md", slug: "ai-newsletter-2026-02-08", path: "/newsletter/ai-newsletter-2026-02-08" },
  ];

  const allSearchableItems = [
    ...navItems.filter((i) => !i.isFolder).map((i) => ({ title: `${i.label}.md`, path: i.path })),
    ...notes.map((n) => ({ title: n.title, path: n.path })),
    ...photoData.flatMap((y) =>
      y.photos.map((p) => ({ title: p.filename, path: `/photos/${p.year}/${p.slug}` }))
    ),
  ];

  const searchResults = searchQuery.trim()
    ? allSearchableItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  // Check if a path is active (exact match or starts with for nested routes)
  const isActive = (path: string) => pathname === path;
  const isPhotoActive = (year: number, slug: string) =>
    pathname === `/photos/${year}/${slug}`;

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
                className={`sidebar-item group ${isActive(item.path) ? "active" : ""}`}
                onContextMenu={(e) => handleContextMenu(e, item.label, item.path)}
                onClick={() => {
                  if (item.isFolder) {
                    replaceTab({ title: item.label, path: item.path });
                    setMobileOpen(false);
                  } else {
                    replaceTab({ title: `${item.label}.md`, path: item.path });
                    setMobileOpen(false);
                  }
                }}
              >
                <span
                  className={`text-[10px] p-1 -m-1 hover:bg-white/10 rounded transition-transform ${openFolders[item.slug] ? "rotate-90" : ""}`}
                  onClick={(e) => {
                    if (item.isFolder) {
                      e.stopPropagation();
                      toggleFolder(item.slug);
                    }
                  }}
                >
                  {item.isFolder ? "▶" : ""}
                </span>
                <span className="opacity-70">{item.icon}</span>
                <span className="font-medium uppercase text-[12px]">{item.label}</span>
              </div>

              {/* Notes children */}
              {item.slug === "notes" && openFolders.notes && (
                <div className="ml-4 border-l border-border/50 my-1">
                  {notes.map((note) => (
                    <div
                      key={note.slug}
                      onClick={() => {
                        replaceTab({ title: note.title, path: note.path });
                        setMobileOpen(false);
                      }}
                      className={`sidebar-item !py-1 text-[10px] opacity-60 hover:opacity-100 ${isActive(note.path) ? "!opacity-100 text-white font-bold bg-white/5" : ""}`}
                      onContextMenu={(e) => handleContextMenu(e, note.title, note.path)}
                    >
                      <span>📄</span> {note.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Stories children */}
              {item.slug === "stories" && openFolders.stories && (
                <div className="ml-4 border-l border-border/50 my-1">
                  {stories.map((story) => (
                    <div
                      key={story.slug}
                      onClick={() => {
                        replaceTab({ title: story.title, path: story.path });
                        setMobileOpen(false);
                      }}
                      className={`sidebar-item !py-1 text-[10px] opacity-60 hover:opacity-100 ${isActive(story.path) ? "!opacity-100 text-white font-bold bg-white/5" : ""}`}
                      onContextMenu={(e) => handleContextMenu(e, story.title, story.path)}
                    >
                      <span>📄</span> {story.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Newsletter children */}
              {item.slug === "newsletter" && openFolders.newsletter && (
                <div className="ml-4 border-l border-border/50 my-1">
                  {newsletter.map((item) => (
                    <div
                      key={item.slug}
                      onClick={() => {
                        replaceTab({ title: item.title, path: item.path });
                        setMobileOpen(false);
                      }}
                      className={`sidebar-item !py-1 text-[10px] opacity-60 hover:opacity-100 ${isActive(item.path) ? "!opacity-100 text-white font-bold bg-white/5" : ""}`}
                      onContextMenu={(e) => handleContextMenu(e, item.title, item.path)}
                    >
                      <span>📄</span> {item.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Photos children - year folders and individual photos */}
              {item.slug === "photos" && openFolders.photos && (
                <div className="ml-4 border-l border-border/50 my-1">
                  {photoData.map((yearGroup) => (
                    <div key={yearGroup.year}>
                      {/* Year folder */}
                      <div
                        className={`sidebar-item !py-1 text-[10px] opacity-60 hover:opacity-100 ${isActive(`/photos/${yearGroup.year}`)
                          ? "!opacity-100 text-white font-bold bg-white/5"
                          : ""
                          }`}
                        onClick={() => {
                          // Year doesn't have a dedicated page yet, but we could navigate to a filtered photos page
                          // For now, clicking the label also toggles the folder for convenience unless requested otherwise
                          toggleFolder(`photos-${yearGroup.year}`);
                        }}
                      >
                        <span
                          className={`text-[8px] p-1 -m-1 hover:bg-white/10 rounded transition-transform inline-block ${openFolders[`photos-${yearGroup.year}`] ? "rotate-90" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFolder(`photos-${yearGroup.year}`);
                          }}
                        >
                          ▶
                        </span>
                        <span>📁</span>
                        <span>{yearGroup.year}</span>
                      </div>

                      {/* Photos in that year */}
                      {openFolders[`photos-${yearGroup.year}`] && (
                        <div className="ml-4 border-l border-border/30 my-0.5">
                          {yearGroup.photos.map((photo) => (
                            <div
                              key={photo.slug}
                              onClick={() => {
                                replaceTab({
                                  title: photo.filename,
                                  path: `/photos/${photo.year}/${photo.slug}`,
                                });
                                setMobileOpen(false);
                              }}
                              className={`sidebar-item !py-0.5 text-[10px] opacity-50 hover:opacity-100 ${isPhotoActive(photo.year, photo.slug)
                                ? "!opacity-100 text-white font-bold bg-white/5"
                                : ""
                                }`}
                              onContextMenu={(e) =>
                                handleContextMenu(e, photo.filename, `/photos/${photo.year}/${photo.slug}`)
                              }
                            >
                              <span>🖼️</span>
                              <span className="truncate">{photo.filename}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-border rounded px-2 py-1 text-xs outline-none focus:border-white/20 transition-colors"
          />
          {searchQuery.trim() && (
            <div className="mt-2 space-y-0.5 max-h-40 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    key={item.path}
                    onClick={() => {
                      replaceTab({ title: item.title, path: item.path });
                      setSearchQuery("");
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 text-[10px] text-white/60 hover:text-white hover:bg-white/5 rounded cursor-pointer transition-colors"
                  >
                    <span>📄</span>
                    <span className="truncate">{item.title}</span>
                  </div>
                ))
              ) : (
                <div className="px-2 py-1.5 text-[10px] text-white/30 italic">No results found</div>
              )}
            </div>
          )}
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
            onClick={() => {
              openTab({ title: contextMenu.itemSlug, path: contextMenu.itemPath });
              closeContextMenu();
            }}
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
