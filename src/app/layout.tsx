import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Danny Nguyen / v1.0",
  description: "Senior Software Developer & AI Architect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-white selection:text-black">
        <div className="editor-layout bg-[#111]">
          {/* Main Sidebar Component */}
          <Sidebar />

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Editor Tabs Header */}
            <header className="h-12 border-b border-border flex items-center px-4 bg-[#121212] gap-px">
              <div className="h-full border-r border-border px-4 flex items-center gap-2 bg-[#111] border-t-2 border-t-accent text-xs font-bold">
                <span>README.md</span>
                <span className="opacity-30 hover:opacity-100 cursor-pointer">×</span>
              </div>
              <div className="h-full px-4 flex items-center gap-2 text-xs opacity-30 hover:bg-white/5 cursor-pointer">
                <span>building-with-openclaw.md</span>
              </div>
            </header>
            
            <div className="main-content flex-1 overflow-auto custom-scrollbar">
              {/* Line Numbers Sidebar */}
              <div className="line-numbers hidden lg:block border-r border-border/50">
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
              <div className="flex gap-6">
                <span className="text-white/80">● MAIN</span>
                <span>UTF-8</span>
                <span>TypeScript</span>
              </div>
              <div className="flex gap-4">
                <span>Line 1, Col 1</span>
                <span className="font-mono">{new Date().toLocaleDateString()}</span>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
