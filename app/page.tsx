'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })

const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })

const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })

const Paradox = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Paradox), { ssr: false })

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='relative min-h-screen'>
        <div className='absolute inset-0'>
          <View className='h-screen w-full'>
            <Suspense fallback={null}>
              <Logo route='/blob' scale={0.6} position={[0, 0, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
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
