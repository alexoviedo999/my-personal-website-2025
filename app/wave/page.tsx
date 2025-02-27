'use client'

import dynamic from 'next/dynamic'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const WaveImage = dynamic(() => import('@/components/canvas/WaveImage').then((mod) => mod.WaveImage), { ssr: false })

export default function WavePage() {
  return (
    <div className='h-screen w-full'>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <WaveImage
          imageUrl='/img/Sergi-Delgado-Op-Art.jpg'
          width={3}
          height={2}
          amplitude={0.1}
          frequency={3}
          speed={1}
          pulseSpeed={0.3}
        />
      </Canvas>
    </div>
  )
}
