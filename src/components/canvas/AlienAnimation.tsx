'use client'

import { CameraControls, useCursor } from '@react-three/drei'
import { Macaroni } from '../../../public/models/macaroni/Macaroni'
import Portal from './Portal'
import Skybox from './Skybox'
import { NoiseGrid } from './NoiseGrid'
import { useEffect, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function AlienAnimation() {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  useCursor(hovered)
  const controlRef = useRef<CameraControls>(null)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active)?.getWorldPosition(targetPosition)
      controlRef.current.setLookAt(0, 0, 5, targetPosition.x, targetPosition.y, targetPosition.z, true)
    } else {
      controlRef.current.setLookAt(0, 0, 10, 0, 0, 0, true)
    }
  }, [active])

  return (
    <>
      <Skybox texture='textures/red-sky-1.jpg'>
        <CameraControls ref={controlRef} />
        <NoiseGrid position={[0, 0, 0]} radius={5.2} spherical={true} />
        <Portal
          name='Macaroni'
          color='#ffffff'
          active={active}
          setActive={setActive}
          hovered={hovered}
          setHovered={setHovered}
        >
          <Macaroni scale={0.5} position={[0, -1, 0]} hovered={hovered === 'Macaroni'} />
        </Portal>
      </Skybox>
    </>
  )
}
