export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24 space-y-6">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Senior Software Developer</h2>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl">
          Building the future of <span className="text-primary">AI Automation</span> & Digital Experiences.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          I'm Danny, a software architect based in Da Nang. Passionate about AI agents, 
          Neo-Retro aesthetics, and building scalable applications with Flutter & Next.js.
        </p>
      </section>

      {/* Bento Grid */}
      <section className="bento-grid">
        {/* Large Card: Featured Project */}
        <div className="col-span-2 row-span-2 glass rounded-3xl p-8 flex flex-col justify-between hover:border-primary transition-all group">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold text-primary uppercase">Latest Work</span>
            </div>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">LumiLED App</h3>
            <p className="text-muted-foreground">Neo-Retro Arcade LED Scroller. Sync mode, particle effects, and high performance.</p>
          </div>
          <div className="w-full h-48 bg-card-border rounded-xl mt-8 flex items-center justify-center text-4xl">💡</div>
        </div>

        {/* Medium Card: About Me */}
        <div className="col-span-2 glass rounded-3xl p-8 flex flex-col justify-center gap-2 hover:border-secondary transition-all">
          <h3 className="text-xl font-bold">About Me</h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            10+ years of experience in mobile and web development. Leading a team of AI agents (Team Claw) 
            to automate everything.
          </p>
        </div>

        {/* Small Card: Blog Count */}
        <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-white/[0.03] transition-all">
          <span className="text-4xl font-bold text-primary">12+</span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center">Blog Posts</span>
        </div>

        {/* Small Card: GitHub Stats */}
        <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-white/[0.03] transition-all">
          <span className="text-4xl font-bold text-secondary">48</span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center">Repositories</span>
        </div>

        {/* Medium Card: Contact/Social */}
        <div className="col-span-2 glass rounded-3xl p-8 flex items-center justify-between hover:bg-white/[0.03] transition-all">
          <div>
            <h3 className="text-xl font-bold mb-1">Let's Connect</h3>
            <p className="text-sm text-muted-foreground">Follow my journey on GitHub & Twitter.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-card-border flex items-center justify-center text-xl hover:text-primary transition-colors cursor-pointer">𝕏</div>
            <div className="w-10 h-10 rounded-full bg-card-border flex items-center justify-center text-xl hover:text-primary transition-colors cursor-pointer"></div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Recent Thoughts</h2>
          <a href="/blog" className="text-primary font-medium hover:underline flex items-center gap-2">
            View All Posts <span>→</span>
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 group cursor-pointer">
              <div className="aspect-video bg-card-border rounded-2xl group-hover:scale-[1.02] transition-transform"></div>
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Feb 7, 2026 • 5 min read</span>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">How I automated my workflow with OpenClaw</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">Exploring the potential of multi-agent systems in daily software engineering tasks...</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
