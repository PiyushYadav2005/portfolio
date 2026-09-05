import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Cylinder, Torus, Box } from '@react-three/drei'

export default function ContactStation({ position, scrollProgress }) {
  const stationRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const arrayRef = useRef()

  useFrame((state, delta) => {
    if (stationRef.current) stationRef.current.rotation.y += delta * 0.05
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.1
      ring1Ref.current.rotation.y -= delta * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.1
      ring2Ref.current.rotation.z += delta * 0.2
    }
    if (arrayRef.current) {
      arrayRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  // Fade in at the very end (z ~ -780)
  const dist = Math.abs((scrollProgress - 1.0) * 8)
  const scale = Math.max(0, 1 - dist)

  return (
    <group position={position} scale={scale * 1.5} ref={stationRef}>
      {/* Central Core */}
      <Cylinder args={[0.5, 0.5, 3, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Glowing End Caps */}
      <mesh position={[0, 0, 1.55]}>
        <circleGeometry args={[0.45, 32]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
      <mesh position={[0, 0, -1.55]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.45, 32]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      {/* Communication Rings */}
      <Torus ref={ring1Ref} args={[1.5, 0.05, 16, 64]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#6c63ff" emissive="#4c1d95" emissiveIntensity={0.5} />
      </Torus>
      
      <Torus ref={ring2Ref} args={[2.2, 0.02, 16, 64]} rotation={[-Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </Torus>

      {/* Antenna Array */}
      <group ref={arrayRef} position={[0, 1.5, 0]}>
        <Cylinder args={[0.05, 0.1, 1.5]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#333" />
        </Cylinder>
        <Box args={[0.4, 0.4, 0.1]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="#4c1d95" emissive="#6c63ff" emissiveIntensity={1} />
        </Box>
      </group>
    </group>
  )
}
