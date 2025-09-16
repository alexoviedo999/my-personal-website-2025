'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, Suspense, useState, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// 2D Image Component (shows when portal is closed)
function Picasso2D(props) {
  try {
    const texture = useTexture('/the-woman-beauty-picasso.jpg')
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.3
        meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1
      }
    })

    return (
      <mesh ref={meshRef} {...props}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial map={texture} transparent opacity={0.9} />
      </mesh>
    )
  } catch (error) {
    console.error('Error loading 2D texture:', error)
    return (
      <mesh {...props}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color='cyan' />
      </mesh>
    )
  }
}

// 3D Model Component (shows when portal is active) - temporarily disabled
export function Picasso3D(props) {
  const { scene } = useGLTF('/the-woman-beauty-picassoglb.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

// Main component
export const Picasso = ({ active, hovered = false, ...props }) => {
  const [showFallback, setShowFallback] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(false)
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [])

  if (showFallback) {
    return <Picasso2D scale={0.8} />
  }

  return (
    <Suspense fallback={<Picasso2D scale={0.8} />}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {active ? <Picasso3D scale={hovered ? 1.1 : 1} {...props} /> : <Picasso2D scale={hovered ? 1.1 : 1} {...props} />}
    </Suspense>
  )
}
