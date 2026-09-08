import bgHome from '../assets/bg-home.webp'
import bgSatellite from '../assets/bg-Satellite.webp'
import bgPattern from '../assets/bg-case.webp'
import bgDecompose from '../assets/bg-badge.webp'
import bgAlgorithm from '../assets/bg-Satellite.webp'
import bgPrediction from '../assets/bg-home.webp'
import bgBadge from '../assets/bg-badge.webp'

import coachIdle from '../assets/bot-idle.png'
import coachOops from '../assets/bot-idle.png'
import coachWow from '../assets/bot-idle.png'
import farmerThanks from '../assets/farmer-thanks.webp'

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const coachCheer = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#a8d8ff"/>
      <stop offset="100%" style="stop-color:#5b8def"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="82" fill="url(#bodyGrad)" stroke="#1e3a6e" stroke-width="6"/>
  <ellipse cx="68" cy="88" rx="16" ry="20" fill="white"/>
  <ellipse cx="132" cy="88" rx="16" ry="20" fill="white"/>
  <circle cx="70" cy="92" r="7" fill="#1e3a6e"/>
  <circle cx="134" cy="92" r="7" fill="#1e3a6e"/>
  <circle cx="72" cy="90" r="2.5" fill="white"/>
  <circle cx="136" cy="90" r="2.5" fill="white"/>
  <path d="M60 130 Q100 168 140 130" stroke="#1e3a6e" stroke-width="7" fill="none" stroke-linecap="round"/>
  <ellipse cx="70" cy="124" rx="10" ry="6" fill="#ffb3c1" opacity="0.7"/>
  <ellipse cx="130" cy="124" rx="10" ry="6" fill="#ffb3c1" opacity="0.7"/>
  <rect x="76" y="22" width="48" height="18" rx="9" fill="#6fb94d" stroke="#3d7a2f" stroke-width="3"/>
  <rect x="90" y="12" width="20" height="14" rx="7" fill="#6fb94d" stroke="#3d7a2f" stroke-width="3"/>
  <line x1="52" y1="154" x2="22" y2="118" stroke="#1e3a6e" stroke-width="9" stroke-linecap="round"/>
  <circle cx="20" cy="114" r="11" fill="#f0a020" stroke="#1e3a6e" stroke-width="4"/>
  <line x1="148" y1="154" x2="178" y2="118" stroke="#1e3a6e" stroke-width="9" stroke-linecap="round"/>
  <circle cx="180" cy="114" r="11" fill="#f0a020" stroke="#1e3a6e" stroke-width="4"/>
  <circle cx="40" cy="48" r="8" fill="#ffc24b" opacity="0.8"/>
  <circle cx="170" cy="58" r="6" fill="#34d399" opacity="0.8"/>
  <polygon points="160,36 164,48 176,48 166,56 170,68 160,60 150,68 154,56 144,48 156,48" fill="#f0a020"/>
</svg>`)

const tileNdvi = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#e8f8e0"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#6fb94d" stroke-width="4"/>
  <defs>
    <linearGradient id="ndvig" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#c8e6c9"/>
      <stop offset="40%" style="stop-color:#6fb94d"/>
      <stop offset="100%" style="stop-color:#3d7a2f"/>
    </linearGradient>
  </defs>
  <rect x="28" y="28" width="144" height="108" rx="8" fill="url(#ndvig)"/>
  <circle cx="56" cy="56" r="10" fill="#c8e6c9"/>
  <circle cx="110" cy="74" r="14" fill="#81c784"/>
  <circle cx="150" cy="52" r="8" fill="#c8e6c9"/>
  <circle cx="78" cy="108" r="12" fill="#3d7a2f"/>
  <circle cx="138" cy="116" r="10" fill="#6fb94d"/>
  <rect x="28" y="148" width="144" height="32" rx="6" fill="#fff6e8" stroke="#f0a020" stroke-width="2"/>
  <text x="100" y="170" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="16" font-weight="800" fill="#1e3a6e">NDVI</text>
</svg>`)

const tileSoilMoisture = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#eaf4ff"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#8b5a2b" stroke-width="4"/>
  <rect x="30" y="32" width="140" height="118" rx="8" fill="#c8a97e"/>
  <rect x="30" y="32" width="140" height="54" rx="8" fill="#8b5a2b"/>
  <circle cx="52" cy="112" r="10" fill="#5b8def" opacity="0.85"/>
  <circle cx="88" cy="132" r="8" fill="#5b8def" opacity="0.7"/>
  <circle cx="130" cy="108" r="12" fill="#5b8def" opacity="0.9"/>
  <circle cx="160" cy="128" r="7" fill="#5b8def" opacity="0.65"/>
  <path d="M100 154 L92 170 L108 170 Z" fill="#ef6461"/>
  <rect x="82" y="50" width="36" height="74" rx="6" fill="white" stroke="#1e3a6e" stroke-width="3"/>
  <rect x="86" y="110" width="28" height="10" rx="3" fill="#34d399"/>
  <text x="100" y="186" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="13" font-weight="800" fill="#8b5a2b">SOIL</text>
</svg>`)

const tileTemperature = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#fff0e0"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#ef6461" stroke-width="4"/>
  <defs>
    <linearGradient id="heatg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffc24b"/>
      <stop offset="50%" style="stop-color:#f0a020"/>
      <stop offset="100%" style="stop-color:#ef6461"/>
    </linearGradient>
  </defs>
  <rect x="28" y="32" width="144" height="92" rx="8" fill="url(#heatg)"/>
  <circle cx="56" cy="56" r="8" fill="#fff6e8" opacity="0.7"/>
  <circle cx="150" cy="108" r="10" fill="#ef6461" opacity="0.8"/>
  <g transform="translate(86,54)">
    <rect x="0" y="10" width="28" height="74" rx="14" fill="white" stroke="#1e3a6e" stroke-width="3"/>
    <circle cx="14" cy="84" r="16" fill="#ef6461" stroke="#1e3a6e" stroke-width="3"/>
    <rect x="7" y="32" width="14" height="48" rx="7" fill="#ef6461"/>
  </g>
  <text x="100" y="176" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="15" font-weight="800" fill="#ef6461">HEAT</text>
</svg>`)

const tileRainfall = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#e0f0ff"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#5b8def" stroke-width="4"/>
  <rect x="28" y="32" width="144" height="104" rx="8" fill="#f0f8ff"/>
  <line x1="42" y1="136" x2="42" y2="64" stroke="#5b8def" stroke-width="10" rx="4"/>
  <line x1="66" y1="136" x2="66" y2="78" stroke="#5b8def" stroke-width="10" rx="4"/>
  <line x1="90" y1="136" x2="90" y2="50" stroke="#5b8def" stroke-width="10" rx="4"/>
  <line x1="114" y1="136" x2="114" y2="86" stroke="#5b8def" stroke-width="10" rx="4"/>
  <line x1="138" y1="136" x2="138" y2="44" stroke="#5b8def" stroke-width="10" rx="4"/>
  <line x1="162" y1="136" x2="162" y2="72" stroke="#5b8def" stroke-width="10" rx="4"/>
  <line x1="34" y1="136" x2="170" y2="136" stroke="#1e3a6e" stroke-width="3"/>
  <path d="M54 158 L48 172 L58 172 Z" fill="#5b8def"/>
  <path d="M90 158 L84 172 L94 172 Z" fill="#5b8def" opacity="0.75"/>
  <path d="M130 158 L124 172 L134 172 Z" fill="#5b8def" opacity="0.85"/>
  <text x="100" y="188" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="13" font-weight="800" fill="#5b8def">RAIN</text>
</svg>`)

const tileCanopy = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#e8f8e0"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#3d7a2f" stroke-width="4"/>
  <rect x="28" y="28" width="144" height="116" rx="8" fill="#c8e6c9"/>
  <circle cx="54" cy="58" r="20" fill="#3d7a2f"/>
  <circle cx="84" cy="48" r="18" fill="#6fb94d"/>
  <circle cx="120" cy="60" r="22" fill="#3d7a2f"/>
  <circle cx="154" cy="52" r="16" fill="#6fb94d"/>
  <circle cx="44" cy="96" r="18" fill="#6fb94d"/>
  <circle cx="82" cy="110" r="22" fill="#3d7a2f"/>
  <circle cx="126" cy="104" r="18" fill="#6fb94d"/>
  <circle cx="162" cy="116" r="14" fill="#3d7a2f"/>
  <rect x="28" y="156" width="144" height="20" rx="6" fill="#fff6e8" stroke="#f0a020" stroke-width="2"/>
  <rect x="34" y="160" width="104" height="12" rx="4" fill="#6fb94d"/>
  <text x="144" y="171" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="11" font-weight="800" fill="#1e3a6e">78%</text>
</svg>`)

const tileFarmerName = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#fff6e8"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#8b5a2b" stroke-width="4"/>
  <rect x="30" y="32" width="140" height="112" rx="6" fill="#fffdf6"/>
  <line x1="40" y1="56" x2="160" y2="56" stroke="#1e3a6e" stroke-width="2" stroke-dasharray="4,3"/>
  <circle cx="50" cy="78" r="12" fill="#f0a020"/>
  <rect x="74" y="70" width="70" height="10" rx="4" fill="#1e3a6e" opacity="0.7"/>
  <circle cx="50" cy="108" r="12" fill="#cfe8ff"/>
  <rect x="74" y="100" width="92" height="10" rx="4" fill="#1e3a6e" opacity="0.6"/>
  <circle cx="50" cy="136" r="12" fill="#ffc24b"/>
  <rect x="74" y="128" width="58" height="10" rx="4" fill="#1e3a6e" opacity="0.55"/>
  <rect x="30" y="156" width="140" height="22" rx="6" fill="#fff6e8" stroke="#8b5a2b" stroke-width="2"/>
  <text x="100" y="172" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="12" font-weight="800" fill="#8b5a2b">👨‍🌾 NAMES</text>
</svg>`)

const tileCropVariety = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#fff0e0"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#f0a020" stroke-width="4"/>
  <rect x="28" y="30" width="56" height="108" rx="6" fill="#fff6e8" stroke="#f0a020" stroke-width="2"/>
  <rect x="36" y="38" width="40" height="12" rx="3" fill="#f0a020"/>
  <text x="56" y="48" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="8" font-weight="800" fill="white">WHEAT</text>
  <path d="M48 68 Q56 78 48 92 Q40 78 48 68 Z" fill="#ffc24b"/>
  <rect x="94" y="30" width="56" height="108" rx="6" fill="#e8f8e0" stroke="#6fb94d" stroke-width="2"/>
  <rect x="102" y="38" width="40" height="12" rx="3" fill="#6fb94d"/>
  <text x="122" y="48" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="8" font-weight="800" fill="white">RICE</text>
  <path d="M114 64 Q130 74 114 86 Q98 74 114 64 Z" fill="#cfe8ff"/>
  <path d="M114 88 Q130 98 114 110 Q98 98 114 88 Z" fill="#cfe8ff"/>
  <path d="M48 100 Q56 112 48 126 Q40 112 48 100 Z" fill="#ffc24b"/>
  <text x="100" y="176" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="13" font-weight="800" fill="#f0a020">🌾 SEEDS</text>
</svg>`)

const tileBirdCount = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#eaf6ff"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#5b8def" stroke-width="4"/>
  <circle cx="56" cy="50" r="10" fill="#1e3a6e"/>
  <path d="M46 50 Q40 42 52 44 Z" fill="#1e3a6e"/>
  <circle cx="58" cy="48" r="2.5" fill="white"/>
  <circle cx="104" cy="70" r="12" fill="#f0a020"/>
  <path d="M92 70 Q82 60 98 62 Z" fill="#f0a020"/>
  <circle cx="107" cy="68" r="3" fill="white"/>
  <circle cx="150" cy="46" r="9" fill="#6fb94d"/>
  <path d="M141 46 Q134 38 147 40 Z" fill="#6fb94d"/>
  <circle cx="80" cy="106" r="11" fill="#ef6461"/>
  <path d="M69 106 Q60 98 74 100 Z" fill="#ef6461"/>
  <circle cx="134" cy="118" r="10" fill="#5b8def"/>
  <path d="M124 118 Q116 110 129 112 Z" fill="#5b8def"/>
  <g transform="translate(44,142)">
    <rect x="0" y="0" width="36" height="20" rx="4" fill="#1e3a6e"/>
    <circle cx="6" cy="22" r="6" fill="#1e3a6e"/>
    <rect x="0" y="6" width="28" height="3" rx="1.5" fill="#f0a020" transform="rotate(-20,14,7.5)"/>
  </g>
  <text x="100" y="186" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="13" font-weight="800" fill="#1e3a6e">🐦 BIRDS</text>
</svg>`)

const tileTractorModel = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#fff6e8"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#ef6461" stroke-width="4"/>
  <g transform="translate(26,56)">
    <circle cx="28" cy="84" r="22" fill="#1e3a6e"/>
    <circle cx="28" cy="84" r="12" fill="#ffc24b"/>
    <circle cx="102" cy="84" r="16" fill="#1e3a6e"/>
    <circle cx="102" cy="84" r="9" fill="#ffc24b"/>
    <rect x="14" y="24" width="66" height="46" rx="6" fill="#ef6461" stroke="#1e3a6e" stroke-width="3"/>
    <rect x="30" y="36" width="32" height="22" rx="3" fill="#cfe8ff" stroke="#1e3a6e" stroke-width="2"/>
    <rect x="80" y="30" width="38" height="26" rx="4" fill="#ef6461" stroke="#1e3a6e" stroke-width="3"/>
    <rect x="86" y="56" width="30" height="14" rx="3" fill="#1e3a6e"/>
  </g>
  <rect x="30" y="154" width="140" height="22" rx="6" fill="#fff6e8" stroke="#8b5a2b" stroke-width="2"/>
  <text x="100" y="170" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="12" font-weight="800" fill="#ef6461">🚜 575 DI</text>
</svg>`)

const tileSoilPh = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#f0e8ff"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#a855f7" stroke-width="4"/>
  <rect x="30" y="32" width="140" height="100" rx="6" fill="#fffdf6"/>
  <rect x="42" y="44" width="18" height="60" rx="6" fill="#ff6b9d"/>
  <rect x="64" y="50" width="18" height="54" rx="6" fill="#a855f7"/>
  <rect x="86" y="60" width="18" height="44" rx="6" fill="#5b8def"/>
  <rect x="108" y="52" width="18" height="52" rx="6" fill="#34d399"/>
  <rect x="130" y="40" width="18" height="64" rx="6" fill="#ffc24b"/>
  <g transform="translate(80,108)">
    <path d="M20 0 L24 14 L40 14 L27 22 L32 36 L20 28 L8 36 L13 22 L0 14 L16 14 Z" fill="#ffc24b" stroke="#1e3a6e" stroke-width="1.5"/>
  </g>
  <rect x="30" y="152" width="140" height="24" rx="6" fill="url(#phg)"/>
  <defs>
    <linearGradient id="phg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff6b9d"/>
      <stop offset="50%" style="stop-color:#34d399"/>
      <stop offset="100%" style="stop-color:#5b8def"/>
    </linearGradient>
  </defs>
  <text x="100" y="168" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="11" font-weight="800" fill="white">pH 0 — 7 — 14</text>
</svg>`)

const tileWindSpeed = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#eaf6ff"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#5b8def" stroke-width="4"/>
  <g transform="translate(100,88)">
    <circle cx="0" cy="0" r="14" fill="#1e3a6e"/>
    <rect x="-4" y="-50" width="8" height="36" rx="4" fill="#f0a020" stroke="#1e3a6e" stroke-width="2"/>
    <path d="M0 -50 L20 -34 L0 -28 Z" fill="#ef6461" stroke="#1e3a6e" stroke-width="2"/>
    <rect x="-4" y="14" width="8" height="36" rx="4" fill="#6fb94d" stroke="#1e3a6e" stroke-width="2"/>
    <path d="M0 50 L-20 34 L0 28 Z" fill="#34d399" stroke="#1e3a6e" stroke-width="2"/>
  </g>
  <path d="M20 60 Q50 48 70 60 Q82 68 94 58" stroke="#5b8def" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M30 110 Q60 98 86 110 Q104 122 130 106" stroke="#5b8def" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M46 150 Q78 138 110 150 Q128 160 154 146" stroke="#5b8def" stroke-width="5" fill="none" stroke-linecap="round"/>
  <text x="100" y="186" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="13" font-weight="800" fill="#5b8def">💨 WIND</text>
</svg>`)

const tilePesticideBrand = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#fff0e0"/>
  <rect x="12" y="12" width="176" height="176" rx="14" fill="white" stroke="#34d399" stroke-width="4"/>
  <g transform="translate(38,38)">
    <rect x="0" y="14" width="50" height="96" rx="6" fill="#ef6461" stroke="#1e3a6e" stroke-width="3"/>
    <rect x="10" y="0" width="30" height="18" rx="4" fill="#1e3a6e"/>
    <rect x="4" y="36" width="42" height="36" rx="3" fill="white"/>
    <text x="25" y="58" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="10" font-weight="800" fill="#ef6461">BUG</text>
    <text x="25" y="70" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="10" font-weight="800" fill="#ef6461">OFF</text>
  </g>
  <g transform="translate(104,48)">
    <rect x="0" y="10" width="46" height="88" rx="6" fill="#34d399" stroke="#1e3a6e" stroke-width="3"/>
    <path d="M4 10 L42 10 L46 0 L0 0 Z" fill="#1e3a6e"/>
    <rect x="4" y="32" width="38" height="32" rx="2" fill="white"/>
    <text x="23" y="52" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="9" font-weight="800" fill="#3d7a2f">CROP</text>
    <text x="23" y="63" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="9" font-weight="800" fill="#3d7a2f">SAFE</text>
  </g>
  <text x="100" y="182" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="12" font-weight="800" fill="#3d7a2f">🧴 SPRAYS</text>
</svg>`)

const farmSunrise = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="skySr" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffd4a8"/>
      <stop offset="60%" style="stop-color:#ffe8c2"/>
      <stop offset="100%" style="stop-color:#c8e6c9"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#skySr)"/>
  <circle cx="100" cy="82" r="38" fill="#ffc24b" opacity="0.9"/>
  <circle cx="100" cy="82" r="28" fill="#ffd4a8"/>
  <rect x="0" y="120" width="200" height="80" fill="#c8e6c9"/>
  <rect x="18" y="104" width="24" height="56" fill="#ffc24b" opacity="0.85"/>
  <rect x="58" y="96" width="24" height="64" fill="#f0a020" opacity="0.85"/>
  <rect x="98" y="100" width="24" height="60" fill="#ffc24b" opacity="0.85"/>
  <rect x="138" y="108" width="24" height="52" fill="#f0a020" opacity="0.85"/>
  <rect x="156" y="102" width="24" height="58" fill="#ffc24b" opacity="0.85"/>
  <rect x="6" y="164" width="44" height="18" rx="4" fill="#8b5a2b"/>
  <polygon points="6,164 28,148 50,164" fill="#a0522d"/>
  <rect x="16" y="172" width="14" height="10" fill="#5b8def"/>
</svg>`)

const farmGreenfield = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="skyGf" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#cfe8ff"/>
      <stop offset="100%" style="stop-color:#6fb94d"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#skyGf)"/>
  <ellipse cx="100" cy="140" rx="100" ry="80" fill="#6fb94d"/>
  <rect x="0" y="96" width="200" height="10" fill="#5b8def" opacity="0.7"/>
  <rect x="0" y="112" width="200" height="6" fill="#5b8def" opacity="0.5"/>
  <ellipse cx="40" cy="148" rx="22" ry="10" fill="#3d7a2f" opacity="0.3"/>
  <ellipse cx="110" cy="158" rx="28" ry="12" fill="#3d7a2f" opacity="0.3"/>
  <ellipse cx="170" cy="144" rx="22" ry="9" fill="#3d7a2f" opacity="0.3"/>
  <ellipse cx="76" cy="172" rx="24" ry="10" fill="#3d7a2f" opacity="0.3"/>
  <ellipse cx="148" cy="180" rx="22" ry="9" fill="#3d7a2f" opacity="0.3"/>
  <rect x="20" y="150" width="28" height="10" fill="#8b5a2b" opacity="0.6"/>
  <polygon points="20,150 34,138 48,150" fill="#a0522d" opacity="0.6"/>
</svg>`)

const farmRiverside = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="skyRv" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#cfe8ff"/>
      <stop offset="100%" style="stop-color:#fff6e8"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#skyRv)"/>
  <path d="M0 70 Q60 52 120 74 Q170 90 200 80 L200 130 Q160 144 100 122 Q40 102 0 124 Z" fill="#5b8def" opacity="0.8"/>
  <rect x="0" y="124" width="200" height="76" fill="#c8e6c9"/>
  <g>
    <rect x="108" y="100" width="14" height="70" fill="#6fb94d" opacity="0.85"/>
    <ellipse cx="115" cy="100" rx="22" ry="14" fill="#6fb94d" opacity="0.9"/>
  </g>
  <g>
    <rect x="138" y="110" width="12" height="60" fill="#6fb94d" opacity="0.85"/>
    <ellipse cx="144" cy="110" rx="20" ry="12" fill="#6fb94d" opacity="0.9"/>
  </g>
  <g>
    <rect x="74" y="106" width="12" height="64" fill="#6fb94d" opacity="0.85"/>
    <ellipse cx="80" cy="106" rx="18" ry="11" fill="#6fb94d" opacity="0.9"/>
  </g>
  <rect x="18" y="160" width="36" height="20" rx="3" fill="#8b5a2b"/>
  <polygon points="18,160 36,144 54,160" fill="#a0522d"/>
</svg>`)

const farmMango = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="skyMg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffe8c2"/>
      <stop offset="100%" style="stop-color:#c8e6c9"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#skyMg)"/>
  <rect x="0" y="130" width="200" height="70" fill="#c8e6c9"/>
  <g>
    <rect x="30" y="90" width="16" height="64" fill="#8b5a2b"/>
    <ellipse cx="38" cy="80" rx="36" ry="24" fill="#6fb94d"/>
    <ellipse cx="28" cy="68" rx="22" ry="16" fill="#6fb94d"/>
    <ellipse cx="50" cy="68" rx="22" ry="16" fill="#6fb94d"/>
    <ellipse cx="24" cy="100" rx="8" ry="5" fill="#ffc24b" transform="rotate(-20,24,100)"/>
    <ellipse cx="54" cy="94" rx="8" ry="5" fill="#f0a020" transform="rotate(15,54,94)"/>
  </g>
  <g>
    <rect x="120" y="82" width="18" height="72" fill="#8b5a2b"/>
    <ellipse cx="129" cy="70" rx="40" ry="26" fill="#6fb94d"/>
    <ellipse cx="116" cy="58" rx="24" ry="18" fill="#6fb94d"/>
    <ellipse cx="146" cy="58" rx="24" ry="18" fill="#6fb94d"/>
    <ellipse cx="114" cy="90" rx="9" ry="6" fill="#ffc24b" transform="rotate(-15,114,90)"/>
    <ellipse cx="148" cy="84" rx="9" ry="6" fill="#f0a020" transform="rotate(20,148,84)"/>
    <ellipse cx="132" cy="100" rx="8" ry="5" fill="#ffc24b"/>
  </g>
</svg>`)

const farmMustard = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="skyMu" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#cfe8ff"/>
      <stop offset="100%" style="stop-color:#ffc24b"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#skyMu)"/>
  <rect x="0" y="110" width="200" height="90" fill="#ffc24b" opacity="0.92"/>
  <g fill="#fff6e8" opacity="0.85">
    <circle cx="22" cy="130" r="6"/>
    <circle cx="46" cy="142" r="5"/>
    <circle cx="70" cy="128" r="6"/>
    <circle cx="96" cy="148" r="5"/>
    <circle cx="122" cy="132" r="6"/>
    <circle cx="148" cy="150" r="5"/>
    <circle cx="174" cy="134" r="6"/>
    <circle cx="34" cy="168" r="5"/>
    <circle cx="68" cy="178" r="6"/>
    <circle cx="108" cy="172" r="5"/>
    <circle cx="146" cy="184" r="6"/>
    <circle cx="180" cy="174" r="5"/>
  </g>
  <rect x="140" y="160" width="42" height="12" rx="3" fill="#a0522d" opacity="0.8"/>
  <polygon points="140,160 161,148 182,160" fill="#8b5a2b" opacity="0.8"/>
  <circle cx="44" cy="46" r="16" fill="#fff6e8" opacity="0.9"/>
</svg>`)

const farmCotton = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="skyCt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#e0f0ff"/>
      <stop offset="100%" style="stop-color:#c8e6c9"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#skyCt)"/>
  <rect x="0" y="120" width="200" height="80" fill="#6fb94d"/>
  <g>
    <rect x="14" y="88" width="6" height="54" fill="#3d7a2f"/>
    <circle cx="17" cy="86" r="11" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="11" cy="96" r="8" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="23" cy="98" r="8" fill="white" stroke="#e0e0e0" stroke-width="1"/>
  </g>
  <g>
    <rect x="48" y="84" width="6" height="58" fill="#3d7a2f"/>
    <circle cx="51" cy="82" r="12" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="44" cy="92" r="9" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="58" cy="94" r="9" fill="white" stroke="#e0e0e0" stroke-width="1"/>
  </g>
  <g>
    <rect x="82" y="90" width="6" height="52" fill="#3d7a2f"/>
    <circle cx="85" cy="88" r="11" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="78" cy="98" r="8" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="92" cy="100" r="8" fill="white" stroke="#e0e0e0" stroke-width="1"/>
  </g>
  <g>
    <rect x="116" y="80" width="6" height="62" fill="#3d7a2f"/>
    <circle cx="119" cy="78" r="13" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="111" cy="90" r="9" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="127" cy="92" r="9" fill="white" stroke="#e0e0e0" stroke-width="1"/>
  </g>
  <g>
    <rect x="150" y="88" width="6" height="54" fill="#3d7a2f"/>
    <circle cx="153" cy="86" r="11" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="146" cy="96" r="8" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="160" cy="98" r="8" fill="white" stroke="#e0e0e0" stroke-width="1"/>
  </g>
  <g>
    <rect x="180" y="86" width="6" height="56" fill="#3d7a2f"/>
    <circle cx="183" cy="84" r="12" fill="white" stroke="#e0e0e0" stroke-width="1"/>
    <circle cx="176" cy="94" r="9" fill="white" stroke="#e0e0e0" stroke-width="1"/>
  </g>
</svg>`)

const bucketSmall = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="woodS" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#d4a574"/>
      <stop offset="100%" style="stop-color:#8b5a2b"/>
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="50" rx="60" ry="16" fill="none" stroke="#8b5a2b" stroke-width="4"/>
  <path d="M40 50 L52 170 Q100 186 148 170 L160 50 Z" fill="url(#woodS)" stroke="#8b5a2b" stroke-width="4"/>
  <ellipse cx="100" cy="170" rx="48" ry="14" fill="#8b5a2b"/>
  <line x1="62" y1="78" x2="58" y2="168" stroke="#6b4423" stroke-width="3"/>
  <line x1="100" y1="60" x2="100" y2="174" stroke="#6b4423" stroke-width="3"/>
  <line x1="138" y1="78" x2="142" y2="168" stroke="#6b4423" stroke-width="3"/>
  <path d="M40 50 Q100 30 160 50" fill="none" stroke="#c8e6c9" stroke-width="6"/>
  <path d="M40 50 Q100 42 160 50" fill="none" stroke="#6fb94d" stroke-width="3"/>
  <g transform="translate(80,94)">
    <path d="M20 20 Q40 0 60 20 Q60 56 40 64 Q20 56 20 20 Z" fill="#6fb94d" stroke="#3d7a2f" stroke-width="2"/>
    <rect x="36" y="20" width="8" height="32" fill="#8b5a2b"/>
  </g>
  <text x="100" y="140" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="18" font-weight="800" fill="#6b4423">SMALL</text>
</svg>`)

const bucketMedium = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="woodM" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#d4a574"/>
      <stop offset="100%" style="stop-color:#8b5a2b"/>
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="44" rx="66" ry="18" fill="none" stroke="#8b5a2b" stroke-width="4"/>
  <path d="M34 44 L46 174 Q100 192 154 174 L166 44 Z" fill="url(#woodM)" stroke="#8b5a2b" stroke-width="4"/>
  <ellipse cx="100" cy="174" rx="54" ry="16" fill="#8b5a2b"/>
  <line x1="60" y1="74" x2="54" y2="172" stroke="#6b4423" stroke-width="3"/>
  <line x1="100" y1="54" x2="100" y2="180" stroke="#6b4423" stroke-width="3"/>
  <line x1="140" y1="74" x2="146" y2="172" stroke="#6b4423" stroke-width="3"/>
  <path d="M34 44 Q100 22 166 44" fill="none" stroke="#ffc24b" stroke-width="6"/>
  <path d="M34 44 Q100 36 166 44" fill="none" fill="none" stroke="#f0a020" stroke-width="3"/>
  <g transform="translate(72,86)">
    <path d="M8 40 L20 0 L32 40 L44 0 L56 40 L48 44 L40 20 L32 44 L24 20 L16 44 Z" fill="#f0a020" stroke="#b87a10" stroke-width="1.5"/>
  </g>
  <text x="100" y="142" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="18" font-weight="800" fill="#6b4423">MEDIUM</text>
</svg>`)

const bucketLarge = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="woodL" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#d4a574"/>
      <stop offset="100%" style="stop-color:#8b5a2b"/>
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="38" rx="72" ry="20" fill="none" stroke="#8b5a2b" stroke-width="4"/>
  <path d="M28 38 L42 180 Q100 200 158 180 L172 38 Z" fill="url(#woodL)" stroke="#8b5a2b" stroke-width="4"/>
  <ellipse cx="100" cy="180" rx="58" ry="18" fill="#8b5a2b"/>
  <line x1="56" y1="68" x2="50" y2="178" stroke="#6b4423" stroke-width="3"/>
  <line x1="100" y1="48" x2="100" y2="188" stroke="#6b4423" stroke-width="3"/>
  <line x1="144" y1="68" x2="150" y2="178" stroke="#6b4423" stroke-width="3"/>
  <path d="M28 38 Q100 14 172 38" fill="none" stroke="#a855f7" stroke-width="6"/>
  <path d="M28 38 Q100 28 172 38" fill="none" stroke="#7c3aed" stroke-width="3"/>
  <g transform="translate(62,78)">
    <rect x="34" y="8" width="8" height="60" fill="#8b5a2b"/>
    <circle cx="38" cy="10" r="22" fill="#6fb94d" stroke="#3d7a2f" stroke-width="2"/>
    <circle cx="22" cy="18" r="14" fill="#6fb94d"/>
    <circle cx="54" cy="18" r="14" fill="#6fb94d"/>
  </g>
  <text x="100" y="148" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="18" font-weight="800" fill="#6b4423">LARGE</text>
</svg>`)

const districtMap = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <linearGradient id="mapBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#cfe8ff"/>
      <stop offset="100%" style="stop-color:#d4a574"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#mapBg)"/>
  <path d="M0 200 Q100 180 200 210 Q300 240 400 200 L400 300 L0 300 Z" fill="#8b5a2b" opacity="0.3"/>
  <path d="M80 0 Q100 80 60 160 Q30 220 80 260" stroke="#5b8def" stroke-width="10" fill="none" opacity="0.7" stroke-linecap="round"/>
  <line x1="0" y1="150" x2="400" y2="130" stroke="#a0522d" stroke-width="4" stroke-dasharray="10,6"/>
  <line x1="200" y1="0" x2="220" y2="300" stroke="#a0522d" stroke-width="4" stroke-dasharray="10,6"/>
  <rect x="90" y="80" width="90" height="70" rx="6" fill="#d98a3a" stroke="#b87a10" stroke-width="3" opacity="0.85"/>
  <text x="135" y="120" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="14" font-weight="800" fill="#8b4513">SUNRISE</text>
  <rect x="200" y="50" width="120" height="90" rx="6" fill="#6fb94d" stroke="#3d7a2f" stroke-width="3" opacity="0.85"/>
  <text x="260" y="100" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="14" font-weight="800" fill="#1e5631">GREENFIELD</text>
  <rect x="40" y="180" width="80" height="60" rx="6" fill="#c8e6c9" stroke="#6fb94d" stroke-width="3" opacity="0.9"/>
  <text x="80" y="214" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="11" font-weight="800" fill="#3d7a2f">RIVERSIDE</text>
  <rect x="260" y="160" width="110" height="80" rx="6" fill="#ffe8c2" stroke="#f0a020" stroke-width="3" opacity="0.9"/>
  <text x="315" y="206" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="13" font-weight="800" fill="#b87a10">MANGO GROVE</text>
  <rect x="140" y="200" width="80" height="50" rx="6" fill="#ffc24b" stroke="#f0a020" stroke-width="3" opacity="0.9"/>
  <text x="180" y="230" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="11" font-weight="800" fill="#8b4513">MUSTARD</text>
  <rect x="240" y="240" width="100" height="48" rx="6" fill="#e0e0e0" stroke="#6b4423" stroke-width="3" opacity="0.9"/>
  <text x="290" y="268" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="11" font-weight="800" fill="#6b4423">COTTON</text>
  <polygon points="360,16 366,32 382,32 370,42 374,58 360,48 346,58 350,42 338,32 354,32" fill="#ef6461" stroke="#b91c1c" stroke-width="1.5"/>
  <text x="360" y="72" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="10" font-weight="800" fill="#b91c1c">DROUGHT!</text>
  <rect x="16" y="16" width="100" height="44" rx="6" fill="white" stroke="#1e3a6e" stroke-width="2"/>
  <text x="66" y="36" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="10" font-weight="800" fill="#1e3a6e">500 FARMS</text>
  <text x="66" y="50" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="9" font-weight="700" fill="#5b8def">DISTRICT MAP</text>
</svg>`)

const badgeScout = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="goldG" cx="50%" cy="40%" r="60%">
      <stop offset="0%" style="stop-color:#ffe08a"/>
      <stop offset="60%" style="stop-color:#ffc24b"/>
      <stop offset="100%" style="stop-color:#c97b00"/>
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="88" fill="url(#goldG)" stroke="#8b5a00" stroke-width="5"/>
  <circle cx="100" cy="100" r="72" fill="#fff6e8" stroke="#f0a020" stroke-width="3"/>
  <g transform="translate(72,50)">
    <circle cx="28" cy="62" r="18" fill="#34d399" stroke="#3d7a2f" stroke-width="2.5"/>
    <rect x="23" y="14" width="10" height="40" fill="#8b5a2b"/>
    <ellipse cx="28" cy="14" rx="28" ry="16" fill="#6fb94d" stroke="#3d7a2f" stroke-width="2.5"/>
    <ellipse cx="14" cy="20" rx="14" ry="9" fill="#6fb94d"/>
    <ellipse cx="42" cy="20" rx="14" ry="9" fill="#6fb94d"/>
  </g>
  <g transform="translate(26,52)">
    <rect x="0" y="24" width="30" height="10" rx="4" fill="#5b8def" stroke="#1e3a6e" stroke-width="2"/>
    <path d="M0 24 L15 10 L30 24 Z" fill="#5b8def" stroke="#1e3a6e" stroke-width="2"/>
    <rect x="4" y="22" width="4" height="12" fill="#1e3a6e"/>
    <path d="M30 29 L40 29 L36 33 L36 37 L28 37 L28 33 Z" fill="#1e3a6e"/>
  </g>
  <g transform="translate(144,52)">
    <circle cx="15" cy="24" r="14" fill="#5b8def" stroke="#1e3a6e" stroke-width="2"/>
    <ellipse cx="15" cy="18" rx="20" ry="6" fill="#5b8def" stroke="#1e3a6e" stroke-width="2"/>
    <path d="M15 10 L15 2 L18 6 Z" fill="#1e3a6e"/>
  </g>
  <text x="100" y="166" text-anchor="middle" font-family="Baloo 2, sans-serif" font-size="15" font-weight="800" fill="#8b5a00">FARM AI SCOUT</text>
  <polygon points="100,8 104,24 120,24 108,34 112,50 100,42 88,50 92,34 80,24 96,24" fill="#ffc24b" stroke="#8b5a00" stroke-width="1.5"/>
</svg>`)

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
