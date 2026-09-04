import { SATELLITE_DECOY, SATELLITE_NEEDED } from '../content/tiles'
import type {
  AlgoStepId,
  FarmId,
  FarmSize,
  ScoreBreakdown,
  StressTrend,
  TileId,
} from '../types/game'
import { ALGO_ORDER } from '../content/farms'

export function satelliteStars(
  kept: ReadonlySet<TileId>,
  ignored: ReadonlySet<TileId>,
): 1 | 2 | 3 {
  const keptNeeded = SATELLITE_NEEDED.filter((id) => kept.has(id))
  const ignoredNeeded = SATELLITE_NEEDED.filter((id) => ignored.has(id))
  const keptDecoy = SATELLITE_DECOY.filter((id) => kept.has(id))
  const ignoredDecoy = SATELLITE_DECOY.filter((id) => ignored.has(id))

  let points = 0
  points += keptNeeded.length * 2
  points += ignoredDecoy.length * 1
  points -= keptDecoy.length * 1
  points -= ignoredNeeded.length * 2

  const max = SATELLITE_NEEDED.length * 2 + SATELLITE_DECOY.length * 1
  const ratio = max <= 0 ? 0 : Math.max(0, points) / max
  return ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1
}

export function patternCorrectCount(
  stamped: Partial<Record<FarmId, StressTrend>>,
  actual: Record<FarmId, StressTrend>,
): { correct: number; total: number } {
  const ids = Object.keys(actual) as FarmId[]
  let correct = 0
  for (const id of ids) {
    if (stamped[id] === actual[id]) correct += 1
  }
  return { correct, total: ids.length }
}

export function decomposeCorrect(
  buckets: Record<FarmSize, FarmId[]>,
  expected: Record<FarmSize, FarmId[]>,
): boolean {
  for (const size of ['small', 'medium', 'large'] as FarmSize[]) {
    const got = [...buckets[size]].sort().join(',')
    const want = [...expected[size]].sort().join(',')
    if (got !== want) return false
  }
  return true
}

export function algorithmCorrect(order: AlgoStepId[]): boolean {
  if (order.length !== ALGO_ORDER.length) return false
  for (let i = 0; i < ALGO_ORDER.length; i++) {
    if (order[i] !== ALGO_ORDER[i]) return false
  }
  return true
}

export function pickTop3Farms(
  actual: Record<FarmId, StressTrend>,
  sizes: Record<FarmId, FarmSize>,
  stressScore: Record<FarmId, number>,
): FarmId[] {
  const ids = Object.keys(actual) as FarmId[]
  const priority = (id: FarmId): number => {
    const trend = actual[id]
    const size = sizes[id]
    let p = 0
    if (trend === 'worsening') p += 30
    else if (trend === 'stable') p += 10
    if (size === 'small') p += 20
    else if (size === 'medium') p += 10
    p += Math.max(0, stressScore[id] ?? 0)
    return p
  }
  const sorted = [...ids].sort((a, b) => priority(b) - priority(a))
  return sorted.slice(0, 3)
}

export function predictionScore(
  picked: FarmId[],
  correctTop: FarmId[],
): { correctTop: FarmId[]; missedTop: FarmId[]; allCorrect: boolean } {
  const pickSet = new Set(picked)
  const correct = correctTop.filter((id) => pickSet.has(id))
  const missed = correctTop.filter((id) => !pickSet.has(id))
  return {
    correctTop: correct,
    missedTop: missed,
    allCorrect: correct.length === correctTop.length && picked.length === correctTop.length,
  }
}

export function overallStars(
  satelliteStarsVal: 1 | 2 | 3,
  patternRatio: number,
  decomposeOk: boolean,
  algorithmOk: boolean,
  predictionOk: boolean,
): ScoreBreakdown {
  const patternScore = Math.round(patternRatio * 30)
  const maxPattern = 30
  let total = 0
  total += satelliteStarsVal * 10
  total += patternScore
  total += decomposeOk ? 15 : 0
  total += algorithmOk ? 15 : 0
  total += predictionOk ? 20 : 0

  const maxTotal = 30 + maxPattern + 15 + 15 + 20
  const ratio = maxTotal <= 0 ? 0 : total / maxTotal
  const stars: 1 | 2 | 3 = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1

  return {
    total,
    maxTotal,
    stars,
    satelliteStars: satelliteStarsVal,
    patternCount: Math.round(patternRatio * 6),
    patternTotal: 6,
    decomposeOk,
    algorithmOk,
    predictionOk,
  }
}
