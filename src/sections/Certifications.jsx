import { portfolioData } from '../data/portfolioData'

export default function Certifications() {
  return (
    <section id="certifications" className="section w-full relative z-10 text-white pointer-events-none">
      <div className="container mx-auto max-w-6xl px-4 pointer-events-auto h-full flex flex-col justify-end pb-24">
        <div className="max-w-2xl mb-12">
          <div className="section-label">STOP 07 — CERTIFICATION SATELLITES</div>
          <h2 className="section-title">Certified Signals</h2>
          <p className="text-gray-400">Verifiable credentials orbiting my professional profile.</p>
        </div>

        {/* 
          This is kept intentionally minimal as the central glowing certification star
          and orbiting satellites will be the primary visual in 3D.
          This UI overlay will just list them out in a small horizontal scroll or grid.
        */}
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar">
          {portfolioData.certifications.map((cert) => (
            <div key={cert.id} className="min-w-[280px] glass-card p-5 rounded-xl snap-start group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-magenta)]/20 flex items-center justify-center text-[var(--color-magenta)] border border-[var(--color-magenta)]/30 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono text-[var(--color-magenta)] border border-[var(--color-magenta)]/20 px-2 py-1 rounded">
                  {cert.date}
                </span>
              </div>
              <h3 className="font-bold text-sm mb-1 leading-tight text-white group-hover:text-[var(--color-magenta)] transition-colors">{cert.title}</h3>
              <p className="text-xs text-gray-400">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
