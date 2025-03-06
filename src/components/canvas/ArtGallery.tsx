import { useRef, useState, useEffect } from 'react'
import { Group } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { CameraControls, useCursor } from '@react-three/drei'
import Portal from './Portal'
import { Macaroni } from '../../../public/models/macaroni/Macaroni'
import * as THREE from 'three'
import AlienAnimation from './AlienAnimation'

// Wall component
interface WallProps {
  position: [number, number, number]
  rotation: [number, number, number]
  size?: [number, number, number]
  color?: string
}

const Wall = ({ position, rotation, size = [15, 4, 0.2], color = '#f0f0f0' }: WallProps) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// Floor component
interface FloorProps {
  position: [number, number, number]
  size?: [number, number, number]
  color?: string
}

const Floor = ({ position = [0, -2, 0], size = [20, 0.2, 20], color = '#8B4513' }: FloorProps) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size[0], size[2]]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export const ArtGallery = () => {
  const galleryRef = useRef<Group>(null)
  const controlsRef = useRef<CameraControls>(null)

  useFrame(({ clock }) => {
    if (galleryRef.current) {
      // Subtle ambient movement
      galleryRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  const gallerySize = 16
  const wallHeight = 8
  const wallThickness = 0.2

  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  useCursor(hovered)
  const controlRef = useRef<CameraControls>(null)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active)?.getWorldPosition(targetPosition)
      controlRef.current.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true)
    } else {
      controlRef.current.setLookAt(0, 0, 10, 0, 0, 0, true)
    }
  }, [active])

  return (
    <>
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      <group ref={galleryRef}>
        {/* North Wall (solid) */}
        <Wall
          position={[0, 0, -gallerySize / 2]}
          rotation={[0, 0, 0]}
          size={[gallerySize, wallHeight, wallThickness]}
        />

        {/* Place AlienAnimation directly on the North Wall */}
        <group position={[0, 0, -gallerySize / 2 + wallThickness / 2 + 0.01]} rotation={[0, 0, 0]} scale={1.5}>
          <>
            <CameraControls ref={controlRef} />
            <Portal
              name='Macaroni'
              color='#ffffff'
              active={active}
              setActive={setActive}
              hovered={hovered}
              setHovered={setHovered}
            >
              <Macaroni scale={0.5} position={[0, -1, 0]} hovered={hovered === 'Macaroni'} />
            </Portal>
          </>
        </group>

        {/* East Wall (solid) */}
        <Wall
          position={[gallerySize / 2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          size={[gallerySize, wallHeight, wallThickness]}
        />

        {/* South Wall (solid) */}
        <Wall position={[0, 0, gallerySize / 2]} rotation={[0, 0, 0]} size={[gallerySize, wallHeight, wallThickness]} />

        {/* West Wall (solid) */}
        <Wall
          position={[-gallerySize / 2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          size={[gallerySize, wallHeight, wallThickness]}
        />

        {/* Floor */}
        <Floor position={[0, -wallHeight / 2, 0]} size={[gallerySize, wallThickness, gallerySize]} />

        {/* Add ambient light for basic illumination */}
        <ambientLight intensity={0.5} />
      </group>
    </>
  )
}
