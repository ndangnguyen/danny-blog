export default function LumiLEDNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 6, 2026</time>
        <h1 className="text-2xl font-bold">The LumiLED Journey</h1>
      </header>

      <div className="space-y-6 leading-relaxed">
        <p>
          LumiLED started as a simple curiosity: How can we replicate the tactile, 
          glowing feel of old arcade LED boards on modern high-resolution screens?
        </p>

        <p>
          The project evolved into a sophisticated Flutter application. 
          The core challenge wasn't just drawing dots, but making them <em>feel</em> 
          alive. We implemented custom particle systems to simulate the "bleeding" 
          of light between pixels and used P2P networking for <strong>Sync Mode</strong>.
        </p>

        <p>
          Design-wise, we leaned heavily into the <strong>Neo-Retro</strong> aesthetic. 
          It's about taking the constraints of the past and blowing them out with 
          the power of modern hardware. Deep blacks, glowing oranges, and 
          perfectly aligned grids.
        </p>

        <p>
          As we move toward a public release, the focus is now on performance 
          optimization and building a robust preset system for creators.
        </p>
      </div>

      <footer className="pt-12 border-t border-border mt-12">
        <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
      </footer>
    </div>
  );
}
