import { SCENE_BG } from '../content/art'
import { MISSION_META } from '../content/missionMeta'
import { ChunkyButton } from './ui/ChunkyButton'
import { CoachSprite } from './art/CoachSprite'

interface HomeScreenProps {
  onHowTo: () => void
  onStart: () => void
  muted: boolean
  onToggleMute: () => void
  onPrefetchPlay?: () => void
}

export function HomeScreen({
  onHowTo,
  onStart,
  muted,
  onToggleMute,
  onPrefetchPlay,
}: HomeScreenProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-navy">
      <img
        src={SCENE_BG.home}
        alt=""
        aria-hidden
        fetchPriority="high"
        loading="eager"
        decoding="sync"
        className="pointer-events-none fixed inset-0 h-full w-full object-cover"
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(180deg, #cfe8ff 0%, #fff6e8 60%, #f4d7a0 100%)'
          e.currentTarget.removeAttribute('src')
        }}
      />

      <ChunkyButton
        size="sm"
        variant="ghost"
        className="absolute right-3 top-3 z-20"
        onClick={onToggleMute}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        {muted ? '🔇' : '🔊'}
      </ChunkyButton>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-lg flex-col gap-2 px-4 py-3 sm:py-4">
        <header className="home-enter shrink-0 rounded-3xl bg-navy/45 px-4 py-2.5 text-center backdrop-blur-sm">
          <p className="text-sm font-extrabold uppercase tracking-wider text-gold-soft">
            {MISSION_META.grade}
          </p>
          <h1 className="mt-0.5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {MISSION_META.textbook}
          </h1>
          <p className="mt-1 text-base font-bold leading-snug text-sky">{MISSION_META.chapter}</p>
        </header>

        <div className="home-enter flex shrink-0 justify-center" style={{ animationDelay: '60ms' }}>
          <div className="flex h-28 w-36 items-center justify-center drop-shadow-xl sm:h-32 sm:w-40">
            <span className="text-7xl cloud-bob" aria-hidden>🌾</span>
          </div>
        </div>

        <section
          className="home-enter shrink-0 rounded-3xl border-4 border-bot bg-white/90 p-3 shadow-toy backdrop-blur-sm"
          aria-labelledby="mission-title"
          style={{ animationDelay: '120ms' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky"
              aria-hidden
            >
              <CoachSprite mood="idle" className="h-14 w-14" />
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-xs font-extrabold uppercase tracking-wider text-bot/80">{MISSION_META.role}</p>
              <h2
                id="mission-title"
                className="font-display text-xl font-extrabold leading-tight text-bot sm:text-2xl"
              >
                {MISSION_META.mission}
              </h2>
            </div>
          </div>
          <p className="mt-2 text-left text-base font-semibold leading-snug text-bot-ink">{MISSION_META.intro}</p>
        </section>

        <div className="min-h-0 flex-1" aria-hidden />

        <div className="home-enter flex shrink-0 flex-col gap-2" style={{ animationDelay: '180ms' }}>
          <ChunkyButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={onStart}
            onPointerDown={onPrefetchPlay}
          >
            Start mission
          </ChunkyButton>
          <ChunkyButton variant="ghost" className="w-full" onClick={onHowTo} onPointerDown={onPrefetchPlay}>
            How to play
          </ChunkyButton>
        </div>
      </div>
    </div>
  )
}
