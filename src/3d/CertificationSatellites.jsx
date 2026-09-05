import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Octahedron } from '@react-three/drei'

export default function CertificationSatellites({ position, scrollProgress }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.rotation.z += delta * 0.05
    }
  })

  const dist = Math.abs((scrollProgress - 0.85) * 7) 
  const scale = Math.max(0, 1 - dist)

  // 5 certificates
  const satPositions = [
    [2, 1, 0],
    [-1.5, 2, -1],
    [1, -2, 1.5],
    [-2, -1, 1],
    [0.5, 0.5, -2.5]
  ]

  return (
    <group position={position} scale={scale * 1.5} ref={groupRef}>
      {/* Central Star */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#e81cff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial color="#fbcfe8" transparent opacity={0.3} blending={2} />
      </mesh>

      {/* 5 Satellites */}
      {satPositions.map((pos, idx) => (
        <group key={idx} position={pos}>
          <Octahedron args={[0.2, 0]}>
            <meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={1} wireframe={idx % 2 === 0} />
          </Octahedron>
          {/* Signal connection line to center */}
          <line>
            <bufferGeometry attach="geometry" setFromPoints={[
              { x: 0, y: 0, z: 0 },
              { x: -pos[0], y: -pos[1], z: -pos[2] }
            ]} />
            <lineBasicMaterial attach="material" color="#fbcfe8" transparent opacity={0.1} />
          </line>
        </group>
      ))}
    </group>
  )
}
