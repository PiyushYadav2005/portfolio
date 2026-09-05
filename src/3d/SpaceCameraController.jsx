import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useMousePosition from '../hooks/useMousePosition'

/**
 * SpaceCameraController — Flies the camera through space on a cinematic journey.
 *
 * Journey 8 stops mapped across t (0 to 1):
 * 1. 0.000: Galaxy (z: -80)
 * 2. 0.142: Nebula (z: -180)
 * 3. 0.285: Experience (z: -280)
 * 4. 0.428: Solar System (z: -380)
 * 5. 0.571: Earth (z: -480)
 * 6. 0.714: Education (z: -580)
 * 7. 0.857: Certifications (z: -680)
 * 8. 1.000: Contact Station (z: -780)
 */

const keyframes = [
  { t: 0.00, pos: [0, 5, 20],      look: [0, 0, -80] },
  { t: 0.14, pos: [-2, 3, -110],   look: [0, 0, -180] },
  { t: 0.28, pos: [4, 1, -220],    look: [-8, 0, -280] },
  { t: 0.42, pos: [-3, 4, -320],   look: [0, 0, -380] },
  { t: 0.57, pos: [0, 2, -430],    look: [0, 0, -480] },
  { t: 0.71, pos: [-3, -1, -540],  look: [5, -2, -580] },
  { t: 0.85, pos: [0, 4, -630],    look: [0, 0, -680] },
  { t: 1.00, pos: [2, 1, -740],    look: [0, 0, -780] },
]

function getInterpolated(progress) {
  // Find the two keyframes to interpolate between
  let from = keyframes[0]
  let to = keyframes[1]

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (progress >= keyframes[i].t && progress <= keyframes[i + 1].t) {
      from = keyframes[i]
      to = keyframes[i + 1]
      break
    }
  }

  const segmentLength = to.t - from.t
  const localT = segmentLength > 0 ? (progress - from.t) / segmentLength : 0
  // Smoothstep for cinematic easing
  const smooth = localT * localT * (3 - 2 * localT)

  return {
    pos: [
      THREE.MathUtils.lerp(from.pos[0], to.pos[0], smooth),
      THREE.MathUtils.lerp(from.pos[1], to.pos[1], smooth),
      THREE.MathUtils.lerp(from.pos[2], to.pos[2], smooth),
    ],
    look: [
      THREE.MathUtils.lerp(from.look[0], to.look[0], smooth),
      THREE.MathUtils.lerp(from.look[1], to.look[1], smooth),
      THREE.MathUtils.lerp(from.look[2], to.look[2], smooth),
    ],
  }
}

export default function SpaceCameraController({ scrollProgress = 0 }) {
  const mouse = useMousePosition()

  useFrame(({ camera }) => {
    const { pos, look } = getInterpolated(scrollProgress)

    // Add subtle mouse parallax offset
    const targetX = pos[0] + mouse.x * 2
    const targetY = pos[1] - mouse.y * 2 // Invert Y for natural feel

    // Smooth damping
    camera.position.x += (targetX - camera.position.x) * 0.06
    camera.position.y += (targetY - camera.position.y) * 0.06
    camera.position.z += (pos[2] - camera.position.z) * 0.06

    camera.lookAt(look[0], look[1], look[2])
  })

  return null
}
