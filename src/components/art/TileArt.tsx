import { TILE_ART } from '../../content/art'
import type { TileId } from '../../types/game'

interface TileArtProps {
  id: TileId
  className?: string
}

const EMOJI: Record<TileId, string> = {
  ndvi: '🌿',
  soilMoisture: '💧',
  temperature: '🌡️',
  rainfall: '🌧️',
  canopy: '🌱',
  farmerName: '👨‍🌾',
  cropVariety: '🌾',
  birdCount: '🐦',
  tractorModel: '🚜',
  soilPh: '🧪',
  windSpeed: '💨',
  pesticideBrand: '🧴',
}

export function TileArt({ id, className = '' }: TileArtProps) {
  const src = TILE_ART[id]
  if (!src) {
    return (
      <div
        className={`grid place-items-center rounded-xl bg-peach ${className}`}
        aria-hidden
      >
        <span className="text-2xl sm:text-3xl">{EMOJI[id] ?? '📋'}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      decoding="async"
      onError={(e) => {
        const target = e.currentTarget
        target.style.display = 'none'
        const parent = target.parentElement
        if (parent && !parent.querySelector('.tile-emoji-fallback')) {
          const fallback = document.createElement('span')
          fallback.className = 'tile-emoji-fallback grid h-full w-full place-items-center text-2xl sm:text-3xl'
          fallback.textContent = EMOJI[id] ?? '📋'
          parent.appendChild(fallback)
        }
      }}
      className={`object-contain ${className}`}
    />
  )
}
