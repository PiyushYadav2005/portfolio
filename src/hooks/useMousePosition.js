import { useEffect, useState, useCallback } from 'react'

/**
 * useMousePosition — Tracks normalized mouse position (-1 to 1).
 * Used for subtle parallax effects on 3D objects.
 */
export default function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouse = useCallback((e) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])

  return mouse
}
