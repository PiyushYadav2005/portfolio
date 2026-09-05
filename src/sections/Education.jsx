import { portfolioData } from '../data/portfolioData'

export default function Education() {
  return (
    <section id="education" className="section w-full relative z-10 text-white pointer-events-none">
      <div className="container mx-auto max-w-6xl px-4 pointer-events-auto flex justify-end h-full items-center">
        <div className="max-w-xl w-full">
          <div className="section-label">STOP 06 — EDUCATION ORBIT</div>
          <h2 className="section-title">Learning Trajectory</h2>
          
          <div className="space-y-8 mt-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {portfolioData.education.map((edu, idx) => (
              <div key={edu.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                {/* Icon/Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[var(--color-bg-subtle)] group-hover:border-[var(--color-accent)] group-hover:shadow-[0_0_15px_var(--color-accent-glow)] text-[var(--color-accent)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300 z-10">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div>
                </div>
                
                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono text-[var(--color-accent)] tracking-widest">
                      {edu.period}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                      Milestone 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                  <h4 className="text-sm text-gray-300 mb-3">{edu.institution}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {edu.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
