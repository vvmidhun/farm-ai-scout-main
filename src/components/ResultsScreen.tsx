import { FARMS } from '../content/farms'
import { SPEECH, PREDICTED_RIGHT } from '../content/speech'
import type { MissionApi } from '../state/useMission'
import { BADGE_SCOUT, FARMER_THANKS, FARM_ART } from '../content/art'
import { SceneBackground } from './art/SceneBackground'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'

interface ResultsScreenProps {
  mission: MissionApi
}

function StarRow({ count }: { count: 1 | 2 | 3 }) {
  return (
    <p className="font-display text-2xl" aria-label={`${count} stars`}>
      <span className="text-gold">{'★'.repeat(count)}</span>
      <span className="text-slate-300">{'☆'.repeat(Math.max(0, 3 - count))}</span>
    </p>
  )
}

export function ResultsScreen({ mission }: ResultsScreenProps) {
  const res = mission.predictionResult
  const score = mission.score

  if (!res || !score) return null

  const correct = res.correctTop.length
  const pickedSet = new Set(mission.predictionPicked)

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="badge" tint={0.3} />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col gap-2 px-3 py-3">
        <SpeechDock
          mood={res.allCorrect ? 'wow' : 'oops'}
          line={mission.coachLine}
          clamp={false}
          onSpeak={() => mission.speak(mission.coachLine)}
        />

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          <div className="flex shrink-0 items-center justify-center gap-3 rounded-3xl border-4 border-gold bg-white/92 p-3 shadow-toy">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream p-1">
              <img
                src={res.allCorrect ? FARMER_THANKS : BADGE_SCOUT}
                alt=""
                aria-hidden
                className="h-full w-full object-contain celebrate-pop"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="min-w-0 flex-1 text-center">
              <p className="font-display text-sm font-extrabold text-gold uppercase tracking-wider">
                {PREDICTED_RIGHT(correct)}
              </p>
              <StarRow count={score.stars} />
              <p className="mt-1 text-sm font-extrabold text-bot-ink">
                {score.total} / {score.maxTotal} points
              </p>
            </div>
          </div>

          <div className="rounded-2xl border-4 border-bot-ink/20 bg-white/92 p-3 shadow-toy">
            <p className="mb-2 text-sm font-extrabold text-bot-ink">📋 Mission breakdown</p>
            <ul className="space-y-1.5 text-sm font-bold">
              <li className="flex items-center justify-between rounded-xl bg-cream/80 px-2.5 py-1.5 text-bot-ink">
                <span>🛰️ Abstraction (satellite)</span>
                <StarRow count={score.satelliteStars} />
              </li>
              <li className="flex items-center justify-between rounded-xl bg-cream/80 px-2.5 py-1.5 text-bot-ink">
                <span>📊 Pattern ({score.patternCount}/{score.patternTotal})</span>
                <span className="font-display text-lg text-gold">
                  {'★'.repeat(Math.round((score.patternCount / Math.max(1, score.patternTotal)) * 3))}
                  <span className="text-slate-300">
                    {'☆'.repeat(3 - Math.round((score.patternCount / Math.max(1, score.patternTotal)) * 3))}
                  </span>
                </span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-cream/80 px-2.5 py-1.5 text-bot-ink">
                <span>🧩 Decompose</span>
                <span className={score.decomposeOk ? 'font-extrabold text-good' : 'font-extrabold text-bad'}>
                  {score.decomposeOk ? '✓ Correct' : '✗ Review'}
                </span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-cream/80 px-2.5 py-1.5 text-bot-ink">
                <span>📋 Algorithm</span>
                <span className={score.algorithmOk ? 'font-extrabold text-good' : 'font-extrabold text-bad'}>
                  {score.algorithmOk ? '✓ Correct' : '✗ Review'}
                </span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-cream/80 px-2.5 py-1.5 text-bot-ink">
                <span>🎯 Prediction</span>
                <span className={score.predictionOk ? 'font-extrabold text-good' : 'font-extrabold text-bad'}>
                  {score.predictionOk ? '✓ All 3' : `✗ ${correct}/3`}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-4 border-bot-ink/20 bg-white/92 p-3 shadow-toy">
            <p className="mb-2 text-sm font-extrabold text-bot-ink">🎯 Top 3 farms that needed water first</p>
            <div className="space-y-1.5">
              {mission.deal.top3.map((id, i) => {
                const farm = FARMS[id]
                const isRight = pickedSet.has(id)
                return (
                  <div
                    key={id}
                    className={[
                      'flex items-center gap-2 rounded-xl border-2 px-2 py-1.5',
                      isRight ? 'border-good/40 bg-good/10' : 'border-bad/30 bg-bad/10',
                    ].join(' ')}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-soft/60 text-sm font-extrabold text-bot-ink">
                      {i + 1}
                    </span>
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-sky/25">
                      <img src={FARM_ART[id]} alt="" className="h-full w-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-extrabold text-bot-ink">{farm.name}</p>
                      <p className="truncate text-[10px] font-bold text-slate-500">{farm.crop}</p>
                    </div>
                    <span className="shrink-0 text-lg font-extrabold" aria-hidden>
                      {isRight ? '✅' : '❌'}
                    </span>
                  </div>
                )
              })}
            </div>
            {res.missedTop.length > 0 ? (
              <p className="mt-2 text-center text-[11px] font-bold text-slate-500">
                {SPEECH.resultMiss}
              </p>
            ) : (
              <p className="mt-2 text-center text-[11px] font-extrabold text-good celebrate-pop">
                {SPEECH.resultOk}
              </p>
            )}
          </div>
        </div>

        <ChunkyButton variant="primary" size="lg" className="w-full shrink-0" onClick={mission.afterResults}>
          See your badge 🏅
        </ChunkyButton>
      </div>
    </div>
  )
}
