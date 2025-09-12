// src/components/canvas/scenes/index.ts
export const SCENE_PRESETS = {
  spacePortal: {
    camera: { position: [0, 2.0, 6.5] as [number, number, number], fov: 90 },
    environment: 'city' as const,
    background: '#191920',
    fog: { color: '#191920', near: 0, far: 15 },
    lighting: {
      ambient: { intensity: 3 },
      point: { position: [10, 10, 10] as [number, number, number] },
    },
    animation: {
      defaultSpeed: 1,
      rotationSpeed: 0.03,
    },
  },
  cosmic: {
    camera: { position: [0, 3.0, 8.0] as [number, number, number], fov: 75 },
    environment: 'night' as const,
    background: '#0a0a0a',
    fog: { color: '#0a0a0a', near: 5, far: 25 },
    lighting: {
      ambient: { intensity: 1.5 },
      point: { position: [15, 15, 15] as [number, number, number] },
    },
    animation: {
      defaultSpeed: 0.7,
      rotationSpeed: 0.02,
    },
  },
  gallery: {
    camera: { position: [0, 1.0, 5.0] as [number, number, number], fov: 85 },
    environment: 'studio' as const,
    background: '#ffffff',
    fog: { color: '#ffffff', near: 0, far: 20 },
    lighting: {
      ambient: { intensity: 2.5 },
      point: { position: [5, 5, 5] as [number, number, number] },
    },
    animation: {
      defaultSpeed: 0.5,
      rotationSpeed: 0.01,
    },
  },
} as const

export type ScenePreset = keyof typeof SCENE_PRESETS
