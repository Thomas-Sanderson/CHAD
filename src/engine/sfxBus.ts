// Doppler-aware marshrutka engine drone + horn honk.
// Each active marshrutka gets a continuous square-wave oscillator chain
// whose frequency and gain update every frame based on distance/velocity
// relative to the player.

import type { ActiveMarshrutka } from "../types/engine";
import { getAudioContext, isMuted } from "./sfx";

const BASE_FREQ = 110;        // engine drone base (Hz)
const HORN_FREQ = 380;        // horn honk frequency
const HORN_DURATION = 0.12;   // seconds
const REFERENCE_SPEED = 700;  // doppler scaling denominator
const MAX_RANGE = 900;        // audible distance (px)
const HORN_RANGE = 700;       // horn triggers within this distance

interface BusAudio {
  engine: OscillatorNode;
  gain: GainNode;
  pan: StereoPannerNode;
  hornPlayed: boolean;
}

const activeBuses = new Map<ActiveMarshrutka, BusAudio>();

function createBusAudio(ctx: AudioContext): BusAudio {
  const engine = ctx.createOscillator();
  engine.type = "square";
  engine.frequency.value = BASE_FREQ;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  const pan = ctx.createStereoPanner();
  pan.pan.value = 0;

  engine.connect(gain).connect(pan).connect(ctx.destination);
  engine.start();

  return { engine, gain, pan, hornPlayed: false };
}

function destroyBusAudio(ba: BusAudio): void {
  try {
    ba.engine.stop();
    ba.engine.disconnect();
    ba.gain.disconnect();
    ba.pan.disconnect();
  } catch {
    // already stopped
  }
}

function playHorn(ctx: AudioContext, vol: number, panVal: number, pitchMult: number): void {
  const now = ctx.currentTime;
  // Two slightly detuned square waves for a nasty Soviet horn
  for (const detune of [-8, 8]) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const p = ctx.createStereoPanner();
    o.type = "square";
    o.frequency.value = HORN_FREQ * pitchMult;
    o.detune.value = detune;
    g.gain.setValueAtTime(vol * 0.12, now);
    g.gain.linearRampToValueAtTime(0, now + HORN_DURATION);
    p.pan.value = panVal;
    o.connect(g).connect(p).connect(ctx.destination);
    o.start(now);
    o.stop(now + HORN_DURATION);
  }
}

/**
 * Call every animation frame with the current marshrutka array and player X.
 * Creates/updates/destroys oscillator chains to match active buses.
 */
export function updateBusAudio(
  buses: ActiveMarshrutka[],
  playerX: number,
): void {
  if (isMuted()) {
    // Silence everything when muted
    if (activeBuses.size > 0) {
      for (const ba of activeBuses.values()) destroyBusAudio(ba);
      activeBuses.clear();
    }
    return;
  }

  const ctx = getAudioContext();
  if (ctx.state !== "running") return;

  const currentSet = new Set(buses);

  // Clean up buses that no longer exist
  for (const [m, ba] of activeBuses) {
    if (!currentSet.has(m)) {
      destroyBusAudio(ba);
      activeBuses.delete(m);
    }
  }

  // Update or create audio for each active bus
  for (const m of buses) {
    let ba = activeBuses.get(m);
    if (!ba) {
      ba = createBusAudio(ctx);
      activeBuses.set(m, ba);
    }

    const dx = m.x - playerX;
    const distance = Math.abs(dx);

    // Volume: squared falloff with distance
    const volRaw = Math.max(0, 1 - distance / MAX_RANGE);
    const vol = volRaw * volRaw * 0.08; // 0.08 max gain — background rumble

    // Doppler: closing rate based on relative position and bus velocity
    // Bus speed is negative (moving left). When dx > 0 (bus right of player),
    // closing rate is positive (approaching).
    const closingRate = -m.speed * Math.sign(dx || 1);
    const pitchMult = 1 + closingRate / REFERENCE_SPEED;
    const freq = BASE_FREQ * Math.max(0.3, Math.min(2.0, pitchMult));

    // Stereo pan: -1 (left) to 1 (right)
    const panVal = Math.max(-1, Math.min(1, dx / 400));

    // Apply to nodes
    ba.engine.frequency.value = freq;
    ba.gain.gain.value = vol;
    ba.pan.pan.value = panVal;

    // Horn: trigger once when bus enters audible range
    if (!ba.hornPlayed && distance < HORN_RANGE && vol > 0.001) {
      ba.hornPlayed = true;
      playHorn(ctx, volRaw, panVal, pitchMult);
    }
  }
}

/** Stop all bus audio — call on unmount or segment transition. */
export function stopAllBusAudio(): void {
  for (const ba of activeBuses.values()) destroyBusAudio(ba);
  activeBuses.clear();
}
