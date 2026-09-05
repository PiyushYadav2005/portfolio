import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import StarField from './StarField'
import Galaxy from './Galaxy'
import Nebula from './Nebula'
import SolarSystem from './SolarSystem'
import Earth from './Earth'
import ExperiencePlanet from './ExperiencePlanet'
import EducationPlanet from './EducationPlanet'
import CertificationSatellites from './CertificationSatellites'
import ContactStation from './ContactStation'
import SpaceCameraController from './SpaceCameraController'

/**
 * SpaceScene — The full cosmic journey scene (performance-optimized).
 * Layout along Z-axis (8 Stops):
 *   01. z: -80   → Milky Way Galaxy
 *   02. z: -180  → Nebula region
 *   03. z: -280  → Experience Planet
 *   04. z: -380  → Project Solar System
 *   05. z: -480  → Technology Earth
 *   06. z: -580  → Education Orbit
 *   07. z: -680  → Certification Satellites
 *   08. z: -780  → Contact Station
 */
export default function SpaceScene({ scrollProgress = 0 }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60, near: 0.1, far: 800 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: '#000000' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1)
          gl.toneMapping = 0
        }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          {/* Ambient light */}
          <ambientLight intensity={0.1} color="#4444ff" />

          {/* Stars everywhere */}
          <StarField scrollProgress={scrollProgress} />

          {/* Stop 1: Milky Way */}
          <Galaxy position={[0, 0, -80]} scrollProgress={scrollProgress} />

          {/* Stop 2: Nebula Region */}
          <Nebula position={[8, 3, -140]} color1="#6c63ff" color2="#a78bfa" count={150} scrollProgress={scrollProgress} />
          <Nebula position={[-10, -2, -190]} color1="#00e5ff" color2="#6c63ff" count={120} scrollProgress={scrollProgress} />

          {/* Stop 3: Experience Orbit */}
          <ExperiencePlanet position={[-8, 0, -280]} scrollProgress={scrollProgress} />

          {/* Stop 4: Solar System */}
          <SolarSystem position={[0, 0, -380]} scrollProgress={scrollProgress} />

          {/* Stop 5: Planet Earth */}
          <Earth position={[0, 0, -480]} scrollProgress={scrollProgress} />

          {/* Stop 6: Education Orbit */}
          <EducationPlanet position={[5, -2, -580]} scrollProgress={scrollProgress} />

          {/* Stop 7: Certification Satellites */}
          <CertificationSatellites position={[0, 0, -680]} scrollProgress={scrollProgress} />

          {/* Stop 8: Contact Station */}
          <ContactStation position={[0, 0, -780]} scrollProgress={scrollProgress} />

          {/* Camera controller */}
          <SpaceCameraController scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
