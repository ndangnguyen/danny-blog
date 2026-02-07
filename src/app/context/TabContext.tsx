"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Tab {
  title: string;
  path: string;
}

interface TabContextType {
  tabs: Tab[];
  activePath: string;
  openTab: (tab: Tab) => void;
  closeTab: (path: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  // Helper to get title from path
  const getTitleFromPath = (path: string) => {
    if (path === "/") return "README.md";
    const parts = path.split("/");
    let name = parts[parts.length - 1];
    if (path.startsWith("/notes/")) return `${name}.md`;
    return name;
  };

  // Ensure current page is always in tabs
  useEffect(() => {
    const title = getTitleFromPath(pathname);
    setTabs((prev) => {
      if (prev.find((t) => t.path === pathname)) return prev;
      return [...prev, { title, path: pathname }];
    });
  }, [pathname]);

  const openTab = (tab: Tab) => {
    if (!tabs.find((t) => t.path === tab.path)) {
      setTabs([...tabs, tab]);
    }
    router.push(tab.path);
  };

  const closeTab = (path: string) => {
    const newTabs = tabs.filter((t) => t.path !== path);
    setTabs(newTabs);
    
    // If we closed the active tab, navigate to the last one
    if (path === pathname && newTabs.length > 0) {
      router.push(newTabs[newTabs.length - 1].path);
    } else if (newTabs.length === 0) {
      router.push("/");
    }
  };

  return (
    <TabContext.Provider value={{ tabs, activePath: pathname, openTab, closeTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTabs must be used within a TabProvider");
  return context;
}
