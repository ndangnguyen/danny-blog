import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danny / v1.0",
  description: "Senior Software Developer & AI Architect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="editor-layout">
          {/* Sidebar */}
          <aside className="sidebar hidden md:flex">
            <div className="p-4 border-b border-border flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
              <span>Danny Nguyen</span>
              <span className="text-line-numbers">/ v1.0</span>
            </div>
            <nav className="flex-1 p-2 space-y-1">
              <a href="/" className="block p-2 hover:bg-white rounded transition-colors text-sm no-underline font-medium">README.md</a>
              <a href="/notes" className="block p-2 hover:bg-white rounded transition-colors text-sm no-underline text-text-muted">Notes</a>
              <a href="/projects" className="block p-2 hover:bg-white rounded transition-colors text-sm no-underline text-text-muted">Projects</a>
              <a href="/newsletter" className="block p-2 hover:bg-white rounded transition-colors text-sm no-underline text-text-muted">Newsletter</a>
            </nav>
            <div className="p-4 border-t border-border">
              <input 
                type="text" 
                placeholder="Filter..." 
                className="w-full bg-white border border-border rounded px-2 py-1 text-xs outline-none"
              />
            </div>
          </aside>

          {/* Main Area */}
          <div className="flex-1 flex flex-col h-full">
            <header className="h-10 border-b border-border flex items-center justify-between px-4 text-xs font-bold bg-sidebar-bg">
              <div className="flex gap-4">
                <span>README.md</span>
              </div>
              <div className="flex gap-4 items-center">
                <button className="opacity-50 hover:opacity-100">☀️</button>
              </div>
            </header>
            
            <div className="main-content">
              {/* Line Numbers Simulation */}
              <div className="line-numbers hidden lg:block">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              <div className="content-area">
                {children}
              </div>
            </div>

            {/* Status Bar */}
            <footer className="status-bar">
              <div className="flex-1 flex gap-4">
                <span>UTF-8</span>
                <span>TypeScript</span>
              </div>
              <div className="flex gap-4">
                <span>{new Date().toLocaleDateString()}</span>
                <span className="font-mono opacity-70">78e9c67</span>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
