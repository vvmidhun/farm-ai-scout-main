import { useMemo } from 'react'
import { SATELLITE_MCQ } from '../content/missionMeta'
import { SPEECH, SATELLITE_SHELF } from '../content/speech'
import { TILES, TILE_IDS, tileKind } from '../content/tiles'
import type { MissionApi } from '../state/useMission'
import { SceneBackground } from './art/SceneBackground'
import { TileArt } from './art/TileArt'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'
import type { TileId } from '../types/game'

interface SatelliteScreenProps {
    mission: MissionApi
}

function TileCard({
                      id,
                      zone,
                      onMoveKeep,
                      onMoveShelf,
                  }: {
    id: TileId
    zone: 'keep' | 'shelf'
    onMoveKeep: () => void
    onMoveShelf: () => void
}) {
    const tile = TILES[id]
    const kind = tileKind(id)

    return (
        <div
            className={`rounded-2xl border-4 p-2 shadow-toy transition-all ${
                zone === 'keep'
                    ? 'border-good/40 bg-white/95'
                    : 'border-slate-300 bg-white/70'
            }`}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', id)
                e.dataTransfer.effectAllowed = 'move'
            }}
        >
            <div className="flex h-16 w-full">
                <TileArt id={id} className="h-full w-full" />
            </div>
            <p className="mt-1 line-clamp-1 text-center text-xs font-extrabold text-bot-ink">
                {tile.short}
            </p>
            <p className="mt-0.5  text-center text-[10px] font-bold leading-tight text-slate-500 sm:text-xs">
                {tile.fact}
            </p>
            <div className="mt-1.5 flex gap-1">
                {zone !== 'keep' ? (
                    <button
                        type="button"
                        onClick={onMoveKeep}
                        className="flex-1 rounded-xl bg-good/90 px-1.5 py-1 text-[10px] font-extrabold text-emerald-950 active:scale-95 sm:text-xs"
                    >
                        ✓ Keep
                    </button>
                ) : null}
                {zone !== 'shelf' ? (
                    <button
                        type="button"
                        onClick={onMoveShelf}
                        className="flex-1 rounded-xl bg-slate-300 px-1.5 py-1 text-[10px] font-extrabold text-slate-700 active:scale-95 sm:text-xs"
                    >
                        ✗ Peel
                    </button>
                ) : null}
            </div>
            <div className={`mt-1 text-center text-[9px] font-extrabold uppercase tracking-wider text-slate-400`}>
                {kind === 'needed' ? '' : ''}
            </div>
        </div>
    )
}

export function SatelliteScreen({ mission }: SatelliteScreenProps) {
    const keptSet = useMemo(() => new Set(mission.keptTiles), [mission.keptTiles])
    const ignoredSet = useMemo(() => new Set(mission.ignoredTiles), [mission.ignoredTiles])

    const keptIds = TILE_IDS.filter((id) => keptSet.has(id))
    const shelfIds = TILE_IDS.filter((id) => ignoredSet.has(id))

    const totalNeeded = 5
    const totalDecoy = 7
    const keptNeededCount = keptIds.filter((id) => tileKind(id) === 'needed').length
    const ignoredDecoyCount = shelfIds.filter((id) => tileKind(id) === 'decoy').length

    const allDone = keptNeededCount === totalNeeded && ignoredDecoyCount === totalDecoy

    const showMcq = mission.satMcqPicked !== null || allDone

    const onDropZone = (zone: 'keep' | 'shelf') => (e: React.DragEvent) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain') as TileId
        if (id && TILE_IDS.includes(id)) {
            mission.placeTile(id, zone)
        }
    }

    return (
        <div className="relative flex min-h-dvh w-full flex-col bg-navy">
            <SceneBackground scene="satellite" tint={0.3} />

            {/* FIX: widened from a flat `max-w-lg` (mobile-width even on desktop)
          to scale up on larger screens, so there's actually room to lay
          things out horizontally instead of stacking everything tall. */}
            <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col gap-2 px-3 py-3 lg:max-w-6xl lg:gap-3 lg:px-6 lg:py-4">
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
                    <div className="flex items-center justify-between gap-2 text-xs font-extrabold">
          <span className="text-good">
            ✓ {keptNeededCount}/{totalNeeded} drought layers kept
          </span>
                        <span className="text-slate-500">
            ✗ {ignoredDecoyCount}/{totalDecoy} irrelevant peeled
          </span>
                    </div>
                </div>

                {/* FIX: KEEP and SHELF now sit side-by-side at lg+ instead of
            stacked, roughly halving the total vertical height needed.
            Removed the old `overflow-y-auto` — no more inner scroll trap. */}
                <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4">
                    <div
                        className="flex flex-col rounded-2xl border-4 border-dashed border-good/50 bg-good/10 p-2 lg:flex-1"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onDropZone('keep')}
                    >
                        <p className="mb-1.5 text-center text-sm font-extrabold uppercase tracking-wider ">
                            🛰️ KEEP — drought-relevant data
                        </p>
                        {keptIds.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center py-4">
                                <p className="max-w-[16rem] text-center text-sm font-bold text-slate-700">
                                    Drag tiles here or click ✓ Keep
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                                {keptIds.map((id) => (
                                    <TileCard
                                        key={id}
                                        id={id}
                                        zone="keep"
                                        onMoveKeep={() => undefined}
                                        onMoveShelf={() => mission.placeTile(id, 'shelf')}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div
                        className="flex flex-col rounded-2xl border-4 border-dashed border-slate-400/60 bg-slate-100/90 p-2 backdrop-blur-sm lg:flex-1"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onDropZone('shelf')}
                    >
                        <p className="mb-1.5 text-center text-sm font-extrabold uppercase tracking-wider text-slate-700">
                            🗑️ {SATELLITE_SHELF}
                        </p>
                        {shelfIds.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center py-4">
                                <p className="max-w-[16rem] text-center text-sm font-bold text-slate-600">
                                    Move irrelevant tiles here (names, tools, birds…)
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-1.5 opacity-80 sm:grid-cols-4">
                                {shelfIds.map((id) => (
                                    <TileCard
                                        key={id}
                                        id={id}
                                        zone="shelf"
                                        onMoveKeep={() => mission.placeTile(id, 'keep')}
                                        onMoveShelf={() => undefined}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {showMcq ? (
                    <div className="rounded-2xl border-4 border-gold bg-white/95 p-3 shadow-toy lg:max-w-2xl lg:self-center">
                        <p className="mb-2 text-sm font-extrabold text-bot-ink sm:text-base">
                            🤔 {SATELLITE_MCQ.prompt}
                        </p>
                        <div className="flex flex-col gap-1.5">
                            {SATELLITE_MCQ.choices.map((choice, i) => {
                                const picked = mission.satMcqPicked
                                const isPicked = picked === i
                                const showResult = picked !== null
                                const isCorrect = i === SATELLITE_MCQ.correct
                                return (
                                    <button
                                        key={i}
                                        type="button"
                                        disabled={showResult}
                                        onClick={() => mission.answerSatMcq(i)}
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
                        {mission.satMcqPicked !== null && mission.satMcqOk ? (
                            <p className="mt-2 text-center text-xs font-extrabold text-good celebrate-pop">
                                {SPEECH.mcqYes}
                            </p>
                        ) : mission.satMcqPicked !== null && !mission.satMcqOk ? (
                            <p className="mt-2 text-center text-xs font-extrabold text-bad">
                                {SPEECH.mcqRetry}
                            </p>
                        ) : null}
                    </div>
                ) : null}

                {!showMcq ? (
                    <ChunkyButton
                        variant="primary"
                        size="lg"
                        className="w-full shrink-0 lg:max-w-md lg:self-center"
                        disabled={keptIds.length + shelfIds.length < TILE_IDS.length}
                        onClick={mission.finishSatellite}
                    >
                        ✓ I've sorted all data layers
                    </ChunkyButton>
                ) : null}
            </div>
        </div>
    )
}
