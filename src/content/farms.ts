import type { AlgoStep, AlgoStepId, FarmDef, FarmId, FarmSize, StressTrend } from '../types/game'

export const FARM_IDS: FarmId[] = ['sunrise', 'greenfield', 'riverside', 'mango', 'mustard', 'cotton']

export const FARMS: Record<FarmId, FarmDef> = {
  sunrise: {
    id: 'sunrise',
    name: 'Sunrise Fields',
    crop: 'Wheat',
    size: 'medium',
    map: { x: 30, y: 35 },
  },
  greenfield: {
    id: 'greenfield',
    name: 'Greenfield Acres',
    crop: 'Rice',
    size: 'large',
    map: { x: 58, y: 28 },
  },
  riverside: {
    id: 'riverside',
    name: 'Riverside Farm',
    crop: 'Sugarcane',
    size: 'small',
    map: { x: 22, y: 58 },
  },
  mango: {
    id: 'mango',
    name: 'Mango Grove',
    crop: 'Mangoes',
    size: 'large',
    map: { x: 72, y: 52 },
  },
  mustard: {
    id: 'mustard',
    name: 'Mustard Plot',
    crop: 'Mustard',
    size: 'small',
    map: { x: 45, y: 70 },
  },
  cotton: {
    id: 'cotton',
    name: 'Cotton Belt',
    crop: 'Cotton',
    size: 'medium',
    map: { x: 66, y: 72 },
  },
}

export const PATTERN_VALUES: Record<PatternKind, number[]> = {
  worsening: [5, 5, 4, 4, 3, 3, 2, 2, 1, 1],
  mildWorsen: [4, 4, 4, 3, 4, 3, 3, 3, 2, 3],
  improving: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
  mildImprove: [2, 2, 2, 3, 3, 4, 4, 4, 5, 5],
  stableA: [3, 4, 3, 3, 4, 3, 4, 3, 3, 4],
  stableB: [4, 3, 4, 4, 3, 4, 3, 4, 4, 3],
}

export type PatternKind = 'worsening' | 'mildWorsen' | 'improving' | 'mildImprove' | 'stableA' | 'stableB'

export const PATTERN_KINDS: PatternKind[] = ['worsening', 'mildWorsen', 'improving', 'mildImprove', 'stableA', 'stableB']

export const FARM_SIZES: Record<FarmSize, FarmId[]> = {
  small: ['riverside', 'mustard'],
  medium: ['sunrise', 'cotton'],
  large: ['greenfield', 'mango'],
}

export const TREND_LABEL: Record<StressTrend, string> = {
  worsening: 'Water stress worsening',
  stable: 'Water stress stable',
  improving: 'Water stress improving',
}

export const TREND_SHORT: Record<StressTrend, string> = {
  worsening: '🔻 Worsening',
  stable: '➡️ Stable',
  improving: '🔺 Improving',
}

export const SIZE_LABEL: Record<FarmSize, string> = {
  small: 'Small (< 2 acres)',
  medium: 'Medium (2–10 acres)',
  large: 'Large (> 10 acres)',
}

export const SIZE_SHORT: Record<FarmSize, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
}

export const ALGO_STEPS: Record<AlgoStepId, AlgoStep> = {
  rankStress: {
    id: 'rankStress',
    label: 'Rank all farms by water stress',
    detail: 'Sort farms from worst stress to best — the thirstiest go first.',
  },
  groupBySize: {
    id: 'groupBySize',
    label: 'Group farms by size',
    detail: 'Separate small, medium, and large farms — each needs a different amount of water.',
  },
  allocateSmall: {
    id: 'allocateSmall',
    label: 'Allocate water to small farms first',
    detail: 'Small farms have fewer reserves — give them water before big ones.',
  },
  allocateMedium: {
    id: 'allocateMedium',
    label: 'Allocate water to medium farms',
    detail: 'Medium-sized plots get their share next.',
  },
  allocateLarge: {
    id: 'allocateLarge',
    label: 'Allocate water to large farms last',
    detail: 'Large farms can survive longer on stored water — they go last.',
  },
  scheduleMorning: {
    id: 'scheduleMorning',
    label: 'Schedule watering for early morning',
    detail: 'Water before 8 AM to stop evaporation in the hot sun.',
  },
  verifyBalance: {
    id: 'verifyBalance',
    label: 'Verify total water used ≤ budget',
    detail: 'Add it all up — never use more water than the reservoir holds.',
  },
}

export const ALGO_ORDER: AlgoStepId[] = [
  'rankStress',
  'groupBySize',
  'allocateSmall',
  'allocateMedium',
  'allocateLarge',
  'scheduleMorning',
  'verifyBalance',
]

export const STRESS_TRAINING: { id: string; values: number[]; trend: StressTrend }[] = [
  { id: 'worse', values: [5, 5, 4, 4, 3, 2, 2, 1, 1, 1], trend: 'worsening' },
  { id: 'better', values: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], trend: 'improving' },
  { id: 'same', values: [3, 4, 3, 3, 4, 3, 4, 3, 3, 4], trend: 'stable' },
]
