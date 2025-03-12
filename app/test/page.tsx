'use client'
//Example template for a new scene in page.tsx
import { ViewLoader } from '@/components/canvas/ViewLoader'
import dynamic from 'next/dynamic'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

// Dynamically import your 3D component
const YourNewScene = dynamic(() => import('@/components/canvas/YourNewScene').then((mod) => mod.default), {
  ssr: false,
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function NewScenePage() {
  return (
    <>
      {/* Optional page content/header */}
      <div className='mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Your New 3D Scene</h1>
          <p className='mb-8 text-2xl leading-normal'>Description of your scene.</p>
        </div>
      </div>

      {/* 3D Scene */}
      <ViewLoader className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <YourNewScene />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below the floor
        />
        <PerspectiveCamera makeDefault position={[0, 10, 0]} fov={60} />
        <Common color={undefined} /> {/* Optional: Set a background color */}
      </ViewLoader>
    </>
  )
}
