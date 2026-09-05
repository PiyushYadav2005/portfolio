import { portfolioData } from '../data/portfolioData'

export default function Experience() {
  const exp = portfolioData.experience[0]; // KODBUD

  return (
    <section id="experience" className="section w-full relative z-10 text-white pointer-events-none">
      <div className="container mx-auto max-w-6xl px-4 pointer-events-auto flex items-center h-full">
        <div className="max-w-xl">
          <div className="section-label">STOP 03 — EXPERIENCE ORBIT</div>
          <h2 className="section-title">Mission Experience</h2>
          <p className="text-gray-400 mb-12 text-lg">Every mission adds another layer to the journey.</p>

          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -z-10 group-hover:bg-green-500/20 transition-all duration-700"></div>
            
            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
              <div>
                <div className="text-xs font-mono text-green-400 mb-2 tracking-widest uppercase">Mission 01</div>
                <h3 className="text-2xl font-bold mb-1 text-white">{exp.company}</h3>
                <h4 className="text-lg text-gray-300">{exp.role}</h4>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded-full border border-green-500/30">
                  {exp.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-mono text-gray-400">
                <span>{exp.startDate} → {exp.endDate}</span>
                <span>{exp.duration}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-green-500/30 pl-4 py-1">
                {exp.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/10">
              <div>
                <h5 className="text-xs font-mono text-gray-500 mb-3 tracking-widest uppercase">Objectives</h5>
                <ul className="space-y-2">
                  {exp.objectives.slice(0, 3).map((obj, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-500 mt-1">⯈</span> {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-xs font-mono text-gray-500 mb-3 tracking-widest uppercase">Completion</h5>
                <ul className="space-y-2">
                  {exp.completion.map((comp, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2 opacity-80">
                      <span className="text-gray-600 mt-1">○</span> {comp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-gray-600 tracking-widest">
              {exp.program}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
