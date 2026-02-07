import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 text-sm">
      {/* Hero Section */}
      <section className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl text-white">
          Dang Nguyen <span className="text-white/40">(Danny)</span>
        </h1>
        <p className="text-sm text-white/60 font-mono">
          Senior Software Engineer | Flutter Specialist | Web Architect
        </p>
      </section>

      <section className="text-white/70 leading-relaxed">
        <p>
          With over <strong className="text-white">8 years of professional experience</strong> in Mobile and Web development,
          I specialize in building scalable, high-performance solutions. My approach combines deep architectural knowledge
          with a focus on delivering real-world value and exceptional user engagement.
        </p>
      </section>

      {/* Technical Ecosystem */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-white border-b border-white/10 pb-2">🛠 Technical Ecosystem</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
            <h3 className="text-white font-semibold flex items-center gap-2 text-[13px]">📱 Mobile Platforms</h3>
            <ul className="space-y-1 text-white/55 list-disc list-inside text-[13px]">
              <li><strong className="text-white/80">Flutter:</strong> GetX, BLoC, Provider, Clean Architecture.</li>
              <li><strong className="text-white/80">Android Native:</strong> Kotlin/Java, high-performance apps.</li>
            </ul>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
            <h3 className="text-white font-semibold flex items-center gap-2 text-[13px]">🌐 Frontend</h3>
            <ul className="space-y-1 text-white/55 list-disc list-inside text-[13px]">
              <li><strong className="text-white/80">Next.js & Nuxt.js:</strong> SSR/SSG & modern web apps.</li>
              <li><strong className="text-white/80">Optimization:</strong> SEO, Core Web Vitals, premium UI/UX.</li>
            </ul>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
            <h3 className="text-white font-semibold flex items-center gap-2 text-[13px]">⚙️ Backend</h3>
            <ul className="space-y-1 text-white/55 list-disc list-inside text-[13px]">
              <li><strong className="text-white/80">Core:</strong> NestJS, Node.js, Prisma.</li>
              <li><strong className="text-white/80">Databases:</strong> PostgreSQL, MySQL, NoSQL.</li>
            </ul>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
            <h3 className="text-white font-semibold flex items-center gap-2 text-[13px]">🐳 DevOps</h3>
            <ul className="space-y-1 text-white/55 list-disc list-inside text-[13px]">
              <li><strong className="text-white/80">Infrastructure:</strong> Docker, CI/CD, deployment & env management.</li>
              <li><strong className="text-white/80">Optimization:</strong> Nginx reverse proxy, caching & performance.</li>
            </ul>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
            <h3 className="text-white font-semibold flex items-center gap-2 text-[13px]">🎮 Game Development</h3>
            <ul className="space-y-1 text-white/55 list-disc list-inside text-[13px]">
              <li><strong className="text-white/80">Unity & Cocos2d-x:</strong> Full game dev, gameplay logic.</li>
              <li><strong className="text-white/80">Performance:</strong> Game optimization & rendering pipelines.</li>
            </ul>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2.5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300">
            <h3 className="text-white font-semibold flex items-center gap-2 text-[13px]">👥 Leadership</h3>
            <ul className="space-y-1 text-white/55 list-disc list-inside text-[13px]">
              <li><strong className="text-white/80">Technical Lead:</strong> Cross-functional teams & mentoring.</li>
              <li><strong className="text-white/80">Architecture:</strong> Standards for complex, scalable projects.</li>
            </ul>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section>
        <div className="bg-white/5 rounded-2xl p-6 space-y-4 border border-white/10">
          <h2 className="text-base font-bold text-white">📫 Connect with Me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://t.me/devlordz" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <span className="text-lg">📱</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Telegram</div>
                <div className="text-white font-mono">@devlordz</div>
              </div>
            </a>
            <a href="mailto:ndn.dangnguyen@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <span className="text-lg">✉️</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Email</div>
                <div className="text-white font-mono">ndn.dangnguyen@gmail.com</div>
              </div>
            </a>
          </div>
          <div className="text-center pt-2">
            <p className="text-white/40 italic text-xs">“Coding with heart, leading with vision.” ✨</p>
          </div>
        </div>
      </section>
    </div>
  );
}
