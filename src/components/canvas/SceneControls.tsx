'use client'

import { useCanvas } from './CanvasContext'
import { SCENE_PRESETS, ScenePreset } from './scenes'

export const SceneControls = () => {
  console.log('SceneControls rendering') // Add this to debug
  console.log('SCENE_PRESETS:', SCENE_PRESETS) // Add this to debug
  const {
    animationSpeed,
    setAnimationSpeed,
    cameraControls,
    setCameraControls,
    activePortal,
    hoveredPortal,
    currentPreset,
    setCurrentPreset,
    sceneConfig,
  } = useCanvas()

  const presetInfo = {
    spacePortal: { emoji: '🌌', name: 'Space Portal', desc: 'Dark cosmic environment' },
    cosmic: { emoji: '🪐', name: 'Cosmic', desc: 'Deep space atmosphere' },
    gallery: { emoji: '🎨', name: 'Gallery', desc: 'Clean studio lighting' },
  }

  return (
    <div className='absolute top-4 right-4 z-20 rounded bg-black/50 p-4 text-white backdrop-blur-sm'>
      {/* Scene Preset Selector */}
      <div className='mb-4'>
        <label className='block text-sm mb-2 font-medium'>Scene Presets:</label>
        <div className='grid gap-2'>
          {Object.keys(SCENE_PRESETS).map((preset) => {
            const info = presetInfo[preset as keyof typeof presetInfo]
            const isActive = currentPreset === preset

            return (
              <button
                key={preset}
                onClick={() => setCurrentPreset(preset as ScenePreset)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  isActive ? 'border-blue-400 bg-blue-400/20' : 'border-gray-600 bg-gray-600/20 hover:border-gray-500'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <span className='text-xl'>{info.emoji}</span>
                  <div>
                    <div className='font-medium text-sm'>{info.name}</div>
                    <div className='text-xs text-gray-300'>{info.desc}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Animation Speed */}
      <div className='mb-2'>
        <label className='block text-sm'>Animation Speed: {animationSpeed.toFixed(1)}</label>
        <input
          type='range'
          min='0'
          max='2'
          step='0.1'
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className='w-full'
        />
        <button
          onClick={() => setAnimationSpeed(sceneConfig.animation.defaultSpeed)}
          className='text-xs text-blue-400 hover:text-blue-300'
        >
          Reset to default ({sceneConfig.animation.defaultSpeed})
        </button>
      </div>

      {/* Camera Controls */}
      <div className='mb-2'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={cameraControls}
            onChange={(e) => setCameraControls(e.target.checked)}
            className='mr-2'
          />
          Camera Controls
        </label>
      </div>

      {/* Portal Status */}
      {activePortal && <div className='text-sm text-blue-400'>Active Portal: {activePortal}</div>}
      {hoveredPortal && <div className='text-sm text-green-400'>Hovered: {hoveredPortal}</div>}
    </div>
  )
}
