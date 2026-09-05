import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

/**
 * About — Stop 2: Deep Space / Nebula Region
 * Skills and background info as we fly through cosmic dust.
 */
export default function About() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const aboutInfo = portfolioData.personal.aboutText

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in on approach
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )


      // Fade out on exit
      gsap.to(contentRef.current, {
        opacity: 0, y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        height: '250vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '25vh',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '1000px',
          width: '100%',
          padding: '0 2rem',
          position: 'sticky',
          top: '10vh',
        }}
      >
        {/* Location Label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          <div className="glow-dot" style={{ background: 'var(--color-cyan)', boxShadow: '0 0 12px var(--color-cyan-glow)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-cyan)',
          }}>
            📍 Stop 02 — Deep Space Nebula
          </span>
        </div>

        <h2 className="section-title" style={{ marginBottom: '1rem' }}>
          {aboutInfo.heading.split(' ')[0]} <span className="gradient-text">{aboutInfo.heading.split(' ')[1]}</span>
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-muted)',
          maxWidth: '600px',
          lineHeight: 1.8,
          marginBottom: '1rem',
        }}>
          {aboutInfo.p1}
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-dim)',
          maxWidth: '600px',
          lineHeight: 1.7,
          marginBottom: '1rem',
        }}>
          {aboutInfo.p2}
        </p>
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--color-text-dim)',
          maxWidth: '600px',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          {aboutInfo.p3}
        </p>

        {/* Note: Skills have been moved to Planet Earth */}
      </div>
    </section>
  )
}
