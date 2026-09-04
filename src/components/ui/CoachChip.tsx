import type { CoachMood } from '../../types/game'
import { CoachSprite } from '../art/CoachSprite'

interface CoachChipProps {
  mood: CoachMood
  line: string
  kicker?: string
  muted?: boolean
  onToggleMute?: () => void
  onSpeak?: () => void
  clamp?: boolean
}

export function CoachChip({
  mood,
  line,
  kicker,
  muted,
  onToggleMute,
  onSpeak,
  clamp = true,
}: CoachChipProps) {
  return (
    <div className="flex w-full items-start gap-2 rounded-3xl border-4 border-bot-ink/25 bg-white/92 p-2 shadow-toy backdrop-blur-sm">
      <div className="shrink-0">
        <CoachSprite mood={mood} className="h-14 w-14 sm:h-16 sm:w-16" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        {kicker ? (
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold sm:text-xs">
            {kicker}
          </p>
        ) : null}
        <p
          className={`text-sm font-extrabold leading-snug text-bot-ink sm:text-base ${clamp ? 'line-clamp-4' : ''}`}
          role="status"
          aria-live="polite"
        >
          {line}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          {onSpeak ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-peach px-2 py-0.5 text-[11px] font-extrabold text-bot-ink active:scale-95"
              onClick={onSpeak}
              aria-label="Read aloud"
            >
              🔊 Read
            </button>
          ) : null}
          {onToggleMute ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-navy/10 px-2 py-0.5 text-[11px] font-extrabold text-bot-ink active:scale-95"
              onClick={onToggleMute}
              aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
            >
              {muted ? '🔇' : '🔊'}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
