import { useRef, useState } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { extend, useFrame, useThree } from '@react-three/fiber'
import {
  Text,
  useGLTF,
  useHelper,
  MeshPortalMaterial,
  CameraControls,
  useTexture,
  RoundedBox,
  Environment,
} from '@react-three/drei'
import { SpotLightHelper } from 'three'
import { useRouter } from 'next/navigation'
import * as THREE from 'three'
import { easing, geometry } from 'maath'

extend(geometry)

// Wall component
interface WallProps {
  position: [number, number, number]
  rotation: [number, number, number]
  size?: [number, number, number]
  color?: string
}

const Wall = ({ position, rotation, size = [10, 4, 0.2], color = '#f0f0f0' }: WallProps) => {
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

// Spotlight component
interface SpotLightProps {
  position: [number, number, number]
  target: [number, number, number]
  color?: string
  intensity?: number
}

const SpotLight = ({ position, target, color = '#ffffff', intensity = 5 }: SpotLightProps) => {
  const spotLightRef = useRef(null)
  // Uncomment for debugging
  // useHelper(spotLightRef, SpotLightHelper, 'white')

  return (
    <spotLight
      ref={spotLightRef}
      position={position}
      intensity={intensity}
      angle={0.5}
      penumbra={0.5}
      color={color}
      castShadow
      target-position={target}
    />
  )
}

// Frame component with MeshPortalMaterial
interface FrameProps {
  position: [number, number, number]
  rotation: [number, number, number]
  name: string
  color?: string
  active: string | null
  setActive: (name: string | null) => void
  hovered: string | null
  setHovered: (name: string | null) => void
}

const Frame = ({ position, rotation, name, color = '#ffffff', active, setActive, hovered, setHovered }: FrameProps) => {
  const router = useRouter()
  const portalMaterial = useRef<any>()
  const map = useTexture('/img/Sergi-Delgado-Op-Art.jpg')
  const meshRef = useRef<THREE.Mesh>(null)

  // Handle portal animation
  useFrame((_state, delta) => {
    const worldOpen = active === name
    if (portalMaterial.current) {
      easing.damp(portalMaterial.current, 'blend', worldOpen ? 1 : 0, 0.2, delta)
    }
  })

  // Handle navigation to /wave route when portal is fully open
  useFrame((_state) => {
    if (active === name && portalMaterial.current && portalMaterial.current.blend >= 0.9) {
      // Small delay before navigation to ensure smooth transition
      setTimeout(() => {
        setActive(null)
        router.push('/wave')
      }, 300)
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <Text fontSize={0.2} position={[0, -1.3, 0.051]} anchorY='bottom'>
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          {/* Remove the blue background color */}
          <ambientLight intensity={1.5} />
          <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

          {/* Scene inside the portal - Fill the entire portal with the image */}
          <mesh ref={meshRef} position={[0, 0, -2]}>
            <planeGeometry args={[6, 6]} /> {/* Increased size to ensure full coverage */}
            <meshStandardMaterial map={map} side={THREE.DoubleSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}

// Rig component to control camera
const Rig = ({ active }: { active: string | null }) => {
  const { camera } = useThree()
  const controlsRef = useRef<CameraControls>(null)
  const scene = useThree((state) => state.scene)

  useFrame((_state, delta) => {
    if (active) {
      const targetPosition = new THREE.Vector3()
      const targetObject = scene.getObjectByName(active)

      if (targetObject) {
        targetObject.getWorldPosition(targetPosition)

        if (targetPosition.length() > 0) {
          easing.damp3(camera.position, [targetPosition.x, targetPosition.y, targetPosition.z - 5], 0.4, delta)
          camera.lookAt(targetPosition)
        }
      }
    } else {
      // Reset camera position when no portal is active
      easing.damp3(camera.position, [0, 0, 10], 0.4, delta)
      camera.lookAt(0, 0, 0)
    }
  })

  return <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} enabled={!active} />
}

export const ArtGallery = () => {
  const galleryRef = useRef<Group>(null)
  const [active, setActive] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useFrame(({ clock }) => {
    if (galleryRef.current) {
      // Subtle ambient movement
      galleryRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  const gallerySize = 16
  const wallHeight = 8
  const wallThickness = 0.2

  return (
    <group ref={galleryRef}>
      {/* North Wall (solid) */}
      <Wall position={[0, 0, -gallerySize / 2]} rotation={[0, 0, 0]} size={[gallerySize, wallHeight, wallThickness]} />

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
      <Floor position={[0, -2, 0]} size={[gallerySize, 0.2, gallerySize]} />

      {/* Portal Frame on North Wall */}
      <Frame
        position={[0, 0, -gallerySize / 2 + wallThickness / 2 + 0.1]}
        rotation={[0, 0, 0]}
        name='Wave Portal'
        color='#4285f4'
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />

      {/* Center light */}
      <spotLight position={[0, 5, 0]} intensity={5} angle={Math.PI / 4} penumbra={0.5} castShadow />

      {/* Corner lights */}
      <SpotLight
        position={[-gallerySize / 3, 4, -gallerySize / 3]}
        target={[-gallerySize / 2 + 0.11, 0, -gallerySize / 4]}
      />
      <SpotLight
        position={[gallerySize / 3, 4, -gallerySize / 3]}
        target={[gallerySize / 2 - 0.11, 0, -gallerySize / 4]}
      />
      <SpotLight
        position={[-gallerySize / 3, 4, gallerySize / 3]}
        target={[-gallerySize / 2 + 0.11, 0, gallerySize / 4]}
      />
      <SpotLight
        position={[gallerySize / 3, 4, gallerySize / 3]}
        target={[gallerySize / 2 - 0.11, 0, gallerySize / 4]}
      />

      {/* Camera Rig */}
      <Rig active={active} />
    </group>
  )
}
