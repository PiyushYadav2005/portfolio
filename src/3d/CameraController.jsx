import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * CameraController — Scroll-driven camera movement for storytelling.
 *
 * Section 1 (Hero):    Camera far and above — wide establishing shot
 * Section 2 (About):   Camera zooms in closer
 * Section 3 (Projects): Camera rotates to a side angle
 * Section 4 (Contact): Camera moves to a final focused position
 */

const cameraPositions = [
  { pos: [0, 1, 8], look: [0, 0, 0] },    // Hero — far back
  { pos: [2, 0.5, 5], look: [0, 0, 0] },   // About — zoom in & slight right
  { pos: [-3, 1, 4], look: [0, 0, 0] },    // Projects — rotate left & closer
  { pos: [0, 0.5, 3.5], look: [0, 0, 0] }, // Contact — centered close-up
]

export default function CameraController({ scrollProgress = 0 }) {
  const dummyRef = useRef()

  useFrame(({ camera }) => {
    // Determine which two keyframes we interpolate between
    const totalSegments = cameraPositions.length - 1
    const rawIndex = scrollProgress * totalSegments
    const index = Math.min(Math.floor(rawIndex), totalSegments - 1)
    const localT = rawIndex - index

    const from = cameraPositions[index]
    const to = cameraPositions[Math.min(index + 1, totalSegments)]

    // Smooth interpolation
    const smoothT = localT * localT * (3 - 2 * localT) // smoothstep

    const targetX = THREE.MathUtils.lerp(from.pos[0], to.pos[0], smoothT)
    const targetY = THREE.MathUtils.lerp(from.pos[1], to.pos[1], smoothT)
    const targetZ = THREE.MathUtils.lerp(from.pos[2], to.pos[2], smoothT)

    // Smooth camera movement
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.position.z += (targetZ - camera.position.z) * 0.05

    const lookX = THREE.MathUtils.lerp(from.look[0], to.look[0], smoothT)
    const lookY = THREE.MathUtils.lerp(from.look[1], to.look[1], smoothT)
    const lookZ = THREE.MathUtils.lerp(from.look[2], to.look[2], smoothT)

    camera.lookAt(lookX, lookY, lookZ)
  })

  return null
}
