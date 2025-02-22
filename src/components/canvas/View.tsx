'use client'

import { forwardRef, HTMLProps, ReactNode, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

interface CommonProps {
  color: any
  camera?: {
    position: [number, number, number]
    fov: number
  }
}

export const Common: React.FC<CommonProps> = ({ color, camera }) => {
  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {camera && <PerspectiveCamera makeDefault {...camera} />}
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </Suspense>
  )
}

interface ViewProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode
  className?: string
  orbit?: boolean
}

const View = forwardRef<HTMLDivElement, ViewProps>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
