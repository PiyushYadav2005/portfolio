import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Torus, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Earth — Highly realistic textured Earth matching the reference image.
 * Uses high-res diffuse, specular, normal, and cloud maps.
 */
export default function Earth({ position = [0, 0, -320], scrollProgress = 0 }) {
  const earthRef = useRef()
  const cloudsRef = useRef()
  const mainGroup = useRef()
  const orbitsRef = useRef()

  // Load high-resolution textures from a reliable public CDN (three.js examples)
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_normal_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_specular_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/planets/earth_clouds_1024.png'
  ])

  // Let R3F automatically handle the colorSpace (it defaults to sRGB correctly)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Very slow realistic time rotation + interactive scroll rotation
    if (earthRef.current) earthRef.current.rotation.y = t * 0.02 + scrollProgress * 1.5
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.025 + scrollProgress * 2.0
    }
    if (orbitsRef.current) {
      orbitsRef.current.rotation.x = t * 0.1
      orbitsRef.current.rotation.y = t * 0.05
    }
    // Gentle floating
    if (mainGroup.current) {
      mainGroup.current.position.y = Math.sin(t * 0.5) * 0.2
      // Rotate the whole earth container slowly on scroll for extra parallax
      mainGroup.current.rotation.y = scrollProgress * 0.8
    }
  })

  // Distance from Planet Earth stop (~0.8)
  const dist = Math.abs((scrollProgress - 0.57) * 7)
  const scale = Math.max(0, 1 - dist)

  return (
    <group position={position} ref={mainGroup} scale={scale}>
      {/* 
        Lighting matching the reference image: 
        Main light comes from the top left, illuminating the left side and casting a shadow on the right.
      */}
      <directionalLight 
        position={[-20, 15, 20]} 
        intensity={3.5} 
        color="#ffffff" 
      />
      
      {/* Soft dark blue ambient to keep shadows from being completely pitch black */}
      <ambientLight intensity={0.15} color="#223355" />

      {/* Earth Surface Group */}
      <group position={[0, 0, 0]} rotation={[0.4, -1.2, 0]}>
        
        {/* Solid Earth Sphere */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[6, 64, 64]} />
          <meshStandardMaterial 
            map={colorMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(1.5, 1.5)}
            roughnessMap={specularMap}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Dynamic Cloud Layer */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[6.05, 64, 64]} />
          <meshStandardMaterial 
            map={cloudsMap}
            transparent 
            opacity={0.4}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 
          Atmospheric Glow - Inner bright blue rim 
        */}
        <mesh>
          <sphereGeometry args={[6.15, 64, 64]} />
          <meshBasicMaterial 
            color="#4ea3ff" 
            transparent 
            opacity={0.15} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* 
          Atmospheric Glow - Outer soft fade
        */}
        <mesh>
          <sphereGeometry args={[6.4, 32, 32]} />
          <meshBasicMaterial 
            color="#1d4ed8" 
            transparent 
            opacity={0.06} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Deep space haze (very subtle extended glow) */}
        <mesh>
          <sphereGeometry args={[7.2, 32, 32]} />
          <meshBasicMaterial 
            color="#0f265c" 
            transparent 
            opacity={0.02} 
            side={THREE.BackSide} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Technology Orbits */}
      <group ref={orbitsRef}>
        <Torus args={[8, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#34d399" transparent opacity={0.3} />
        </Torus>
        <Torus args={[9.5, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.2} />
        </Torus>
        <Torus args={[11, 0.02, 16, 100]} rotation={[-Math.PI / 6, 0, 0]}>
          <meshBasicMaterial color="#6c63ff" transparent opacity={0.25} />
        </Torus>
        
        {/* Orbiting nodes (Skills abstract representation) */}
        <Sphere args={[0.2, 16, 16]} position={[8, 0, 0]}>
          <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={2} />
        </Sphere>
        <Sphere args={[0.25, 16, 16]} position={[-8, 0, 0]}>
          <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1} />
        </Sphere>
        <Sphere args={[0.15, 16, 16]} position={[9.5 * Math.cos(Math.PI/4), 9.5 * Math.sin(Math.PI/4), 0]}>
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.5} />
        </Sphere>
        <Sphere args={[0.3, 16, 16]} position={[-11 * Math.cos(Math.PI/6), -11 * Math.sin(Math.PI/6), 0]}>
          <meshStandardMaterial color="#6c63ff" emissive="#6c63ff" emissiveIntensity={2} />
        </Sphere>
      </group>
    </group>
  )
}
