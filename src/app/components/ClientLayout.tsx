"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="editor-layout bg-[#111]">
      {/* Main Sidebar Component */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Editor Tabs Header */}
        <header className="h-12 border-b border-border flex items-center px-4 bg-[#121212] gap-px">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileOpen(true)}
            className="md:hidden mr-4 p-1 hover:bg-white/10 rounded transition-colors text-lg"
          >
            📁
          </button>

          <div className="h-full border-r border-border px-4 flex items-center gap-2 bg-[#111] border-t-2 border-t-accent text-xs font-bold whitespace-nowrap">
            <span>README.md</span>
            <span className="opacity-30 hover:opacity-100 cursor-pointer">×</span>
          </div>
          <div className="hidden sm:flex h-full px-4 items-center gap-2 text-xs opacity-30 hover:bg-white/5 cursor-pointer whitespace-nowrap">
            <span>building-with-openclaw.md</span>
          </div>
        </header>
        
        <div className="main-content flex-1 overflow-auto custom-scrollbar">
          {/* Line Numbers Sidebar */}
          <div className="line-numbers hidden sm:block border-r border-border/50">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="pr-3 leading-6">{i + 1}</div>
            ))}
          </div>
          
          <div className="content-area min-h-full">
            {children}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <footer className="status-bar border-t border-border flex justify-between items-center px-4 bg-[#121212] text-[#555] uppercase tracking-widest font-bold">
          <div className="flex gap-6 text-[9px] sm:text-[10px]">
            <span className="text-white/80">● MAIN</span>
            <span className="hidden xs:inline">UTF-8</span>
            <span className="hidden xs:inline">TypeScript</span>
          </div>
          <div className="flex gap-4 text-[9px] sm:text-[10px]">
            <span className="hidden sm:inline">Line 1, Col 1</span>
            <span className="font-mono text-[9px]">{new Date().toLocaleDateString()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
