// Procedural sound effects using Web Audio API.
// Singleton lazy AudioContext created on first user gesture.

let audioCtx: AudioContext | null = null;
let muted = false;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function setMuted(val: boolean): void {
  muted = val;
}

export function isMuted(): boolean {
  return muted;
}

function osc(
  type: OscillatorType,
  startFreq: number,
  endFreq: number,
  durationMs: number,
  gain: number = 0.15
): void {
  if (muted || !audioCtx) return;
  const now = audioCtx.currentTime;
  const dur = durationMs / 1000;

  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(startFreq, now);
  o.frequency.linearRampToValueAtTime(endFreq, now + dur);
  g.gain.setValueAtTime(gain, now);
  g.gain.linearRampToValueAtTime(0, now + dur);
  o.connect(g).connect(audioCtx.destination);
  o.start(now);
  o.stop(now + dur);
}

// Square wave 300→600Hz sweep, 80ms
export function sfxJump(): void {
  osc("square", 300, 600, 80, 0.08);
}

// Square wave 880→1320Hz, 150ms — bright ding
export function sfxCollect(): void {
  osc("square", 880, 1320, 150, 0.1);
}

// Sawtooth 440→110Hz, 300ms — descending
export function sfxHeartLost(): void {
  osc("sawtooth", 440, 110, 300, 0.12);
}

// Sine wave ascending ping per heart
export function sfxHeartRefill(i: number): void {
  osc("sine", 523 + i * 130, 523 + i * 130, 250, 0.12);
}

// Dual oscillators descending, 700ms
export function sfxDeath(): void {
  if (muted || !audioCtx) return;
  osc("sawtooth", 440, 80, 700, 0.12);
  osc("square", 330, 60, 700, 0.08);
}

// 3-note ascending fanfare (C5→E5→G5), 200ms spacing
export function sfxGateSuccess(): void {
  if (muted || !audioCtx) return;
  const now = audioCtx.currentTime;
  const notes = [523, 659, 784]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const o = audioCtx!.createOscillator();
    const g = audioCtx!.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0.1, now + i * 0.2);
    g.gain.linearRampToValueAtTime(0, now + i * 0.2 + 0.18);
    o.connect(g).connect(audioCtx!.destination);
    o.start(now + i * 0.2);
    o.stop(now + i * 0.2 + 0.2);
  });
}

// Noise burst through 400Hz lowpass — wooden thud
export function sfxDoorEnter(): void {
  if (muted || !audioCtx) return;
  const now = audioCtx.currentTime;
  const bufferSize = audioCtx.sampleRate * 0.08;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, now);
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(0.15, now);
  g.gain.linearRampToValueAtTime(0, now + 0.08);
  src.connect(filter).connect(g).connect(audioCtx.destination);
  src.start(now);
  src.stop(now + 0.08);
}

// Sawtooth 200→400→150Hz, 200ms — vocal burst
export function sfxShout(): void {
  if (muted || !audioCtx) return;
  const now = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(200, now);
  o.frequency.linearRampToValueAtTime(400, now + 0.1);
  o.frequency.linearRampToValueAtTime(150, now + 0.2);
  g.gain.setValueAtTime(0.1, now);
  g.gain.linearRampToValueAtTime(0, now + 0.2);
  o.connect(g).connect(audioCtx.destination);
  o.start(now);
  o.stop(now + 0.2);
}
