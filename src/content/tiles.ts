import type { SatTile, TileId, TileKind } from '../types/game'

export const TILES: Record<TileId, SatTile> = {
  ndvi: {
    id: 'ndvi',
    label: 'NDVI vegetation health',
    short: 'Plant health',
    fact: 'Satellite scan showing how green and healthy each farm’s crops are.',
  },
  soilMoisture: {
    id: 'soilMoisture',
    label: 'Soil moisture levels',
    short: 'Soil water',
    fact: 'How much water is currently in the farm soil — top 30 cm.',
  },
  temperature: {
    id: 'temperature',
    label: 'Land surface temperature',
    short: 'Heat map',
    fact: 'Surface temperature over each field — hot spots lose more water.',
  },
  rainfall: {
    id: 'rainfall',
    label: '10-year rainfall history',
    short: 'Rain history',
    fact: 'Monthly rainfall totals for the last 10 monsoon seasons.',
  },
  canopy: {
    id: 'canopy',
    label: 'Crop canopy coverage %',
    short: 'Canopy cover',
    fact: 'Percentage of ground covered by crop leaves — more cover slows evaporation.',
  },
  farmerName: {
    id: 'farmerName',
    label: 'Farmer names & family',
    short: 'Farmer names',
    fact: 'A list of each farmer’s full name and how many people live on the farm.',
  },
  cropVariety: {
    id: 'cropVariety',
    label: 'Seed variety names',
    short: 'Seed names',
    fact: 'Brand and cultivar names of the seeds planted — e.g. “Sonalika Wheat”.',
  },
  birdCount: {
    id: 'birdCount',
    label: 'Bird migration count',
    short: 'Bird count',
    fact: 'Number of migratory birds spotted per farm during last winter survey.',
  },
  tractorModel: {
    id: 'tractorModel',
    label: 'Tractor models owned',
    short: 'Tractors',
    fact: 'Make and model of each tractor on the farm — e.g. “Mahindra 575 DI”.',
  },
  soilPh: {
    id: 'soilPh',
    label: 'Soil pH / acidity',
    short: 'Soil pH',
    fact: 'Acidity or alkalinity of the soil — matters for fertilizer, not water.',
  },
  windSpeed: {
    id: 'windSpeed',
    label: 'Average wind speed',
    short: 'Wind speed',
    fact: 'Daily average wind speed — affects crop pollination, not water stress directly.',
  },
  pesticideBrand: {
    id: 'pesticideBrand',
    label: 'Pesticide brand list',
    short: 'Pesticides',
    fact: 'Brands of pest sprays used last season — pest management data.',
  },
}

export const TILE_IDS: TileId[] = Object.keys(TILES) as TileId[]

export const SATELLITE_NEEDED: TileId[] = [
  'ndvi',
  'soilMoisture',
  'temperature',
  'rainfall',
  'canopy',
]

export const SATELLITE_DECOY: TileId[] = [
  'farmerName',
  'cropVariety',
  'birdCount',
  'tractorModel',
  'soilPh',
  'windSpeed',
  'pesticideBrand',
]

export function tileKind(id: TileId): TileKind {
  if (SATELLITE_NEEDED.includes(id)) return 'needed'
  return 'decoy'
}
