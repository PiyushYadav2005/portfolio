import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import AbstractGeometry from './AbstractGeometry'
import ParticleField from './ParticleField'
import CameraController from './CameraController'

/**
 * Scene — The main 3D scene that runs as a fixed background.
 * Contains the abstract geometry, particle field, lighting, and camera controller.
 */
export default function Scene({ scrollProgress = 0, mouse = { x: 0, y: 0 } }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 1, 8], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.15} color="#8888ff" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            color="#ffffff"
          />
          <pointLight
            position={[-5, -3, 3]}
            intensity={0.4}
            color="#6c63ff"
          />
          <pointLight
            position={[3, -2, -5]}
            intensity={0.3}
            color="#00e5ff"
          />

          {/* Environment for reflections */}
          <Environment preset="night" />

          {/* Main 3D Object */}
          <AbstractGeometry
            scrollProgress={scrollProgress}
            mouse={mouse}
          />

          {/* Particles */}
          <ParticleField
            count={250}
            scrollProgress={scrollProgress}
          />

          {/* Camera Movement */}
          <CameraController scrollProgress={scrollProgress} />

          {/* Subtle fog */}
          <fog attach="fog" args={['#050510', 8, 25]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
