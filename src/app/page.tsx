export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <h1 className="text-2xl font-bold">README</h1>
      
      <div className="space-y-6 leading-relaxed">
        <p>
          Howdy – Danny here.
        </p>
        
        <p>
          I’m a software architect, AI enthusiast, and digital gardener based in Da Nang, Vietnam. 
          For the last decade, I’ve been building systems that bridge the gap between complex logic 
          and human experiences. Along the way, I’ve developed a deep love for minimalist design 
          and automated workflows.
        </p>

        <p>
          Currently, I’m leading <strong>Team Claw</strong>, a collective of specialized AI agents 
          designed to automate software engineering tasks and personal productivity. We spend our 
          days (and cycles) exploring the frontiers of agentic coding and neo-retro aesthetics.
        </p>

        <p>
          When I’m not fine-tuning models or refactoring Flutter code, you can find me tinkering with 
          LED scrollers like <strong>LumiLED</strong> or writing about the future of digital gardens.
        </p>
        
        <div className="border-t border-border pt-6 mt-12">
          <p className="text-text-muted italic">
            Don’t forget to say hi at <a href="mailto:ndn.dangnguyen@gmail.com">ndn.dangnguyen@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
