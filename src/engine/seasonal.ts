// Seasonal rendering: sky colors, trees, flowers, ground overlays, particles.
// Called from renderer.ts when a level has a season set.

import type { Season } from "../types/skin";
import type { Particle, Footprint } from "../types/engine";
import { drawSprite } from "./sprites";
import { getTreeSprite, getFlowerColors } from "./seasonalSprites";

// --- Sky color overrides ---

export interface SeasonalSkyColors {
  skyTop: string;
  skyMid: string;
  skyBot: string;
}

export function getSeasonalSkyColors(season: Season): SeasonalSkyColors {
  switch (season) {
    case "spring":  return { skyTop: "#a8d8ea", skyMid: "#87ceeb", skyBot: "#c8e6c9" };
    case "summer":  return { skyTop: "#4488cc", skyMid: "#66aadd", skyBot: "#88ccaa" };
    case "autumn":  return { skyTop: "#8899aa", skyMid: "#99aabb", skyBot: "#aabbaa" };
    case "winter":  return { skyTop: "#4a5566", skyMid: "#5a6677", skyBot: "#667788" };
  }
}

/** Render a 3-stop vertical gradient sky for seasonal levels. */
export function renderSeasonalSky(
  ctx: CanvasRenderingContext2D,
  season: Season,
  canvasW: number,
  canvasH: number,
): void {
  const c = getSeasonalSkyColors(season);
  const grad = ctx.createLinearGradient(0, 0, 0, canvasH);
  grad.addColorStop(0, c.skyTop);
  grad.addColorStop(0.5, c.skyMid);
  grad.addColorStop(1, c.skyBot);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvasW, canvasH);
}

// --- Deterministic hash (same as renderer's existing scenery placement) ---
function seededHash(seed: number, i: number): number {
  return ((seed + i * 271) * 16807) % 2147483647;
}

// --- Trees ---

/** Render seasonal trees along avenue ground levels (replaces procedural scenery). */
export function renderSeasonalTrees(
  ctx: CanvasRenderingContext2D,
  season: Season,
  avenueYs: number[],
  camX: number,
  camY: number,
  canvasW: number,
): void {
  ctx.globalAlpha = 0.5;
  for (const aveY of avenueYs) {
    const seed = aveY * 137;
    // 6 trees per avenue
    for (let i = 0; i < 6; i++) {
      const hash = seededHash(seed, i);
      const wx = (hash % 3000) - camX;
      if (wx < -40 || wx > canvasW + 40) continue;
      const variant = (hash % 3) as 0 | 1 | 2;
      const tree = getTreeSprite(variant, season);
      const treeH = tree.length * 2; // scale 2
      const ty = aveY - camY - treeH;
      drawSprite(ctx, tree, wx, ty, 2);
    }
  }
  ctx.globalAlpha = 1;
}

// --- Flowers ---

/** Render small flower clusters along avenue ground levels. */
export function renderSeasonalFlowers(
  ctx: CanvasRenderingContext2D,
  season: Season,
  avenueYs: number[],
  camX: number,
  camY: number,
  canvasW: number,
): void {
  const colors = getFlowerColors(season);
  if (!colors) return;

  for (const aveY of avenueYs) {
    const baseY = aveY - camY - 2; // just above ground
    const seed = aveY * 251;
    // 10 clusters per avenue
    for (let i = 0; i < 10; i++) {
      const hash = seededHash(seed, i);
      const wx = (hash % 4000) - camX;
      if (wx < -10 || wx > canvasW + 10) continue;
      // 2-4 tiny dots per cluster
      const count = 2 + (hash % 3);
      for (let j = 0; j < count; j++) {
        const h2 = seededHash(hash, j);
        const dx = (h2 % 8) - 4;
        const dy = (h2 % 4) - 2;
        ctx.fillStyle = colors[h2 % colors.length]!;
        ctx.fillRect(wx + dx, baseY + dy, 2, 2);
      }
    }
  }
}

// --- Ground overlay ---

/** Render seasonal ground overlay (puddles, leaves, snow). */
export function renderGroundOverlay(
  ctx: CanvasRenderingContext2D,
  season: Season,
  avenueYs: number[],
  camX: number,
  camY: number,
  canvasW: number,
): void {
  if (season === "summer") return; // no overlay

  for (const aveY of avenueYs) {
    const roadY = aveY - camY;
    if (roadY > 500 || roadY + 16 < -16) continue;
    const seed = aveY * 193;

    if (season === "spring") {
      // Blue-gray puddle patches
      ctx.fillStyle = "rgba(100, 120, 140, 0.3)";
      for (let i = 0; i < 4; i++) {
        const hash = seededHash(seed, i);
        const px = (hash % 3000) - camX;
        if (px < -30 || px > canvasW + 30) continue;
        const pw = 20 + (hash % 20);
        ctx.fillRect(px, roadY + 2, pw, 6);
      }
    } else if (season === "autumn") {
      // Scattered leaf-colored pixels
      const leafColors = ["#cc7722", "#dd8833", "#aa5511", "#ee9944"];
      for (let i = 0; i < 12; i++) {
        const hash = seededHash(seed, i + 50);
        const px = (hash % 3000) - camX;
        if (px < -5 || px > canvasW + 5) continue;
        ctx.fillStyle = leafColors[hash % leafColors.length]!;
        ctx.fillRect(px, roadY + (hash % 10), 3, 2);
      }
    } else if (season === "winter") {
      // White snow overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fillRect(0, roadY, canvasW, 16);
    }
  }
}

// --- Building snow accents ---

/** Render bumpy snow strip on top of a building (winter only). */
export function renderBuildingSnow(
  ctx: CanvasRenderingContext2D,
  x: number,
  topY: number,
  width: number,
): void {
  const step = 8;
  for (let col = 0; col < width; col += step) {
    const w = Math.min(step, width - col);
    const h = 2 + seededHash(Math.round(x + col), 0) % 3; // 2, 3, or 4px
    const alpha = 0.65 + (seededHash(Math.round(x + col), 1) % 10) / 100; // 0.65–0.74
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(x + col, topY - h, w, h);
  }
}

// --- Particles (falling leaves / snow) ---

const LEAF_COLORS = ["#cc7722", "#dd8833", "#aa5511", "#ee9944", "#bb6622"];
const SNOW_COLORS = ["#ffffff", "#eeeeff", "#ddeeff"];

/** Update particle positions and spawn new ones. */
export function updateParticles(
  particles: Particle[],
  dt: number,
  season: Season | undefined,
  camX: number,
  camY: number,
  canvasW: number,
  canvasH: number,
): void {
  if (!season || (season !== "autumn" && season !== "winter")) {
    // Clear any leftover particles
    particles.length = 0;
    return;
  }

  // Spawn 1-2 per frame (at ~60fps that's 60-120/sec, but life limits total count)
  if (particles.length < 40) {
    const count = Math.random() < 0.5 ? 1 : 2;
    for (let i = 0; i < count; i++) {
      if (particles.length >= 40) break;
      const x = camX + Math.random() * canvasW;
      const y = camY - 10;
      if (season === "autumn") {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 30,
          vy: 20 + Math.random() * 20,
          color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]!,
          life: 4 + Math.random() * 2,
          size: Math.random() < 0.5 ? 2 : 3,
        });
      } else {
        // winter snow
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 15,
          vy: 15 + Math.random() * 15,
          color: SNOW_COLORS[Math.floor(Math.random() * SNOW_COLORS.length)]!,
          life: 5 + Math.random() * 3,
          size: Math.random() < 0.3 ? 2 : 1,
        });
      }
    }
  }

  // Update existing
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]!;
    p.life -= dt;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    // Gentle sinusoidal drift for leaves
    if (season === "autumn") {
      p.vx = Math.sin(p.life * 2) * 25;
    } else {
      // Snow wobble
      p.vx = Math.sin(p.life * 1.5) * 10;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    // Kill if way below camera
    if (p.y > camY + canvasH + 50) {
      particles.splice(i, 1);
    }
  }
}

/** Render particles (simple fillRect squares). */
export function renderParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  camX: number,
  camY: number,
): void {
  for (const p of particles) {
    const sx = p.x - camX;
    const sy = p.y - camY;
    if (sx < -5 || sx > 810 || sy < -5 || sy > 460) continue;
    ctx.fillStyle = p.color;
    ctx.fillRect(sx, sy, p.size, p.size);
  }
}

// --- Footprints (winter only) ---

const FOOTPRINT_MAX_AGE = 3.0; // seconds
const FOOTPRINT_CAP = 50;
const FOOTPRINT_SPACING = 20; // px between prints

/** Update footprint state: age, cull, spawn new from Chad and babushkas. */
export function updateFootprints(
  footprints: Footprint[],
  dt: number,
  season: Season | undefined,
  playerX: number,
  playerY: number,
  playerOnGround: boolean,
  babushkas: { x: number; y: number }[],
  lastFootprintX: number,
  groundPlatforms: { x: number; y: number; width: number }[],
): number {
  if (season !== "winter") {
    footprints.length = 0;
    return lastFootprintX;
  }

  // Age and cull
  for (let i = footprints.length - 1; i >= 0; i--) {
    footprints[i]!.age += dt;
    if (footprints[i]!.age >= FOOTPRINT_MAX_AGE) {
      footprints.splice(i, 1);
    }
  }

  // Cap — remove oldest if over limit
  while (footprints.length > FOOTPRINT_CAP) {
    footprints.shift();
  }

  // Helper: check if position is on a ground platform
  const isOnGround = (x: number, y: number): boolean => {
    for (const gp of groundPlatforms) {
      if (x >= gp.x && x <= gp.x + gp.width && Math.abs(y - gp.y) < 16) {
        return true;
      }
    }
    return false;
  };

  // Chad footprints
  if (playerOnGround && Math.abs(playerX - lastFootprintX) >= FOOTPRINT_SPACING) {
    if (isOnGround(playerX, playerY)) {
      const side = footprints.length % 2 === 0 ? "left" as const : "right" as const;
      footprints.push({ x: playerX, y: playerY, age: 0, side });
      lastFootprintX = playerX;
    }
  }

  // Babushka footprints — probabilistic (no per-babushka tracking)
  for (const bab of babushkas) {
    if (seededHash(Math.round(bab.x), 7) % 20 < 2) {
      if (isOnGround(bab.x, bab.y + 44)) {
        const side = footprints.length % 2 === 0 ? "left" as const : "right" as const;
        footprints.push({ x: bab.x, y: bab.y + 44, age: 0, side });
      }
    }
  }

  // Re-cap after spawning
  while (footprints.length > FOOTPRINT_CAP) {
    footprints.shift();
  }

  return lastFootprintX;
}

/** Render footprints as small fading marks on ground. */
export function renderFootprints(
  ctx: CanvasRenderingContext2D,
  footprints: Footprint[],
  camX: number,
  camY: number,
): void {
  for (const fp of footprints) {
    const sx = fp.x - camX + (fp.side === "left" ? -3 : 3);
    const sy = fp.y - camY + 2;
    if (sx < -10 || sx > 810 || sy < -10 || sy > 460) continue;
    const alpha = fp.age < 1 ? 0.7 : fp.age < 2 ? 0.45 : 0.25;
    ctx.fillStyle = `rgba(140, 140, 165, ${alpha})`;
    ctx.fillRect(sx, sy, 4, 2);
  }
}
