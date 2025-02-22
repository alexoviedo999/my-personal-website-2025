'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'auto',
        touchAction: 'auto',
      }}
      className='data-[aria-hidden=true]: min-h-full bg-black'
    >
      {/* Main content */}
      <div className='relative z-10 min-h-screen'>{children}</div>
      <div className='fixed inset-0 z-0'>
        <Scene
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            touchAction: 'auto',
          }}
          eventSource={ref}
          eventPrefix='client'
        />
      </div>
    </div>
  )
}

export { Layout }
