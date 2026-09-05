import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createSoftParticleTexture } from '../utils/textures'

/**
 * Galaxy — Cinematic space environment with high depth
 * One soft glowing core, subtle nebula clouds (blue, purple, slight pink)
 */
export default function Galaxy({ position = [0, 0, -80], scrollProgress = 0 }) {
  const galaxyRef = useRef()
  const dustRef = useRef()
  const coreRef = useRef()

  const particleTexture = useMemo(() => createSoftParticleTexture(), [])

  // Main galactic dust/gas (soft glowing particles forming the spiral)
  const galaxyData = useMemo(() => {
    const arms = 3
    const count = 4500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const colorCore = new THREE.Color('#fff4e8')
    const colorInner = new THREE.Color('#5b21b6') // Deep Purple
    const colorMid = new THREE.Color('#2563eb')   // Deep Blue
    const colorEdge = new THREE.Color('#db2777')  // Slight Pink

    for (let i = 0; i < count; i++) {
      const arm = i % arms
      const armAngle = (arm / arms) * Math.PI * 2
      const radius = Math.random() * 28
      const spinAngle = radius * 0.6
      const angle = armAngle + spinAngle
      
      // Wider scatter for realistic gas look, less dense at edges
      const scatter = (Math.random() * Math.random()) * radius * 0.5 + 0.2
      
      positions[i * 3] = Math.cos(angle) * (radius + scatter)
      // Flatter core, thicker edges
      positions[i * 3 + 1] = (Math.random() - 0.5) * (1.5 + radius * 0.1) * (Math.random() > 0.5 ? 1 : -1)
      positions[i * 3 + 2] = Math.sin(angle) * (radius + scatter)

      const t = radius / 28
      const mixed = new THREE.Color()
      
      if (t < 0.1) mixed.lerpColors(colorCore, colorInner, t / 0.1)
      else if (t < 0.4) mixed.lerpColors(colorInner, colorMid, (t - 0.1) / 0.3)
      else mixed.lerpColors(colorMid, colorEdge, (t - 0.4) / 0.6)

      // Add variation
      mixed.offsetHSL(0, 0, (Math.random() - 0.5) * 0.1)

      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
      
      sizes[i] = Math.random() * 2.5 + 0.5
    }
    return { positions, colors, sizes }
  }, [])

  // Fine sharp stars within the galaxy structure
  const starData = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 25
      const theta = Math.random() * Math.PI * 2
      positions[i * 3] = r * Math.cos(theta) + (Math.random() - 0.5) * 5
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = r * Math.sin(theta) + (Math.random() - 0.5) * 5
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (galaxyRef.current) galaxyRef.current.rotation.y = t * 0.008 + scrollProgress * 1.5
    if (dustRef.current) dustRef.current.rotation.y = t * 0.006 + scrollProgress * 1.2
    if (coreRef.current) coreRef.current.rotation.y = t * 0.015 + scrollProgress * 2.0
  })

  // Create an off-center look by adjusting the group's rotation
  return (
    <group position={position} rotation={[0.4, -0.2, 0.1]}>
      {/* Soft dust clouds */}
      <points ref={galaxyRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={galaxyData.positions.length / 3} array={galaxyData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={galaxyData.colors.length / 3} array={galaxyData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={1.5} 
          map={particleTexture}
          vertexColors 
          transparent 
          opacity={0.4} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>

      {/* Brighter condensed dust points */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={galaxyData.positions.length / 3} array={galaxyData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={galaxyData.colors.length / 3} array={galaxyData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.4} 
          map={particleTexture}
          vertexColors 
          transparent 
          opacity={0.8} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>
      
      {/* Tiny sharp stars in the galaxy */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starData.length / 3} array={starData} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.15} 
          color="#ffffff" 
          transparent 
          opacity={0.6} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </points>

      {/* Galactic Core Glow */}
      <group ref={coreRef}>
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#fff1e0" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[4.5, 32, 32]} />
          <meshBasicMaterial color="#d8b4fe" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[7.0, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>
        {/* Core point light for soft bloom on other objects if any */}
        <pointLight intensity={2} color="#f3e8ff" distance={40} />
      </group>
    </group>
  )
}
