'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { ViewLoader } from '@/components/canvas/ViewLoader'

const Triangle = dynamic(() => import('@/components/canvas/Triangle').then((mod) => mod.Triangle), {
  ssr: false,
})

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='relative min-h-screen'>
        <div className='absolute inset-0'>
          <ViewLoader className='h-screen w-full'>
            <Suspense fallback={null}>
              <directionalLight position={[15, 10, 5]} intensity={2} />
              <Triangle />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
              <Common color={undefined} />
            </Suspense>
          </ViewLoader>
        </div>
      </div>
    </>
  )
}
