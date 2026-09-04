import { useEffect, useState } from 'react'
import type { StressTrend } from '../../types/game'
import { TREND_HINT } from '../../content/speech'

interface RainStripProps {
  values: readonly number[]
  animate?: boolean
  hint?: StressTrend | null
  reducedMotion?: boolean
  onShownValue?: (n: number) => void
}

export function RainStrip({
  values,
  animate = false,
  hint = null,
  reducedMotion = false,
  onShownValue,
}: RainStripProps) {
  const [revealed, setRevealed] = useState(animate && !reducedMotion ? 0 : values.length)

  useEffect(() => {
    if (!animate || reducedMotion) {
      setRevealed(values.length)
      return
    }
    setRevealed(0)
    let i = 0
    const step = () => {
      i += 1
      setRevealed(i)
      onShownValue?.(values[i - 1] ?? values[0] ?? 3)
      if (i < values.length) {
        id = window.setTimeout(step, 160)
      }
    }
    let id = window.setTimeout(step, 120)
    return () => window.clearTimeout(id)
  }, [animate, reducedMotion, values, onShownValue])

  const max = 5

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full items-end justify-center gap-1 sm:gap-1.5">
        {values.map((v, i) => {
          const shown = i < revealed
          const fraction = Math.max(0, Math.min(1, v / max))
          const h = 20 + fraction * 120
          const color =
            v <= 2 ? 'bg-drought' : v >= 4 ? 'bg-rain' : 'bg-monsoon'
          return (
            <div
              key={i}
              className="relative w-5 rounded-t-md shadow-sm sm:w-7"
              style={{
                height: shown ? `${h}px` : '4px',
                opacity: shown ? 1 : 0.2,
                background: shown ? undefined : 'rgb(210 210 210)',
                transition: reducedMotion ? 'none' : 'all 160ms ease-out',
              }}
              aria-hidden={!shown}
            >
              <div
                className={`absolute inset-0 rounded-t-md ${color}`}
                style={{ opacity: shown ? 1 : 0 }}
              />
              <div className="pointer-events-none absolute left-0 right-0 -top-4 text-center text-[10px] font-extrabold text-navy/70 sm:text-xs">
                {shown ? v : ''}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-1 flex justify-between px-1 text-[10px] font-extrabold uppercase tracking-wider text-navy/50 sm:text-xs">
        <span>5 years ago</span>
        <span>→</span>
        <span>This year</span>
      </div>
      {hint && revealed >= values.length ? (
        <p className="mt-1 rounded-full bg-gold-soft/90 px-2 py-0.5 text-center text-xs font-extrabold text-bot-ink">
          {TREND_HINT[hint]}
        </p>
      ) : null}
    </div>
  )
}
