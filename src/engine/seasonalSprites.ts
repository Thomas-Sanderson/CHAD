// Seasonal sprite data: apartment buildings, trees (per-season), and flower color palettes.
// All sprites follow the project convention: 2D arrays of hex strings or null (transparent).
// Apartments drawn at 4x scale, trees at 2x scale.

import type { SpriteData } from "./sprites";
import type { Season } from "../types/skin";

export const APARTMENT_SCALE = 6;

const _ = null;

// === Color palette ===
const PL = "#c8b89a"; // plaster
const PD = "#b8a888"; // plaster dark
const WG = "#2a2a3e"; // window glass
const WF = "#4a4a5e"; // window frame
const GL = "#5a6a7a"; // glass glint
const RF = "#884433"; // roof
const RD = "#773322"; // roof dark
const BK = "#8a7a6a"; // balcony
const DR = "#5a4a3a"; // door
const PP = "#666666"; // pipe

// --- Apartment buildings ---

// Narrow 2-story: 8×16 logical (32×64 at 4x scale)
const narrowApt2Story_v0: SpriteData = [
  // Roof
  [RD, RF, RF, RF, RF, RF, RF, RD],
  [RD, RF, RF, RF, RF, RF, RF, RD],
  // Top floor
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD],
  // Bottom floor
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, DR, DR, PL, PL, PL],
  [PL, PL, PL, DR, DR, PL, PL, PL],
  [PD, PD, PD, DR, DR, PD, PD, PD],
];

const narrowApt2Story_v1: SpriteData = [
  [RD, RF, RF, RF, RF, RF, RF, RD],
  [RD, RF, RF, RF, RF, RF, RF, RD],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, GL, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, BK, BK, PL, PL, PL, PL, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, GL, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, DR, DR, DR, PL, PL, PL],
  [PL, PL, DR, DR, DR, PL, PL, PL],
  [PD, PD, DR, DR, DR, PD, PD, PD],
];

const narrowApt2Story_v2: SpriteData = [
  [RD, RD, RF, RF, RF, RF, RD, RD],
  [RD, RF, RF, RF, RF, RF, RF, RD],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, WG, GL, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, BK, BK, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, GL, WG, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, DR, DR, PL, PL],
  [PL, PL, PP, PL, DR, DR, PL, PL],
  [PD, PD, PP, PD, DR, DR, PD, PD],
];

// Narrow 3-story: 8×24 logical (32×96 at 4x scale)
const narrowApt3Story_v0: SpriteData = [
  [RD, RF, RF, RF, RF, RF, RF, RD],
  [RD, RF, RF, RF, RF, RF, RF, RD],
  // Floor 3
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, GL, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD],
  // Floor 2
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, GL, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, BK, BK, PL, PL, PL, PL, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD],
  // Floor 1
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, DR, DR, PL, PL, PL],
  [PL, PL, PL, DR, DR, PL, PL, PL],
  [PL, PL, PL, DR, DR, PL, PL, PL],
  [PD, PD, PD, DR, DR, PD, PD, PD],
];

const narrowApt3Story_v1: SpriteData = [
  [RD, RF, RF, RF, RF, RF, RF, RD],
  [_, RF, RF, RF, RF, RF, RF, _],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, WG, GL, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, BK, BK, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, GL, WG, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WG, WG, PL, PL, WG, WG, PL],
  [PL, WF, WF, PL, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, DR, DR, DR, PL, PL, PL],
  [PL, PL, DR, DR, DR, PL, PP, PL],
  [PL, PL, DR, DR, DR, PL, PP, PL],
  [PD, PD, DR, DR, DR, PD, PP, PD],
];

// Wide 1-story: 16×12 logical (64×48 at 4x scale)
const wideApt1Story_v0: SpriteData = [
  [RD, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RD],
  [RD, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RD],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, WG, WG, PL, PL, PL, PL, WG, WG, PL, WG, WG, PL],
  [PL, WG, WG, PL, WG, GL, PL, PL, PL, PL, WG, WG, PL, GL, WG, PL],
  [PL, WF, WF, PL, WF, WF, PL, PL, PL, PL, WF, WF, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, DR, DR, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, DR, DR, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, DR, DR, PL, PL, PL, PL, PL, PL, PL],
  [PD, PD, PD, PD, PD, PD, PD, DR, DR, PD, PD, PD, PD, PD, PD, PD],
];

// Wide 2-story: 24×20 logical (96×80 at 4x scale)
const wideApt2Story_v0: SpriteData = [
  [RD, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RD],
  [RD, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RF, RD],
  // Top floor
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, WG, WG, PL, PL, WG, WG, PL, PL, PL, PL, WG, WG, PL, PL, WG, WG, PL, WG, WG, PL],
  [PL, WG, GL, PL, WG, WG, PL, PL, WG, WG, PL, PL, PL, PL, GL, WG, PL, PL, WG, WG, PL, WG, GL, PL],
  [PL, WF, WF, PL, WF, WF, PL, PL, WF, WF, PL, PL, PL, PL, WF, WF, PL, PL, WF, WF, PL, WF, WF, PL],
  [PL, BK, BK, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, BK, BK, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD, PD],
  // Bottom floor
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, WG, WG, PL, WG, WG, PL, PL, WG, WG, PL, PL, PL, PL, WG, WG, PL, PL, WG, WG, PL, WG, WG, PL],
  [PL, WG, WG, PL, GL, WG, PL, PL, WG, WG, PL, PL, PL, PL, WG, GL, PL, PL, WG, WG, PL, WG, WG, PL],
  [PL, WF, WF, PL, WF, WF, PL, PL, WF, WF, PL, PL, PL, PL, WF, WF, PL, PL, WF, WF, PL, WF, WF, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, DR, DR, DR, DR, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PL, PL, PL, PL, PL, PL, PL, PL, DR, DR, DR, DR, PL, PL, PL, PL, PL, PL, PL, PL, PL, PL],
  [PL, PL, PP, PL, PL, PL, PL, PL, PL, PL, DR, DR, DR, DR, PL, PL, PL, PL, PL, PL, PL, PP, PL, PL],
  [PL, PL, PP, PL, PL, PL, PL, PL, PL, PL, DR, DR, DR, DR, PL, PL, PL, PL, PL, PL, PL, PP, PL, PL],
  [PD, PD, PP, PD, PD, PD, PD, PD, PD, PD, DR, DR, DR, DR, PD, PD, PD, PD, PD, PD, PD, PP, PD, PD],
];

const narrowApt2Variants = [narrowApt2Story_v0, narrowApt2Story_v1, narrowApt2Story_v2];
const narrowApt3Variants = [narrowApt3Story_v0, narrowApt3Story_v1, narrowApt3Story_v0]; // v0 reused as v2

/** Get an apartment building sprite by type, story count, and variant. */
export function getApartmentSprite(type: "narrow" | "wide", stories?: number, variant?: number): SpriteData {
  const v = (variant ?? 0) % 3;
  if (type === "narrow") {
    if ((stories ?? 2) >= 3) return narrowApt3Variants[v] ?? narrowApt3Story_v0;
    return narrowApt2Variants[v] ?? narrowApt2Story_v0;
  }
  // Wide — only 1 variant set per story count for now
  if ((stories ?? 1) >= 2) return wideApt2Story_v0;
  return wideApt1Story_v0;
}

// --- Seasonal trees ---
// Birch: 20×36, Linden: 24×38, Ornamental: 16×24 — drawn at 2x scale
// Irregular canopies, visible branches, seasonal variants

/** Build a sprite procedurally: fill rects + individual pixels. */
function buildSprite(w: number, h: number, fn: (
  f: (x: number, y: number, rw: number, rh: number, c: string) => void,
  px: (x: number, y: number, c: string | null) => void,
) => void): SpriteData {
  const d: SpriteData = Array.from({ length: h }, () => Array(w).fill(null) as (string | null)[]);
  const f = (x: number, y: number, rw: number, rh: number, c: string) => {
    for (let dy = 0; dy < rh; dy++)
      for (let dx = 0; dx < rw; dx++)
        if (y + dy < h && x + dx < w) d[y + dy]![x + dx] = c;
  };
  const px = (x: number, y: number, c: string | null) => {
    if (y >= 0 && y < h && x >= 0 && x < w) d[y]![x] = c;
  };
  fn(f, px);
  return d;
}

// === BIRCH — white bark, dark marks, airy canopy (20×36) ===

const birchSummer = buildSprite(20, 36, (f, px) => {
  f(9,18,3,18,'#e8e0d0');
  f(9,18,3,1,'#ddddcc');
  px(9,22,'#555544'); px(10,26,'#555544'); px(11,30,'#555544');
  px(9,34,'#555544'); px(11,24,'#555544');
  f(7,20,2,1,'#ccc8b8'); f(12,22,2,1,'#ccc8b8');
  f(6,24,3,1,'#ccc8b8'); f(12,26,3,1,'#ccc8b8');
  f(6,4,10,4,'#55883a');
  f(4,6,14,4,'#448833');
  f(2,8,16,4,'#55993a');
  f(3,10,14,4,'#448833');
  f(5,12,12,3,'#55883a');
  f(4,14,10,3,'#448833');
  f(7,16,7,2,'#55993a');
  px(8,6,null); px(12,8,null); px(5,10,null); px(14,12,null);
  px(9,9,null); px(11,14,null); px(7,7,null);
  px(6,5,'#66aa44'); px(10,7,'#66aa44'); px(14,9,'#66aa44');
  px(4,11,'#66aa44'); px(12,13,'#66aa44');
});

const birchSpring = buildSprite(20, 36, (f, px) => {
  f(9,18,3,18,'#e8e0d0');
  px(9,22,'#555544'); px(10,26,'#555544'); px(11,30,'#555544');
  px(9,34,'#555544'); px(11,24,'#555544');
  f(7,20,2,1,'#ccc8b8'); f(12,22,2,1,'#ccc8b8');
  f(6,24,3,1,'#ccc8b8'); f(12,26,3,1,'#ccc8b8');
  f(6,6,9,3,'#88cc55');
  f(4,8,13,3,'#77bb44');
  f(5,11,11,3,'#88cc55');
  f(7,14,7,2,'#77bb44');
  px(8,7,null); px(12,9,null); px(6,10,null); px(14,11,null);
  px(10,8,null); px(7,13,null); px(13,12,null); px(9,6,null);
  px(11,7,null); px(5,9,null);
});

const birchAutumn = buildSprite(20, 36, (f, px) => {
  f(9,18,3,18,'#e8e0d0');
  px(9,22,'#555544'); px(10,26,'#555544'); px(11,30,'#555544');
  px(9,34,'#555544'); px(11,24,'#555544');
  f(7,20,2,1,'#ccc8b8'); f(12,22,2,1,'#ccc8b8');
  f(6,24,3,1,'#ccc8b8'); f(12,26,3,1,'#ccc8b8');
  f(6,4,10,4,'#ddbb33');
  f(4,6,14,4,'#ccaa22');
  f(2,8,16,4,'#ddbb33');
  f(3,10,14,4,'#ccaa22');
  f(5,12,12,3,'#ddbb33');
  f(4,14,10,3,'#bb9922');
  f(7,16,7,2,'#ccaa22');
  px(8,6,null); px(12,8,null); px(5,10,null); px(14,12,null);
  px(9,9,null); px(11,14,null); px(7,7,null);
  px(6,5,'#ee8833'); px(14,9,'#ee8833'); px(4,11,'#ee8833');
});

const birchWinter = buildSprite(20, 36, (f, px) => {
  f(9,18,3,18,'#e8e0d0');
  px(9,22,'#555544'); px(10,26,'#555544'); px(11,30,'#555544');
  px(9,34,'#555544'); px(11,24,'#555544');
  f(7,18,2,1,'#ccc8b8'); f(12,20,2,1,'#ccc8b8');
  f(6,22,3,1,'#bbb8a8'); f(12,24,3,1,'#bbb8a8');
  px(8,10,'#bbb8a8'); px(7,8,'#bbb8a8'); px(6,6,'#aaa898');
  px(12,10,'#bbb8a8'); px(13,8,'#bbb8a8'); px(14,6,'#aaa898');
  px(10,6,'#bbb8a8'); px(10,4,'#aaa898');
  px(5,12,'#bbb8a8'); px(15,12,'#bbb8a8');
  px(9,8,'#ccc8b8'); px(11,8,'#ccc8b8');
  px(6,5,'#ffffff'); px(14,5,'#ffffff'); px(10,3,'#ffffff');
  px(5,11,'#eeeeff'); px(15,11,'#eeeeff');
});

// === LINDEN — thick trunk, wide spreading canopy (24×38) ===

const lindenSummer = buildSprite(24, 38, (f, px) => {
  f(10,22,5,16,'#775533');
  f(9,24,7,2,'#664422');
  f(8,36,9,2,'#664422');
  f(4,2,6,4,'#337722');
  f(10,0,8,4,'#448833');
  f(2,4,20,4,'#337722');
  f(0,8,24,4,'#448833');
  f(1,12,22,4,'#337722');
  f(2,16,20,4,'#448833');
  f(4,20,16,3,'#337722');
  f(6,6,4,4,'#2a6618');
  f(14,8,4,4,'#2a6618');
  f(8,14,6,3,'#2a6618');
  px(4,3,'#55993a'); px(16,2,'#55993a'); px(2,10,'#55993a');
  px(20,10,'#55993a'); px(10,5,'#55993a');
});

const lindenSpring = buildSprite(24, 38, (f, px) => {
  f(10,22,5,16,'#775533');
  f(9,24,7,2,'#664422');
  f(8,36,9,2,'#664422');
  f(5,4,5,3,'#88cc55');
  f(12,2,6,3,'#77bb44');
  f(2,6,20,3,'#88cc55');
  f(1,9,22,3,'#77bb44');
  f(3,12,18,3,'#88cc55');
  f(5,15,14,3,'#77bb44');
  f(7,18,10,2,'#88cc55');
  px(8,7,null); px(14,8,null); px(4,10,null); px(18,11,null);
  px(11,6,null); px(6,13,null); px(16,14,null);
  px(6,5,'#ffffaa'); px(16,4,'#ffffaa'); px(10,8,'#ffffaa');
});

const lindenAutumn = buildSprite(24, 38, (f, px) => {
  f(10,22,5,16,'#775533');
  f(9,24,7,2,'#664422');
  f(8,36,9,2,'#664422');
  f(4,2,6,4,'#dd8833');
  f(10,0,8,4,'#cc7722');
  f(2,4,20,4,'#dd8833');
  f(0,8,24,4,'#cc7722');
  f(1,12,22,4,'#dd8833');
  f(2,16,20,4,'#bb6622');
  f(4,20,16,3,'#cc7722');
  f(6,6,4,4,'#aa5511');
  f(14,8,4,4,'#aa5511');
  f(8,14,6,3,'#aa5511');
  px(4,3,'#cc4422'); px(18,5,'#cc4422'); px(2,10,'#cc4422');
});

const lindenWinter = buildSprite(24, 38, (f, px) => {
  f(10,22,5,16,'#775533');
  f(9,24,7,2,'#664422');
  f(8,36,9,2,'#664422');
  f(9,16,2,6,'#886644'); f(14,16,2,6,'#886644');
  px(7,14,'#886644'); px(8,12,'#886644'); px(7,10,'#775533');
  px(6,8,'#775533'); px(5,6,'#664422');
  px(16,14,'#886644'); px(17,12,'#886644'); px(18,10,'#775533');
  px(19,8,'#775533'); px(20,6,'#664422');
  px(11,14,'#886644'); px(11,10,'#775533'); px(11,6,'#664422');
  px(11,4,'#664422'); px(12,2,'#554411');
  px(4,8,'#664422'); px(3,6,'#554411');
  px(21,8,'#664422'); px(22,6,'#554411');
  px(5,5,'#ffffff'); px(12,1,'#ffffff'); px(20,5,'#ffffff');
  px(4,7,'#eeeeff'); px(22,5,'#eeeeff');
});

// === ORNAMENTAL — small, bushy, in a planter (16×24) ===

const ornamentalSummer = buildSprite(16, 24, (f, px) => {
  f(3,20,10,4,'#aa8866');
  f(2,20,12,1,'#997755');
  f(7,14,2,6,'#886644');
  f(4,2,8,4,'#448833');
  f(2,4,12,4,'#337722');
  f(1,6,14,4,'#448833');
  f(2,8,12,4,'#337722');
  f(3,10,10,3,'#448833');
  f(5,12,6,2,'#337722');
  px(4,3,'#55993a'); px(10,5,'#55993a'); px(6,9,'#55993a');
});

const ornamentalSpring = buildSprite(16, 24, (f, px) => {
  f(3,20,10,4,'#aa8866');
  f(2,20,12,1,'#997755');
  f(7,14,2,6,'#886644');
  f(4,4,8,3,'#88cc55');
  f(2,6,12,3,'#77bb44');
  f(3,8,10,3,'#88cc55');
  f(5,10,6,3,'#77bb44');
  px(4,3,'#ffaacc'); px(8,2,'#ffaacc'); px(12,4,'#ffaacc');
  px(2,7,'#ffaacc'); px(10,6,'#ffaacc'); px(6,5,'#ff88aa');
  px(14,8,'#ffaacc'); px(4,10,'#ff88aa');
});

const ornamentalAutumn = buildSprite(16, 24, (f, px) => {
  f(3,20,10,4,'#aa8866');
  f(2,20,12,1,'#997755');
  f(7,14,2,6,'#886644');
  f(4,2,8,4,'#cc4422');
  f(2,4,12,4,'#bb3311');
  f(1,6,14,4,'#cc4422');
  f(2,8,12,4,'#aa3322');
  f(3,10,10,3,'#cc4422');
  f(5,12,6,2,'#aa3322');
  px(4,3,'#dd6633'); px(10,5,'#dd6633'); px(6,9,'#dd6633');
});

const ornamentalWinter = buildSprite(16, 24, (f, px) => {
  f(3,20,10,4,'#aa8866');
  f(2,20,12,1,'#997755');
  f(3,19,10,2,'#eeeeff');
  f(7,14,2,6,'#886644');
  px(6,12,'#886644'); px(5,10,'#775533'); px(4,8,'#664422');
  px(3,6,'#664422');
  px(8,12,'#886644'); px(9,10,'#775533'); px(10,8,'#664422');
  px(11,6,'#664422'); px(12,4,'#554411');
  px(7,8,'#775533'); px(7,6,'#664422'); px(7,4,'#554411');
  px(3,5,'#ffffff'); px(12,3,'#ffffff'); px(7,3,'#eeeeff');
});

// Seasonal lookup tables
const birchTrees: Record<Season, SpriteData> = {
  spring: birchSpring, summer: birchSummer, autumn: birchAutumn, winter: birchWinter,
};
const lindenTrees: Record<Season, SpriteData> = {
  spring: lindenSpring, summer: lindenSummer, autumn: lindenAutumn, winter: lindenWinter,
};
const ornamentalTrees: Record<Season, SpriteData> = {
  spring: ornamentalSpring, summer: ornamentalSummer, autumn: ornamentalAutumn, winter: ornamentalWinter,
};

/** Get a tree sprite by variant (0=birch, 1=linden, 2=ornamental) and season. */
export function getTreeSprite(variant: 0 | 1 | 2, season: Season): SpriteData {
  const tables = [birchTrees, lindenTrees, ornamentalTrees];
  return tables[variant]![season];
}

// --- Flower color palettes ---

/** Get flower dot colors for a season. Returns null for winter (no flowers). */
export function getFlowerColors(season: Season): string[] | null {
  switch (season) {
    case "spring": return ["#ff88aa", "#ffdd55", "#ffffff"];
    case "summer": return ["#ff4466", "#ffcc00", "#aa55ff", "#ffffff"];
    case "autumn": return ["#aa8855", "#887744"];
    case "winter": return null;
  }
}
