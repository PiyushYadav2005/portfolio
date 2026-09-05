import { useState, useEffect } from 'react'
import SpaceScene from './3d/SpaceScene'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Certifications from './sections/Certifications'
import Contact from './sections/Contact'
import Loader from './components/Loader'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { scrollProgress } = useSmoothScroll()

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  if (!loaded) {
    return <Loader />
  }

  return (
    <>
      {/* Fixed 3D Space Background */}
      <SpaceScene scrollProgress={scrollProgress} />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Journey Progress Indicator */}
      <div style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
        className="journey-progress"
      >
        {[
          { label: '01 Galaxy', t: 0.00, color: '#6c63ff' },
          { label: '02 Nebula', t: 0.14, color: '#00e5ff' },
          { label: '03 Experience', t: 0.28, color: '#10b981' },
          { label: '04 Solar', t: 0.42, color: '#fbbf24' },
          { label: '05 Earth', t: 0.57, color: '#34d399' },
          { label: '06 Education', t: 0.71, color: '#8b5cf6' },
          { label: '07 Certs', t: 0.85, color: '#f472b6' },
          { label: '08 Contact', t: 1.00, color: '#6c63ff' },
        ].map((stop) => {
          // A bit of tolerance since scrollProgress maps continuously from 0 to 1
          const active = scrollProgress >= stop.t - 0.07
          return (
            <div key={stop.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexDirection: 'row-reverse',
            }}>
              <div style={{
                width: active ? '10px' : '6px',
                height: active ? '10px' : '6px',
                borderRadius: '50%',
                background: active ? stop.color : 'rgba(255,255,255,0.15)',
                boxShadow: active ? `0 0 10px ${stop.color}60` : 'none',
                transition: 'all 0.5s ease',
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: active ? stop.color : 'transparent',
                transition: 'all 0.5s ease',
                whiteSpace: 'nowrap',
              }}>
                {stop.label}
              </span>
            </div>
          )
        })}

        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          width: '1px',
          height: '100%',
          background: 'rgba(255,255,255,0.05)',
          right: '4.5px',
          zIndex: -1,
        }} />
      </div>

      {/* Scrollable HTML Content Overlay */}
      <main className="content-overlay">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <style>{`
        @media (max-width: 768px) {
          .journey-progress { display: none !important; }
        }
      `}</style>
    </>
  )
}
