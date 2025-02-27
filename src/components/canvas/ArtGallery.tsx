import { useRef } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text, useGLTF, useHelper } from '@react-three/drei'
import { SpotLightHelper } from 'three'

// Art frame component
interface ArtFrameProps {
  position: [number, number, number]
  rotation: [number, number, number]
  size?: [number, number, number]
  color?: string
}

const ArtFrame = ({ position, rotation, size = [2, 3, 0.1], color = '#8B4513' }: ArtFrameProps) => {
  const frameRef = useRef<Mesh>(null)
  const frameThickness = 0.1
  
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh ref={frameRef}>
        <boxGeometry args={[size[0], size[1], size[2]]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Canvas (slightly in front of the frame) */}
      <mesh position={[0, 0, size[2] / 2 + 0.01]}>
        <planeGeometry args={[size[0] - frameThickness * 2, size[1] - frameThickness * 2]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>
      
      {/* Art title */}
      <Text
        position={[0, -size[1] / 2 - 0.2, 0.1]}
        fontSize={0.15}
        color="#333"
        anchorX="center"
        anchorY="top"
      >
        Untitled
      </Text>
    </group>
  )
}

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

// Door component
interface DoorProps {
  position: [number, number, number]
  rotation: [number, number, number]
  size?: [number, number, number]
  color?: string
}

const Door = ({ position, rotation, size = [1.5, 3, 0.1], color = '#4d2600' }: DoorProps) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Door frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size[0] + 0.2, size[1] + 0.2, size[2]]} />
        <meshStandardMaterial color="#5c5c5c" />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Door knob */}
      <mesh position={[size[0]/3, 0, size[2] + 0.05]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
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

export const ArtGallery = () => {
  const galleryRef = useRef<Group>(null)
  
  useFrame(({ clock }) => {
    if (galleryRef.current) {
      // Subtle ambient movement
      galleryRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  // Gallery dimensions
  const galleryWidth = 12
  const galleryLength = 20
  const hallwayLength = 8
  const hallwayWidth = 3
  const wallHeight = 6  // Increased by 50% from 4 to 6
  const wallThickness = 0.2

  return (
    <group ref={galleryRef}>
      {/* Main Gallery Room - Rectangular */}
      {/* Long walls (sides) */}
      <Wall position={[-galleryWidth/2, 0, 0]} rotation={[0, Math.PI/2, 0]} size={[galleryLength, wallHeight, wallThickness]} />
      <Wall position={[galleryWidth/2, 0, 0]} rotation={[0, Math.PI/2, 0]} size={[galleryLength, wallHeight, wallThickness]} />
      
      {/* Short walls (ends) - with openings for hallways */}
      {/* North wall (with opening for hallway) - now flush with long walls */}
      <Wall position={[-galleryWidth/2 + (galleryWidth/2 - hallwayWidth/2)/2, 0, -galleryLength/2]} rotation={[0, 0, 0]} size={[galleryWidth/2 - hallwayWidth/2, wallHeight, wallThickness]} />
      <Wall position={[galleryWidth/2 - (galleryWidth/2 - hallwayWidth/2)/2, 0, -galleryLength/2]} rotation={[0, 0, 0]} size={[galleryWidth/2 - hallwayWidth/2, wallHeight, wallThickness]} />
      
      {/* South wall (with opening for hallway) - now flush with long walls */}
      <Wall position={[-galleryWidth/2 + (galleryWidth/2 - hallwayWidth/2)/2, 0, galleryLength/2]} rotation={[0, 0, 0]} size={[galleryWidth/2 - hallwayWidth/2, wallHeight, wallThickness]} />
      <Wall position={[galleryWidth/2 - (galleryWidth/2 - hallwayWidth/2)/2, 0, galleryLength/2]} rotation={[0, 0, 0]} size={[galleryWidth/2 - hallwayWidth/2, wallHeight, wallThickness]} />
      
      {/* North Hallway */}
      <Wall position={[-hallwayWidth/2 - 0.1, 0, -galleryLength/2 - hallwayLength/2]} rotation={[0, Math.PI/2, 0]} size={[hallwayLength, wallHeight, wallThickness]} />
      <Wall position={[hallwayWidth/2 + 0.1, 0, -galleryLength/2 - hallwayLength/2]} rotation={[0, Math.PI/2, 0]} size={[hallwayLength, wallHeight, wallThickness]} />
      <Wall position={[0, 0, -galleryLength/2 - hallwayLength]} rotation={[0, 0, 0]} size={[hallwayWidth + 0.2, wallHeight, wallThickness]} />
      
      {/* South Hallway */}
      <Wall position={[-hallwayWidth/2 - 0.1, 0, galleryLength/2 + hallwayLength/2]} rotation={[0, Math.PI/2, 0]} size={[hallwayLength, wallHeight, wallThickness]} />
      <Wall position={[hallwayWidth/2 + 0.1, 0, galleryLength/2 + hallwayLength/2]} rotation={[0, Math.PI/2, 0]} size={[hallwayLength, wallHeight, wallThickness]} />
      <Wall position={[0, 0, galleryLength/2 + hallwayLength]} rotation={[0, 0, 0]} size={[hallwayWidth + 0.2, wallHeight, wallThickness]} />
      
      {/* Doors at the end of hallways */}
      <Door position={[0, -0.5, -galleryLength/2 - hallwayLength + 0.11]} rotation={[0, 0, 0]} />
      <Door position={[0, -0.5, galleryLength/2 + hallwayLength - 0.11]} rotation={[0, Math.PI, 0]} />
      
      {/* Floor for main gallery and hallways */}
      <Floor position={[0, -2, 0]} size={[galleryWidth, 0.2, galleryLength]} />
      <Floor position={[0, -2, -galleryLength/2 - hallwayLength/2]} size={[hallwayWidth, 0.2, hallwayLength]} />
      <Floor position={[0, -2, galleryLength/2 + hallwayLength/2]} size={[hallwayWidth, 0.2, hallwayLength]} />
      
      {/* Art pieces on long walls */}
      {/* West wall */}
      <ArtFrame position={[-galleryWidth/2 + 0.11, 0, -7]} rotation={[0, Math.PI/2, 0]} size={[2, 3, 0.1]} color="#8B4513" />
      <ArtFrame position={[-galleryWidth/2 + 0.11, 0, -3]} rotation={[0, Math.PI/2, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      <ArtFrame position={[-galleryWidth/2 + 0.11, 0, 0]} rotation={[0, Math.PI/2, 0]} size={[2, 3, 0.1]} color="#8B4513" />
      <ArtFrame position={[-galleryWidth/2 + 0.11, 0, 3]} rotation={[0, Math.PI/2, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      <ArtFrame position={[-galleryWidth/2 + 0.11, 0, 7]} rotation={[0, Math.PI/2, 0]} size={[2, 3, 0.1]} color="#8B4513" />
      
      {/* East wall */}
      <ArtFrame position={[galleryWidth/2 - 0.11, 0, -7]} rotation={[0, -Math.PI/2, 0]} size={[2, 3, 0.1]} color="#8B4513" />
      <ArtFrame position={[galleryWidth/2 - 0.11, 0, -3]} rotation={[0, -Math.PI/2, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      <ArtFrame position={[galleryWidth/2 - 0.11, 0, 0]} rotation={[0, -Math.PI/2, 0]} size={[2, 3, 0.1]} color="#8B4513" />
      <ArtFrame position={[galleryWidth/2 - 0.11, 0, 3]} rotation={[0, -Math.PI/2, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      <ArtFrame position={[galleryWidth/2 - 0.11, 0, 7]} rotation={[0, -Math.PI/2, 0]} size={[2, 3, 0.1]} color="#8B4513" />
      
      {/* North wall sections */}
      <ArtFrame position={[-galleryWidth/3, 0, -galleryLength/2 + 0.11]} rotation={[0, 0, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      <ArtFrame position={[galleryWidth/3, 0, -galleryLength/2 + 0.11]} rotation={[0, 0, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      
      {/* South wall sections */}
      <ArtFrame position={[-galleryWidth/3, 0, galleryLength/2 - 0.11]} rotation={[0, Math.PI, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      <ArtFrame position={[galleryWidth/3, 0, galleryLength/2 - 0.11]} rotation={[0, Math.PI, 0]} size={[1.5, 2, 0.1]} color="#5F4A3C" />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Main gallery lights */}
      <SpotLight position={[0, 4, -galleryLength/4]} target={[-galleryWidth/2 + 0.11, 0, -7]} />
      <SpotLight position={[0, 4, galleryLength/4]} target={[-galleryWidth/2 + 0.11, 0, 7]} />
      <SpotLight position={[0, 4, -galleryLength/4]} target={[galleryWidth/2 - 0.11, 0, -7]} />
      <SpotLight position={[0, 4, galleryLength/4]} target={[galleryWidth/2 - 0.11, 0, 7]} />
      
      {/* Hallway lights */}
      <SpotLight position={[0, 4, -galleryLength/2 - hallwayLength/2]} target={[0, -0.5, -galleryLength/2 - hallwayLength + 0.11]} intensity={3} />
      <SpotLight position={[0, 4, galleryLength/2 + hallwayLength/2]} target={[0, -0.5, galleryLength/2 + hallwayLength - 0.11]} intensity={3} />
    </group>
  )
}
