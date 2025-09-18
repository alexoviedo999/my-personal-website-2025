'use client'

import { useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { ImprovedNoise } from '@/utils/ImprovedNoise.js'
import React from 'react'

const Noise = new ImprovedNoise()

type PointsRef = THREE.Points & {
  geometry: THREE.BufferGeometry
}

type NoiseGridProps = {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  radius?: number
  spherical?: boolean
}

export const NoiseGrid = ({
  position = [0, 0, -5],
  scale = 2,
  rotation = [0, 0, 0],
  radius = 5,
  spherical = false,
}: NoiseGridProps = {}) => {
  console.log('NoiseGrid component rendering - position:', position)
  const ref = React.useRef<PointsRef>(null)
  const { viewport, pointer } = useThree()

  // Create geometry once and memoize it
  const geometry = React.useMemo(() => {
    console.log('Creating geometry')
    return spherical ? new THREE.SphereGeometry(radius, 32, 32) : new THREE.PlaneGeometry(10, 8, 64, 64)
  }, [spherical, radius])

  const coords = geometry.attributes.position
  const colors = React.useRef<number[]>([])
  const col = React.useRef(new THREE.Color())
  const p = React.useRef(new THREE.Vector3())
  const nScale = 0.5
  const zPosScale = 3.0
  const lowColor = new THREE.Color(0.0, 0.0, 0.5)
  const highColor = new THREE.Color(0.0, 0.1, 0.7)
  const lightnessMult = 2.0
  const elapsedTime = React.useRef(0)

  const mouse = React.useRef({
    x: 0,
    y: 0,
  })

  // Cleanup geometry on unmount
  React.useEffect(() => {
    return () => {
      geometry.dispose()
    }
  }, [geometry])

  useFrame((_, t) => {
    if (!ref.current) {
      console.log('NoiseGrid: ref.current is null')
      return
    }

    elapsedTime.current += t * 0.2
    const geo = ref.current.geometry
    const verts = geo.attributes.position
    let ns
    colors.current = []

    // Adjust mouse position scaling
    const scaledMouseX = mouse.current.x * viewport.width
    const scaledMouseY = mouse.current.y * viewport.height

    // Update mouse position with smooth interpolation
    mouse.current.x += (pointer.x - mouse.current.x) * 0.02
    mouse.current.y += (pointer.y - mouse.current.y) * 0.02

    for (let i = 0; i < coords.count; i += 1) {
      p.current.fromBufferAttribute(verts, i)
      // Add mouse influence to noise
      const distance = Math.sqrt(Math.pow(p.current.x - scaledMouseX, 2) + Math.pow(p.current.y - scaledMouseY, 2))
      const influence = Math.max(0, 1 - distance / 3)

      ns =
        Noise.noise(
          p.current.x * nScale + mouse.current.x * 2,
          p.current.y * nScale + mouse.current.y * 2,
          elapsedTime.current,
        ) *
        (1 + influence)

      p.current.z = ns * zPosScale
      verts.setXYZ(i, p.current.x, p.current.y, p.current.z)

      // Adjust color based on mouse proximity
      const mouseColor = new THREE.Color(0.2, 0.4, 1.0)
      col.current.lerpColors(lowColor, influence > 0.1 ? mouseColor : highColor, ns * lightnessMult)

      let { r, g, b } = col.current
      colors.current.push(r, g, b)
    }
    geo.setAttribute('position', verts)
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors.current, 3))
    verts.needsUpdate = true
  })

  const sprite = useLoader(THREE.TextureLoader, '/circle.png')

  return (
    <points ref={ref} position={position} scale={scale} rotation={rotation} renderOrder={-1000}>
      <primitive object={geometry} />
      <pointsMaterial
        alphaTest={0.1}
        vertexColors
        size={0.05}
        map={sprite}
        depthWrite={false}
        transparent={true}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  )
}
