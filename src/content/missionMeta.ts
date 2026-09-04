export const MISSION_META = {
  grade: 'Grade 5',
  textbook: 'Computational Thinking for Agriculture',
  chapter: 'Smart Farming — AI for Drought Resilience',
  mission: 'Farm AI Scout',
  role: 'Junior Agricultural AI Engineer',
  title: 'Farm AI Scout',
  subtitle: 'Use all 4 CT pillars to save the harvest from drought',
  intro:
    'You are a junior agricultural AI engineer! A district of 500 farms is facing drought conditions. Your AI system must: analyse satellite data (abstraction), find the water stress pattern (pattern recognition), decompose the irrigation problem by farm size (decomposition) and design an efficient watering schedule algorithm (algorithm design). Save the harvest — all four CT pillars required!',
  howToPlay: [
    {
      emoji: '🛰️',
      title: 'Satellite data picker',
      body: '12 satellite data layers come in. Drag each to KEEP (drought-related) or PEEL (not relevant).',
    },
    {
      emoji: '📊',
      title: 'Spot the trend',
      body: 'Look at 10 years of water bars for each farm. Stamp each as worsening, stable, or improving.',
    },
    {
      emoji: '🧩',
      title: 'Split by size',
      body: 'Break the big irrigation problem into 3 smaller buckets: small, medium, and large farms.',
    },
    {
      emoji: '📋',
      title: 'Build the algorithm',
      body: 'Arrange 7 watering steps in the correct order — a recipe any engineer can repeat.',
    },
    {
      emoji: '🎯',
      title: 'Save the harvest',
      body: 'Pick the TOP 3 farms needing emergency water first — use everything you learned!',
    },
  ],
  ctPillars: [
    {
      key: 'abstraction',
      name: 'Abstraction',
      phase: 'satellite' as const,
      emoji: '🛰️',
      summary: 'Keep only the satellite data that matters for drought.',
    },
    {
      key: 'pattern',
      name: 'Pattern Recognition',
      phase: 'pattern' as const,
      emoji: '📊',
      summary: 'Find water stress trends in 10 years of farm data.',
    },
    {
      key: 'decomposition',
      name: 'Decomposition',
      phase: 'decompose' as const,
      emoji: '🧩',
      summary: 'Break irrigation problem by farm size: small / medium / large.',
    },
    {
      key: 'algorithm',
      name: 'Algorithm Design',
      phase: 'algorithm' as const,
      emoji: '📋',
      summary: 'Order the steps to build a repeatable watering recipe.',
    },
  ],
} as const

export const BRIEFING_STEPS = [
  { emoji: '🛰️', title: 'Abstraction', body: '12 satellite layers → keep only 5 that measure drought.' },
  { emoji: '📊', title: 'Patterns', body: '10-year strips for 6 farms → stamp worsening / stable / improving.' },
  { emoji: '🧩', title: 'Decompose', body: 'Sort 6 farms by size: small, medium, or large.' },
  { emoji: '📋', title: 'Algorithm', body: 'Order 7 watering steps into a correct recipe.' },
  { emoji: '🎯', title: 'Predict', body: 'Pick the top 3 farms needing emergency water first.' },
]

export const SATELLITE_MCQ = {
  prompt: 'Why was farmer name data NOT kept for the drought map?',
  choices: [
    'Names are never useful in any map',
    'Names are not relevant for THIS drought-detection purpose',
    'Only government data is allowed',
  ],
  correct: 1 as 0 | 1 | 2,
}

export const PATTERN_MCQ = {
  prompt: 'Why split the rain strip into a first half and second half?',
  choices: [
    'To make the strip look shorter',
    'To compare two time periods and spot a TREND',
    'Because 10 bars is too many to look at',
  ],
  correct: 1 as 0 | 1 | 2,
}

export const DECOMPOSE_MCQ = {
  prompt: 'Why is “solve by farm size” better than “solve all farms together”?',
  choices: [
    'Small, medium and large have different needs — split it = easier to solve',
    'Large farms always get priority anyway',
    'It actually makes it harder, but we have to fill time',
  ],
  correct: 0 as 0 | 1 | 2,
}

export const ALGORITHM_MCQ = {
  prompt: 'What makes an “algorithm” different from a list of ideas?',
  choices: [
    'An algorithm is in the exact right ORDER so anyone can repeat it',
    'Algorithms are written on computers, ideas are on paper',
    'An algorithm must have 7 steps exactly',
  ],
  correct: 0 as 0 | 1 | 2,
}

export const REFLECT_QUESTIONS = [
  '1. Think of your school timetable. Is it an algorithm? Why or why not?',
  '2. When you pack your school bag, what details do you ABSTRACT away and ignore?',
  '3. If you had to split “make dinner” into 3 smaller problems, what would they be?',
  '4. What pattern do you see in your own exam marks across a term?',
]
