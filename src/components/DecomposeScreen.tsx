import { useMemo } from 'react'
import { DECOMPOSE_MCQ } from '../content/missionMeta'
import { FARMS, FARM_IDS, SIZE_LABEL, SIZE_SHORT } from '../content/farms'
import { SPEECH, BUCKET_LABEL } from '../content/speech'
import type { MissionApi } from '../state/useMission'
import type { FarmId, FarmSize } from '../types/game'
import { BUCKET_ART, FARM_ART } from '../content/art'
import { SceneBackground } from './art/SceneBackground'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'

interface DecomposeScreenProps {
  mission: MissionApi
}

const SIZES: FarmSize[] = ['small', 'medium', 'large']

function FarmCard({
  id,
  showAssignButtons,
  onAssign,
}: {
  id: FarmId
  showAssignButtons: boolean
  onAssign: (size: FarmSize) => void
}) {
  const farm = FARMS[id]
  return (
    <div
      className="rounded-2xl border-4 border-bot-ink/20 bg-white/95 p-2 shadow-sm transition-all"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id)
        e.dataTransfer.effectAllowed = 'move'
      }}
    >
      <div className="flex h-12 gap-2">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-sky/25">
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
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <p className="truncate text-xs font-extrabold text-bot-ink">{farm.name}</p>
          <p className="truncate text-[10px] font-bold text-slate-500">
            {farm.crop} · {SIZE_SHORT[farm.size]}
          </p>
        </div>
      </div>
      {showAssignButtons ? (
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onAssign(s)}
              className={[
                'rounded-lg px-1 py-1 text-[10px] font-extrabold active:scale-95',
                s === 'small'
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : s === 'medium'
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    : 'bg-purple-100 text-purple-800 hover:bg-purple-200',
              ].join(' ')}
            >
              → {SIZE_SHORT[s]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function BucketSection({
  size,
  farms,
  rejected,
  onDrop,
  onReassign,
}: {
  size: FarmSize
  farms: FarmId[]
  rejected: boolean
  onDrop: (id: FarmId) => void
  onReassign: (id: FarmId, s: FarmSize) => void
}) {
  const isSmall = size === 'small'
  const colorClass = isSmall
    ? 'border-emerald-400 bg-emerald-50/60'
    : size === 'medium'
      ? 'border-amber-400 bg-amber-50/60'
      : 'border-purple-400 bg-purple-50/60'
  return (
    <div
      className={[
        'rounded-2xl border-4 p-2 transition-all',
        colorClass,
        rejected ? 'tray-shake border-bad bg-bad/10' : '',
      ].join(' ')}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain') as FarmId
        if (id && FARM_IDS.includes(id)) onDrop(id)
      }}
    >
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white/80">
          <img
            src={BUCKET_ART[size]}
            alt=""
            aria-hidden
            draggable={false}
            className="h-full w-full object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold leading-tight text-bot-ink">
            {BUCKET_LABEL[size]}
          </p>
          <p className="text-[10px] font-bold text-slate-500">{SIZE_LABEL[size]}</p>
        </div>
        <span className="shrink-0 rounded-full bg-white/80 px-2 py-0.5 text-xs font-extrabold text-bot-ink">
          {farms.length}
        </span>
      </div>
      {farms.length > 0 ? (
        <div className="mt-1.5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {farms.map((fid) => (
            <div key={fid} className="rounded-xl border-2 border-white bg-white/90 p-1 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-sky/25">
                  <img
                    src={FARM_ART[fid]}
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-extrabold text-bot-ink">
                    {FARMS[fid].name}
                  </p>
                </div>
              </div>
              <div className="mt-1 grid grid-cols-3 gap-1">
                {SIZES.filter((s) => s !== size).concat([size]).slice(0, 3).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onReassign(fid, s)}
                    className={[
                      'rounded-lg px-1 py-0.5 text-[9px] font-extrabold active:scale-95',
                      s === size
                        ? 'bg-slate-200 text-slate-500'
                        : s === 'small'
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : s === 'medium'
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-200',
                    ].join(' ')}
                    title={s === size ? 'Current' : `Move to ${SIZE_SHORT[s]}`}
                  >
                    {s === size ? '✓' : `→${SIZE_SHORT[s]}`}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 rounded-xl border-2 border-dashed border-slate-300 bg-white/50 py-2 text-center text-[10px] font-bold text-slate-400">
          Drop farms here or use → {SIZE_SHORT[size]} buttons
        </p>
      )}
    </div>
  )
}

export function DecomposeScreen({ mission }: DecomposeScreenProps) {
  const assigned = useMemo(() => {
    const set = new Set<FarmId>()
    for (const s of SIZES) for (const id of mission.buckets[s]) set.add(id)
    return set
  }, [mission.buckets])

  const unassigned = FARM_IDS.filter((id) => !assigned.has(id))
  const totalAssigned = assigned.size

  const showMcq = mission.decomposeMcqPicked !== null || totalAssigned === FARM_IDS.length

  const assign = (id: FarmId, size: FarmSize) => mission.placeFarm(id, size)

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="decompose" tint={0.22} />
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
            🧩 Assigned: {totalAssigned}/{FARM_IDS.length} farms into buckets
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          {unassigned.length > 0 ? (
            <div className="rounded-2xl border-4 border-dashed border-slate-400/60 bg-slate-100/60 p-2">
              <p className="mb-1.5 text-center text-xs font-extrabold uppercase tracking-wider text-slate-600">
                🚜 Unassigned — tap a bucket or drag
              </p>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {unassigned.map((id) => (
                  <FarmCard key={id} id={id} showAssignButtons onAssign={(s) => assign(id, s)} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-1.5">
            {SIZES.map((s) => (
              <BucketSection
                key={s}
                size={s}
                farms={mission.buckets[s]}
                rejected={mission.bucketReject === s}
                onDrop={(id) => assign(id, s)}
                onReassign={assign}
              />
            ))}
          </div>

          {showMcq ? (
            <div className="rounded-2xl border-4 border-gold bg-white/95 p-3 shadow-toy">
              <p className="mb-2 text-sm font-extrabold text-bot-ink sm:text-base">
                🤔 {DECOMPOSE_MCQ.prompt}
              </p>
              <div className="flex flex-col gap-1.5">
                {DECOMPOSE_MCQ.choices.map((choice, i) => {
                  const picked = mission.decomposeMcqPicked
                  const isPicked = picked === i
                  const showResult = picked !== null
                  const isCorrect = i === DECOMPOSE_MCQ.correct
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={showResult}
                      onClick={() => mission.answerDecomposeMcq(i)}
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
              {mission.decomposeMcqPicked !== null && mission.decomposeMcqOk ? (
                <p className="mt-2 text-center text-xs font-extrabold text-good celebrate-pop">
                  {SPEECH.mcqYes}
                </p>
              ) : mission.decomposeMcqPicked !== null && !mission.decomposeMcqOk ? (
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
            disabled={totalAssigned < FARM_IDS.length}
            onClick={mission.finishDecompose}
          >
            ✓ All farms sorted — continue
          </ChunkyButton>
        ) : null}
      </div>
    </div>
  )
}
