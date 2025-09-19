'use client'

import { Environment, MeshPortalMaterial, RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'
import { useRef } from 'react'

export default function Portal({
  name,
  children,
  color = '#ffffff',
  active = null,
  setActive = () => {},
  hovered = null,
  setHovered = () => {},
  ...props
}: {
  name: string
  children: React.ReactNode
  color?: string
  active?: string
  setActive?: (active: string) => void
  hovered?: string
  setHovered?: (hovered: string) => void
  [key: string]: any // Allow additional props like position
}) {
  // Use any type for now to avoid TypeScript errors
  const portalMaterial = useRef<any>(null)

  useFrame((_state, delta) => {
    if (portalMaterial.current) {
      const portalOpen = active === name
      easing.damp(portalMaterial.current, 'blend', portalOpen ? 1 : 0, 0.5, delta)
    }
  })

  return (
    <group {...props}>
      <Text fontSize={0.2} position={[0, 1.2, 0.1]} anchorY='bottom' color={color} material-toneMapped={false}>
        {name}
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
          <ambientLight intensity={1.0} />
          <Environment preset='sunset' />
          {children}
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}
