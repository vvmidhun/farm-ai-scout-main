function img(prompt: string, size: 'square_hd' | 'square' | 'portrait_4_3' | 'portrait_16_9' | 'landscape_4_3' | 'landscape_16_9' = 'landscape_16_9'): string {
  const encoded = encodeURIComponent(prompt)
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encoded}&image_size=${size}`
}

const bgHome = img('Cartoon illustration sunny farm landscape background, green fields, blue sky, dry drought patches visible in distance, children book style, warm colours, no text', 'landscape_16_9')
const bgSatellite = img('Cartoon satellite control room background, dark blue monitors showing farm data scans, glowing screens, radar grid, children book illustration, no text', 'landscape_16_9')
const bgPattern = img('Cartoon weather station office background, charts on wall, clipboards with bar graphs, water level meters, children book style warm colours, no text', 'landscape_16_9')
const bgDecompose = img('Cartoon farm sorting barn background, three wooden buckets labelled small medium large, sunny farm yard, children book illustration, no text', 'landscape_16_9')
const bgAlgorithm = img('Cartoon engineers notebook background, recipe cards, flow chart arrows, whiteboard with numbered steps, kids education style, no text', 'landscape_16_9')
const bgPrediction = img('Cartoon district farm map background, aerial view, 6 farm plots highlighted, dry vs green patches, emergency alert icons, children book style, no text', 'landscape_16_9')
const bgBadge = img('Cartoon harvest festival celebration background, golden sunset, bales of hay, ribbons, confetti, farmers cheering, children book illustration, no text', 'landscape_16_9')

const coachIdle = img('Cute cartoon farmer robot coach character with friendly smile, wearing green baseball cap, holding wheat stalk, big round eyes, white background, children book illustration style', 'square')
const coachCheer = img('Cute cartoon farmer robot coach character cheering, both arms raised in celebration, huge smile, wearing green cap, sparkles around, white background, kids style', 'square')
const coachOops = img('Cute cartoon farmer robot coach character with worried oops expression, one hand on head, sweat drop, apologetic smile, wearing green cap, white background, childrens book', 'square')
const coachWow = img('Cute cartoon farmer robot coach character amazed wow face, star eyes, mouth open in excitement, holding clipboard, green cap, white background, cartoon kids style', 'square')

const tileNdvi = img('Cartoon tile card icon, NDVI vegetation health map, green gradient satellite scan of plants, square border, no text, education style', 'square')
const tileSoilMoisture = img('Cartoon tile card icon, soil moisture meter, brown soil with blue water drops, measuring gauge, square border, no text, kids education style', 'square')
const tileTemperature = img('Cartoon tile card icon, land surface temperature heat map, red orange yellow gradient, thermometer icon, square border, no text', 'square')
const tileRainfall = img('Cartoon tile card icon, 10 year rainfall history bar chart, blue bars on graph, dark blue raindrop, square border, no text', 'square')
const tileCanopy = img('Cartoon tile card icon, crop canopy coverage percentage, green tree leaves viewed from above, percentage meter, square border, no text', 'square')
const tileFarmerName = img('Cartoon tile card icon, list of farmer names and family, paper document with names, family photo frame, square border, no text', 'square')
const tileCropVariety = img('Cartoon tile card icon, seed packets with different variety names, colourful seed bags, wheat rice cotton pictures, square border, no text', 'square')
const tileBirdCount = img('Cartoon tile card icon, bird migration count, flock of birds flying, binoculars, tally marks on paper, square border, no text', 'square')
const tileTractorModel = img('Cartoon tile card icon, different tractor models, red blue green farm tractors, technical booklet, square border, no text', 'square')
const tileSoilPh = img('Cartoon tile card icon, soil pH acidity test kit, litmus paper strips, purple pink orange colours, beaker, square border, no text', 'square')
const tileWindSpeed = img('Cartoon tile card icon, average wind speed, anemometer weather vane, blowing wind lines, square border, no text', 'square')
const tilePesticideBrand = img('Cartoon tile card icon, pesticide brand bottles and spray cans, colourful product labels, agriculture chemicals, square border, no text', 'square')

const farmSunrise = img('Cartoon farm icon Sunrise Fields, golden wheat crops growing, sunrise over horizon, medium size farm layout, children book style white background', 'square')
const farmGreenfield = img('Cartoon farm icon Greenfield Acres, lush green rice paddy fields flooded with water, large farm, kids illustration style white background', 'square')
const farmRiverside = img('Cartoon farm icon Riverside Farm, sugarcane field along blue river, small family farm, cute illustration white background', 'square')
const farmMango = img('Cartoon farm icon Mango Grove, rows of mango trees heavy with orange fruit, large orchard farm, kids illustration white background', 'square')
const farmMustard = img('Cartoon farm icon Mustard Plot, bright yellow mustard flowers in small field, tiny farmhouse, children book style white background', 'square')
const farmCotton = img('Cartoon farm icon Cotton Belt, fluffy white cotton plants in medium size rows, bolls ready to harvest, kids style white background', 'square')

const bucketSmall = img('Cartoon wooden bucket icon labelled Small, tiny sapling painted on side, cute illustration, light brown wood, white background', 'square')
const bucketMedium = img('Cartoon wooden bucket icon labelled Medium, growing wheat stalk painted on side, medium size, light brown wood, white background', 'square')
const bucketLarge = img('Cartoon wooden bucket icon labelled Large, big tree painted on side, extra large size bucket, light brown wood, white background', 'square')

const districtMap = img('Aerial cartoon district map of 500 farms, 6 highlighted farm plots with labels, drought brown patches and green healthy areas, roads and a small river, children book illustration style', 'landscape_4_3')
const badgeScout = img('Circular cartoon badge medal Farm AI Scout, centre green wheat sprout, satellite and water drops around edge, gold ribbon, childrens award style, white background', 'square')
const farmerThanks = img('Cute cartoon Indian farmer family smiling and waving thanks, holding harvested crop basket, wearing traditional clothes, happy tears, children book illustration white background', 'square')

export const SCENE_BG = {
  home: bgHome,
  satellite: bgSatellite,
  pattern: bgPattern,
  decompose: bgDecompose,
  algorithm: bgAlgorithm,
  prediction: bgPrediction,
  badge: bgBadge,
} as const

export type SceneName = keyof typeof SCENE_BG

export const COACH_ART = {
  idle: coachIdle,
  cheer: coachCheer,
  oops: coachOops,
  wow: coachWow,
} as const

export const TILE_ART = {
  ndvi: tileNdvi,
  soilMoisture: tileSoilMoisture,
  temperature: tileTemperature,
  rainfall: tileRainfall,
  canopy: tileCanopy,
  farmerName: tileFarmerName,
  cropVariety: tileCropVariety,
  birdCount: tileBirdCount,
  tractorModel: tileTractorModel,
  soilPh: tileSoilPh,
  windSpeed: tileWindSpeed,
  pesticideBrand: tilePesticideBrand,
} as const

export const FARM_ART = {
  sunrise: farmSunrise,
  greenfield: farmGreenfield,
  riverside: farmRiverside,
  mango: farmMango,
  mustard: farmMustard,
  cotton: farmCotton,
} as const

export const BUCKET_ART = {
  small: bucketSmall,
  medium: bucketMedium,
  large: bucketLarge,
} as const

export const DISTRICT_MAP = districtMap
export const BADGE_SCOUT = badgeScout
export const FARMER_THANKS = farmerThanks

export const HOME_PRELOAD_URLS = [bgHome, coachIdle]
export const PLAY_PRELOAD_URLS = [
  bgSatellite,
  bgPattern,
  bgDecompose,
  bgAlgorithm,
  bgPrediction,
  coachCheer,
  coachOops,
  coachWow,
  tileNdvi,
  tileSoilMoisture,
  tileTemperature,
  tileRainfall,
  tileCanopy,
  districtMap,
]

export const LATE_PRELOAD_URLS = [
  tileFarmerName,
  tileCropVariety,
  tileBirdCount,
  tileTractorModel,
  tileSoilPh,
  tileWindSpeed,
  tilePesticideBrand,
  farmSunrise,
  farmGreenfield,
  farmRiverside,
  farmMango,
  farmMustard,
  farmCotton,
  bucketSmall,
  bucketMedium,
  bucketLarge,
  bgBadge,
  badgeScout,
  farmerThanks,
]
