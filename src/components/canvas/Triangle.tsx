import { useRef } from 'react'
import { Mesh, Group } from 'three'
import { useFrame } from '@react-three/fiber'

export const Triangle = () => {
  const groupRef = useRef<Group>(null)
  const triangleRef = useRef<Mesh>(null)
  const rectangleRef = useRef<Mesh>(null)

  useFrame(() => {
    if (triangleRef.current) {
      triangleRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Triangle */}
      <mesh ref={triangleRef} position={[0, 0, -1]}>
        <coneGeometry args={[1, 2, 4]} /> {/* radius, height, radialSegments */}
        <meshStandardMaterial color='#2f4f4f' />
      </mesh>

      {/* Colored Rectangle Group */}
      <group position={[0.5, -0.5, 0.01]}>
        {/* Green stripe */}
        <mesh position={[0, 0.125, 0]} rotation={[Math.PI, 0, 0]} scale={[0.4, 0.05, 0.05]}>
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial color='#2E7D32' />
        </mesh>
      </group>
      <group position={[0.5, -0.5, 0.01]}>
        {/* Red rectangle */}
        <mesh position={[-0.1, 0, 0]} rotation={[Math.PI, 0, 0]} scale={[0.2, 0.1, 0.05]}>
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial color='#D32F2F' />
        </mesh>

        {/* White rectangle */}
        <mesh position={[0.05, 0, 0]} rotation={[Math.PI, 0, 0]} scale={[0.1, 0.1, 0.05]}>
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial color='#FFFFFF' />
        </mesh>

        {/* Yellow rectangle */}
        <mesh position={[0.15, 0, 0]} rotation={[Math.PI, 0, 0]} scale={[0.1, 0.1, 0.05]}>
          <coneGeometry args={[1, 1, 4]} />
          <meshStandardMaterial color='#FFC107' />
        </mesh>

        {/* Yellow circle */}
        <mesh position={[-0.15, 0, 0.01]}>
          <circleGeometry args={[0.02, 32]} />
          <meshStandardMaterial color='#FFC107' />
        </mesh>
      </group>
    </group>
  )
}
