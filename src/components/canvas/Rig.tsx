'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import * as THREE from 'three'
import { useCanvas } from './CanvasContext'

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene } = useThree()
  const { activePortal, setActivePortal } = useCanvas()

  useEffect(() => {
    if (activePortal) {
      const active = scene.getObjectByName(activePortal)
      if (active) {
        // Calculate position relative to the portal
        active.parent.localToWorld(position.set(0, 0.5, 2))
        active.parent.localToWorld(focus.set(0, 0, -2))

        // Animate camera to the new position
        // CameraControls is the expected type for controls, but useThree() returns a generic EventDispatcher.
        // We can safely cast controls to CameraControls here.
        if (controls && typeof (controls as CameraControls).setLookAt === 'function') {
          ;(controls as CameraControls).setLookAt(...position.toArray(), ...focus.toArray(), true)
        }
      }
    } else {
      // Return to default position when no portal is active
      const defaultPosition = new THREE.Vector3(0, 2, 8)
      const defaultFocus = new THREE.Vector3(0, 0, 0)
      if (controls && typeof (controls as CameraControls).setLookAt === 'function') {
        ;(controls as CameraControls).setLookAt(...defaultPosition.toArray(), ...defaultFocus.toArray(), true)
      }
    }
  }, [activePortal, controls, scene, position, focus])

  // Handle escape key to close portal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activePortal) {
        setActivePortal(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activePortal, setActivePortal])

  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}

export { Rig }
