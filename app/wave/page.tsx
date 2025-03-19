'use client'

import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'

// Import WaveImage component dynamically to avoid SSR issues
const WaveImage = dynamic(() => import('@/components/canvas/WaveImage').then((mod) => mod.WaveImage), { ssr: false })

// Component version without Canvas or hooks (for use inside other Canvas components)
export function OpWaveContent() {
  return (
    <>
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
    </>
  )
}

// Standalone page version with Canvas - this is the default export
export default function WavePage() {
  return (
    <div className='h-screen w-full'>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <OpWaveContent />
      </Canvas>
    </div>
  )
}
