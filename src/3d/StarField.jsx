import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSharpStarTexture } from '../utils/textures'

/**
 * StarField — Ultra smooth deep black base, fine sharp tiny stars
 * No noise, no squares. Layers for depth and parallax feel.
 */
export default function StarField({ scrollProgress = 0 }) {
  const starsRef = useRef()
  const farStarsRef = useRef()

  const particleTexture = useMemo(() => createSharpStarTexture(), [])

  // Foreground stars (slightly larger, moving faster for parallax)
  const nearStars = useMemo(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 200
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      // Photorealistic star colors (O, B, A, F, G, K, M spectral classes)
      const c = Math.random()
      let color
      if (c < 0.1) color = new THREE.Color('#9bb0ff') // Hot blue
      else if (c < 0.3) color = new THREE.Color('#aabfff') // Blue-white
      else if (c < 0.5) color = new THREE.Color('#ffffff') // White
      else if (c < 0.7) color = new THREE.Color('#fff4e8') // Yellow-white
      else if (c < 0.9) color = new THREE.Color('#ffddb4') // Yellow
      else color = new THREE.Color('#ffbd6f') // Orange/Red

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 0.4 + 0.1
    }
    return { positions, colors, sizes }
  }, [])

  // Deep background stars (tiny, dimmer, very slow)
  const farStarData = useMemo(() => {
    const count = 2500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const r = 150 + Math.random() * 400
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const brightness = Math.random() * 0.4 + 0.2
      colors[i * 3] = brightness
      colors[i * 3 + 1] = brightness
      colors[i * 3 + 2] = brightness + 0.1 // Slight blue tint to deep background
    }
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.001 + scrollProgress * 0.15
      starsRef.current.rotation.x = t * 0.0005
    }
    if (farStarsRef.current) {
      farStarsRef.current.rotation.y = t * 0.0003 + scrollProgress * 0.05
    }
  })

  return (
    <group>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nearStars.positions.length / 3} array={nearStars.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={nearStars.colors.length / 3} array={nearStars.colors} itemSize={3} />
          {/* We'll pass sizes via shader if needed, but PointsMaterial size works globally nicely when fine-tuned */}
        </bufferGeometry>
        <pointsMaterial 
          size={0.6}
          map={particleTexture}
          vertexColors 
          transparent 
          opacity={0.8} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>
      
      <points ref={farStarsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={farStarData.positions.length / 3} array={farStarData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={farStarData.colors.length / 3} array={farStarData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.3} 
          map={particleTexture}
          vertexColors
          transparent 
          opacity={0.4} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>
    </group>
  )
}
