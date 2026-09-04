export const SPEECH = {
  home: "Hi, I'm Sprout — your Farm AI coach. Ready to save 500 farms from drought?",
  homeHook: "Drought is coming — but we can outsmart it with 4 Computational Thinking superpowers.",
  briefing: "Here's the mission: 4 steps to save the harvest. Each step uses a different CT skill.",
  satellite: 'Abstraction step: The satellite sent 12 data layers. Keep ONLY the 5 that tell us about drought. Peel off the rest.',
  satelliteAsk: 'Would this data layer help spot DROUGHT on a farm?',
  satelliteHint: 'Read each data tile. If it’s about water, plants, or heat — keep it. If it’s about names, tools, or birds — peel it.',
  satelliteDone: 'Nice! You kept the 5 layers that actually measure drought. Ignored 7 that don’t matter for THIS job.',
  patternIntro: 'Pattern recognition step: 6 farms need a trend stamp. Look at the 10-year water strip for each one.',
  pattern: 'Watch the water bars. Is stress getting WORSE, STAYING THE SAME, or GETTING BETTER?',
  patternHint: 'Split the strip: compare first 5 bars to last 5 bars. Going down = worsening.',
  patternAllSolved: 'All farms stamped! Now let’s break the problem into smaller pieces.',
  decomposeIntro: 'Decomposition step: A big irrigation problem is hard to solve at once. Split the farms by SIZE first.',
  decompose: 'Drag each farm into the correct size bucket: Small, Medium, or Large.',
  decomposeHint: 'Small farms need water first — they run out fastest. Large farms can wait a bit.',
  decomposeDone: 'Perfect decomposition! By splitting the problem into 3 sizes, each bucket becomes easy to handle.',
  algorithmIntro: 'Algorithm design step: Arrange the 7 watering steps in the correct order to make a repeatable recipe.',
  algorithm: 'Drag steps up or down until they are in the right sequence. A good algorithm is always in order.',
  algorithmHint: 'First you RANK and GROUP, then you ALLOCATE from small to large, then you SCHEDULE and VERIFY.',
  algorithmDone: 'Beautiful algorithm! Any district engineer can now follow this exact recipe.',
  predictionIntro: 'Final mission: Pick the TOP 3 farms that need EMERGENCY water right now.',
  prediction: 'Use all 4 CT steps you learned. Which 3 farms are most likely to fail first?',
  predictionHint: 'Look for: worsening trend + small size = highest priority.',
  resultOk: 'Incredible prediction! Your top 3 are exactly the farms that were in deepest trouble. Farmers thank you!',
  resultMiss: 'Great try — but the top 3 were different. The worst combination is worsening stress + small size.',
  badge: 'You earned the Farm AI Scout Badge! All 4 CT pillars mastered.',
  reflect: 'Take a moment to think: When have YOU used Abstraction, Pattern-finding, Decomposition, or Step-by-step planning in real life?',
  sortOk: 'Right! That bucket is correct.',
  sortWrong: 'Hmm — double check the trend. Compare first half vs. second half.',
  sortDone: 'Training complete! You know how to read a trend strip.',
  mcqYes: 'That’s exactly the idea!',
  mcqRetry: 'Try again — think about purpose and abstraction.',
  compare: 'Look at that! You used all 4 CT pillars together — that’s how real AI systems work.',
}

export const SORT_LABEL = {
  worsening: '🔻 Worsening',
  stable: '➡️ Stable',
  improving: '🔺 Improving',
}

export const BUCKET_LABEL = {
  small: '🌱 Small farms (<2 acres)',
  medium: '🌾 Medium farms (2–10 acres)',
  large: '🌳 Large farms (>10 acres)',
}

export const TREND_HINT = {
  worsening: 'Look: bars go DOWN. First half is much wetter than second half.',
  stable: 'Look: bars stay in the same range, no steady trend.',
  improving: 'Look: bars go UP. Second half is much wetter than first half.',
}

export const SATELLITE_SHELF = 'Not relevant for drought detection'

export const FARM_STAMP_GOOD = (name: string) => `Trend stamped for ${name}.`
export const FARM_STAMP_BAD = (name: string) => `Hmm — try again on ${name}.`

export const PREDICTED_RIGHT = (n: number) => `You got ${n} out of 3 correct!`
