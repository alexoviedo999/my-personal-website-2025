// src/components/canvas/scenes/SpacePortalScene.tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial, OrbitControls, useCursor, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import Skybox from '@/components/canvas/Skybox'
import { OpWaveEye } from '@/components/canvas/OpWaveEye'
import { Triangle } from '@/components/canvas/Triangle'
import { Timetunnel } from '@/components/canvas/Timetunnel'
import { Picasso } from '@/components/canvas/Picasso'
import { Rig } from '@/components/canvas/Rig'
import { useCanvas } from '../CanvasContext'

const Portal = dynamic(() => import('@/components/canvas/Portal').then((mod) => mod.default), { ssr: false })

export const SpacePortalScene = () => {
  const {
    activePortal,
    setActivePortal,
    hoveredPortal,
    setHoveredPortal,
    animationSpeed,
    cameraControls,
    sceneConfig, // Get the current scene configuration
  } = useCanvas()

  useCursor(!!hoveredPortal)

  const rotatingGroup = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (rotatingGroup.current) {
      // Use rotation speed from preset
      rotatingGroup.current.rotation.y += delta * sceneConfig.animation.rotationSpeed * animationSpeed
    }
  })

  return (
    <>
      <Skybox texture='/textures/space-1.hdr' hdr={true} background={true}>
        {/* Use preset values */}
        <color attach='background' args={[sceneConfig.background]} />
        <fog attach='fog' args={[sceneConfig.fog.color, sceneConfig.fog.near, sceneConfig.fog.far]} />

        <ambientLight intensity={sceneConfig.lighting.ambient.intensity} />
        <pointLight position={sceneConfig.lighting.point.position} />

        <group ref={rotatingGroup}>
          <PerspectiveCamera makeDefault position={sceneConfig.camera.position} fov={sceneConfig.camera.fov} />

          <Portal
            name='Picasso'
            color='#ffffff'
            active={activePortal}
            setActive={setActivePortal}
            hovered={hoveredPortal}
            setHovered={setHoveredPortal}
            position={[-6, 2.0, 1.5]}
          >
            <Picasso active={activePortal === 'Picasso'} hovered={hoveredPortal === 'Picasso'} />
          </Portal>

          <Portal
            name='Timetunnel'
            color='#ffffff'
            active={activePortal}
            setActive={setActivePortal}
            hovered={hoveredPortal}
            setHovered={setHoveredPortal}
            position={[-3, 2.0, 1.5]}
          >
            <Timetunnel scale={1} position={[0, -10, -30]} hovered={hoveredPortal === 'Timetunnel'} />
          </Portal>

          <Portal
            name='Wave'
            color='#ffffff'
            active={activePortal}
            setActive={setActivePortal}
            hovered={hoveredPortal}
            setHovered={setHoveredPortal}
            position={[0, 2.0, 1.5]}
          >
            <OpWaveEye />
          </Portal>

          <Portal
            name='Triangle'
            color='#ffffff'
            active={activePortal}
            setActive={setActivePortal}
            hovered={hoveredPortal}
            setHovered={setHoveredPortal}
            position={[3, 2.0, 1.5]}
          >
            <Triangle />
          </Portal>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[20, 15]} />
            <MeshReflectorMaterial
              blur={[500, 500]}
              resolution={2048}
              mixBlur={0.1}
              mixStrength={40}
              roughness={1}
              depthScale={0.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color='#050505'
              metalness={0.5}
              mirror={0.1}
              transparent={false}
              opacity={1}
            />
          </mesh>

          {cameraControls && <Rig />}
        </group>
      </Skybox>
      <Environment preset={sceneConfig.environment} />
    </>
  )
}
