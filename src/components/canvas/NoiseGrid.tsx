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
  position = [0, 0, 0], 
  scale = 1, 
  rotation = [Math.PI / 9, Math.PI / 12, 0],
  radius = 5,
  spherical = false
}: NoiseGridProps = {}) => {
  const ref = React.useRef<PointsRef>(null)
  const { viewport, pointer } = useThree()
  // Choose between plane or sphere geometry based on the spherical prop
  const geometry = spherical 
    ? new THREE.SphereGeometry(radius, 64, 64) 
    : new THREE.PlaneGeometry(6, 5, 64, 64)
  const coords = geometry.attributes.position
  let colors = []
  let col = new THREE.Color()
  const p = new THREE.Vector3()
  const nScale = 0.5
  const zPosScale = 3.0
  const lowColor = new THREE.Color(0.0, 0.0, 0.5)
  const highColor = new THREE.Color(0.0, 0.1, 0.7)
  let lightnessMult = 2.0
  let elapsedTime = 0

  const mouse = {
    x: 0,
    y: 0,
  }

  useFrame((_, t) => {
    elapsedTime += t * 0.2
    const geo = ref.current.geometry
    const verts = geo.attributes.position
    let ns
    colors = []

    // Adjust mouse position scaling
    const scaledMouseX = mouse.x * viewport.width
    const scaledMouseY = mouse.y * viewport.height

    // Update mouse position with smooth interpolation
    mouse.x += (pointer.x - mouse.x) * 0.02
    mouse.y += (pointer.y - mouse.y) * 0.02

    for (let i = 0; i < coords.count; i += 1) {
      p.fromBufferAttribute(verts, i)
      // Add mouse influence to noise
      const distance = Math.sqrt(Math.pow(p.x - scaledMouseX, 2) + Math.pow(p.y - scaledMouseY, 2))
      const influence = Math.max(0, 1 - distance / 3) // Adjust the divisor to change influence radius

      ns = Noise.noise(p.x * nScale + mouse.x * 2, p.y * nScale + mouse.y * 2, elapsedTime) * (1 + influence)

      p.z = ns * zPosScale
      verts.setXYZ(i, p.x, p.y, p.z)

      // Adjust color based on mouse proximity
      const mouseColor = new THREE.Color(0.2, 0.4, 1.0)
      col.lerpColors(lowColor, influence > 0.1 ? mouseColor : highColor, ns * lightnessMult)

      let { r, g, b } = col
      colors.push(r, g, b)
    }
    geo.setAttribute('position', verts)
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    verts.needsUpdate = true
  })

  const sprite = useLoader(THREE.TextureLoader, './circle.png')
  return (
    <points ref={ref} position={position} scale={scale} rotation={rotation}>
      <bufferGeometry>
        <bufferAttribute attach={'attributes-position'} count={coords.count} array={coords.array} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial alphaTest={0.5} vertexColors size={0.1} map={sprite} />
    </points>
  )
}
