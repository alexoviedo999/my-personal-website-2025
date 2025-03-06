'use client'

import { Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Skybox({ children, texture, ...props }: { children: React.ReactNode; texture?: string }) {
  const map = useTexture(texture)

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
      {children}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>
  )
}
