// src/components/canvas/CanvasContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SCENE_PRESETS, ScenePreset } from './scenes'

interface CanvasContextType {
  // Scene management
  currentPreset: ScenePreset
  setCurrentPreset: (preset: ScenePreset) => void

  // Existing state
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  activeScene: string | null
  setActiveScene: (scene: string | null) => void
  activePortal: string | null
  setActivePortal: (portal: string | null) => void
  hoveredPortal: string | null
  setHoveredPortal: (portal: string | null) => void
  cameraControls: boolean
  setCameraControls: (enabled: boolean) => void
  animationSpeed: number
  setAnimationSpeed: (speed: number) => void

  // Computed values from preset
  sceneConfig: (typeof SCENE_PRESETS)[ScenePreset]
}

const CanvasContext = createContext<CanvasContextType | null>(null)

interface CanvasProviderProps {
  children: ReactNode
  defaultPreset?: ScenePreset
}

export const CanvasProvider = ({ children, defaultPreset = 'spacePortal' }: CanvasProviderProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [activeScene, setActiveScene] = useState<string | null>(null)
  const [activePortal, setActivePortal] = useState<string | null>(null)
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)
  const [cameraControls, setCameraControls] = useState(true)
  const [currentPreset, setCurrentPreset] = useState<ScenePreset>(defaultPreset)

  // Initialize animation speed from preset
  const [animationSpeed, setAnimationSpeed] = useState<number>(SCENE_PRESETS[defaultPreset].animation.defaultSpeed)

  // Get current scene configuration
  const sceneConfig = SCENE_PRESETS[currentPreset]

  return (
    <CanvasContext.Provider
      value={{
        currentPreset,
        setCurrentPreset,
        isLoading,
        setIsLoading,
        activeScene,
        setActiveScene,
        activePortal,
        setActivePortal,
        hoveredPortal,
        setHoveredPortal,
        cameraControls,
        setCameraControls,
        animationSpeed,
        setAnimationSpeed,
        sceneConfig,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => {
  const context = useContext(CanvasContext)
  if (!context) {
    throw new Error('useCanvas must be used within CanvasProvider')
  }
  return context
}
