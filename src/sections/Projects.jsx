import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

/**
 * Projects — Stop 3: Solar System
 * Showcasing work as we orbit the solar system.
 */
export default function Projects() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const projects = portfolioData.projects

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )

      gsap.fromTo('.project-card',
        { y: 100, opacity: 0, rotateX: 5 },
        {
          y: 0, opacity: 1, rotateX: 0, stagger: 0.12,
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      )

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
      id="projects"
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
          maxWidth: '1100px',
          width: '100%',
          padding: '0 2rem',
          position: 'sticky',
          top: '8vh',
        }}
      >
        {/* Location Label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          <div className="glow-dot" style={{ background: '#fbbf24', boxShadow: '0 0 12px rgba(251,191,36,0.4)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#fbbf24',
          }}>
            📍 Stop 03 — Solar System
          </span>
        </div>

        <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
          Orbiting <span className="gradient-text">Projects</span>
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          maxWidth: '550px',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
        }}>
          Three projects. Three different worlds. One engineering journey.
        </p>

        {/* Project Cards Grid */}
        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card glass-card"
              style={{
                padding: '1.75rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${project.color}40`
                e.currentTarget.style.boxShadow = `0 20px 60px ${project.color}15`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(100,100,255,0.08)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Number */}
              <span style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: 'var(--color-text-dim)', letterSpacing: '0.1em',
              }}>
                {'0' + (i + 1)}
              </span>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '0.2rem',
                color: 'var(--color-text)',
              }}>
                {project.title}
              </h3>

              <h4 style={{
                fontSize: '0.8rem',
                color: 'var(--color-cyan)',
                marginBottom: '0.8rem',
              }}>
                {project.subtitle}
              </h4>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {project.stack.map((t) => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px',
                    border: `1px solid rgba(255, 255, 255, 0.1)`,
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.05em',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
