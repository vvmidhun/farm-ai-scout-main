import { FARMS, FARM_IDS, TREND_SHORT, SIZE_SHORT } from '../content/farms'
import type { MissionApi } from '../state/useMission'
import { BADGE_SCOUT, FARM_ART } from '../content/art'
import { SceneBackground } from './art/SceneBackground'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'

interface BadgeScreenProps {
  mission: MissionApi
}

export function BadgeScreen({ mission }: BadgeScreenProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="badge" tint={0.25} />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col items-center gap-2 px-3 py-3">
        <SpeechDock mood="wow" line={mission.coachLine} onSpeak={() => mission.speak(mission.coachLine)} />

        <div className="shrink-0 flex flex-col items-center gap-1 rounded-3xl border-4 border-gold bg-white/92 p-4 shadow-toy celebrate-pop">
          <div className="h-28 w-28 overflow-hidden rounded-full bg-gold-soft/40 p-2 drop-shadow-xl">
            <img
              src={BADGE_SCOUT}
              alt="Farm AI Scout badge"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const parent = e.currentTarget.parentElement
                if (parent) parent.innerHTML = '<div class="grid h-full w-full place-items-center text-6xl">🏅</div>'
              }}
            />
          </div>
          <h2 className="text-center font-display text-2xl font-extrabold leading-tight text-gold sm:text-3xl">
            Farm AI Scout
          </h2>
          <p className="text-center font-display text-lg font-extrabold leading-tight text-bot-ink">
            Certified Badge
          </p>
          <div className="mt-1 text-center text-gold">
            {'★'.repeat(mission.score?.stars ?? 1)}
            <span className="text-slate-300">
              {'☆'.repeat(3 - (mission.score?.stars ?? 1))}
            </span>
          </div>
        </div>

        <p className="shrink-0 text-center text-sm font-extrabold text-white/90">
          All 4 CT Pillars Mastered: Abstraction · Pattern · Decompose · Algorithm
        </p>

        <ul className="grid min-h-0 w-full flex-1 grid-cols-1 content-start gap-1 overflow-y-auto">
          {FARM_IDS.map((id) => {
            const farm = FARMS[id]
            const trend = mission.stamped[id]
            return (
              <li
                key={id}
                className="flex items-center justify-between gap-2 rounded-2xl bg-white/85 px-3 py-1.5 text-sm shadow-sm"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-sky/25">
                    <img
                      src={FARM_ART[id]}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-extrabold text-bot-ink">{farm.name}</p>
                    <p className="truncate text-[10px] font-bold text-slate-500">
                      {farm.crop} · {SIZE_SHORT[farm.size]}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] font-extrabold text-slate-600">
                  {trend ? TREND_SHORT[trend] : '—'}
                </span>
              </li>
            )
          })}
        </ul>

        <ChunkyButton variant="primary" size="lg" className="w-full shrink-0" onClick={mission.continueBadge}>
          One more thought 💭
        </ChunkyButton>
      </div>
    </div>
  )
}
