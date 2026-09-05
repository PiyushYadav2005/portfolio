import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus, MeshDistortMaterial } from '@react-three/drei'

export default function ExperiencePlanet({ position, scrollProgress }) {
  const planetRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()
  const ringRef3 = useRef()

  // Base rotation
  useFrame((state, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.1
    if (ringRef1.current) ringRef1.current.rotation.x += delta * 0.2
    if (ringRef1.current) ringRef1.current.rotation.y += delta * 0.1
    
    if (ringRef2.current) ringRef2.current.rotation.x -= delta * 0.15
    if (ringRef2.current) ringRef2.current.rotation.y -= delta * 0.05
    
    if (ringRef3.current) ringRef3.current.rotation.x += delta * 0.08
    if (ringRef3.current) ringRef3.current.rotation.y += delta * 0.12
  })

  // Visible only near stop 3 (z ~ -280)
  // Distance from this section
  const dist = Math.abs((scrollProgress - 0.285) * 7) 
  const scale = Math.max(0, 1 - dist)

  return (
    <group position={position} scale={scale * 1.5}>
      {/* Central Planet */}
      <Sphere ref={planetRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.2}
          roughness={0.7}
          metalness={0.2}
          distort={0.1}
          speed={0.5}
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere args={[1.65, 32, 32]}>
        <meshBasicMaterial color="#34d399" transparent opacity={0.15} blending={2} />
      </Sphere>

      {/* Rings */}
      <Torus ref={ringRef1} args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#6ee7b7" emissive="#34d399" emissiveIntensity={1} />
      </Torus>

      <Torus ref={ringRef2} args={[3.2, 0.015, 16, 100]} rotation={[-Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#a7f3d0" emissive="#10b981" emissiveIntensity={0.5} />
      </Torus>

      <Torus ref={ringRef3} args={[4.0, 0.01, 16, 100]} rotation={[Math.PI / 6, 0, Math.PI / 8]}>
        <meshStandardMaterial color="#047857" emissive="#047857" emissiveIntensity={0.2} transparent opacity={0.6} />
      </Torus>

      {/* Orbiting Satellite (Mission Marker) */}
      <group ref={ringRef1}>
        <mesh position={[2.5, 0, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  )
}
