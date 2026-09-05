import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ParticleField — Floating particles that create depth and atmosphere.
 * Particles slowly drift and respond to scroll progress.
 */
export default function ParticleField({ count = 300, scrollProgress = 0 }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, sizes }
  }, [count])

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.03,
      color: new THREE.Color('#6c63ff'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime()
      pointsRef.current.rotation.y = t * 0.02 + scrollProgress * 0.5
      pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1

      // Opacity based on scroll
      material.opacity = 0.4 + scrollProgress * 0.2
    }
  })

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  )
}
