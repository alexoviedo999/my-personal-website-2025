'use client'

import { Environment, useTexture, useEnvironment } from '@react-three/drei'
import * as THREE from 'three'
import { useState, useEffect } from 'react'

type SkyboxProps = {
  children: React.ReactNode
  texture?: string
  hdr?: boolean
  preset?: 'sunset' | 'apartment' | 'city' | 'dawn' | 'forest' | 'lobby' | 'night' | 'park' | 'studio' | 'warehouse'
  background?: boolean
}

export default function Skybox({ 
  children, 
  texture, 
  hdr = false,
  preset = 'sunset',
  background = true,
  ...props 
}: SkyboxProps) {
  // Always call hooks unconditionally
  const dummyTexture = '/textures/red-sky-1.jpg'
  const dummyHdr = '/textures/op_art_tree.hdr'
  
  // Use proper fallbacks to ensure hooks are always called
  const hdrTexture = useEnvironment({ files: hdr && texture ? texture : dummyHdr })
  const regularTexture = useTexture(!hdr && texture ? texture : dummyTexture)
  
  // Choose which texture to use based on the hdr flag
  const textureMap = hdr ? hdrTexture : regularTexture

  return (
    <>
      <ambientLight intensity={0.5} />
      
      {/* Use Environment for HDR or preset if specified */}
      {hdr && texture ? (
        <Environment files={texture} background={background} />
      ) : (
        <Environment preset={preset} background={false} />
      )}
      
      {/* Only render mesh for regular textures, not for HDR */}
      {!hdr && (
        <mesh>
          <sphereGeometry args={[30, 64, 64]} />
          <meshStandardMaterial map={regularTexture} side={THREE.BackSide} />
        </mesh>
      )}
      
      {children}
    </>
  )
}
