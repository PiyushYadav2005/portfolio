import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * SolarSystem — Cinematic, glowing sun with rim-lit orbiting planets.
 * Smooth dark background, no flat circles. Elegant glowing trail orbits.
 */
export default function SolarSystem({ position = [0, 0, -240], scrollProgress = 0 }) {
  const groupRef = useRef()
  const sunRef = useRef()
  const planetRefs = useRef([])

  const planets = useMemo(() => [
    { name: 'HireAI',    distance: 12, size: 1.2, color: '#00e5ff', speed: 0.8 },
    { name: 'BloodTwin', distance: 18, size: 1.4, color: '#ff3366', speed: 0.5 },
    { name: 'ShopEase',  distance: 25, size: 1.8, color: '#fbbf24', speed: 0.3 },
  ], [])

  // Create a custom shader material for sun glow
  const sunMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: '#ffffff' })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    
    // Rotate the entire solar system based on scroll to see different planets front-and-center
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * 2.5
    }

    if (sunRef.current) {
      sunRef.current.rotation.y = t * 0.1 + scrollProgress * 1.0
    }

    planetRefs.current.forEach((ref, i) => {
      if (ref) {
        const p = planets[i]
        const angle = t * p.speed * 0.1
        ref.position.x = Math.cos(angle) * p.distance
        ref.position.z = Math.sin(angle) * p.distance
        ref.rotation.y = t * 0.3 + scrollProgress * 2.0
      }
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Cinematic Main Light (The Sun's illumination over the scene) */}
      <pointLight intensity={3.5} color="#fff4e0" distance={100} decay={1.5} />
      <ambientLight intensity={0.02} color="#445588" />

      {/* Central Star: The Sun */}
      <group position={[-8, 0, 0]}> {/* Shifted slightly left for UI balance reading left-to-right */}
        {/* Solid hot white-yellow core */}
        <mesh ref={sunRef} material={sunMaterial}>
          <sphereGeometry args={[3.5, 64, 64]} />
        </mesh>
        
        {/* Intense yellow-orange corona */}
        <mesh>
          <sphereGeometry args={[3.8, 64, 64]} />
          <meshBasicMaterial color="#ffcc33" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>

        {/* Outer orange-red volumetric bloom */}
        <mesh>
          <sphereGeometry args={[5.5, 64, 64]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>

        {/* Deep massive soft glow (light scattering) */}
        <mesh>
          <sphereGeometry args={[9.0, 64, 64]} />
          <meshBasicMaterial color="#ff8800" transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
        </mesh>

        {/* Real Light Emitter */}
        <pointLight intensity={5} color="#ffddaa" distance={200} decay={1.5} />

        {/* Planets System (origin relative to sun) */}
        {planets.map((p, i) => (
          <group key={p.name}>
            {/* Glowing subtly blurred orbit trail instead of a hard line */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[p.distance, 0.015, 8, 128]} />
              <meshBasicMaterial color="#ffddaa" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[p.distance, 0.04, 16, 128]} />
              <meshBasicMaterial color="#bbccff" transparent opacity={0.02} blending={THREE.AdditiveBlending} />
            </mesh>
            
            {/* The Planet itself */}
            <mesh 
              ref={(el) => { planetRefs.current[i] = el }} 
              position={[p.distance, 0, 0]}
            >
              <sphereGeometry args={[p.size, 64, 64]} />
              <meshStandardMaterial 
                color={p.color} 
                metalness={0.2} 
                roughness={0.6}
              />
            </mesh>

            {/* Atmosphere Glow for Project Planets */}
            <mesh 
              position={[p.distance, 0, 0]}
            >
              <sphereGeometry args={[p.size * 1.1, 32, 32]} />
              <meshBasicMaterial color={p.color} transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
            </mesh>

            {/* ShopEase Ring (Like Saturn) */}
            {p.name === 'ShopEase' && (
              <group position={[p.distance, 0, 0]} rotation={[Math.PI * 0.4, 0.1, 0]}>
                <mesh>
                  <torusGeometry args={[p.size * 1.8, 0.1, 16, 128]} />
                  <meshStandardMaterial color="#fbbf24" transparent opacity={0.6} side={THREE.DoubleSide} roughness={0.9} />
                </mesh>
                <mesh>
                  <torusGeometry args={[p.size * 2.1, 0.2, 16, 128]} />
                  <meshBasicMaterial color="#ffffff" transparent opacity={0.05} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
                </mesh>
              </group>
            )}
          </group>
        ))}
      </group>
    </group>
  )
}
