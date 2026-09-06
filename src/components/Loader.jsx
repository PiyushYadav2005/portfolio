import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Loader — Space journey loading screen with warp speed effect.
 */
export default function Loader() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const progressRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      // Progress bar
      gsap.to(progressRef.current, {
        width: '100%',
        duration: 2.3,
        ease: 'power2.inOut',
        delay: 0.3,
      })

      // Counter
      const counter = { val: 0 }
      gsap.to(counter, {
        val: 100,
        duration: 2.3,
        delay: 0.3,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(counter.val) + '%'
          }
        }
      })

      // Stars animation
      gsap.to('.loader-star', {
        y: -200,
        opacity: 0,
        duration: 1.5,
        stagger: { each: 0.02, from: 'random' },
        repeat: -1,
        ease: 'none',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#030308',
        zIndex: 10000,
        overflow: 'hidden',
      }}
    >
      {/* Warp stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="loader-star"
          style={{
            position: 'absolute',
            width: '2px',
            height: Math.random() * 60 + 20 + 'px',
            background: `linear-gradient(to top, transparent, ${Math.random() > 0.5 ? '#6c63ff' : '#00e5ff'})`,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.6 + 0.2,
          }}
        />
      ))}

      {/* Content */}
      <div ref={textRef} style={{ textAlign: 'center', zIndex: 2 }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          marginBottom: '0.5rem',
        }}>
          P<span style={{ color: 'var(--color-accent)' }}>.</span>
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--color-text-dim)',
          marginBottom: '2rem',
        }}>
          INITIALIZING PORTFOLIO...
        </p>

        {/* Progress */}
        <div style={{
          width: '200px',
          height: '2px',
          background: 'rgba(108,99,255,0.1)',
          borderRadius: '1px',
          overflow: 'hidden',
          margin: '0 auto 1rem',
        }}>
          <div
            ref={progressRef}
            style={{
              width: '0%',
              height: '100%',
              background: 'linear-gradient(90deg, #6c63ff, #00e5ff)',
              borderRadius: '1px',
            }}
          />
        </div>

        <span
          ref={counterRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-accent)',
            letterSpacing: '0.1em',
          }}
        >
          0%
        </span>
      </div>
    </div>
  )
}
