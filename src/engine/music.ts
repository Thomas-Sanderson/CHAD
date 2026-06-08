// Procedural chiptune music using Web Audio API lookahead scheduler.
// Shares AudioContext from sfx.ts.

import { getAudioContext, isMuted } from "./sfx";

type MusicMode = "title" | "level";

let schedulerTimer: ReturnType<typeof setTimeout> | null = null;
let currentBeat = 0;
let nextBeatTime = 0;
let masterGain: GainNode | null = null;
let musicVolume = 0.08;
let currentMode: MusicMode | null = null;

// D minor pentatonic: D4, F4, G4, A4, C5
const MELODY_NOTES = [294, 349, 392, 440, 523];
// Extended range for title mode
const MELODY_NOTES_TITLE = [294, 349, 392, 440, 523, 587, 659];

const BPM = 120;
const BEAT_DURATION = 60 / BPM; // 0.5s per beat
const LOOKAHEAD = 0.1; // schedule 100ms ahead
const SCHEDULE_INTERVAL = 50; // check every 50ms

// Deterministic melody pattern (16-beat loop) — different per mode
function getMelodyNote(beat: number, mode: MusicMode): number | null {
  const pattern = mode === "title"
    ? [0, null, 2, null, 4, null, 3, null, 2, null, 1, null, 0, null, 3, null]
    : [0, null, null, 2, null, null, 4, null, null, null, 3, null, null, 1, null, null];
  const idx = pattern[beat % 16];
  if (idx == null) return null;
  const notes = mode === "title" ? MELODY_NOTES_TITLE : MELODY_NOTES;
  return notes[idx] ?? null;
}

function scheduleBeat(ctx: AudioContext, time: number, beat: number, mode: MusicMode): void {
  const dest = masterGain ?? ctx.destination;

  // Melody — square wave
  const melodyFreq = getMelodyNote(beat, mode);
  if (melodyFreq !== null) {
    const melodyGain = mode === "title" ? 0.06 : 0.03;
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
  bg.gain.setValueAtTime(0.04, time);
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
    kg.gain.setValueAtTime(0.08, time);
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
    hg.gain.setValueAtTime(0.03, time);
    hg.gain.linearRampToValueAtTime(0, time + 0.03);
    src.connect(filter).connect(hg).connect(dest);
    src.start(time);
    src.stop(time + 0.04);
  }
}

function scheduler(): void {
  if (!masterGain) return;
  const ctx = masterGain.context as AudioContext;
  if (isMuted()) {
    schedulerTimer = setTimeout(scheduler, SCHEDULE_INTERVAL);
    return;
  }

  while (nextBeatTime < ctx.currentTime + LOOKAHEAD) {
    scheduleBeat(ctx, nextBeatTime, currentBeat, currentMode!);
    currentBeat = (currentBeat + 1) % 16;
    nextBeatTime += BEAT_DURATION;
  }
  schedulerTimer = setTimeout(scheduler, SCHEDULE_INTERVAL);
}

export function startMusic(mode: MusicMode): void {
  if (currentMode === mode) return; // already playing this mode
  stopMusic();

  const ctx = getAudioContext();
  masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(musicVolume, ctx.currentTime);
  masterGain.connect(ctx.destination);

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
  if (masterGain) {
    masterGain.disconnect();
    masterGain = null;
  }
  currentMode = null;
}

export function setMusicVolume(vol: number): void {
  musicVolume = vol;
  if (masterGain) {
    const ctx = masterGain.context as AudioContext;
    masterGain.gain.setValueAtTime(vol, ctx.currentTime);
  }
}
