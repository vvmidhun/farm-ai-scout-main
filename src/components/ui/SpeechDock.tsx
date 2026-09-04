import type { CoachMood } from '../../types/game'
import { CoachSprite } from '../art/CoachSprite'

interface SpeechDockProps {
  mood: CoachMood
  line: string
  clamp?: boolean
  onSpeak?: () => void
}

export function SpeechDock({ mood, line, clamp = true, onSpeak }: SpeechDockProps) {
  return (
    <div className="flex w-full items-start gap-2 rounded-3xl border-4 border-bot-ink/25 bg-white/92 p-2 shadow-toy backdrop-blur-sm">
      <div className="shrink-0">
        <CoachSprite mood={mood} className="h-14 w-14 sm:h-16 sm:w-16" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p
          className={`text-sm font-extrabold leading-snug text-bot-ink sm:text-base ${clamp ? 'line-clamp-4' : ''}`}
          role="status"
          aria-live="polite"
        >
          {line}
        </p>
        {onSpeak ? (
          <button
            type="button"
            className="mt-0.5 inline-flex w-fit items-center gap-1 rounded-full bg-peach px-2 py-0.5 text-[11px] font-extrabold text-bot-ink active:scale-95"
            onClick={onSpeak}
            aria-label="Read aloud"
          >
            🔊 Read
          </button>
        ) : null}
      </div>
    </div>
  )
}
