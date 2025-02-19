'use client'

import getLayer from '@/components/canvas/getLayer'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { ViewLoader } from '@/components/canvas/ViewLoader'

const NoiseGrid = dynamic(() => import('@/components/canvas/NoiseGrid').then((mod) => mod.NoiseGrid), {
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
              <NoiseGrid />
              <OrbitControls />
              <Common color={undefined} />
            </Suspense>
          </ViewLoader>
        </div>
        <div className='relative z-10 mx-auto flex w-full flex-col flex-wrap items-center md:flex-row'>
          <div className='hero min-h-[70vh]'>
            <div className='hero-content text-center'>
              <div className='max-w-3xl'>
                <div className='mt-5 px-5'>
                  <h1 className=' text-left text-3xl font-semibold drop-shadow-lg md:text-5xl'>
                    Hello, I am Alejandro Oviedo
                  </h1>
                  <h2 className='text-left font-semibold drop-shadow-lg'>
                    I am a front-end developer that enjoys making cool things happen on screens.
                    <br />
                    Feel free to find out more
                    <span>
                      <Link href='/about' className='link-hover border-none'>
                        about me,
                      </Link>
                    </span>
                    or check out my
                    <span>
                      <Link href='/skills' className='link-hover border-none'>
                        tech skills,
                      </Link>
                    </span>
                    <span>
                      <Link href='/chatbot' className='link-hover border-none'>
                        Jerky Boy Bot,
                      </Link>
                    </span>
                    <span>
                      <Link href='/animations' className='link-hover border-none'>
                        animations,
                      </Link>
                    </span>
                    <span> and </span>
                    <span>
                      <Link href='https://github.com/alexoviedo999' className='link-hover border-none'>
                        github
                      </Link>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
