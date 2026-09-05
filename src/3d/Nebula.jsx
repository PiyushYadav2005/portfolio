import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSoftParticleTexture } from '../utils/textures'

/**
 * Nebula — Realistic volumetric deep space gas clouds.
 * No sharp edges, deep colors, soft glowing regions.
 */
export default function Nebula({ position = [0, 0, -180], color1 = '#3b82f6', color2 = '#8b5cf6', count = 350, scrollProgress = 0 }) {
  const cloudRef = useRef()
  const dustRef = useRef()
  const starsRef = useRef()

  const particleTexture = useMemo(() => createSoftParticleTexture(), [])

  // Massive soft cloud puffs (volumetric haze)
  const cloudData = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    // Deeper colors for realistic space
    const baseColor1 = new THREE.Color(color1) // Deep blue
    const baseColor2 = new THREE.Color(color2) // Deep purple
    const highlightColor = new THREE.Color('#ec4899') // Pinkish highlight

    for (let i = 0; i < count; i++) {
      // Flowing, curved/diagonal structure
      const spreadX = (Math.random() - 0.5) * 45
      const spreadY = (Math.random() - 0.5) * 15 + (spreadX * 0.3) // Diagonal slant
      const spreadZ = (Math.random() - 0.5) * 20
      
      positions[i * 3] = spreadX
      positions[i * 3 + 1] = spreadY
      positions[i * 3 + 2] = spreadZ

      const mixed = new THREE.Color()
      const t = Math.random()
      
      if (t < 0.4) {
        mixed.lerpColors(baseColor1, baseColor2, t / 0.4)
      } else if (t < 0.8) {
        mixed.lerpColors(baseColor2, highlightColor, (t - 0.4) / 0.4)
      } else {
        mixed.copy(baseColor1)
      }
      
      // Keep it subtle
      mixed.offsetHSL(0, -0.1, -0.1)

      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
    }
    return { positions, colors }
  }, [count, color1, color2])

  // Finer cosmic dust (adds texture without sharp shapes)
  const dustData = useMemo(() => {
    const dustCount = count * 2
    const positions = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 + (positions[i * 3] * 0.3)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [count])

  // Tiny sharp background stars specifically around the nebula
  const starData = useMemo(() => {
    const starCount = 500
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 15 // Pushed back
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (cloudRef.current) {
      cloudRef.current.rotation.y = t * 0.002 + scrollProgress * 1.2
      cloudRef.current.rotation.z = Math.sin(t * 0.001) * 0.02
    }
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.003 + scrollProgress * 1.5
      dustRef.current.rotation.x = t * 0.001
    }
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.0005 + scrollProgress * 0.8
    }
  })

  return (
    <group position={position}>
      {/* Background stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starData.length / 3} array={starData} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.12} 
          color="#ffffff" 
          transparent 
          opacity={0.6} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>

      {/* Massive soft volumetric clouds */}
      <points ref={cloudRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={cloudData.positions.length / 3} array={cloudData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={cloudData.colors.length / 3} array={cloudData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={5.5} 
          map={particleTexture}
          vertexColors 
          transparent 
          opacity={0.06} // Very soft
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>
      
      {/* Moderately sized clouds for dense regions */}
      <points ref={cloudRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={cloudData.positions.length / 3} array={cloudData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={cloudData.colors.length / 3} array={cloudData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={2.5} 
          map={particleTexture}
          vertexColors 
          transparent 
          opacity={0.12} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>

      {/* Scattered cosmic dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={dustData.length / 3} array={dustData} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.6} 
          map={particleTexture}
          color="#a78bfa" 
          transparent 
          opacity={0.15} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>

      {/* Soft light bloom inside the nebula */}
      <pointLight 
        position={[0, 0, 0]} 
        intensity={2} 
        distance={30} 
        color={color1} 
      />
      <pointLight 
        position={[10, 5, -5]} 
        intensity={1.5} 
        distance={25} 
        color={color2} 
      />
    </group>
  )
}
