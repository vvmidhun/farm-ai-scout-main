const MUTED_KEY = 'fas-muted'

let ctx: AudioContext | null = null
let mutedState: boolean = false

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    try {
      ctx = new AC()
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') {
    void ctx.resume().catch(() => undefined)
  }
  return ctx
}

function beep(freq: number, ms: number, type: OscillatorType = 'sine', gain = 0.08): void {
  if (mutedState) return
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime)
  g.gain.setValueAtTime(0.0001, c.currentTime)
  g.gain.exponentialRampToValueAtTime(gain, c.currentTime + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ms / 1000)
  osc.connect(g).connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + ms / 1000 + 0.05)
}

export function isMuted(): boolean {
  if (typeof window === 'undefined') return mutedState
  try {
    return localStorage.getItem(MUTED_KEY) === '1'
  } catch {
    return mutedState
  }
}

export function setMuted(m: boolean): void {
  mutedState = m
  try {
    if (m) localStorage.setItem(MUTED_KEY, '1')
    else localStorage.removeItem(MUTED_KEY)
  } catch {
    /* ignore */
  }
}

export const sfx = {
  click() {
    beep(660, 70, 'square', 0.05)
  },
  ding() {
    beep(990, 120, 'sine', 0.08)
    setTimeout(() => beep(1320, 140, 'sine', 0.06), 80)
  },
  whoosh() {
    const c = getCtx()
    if (!c || mutedState) return
    const bufferSize = c.sampleRate * 0.25
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize
      data[i] = (Math.random() * 2 - 1) * (1 - t) * 0.3 * t
    }
    const src = c.createBufferSource()
    src.buffer = buffer
    const g = c.createGain()
    g.gain.setValueAtTime(0.08, c.currentTime)
    src.connect(g).connect(c.destination)
    src.start()
  },
  snap() {
    beep(220, 50, 'triangle', 0.08)
  },
  tada() {
    beep(523, 120, 'sine', 0.08)
    setTimeout(() => beep(659, 120, 'sine', 0.08), 110)
    setTimeout(() => beep(784, 180, 'sine', 0.09), 220)
    setTimeout(() => beep(1047, 260, 'sine', 0.09), 340)
  },
  think() {
    beep(440, 80, 'sine', 0.06)
    setTimeout(() => beep(550, 80, 'sine', 0.06), 90)
    setTimeout(() => beep(660, 140, 'sine', 0.06), 180)
  },
  hmm() {
    beep(300, 140, 'sawtooth', 0.05)
  },
  boing() {
    beep(330, 50, 'square', 0.08)
    setTimeout(() => beep(220, 70, 'square', 0.08), 45)
  },
  stamp() {
    beep(180, 80, 'square', 0.1)
    setTimeout(() => beep(120, 120, 'square', 0.08), 50)
  },
  siren() {
    const c = getCtx()
    if (!c || mutedState) return
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.type = 'sine'
    const now = c.currentTime
    osc.frequency.setValueAtTime(700, now)
    osc.frequency.linearRampToValueAtTime(1000, now + 0.25)
    osc.frequency.linearRampToValueAtTime(700, now + 0.5)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.08, now + 0.03)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)
    osc.connect(g).connect(c.destination)
    osc.start(now)
    osc.stop(now + 0.65)
  },
  pop() {
    beep(880, 40, 'sine', 0.08)
  },
}
