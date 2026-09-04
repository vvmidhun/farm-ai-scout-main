import { motion, useReducedMotion } from 'motion/react'
import { MISSION_META } from '../content/missionMeta'
import { ChunkyButton } from './ui/ChunkyButton'

interface HowToPlayOverlayProps {
  onClose: () => void
  onStart: () => void
  onPrefetchPlay?: () => void
}

export function HowToPlayOverlay({ onClose, onStart, onPrefetchPlay }: HowToPlayOverlayProps) {
  const reduce = useReducedMotion()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="howto-title"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <motion.div
        className="flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-cream p-4 shadow-toy"
        initial={reduce ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="howto-title" className="mb-3 shrink-0 text-center font-display text-2xl font-extrabold text-bot-ink">
          How to play
        </h2>
        <ol className="mb-4 space-y-2 overflow-y-auto">
          {MISSION_META.howToPlay.map((step, i) => (
            <li key={step.title} className="flex items-start gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-peach text-2xl"
                aria-hidden
              >
                {step.emoji}
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold leading-tight text-bot-ink">
                  {i + 1}. {step.title}
                </p>
                <p className="text-base font-semibold leading-snug text-slate-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <ChunkyButton variant="ghost" onClick={onClose}>
            Back
          </ChunkyButton>
          <ChunkyButton variant="primary" size="lg" onClick={onStart} onPointerDown={onPrefetchPlay}>
            Got it — start!
          </ChunkyButton>
        </div>
      </motion.div>
    </div>
  )
}
