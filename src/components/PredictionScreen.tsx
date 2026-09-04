import { FARMS, FARM_IDS, TREND_SHORT, SIZE_SHORT } from '../content/farms'
import { SPEECH } from '../content/speech'
import type { MissionApi } from '../state/useMission'
import { DISTRICT_MAP, FARM_ART } from '../content/art'
import { SceneBackground } from './art/SceneBackground'
import { RainStrip } from './art/RainStrip'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'

interface PredictionScreenProps {
  mission: MissionApi
}

export function PredictionScreen({ mission }: PredictionScreenProps) {
  const picked = mission.predictionPicked
  const pickedSet = new Set(picked)

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="prediction" tint={0.28} />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col gap-2 px-3 py-3">
        <div className="flex items-start gap-2">
          <SpeechDock
            mood={mission.coachMood}
            line={mission.coachLine}
            onSpeak={() => mission.speak(mission.coachLine)}
          />
          <ChunkyButton
            size="sm"
            variant="ghost"
            className="shrink-0"
            onClick={mission.toggleMute}
            aria-label={mission.muted ? 'Turn sound on' : 'Turn sound off'}
          >
            {mission.muted ? '🔇' : '🔊'}
          </ChunkyButton>
        </div>

        <div className="shrink-0 rounded-2xl bg-white/90 px-3 py-2 shadow-toy">
          <p className="text-center text-xs font-extrabold text-bot-ink sm:text-sm">
            🎯 Emergency picks: {picked.length}/3 farms · Highest priority first
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          <div className="rounded-2xl border-4 border-bot-ink/20 bg-white/92 p-2 shadow-toy">
            <p className="mb-1 text-center text-[11px] font-extrabold uppercase tracking-wider text-bot">
              🗺️ District overview — use CT to find the 3 most at-risk
            </p>
            <div className="h-32 w-full overflow-hidden rounded-xl bg-sky/30">
              <img
                src={DISTRICT_MAP}
                alt="District map of farms"
                className="h-full w-full object-cover"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, #cfe8ff, #fff6e8)'
                  e.currentTarget.removeAttribute('src')
                }}
              />
            </div>
            <p className="mt-1 text-center text-[10px] font-bold text-slate-500">
              Combine: worsening trend + small size + lowest water score = highest risk
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            {FARM_IDS.map((id) => {
              const farm = FARMS[id]
              const trend = mission.deal.actualTrend[id]
              const size = farm.size
              const score = mission.deal.stressScore[id]
              const isPicked = pickedSet.has(id)
              const pickedIndex = picked.indexOf(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => mission.togglePredict(id)}
                  className={[
                    'flex items-start gap-2 rounded-2xl border-4 p-2 text-left transition-all shadow-sm active:scale-[0.99]',
                    isPicked
                      ? 'border-gold bg-gold-soft/20 ring-4 ring-gold/50'
                      : 'border-bot-ink/20 bg-white/92 hover:bg-peach/30',
                  ].join(' ')}
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sky/25">
                    <img
                      src={FARM_ART[id]}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    {isPicked ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-navy/30 backdrop-blur-[1px]">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold font-display text-lg font-extrabold text-bot-ink shadow-lg">
                          {pickedIndex + 1}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="truncate text-sm font-extrabold text-bot-ink">{farm.name}</p>
                      <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-extrabold text-slate-600">
                        {SIZE_SHORT[size]}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <span
                        className={[
                          'rounded-full px-1.5 py-0.5 text-[10px] font-extrabold',
                          trend === 'worsening'
                            ? 'bg-bad/15 text-bad'
                            : trend === 'improving'
                              ? 'bg-good/15 text-good'
                              : 'bg-gold/20 text-bot-ink',
                        ].join(' ')}
                      >
                        {TREND_SHORT[trend]}
                      </span>
                      <span className="rounded-full bg-sky/20 px-1.5 py-0.5 text-[10px] font-extrabold text-bot">
                        Stress score: {score.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-1.5 rounded-lg bg-navy/5 px-1 py-1">
                      <RainStrip values={mission.deal.strips[id]} reducedMotion={mission.reducedMotion} />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="shrink-0 rounded-2xl border-4 border-gold/60 bg-white/92 p-2 shadow-toy">
          <p className="text-center text-[11px] font-extrabold text-bot-ink">
            💡 {SPEECH.predictionHint}
          </p>
        </div>

        <ChunkyButton
          variant="primary"
          size="lg"
          className="w-full shrink-0"
          disabled={picked.length !== 3}
          onClick={mission.submitPrediction}
        >
          {picked.length === 3
            ? '✓ Submit top 3 emergency farms'
            : `Pick ${3 - picked.length} more farm${3 - picked.length === 1 ? '' : 's'}`}
        </ChunkyButton>
      </div>
    </div>
  )
}
