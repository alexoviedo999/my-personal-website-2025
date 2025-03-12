'use client'

import { ViewLoader } from '@/components/canvas/ViewLoader'
import { Environment, MeshReflectorMaterial, OrbitControls, useCursor, PerspectiveCamera } from '@react-three/drei'
import dynamic from 'next/dynamic'
import Skybox from '@/components/canvas/Skybox'
import { Macaroni } from 'public/models/macaroni/Macaroni'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Portal = dynamic(() => import('@/components/canvas/Portal').then((mod) => mod.default), { ssr: false })

// This component will be rendered inside the Canvas context
function Scene() {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  useCursor(hovered)

  // Create a ref for the rotating group
  const rotatingGroup = useRef(null)

  // Add rotation animation
  useFrame((state, delta) => {
    if (rotatingGroup.current) {
      rotatingGroup.current.rotation.y += delta * 0.05
    }
  })

  return (
    <>
      <Skybox texture='/textures/space-1.hdr' hdr={true} background={true}>
        <color attach='background' args={['#191920']} />
        <fog attach='fog' args={['#191920', 0, 15]} />

        {/* Add ambient and point light outside the rotating group */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <group ref={rotatingGroup}>
          <PerspectiveCamera makeDefault position={[0, 4.0, 6.5]} fov={90} />

          <Portal
            name='Macaroni'
            color='#ffffff'
            active={active}
            setActive={setActive}
            hovered={hovered}
            setHovered={setHovered}
            position={[0, 2.0, 1.5]}
          >
            <Macaroni scale={0.5} position={[0, -1, 0]} hovered={hovered === 'Macaroni'} />
          </Portal>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[20, 15]} />
            <MeshReflectorMaterial
              blur={[100, 50]}
              resolution={2048}
              mixBlur={0.01}
              mixStrength={90}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color='#050505'
              metalness={0.5}
              mirror={1}
              transparent={false}
              opacity={1}
            />
          </mesh>

          {/* OrbitControls inside the rotating group */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={5}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2 - 0.1}
          />
        </group>
      </Skybox>
      <Environment preset='city' />
    </>
  )
}

export default function SpacePortal() {
  return (
    <>
      <ViewLoader className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <Scene />
      </ViewLoader>

      {/* Move content div after ViewLoader */}
      <div className='relative z-10 mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight text-black'>The Space Portal</h1>
          <p className='mb-8 text-2xl leading-normal text-black'>Have fun exploring the space portals</p>
        </div>
      </div>
    </>
  )
}
