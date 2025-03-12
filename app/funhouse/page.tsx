'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { ViewLoader } from '@/components/canvas/ViewLoader'

const ArtGallery = dynamic(() => import('@/components/canvas/ArtGallery').then((mod) => mod.ArtGallery), {
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
              <directionalLight position={[15, 10, 5]} intensity={1} />
              <ArtGallery />

              <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={5}
                maxDistance={30}
                maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below the floor
              />
              <PerspectiveCamera makeDefault position={[0, 10, 0]} fov={60} />
              <Common color={undefined} />
            </Suspense>
          </ViewLoader>
        </div>
      </div>
    </>
  )
}
