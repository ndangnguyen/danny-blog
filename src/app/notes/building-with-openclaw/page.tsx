export default function OpenClawNote() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <time className="text-xs text-text-muted">February 7, 2026</time>
        <h1 className="text-2xl font-bold">Building with OpenClaw</h1>
      </header>

      <div className="space-y-6 leading-relaxed">
        <p>
          Automation in software engineering is nothing new, but the rise of 
          <strong>agentic workflows</strong> has fundamentally changed how I approach my daily tasks. 
          OpenClaw is at the center of this shift.
        </p>

        <p>
          Instead of writing single scripts for specific tasks, I now coordinate a 
          <strong>Multi-Agent System (MAS)</strong>. My team, which I call <em>Team Claw</em>, 
          consists of specialized personalities:
        </p>

        <ul className="list-disc pl-6 space-y-4">
          <li><strong>Claw Lead:</strong> Handles coordination and high-level planning.</li>
          <li><strong>Claw QA:</strong> Ruthlessly hunts for bugs and edge cases.</li>
          <li><strong>Claw DevOps:</strong> Manages deployments and CI/CD stability.</li>
          <li><strong>Claw Frontend/Backend:</strong> Focuses on the implementation of logic and design.</li>
        </ul>

        <p>
          This setup allows me to delegate complex tasks—like refactoring a 3,000-line 
          Flutter file or setting up a full-stack blog—simply by talking to the Lead agent. 
          The agents communicate with each other, check each other's work, and report 
          back to me on Discord.
        </p>

        <p>
          It feels less like coding and more like conducting an orchestra. The future 
          of software engineering is here, and it’s agentic.
        </p>
      </div>

      <footer className="pt-12 border-t border-border mt-12">
        <a href="/notes" className="text-sm no-underline hover:underline">← Back to notes</a>
      </footer>
    </div>
  );
}
