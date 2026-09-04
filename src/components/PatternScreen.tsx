import { PATTERN_MCQ } from '../content/missionMeta'
import { FARMS, FARM_IDS, TREND_SHORT, TREND_LABEL } from '../content/farms'
import { SPEECH, SORT_LABEL } from '../content/speech'
import type { MissionApi } from '../state/useMission'
import type { StressTrend, FarmId } from '../types/game'
import { FARM_ART } from '../content/art'
import { SceneBackground } from './art/SceneBackground'
import { RainStrip } from './art/RainStrip'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'
import type { ReactNode } from 'react'

interface PatternScreenProps {
  mission: MissionApi
}

function TrendButton({
  onClick,
  active,
  disabled,
  children,
  variant,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: ReactNode
  variant: StressTrend
}) {
  const color =
    variant === 'worsening'
      ? 'bg-bad border-bad/40 text-white'
      : variant === 'improving'
        ? 'bg-good border-emerald-900/30 text-emerald-950'
        : 'bg-gold border-bot-ink/30 text-bot-ink'
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        'rounded-2xl border-b-[3px] border-r-[2px] px-3 py-2 text-sm font-extrabold shadow-toy transition-transform active:translate-y-[2px] sm:text-base',
        color,
        active ? 'ring-4 ring-gold-soft scale-105' : '',
        disabled ? 'opacity-50' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function TrainingPanel({ mission }: { mission: MissionApi }) {
  const round = mission.deal.trainingRounds[mission.trainingRound]
  const isDone = mission.trainingRound >= mission.deal.trainingRounds.length
  if (!round && !isDone) return null

  return (
    <div className="rounded-2xl border-4 border-gold/50 bg-white/95 p-3 shadow-toy">
      <p className="mb-1 text-center text-xs font-extrabold uppercase tracking-wider text-gold">
        📚 Training {Math.min(mission.trainingRound + 1, mission.deal.trainingRounds.length)}/{mission.deal.trainingRounds.length}
      </p>
      {!isDone ? (
        <>
          <div className="rounded-xl bg-navy/5 p-2">
            <RainStrip
              values={round.values}
              animate
              hint={mission.trainingReject === round.trend ? round.trend : null}
              reducedMotion={mission.reducedMotion}
            />
          </div>
          <p className="mt-2 text-center text-sm font-extrabold text-bot-ink">
            What is this water stress trend?
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <TrendButton variant="worsening" onClick={() => mission.sortTraining('worsening')}>
              {SORT_LABEL.worsening}
            </TrendButton>
            <TrendButton variant="stable" onClick={() => mission.sortTraining('stable')}>
              {SORT_LABEL.stable}
            </TrendButton>
            <TrendButton variant="improving" onClick={() => mission.sortTraining('improving')}>
              {SORT_LABEL.improving}
            </TrendButton>
          </div>
        </>
      ) : (
        <p className="py-2 text-center text-sm font-extrabold text-good celebrate-pop">
          ✅ {SPEECH.sortDone} Now visit the 6 farms below!
        </p>
      )}
    </div>
  )
}

function FarmGrid({ mission }: { mission: MissionApi }) {
  return (
    <div className="rounded-2xl border-4 border-bot-ink/20 bg-white/92 p-2 shadow-toy">
      <p className="mb-1.5 text-center text-xs font-extrabold uppercase tracking-wider text-bot">
        🏞️ District Farms — tap to open
      </p>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {FARM_IDS.map((id) => {
          const farm = FARMS[id]
          const stamped = mission.stamped[id]
          const isCurrent = mission.currentFarm === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => mission.enterFarm(id)}
              disabled={isCurrent}
              className={[
                'rounded-2xl border-4 p-2 text-left transition-all active:scale-95 shadow-sm',
                isCurrent
                  ? 'border-gold bg-gold-soft/30 map-glow'
                  : stamped
                    ? 'border-good/60 bg-good/10'
                    : 'border-bot-ink/15 bg-white/70 hover:bg-peach/30',
              ].join(' ')}
            >
              <div className="h-14 w-full overflow-hidden rounded-xl bg-sky/30">
                <img
                  src={FARM_ART[id]}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <p className="mt-1 text-xs font-extrabold leading-tight text-bot-ink">
                {farm.name}
              </p>
              <p className="text-[10px] font-bold text-slate-500">
                {farm.crop} · {farm.size}
              </p>
              <p className="mt-0.5 text-[10px] font-extrabold">
                {stamped ? TREND_SHORT[stamped] : '⏳ not stamped'}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FarmDetail({ mission, id }: { mission: MissionApi; id: FarmId }) {
  const farm = FARMS[id]
  const values = mission.deal.strips[id]
  const alreadyStamped = mission.stamped[id]

  return (
    <div className="rounded-3xl border-4 border-gold bg-white/96 p-3 shadow-toy">
      <div className="mb-2 flex items-start gap-2">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-sky/30">
          <img
            src={FARM_ART[id]}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-extrabold text-bot-ink">{farm.name}</p>
          <p className="text-xs font-bold text-slate-500">Crop: {farm.crop}</p>
          <p className="text-xs font-bold text-slate-500">
            Size: {farm.size} farm · trend: {alreadyStamped ? TREND_SHORT[alreadyStamped] : 'not stamped'}
          </p>
        </div>
        <button
          type="button"
          onClick={mission.leaveFarm}
          className="shrink-0 rounded-full bg-slate-200 px-2 py-1 text-xs font-extrabold text-slate-600 active:scale-95"
        >
          ✕ Close
        </button>
      </div>

      <div className="rounded-xl bg-navy/5 p-2">
        <RainStrip
          values={values}
          animate
          hint={mission.farmHint ? mission.deal.actualTrend[id] : null}
          reducedMotion={mission.reducedMotion}
        />
      </div>

      <p className="mt-2 text-center text-sm font-extrabold text-bot-ink">
        {TREND_LABEL[mission.deal.actualTrend[id]] && mission.farmHint
          ? `Hint: compare first half vs second half`
          : alreadyStamped
            ? `Already stamped: ${TREND_SHORT[alreadyStamped]}`
            : 'Stamp the 10-year water stress trend below:'}
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <TrendButton
          variant="worsening"
          onClick={() => mission.stampTrend('worsening')}
          disabled={!!alreadyStamped}
        >
          {SORT_LABEL.worsening}
        </TrendButton>
        <TrendButton
          variant="stable"
          onClick={() => mission.stampTrend('stable')}
          disabled={!!alreadyStamped}
        >
          {SORT_LABEL.stable}
        </TrendButton>
        <TrendButton
          variant="improving"
          onClick={() => mission.stampTrend('improving')}
          disabled={!!alreadyStamped}
        >
          {SORT_LABEL.improving}
        </TrendButton>
      </div>
    </div>
  )
}

export function PatternScreen({ mission }: PatternScreenProps) {
  const trainingFinished = mission.trainingRound >= mission.deal.trainingRounds.length
  const showMcq = mission.allFarmSolved || mission.patternMcqPicked !== null

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="pattern" tint={0.25} />
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
            📊 Stamped: {mission.solvedCount}/6 farms
            {trainingFinished ? '' : ' · Finish training first'}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          {!trainingFinished ? (
            <TrainingPanel mission={mission} />
          ) : null}

          {trainingFinished && !mission.currentFarm ? (
            <FarmGrid mission={mission} />
          ) : null}

          {trainingFinished && mission.currentFarm ? (
            <FarmDetail mission={mission} id={mission.currentFarm} />
          ) : null}

          {showMcq ? (
            <div className="rounded-2xl border-4 border-gold bg-white/95 p-3 shadow-toy">
              <p className="mb-2 text-sm font-extrabold text-bot-ink sm:text-base">
                🤔 {PATTERN_MCQ.prompt}
              </p>
              <div className="flex flex-col gap-1.5">
                {PATTERN_MCQ.choices.map((choice, i) => {
                  const picked = mission.patternMcqPicked
                  const isPicked = picked === i
                  const showResult = picked !== null
                  const isCorrect = i === PATTERN_MCQ.correct
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={showResult}
                      onClick={() => mission.answerPatternMcq(i)}
                      className={[
                        'rounded-xl border-4 p-2 text-left text-xs font-extrabold transition-all sm:text-sm',
                        showResult
                          ? isCorrect
                            ? 'border-good bg-good/15 text-good'
                            : isPicked
                              ? 'border-bad bg-bad/10 text-bad'
                              : 'border-slate-200 bg-white/60 text-slate-500'
                          : 'border-bot-ink/20 bg-white active:scale-[0.99] hover:bg-peach/40 text-bot-ink',
                      ].join(' ')}
                    >
                      {choice}
                    </button>
                  )
                })}
              </div>
              {mission.patternMcqPicked !== null && mission.patternMcqOk ? (
                <p className="mt-2 text-center text-xs font-extrabold text-good celebrate-pop">
                  {SPEECH.mcqYes}
                </p>
              ) : mission.patternMcqPicked !== null && !mission.patternMcqOk ? (
                <p className="mt-2 text-center text-xs font-extrabold text-bad">
                  {SPEECH.mcqRetry}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {trainingFinished && !mission.currentFarm && !showMcq ? (
          <ChunkyButton
            variant="primary"
            size="lg"
            className="w-full shrink-0"
            disabled={!mission.allFarmSolved}
            onClick={mission.finishPattern}
          >
            ✓ All farms stamped — continue
          </ChunkyButton>
        ) : null}
      </div>
    </div>
  )
}
