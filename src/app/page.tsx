import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
          Dang Nguyen <span className="text-white/40">(Danny)</span>
        </h1>
        <p className="text-xl text-white/60 font-mono">
          Senior Software Engineer | Flutter Specialist | Web Architect
        </p>
        <div className="pt-4">
          <blockquote className="border-l-2 border-white/20 pl-6 py-2 italic text-lg text-white/80">
            "Architecting seamless digital experiences through technical excellence and creative problem-solving."
          </blockquote>
        </div>
      </section>

      <section className="space-y-6 text-white/70 leading-relaxed text-lg">
        <p>
          With over <strong className="text-white">8 years of professional experience</strong> in Mobile and Web development, 
          I specialize in building scalable, high-performance solutions. My approach combines deep architectural knowledge 
          with a focus on delivering real-world value and exceptional user engagement.
        </p>
      </section>

      {/* Technical Ecosystem */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-2">🛠 Technical Ecosystem</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-white font-bold flex items-center gap-2">📱 Mobile Platforms</h3>
            <ul className="space-y-2 text-white/60 list-disc list-inside ml-2">
              <li><strong className="text-white/90">Flutter:</strong> Specialist in GetX, BLoC, Provider, Clean Architecture.</li>
              <li><strong className="text-white/90">Android Native:</strong> Kotlin/Java for high-performance apps.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-bold flex items-center gap-2">🌐 Frontend</h3>
            <ul className="space-y-2 text-white/60 list-disc list-inside ml-2">
              <li><strong className="text-white/90">Next.js & Nuxt.js:</strong> Expert in SSR/SSG & modern web apps.</li>
              <li><strong className="text-white/90">Optimization:</strong> SEO, Core Web Vitals, premium UI/UX.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-bold flex items-center gap-2">⚙️ Backend</h3>
            <ul className="space-y-2 text-white/60 list-disc list-inside ml-2">
              <li><strong className="text-white/90">Core:</strong> NestJS, Node.js, Prisma.</li>
              <li><strong className="text-white/90">Databases:</strong> PostgreSQL, MySQL, NoSQL.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-bold flex items-center gap-2">🤖 AI & Future</h3>
            <ul className="space-y-2 text-white/60 list-disc list-inside ml-2">
              <li><strong className="text-white/90">Vibe Coding:</strong> Expert in AI-assisted development cycles.</li>
              <li><strong className="text-white/90">Integration:</strong> Production-ready LLM & AI workflows.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership & Philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-y border-white/5">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">👥 Leadership</h2>
          <p className="text-white/60 leading-relaxed">
            Experienced <strong className="text-white/90">Technical Lead</strong>, guiding cross-functional teams, 
            mentoring developers, and defining architectural standards for complex projects.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">💡 Philosophy</h2>
          <p className="text-white/60 leading-relaxed italic">
            "I believe that great software is built at the intersection of human-centric design and technical precision."
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">🏆 Awards & Achievements</h2>
        <div className="space-y-4">
          {[
            { title: "Employee of the First 6 Months", org: "HK*", year: "2022" },
            { title: "Best Developer of the Month", org: "Gameloft", year: "2018" },
            { title: "University Scholarship", org: "Hue University of Education", year: "2018" }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 group hover:border-white/20 transition-colors">
              <span className="text-white/80 group-hover:text-white transition-colors">{item.title}</span>
              <span className="text-white/40 font-mono text-sm">{item.org} • {item.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-12">
        <div className="bg-white/5 rounded-2xl p-8 space-y-6 border border-white/10">
          <h2 className="text-2xl font-bold text-white">📫 Connect with Me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="https://t.me/devlordz" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <span className="text-2xl">📱</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Telegram</div>
                <div className="text-white font-mono">@devlordz</div>
              </div>
            </a>
            <a href="mailto:ndn.dangnguyen@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <span className="text-2xl">✉️</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">Email</div>
                <div className="text-white font-mono">ndn.dangnguyen@gmail.com</div>
              </div>
            </a>
          </div>
          <div className="text-center pt-4">
            <p className="text-white/40 italic">“Coding with heart, leading with vision.” ✨</p>
          </div>
        </div>
      </section>
    </div>
  );
}
