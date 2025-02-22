import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { easing } from 'maath'

interface FrameProps {
  url: string
  isActive?: boolean
  c?: THREE.Color
  position?: [number, number, number]
  rotation?: [number, number, number]
}

interface FrameMeshType extends THREE.Mesh {
  material: THREE.MeshBasicMaterial
}

// Make material properties optional
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Define a more specific type for the Image component's ref
type ImageMeshType = THREE.Mesh<THREE.BufferGeometry, THREE.Material> & {
  material?: {
    zoom?: number
  }
}

const Frame: React.FC<FrameProps> = ({ url, isActive = false, c = new THREE.Color(), ...props }) => {
  // Use the more specific ImageMeshType for the image ref
  const image = useRef<ImageMeshType>(null)
  const frame = useRef<FrameMeshType>(null)
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())

  const FRAME_SIZE = 1.0
  const name = url.split('/').pop()?.split('.')[0]?.toLowerCase() ?? ''

  useCursor(hovered)

  useFrame((state, dt) => {
    if (!image.current || !frame.current) return

    // Directly access the material and zoom property
    if (image.current.material && image.current.material.zoom !== undefined) {
      image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    }

    const scale = FRAME_SIZE * (!isActive && hovered ? 0.85 : 1)
    image.current.scale.set(scale, scale, 1)

    easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  })

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, 1, 0.05]}
      >
        <boxGeometry />
        <meshStandardMaterial color='#151515' metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.9, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        {/*  @ts-expect-error  The Image component from Drei has complex types */}
        <Image ref={image} raycast={() => null} position={[0, 0, 0.7]} url={url} scale={[0.85, 0.85, 1]} transparent />
      </mesh>
    </group>
  )
}

interface FramesProps {
  images: Array<{
    url: string
    position: [number, number, number]
    rotation: [number, number, number]
  }>
}

export const Frames: React.FC<FramesProps> = ({ images }) => {
  const ref = useRef<THREE.Group>(null)
  const [activeFrame, setActiveFrame] = useState<string | null>(null)
  const pRef = useRef(new THREE.Vector3(0, 4, 7.5))
  const qRef = useRef(new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.45, 0, 0)))

  useEffect(() => {
    if (ref.current && activeFrame) {
      const object = ref.current.getObjectByName(activeFrame)
      if (object) {
        object.parent.updateWorldMatrix(true, true)
        object.parent.localToWorld(pRef.current.set(0, 2, 2))
        object.parent.getWorldQuaternion(qRef.current)
      } else {
        pRef.current.set(0, 4, 7.5)
        qRef.current.setFromEuler(new THREE.Euler(-0.45, 0, 0))
      }
    }
  })

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, [pRef.current.x, pRef.current.y, activeFrame ? 4 : 6.5], 0.4, dt)
    easing.dampQ(state.camera.quaternion, qRef.current, 0.4, dt)
  })

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        setActiveFrame(activeFrame === e.object.name ? null : e.object.name)
      }}
      onPointerMissed={() => setActiveFrame(null)}
    >
      {images.map((props) => (
        <Frame key={props.url} {...props} isActive={activeFrame === props.url} />
      ))}
    </group>
  )
}
