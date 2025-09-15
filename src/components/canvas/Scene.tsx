// src/components/canvas/Scene.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'
import { CSSProperties } from 'react'

interface SceneProps {
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
  eventSource?: React.RefObject<HTMLDivElement>
  eventPrefix?: string
}

export default function Scene({ className = '', style, children, eventSource, eventPrefix, ...props }: SceneProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <div className={className}>
      <Canvas {...props} onCreated={(state) => (state.gl.toneMapping = THREE.ACESFilmicToneMapping)}>
        {/* @ts-ignore */}
        <r3f.Out />
        {children}
        <Preload all />
        <Perf className='z-50' position='bottom-right' style={{ margin: 10 }} />
      </Canvas>
    </div>
  )
}
