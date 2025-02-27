import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// Define the shader material
const WaveMaterial = shaderMaterial(
  {
    time: 0,
    baseTexture: null,
    amplitude: 0.1,
    frequency: 3.0,
    speed: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float amplitude;
    uniform float frequency;
    uniform float speed;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave = amplitude * sin(frequency * (position.x + position.y) + time * speed);
      pos.z += wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D baseTexture;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(baseTexture, vUv);
      gl_FragColor = color;
    }
  `,
)

// Extend Three.js with our custom material
extend({ WaveMaterial })

interface WaveImageProps {
  imageUrl: string
  width?: number
  height?: number
  amplitude?: number
  frequency?: number
  speed?: number
  pulseSpeed?: number
}

export function WaveImage({ imageUrl, width, height, amplitude, frequency, speed, pulseSpeed }: WaveImageProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture] = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(imageUrl)
    return [tex]
  }, [imageUrl])

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as any
      material.time = state.clock.getElapsedTime()

      // Add pulsing animation
      // Adjust this to control pulse speed
      const pulseDistance = 2.5 // Adjust this to control how far it moves
      meshRef.current.position.z = Math.sin(state.clock.getElapsedTime() * pulseSpeed) * pulseDistance
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height, 32, 32]} />
      {/* @ts-ignore */}
      <waveMaterial baseTexture={texture} amplitude={amplitude} frequency={frequency} speed={speed} />
    </mesh>
  )
}
