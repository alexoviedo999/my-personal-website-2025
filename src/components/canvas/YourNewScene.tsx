'use client'

import { useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'
import { useCursor } from '@react-three/drei'
import React from 'react'

//Example for a new base scene component
const YourNewScene: React.FC = () => {
  // State for interactivity
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef(null)

  // Change cursor on hover
  useCursor(hovered)

  // Optional: Animation loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <>
      {/* Your 3D objects */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => console.log('clicked!')}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>

      {/* Optional: Add additional lights specific to this scene */}
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
    </>
  )
}

export default YourNewScene
