'use client'

import { Canvas } from '@react-three/fiber'
import AlienAnimation from '@/components/canvas/AlienAnimation'

export default function Alien() {
  return (
    <div className='h-screen w-full'>
      <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
        <AlienAnimation />
      </Canvas>
    </div>
  )
}
