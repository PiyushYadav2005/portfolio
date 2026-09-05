import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AbstractGeometry — The main 3D visual element.
 * A morphing, glowing icosahedron with animated vertices and wireframe overlay.
 * Reacts subtly to mouse position and scroll progress.
 */
export default function AbstractGeometry({ scrollProgress = 0, mouse = { x: 0, y: 0 } }) {
  const meshRef = useRef()
  const wireRef = useRef()
  const glowRef = useRef()
  const originalPositions = useRef(null)

  // Create custom shader material for the glow
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#6c63ff'),
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    })
  }, [])

  const mainMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1a3e'),
      metalness: 0.9,
      roughness: 0.2,
      emissive: new THREE.Color('#6c63ff'),
      emissiveIntensity: 0.15,
    })
  }, [])

  const wireMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#6c63ff'),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y = t * 0.08 + scrollProgress * Math.PI * 0.5
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.15 + mouse.y * 0.1
      meshRef.current.rotation.z = Math.cos(t * 0.04) * 0.05

      // Scale based on scroll (zoom effect)
      const targetScale = 1 + scrollProgress * 0.3
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.05
      )

      // Vertex morphing
      const geo = meshRef.current.geometry
      if (!originalPositions.current) {
        originalPositions.current = geo.attributes.position.array.slice()
      }
      const positions = geo.attributes.position.array
      const orig = originalPositions.current
      for (let i = 0; i < positions.length; i += 3) {
        const x = orig[i]
        const y = orig[i + 1]
        const z = orig[i + 2]
        const dist = Math.sqrt(x * x + y * y + z * z)
        const offset = Math.sin(dist * 3 + t * 1.5) * 0.08
        positions[i] = x + x / dist * offset
        positions[i + 1] = y + y / dist * offset
        positions[i + 2] = z + z / dist * offset
      }
      geo.attributes.position.needsUpdate = true
      geo.computeVertexNormals()
    }

    if (wireRef.current) {
      wireRef.current.rotation.copy(meshRef.current.rotation)
      wireRef.current.scale.copy(meshRef.current.scale)
    }

    if (glowRef.current) {
      glowRef.current.rotation.copy(meshRef.current.rotation)
      const s = meshRef.current.scale.x * 1.15
      glowRef.current.scale.set(s, s, s)
    }

    // Color shift based on scroll
    const hue = 0.7 + scrollProgress * 0.15
    mainMaterial.emissive.setHSL(hue, 0.7, 0.15)
    wireMaterial.color.setHSL(hue, 0.7, 0.5)
    glowMaterial.color.setHSL(hue, 0.7, 0.5)
  })

  return (
    <group>
      {/* Main solid mesh */}
      <mesh ref={meshRef} material={mainMaterial}>
        <icosahedronGeometry args={[1.8, 4]} />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef} material={wireMaterial}>
        <icosahedronGeometry args={[1.82, 4]} />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef} material={glowMaterial}>
        <icosahedronGeometry args={[1.8, 4]} />
      </mesh>
    </group>
  )
}
