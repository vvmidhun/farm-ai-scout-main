import { BRIEFING_STEPS } from '../content/missionMeta'
import type { MissionApi } from '../state/useMission'
import { SceneBackground } from './art/SceneBackground'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'

interface BriefingScreenProps {
  mission: MissionApi
}

export function BriefingScreen({ mission }: BriefingScreenProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="satellite" tint={0.25} />
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

        <h2 className="shrink-0 text-center font-display text-xl font-extrabold text-white sm:text-2xl">
          Mission Briefing
        </h2>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
          {BRIEFING_STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex items-start gap-3 rounded-2xl border-4 border-bot-ink/20 bg-white/92 p-2.5 shadow-toy"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-peach text-2xl"
                aria-hidden
              >
                {step.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-bold leading-tight text-bot-ink">
                  {i + 1}. {step.title}
                </p>
                <p className="text-sm font-semibold leading-snug text-slate-600 sm:text-base">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <ChunkyButton variant="primary" size="lg" className="w-full shrink-0" onClick={mission.finishBriefing}>
          Begin — turn on satellite 🛰️
        </ChunkyButton>
      </div>
    </div>
  )
}
