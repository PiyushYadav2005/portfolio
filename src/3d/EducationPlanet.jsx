import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, Box, Sphere } from '@react-three/drei'

export default function EducationPlanet({ position, scrollProgress }) {
  const coreRef = useRef()
  const orbit1Ref = useRef()
  const orbit2Ref = useRef()

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2
      coreRef.current.rotation.y += delta * 0.3
    }
    if (orbit1Ref.current) orbit1Ref.current.rotation.y += delta * 0.4
    if (orbit2Ref.current) orbit2Ref.current.rotation.z -= delta * 0.3
  })

  const dist = Math.abs((scrollProgress - 0.71) * 7) 
  const scale = Math.max(0, 1 - dist)

  return (
    <group position={position} scale={scale * 1.5}>
      {/* Education Core */}
      <Icosahedron ref={coreRef} args={[1, 1]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.5} wireframe />
      </Icosahedron>

      <Sphere args={[0.9, 32, 32]}>
        <meshStandardMaterial color="#4c1d95" roughness={0.5} />
      </Sphere>

      {/* Milestone 1 (B.Tech) */}
      <group ref={orbit1Ref}>
        <mesh position={[2.5, 0, 0]}>
          <Box args={[0.3, 0.3, 0.3]}>
            <meshStandardMaterial color="#c4b5fd" emissive="#a78bfa" emissiveIntensity={1} />
          </Box>
        </mesh>
        {/* Orbit Trail */}
        <mesh rotation={[-Math.PI/2, 0, 0]}>
          <ringGeometry args={[2.48, 2.52, 64]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} side={2} />
        </mesh>
      </group>

      {/* Milestone 2 (12th) */}
      <group ref={orbit2Ref}>
        <mesh position={[0, 3.5, 0]}>
          <Icosahedron args={[0.2, 0]}>
            <meshStandardMaterial color="#ddd6fe" emissive="#ddd6fe" emissiveIntensity={0.8} />
          </Icosahedron>
        </mesh>
        {/* Orbit Trail */}
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[3.48, 3.52, 64]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.15} side={2} />
        </mesh>
      </group>
    </group>
  )
}
