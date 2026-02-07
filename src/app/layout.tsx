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
      <body className="antialiased selection:bg-accent selection:text-black">
        <div className="editor-layout">
          <Sidebar />

          {/* Main Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="h-10 border-b border-border flex items-center justify-between px-4 text-[11px] font-medium bg-sidebar-bg">
              <div className="flex gap-4">
                <span className="text-foreground">editor.tsx</span>
                <span className="opacity-30">main.py</span>
                <span className="opacity-30">lumi-led.dart</span>
              </div>
              <div className="flex gap-4 items-center">
                <button className="opacity-30 hover:opacity-100 transition-opacity">🌙</button>
              </div>
            </header>
            
            <div className="main-content">
              {/* Line Numbers */}
              <div className="line-numbers hidden lg:block">
                {Array.from({ length: 80 }).map((_, i) => (
                  <div key={i} className="px-3">{i + 1}</div>
                ))}
              </div>
              
              <div className="content-area">
                {children}
              </div>
            </div>

            {/* Status Bar */}
            <footer className="status-bar">
              <div className="flex-1 flex gap-4 uppercase tracking-tight">
                <span className="text-accent">● Main</span>
                <span>UTF-8</span>
                <span>TypeScript</span>
              </div>
              <div className="flex gap-4 opacity-50">
                <span>ln 1, col 1</span>
                <span>Spaces: 2</span>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
