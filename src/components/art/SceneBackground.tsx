import { SCENE_BG, type SceneName } from '../../content/art'

interface SceneBackgroundProps {
  scene: SceneName
  tint?: number
}

export function SceneBackground({ scene, tint = 0.15 }: SceneBackgroundProps) {
  return (
    <>
      <img
        src={SCENE_BG[scene]}
        alt=""
        aria-hidden
        draggable={false}
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-navy select-none"
        aria-hidden
        style={{ opacity: tint }}
      />
    </>
  )
}
