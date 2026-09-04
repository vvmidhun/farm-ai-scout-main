import type { StressTrend } from '../types/game'

const TREND_THRESHOLD = 0.55

export function classifyStress(values: readonly number[]): StressTrend {
  if (values.length < 2) return 'stable'
  const mid = Math.floor(values.length / 2)
  const first = average(values.slice(0, mid))
  const second = average(values.slice(mid))
  const diff = second - first
  if (Math.abs(diff) < TREND_THRESHOLD) return 'stable'
  return diff < 0 ? 'worsening' : 'improving'
}

export function stressScore(values: readonly number[]): number {
  const mid = Math.floor(values.length / 2)
  return average(values.slice(0, mid)) - average(values.slice(mid))
}

function average(values: readonly number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, n) => sum + n, 0) / values.length
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]!
    a[i] = a[j]!
    a[j] = tmp
  }
  return a
}
