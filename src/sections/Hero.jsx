import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hero — Stop 1: Milky Way Galaxy View
 * Personal introduction as you gaze upon the spiral galaxy.
 */
export default function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const personal = portfolioData.personal

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const tl = gsap.timeline({ delay: 2.5 })
      tl.fromTo('.hero-label',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.hero-name',
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.6'
      )
      .fromTo('.hero-role',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero-desc',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.hero-scroll-hint',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )

      // Scroll indicator pulse
      gsap.to('.hero-scroll-hint', {
        y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })

      // Fade out as we leave this section
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -60,
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
      id="hero"
      ref={sectionRef}
      style={{
        height: '200vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '15vh',
      }}
    >
      <div
        ref={contentRef}
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          padding: '0 2rem',
          position: 'sticky',
          top: '15vh',
        }}
      >
        {/* Location Label */}
        <div className="hero-label" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          opacity: 0,
        }}>
          <div className="glow-dot" />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-cyan)',
          }}>
            📍 Stop 01 — Milky Way Galaxy
          </span>
        </div>

        {/* Name */}
        <h1 className="hero-name" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          marginBottom: '1.5rem',
          opacity: 0,
        }}>
          <span style={{ color: 'var(--color-text)' }}>I'm </span>
          <span className="gradient-text">Piyush</span>
        </h1>

        {/* Role */}
        <p className="hero-role" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: '1.5rem',
          opacity: 0,
        }}>
          {personal.role}
        </p>

        {/* Description */}
        <p className="hero-desc" style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
          color: 'var(--color-text-muted)',
          maxWidth: '550px',
          margin: '0 auto 2rem',
          lineHeight: 1.7,
          opacity: 0,
        }}>
          {personal.description}
        </p>

        {/* Stats & Location */}
        <div className="hero-desc flex flex-wrap justify-center gap-4 mb-8 opacity-0">
          {personal.stats.map((stat, idx) => (
            <div key={idx} className="glass-card px-4 py-2 rounded-lg flex flex-col items-center border border-white/5">
              <span className="text-[var(--color-cyan)] font-bold text-lg">{stat.value}</span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">{stat.label}</span>
            </div>
          ))}
          <div className="glass-card px-4 py-2 rounded-lg flex flex-col items-center border border-white/5">
             <span className="text-[var(--color-magenta)] font-bold text-lg">Location</span>
             <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">{personal.location}</span>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="hero-scroll-hint" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-text-dim)',
          }}>
            Begin Journey
          </span>
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(108,99,255,0.4)" strokeWidth="1.5" />
            <circle cx="10" cy="8" r="2.5" fill="var(--color-accent)" />
          </svg>
        </div>
      </div>
    </section>
  )
}
