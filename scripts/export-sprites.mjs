#!/usr/bin/env node
/**
 * Export all game sprites as SVGs + a single reference HTML doc.
 * Output: ~/Downloads/pixel-sprite-system/
 */

import { readFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const OUT = join(process.env.HOME, "Downloads", "pixel-sprite-system");
mkdirSync(join(OUT, "sprites", "characters"), { recursive: true });
mkdirSync(join(OUT, "sprites", "items-belarus"), { recursive: true });
mkdirSync(join(OUT, "sprites", "items-ethiopia"), { recursive: true });
mkdirSync(join(OUT, "sprites", "environment"), { recursive: true });
mkdirSync(join(OUT, "sprites", "structures"), { recursive: true });
mkdirSync(join(OUT, "sprites", "vehicles"), { recursive: true });
mkdirSync(join(OUT, "sprites", "ui"), { recursive: true });

// ─── Color palettes ───────────────────────────────────────────────
const BELARUS_PALETTE = {
  CR: "#cc3333", CB: "#992222", TS: "#22b5a0", PF: "#ff6b9d",
  YF: "#ffcc44", CT: "#cc9955", CP: "#bb8844", FB: "#886644",
  FL: "#aa8855", SK: "#f5c99a", BP: "#8855aa", BD: "#664488",
  BS: "#f0c090", SB: "#cc9933", MY: "#ddcc33", MD: "#ccbb22",
  WB: "#88ccdd", PB: "#c4944a", PD: "#b8883e", PS: "#a87830",
  HG: "#ffee88", GG: "#556644", GR: "#668855", GB: "#77aa55",
  BT: "#887766", BL: "#998877", BM: "#776655", AT: "#aa9977",
  DB: "#664422", BK: "#000000", WH: "#ffffff", WE: "#eeeeee",
  LB: "#aaddff", DG: "#555555", LG: "#999999", RD: "#cc2222",
  DR: "#991111", GN: "#449944", DK: "#336633", YL: "#ddaa22",
  OG: "#cc7733", BN: "#8B5E3C", LN: "#c4a882", PP: "#9944bb",
  GD: "#ddbb44",
  // Shop interior
  SW: "#d4c8b0", SS: "#c4b8a0", FG: "#998888", TL: "#aa9999",
  FT: "#887777", SH: "#996633", SD: "#884422", SL: "#aa7744",
  KT: "#bbaa88", MS: "#8899aa", ML: "#99aabb", EG: "#33aa44",
  ED: "#228833", LR: "#cc4444", LD: "#aa3333", AW: "#ddddd0",
  RG2: "#777766", RS: "#99aa88", FC: "#eeeedd", FW: "#ffffee",
  DF: "#775533", GL: "#aaccdd", GH: "#bbddee", KB: "#6688bb",
  DV: "#667766", DW: "#778877", DX: "#556655", BR: "#ccaa44",
};

const ETHIOPIA_PALETTE = {
  SD: "#8b5e3c", BK: "#000000", WH: "#ffffff", AO: "#dd7722",
  AG: "#448844", AD: "#336633", GD: "#ffcc44", SB: "#cc9933",
  TB: "#3355aa", TW: "#ddddee", WB: "#88ccdd", DG: "#555555",
  LG: "#999999", BG: "#a8b858", BH: "#b5c462", BS: "#98a84c",
  BC: "#8da048", HG: "#ddaa44", CT: "#d4a574", CM: "#b89060",
  DW: "#5c3a1e", LW: "#6b4428", TN: "#8899aa", TR: "#c4724a",
  TD: "#a85e3a", WC: "#eeeedd", CD: "#3a2211", GW: "#ddaa44",
  WE: "#eeeeee", NW: "#eee8dd", BR: "#cc3311", IG: "#c4b8a4",
  ID: "#a49884", LR: "#cc6633", BP: "#882244", GP: "#44882a",
  SG: "#ddcc88", IA: "#ddc088", MY: "#ffaa22", MB: "#ee6633",
  BN: "#8b6633", TT: "#ccaa77", RD: "#cc2222", EG: "#e8d5b5",
};

// ─── Parse sprite arrays from source ──────────────────────────────
function parseSpritesFromFile(filepath, palette) {
  const src = readFileSync(filepath, "utf-8");
  const sprites = {};

  // Match exported const sprites (simple 2D arrays, not IIFEs)
  const exportRe = /export const (\w+):\s*SpriteData\s*=\s*\[([\s\S]*?)\];\s*(?=\n(?:export|\/\/|import|const\s+item|\n|$))/g;
  let m;
  while ((m = exportRe.exec(src)) !== null) {
    const name = m[1];
    const body = m[2];
    try {
      const data = parseArray(body, palette);
      if (data.length > 0) sprites[name] = data;
    } catch (e) {
      // skip computed sprites (IIFEs)
    }
  }
  return sprites;
}

function parseArray(body, palette) {
  const rows = [];
  // Match each row: [...],
  const rowRe = /\[([^\]]*)\]/g;
  let rm;
  while ((rm = rowRe.exec(body)) !== null) {
    const cells = rm[1].split(",").map(c => {
      c = c.trim();
      if (c === "_" || c === "null" || c === "") return null;
      // Quoted hex
      if (c.startsWith('"') || c.startsWith("'")) return c.replace(/['"]/g, "");
      // Palette variable
      if (palette[c]) return palette[c];
      return null;
    });
    rows.push(cells);
  }
  return rows;
}

// ─── SVG generation ───────────────────────────────────────────────
function spriteToSvg(data, scale = 8, label = "") {
  const h = data.length;
  const w = Math.max(...data.map(r => r.length));
  const svgW = w * scale;
  const svgH = h * scale;
  let rects = "";
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < (data[y]?.length ?? 0); x++) {
      const c = data[y][x];
      if (!c) continue;
      rects += `  <rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${c}"/>\n`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" shape-rendering="crispEdges">
  <title>${label}</title>
  <rect width="${svgW}" height="${svgH}" fill="none"/>
${rects}</svg>`;
}

function spriteToInlineSvg(data, scale = 6) {
  const h = data.length;
  const w = Math.max(...data.map(r => r.length));
  const svgW = w * scale;
  const svgH = h * scale;
  let rects = "";
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < (data[y]?.length ?? 0); x++) {
      const c = data[y][x];
      if (!c) continue;
      rects += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${c}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" style="image-rendering:pixelated">${rects}</svg>`;
}

// ─── Parse all sprites ────────────────────────────────────────────
const projRoot = new URL("..", import.meta.url).pathname;
const belarusSprites = parseSpritesFromFile(join(projRoot, "src/engine/sprites.ts"), BELARUS_PALETTE);
const ethiopiaSprites = parseSpritesFromFile(join(projRoot, "src/engine/sprites_ethiopia.ts"), ETHIOPIA_PALETTE);

// ─── Categorize and name sprites ──────────────────────────────────
const categories = {
  characters: {
    chadIdle: { data: belarusSprites.chadIdle, label: "Chad — Idle", dims: "16×24", skin: "Belarus" },
    chadWalk1: { data: belarusSprites.chadWalk1, label: "Chad — Walk 1", dims: "16×24", skin: "Belarus" },
    chadWalk2: { data: belarusSprites.chadWalk2, label: "Chad — Walk 2", dims: "16×24", skin: "Belarus" },
    chadJump: { data: belarusSprites.chadJump, label: "Chad — Jump", dims: "16×24", skin: "Belarus" },
    babushkaSprite: { data: belarusSprites.babushkaSprite, label: "Babushka (NPC)", dims: "14×23", skin: "Belarus" },
    shopkeeperSprite: { data: belarusSprites.shopkeeperSprite, label: "Shopkeeper", dims: "14×22", skin: "Belarus" },
    shopkeeperBabushkaSprite: { data: belarusSprites.shopkeeperBabushkaSprite, label: "Shopkeeper Babushka (Interior)", dims: "24×31", skin: "Belarus" },
    auntieSprite: { data: ethiopiaSprites.auntieSprite, label: "Auntie (NPC)", dims: "14×23", skin: "Ethiopia" },
  },
  vehicles: {
    marshrutkaSprite: { data: belarusSprites.marshrutkaSprite, label: "Marshrutka (Bus)", dims: "32×20", skin: "Belarus" },
    blueTaxiSprite: { data: ethiopiaSprites.blueTaxiSprite, label: "Blue Taxi", dims: "28×18", skin: "Ethiopia" },
  },
  "items-belarus": {
    smetanaTubSprite: { data: belarusSprites.smetanaTubSprite, label: "Smetana Tub", dims: "16×13" },
    kefirBottleSprite: { data: belarusSprites.kefirBottleSprite, label: "Kefir Bottle", dims: "16×13" },
    kolbasaLinkSprite: { data: belarusSprites.kolbasaLinkSprite, label: "Kolbasa Link", dims: "16×13" },
    pickleJarSprite: { data: belarusSprites.pickleJarSprite, label: "Pickle Jar", dims: "16×13" },
    breadLoafSprite: { data: belarusSprites.breadLoafSprite, label: "Bread Loaf", dims: "16×13" },
    mysteryCanSprite: { data: belarusSprites.mysteryCanSprite, label: "Mystery Can", dims: "16×13" },
    sunflowerSeedsSprite: { data: belarusSprites.sunflowerSeedsSprite, label: "Sunflower Seeds", dims: "16×13" },
    molokoCartonSprite: { data: belarusSprites.molokoCartonSprite, label: "Moloko Carton", dims: "16×13" },
    chaiBoxSprite: { data: belarusSprites.chaiBoxSprite, label: "Chai Box", dims: "16×13" },
    sakharBagSprite: { data: belarusSprites.sakharBagSprite, label: "Sakhar Bag", dims: "16×13" },
    masloButterSprite: { data: belarusSprites.masloButterSprite, label: "Maslo Butter", dims: "16×13" },
    yablokoAppleSprite: { data: belarusSprites.yablokoAppleSprite, label: "Yabloko Apple", dims: "16×13" },
    kartoshkaSprite: { data: belarusSprites.kartoshkaSprite, label: "Kartoshka (Potato)", dims: "16×13" },
    rybaFishSprite: { data: belarusSprites.rybaFishSprite, label: "Ryba Fish", dims: "16×13" },
    hlebRyeSprite: { data: belarusSprites.hlebRyeSprite, label: "Hleb Rye", dims: "16×13" },
    syrCheeseSprite: { data: belarusSprites.syrCheeseSprite, label: "Syr Cheese Wedge", dims: "16×13" },
    vodkaBottleSprite: { data: belarusSprites.vodkaBottleSprite, label: "Vodka Bottle", dims: "16×13" },
    konfetaCandySprite: { data: belarusSprites.konfetaCandySprite, label: "Konfeta Candy", dims: "16×13" },
    ogurtsyCukeSprite: { data: belarusSprites.ogurtsyCukeSprite, label: "Ogurtsy Cucumber", dims: "16×13" },
    tarelkaPlateSprite: { data: belarusSprites.tarelkaPlateSprite, label: "Tarelka Plate", dims: "16×13" },
    lozhkaSpoonSprite: { data: belarusSprites.lozhkaSpoonSprite, label: "Lozhka Spoon", dims: "16×13" },
    chashkaCupSprite: { data: belarusSprites.chashkaCupSprite, label: "Chashka Cup", dims: "16×13" },
    podushkaPillowSprite: { data: belarusSprites.podushkaPillowSprite, label: "Podushka Pillow (Decoy)", dims: "16×13" },
    chasyClock: { data: belarusSprites.chasyClock, label: "Chasy Clock (Decoy)", dims: "16×13" },
    myloSoapSprite: { data: belarusSprites.myloSoapSprite, label: "Mylo Soap (Decoy)", dims: "16×13" },
    pultRemoteSprite: { data: belarusSprites.pultRemoteSprite, label: "Pult Remote (Decoy)", dims: "16×13" },
    syrWheelSprite: { data: belarusSprites.syrWheelSprite, label: "Syr Wheel", dims: "16×13" },
    rybaSmokedSprite: { data: belarusSprites.rybaSmokedSprite, label: "Ryba Smoked", dims: "16×13" },
    slivkiJarSprite: { data: belarusSprites.slivkiJarSprite, label: "Slivki Jar", dims: "16×13" },
    gribBasketSprite: { data: belarusSprites.gribBasketSprite, label: "Grib Basket", dims: "16×13" },
    kolbasaRingSprite: { data: belarusSprites.kolbasaRingSprite, label: "Kolbasa Ring (Decoy)", dims: "16×13" },
    kvassBottleSprite: { data: belarusSprites.kvassBottleSprite, label: "Kvass Bottle (Decoy)", dims: "16×13" },
  },
  "items-ethiopia": {
    bunaBagSprite: { data: ethiopiaSprites.bunaBagSprite, label: "Buna Bag", dims: "16×13" },
    wetetJugSprite: { data: ethiopiaSprites.wetetJugSprite, label: "Wetet Jug", dims: "16×13" },
    daboRoundSprite: { data: ethiopiaSprites.daboRoundSprite, label: "Dabo Round", dims: "16×13" },
    sukwarBagEthSprite: { data: ethiopiaSprites.sukwarBagEthSprite, label: "Sukwar Bag", dims: "16×13" },
    berbereTinSprite: { data: ethiopiaSprites.berbereTinSprite, label: "Berbere Tin", dims: "16×13" },
    teffSackSprite: { data: ethiopiaSprites.teffSackSprite, label: "Teff Sack", dims: "16×13" },
    mangoSprite: { data: ethiopiaSprites.mangoSprite, label: "Mango", dims: "16×13" },
    bottledWaterSprite: { data: ethiopiaSprites.bottledWaterSprite, label: "Bottled Water", dims: "16×13" },
    shiroBagSprite: { data: ethiopiaSprites.shiroBagSprite, label: "Shiro Bag", dims: "16×13" },
    qibeJarSprite: { data: ethiopiaSprites.qibeJarSprite, label: "Qibe Jar", dims: "16×13" },
    timatimSprite: { data: ethiopiaSprites.timatimSprite, label: "Timatim Tomato", dims: "16×13" },
    injeraRollSprite: { data: ethiopiaSprites.injeraRollSprite, label: "Injera Roll", dims: "16×13" },
    honeyJarSprite: { data: ethiopiaSprites.honeyJarSprite, label: "Honey Jar", dims: "16×13" },
    avocadoSprite: { data: ethiopiaSprites.avocadoSprite, label: "Avocado", dims: "16×13" },
    miserBagSprite: { data: ethiopiaSprites.miserBagSprite, label: "Miser Bag (Lentils)", dims: "16×13" },
    qeySirBeetSprite: { data: ethiopiaSprites.qeySirBeetSprite, label: "Qey Sir Beet", dims: "16×13" },
    karyaPepperSprite: { data: ethiopiaSprites.karyaPepperSprite, label: "Karya Pepper", dims: "16×13" },
    jebenaPotSprite: { data: ethiopiaSprites.jebenaPotSprite, label: "Jebena Pot", dims: "16×13" },
    rekbotCupSprite: { data: ethiopiaSprites.rekbotCupSprite, label: "Rekbot Cup", dims: "16×13" },
    itanIncenseSprite: { data: ethiopiaSprites.itanIncenseSprite, label: "Itan Incense", dims: "16×13" },
    koloBowlSprite: { data: ethiopiaSprites.koloBowlSprite, label: "Kolo Bowl", dims: "16×13" },
    eggSprite: { data: ethiopiaSprites.eggSprite, label: "Egg", dims: "16×13" },
    teaCupSprite: { data: ethiopiaSprites.teaCupSprite, label: "Tea Cup", dims: "16×13" },
  },
  structures: {
    apartmentSprite: { data: belarusSprites.apartmentSprite, label: "Apartment Gate", dims: "32×24", skin: "Belarus" },
    shopExteriorSprite: { data: belarusSprites.shopExteriorSprite, label: "Shop Exterior", dims: "32×24", skin: "Belarus" },
    bunaBetSprite: { data: ethiopiaSprites.bunaBetSprite, label: "Buna Bet (Coffee House)", dims: "32×24", skin: "Ethiopia" },
    doorFrontSprite: { data: belarusSprites.doorFrontSprite, label: "Door (Front)", dims: "16×40", skin: "Shared" },
    doorBackSprite: { data: belarusSprites.doorBackSprite, label: "Door (Back/Exit)", dims: "16×40", skin: "Shared" },
  },
  environment: {
    groundTile: { data: belarusSprites.groundTile, label: "Ground Tile", dims: "16×16", skin: "Belarus" },
    platformTile: { data: belarusSprites.platformTile, label: "Platform Tile (Brick)", dims: "16×8", skin: "Belarus" },
    cobblestoneGround: { data: ethiopiaSprites.cobblestoneGround, label: "Cobblestone Ground", dims: "16×16", skin: "Ethiopia" },
    woodTinPlatform: { data: ethiopiaSprites.woodTinPlatform, label: "Wood/Tin Platform", dims: "16×8", skin: "Ethiopia" },
    potatoSprite: { data: belarusSprites.potatoSprite, label: "Sacred Potato", dims: "16×13", skin: "Belarus" },
    coffeeBeanSprite: { data: ethiopiaSprites.coffeeBeanSprite, label: "Sacred Coffee Bean", dims: "16×13", skin: "Ethiopia" },
    shelfWoodSprite: { data: belarusSprites.shelfWoodSprite, label: "Wood Shelf", dims: "32×8", skin: "Shared" },
    shelfMetalSprite: { data: belarusSprites.shelfMetalSprite, label: "Metal Shelf", dims: "32×8", skin: "Shared" },
  },
  ui: {
    doorLockedOverlay: { data: belarusSprites.doorLockedOverlay, label: "Door Lock (Padlock)", dims: "10×8", skin: "Shared" },
    exitSignSprite: { data: belarusSprites.exitSignSprite, label: "Exit Sign (ВЫХОД)", dims: "20×8", skin: "Shared" },
  },
};

// ─── Write individual SVGs ────────────────────────────────────────
let totalSprites = 0;
for (const [cat, sprites] of Object.entries(categories)) {
  for (const [key, info] of Object.entries(sprites)) {
    if (!info.data) { console.warn(`  SKIP (no data): ${key}`); continue; }
    const svg = spriteToSvg(info.data, 8, info.label);
    const fname = key.replace(/Sprite$/, "").replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, "") + ".svg";
    writeFileSync(join(OUT, "sprites", cat, fname), svg);
    totalSprites++;
  }
}

// ─── Generate master HTML reference ───────────────────────────────
function paletteTable(palette, name) {
  let rows = "";
  for (const [k, v] of Object.entries(palette)) {
    rows += `<tr><td><code>${k}</code></td><td><div class="swatch" style="background:${v}"></div></td><td><code>${v}</code></td></tr>`;
  }
  return `<h3>${name} Palette</h3><table class="palette"><tr><th>Key</th><th>Color</th><th>Hex</th></tr>${rows}</table>`;
}

function spriteSectionHtml(cat, sprites) {
  let cards = "";
  for (const [key, info] of Object.entries(sprites)) {
    if (!info.data) continue;
    const svg = spriteToInlineSvg(info.data, 5);
    const skin = info.skin ? `<span class="badge ${info.skin.toLowerCase()}">${info.skin}</span>` : "";
    cards += `
      <div class="card">
        <div class="sprite-preview">${svg}</div>
        <div class="info">
          <strong>${info.label}</strong> ${skin}
          <div class="dims">${info.dims} logical &rarr; ${info.dims.replace(/(\d+)×(\d+)/, (_, w, h) => `${w*2}×${h*2}`)} drawn</div>
        </div>
      </div>`;
  }
  const catTitle = cat.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return `<section><h2>${catTitle}</h2><div class="grid">${cards}</div></section>`;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pixel Sprite System Reference</title>
<style>
  :root { --bg: #1a1a2e; --surface: #222244; --text: #e0e0e0; --muted: #888; --accent: #ffcc44; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "SF Mono", "Fira Code", monospace; background: var(--bg); color: var(--text); padding: 2rem; }
  h1 { color: var(--accent); margin-bottom: .5rem; font-size: 1.6rem; }
  h1 + p { color: var(--muted); margin-bottom: 2rem; font-size: .85rem; }
  h2 { color: var(--accent); margin: 2rem 0 1rem; border-bottom: 1px solid #333; padding-bottom: .3rem; font-size: 1.2rem; }
  h3 { color: #aaa; margin: 1.5rem 0 .5rem; font-size: 1rem; }
  section { margin-bottom: 2rem; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  .card { background: var(--surface); border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; align-items: center; gap: .5rem; }
  .sprite-preview { background: repeating-conic-gradient(#2a2a4a 0% 25%, #1e1e3a 0% 50%) 50%/16px 16px; padding: 8px; border-radius: 4px; display: flex; align-items: center; justify-content: center; min-height: 80px; }
  .sprite-preview svg { image-rendering: pixelated; }
  .info { text-align: center; font-size: .8rem; }
  .dims { color: var(--muted); font-size: .7rem; margin-top: .2rem; }
  .badge { font-size: .6rem; padding: 1px 6px; border-radius: 3px; vertical-align: middle; }
  .badge.belarus { background: #8855aa33; color: #bb88dd; border: 1px solid #8855aa55; }
  .badge.ethiopia { background: #dd772233; color: #ffaa44; border: 1px solid #dd772255; }
  .badge.shared { background: #88ccdd22; color: #88ccdd; border: 1px solid #88ccdd33; }

  /* System docs */
  .sys { background: var(--surface); border-radius: 8px; padding: 1.5rem; margin: 1rem 0; font-size: .85rem; line-height: 1.6; }
  .sys code { background: #1a1a2e; padding: 1px 4px; border-radius: 3px; font-size: .8rem; }
  .sys table { border-collapse: collapse; width: 100%; margin: .5rem 0; }
  .sys th, .sys td { text-align: left; padding: 4px 8px; border-bottom: 1px solid #333; }
  .sys th { color: var(--accent); font-size: .75rem; text-transform: uppercase; }
  .sys td { font-size: .8rem; }

  /* Room diagram */
  .room-diagram { background: #1a1a2e; border: 1px solid #333; border-radius: 4px; padding: 1rem; margin: 1rem 0; position: relative; }
  .room-diagram svg { width: 100%; height: auto; }

  /* Palette */
  .palette { margin: .5rem 0; }
  .palette td, .palette th { padding: 3px 8px; font-size: .75rem; }
  .swatch { width: 24px; height: 16px; border-radius: 2px; border: 1px solid #444; display: inline-block; }

  .cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  @media (max-width: 800px) { .cols-2 { grid-template-columns: 1fr; } }

  /* TOC */
  .toc { background: var(--surface); border-radius: 8px; padding: 1rem 1.5rem; margin: 1rem 0; }
  .toc a { color: var(--accent); text-decoration: none; font-size: .85rem; }
  .toc a:hover { text-decoration: underline; }
  .toc ul { list-style: none; padding-left: 1rem; }
  .toc > ul { padding: 0; }
  .toc li { margin: .3rem 0; }
</style>
</head>
<body>

<h1>Pixel Sprite System Reference</h1>
<p>Complete sprite catalog with room geometry, scale system, and rendering pipeline. Extracted from game source. ${totalSprites} sprites total.</p>

<nav class="toc">
  <strong>Contents</strong>
  <ul>
    <li><a href="#system">The System</a> &mdash; coordinates, scale, rendering</li>
    <li><a href="#room">Room &amp; Camera</a> &mdash; viewport, world, ground level</li>
    <li><a href="#layout">Run Layout</a> &mdash; platforms, hazards, segments</li>
    <li><a href="#animation">Animation</a> &mdash; walk cycle, bob, blink, transitions</li>
    <li><a href="#palettes">Color Palettes</a></li>
    <li><a href="#sprites">All Sprites</a></li>
  </ul>
</nav>

<!-- ═══ THE SYSTEM ═══ -->
<section id="system">
<h2>The System</h2>
<div class="sys">
<h3>Sprite Data Format</h3>
<p>Every sprite is a 2D array of hex color strings or <code>null</code> (transparent). Each cell = 1 logical pixel.</p>
<pre><code>type SpriteData = (string | null)[][];</code></pre>

<h3>Scale &amp; Rendering</h3>
<p>All sprites render at <strong>2&times; scale</strong>. A 16&times;13 logical sprite draws as 32&times;26 canvas pixels. Each logical pixel becomes a <code>fillRect(x, y, 2, 2)</code> call.</p>

<table>
<tr><th>What</th><th>Formula</th></tr>
<tr><td>Drawn width</td><td><code>logicalWidth &times; scale</code> (scale = 2)</td></tr>
<tr><td>Drawn height</td><td><code>logicalHeight &times; scale</code></td></tr>
<tr><td>Pixel render</td><td><code>ctx.fillRect(x + col*scale, y + row*scale, scale, scale)</code></td></tr>
<tr><td>Horizontal flip</td><td><code>drawCol = spriteWidth - 1 - col</code></td></tr>
</table>

<h3>Coordinate System</h3>
<table>
<tr><td>Origin</td><td>Top-left (0, 0)</td></tr>
<tr><td>X axis</td><td>Increases rightward</td></tr>
<tr><td>Y axis</td><td>Increases downward</td></tr>
<tr><td>Camera</td><td>Horizontal scroll only (X-axis)</td></tr>
</table>

<h3>Render Order (Back to Front)</h3>
<ol style="padding-left:1.5rem;margin:.5rem 0">
<li>Sky / interior walls &amp; ceiling</li>
<li>Star field (parallax 0.3&times;, night only)</li>
<li>Ground tiles (tiled)</li>
<li>Platform tiles (tiled)</li>
<li>Doors &amp; building facades</li>
<li>Collectible items (with labels)</li>
<li>Sacred item (with bob animation)</li>
<li>Shopkeeper &amp; counter (interior)</li>
<li>NPCs (babushkas / aunties)</li>
<li>Vehicles (marshrutkas / taxis)</li>
<li>Gate building</li>
<li>Player (with invincibility blink)</li>
<li>HUD (score, items, prompts)</li>
<li>Transition overlay (fade)</li>
</ol>
</div>
</section>

<!-- ═══ ROOM & CAMERA ═══ -->
<section id="room">
<h2>Room &amp; Camera</h2>
<div class="sys">
<table>
<tr><th>Property</th><th>Value</th><th>Notes</th></tr>
<tr><td>Canvas (viewport)</td><td><code>800 &times; 450</code> px</td><td>Logical resolution, CSS-scaled to fill container</td></tr>
<tr><td>World width</td><td><code>3200</code> px (L1-5), <code>3400</code> px (L6)</td><td>Scrolls horizontally</td></tr>
<tr><td>Ground Y</td><td><code>410</code></td><td>Top of ground tile row</td></tr>
<tr><td>Ground height</td><td><code>40</code> px (full width)</td><td>Fills viewport bottom</td></tr>
<tr><td>Player spawn Y</td><td><code>362</code></td><td>GROUND_Y - 48 (sprite height)</td></tr>
<tr><td>Vehicle Y</td><td><code>370</code></td><td>GROUND_Y - 40</td></tr>
<tr><td>Camera target X</td><td><code>player.x - 800/3</code></td><td>Player in left third of viewport</td></tr>
<tr><td>Camera clamp</td><td><code>[0, worldWidth - 800]</code></td><td>Prevents seeing past level bounds</td></tr>
<tr><td>Interior width</td><td><code>350-400</code> px</td><td>Single viewport, no scroll</td></tr>
</table>

<div class="room-diagram">
  <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" style="background:#1a1a2e">
    <!-- Stars -->
    <circle cx="120" cy="40" r="1" fill="#fff" opacity=".6"/>
    <circle cx="350" cy="80" r="1" fill="#fff" opacity=".4"/>
    <circle cx="600" cy="30" r="1" fill="#fff" opacity=".7"/>
    <circle cx="720" cy="90" r="1" fill="#fff" opacity=".3"/>
    <circle cx="200" cy="120" r="1" fill="#fff" opacity=".5"/>
    <circle cx="500" cy="60" r="1" fill="#fff" opacity=".6"/>

    <!-- Platforms -->
    <rect x="180" y="320" width="120" height="12" fill="#887766" rx="1"/>
    <rect x="400" y="280" width="100" height="12" fill="#887766" rx="1"/>
    <rect x="580" y="340" width="80"  height="12" fill="#887766" rx="1"/>

    <!-- Sacred potato platform -->
    <rect x="320" y="200" width="80" height="12" fill="#887766" rx="1"/>
    <rect x="344" y="182" width="32" height="26" fill="#c4944a" rx="2" opacity=".8"/>
    <text x="360" y="176" fill="#ffee88" font-size="8" text-anchor="middle" font-family="monospace">Sacred Item</text>

    <!-- Items on platforms -->
    <rect x="200" y="306" width="16" height="12" fill="#ffcc44" rx="1"/>
    <rect x="230" y="306" width="16" height="12" fill="#cc2222" rx="1"/>
    <rect x="420" y="266" width="16" height="12" fill="#449944" rx="1"/>

    <!-- Gate building -->
    <rect x="680" y="362" width="64" height="48" fill="#aa9977" rx="2"/>
    <rect x="702" y="386" width="12" height="24" fill="#664422"/>
    <text x="712" y="358" fill="#fff" font-size="7" text-anchor="middle" font-family="monospace">КВАРТИРА</text>

    <!-- Ground -->
    <rect x="0" y="410" width="800" height="40" fill="#556644"/>
    <line x1="0" y1="410" x2="800" y2="410" stroke="#668855" stroke-width="2"/>

    <!-- Player (Chad) -->
    <rect x="255" y="362" width="32" height="48" fill="#22b5a0" rx="2"/>
    <rect x="259" y="354" width="24" height="10" fill="#cc3333" rx="2"/>
    <text x="271" y="350" fill="#fff" font-size="7" text-anchor="middle" font-family="monospace">Chad</text>

    <!-- Babushka NPC -->
    <rect x="460" y="366" width="28" height="44" fill="#8855aa" rx="2"/>
    <text x="474" y="362" fill="#ff0000" font-size="7" text-anchor="middle" font-family="monospace">ГДЕ ПРОДУКТЫ?!</text>

    <!-- Marshrutka -->
    <rect x="80" y="374" width="64" height="36" fill="#ddcc33" rx="2"/>
    <text x="112" y="396" fill="#000" font-size="6" text-anchor="middle" font-family="monospace">МАРШРУТКА</text>

    <!-- Camera frame indicator -->
    <rect x="0" y="0" width="800" height="450" fill="none" stroke="#ffcc44" stroke-width="2" stroke-dasharray="8 4" opacity=".5"/>

    <!-- Dimensions -->
    <text x="400" y="16" fill="#ffcc44" font-size="9" text-anchor="middle" font-family="monospace" opacity=".7">800px viewport (visible portion of 3200px world)</text>
    <text x="790" y="420" fill="#ffcc44" font-size="8" text-anchor="end" font-family="monospace" opacity=".7">Y=410</text>
    <text x="790" y="372" fill="#ffcc44" font-size="8" text-anchor="end" font-family="monospace" opacity=".7">Y=362 (spawn)</text>
  </svg>
</div>
</div>
</section>

<!-- ═══ RUN LAYOUT ═══ -->
<section id="layout">
<h2>Run Layout</h2>
<div class="sys">
<h3>Street Segments</h3>
<table>
<tr><th>Element</th><th>Typical Values</th></tr>
<tr><td>Ground</td><td>Full world width at Y=410, height 40</td></tr>
<tr><td>Platforms</td><td>5-15 floating, Y range 200-380, width 80-150px, spacing 200-300px</td></tr>
<tr><td>Sacred item</td><td>Highest platform, Y ~160-200, ±2px vertical bob</td></tr>
<tr><td>Babushkas</td><td>3-4 on ground, patrol range 100-150px</td></tr>
<tr><td>Vehicles</td><td>Speed 380-450 px/s, spawn interval 4500-6000ms</td></tr>
</table>

<h3>Interior Segments (Level 6)</h3>
<table>
<tr><th>Element</th><th>Typical Values</th></tr>
<tr><td>Floor</td><td>Full width at Y ~250-270</td></tr>
<tr><td>Shelves</td><td>1-2 elevated, width 90-100px, height 12px</td></tr>
<tr><td>Interior bounds</td><td>350-400px wide, fits in one viewport</td></tr>
<tr><td>Shopkeeper</td><td>Near shelf/counter, responds to shouts</td></tr>
<tr><td>Doors</td><td>Entry (front, glass) and exit (back, solid green)</td></tr>
</table>

<h3>Tile Repetition</h3>
<p>Ground and platform sprites tile horizontally. A 16&times;16 ground tile at 2&times; = 32px repeat. Platforms use 16&times;8 tiles. Interior walls, floors, and ceilings also tile.</p>
</div>
</section>

<!-- ═══ ANIMATION ═══ -->
<section id="animation">
<h2>Animation</h2>
<div class="sys">
<table>
<tr><th>Animation</th><th>Mechanism</th><th>Timing</th></tr>
<tr><td>Chad walk</td><td>Alternate walk1/walk2 frames</td><td>200ms per frame, triggers when |velocity.x| > 10</td></tr>
<tr><td>Chad jump</td><td>Jump frame when not grounded</td><td>Instant switch</td></tr>
<tr><td>Sacred item bob</td><td><code>sin(elapsed/1000 * &pi;) * 2</code></td><td>±2px, ~2s period</td></tr>
<tr><td>Babushka patrol</td><td>Horizontal flip only, no walk anim</td><td>Continuous</td></tr>
<tr><td>Invincibility</td><td>Sprite hidden on even 100ms intervals</td><td>100ms blink</td></tr>
<tr><td>Door transition</td><td>Full-screen black fade</td><td>150ms fadeOut + 150ms fadeIn</td></tr>
<tr><td>Vehicles</td><td>Translation only, no animation</td><td>Continuous movement</td></tr>
</table>
</div>
</section>

<!-- ═══ PALETTES ═══ -->
<section id="palettes">
<h2>Color Palettes</h2>
<div class="cols-2">
  <div class="sys">${paletteTable(BELARUS_PALETTE, "Belarus")}</div>
  <div class="sys">${paletteTable(ETHIOPIA_PALETTE, "Ethiopia")}</div>
</div>
</section>

<!-- ═══ ALL SPRITES ═══ -->
<section id="sprites">
<h2>All Sprites</h2>
${Object.entries(categories).map(([cat, sprites]) => spriteSectionHtml(cat, sprites)).join("\n")}
</section>

<footer style="margin-top:3rem;padding:1rem 0;border-top:1px solid #333;color:#666;font-size:.75rem;text-align:center">
  Pixel Sprite System Reference &mdash; Generated ${new Date().toISOString().split("T")[0]} &mdash; ${totalSprites} sprites across 2 skins
</footer>

</body>
</html>`;

writeFileSync(join(OUT, "pixel-sprite-system.html"), html);

console.log(`\nDone! ${totalSprites} sprites exported to:\n  ${OUT}/\n`);
console.log("Files:");
console.log("  pixel-sprite-system.html  — Complete reference (open in browser)");
console.log("  sprites/                  — Individual SVGs by category");
