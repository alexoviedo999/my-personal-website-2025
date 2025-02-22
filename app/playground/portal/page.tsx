'use client'

import { ViewLoader } from '@/components/canvas/ViewLoader'
import { Environment, MeshReflectorMaterial } from '@react-three/drei'
import dynamic from 'next/dynamic'

const Frames = dynamic(() => import('@/components/canvas/Frames').then((mod) => mod.Frames), { ssr: false })

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

const pexel = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel(1103970) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
  // { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: pexel(327482) },
  // { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
  // { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
  // { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
  // { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: pexel(1738986) },
]

export default function Skills() {
  return (
    <>
      <ViewLoader className='absolute top-0 flex h-screen w-full flex-col items-center justify-center'>
        <color attach='background' args={['#191920']} />
        <fog attach='fog' args={['#191920', 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color='#050505'
              metalness={0.5}
              mirror={0.75}
            />
          </mesh>
        </group>
        <Environment preset='city' />
        <Common
          color='#000000'
          camera={{
            position: [0, 0, 8],
            fov: 90,
          }}
        />
      </ViewLoader>

      {/* Move content div after ViewLoader */}
      <div className='relative z-10 mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5'>
        <div className='flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D Starter</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for React, React-three-fiber and Threejs.</p>
        </div>
      </div>
    </>
  )
}
