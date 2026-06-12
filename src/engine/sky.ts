// Sky atmosphere engine — per-level time of day with gradient skies,
// pixel-art sun/moon/stars/clouds, radial glow, ground tint, and warmth overlay.
// Ported from BABEL_DEMO_SITE_v9.html PHASES system.

import type { SpriteData } from "./sprites";

// --- Types ---

export type TimeOfDay = "dawn" | "morning" | "midday" | "afternoon" | "evening" | "night";

export interface SceneDarken {
  r: number;
  g: number;
  b: number;
  alpha: number;
}

export interface SkyPhase {
  name: string;
  skyTop: string;
  skyMid: string;
  skyBot: string;
  horizon: string;
  isNight: boolean;
  sunX: number;       // 0-1 fraction of canvas width
  sunY: number;       // 0-1 fraction of sky height
  glowColor: string;  // rgba for radial glow
  glowRadius: number; // outer glow radius in px
  groundTint: string; // rgba overlay for ground zone
  warmth: number;     // -1..1, controls scene overlay color
  cloudAlpha: number; // cloud opacity (lower at night)
  sceneDarken: SceneDarken; // full-scene brightness overlay
}

// --- Phase configs — ported from demo v9 PHASES array ---

const DAWN: SkyPhase = {
  name: "Dawn",
  skyTop: "#3A2848", skyMid: "#A85840", skyBot: "#D8A050", horizon: "#E8C070",
  isNight: false, sunX: 0.88, sunY: 0.82,
  glowColor: "rgba(232,160,48,.35)", glowRadius: 60,
  groundTint: "rgba(200,120,50,.18)", warmth: 0.35, cloudAlpha: 0.2,
  sceneDarken: { r: 80, g: 50, b: 20, alpha: 0.18 },
};

const MORNING: SkyPhase = {
  name: "Morning",
  skyTop: "#5A88B8", skyMid: "#90B8D8", skyBot: "#C8D0C8", horizon: "#D8D8C8",
  isNight: false, sunX: 0.68, sunY: 0.35,
  glowColor: "rgba(240,208,96,.2)", glowRadius: 50,
  groundTint: "rgba(200,180,120,.08)", warmth: 0.15, cloudAlpha: 0.18,
  sceneDarken: { r: 0, g: 0, b: 0, alpha: 0 },
};

const MIDDAY: SkyPhase = {
  name: "Midday",
  skyTop: "#4878B0", skyMid: "#78A8C8", skyBot: "#A8C0C8", horizon: "#C8CCC0",
  isNight: false, sunX: 0.50, sunY: 0.15,
  glowColor: "rgba(255,248,208,.12)", glowRadius: 44,
  groundTint: "rgba(180,180,160,.05)", warmth: 0, cloudAlpha: 0.18,
  sceneDarken: { r: 0, g: 0, b: 0, alpha: 0 },
};

const AFTERNOON: SkyPhase = {
  name: "Afternoon",
  skyTop: "#5878A0", skyMid: "#98A898", skyBot: "#C8B890", horizon: "#D8C8A0",
  isNight: false, sunX: 0.32, sunY: 0.35,
  glowColor: "rgba(240,208,80,.22)", glowRadius: 50,
  groundTint: "rgba(210,180,90,.10)", warmth: 0.18, cloudAlpha: 0.18,
  sceneDarken: { r: 40, g: 30, b: 10, alpha: 0.06 },
};

const EVENING: SkyPhase = {
  name: "Evening",
  skyTop: "#5A4868", skyMid: "#B87048", skyBot: "#E0A868", horizon: "#E8C080",
  isNight: false, sunX: 0.15, sunY: 0.72,
  glowColor: "rgba(232,160,56,.30)", glowRadius: 52,
  groundTint: "rgba(200,130,60,.14)", warmth: 0.30, cloudAlpha: 0.12,
  sceneDarken: { r: 60, g: 30, b: 10, alpha: 0.22 },
};

const NIGHT: SkyPhase = {
  name: "Night",
  skyTop: "#08060E", skyMid: "#101828", skyBot: "#182030", horizon: "#202838",
  isNight: true, sunX: 0.60, sunY: 0.25,
  glowColor: "rgba(180,175,160,.12)", glowRadius: 48,
  groundTint: "rgba(40,50,90,.18)", warmth: -0.2, cloudAlpha: 0.04,
  sceneDarken: { r: 10, g: 10, b: 30, alpha: 0.35 },
};

const PHASES: Record<TimeOfDay, SkyPhase> = {
  dawn: DAWN, morning: MORNING, midday: MIDDAY,
  afternoon: AFTERNOON, evening: EVENING, night: NIGHT,
};

// --- HSL color helpers ---

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function shiftHexColor(hex: string, hueShift: number, satMult: number, brightMult: number): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h + hueShift, s * satMult, l * brightMult);
}

// --- Latitude-aware sky ---

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const latitudeCache = new Map<string, SkyPhase>();

function applyLatitudeShift(base: SkyPhase, latitude: number): SkyPhase {
  const key = `${base.name}:${latitude}`;
  const cached = latitudeCache.get(key);
  if (cached) return cached;

  const latFactor = clamp01((latitude - 9) / 51);
  const hueShift = lerp(8, -5, latFactor);
  const satMult = lerp(1.25, 0.75, latFactor);
  const brightMult = lerp(1.0, 0.92, latFactor);

  const shifted: SkyPhase = {
    ...base,
    skyTop: shiftHexColor(base.skyTop, hueShift, satMult, brightMult),
    skyMid: shiftHexColor(base.skyMid, hueShift, satMult, brightMult),
    skyBot: shiftHexColor(base.skyBot, hueShift, satMult, brightMult),
    horizon: shiftHexColor(base.horizon, hueShift, satMult, brightMult),
    warmth: base.warmth + lerp(0.15, -0.10, latFactor),
    cloudAlpha: base.cloudAlpha + lerp(-0.02, 0.06, latFactor),
    sceneDarken: base.isNight
      ? { ...base.sceneDarken, alpha: lerp(0.38, 0.28, latFactor) }
      : base.sceneDarken,
  };

  latitudeCache.set(key, shifted);
  return shifted;
}

export function getSkyPhase(timeOfDay: TimeOfDay, latitude?: number): SkyPhase {
  const base = PHASES[timeOfDay];
  if (latitude == null) return base;
  return applyLatitudeShift(base, latitude);
}

// --- Pixel-art sprites (using DAY palette colors from demo) ---

const _ = null;
const FIRE_LT = "#F0C060";
const GOLD    = "#C8A030";
const GOLD_LT = "#DDB840";
const STONE    = "#C4B8A0";
const STONE_LT = "#D8CDB8";
const WHITE    = "#F7F3EC";

// 12×12 sun — gold/fire rays
export const sunSprite: SpriteData = [
  [_,_,_,_,_,FIRE_LT,FIRE_LT,_,_,_,_,_],
  [_,_,FIRE_LT,_,_,_,_,_,_,FIRE_LT,_,_],
  [_,_,_,_,_,GOLD,GOLD,_,_,_,_,_],
  [_,_,_,GOLD,GOLD_LT,GOLD_LT,GOLD_LT,GOLD_LT,GOLD,_,_,_],
  [_,_,_,GOLD_LT,GOLD_LT,FIRE_LT,FIRE_LT,GOLD_LT,GOLD_LT,_,_,_],
  [FIRE_LT,_,GOLD,GOLD_LT,FIRE_LT,FIRE_LT,FIRE_LT,FIRE_LT,GOLD_LT,GOLD,_,FIRE_LT],
  [FIRE_LT,_,GOLD,GOLD_LT,FIRE_LT,FIRE_LT,FIRE_LT,FIRE_LT,GOLD_LT,GOLD,_,FIRE_LT],
  [_,_,_,GOLD_LT,GOLD_LT,FIRE_LT,FIRE_LT,GOLD_LT,GOLD_LT,_,_,_],
  [_,_,_,GOLD,GOLD_LT,GOLD_LT,GOLD_LT,GOLD_LT,GOLD,_,_,_],
  [_,_,_,_,_,GOLD,GOLD,_,_,_,_,_],
  [_,_,FIRE_LT,_,_,_,_,_,_,FIRE_LT,_,_],
  [_,_,_,_,_,FIRE_LT,FIRE_LT,_,_,_,_,_],
];

// 12×12 moon — stone/white craters
export const moonSprite: SpriteData = [
  [_,_,_,_,STONE,STONE,STONE,STONE,_,_,_,_],
  [_,_,STONE,STONE,WHITE,WHITE,WHITE,STONE,STONE,_,_,_],
  [_,STONE,WHITE,WHITE,WHITE,WHITE,WHITE,WHITE,STONE,_,_,_],
  [_,STONE,WHITE,STONE_LT,WHITE,WHITE,WHITE,WHITE,STONE,STONE,_,_],
  [STONE,WHITE,WHITE,STONE_LT,STONE_LT,WHITE,WHITE,WHITE,WHITE,STONE,_,_],
  [STONE,WHITE,WHITE,WHITE,WHITE,WHITE,STONE_LT,WHITE,WHITE,STONE,_,_],
  [STONE,WHITE,WHITE,WHITE,WHITE,WHITE,STONE_LT,STONE_LT,WHITE,STONE,_,_],
  [STONE,WHITE,WHITE,WHITE,WHITE,WHITE,WHITE,WHITE,WHITE,STONE,_,_],
  [_,STONE,WHITE,WHITE,STONE_LT,WHITE,WHITE,WHITE,STONE,_,_,_],
  [_,STONE,STONE,WHITE,WHITE,WHITE,WHITE,STONE,STONE,_,_,_],
  [_,_,_,STONE,STONE,WHITE,STONE,STONE,_,_,_,_],
  [_,_,_,_,_,STONE,STONE,_,_,_,_,_],
];

// 20×8 cloud — white pixels
const C = WHITE;
export const cloudSprite: SpriteData = [
  [_,_,_,_,_,_,C,C,C,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,C,C,C,C,C,C,C,_,_,_,_,_,_,_,_,_],
  [_,_,_,C,C,C,C,C,C,C,C,C,C,_,_,_,_,_,_,_],
  [_,C,C,C,C,C,C,C,C,C,C,C,C,C,C,_,_,_,_,_],
  [C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,_,_,_],
  [C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,_],
  [_,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],
  [_,_,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C,C],
];

// --- Star pool — 60 stars, generated once ---

interface Star {
  x: number;        // 0-1 fraction of world width (wraps via cam)
  y: number;        // 0-1 fraction of sky height
  twinklePhase: number;
  brightness: number; // base alpha 0.3-0.9
}

const STAR_COUNT = 60;
const starPool: Star[] = [];
for (let i = 0; i < STAR_COUNT; i++) {
  starPool.push({
    x: Math.random(),
    y: Math.random() * 0.85,  // keep stars away from horizon
    twinklePhase: Math.random() * Math.PI * 2,
    brightness: 0.4 + Math.random() * 0.6,
  });
}

// --- Rendering functions ---

const SPRITE_SCALE = 3;  // pixel-art scale for sun/moon/stars

/** Draw a single pixel-art sprite at center position cx, cy */
function drawSpriteAt(
  ctx: CanvasRenderingContext2D,
  sprite: SpriteData,
  cx: number, cy: number,
  scale: number,
): void {
  const h = sprite.length;
  const w = sprite[0]?.length ?? 0;
  const ox = cx - (w * scale) / 2;
  const oy = cy - (h * scale) / 2;
  for (let row = 0; row < h; row++) {
    const r = sprite[row]!;
    for (let col = 0; col < w; col++) {
      const c = r[col];
      if (c) {
        ctx.fillStyle = c;
        ctx.fillRect(ox + col * scale, oy + row * scale, scale, scale);
      }
    }
  }
}

/** Draw a 5×5 pixel-art star cross */
function drawStarPixel(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  alpha: number,
): void {
  ctx.globalAlpha = alpha;
  // Cross pattern: center + 4 arms
  ctx.fillStyle = WHITE;
  ctx.fillRect(cx - 1, cy - 1, 3, 3); // center 3×3 core
  ctx.fillStyle = STONE_LT;
  ctx.fillRect(cx, cy - 2, 1, 1);     // top
  ctx.fillRect(cx, cy + 2, 1, 1);     // bottom
  ctx.fillRect(cx - 2, cy, 1, 1);     // left
  ctx.fillRect(cx + 2, cy, 1, 1);     // right
  ctx.globalAlpha = 1;
}

/**
 * Render the full sky background: gradient, stars, clouds, glow, sun/moon.
 * @param cam camera X offset for parallax
 */
export function renderSky(
  ctx: CanvasRenderingContext2D,
  phase: SkyPhase,
  canvasW: number,
  skyH: number,
  cam: number,
): void {
  // 1. Sky gradient — 4 stops
  const grad = ctx.createLinearGradient(0, 0, 0, skyH);
  grad.addColorStop(0, phase.skyTop);
  grad.addColorStop(0.5, phase.skyMid);
  grad.addColorStop(0.85, phase.skyBot);
  grad.addColorStop(1, phase.horizon);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvasW, skyH);

  // 2. Stars (night only) — with twinkling
  if (phase.isNight) {
    const t = Date.now() / 1000;
    for (const star of starPool) {
      const sx = ((star.x * canvasW * 4 - cam * 0.3) % canvasW + canvasW) % canvasW;
      const sy = star.y * skyH;
      const flicker = 0.5 + 0.5 * Math.sin(t * 1.5 + star.twinklePhase);
      drawStarPixel(ctx, sx, sy, star.brightness * flicker);
    }
  }

  // 3. Clouds — 3 at different positions with slow parallax
  const cloudPositions = [
    { xFrac: 0.18, yFrac: 0.25, scale: 2 },
    { xFrac: 0.55, yFrac: 0.38, scale: 2 },
    { xFrac: 0.82, yFrac: 0.22, scale: 1.5 },
  ];
  for (const cp of cloudPositions) {
    const cx = ((cp.xFrac * canvasW * 3 - cam * 0.1) % (canvasW + 120) + canvasW + 120) % (canvasW + 120) - 60;
    const cy = cp.yFrac * skyH;
    ctx.save();
    ctx.globalAlpha = phase.cloudAlpha;
    const s = cp.scale;
    const sprW = 20;
    const sprH = 8;
    const ox = cx - (sprW * s) / 2;
    const oy = cy - (sprH * s) / 2;
    for (let row = 0; row < sprH; row++) {
      const r = cloudSprite[row]!;
      for (let col = 0; col < sprW; col++) {
        if (r[col]) {
          ctx.fillStyle = WHITE;
          ctx.fillRect(ox + col * s, oy + row * s, s, s);
        }
      }
    }
    ctx.restore();
  }

  // 4. Radial glow behind sun/moon
  const glowCx = phase.sunX * canvasW;
  const glowCy = phase.sunY * skyH;
  const innerR = phase.glowRadius * 0.5;
  const outerR = phase.glowRadius;
  const glow = ctx.createRadialGradient(glowCx, glowCy, innerR, glowCx, glowCy, outerR);
  glow.addColorStop(0, phase.glowColor);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvasW, skyH);

  // 5. Sun or moon sprite
  if (phase.isNight) {
    drawSpriteAt(ctx, moonSprite, glowCx, glowCy, SPRITE_SCALE);
  } else {
    drawSpriteAt(ctx, sunSprite, glowCx, glowCy, SPRITE_SCALE);
  }
}

/**
 * Render ground tint overlay — subtle color wash over the ground zone.
 */
export function renderGroundTint(
  ctx: CanvasRenderingContext2D,
  phase: SkyPhase,
  groundY: number,
  canvasW: number,
  canvasH: number,
): void {
  if (!phase.groundTint) return;
  ctx.fillStyle = phase.groundTint;
  ctx.fillRect(0, groundY, canvasW, canvasH - groundY);
}

/**
 * Render scene brightness overlay — darkens/warms all sprites based on time of day.
 * Applied after all sprites, before warmth overlay and HUD.
 */
export function renderSceneBrightness(
  ctx: CanvasRenderingContext2D,
  phase: SkyPhase,
  canvasW: number,
  canvasH: number,
): void {
  const { r, g, b, alpha } = phase.sceneDarken;
  if (alpha <= 0) return;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  ctx.fillRect(0, 0, canvasW, canvasH);
}

/**
 * Render warmth overlay — subtle full-scene color tint.
 * Applied before HUD so HUD stays crisp.
 */
export function renderWarmthOverlay(
  ctx: CanvasRenderingContext2D,
  phase: SkyPhase,
  canvasW: number,
  canvasH: number,
): void {
  if (phase.warmth === 0) return;
  const alpha = Math.abs(phase.warmth) * 0.12;
  if (phase.warmth > 0) {
    ctx.fillStyle = `rgba(255, 180, 80, ${alpha})`;
  } else {
    ctx.fillStyle = `rgba(80, 100, 180, ${alpha})`;
  }
  ctx.fillRect(0, 0, canvasW, canvasH);
}
