// Procedural chiptune music using Web Audio API lookahead scheduler.
// Shares AudioContext from sfx.ts.
// Supports dual-instance phase offset for harmonic interference.

import { getAudioContext, isMuted, isAudioUnlocked, onAudioUnlocked } from "./sfx";

export type MusicMode = "title" | "level";

let schedulerTimer: ReturnType<typeof setTimeout> | null = null;
let currentBeat = 0;
let nextBeatTime = 0;
let masterGain1: GainNode | null = null;
let masterGain2: GainNode | null = null;
let musicVolume = 0.08;
let currentMode: MusicMode | null = null;

// D minor pentatonic: D4, F4, G4, A4, C5
const MELODY_NOTES = [294, 349, 392, 440, 523];
// Extended range for title mode
const MELODY_NOTES_TITLE = [294, 349, 392, 440, 523, 587, 659];

const LOOP_LENGTH = 16; // beats
const BPM = 120;
const BEAT_DURATION = 60 / BPM; // 0.5s per beat
const LOOKAHEAD = 0.1; // schedule 100ms ahead
const SCHEDULE_INTERVAL = 50; // check every 50ms

// Phase offset — slider value 0.0 to 1.0
const PHASE_KEY = "chad-music-phase";

let phaseOffset: number = (() => {
  try {
    const val = parseFloat(localStorage.getItem(PHASE_KEY) ?? "0");
    return isNaN(val) ? 0 : Math.max(0, Math.min(1, val));
  } catch { return 0; }
})();

export function getPhaseOffset(): number {
  return phaseOffset;
}

export function setPhaseOffset(val: number): void {
  phaseOffset = Math.max(0, Math.min(1, val));
  try { localStorage.setItem(PHASE_KEY, phaseOffset.toFixed(3)); } catch { /* */ }
}

// Deterministic melody pattern (16-beat loop) — different per mode
function getMelodyNote(beat: number, mode: MusicMode): number | null {
  const pattern = mode === "title"
    ? [0, null, 2, null, 4, null, 3, null, 2, null, 1, null, 0, null, 3, null]
    : [0, null, null, 2, null, null, 4, null, null, null, 3, null, null, 1, null, null];
  const idx = pattern[beat % LOOP_LENGTH];
  if (idx == null) return null;
  const notes = mode === "title" ? MELODY_NOTES_TITLE : MELODY_NOTES;
  return notes[idx] ?? null;
}

function scheduleBeat(
  ctx: AudioContext, time: number, beat: number, mode: MusicMode, dest: AudioNode,
  gainScale: number = 1,
): void {
  // Melody — square wave
  const melodyFreq = getMelodyNote(beat, mode);
  if (melodyFreq !== null) {
    const melodyGain = (mode === "title" ? 0.06 : 0.03) * gainScale;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(melodyFreq, time);
    g.gain.setValueAtTime(melodyGain, time);
    g.gain.linearRampToValueAtTime(0, time + BEAT_DURATION * 0.8);
    o.connect(g).connect(dest);
    o.start(time);
    o.stop(time + BEAT_DURATION * 0.9);
  }

  // Bass — triangle wave at half frequency of root
  const bassNote = MELODY_NOTES[beat % 5]!;
  const bassFreq = bassNote / 2;
  const bo = ctx.createOscillator();
  const bg = ctx.createGain();
  bo.type = "triangle";
  bo.frequency.setValueAtTime(bassFreq, time);
  bg.gain.setValueAtTime(0.04 * gainScale, time);
  bg.gain.linearRampToValueAtTime(0, time + BEAT_DURATION * 0.9);
  bo.connect(bg).connect(dest);
  bo.start(time);
  bo.stop(time + BEAT_DURATION);

  // Kick — sine 150→30Hz sweep on beats 0,4,8,12
  if (beat % 4 === 0) {
    const ko = ctx.createOscillator();
    const kg = ctx.createGain();
    ko.type = "sine";
    ko.frequency.setValueAtTime(150, time);
    ko.frequency.linearRampToValueAtTime(30, time + 0.1);
    kg.gain.setValueAtTime(0.08 * gainScale, time);
    kg.gain.linearRampToValueAtTime(0, time + 0.1);
    ko.connect(kg).connect(dest);
    ko.start(time);
    ko.stop(time + 0.12);
  }

  // Hi-hat — noise burst through 8kHz highpass on odd beats
  if (beat % 2 === 1) {
    const bufferSize = ctx.sampleRate * 0.03;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(8000, time);
    const hg = ctx.createGain();
    hg.gain.setValueAtTime(0.03 * gainScale, time);
    hg.gain.linearRampToValueAtTime(0, time + 0.03);
    src.connect(filter).connect(hg).connect(dest);
    src.start(time);
    src.stop(time + 0.04);
  }
}

function scheduler(): void {
  if (!masterGain1) return;
  const ctx = masterGain1.context as AudioContext;
  if (isMuted()) {
    schedulerTimer = setTimeout(scheduler, SCHEDULE_INTERVAL);
    return;
  }

  while (nextBeatTime < ctx.currentTime + LOOKAHEAD) {
    // Instance 1 — primary
    scheduleBeat(ctx, nextBeatTime, currentBeat, currentMode!, masterGain1);

    // Instance 2 — phased echo (beat-quantized offset, reduced volume)
    const beatOffset = Math.round(phaseOffset * LOOP_LENGTH);
    if (beatOffset > 0 && beatOffset < LOOP_LENGTH && masterGain2) {
      const phasedBeat = (currentBeat + beatOffset) % LOOP_LENGTH;
      scheduleBeat(ctx, nextBeatTime, phasedBeat, currentMode!, masterGain2, 0.75);
    }

    currentBeat = (currentBeat + 1) % LOOP_LENGTH;
    nextBeatTime += BEAT_DURATION;
  }
  schedulerTimer = setTimeout(scheduler, SCHEDULE_INTERVAL);
}

// Pending mode — if startMusic is called before audio is unlocked,
// defer until the first user gesture unlocks the context.
let pendingMode: MusicMode | null = null;

export function startMusic(mode: MusicMode): void {
  if (currentMode === mode) return; // already playing this mode

  // On iOS in iframes, AudioContext created before a gesture is permanently
  // broken. Defer until unlockAudio has fired.
  if (!isAudioUnlocked()) {
    pendingMode = mode;
    return;
  }

  stopMusic();
  pendingMode = null;

  const ctx = getAudioContext();

  // Instance 1 — full volume
  masterGain1 = ctx.createGain();
  masterGain1.gain.setValueAtTime(musicVolume, ctx.currentTime);
  masterGain1.connect(ctx.destination);

  // Instance 2 — phase echo at reduced volume
  masterGain2 = ctx.createGain();
  masterGain2.gain.setValueAtTime(musicVolume * 0.75, ctx.currentTime);
  masterGain2.connect(ctx.destination);

  currentMode = mode;
  currentBeat = 0;
  nextBeatTime = ctx.currentTime;
  scheduler();
}

export function stopMusic(): void {
  if (schedulerTimer !== null) {
    clearTimeout(schedulerTimer);
    schedulerTimer = null;
  }
  if (masterGain1) { masterGain1.disconnect(); masterGain1 = null; }
  if (masterGain2) { masterGain2.disconnect(); masterGain2 = null; }
  currentMode = null;
}

export function setMusicVolume(vol: number): void {
  musicVolume = vol;
  if (masterGain1) {
    const ctx = masterGain1.context as AudioContext;
    masterGain1.gain.setValueAtTime(vol, ctx.currentTime);
    if (masterGain2) {
      masterGain2.gain.setValueAtTime(vol * 0.75, ctx.currentTime);
    }
  }
}

// When audio unlocks after a deferred startMusic, play the pending mode.
onAudioUnlocked(() => {
  if (pendingMode) {
    const mode = pendingMode;
    pendingMode = null;
    startMusic(mode);
  }
});
