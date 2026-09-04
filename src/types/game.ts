export type CoachMood = 'idle' | 'cheer' | 'oops' | 'wow'

export type Phase =
  | 'home'
  | 'howto'
  | 'briefing'
  | 'satellite'
  | 'pattern'
  | 'decompose'
  | 'algorithm'
  | 'prediction'
  | 'results'
  | 'badge'
  | 'reflect'

export type FarmId =
  | 'sunrise'
  | 'greenfield'
  | 'riverside'
  | 'mango'
  | 'mustard'
  | 'cotton'

export type StressTrend = 'worsening' | 'stable' | 'improving'

export type FarmSize = 'small' | 'medium' | 'large'

export type TileId =
  | 'ndvi'
  | 'soilMoisture'
  | 'temperature'
  | 'rainfall'
  | 'canopy'
  | 'farmerName'
  | 'cropVariety'
  | 'birdCount'
  | 'tractorModel'
  | 'soilPh'
  | 'windSpeed'
  | 'pesticideBrand'

export type TileKind = 'needed' | 'decoy'

export type AlgoStepId =
  | 'rankStress'
  | 'groupBySize'
  | 'allocateSmall'
  | 'allocateMedium'
  | 'allocateLarge'
  | 'scheduleMorning'
  | 'verifyBalance'

export interface FarmDef {
  id: FarmId
  name: string
  crop: string
  size: FarmSize
  map: { x: number; y: number }
}

export interface SatTile {
  id: TileId
  label: string
  short: string
  fact: string
}

export interface PatternRound {
  id: string
  values: number[]
  trend: StressTrend
}

export interface AlgoStep {
  id: AlgoStepId
  label: string
  detail: string
}

export interface SatelliteResult {
  keptNeeded: TileId[]
  ignoredNeeded: TileId[]
  keptDecoy: TileId[]
  ignoredDecoy: TileId[]
  stars: 1 | 2 | 3
}

export interface PatternStamp {
  farmId: FarmId
  trend: StressTrend
  correct: boolean
}

export interface DecomposeResult {
  sortedSmall: FarmId[]
  sortedMedium: FarmId[]
  sortedLarge: FarmId[]
  correct: boolean
}

export interface AlgorithmResult {
  order: AlgoStepId[]
  correct: boolean
}

export interface PredictionResult {
  picked: FarmId[]
  correctTop: FarmId[]
  missedTop: FarmId[]
  allCorrect: boolean
}

export interface ScoreBreakdown {
  total: number
  maxTotal: number
  stars: 1 | 2 | 3
  satelliteStars: 1 | 2 | 3
  patternCount: number
  patternTotal: number
  decomposeOk: boolean
  algorithmOk: boolean
  predictionOk: boolean
}
