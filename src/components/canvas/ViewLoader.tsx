// src/components/canvas/ViewLoader.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { CanvasProvider, useCanvas } from './CanvasContext'

const CanvasLoader = () => (
  <div className='flex h-full w-full items-center justify-center bg-black/5'>
    <div className='flex flex-col items-center gap-2'>
      <div className='size-8 animate-spin rounded-full border-2 border-white/20 border-t-white' />
      <span className='text-sm text-white/60'>Loading 3D Scene...</span>
    </div>
  </div>
)

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => <CanvasLoader />,
})

interface ViewLoaderProps {
  children: React.ReactNode
  className?: string
  fallback?: React.ReactNode
}

export const ViewLoader = ({ children, className = '', fallback = <CanvasLoader /> }: ViewLoaderProps) => {
  return (
    <CanvasProvider>
      <div className={`relative h-full w-full ${className}`}>
        <Suspense fallback={fallback}>
          <View>{children}</View>
        </Suspense>
      </div>
    </CanvasProvider>
  )
}
