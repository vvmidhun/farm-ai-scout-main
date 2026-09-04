import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { HomeScreen } from './components/HomeScreen'
import { HOME_PRELOAD_URLS, LATE_PRELOAD_URLS, PLAY_PRELOAD_URLS, SCENE_BG } from './content/art'
import { preloadUrls, setLcpPreload } from './lib/preloadArt'
import { setMuted } from './logic/sfx'
import { useMission } from './state/useMission'

const HowToPlayOverlay = lazy(() =>
  import('./components/HowToPlayOverlay').then((m) => ({ default: m.HowToPlayOverlay })),
)
const BriefingScreen = lazy(() =>
  import('./components/BriefingScreen').then((m) => ({ default: m.BriefingScreen })),
)
const SatelliteScreen = lazy(() =>
  import('./components/SatelliteScreen').then((m) => ({ default: m.SatelliteScreen })),
)
const PatternScreen = lazy(() =>
  import('./components/PatternScreen').then((m) => ({ default: m.PatternScreen })),
)
const DecomposeScreen = lazy(() =>
  import('./components/DecomposeScreen').then((m) => ({ default: m.DecomposeScreen })),
)
const AlgorithmScreen = lazy(() =>
  import('./components/AlgorithmScreen').then((m) => ({ default: m.AlgorithmScreen })),
)
const PredictionScreen = lazy(() =>
  import('./components/PredictionScreen').then((m) => ({ default: m.PredictionScreen })),
)
const ResultsScreen = lazy(() =>
  import('./components/ResultsScreen').then((m) => ({ default: m.ResultsScreen })),
)
const BadgeScreen = lazy(() =>
  import('./components/BadgeScreen').then((m) => ({ default: m.BadgeScreen })),
)
const ReflectScreen = lazy(() =>
  import('./components/ReflectScreen').then((m) => ({ default: m.ReflectScreen })),
)

function ScreenFallback({ message }: { message?: string }) {
  return (
    <div
      className="flex h-dvh w-full items-center justify-center bg-navy"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gold-soft/80" aria-hidden />
        {message ? (
          <p className="font-display text-lg font-extrabold text-gold-soft">{message}</p>
        ) : null}
      </div>
      <span className="sr-only">{message ?? 'Loading…'}</span>
    </div>
  )
}

const PLAY_REST_URLS = PLAY_PRELOAD_URLS.filter((url) => url !== SCENE_BG.satellite)

function warmPlayAssets(): Promise<void> {
  setLcpPreload(SCENE_BG.satellite)
  return Promise.all([
    import('./components/BriefingScreen'),
    import('./components/SatelliteScreen'),
    import('./components/PatternScreen'),
    import('./components/DecomposeScreen'),
    import('./components/AlgorithmScreen'),
    import('./components/PredictionScreen'),
    import('./components/ResultsScreen'),
    import('./components/BadgeScreen'),
    import('./components/ReflectScreen'),
    preloadUrls([SCENE_BG.satellite], 'high'),
    preloadUrls(PLAY_REST_URLS, 'auto'),
  ]).then(() => {
    void preloadUrls(LATE_PRELOAD_URLS, 'low', 0)
  })
}

export default function App() {
  const mission = useMission()
  const [homeArtReady, setHomeArtReady] = useState(false)
  const [starting, setStarting] = useState(false)
  const playWarmRef = useRef<Promise<void> | null>(null)

  const ensurePlayAssets = useCallback(() => {
    if (!playWarmRef.current) playWarmRef.current = warmPlayAssets()
    return playWarmRef.current
  }, [])

  useEffect(() => {
    setMuted(mission.muted)
  }, [mission.muted])

  useEffect(() => {
    let cancelled = false
    setLcpPreload(SCENE_BG.home)
    void preloadUrls(HOME_PRELOAD_URLS, 'high').then(() => {
      if (!cancelled) setHomeArtReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const prefetchPlay = useCallback(() => {
    void ensurePlayAssets()
  }, [ensurePlayAssets])

  useEffect(() => {
    if (!homeArtReady) return
    if (mission.phase !== 'home' && mission.phase !== 'howto') return
    const id = window.setTimeout(() => {
      void ensurePlayAssets()
    }, 200)
    return () => window.clearTimeout(id)
  }, [ensurePlayAssets, homeArtReady, mission.phase])

  useEffect(() => {
    if (mission.phase === 'prediction') {
      setLcpPreload(SCENE_BG.prediction)
    } else if (mission.phase === 'pattern') {
      setLcpPreload(SCENE_BG.pattern)
    } else if (mission.phase === 'decompose') {
      setLcpPreload(SCENE_BG.decompose)
    } else if (mission.phase === 'algorithm') {
      setLcpPreload(SCENE_BG.algorithm)
    }
  }, [mission.phase])

  const handleStart = useCallback(() => {
    setStarting(true)
    void ensurePlayAssets().then(() => {
      mission.startPlay()
      setStarting(false)
    })
  }, [ensurePlayAssets, mission])

  if (!homeArtReady) {
    return <ScreenFallback message="Getting Farm AI Scout ready…" />
  }

  if (mission.phase === 'home' || mission.phase === 'howto') {
    return (
      <>
        <HomeScreen
          onHowTo={mission.openHowTo}
          onStart={handleStart}
          muted={mission.muted}
          onToggleMute={mission.toggleMute}
          onPrefetchPlay={prefetchPlay}
        />
        {mission.phase === 'howto' && (
          <Suspense fallback={null}>
            <HowToPlayOverlay
              onClose={mission.closeHowTo}
              onStart={handleStart}
              onPrefetchPlay={prefetchPlay}
            />
          </Suspense>
        )}
        {starting && (
          <div className="fixed inset-0 z-[60]">
            <ScreenFallback message="Booting up satellite uplink…" />
          </div>
        )}
      </>
    )
  }

  return (
    <Suspense fallback={<ScreenFallback />}>
      {mission.phase === 'briefing' && <BriefingScreen mission={mission} />}
      {mission.phase === 'satellite' && <SatelliteScreen mission={mission} />}
      {mission.phase === 'pattern' && <PatternScreen mission={mission} />}
      {mission.phase === 'decompose' && <DecomposeScreen mission={mission} />}
      {mission.phase === 'algorithm' && <AlgorithmScreen mission={mission} />}
      {mission.phase === 'prediction' && <PredictionScreen mission={mission} />}
      {mission.phase === 'results' && <ResultsScreen mission={mission} />}
      {mission.phase === 'badge' && <BadgeScreen mission={mission} />}
      {mission.phase === 'reflect' && <ReflectScreen mission={mission} />}
    </Suspense>
  )
}
