import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Danny's Blog | Digital Garden",
  description: "Senior Software Developer & AI Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-primary selection:text-white">
        <header className="fixed top-0 w-full z-50 glass">
          <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="text-xl font-bold tracking-tighter text-primary">
              DANNY<span className="text-foreground">.</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground hover:text-foreground">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="/projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
              <a href="/about" className="hover:text-primary transition-colors">About</a>
            </div>
            <button className="px-4 py-2 rounded-full bg-primary text-black text-xs font-bold hover:scale-105 transition-transform">
              Contact Me
            </button>
          </nav>
        </header>
        <main className="pt-24 min-h-screen max-w-7xl mx-auto px-6">
          {children}
        </main>
        <footer className="py-12 border-t border-card-border mt-24">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">© 2026 Danny. Built with Team Claw 🦾</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="https://github.com/ndangnguyen" className="hover:text-primary">GitHub</a>
              <a href="#" className="hover:text-primary">Twitter</a>
              <a href="#" className="hover:text-primary">LinkedIn</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
