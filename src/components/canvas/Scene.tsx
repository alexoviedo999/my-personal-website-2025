'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import { Perf } from 'r3f-perf'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props} onCreated={(state) => (state.gl.toneMapping = THREE.ACESFilmicToneMapping)}>
      {/* @ts-ignore */}
      <r3f.Out />
      <Preload all />
      <Perf className='z-50' position='bottom-right' style={{ margin: 10 }} />
    </Canvas>
  )
}
