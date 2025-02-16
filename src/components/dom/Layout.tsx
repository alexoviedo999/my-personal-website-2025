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
      className='min-h-full bg-black'
    >
      <div className='navbar fixed top-0 z-50 w-full border-2 border-base-100/50 bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-circle btn-ghost'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='size-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h7' />
              </svg>
            </label>
            <ul tabIndex={0} className='menu dropdown-content menu-sm mt-3 w-52 rounded-box bg-base-100/75 p-2 shadow'>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/skills'>Skills</Link>
              </li>
              <li>
                <Link href='/animations'>Animations</Link>
              </li>
              <li>
                <Link href='/chatbot'>Jerky Boy Bot</Link>
              </li>
              <li>
                <Link href='/about'>About</Link>
              </li>
              <li>
                <Link href='/contact'>Contact Me</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className='relative z-10 min-h-screen pt-16'>{children}</div>
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
