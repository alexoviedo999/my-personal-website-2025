'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, Suspense, useState, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

// 2D Image Component with transition support
function Picasso2D({ opacity = 1, scale = 1, visible = true, ...props }) {
  try {
    const texture = useTexture('/the-woman-beauty-picasso.jpg')
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
      if (meshRef.current && visible) {
        // meshRef.current.rotation.y += delta * 0.3
        meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1

        // Smooth opacity transition
        if (meshRef.current.material && 'opacity' in meshRef.current.material) {
          meshRef.current.material.opacity = THREE.MathUtils.lerp(
            meshRef.current.material.opacity,
            opacity * 0.9,
            delta * 3,
          )
        }
      }
    })

    if (!visible) return null

    return (
      <mesh ref={meshRef} scale={scale} {...props}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial map={texture} transparent opacity={opacity * 0.9} />
      </mesh>
    )
  } catch (error) {
    console.error('Error loading 2D texture:', error)
    return (
      <mesh scale={scale} {...props}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color='cyan' transparent opacity={opacity} />
      </mesh>
    )
  }
}

// 3D Model Component with transition support
function Picasso3D({ opacity = 1, scale = 1, visible = true, ...props }) {
  const { scene } = useGLTF('/the-woman-beauty-picassoglb.glb')
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (modelRef.current && visible) {
      // modelRef.current.rotation.y += delta * 0.5
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.2

      // Smooth scale transition
      const targetScale = scale
      // Slower scale transition
      modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 1.5)

      // Apply opacity to all materials in the scene
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((mat) => {
            mat.transparent = true
            // Slower opacity transition
            mat.opacity = THREE.MathUtils.lerp(mat.opacity, opacity, delta * 1.5)
          })
        }
      })
    }
  })

  if (!visible) return null

  return <primitive ref={modelRef} object={scene} {...props} />
}

// Main component with smooth transitions
export const Picasso = ({ active, hovered = false, ...props }) => {
  const groupRef = useRef<THREE.Group>(null)
  const [showFallback, setShowFallback] = useState(true)
  const [transitionState, setTransitionState] = useState('2d') // '2d', 'transitioning', '3d'
  const [prevActive, setPrevActive] = useState(active)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Handle transition when active state changes
  useEffect(() => {
    if (active !== prevActive && !showFallback) {
      setTransitionState('transitioning')

      // 2-second transition duration
      const transitionTimer = setTimeout(() => {
        setTransitionState(active ? '3d' : '2d')
      }, 2000)

      setPrevActive(active)
      return () => clearTimeout(transitionTimer)
    }
  }, [active, prevActive, showFallback])

  // Animate group to center when active
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetPosition = active ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(0, 0, 0)
      if (active) {
        // When portal is active, move model to the center of the scene
        groupRef.current.position.lerp(targetPosition, delta * 2)
      }
    }
  })

  if (showFallback) {
    return <Picasso2D scale={0.8} />
  }

  // Calculate opacity and scale values for smooth transitions
  const get2DProps = () => {
    const isVisible = transitionState === '2d' || (transitionState === 'transitioning' && !active)
    return {
      opacity: isVisible ? 1 : 0,
      scale: hovered && isVisible ? 1.1 : 1,
      visible: transitionState !== '3d',
    }
  }

  const get3DProps = () => {
    const isVisible = transitionState === '3d' || (transitionState === 'transitioning' && active)
    return {
      opacity: isVisible ? 1 : 0,
      scale: hovered && isVisible ? 1.1 : 1,
      visible: transitionState !== '2d',
    }
  }

  return (
    <group ref={groupRef}>
      <Suspense fallback={<Picasso2D scale={0.8} />}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Picasso2D {...get2DProps()} {...props} />
        <Picasso3D {...get3DProps()} {...props} />
      </Suspense>
    </group>
  )
}
