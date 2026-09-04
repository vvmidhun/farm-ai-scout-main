import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ALGO_ORDER,
  ALGO_STEPS,
  FARM_IDS,
  FARM_SIZES,
  FARMS,
  PATTERN_KINDS,
  PATTERN_VALUES,
  STRESS_TRAINING,
} from '../content/farms'
import { SPEECH } from '../content/speech'
import { SATELLITE_DECOY, SATELLITE_NEEDED, tileKind } from '../content/tiles'
import { isMuted, setMuted as persistMute, sfx } from '../logic/sfx'
import {
  algorithmCorrect,
  decomposeCorrect,
  overallStars,
  patternCorrectCount,
  pickTop3Farms,
  predictionScore,
  satelliteStars as calcSatelliteStars,
} from '../logic/score'
import { classifyStress, shuffle, stressScore as calcStressScore } from '../logic/pattern'
import type {
  AlgoStepId,
  CoachMood,
  FarmId,
  FarmSize,
  Phase,
  ScoreBreakdown,
  StressTrend,
  TileId,
} from '../types/game'
import type { PatternKind } from '../content/farms'

export interface Deal {
  strips: Record<FarmId, number[]>
  kinds: Record<FarmId, PatternKind>
  actualTrend: Record<FarmId, StressTrend>
  stressScore: Record<FarmId, number>
  top3: FarmId[]
  algoSteps: AlgoStepId[]
  trainingRounds: typeof STRESS_TRAINING
}

function emptyStamped(): Record<FarmId, StressTrend | null> {
  return {
    sunrise: null,
    greenfield: null,
    riverside: null,
    mango: null,
    mustard: null,
    cotton: null,
  }
}

function emptyBuckets(): Record<FarmSize, FarmId[]> {
  return { small: [], medium: [], large: [] }
}

export function dealMission(): Deal {
  const kinds = shuffle(PATTERN_KINDS)
  const strips = {} as Record<FarmId, number[]>
  const assigned = {} as Record<FarmId, PatternKind>
  const actualTrend = {} as Record<FarmId, StressTrend>
  const stressScore = {} as Record<FarmId, number>

  FARM_IDS.forEach((id, i) => {
    const kind = kinds[i]!
    assigned[id] = kind
    strips[id] = PATTERN_VALUES[kind]
    actualTrend[id] = classifyStress(strips[id])
    stressScore[id] = calcStressScore(strips[id])
  })

  const sizes = {} as Record<FarmId, FarmSize>
  FARM_IDS.forEach((id) => {
    sizes[id] = FARMS[id].size
  })

  const top3 = pickTop3Farms(actualTrend, sizes, stressScore)

  return {
    strips,
    kinds: assigned,
    actualTrend,
    stressScore,
    top3,
    algoSteps: shuffle(ALGO_ORDER),
    trainingRounds: shuffle(STRESS_TRAINING),
  }
}

export interface MissionApi {
  phase: Phase
  coachMood: CoachMood
  coachLine: string
  muted: boolean
  reducedMotion: boolean
  deal: Deal
  keptTiles: TileId[]
  ignoredTiles: TileId[]
  satelliteStars: 1 | 2 | 3
  stamped: Record<FarmId, StressTrend | null>
  trainingRound: number
  trainingReject: StressTrend | null
  currentFarm: FarmId | null
  farmHint: boolean
  buckets: Record<FarmSize, FarmId[]>
  bucketReject: FarmSize | null
  algoOrder: AlgoStepId[]
  algorithmHint: boolean
  predictionPicked: FarmId[]
  predictionResult: ReturnType<typeof predictionScore> | null
  score: ScoreBreakdown | null
  satMcqPicked: number | null
  satMcqOk: boolean
  patternMcqPicked: number | null
  patternMcqOk: boolean
  decomposeMcqPicked: number | null
  decomposeMcqOk: boolean
  algoMcqPicked: number | null
  algoMcqOk: boolean
  allFarmSolved: boolean
  solvedCount: number
  openHowTo: () => void
  closeHowTo: () => void
  startPlay: () => void
  toggleMute: () => void
  speak: (line: string) => void
  finishBriefing: () => void
  placeTile: (itemId: string, zoneId: string | null) => void
  finishSatellite: () => void
  answerSatMcq: (index: number) => void
  sortTraining: (trend: StressTrend) => void
  enterFarm: (id: FarmId) => void
  leaveFarm: () => void
  stampTrend: (trend: StressTrend) => void
  finishPattern: () => void
  answerPatternMcq: (index: number) => void
  placeFarm: (itemId: string, zoneId: string | null) => void
  finishDecompose: () => void
  answerDecomposeMcq: (index: number) => void
  moveAlgoStep: (id: AlgoStepId, direction: 'up' | 'down') => void
  setAlgoOrder: (order: AlgoStepId[]) => void
  finishAlgorithm: () => void
  answerAlgoMcq: (index: number) => void
  togglePredict: (id: FarmId) => void
  submitPrediction: () => void
  afterResults: () => void
  continueBadge: () => void
  restart: () => void
}

export function useMission(): MissionApi {
  const [phase, setPhase] = useState<Phase>('home')
  const [coachMood, setCoachMood] = useState<CoachMood>('idle')
  const [muted, setMutedState] = useState<boolean>(isMuted)
  const [reducedMotion, setReducedMotion] = useState(false)

  const [deal, setDeal] = useState<Deal>(() => dealMission())

  const [keptTiles, setKeptTiles] = useState<TileId[]>([])
  const [ignoredTiles, setIgnoredTiles] = useState<TileId[]>([])
  const [satelliteStars, setSatelliteStars] = useState<1 | 2 | 3>(1)
  const [satMcqPicked, setSatMcqPicked] = useState<number | null>(null)
  const [satMcqOk, setSatMcqOk] = useState(false)

  const [stamped, setStamped] = useState<Record<FarmId, StressTrend | null>>(emptyStamped)
  const [trainingRound, setTrainingRound] = useState(0)
  const [trainingReject, setTrainingReject] = useState<StressTrend | null>(null)
  const [currentFarm, setCurrentFarm] = useState<FarmId | null>(null)
  const [farmHint, setFarmHint] = useState(false)
  const [patternWrongTries, setPatternWrongTries] = useState(0)
  const [patternMcqPicked, setPatternMcqPicked] = useState<number | null>(null)
  const [patternMcqOk, setPatternMcqOk] = useState(false)

  const [buckets, setBuckets] = useState<Record<FarmSize, FarmId[]>>(emptyBuckets)
  const [bucketReject, setBucketReject] = useState<FarmSize | null>(null)
  const [decomposeMcqPicked, setDecomposeMcqPicked] = useState<number | null>(null)
  const [decomposeMcqOk, setDecomposeMcqOk] = useState(false)

  const [algoOrder, setAlgoOrderState] = useState<AlgoStepId[]>(ALGO_STEPS ? [] : [])
  const [algoMcqPicked, setAlgoMcqPicked] = useState<number | null>(null)
  const [algoMcqOk, setAlgoMcqOk] = useState(false)
  const [algoWrongTries, setAlgoWrongTries] = useState(0)

  const [predictionPicked, setPredictionPicked] = useState<FarmId[]>([])
  const [predictionResult, setPredictionResult] = useState<ReturnType<typeof predictionScore> | null>(null)
  const [score, setScore] = useState<ScoreBreakdown | null>(null)

  const timers = useRef<number[]>([])

  const solvedCount = FARM_IDS.filter((id) => stamped[id] != null).length
  const allFarmSolved = solvedCount === FARM_IDS.length
  const algorithmHint = algoWrongTries >= 2

  const coachLine = useMemo(() => {
    if (phase === 'home' || phase === 'howto') return SPEECH.homeHook
    if (phase === 'briefing') return SPEECH.briefing
    if (phase === 'satellite') return SPEECH.satellite
    if (phase === 'pattern') {
      if (trainingRound < deal.trainingRounds.length) {
        return SPEECH.pattern
      }
      if (currentFarm && farmHint) return SPEECH.patternHint
      return allFarmSolved ? SPEECH.patternAllSolved : SPEECH.pattern
    }
    if (phase === 'decompose') return bucketReject ? SPEECH.decomposeHint : SPEECH.decompose
    if (phase === 'algorithm') return algorithmHint ? SPEECH.algorithmHint : SPEECH.algorithm
    if (phase === 'prediction') return SPEECH.prediction
    if (phase === 'results') {
      return predictionResult?.allCorrect ? SPEECH.resultOk : SPEECH.resultMiss
    }
    if (phase === 'badge') return SPEECH.badge
    if (phase === 'reflect') return SPEECH.reflect
    return SPEECH.briefing
  }, [
    phase,
    trainingRound,
    deal.trainingRounds.length,
    currentFarm,
    farmHint,
    allFarmSolved,
    bucketReject,
    algorithmHint,
    predictionResult?.allCorrect,
  ])

  const clearTimers = useCallback(() => {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }, [])

  const later = useCallback(
    (ms: number, fn: () => void) => {
      const wait = reducedMotion ? Math.min(ms, 80) : ms
      const id = window.setTimeout(fn, wait)
      timers.current.push(id)
    },
    [reducedMotion],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const speak = useCallback(
    (line: string) => {
      if (muted) return
      if (typeof window === 'undefined' || !window.speechSynthesis) return
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(line)
      u.rate = 1.05
      u.pitch = 1.1
      window.speechSynthesis.speak(u)
    },
    [muted],
  )

  const openHowTo = useCallback(() => {
    sfx.click()
    setPhase('howto')
  }, [])

  const closeHowTo = useCallback(() => {
    sfx.click()
    setPhase('home')
  }, [])

  const startPlay = useCallback(() => {
    clearTimers()
    const next = dealMission()
    setDeal(next)
    setKeptTiles([...SATELLITE_NEEDED, ...SATELLITE_DECOY])
    setIgnoredTiles([])
    setSatelliteStars(1)
    setSatMcqPicked(null)
    setSatMcqOk(false)
    setStamped(emptyStamped())
    setTrainingRound(0)
    setTrainingReject(null)
    setCurrentFarm(null)
    setFarmHint(false)
    setPatternWrongTries(0)
    setPatternMcqPicked(null)
    setPatternMcqOk(false)
    setBuckets(emptyBuckets())
    setBucketReject(null)
    setDecomposeMcqPicked(null)
    setDecomposeMcqOk(false)
    setAlgoOrderState(next.algoSteps)
    setAlgoMcqPicked(null)
    setAlgoMcqOk(false)
    setAlgoWrongTries(0)
    setPredictionPicked([])
    setPredictionResult(null)
    setScore(null)
    setCoachMood('idle')
    sfx.whoosh()
    setPhase('briefing')
  }, [clearTimers])

  const toggleMute = useCallback(() => {
    setMutedState((m) => {
      const next = !m
      persistMute(next)
      if (next && typeof window !== 'undefined') window.speechSynthesis?.cancel()
      return next
    })
  }, [])

  const finishBriefing = useCallback(() => {
    sfx.whoosh()
    setCoachMood('cheer')
    setPhase('satellite')
  }, [])

  const placeTile = useCallback(
    (itemId: string, zoneId: string | null) => {
      const id = itemId as TileId
      const toKeep = zoneId === 'keep'
      const toShelf = zoneId === 'shelf'
      if (!toKeep && !toShelf) return

      const kind = tileKind(id)
      if (toKeep) {
        setIgnoredTiles((s) => s.filter((c) => c !== id))
        setKeptTiles((s) => (s.includes(id) ? s : [...s, id]))
        sfx.snap()
        setCoachMood(kind === 'needed' ? 'cheer' : 'oops')
      } else {
        setKeptTiles((s) => s.filter((c) => c !== id))
        setIgnoredTiles((s) => (s.includes(id) ? s : [...s, id]))
        sfx.snap()
        setCoachMood(kind === 'decoy' ? 'cheer' : 'oops')
      }
    },
    [],
  )

  const finishSatellite = useCallback(() => {
    const kept = new Set(keptTiles)
    const ignored = new Set(ignoredTiles)
    const stars = calcSatelliteStars(kept, ignored)
    setSatelliteStars(stars)
    sfx.ding()
    setCoachMood(stars >= 2 ? 'cheer' : 'oops')
  }, [keptTiles, ignoredTiles])

  const answerSatMcq = useCallback(
    (index: number) => {
      const correct = 1
      setSatMcqPicked(index)
      if (index === correct) {
        setSatMcqOk(true)
        sfx.ding()
        setCoachMood('cheer')
        later(800, () => {
          sfx.whoosh()
          setPhase('pattern')
          setCoachMood('idle')
        })
      } else {
        setSatMcqOk(false)
        sfx.boing()
        setCoachMood('oops')
      }
    },
    [later],
  )

  const sortTraining = useCallback(
    (trend: StressTrend) => {
      const round = deal.trainingRounds[trainingRound]
      if (!round) return
      if (trend !== round.trend) {
        sfx.boing()
        setCoachMood('oops')
        setTrainingReject(trend)
        later(800, () => setTrainingReject(null))
        later(700, () => setCoachMood('idle'))
        return
      }
      sfx.ding()
      setCoachMood('cheer')
      const next = trainingRound + 1
      if (next >= deal.trainingRounds.length) {
        setTrainingRound(next)
        later(900, () => {
          sfx.tada()
          setCoachMood('wow')
        })
        return
      }
      later(700, () => {
        setTrainingRound(next)
        setCoachMood('idle')
      })
    },
    [deal.trainingRounds, later, trainingRound],
  )

  const enterFarm = useCallback((id: FarmId) => {
    sfx.click()
    setCurrentFarm(id)
    setFarmHint(false)
    setPatternWrongTries(0)
    setCoachMood('idle')
  }, [])

  const leaveFarm = useCallback(() => {
    sfx.click()
    setCurrentFarm(null)
    setFarmHint(false)
    setCoachMood('idle')
  }, [])

  const stampTrend = useCallback(
    (trend: StressTrend) => {
      if (!currentFarm || stamped[currentFarm]) return
      const actual = deal.actualTrend[currentFarm]
      if (trend !== actual) {
        sfx.boing()
        setCoachMood('oops')
        const tries = patternWrongTries + 1
        setPatternWrongTries(tries)
        if (tries >= 2) setFarmHint(true)
        later(700, () => setCoachMood('idle'))
        return
      }
      sfx.stamp()
      setCoachMood('wow')
      setStamped((s) => ({ ...s, [currentFarm]: trend }))
      later(1000, () => {
        sfx.ding()
        setCurrentFarm(null)
        setFarmHint(false)
        setPatternWrongTries(0)
        setCoachMood('cheer')
        later(600, () => setCoachMood('idle'))
      })
    },
    [currentFarm, deal.actualTrend, later, patternWrongTries, stamped],
  )

  const finishPattern = useCallback(() => {
    sfx.ding()
    setCoachMood(allFarmSolved ? 'cheer' : 'oops')
  }, [allFarmSolved])

  const answerPatternMcq = useCallback(
    (index: number) => {
      const correct = 1
      setPatternMcqPicked(index)
      if (index === correct) {
        setPatternMcqOk(true)
        sfx.ding()
        setCoachMood('cheer')
        later(800, () => {
          sfx.whoosh()
          setPhase('decompose')
          setCoachMood('idle')
        })
      } else {
        setPatternMcqOk(false)
        sfx.boing()
        setCoachMood('oops')
      }
    },
    [later],
  )

  const placeFarm = useCallback(
    (itemId: string, zoneId: string | null) => {
      const id = itemId as FarmId
      const size = zoneId as FarmSize
      if (size !== 'small' && size !== 'medium' && size !== 'large') return

      const correctSize = FARMS[id].size
      if (size !== correctSize) {
        sfx.boing()
        setCoachMood('oops')
        setBucketReject(size)
        later(900, () => setBucketReject(null))
        return
      }

      setBuckets((prev) => {
        const next: typeof prev = { small: [...prev.small], medium: [...prev.medium], large: [...prev.large] }
        for (const s of ['small', 'medium', 'large'] as FarmSize[]) {
          next[s] = next[s].filter((f) => f !== id)
        }
        if (!next[size].includes(id)) next[size].push(id)
        return next
      })
      sfx.ding()
      setCoachMood('cheer')
      later(600, () => setCoachMood('idle'))
    },
    [later],
  )

  const finishDecompose = useCallback(() => {
    const ok = decomposeCorrect(buckets, FARM_SIZES)
    sfx.ding()
    setCoachMood(ok ? 'cheer' : 'oops')
  }, [buckets])

  const answerDecomposeMcq = useCallback(
    (index: number) => {
      const correct = 0
      setDecomposeMcqPicked(index)
      if (index === correct) {
        setDecomposeMcqOk(true)
        sfx.ding()
        setCoachMood('cheer')
        later(800, () => {
          sfx.whoosh()
          setPhase('algorithm')
          setCoachMood('idle')
        })
      } else {
        setDecomposeMcqOk(false)
        sfx.boing()
        setCoachMood('oops')
      }
    },
    [later],
  )

  const moveAlgoStep = useCallback((id: AlgoStepId, direction: 'up' | 'down') => {
    setAlgoOrderState((prev) => {
      const idx = prev.indexOf(id)
      if (idx === -1) return prev
      const target = direction === 'up' ? idx - 1 : idx + 1
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      const tmp = next[idx]!
      next[idx] = next[target]!
      next[target] = tmp
      return next
    })
    sfx.click()
  }, [])

  const setAlgoOrder = useCallback((order: AlgoStepId[]) => {
    setAlgoOrderState(order)
  }, [])

  const finishAlgorithm = useCallback(() => {
    const ok = algorithmCorrect(algoOrder)
    if (!ok) {
      sfx.boing()
      setCoachMood('oops')
      setAlgoWrongTries((n) => n + 1)
      return
    }
    sfx.tada()
    setCoachMood('wow')
  }, [algoOrder])

  const answerAlgoMcq = useCallback(
    (index: number) => {
      const correct = 0
      setAlgoMcqPicked(index)
      if (index === correct) {
        setAlgoMcqOk(true)
        sfx.ding()
        setCoachMood('cheer')
        later(800, () => {
          sfx.whoosh()
          setPhase('prediction')
          setCoachMood('idle')
        })
      } else {
        setAlgoMcqOk(false)
        sfx.boing()
        setCoachMood('oops')
      }
    },
    [later],
  )

  const togglePredict = useCallback((id: FarmId) => {
    sfx.click()
    setPredictionPicked((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id)
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, id]
    })
  }, [])

  const submitPrediction = useCallback(() => {
    if (predictionPicked.length !== 3) return
    sfx.think()
    const res = predictionScore(predictionPicked, deal.top3)
    setPredictionResult(res)

    const satStars = satelliteStars
    const { correct, total } = patternCorrectCount(stamped as Record<FarmId, StressTrend>, deal.actualTrend)
    const ratio = total > 0 ? correct / total : 0
    const decompOk = decomposeCorrect(buckets, FARM_SIZES)
    const algoOk = algorithmCorrect(algoOrder)
    const breakdown = overallStars(satStars, ratio, decompOk, algoOk, res.allCorrect)
    setScore(breakdown)

    if (res.allCorrect) {
      sfx.tada()
      setCoachMood('wow')
    } else {
      sfx.hmm()
      setCoachMood('oops')
    }
    setPhase('results')
  }, [algoOrder, buckets, deal.actualTrend, deal.top3, predictionPicked, satelliteStars, stamped])

  const afterResults = useCallback(() => {
    sfx.click()
    setPhase('badge')
    setCoachMood('wow')
  }, [])

  const continueBadge = useCallback(() => {
    sfx.click()
    setPhase('reflect')
    setCoachMood('idle')
  }, [])

  const restart = useCallback(() => {
    clearTimers()
    sfx.click()
    setPhase('home')
    setCoachMood('idle')
  }, [clearTimers])

  return {
    phase,
    coachMood,
    coachLine,
    muted,
    reducedMotion,
    deal,
    keptTiles,
    ignoredTiles,
    satelliteStars,
    satMcqPicked,
    satMcqOk,
    stamped,
    trainingRound,
    trainingReject,
    currentFarm,
    farmHint,
    patternMcqPicked,
    patternMcqOk,
    buckets,
    bucketReject,
    decomposeMcqPicked,
    decomposeMcqOk,
    algoOrder,
    algorithmHint,
    algoMcqPicked,
    algoMcqOk,
    predictionPicked,
    predictionResult,
    score,
    allFarmSolved,
    solvedCount,
    openHowTo,
    closeHowTo,
    startPlay,
    toggleMute,
    speak,
    finishBriefing,
    placeTile,
    finishSatellite,
    answerSatMcq,
    sortTraining,
    enterFarm,
    leaveFarm,
    stampTrend,
    finishPattern,
    answerPatternMcq,
    placeFarm,
    finishDecompose,
    answerDecomposeMcq,
    moveAlgoStep,
    setAlgoOrder,
    finishAlgorithm,
    answerAlgoMcq,
    togglePredict,
    submitPrediction,
    afterResults,
    continueBadge,
    restart,
  }
}
