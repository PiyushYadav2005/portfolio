import { portfolioData } from '../data/portfolioData'

export default function Skills() {
  return (
    <section id="skills" className="section w-full relative z-10 text-white pointer-events-none">
      <div className="container mx-auto max-w-7xl px-4 pointer-events-auto h-full flex flex-col justify-center">
        <div className="max-w-2xl text-center mx-auto mb-16">
          <div className="section-label">STOP 05 — PLANET EARTH</div>
          <h2 className="section-title">Technical Universe</h2>
          <p className="text-gray-400 text-lg">The technologies powering my digital worlds.</p>
        </div>

        {/* 
          This is kept intentionally minimal because the 3D Earth and its orbiting technology
          nodes will serve as the primary visual and interactive element for this section.
          The UI just provides the heading and some subtle context. 
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto opacity-60">
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category} className="glass-card p-4 rounded-xl">
              <h3 className="text-xs font-mono text-[var(--color-cyan)] uppercase tracking-widest mb-3 border-b border-white/10 pb-2">
                {category} Orbit
              </h3>
              <ul className="space-y-1">
                {skills.slice(0, 3).map((skill, idx) => (
                  <li key={idx} className="text-xs text-gray-400 truncate">{skill}</li>
                ))}
                {skills.length > 3 && (
                  <li className="text-xs text-gray-600 italic">+{skills.length - 3} more</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
