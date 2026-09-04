import { COACH_ART } from '../../content/art'
import type { CoachMood } from '../../types/game'

interface CoachSpriteProps {
  mood?: CoachMood
  className?: string
}

export function CoachSprite({ mood = 'idle', className = '' }: CoachSpriteProps) {
  const src = COACH_ART[mood] ?? COACH_ART.idle
  return (
    <img
      src={src}
      alt={`Coach Sprout — ${mood}`}
      draggable={false}
      decoding="async"
      className={`object-contain ${className}`}
    />
  )
}
