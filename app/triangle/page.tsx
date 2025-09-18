'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import Scene from '@/components/canvas/Scene'

const Triangle = dynamic(() => import('@/components/canvas/Triangle').then((mod) => mod.Triangle), {
  ssr: false,
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='relative min-h-screen'>
        <div className='absolute inset-0'>
          <Scene className='h-screen w-full'>
            <Suspense fallback={null}>
              {/* Optional: ensure clean background */}
              <color attach='background' args={['#000']} />
              <directionalLight position={[15, 10, 5]} intensity={2} />
              <Triangle />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
              <Common color={undefined} />
            </Suspense>
          </Scene>
        </div>
      </div>
    </>
  )
}
