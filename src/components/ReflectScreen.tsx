import { REFLECT_QUESTIONS, MISSION_META } from '../content/missionMeta'
import type { MissionApi } from '../state/useMission'
import { SceneBackground } from './art/SceneBackground'
import { ChunkyButton } from './ui/ChunkyButton'
import { SpeechDock } from './ui/SpeechDock'

interface ReflectScreenProps {
  mission: MissionApi
}

export function ReflectScreen({ mission }: ReflectScreenProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <SceneBackground scene="badge" tint={0.28} />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col gap-3 px-3 py-3">
        <SpeechDock mood="idle" line={mission.coachLine} clamp={false} onSpeak={() => mission.speak(mission.coachLine)} />

        <section className="shrink-0 rounded-3xl bg-white/92 p-4 shadow-toy">
          <div className="flex items-center gap-2">
            <span className="text-3xl" aria-hidden>💭</span>
            <p className="font-display text-xl font-extrabold text-bot-ink">
              Think & discuss
            </p>
          </div>
          <p className="mt-1 text-sm font-bold leading-snug text-slate-600">
            Mission completed: {MISSION_META.title}. Now think about how these 4 superpowers work in your own life.
          </p>
        </section>

        <ul className="grid min-h-0 flex-1 grid-cols-1 content-start gap-2 overflow-y-auto">
          {REFLECT_QUESTIONS.map((q, i) => (
            <li
              key={i}
              className="rounded-2xl border-4 border-bot-ink/15 bg-white/90 p-3 shadow-sm"
            >
              <p className="text-sm font-extrabold leading-snug text-bot-ink sm:text-base">
                {q}
              </p>
            </li>
          ))}
          <li className="rounded-2xl border-4 border-gold/60 bg-peach/60 p-3 shadow-sm celebrate-pop">
            <p className="text-sm font-extrabold leading-snug text-bot-ink sm:text-base">
              🎉 Bonus! Which of the 4 CT pillars was your favourite today?
              Abstraction 🛰️, Pattern 📊, Decompose 🧩, or Algorithm 📋?
            </p>
          </li>
        </ul>

        <div className="min-h-0 flex-1" aria-hidden />

        <ChunkyButton variant="primary" size="lg" className="w-full shrink-0" onClick={mission.restart}>
          🔄 Play again
        </ChunkyButton>
      </div>
    </div>
  )
}
