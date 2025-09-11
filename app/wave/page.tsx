'use client'

import { Suspense } from 'react'
import { ViewLoader } from '@/components/canvas/ViewLoader'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Common } from '@/components/canvas/View'
import { OpWaveEye } from '@/components/canvas/OpWaveEye'

export default function Page() {
  return (
    <>
      <div className='relative min-h-screen'>
        <div className='absolute inset-0'>
          <ViewLoader className='h-screen w-full'>
            <Suspense fallback={null}>
              <directionalLight position={[15, 10, 5]} intensity={2} />
              <OpWaveEye />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
              <PerspectiveCamera makeDefault position={[0, 10, 0]} fov={60} />
              <Common color={undefined} />
            </Suspense>
          </ViewLoader>
        </div>
      </div>
    </>
  )
}
