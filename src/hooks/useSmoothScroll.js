import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useSmoothScroll — Integrates Lenis smooth scrolling and tracks scroll progress.
 * Synchronizes Lenis with GSAP ScrollTrigger for perfectly smooth animations.
 * Returns scrollProgress (0-1) representing how far through the page the user has scrolled.
 */
export default function useSmoothScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    let Lenis
    let lenis

    const initLenis = async () => {
      try {
        const module = await import('lenis')
        Lenis = module.default

        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 2,
        })

        lenisRef.current = lenis

        // Sync GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)
        
        lenis.on('scroll', ({ progress }) => {
          setScrollProgress(progress)
        })

      } catch (err) {
        console.warn('Lenis import failed, using native scroll:', err)
        // Fallback to native scroll tracking
        const handleScroll = () => {
          const scrollTop = window.scrollY
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
      }
    }

    let tickerRef = null;

    initLenis().then(() => {
       if (lenisRef.current) {
          tickerRef = (time) => {
            lenisRef.current.raf(time * 1000)
          }
          gsap.ticker.add(tickerRef)
          gsap.ticker.lagSmoothing(0)
       }
    })

    return () => {
      if (lenisRef.current) {
        if (tickerRef) {
           gsap.ticker.remove(tickerRef)
        }
        lenisRef.current.destroy()
      }
    }
  }, [])

  return { scrollProgress, lenis: lenisRef }
}
