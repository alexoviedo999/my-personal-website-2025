// app/spaceportal/page.tsx
'use client'

import { SpacePortalScene } from '@/components/canvas/scenes/SpacePortalScene'
import { SceneControls } from '@/components/canvas/SceneControls'
import { CanvasProvider } from '@/components/canvas/CanvasContext'
import Scene from '@/components/canvas/Scene'

export default function SpacePortal() {
  return (
    <CanvasProvider>
      {/* Use your global Scene component */}
      <Scene className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <SpacePortalScene />
      </Scene>

      {/* Render SceneControls outside Canvas but within CanvasProvider */}
      <SceneControls />

      {/* Move content div after the scene */}
      <div className='relative z-10 mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight text white'>The Space Portal</h1>
          <p className='mb-8 text-2xl leading-normal text-white'>Have fun exploring the space portals</p>
        </div>
      </div>
    </CanvasProvider>
  )
}
