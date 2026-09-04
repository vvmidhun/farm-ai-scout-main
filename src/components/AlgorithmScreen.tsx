import { ALGORITHM_MCQ } from '../content/missionMeta'
import { ALGO_STEPS, ALGO_ORDER } from '../content/farms'
import { SPEECH } from '../content/speech'
import type { MissionApi } from '../state/useMission'
import type { AlgoStepId } from '../types/game'
import { SceneBackground } from './art/SceneBackground'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'

interface AlgorithmScreenProps {
  mission: MissionApi
}

function StepCard({
  id,
  index,
  total,
  onMoveUp,
  onMoveDown,
}: {
  id: AlgoStepId
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  const step = ALGO_STEPS[id]
  return (
    <div
      className="flex items-start gap-2 rounded-2xl border-4 border-bot-ink/20 bg-white/95 p-2 shadow-toy"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id)
        e.dataTransfer.effectAllowed = 'move'
      }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-display text-lg font-extrabold text-bot-ink"
        aria-hidden
      >
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold leading-tight text-bot-ink sm:text-base">
          {step.label}
        </p>
        <p className="mt-0.5 text-xs font-semibold leading-snug text-slate-500 sm:text-sm">
          {step.detail}
        </p>
      </div>
      <div className="flex shrink-0 flex-col gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={index === 0}
          className="h-7 w-7 rounded-xl bg-sky text-white font-extrabold disabled:opacity-30 active:scale-95"
          aria-label="Move up"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={index >= total - 1}
          className="h-7 w-7 rounded-xl bg-sky text-white font-extrabold disabled:opacity-30 active:scale-95"
          aria-label="Move down"
        >
          ▼
        </button>
      </div>
    </div>
  )
}

export function AlgorithmScreen({ mission }: AlgorithmScreenProps) {
  const order = mission.algoOrder

  const correctCount = (() => {
    let c = 0
    for (let i = 0; i < Math.min(order.length, ALGO_ORDER.length); i++) {
      if (order[i] === ALGO_ORDER[i]) c++
      else break
    }
    return c
  })()

  const isCorrect = correctCount === ALGO_ORDER.length
  const showMcq = mission.algoMcqPicked !== null || isCorrect

  const moveAlgo = mission.moveAlgoStep

  const move = (id: AlgoStepId, dir: 'up' | 'down') => {
    moveAlgo(id, dir)
  }

  const handleDropAt = (targetIdx: number) => (e: React.DragEvent) => {
    e.preventDefault()
    const draggedId = e.dataTransfer.getData('text/plain') as AlgoStepId
    if (!draggedId || !ALGO_ORDER.includes(draggedId)) return
    const currentIdx = order.indexOf(draggedId)
    if (currentIdx === -1) return
    if (currentIdx === targetIdx) return
    const direction: 'up' | 'down' = targetIdx < currentIdx ? 'up' : 'down'
    const steps = Math.abs(targetIdx - currentIdx)
    for (let i = 0; i < steps; i++) moveAlgo(draggedId, direction)
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="algorithm" tint={0.22} />
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
            📋 Steps in correct position: {correctCount}/{ALGO_ORDER.length}
            {mission.algorithmHint ? ' · Hint: rank → group → allocate small→large → schedule → verify' : ''}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
          <div
            className="rounded-2xl border-4 border-dashed border-gold/60 bg-peach/30 p-2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropAt(0)}
          >
            <p className="mb-1 text-center text-[10px] font-extrabold uppercase tracking-wider text-gold">
              👆 Drop here to move to position 1
            </p>
          </div>
          {order.map((id, i) => (
            <div
              key={id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropAt(i)}
            >
              <StepCard
                id={id}
                index={i}
                total={order.length}
                onMoveUp={() => move(id, 'up')}
                onMoveDown={() => move(id, 'down')}
              />
            </div>
          ))}
          <div
            className="rounded-2xl border-4 border-dashed border-gold/60 bg-peach/30 p-2"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropAt(order.length - 1)}
          >
            <p className="text-center text-[10px] font-extrabold uppercase tracking-wider text-gold">
              👇 Drop here to move to end
            </p>
          </div>

          {showMcq ? (
            <div className="rounded-2xl border-4 border-gold bg-white/95 p-3 shadow-toy">
              <p className="mb-2 text-sm font-extrabold text-bot-ink sm:text-base">
                🤔 {ALGORITHM_MCQ.prompt}
              </p>
              <div className="flex flex-col gap-1.5">
                {ALGORITHM_MCQ.choices.map((choice, i) => {
                  const picked = mission.algoMcqPicked
                  const isPicked = picked === i
                  const showResult = picked !== null
                  const isCorrect = i === ALGORITHM_MCQ.correct
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={showResult}
                      onClick={() => mission.answerAlgoMcq(i)}
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
              {mission.algoMcqPicked !== null && mission.algoMcqOk ? (
                <p className="mt-2 text-center text-xs font-extrabold text-good celebrate-pop">
                  {SPEECH.mcqYes}
                </p>
              ) : mission.algoMcqPicked !== null && !mission.algoMcqOk ? (
                <p className="mt-2 text-center text-xs font-extrabold text-bad">
                  {SPEECH.mcqRetry}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {!showMcq ? (
          <ChunkyButton
            variant="primary"
            size="lg"
            className="w-full shrink-0"
            onClick={mission.finishAlgorithm}
          >
            ✓ Check my algorithm order
          </ChunkyButton>
        ) : null}
      </div>
    </div>
  )
}
