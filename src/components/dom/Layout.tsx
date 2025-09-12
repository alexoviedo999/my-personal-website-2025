// src/components/dom/Layout.tsx
'use client'

import { useRef, ReactNode, CSSProperties } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    touchAction: 'auto',
  }

  const sceneStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    touchAction: 'auto',
  }

  return (
    <div ref={ref} style={containerStyle} className='data-[aria-hidden=true]: min-h-full bg-black'>
      {/* Main content */}
      <div className='relative z-10 min-h-screen'>{children}</div>
      <div className='fixed inset-0 z-0'>
        <Scene style={sceneStyle} eventSource={ref} eventPrefix='client' />
      </div>
    </div>
  )
}

export { Layout }
