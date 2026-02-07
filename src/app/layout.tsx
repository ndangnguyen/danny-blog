"use client";

import { useState } from "react";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { TabProvider, useTabs } from "./context/TabContext";

function EditorLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { tabs, activePath, closeTab, openTab } = useTabs();

  return (
    <div className="editor-layout bg-[#111]">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Editor Tabs Header */}
        <header className="h-10 border-b border-border flex items-center bg-[#121212] overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setMobileOpen(true)}
            className="md:hidden px-3 h-full hover:bg-white/10 transition-colors border-r border-border"
          >
            📁
          </button>

          {tabs.map((tab) => (
            <div 
              key={tab.path}
              onClick={() => openTab(tab)}
              className={`h-full px-4 flex items-center gap-3 text-[11px] border-r border-border cursor-pointer transition-colors group whitespace-nowrap ${
                activePath === tab.path 
                  ? "bg-[#111] border-t-2 border-t-accent font-bold text-white" 
                  : "opacity-40 hover:opacity-100 hover:bg-white/5"
              }`}
            >
              <span>{tab.title}</span>
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.path);
                }}
                className="opacity-0 group-hover:opacity-50 hover:!opacity-100 px-1"
              >
                ×
              </span>
            </div>
          ))}
        </header>
        
        <div className="main-content flex-1 overflow-auto custom-scrollbar">
          <div className="line-numbers hidden sm:block border-r border-border/50">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="pr-3 leading-6 text-[#444]">{i + 1}</div>
            ))}
          </div>
          
          <div className="content-area min-h-full">
            {children}
          </div>
        </div>

        <footer className="status-bar border-t border-border flex justify-between items-center px-4 bg-[#121212] text-[#555] uppercase tracking-widest font-bold">
          <div className="flex gap-6 text-[9px] sm:text-[10px]">
            <span className="text-white/80">● MAIN</span>
            <span className="hidden xs:inline">UTF-8</span>
            <span className="hidden xs:inline">TypeScript</span>
          </div>
          <div className="flex gap-4 text-[9px] sm:text-[10px]">
            <span className="hidden sm:inline">Line 1, Col 1</span>
            <span className="font-mono">{new Date().toLocaleDateString()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-white selection:text-black">
        <TabProvider>
          <EditorLayout>{children}</EditorLayout>
        </TabProvider>
      </body>
    </html>
  );
}
