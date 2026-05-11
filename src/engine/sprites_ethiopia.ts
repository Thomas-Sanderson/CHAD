// Ethiopia skin sprite data
// Pixel-art sprites drawn via fillRect — same approach as Belarus

import type { SpriteData } from "./sprites";

const _ = null;
// Character colors
const SD = "#8b5e3c"; // Skin deep
const BK = "#000000"; // Black
const WH = "#ffffff"; // White
const AO = "#dd7722"; // Auntie orange (headscarf)
const AG = "#448844"; // Auntie green (dress)
const AD = "#336633"; // Auntie dark green
const GD = "#ffcc44"; // Gold pattern
const SB = "#cc9933"; // Shopping bag
const TB = "#3355aa"; // Taxi blue
const TW = "#ddddee"; // Taxi white
const WB = "#88ccdd"; // Window blue
const DG = "#555555"; // Dark gray
const LG = "#999999"; // Light gray

// Sacred Coffee Bean (FRESH UNROASTED — light green)
const BG = "#a8b858"; // Bean green (main)
const BH = "#b5c462"; // Bean highlight
const BS = "#98a84c"; // Bean shadow
const BC = "#8da048"; // Bean crease
const HG = "#ddaa44"; // Halo gold

// Environment
const CT = "#d4a574"; // Cobblestone tan
const CM = "#b89060"; // Cobblestone mortar
const DW = "#5c3a1e"; // Deep wood
const LW = "#6b4428"; // Light wood
const TN = "#8899aa"; // Tin
const TR = "#c4724a"; // Terracotta
const TD = "#a85e3a"; // Terracotta dark

const WC = "#eeeedd"; // Window warm / milk
const CD = "#3a2211"; // Coffee dark
const GW = "#ddaa44"; // Gold warm
const WE = "#eeeeee"; // Off-white
const NW = "#eee8dd"; // Netela white


// Item colors
const BR = "#cc3311"; // Berbere red
const IG = "#c4b8a4"; // Injera gray
const ID = "#a49884"; // Injera dark
const LR = "#cc6633"; // Lentil red/orange
const BP = "#882244"; // Beet purple
const GP = "#44882a"; // Green pepper
const SG = "#ddcc88"; // Shiro gold
const IA = "#ddc088"; // Incense amber
const MY = "#ffaa22"; // Mango yellow
const MB = "#ee6633"; // Mango blush
const BN = "#8b6633"; // Burlap brown
const TT = "#ccaa77"; // Twine
const RD = "#cc2222"; // Red
const EG = "#e8d5b5"; // Egg

// --- AUNTIE NPC (14×23 logical, drawn at 2x = 28×46) ---
export const auntieSprite: SpriteData = [
  // Headscarf
  [_, _, _, _, _, AO, AO, AO, AO, _, _, _, _, _],
  [_, _, _, _, AO, AO, AO, AO, AO, AO, _, _, _, _],
  [_, _, _, AO, AO, AO, AO, AO, AO, AO, AO, _, _, _],
  [_, _, AO, AO, AO, AO, AO, AO, AO, AO, AO, AO, _, _],
  // Face
  [_, _, _, _, SD, SD, SD, SD, SD, SD, _, _, _, _],
  [_, _, _, SD, SD, BK, SD, SD, BK, SD, SD, _, _, _],
  [_, _, _, SD, SD, SD, SD, SD, SD, SD, SD, _, _, _],
  [_, _, _, _, SD, SD, SD, SD, SD, SD, _, _, _, _],
  // Dress with gold pattern
  [_, _, _, AG, AG, AG, AG, AG, AG, AG, AG, _, _, _],
  [_, _, AG, AG, GD, AG, AG, AG, AG, GD, AG, AG, _, _],
  [_, _, AG, AG, AG, AG, GD, GD, AG, AG, AG, AG, _, _],
  [_, _, AG, AG, GD, AG, AG, AG, AG, GD, AG, AG, _, _],
  [_, _, AG, AG, AG, AG, AG, AG, AG, AG, AG, AG, _, _],
  [_, _, AD, AG, AG, AG, AG, AG, AG, AG, AG, AD, _, _],
  [_, _, AD, AG, AG, GD, AG, AG, GD, AG, AG, AD, _, _],
  // Shopping bag (in hand)
  [_, _, SD, AG, AG, AG, AG, AG, AG, AG, AG, SD, SB, _],
  [_, _, _, AG, AG, AG, AG, AG, AG, AG, AG, _, SB, _],
  [_, _, _, AG, AG, AG, AG, AG, AG, AG, AG, _, SB, SB],
  [_, _, _, _, AD, AD, AD, AD, AD, AD, _, _, SB, SB],
  // Legs
  [_, _, _, _, _, AD, AD, _, AD, AD, _, _, _, _],
  [_, _, _, _, _, AD, AD, _, AD, AD, _, _, _, _],
  [_, _, _, _, BK, BK, BK, _, BK, BK, BK, _, _, _],
  [_, _, _, _, BK, BK, BK, _, BK, BK, BK, _, _, _],
];

// --- BLUE TAXI (28×18 logical, drawn at 2x = 56×36) ---
export const blueTaxiSprite: SpriteData = [
  // Roof
  [_, _, _, _, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, _, _, _, _],
  [_, _, _, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, _, _, _, _],
  // Body with windows + white stripe
  [_, _, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, _, _],
  [_, TB, TB, WB, WB, WB, TB, WB, WB, WB, TB, WB, WB, WB, TB, WB, WB, WB, TB, WB, WB, WB, TB, TB, TB, TB, _, _],
  [_, TB, TB, WB, DG, WB, TB, WB, DG, WB, TB, WB, DG, WB, TB, WB, DG, WB, TB, WB, DG, WB, TB, TB, TB, TB, _, _],
  [_, TB, TB, WB, WB, WB, TB, WB, WB, WB, TB, WB, WB, WB, TB, WB, WB, WB, TB, WB, WB, WB, TB, TB, TB, TB, _, _],
  // White stripe
  [_, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, _, _],
  [_, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, _, _],
  [_, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, _, _],
  [_, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, _, _],
  [_, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, _, _],
  // Bumper
  [_, _, BK, BK, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, TB, BK, BK, _, _],
  // Wheels
  [_, _, _, _, BK, BK, BK, BK, _, _, _, _, _, _, _, _, _, _, _, _, _, BK, BK, BK, BK, _, _, _],
  [_, _, _, BK, DG, DG, DG, BK, _, _, _, _, _, _, _, _, _, _, _, _, BK, DG, DG, DG, BK, _, _, _],
  [_, _, _, BK, DG, LG, DG, BK, _, _, _, _, _, _, _, _, _, _, _, _, BK, DG, LG, DG, BK, _, _, _],
  [_, _, _, BK, DG, DG, DG, BK, _, _, _, _, _, _, _, _, _, _, _, _, BK, DG, DG, DG, BK, _, _, _],
  [_, _, _, _, BK, BK, BK, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, BK, BK, BK, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// --- SACRED COFFEE BEAN (16×13 logical, FRESH UNROASTED — light green) ---
export const coffeeBeanSprite: SpriteData = [
  // Halo
  [_, _, _, _, _, _, HG, HG, HG, HG, _, _, _, _, _, _],
  [_, _, _, _, _, HG, HG, HG, HG, HG, HG, _, _, _, _, _],
  // Body — fresh green bean
  [_, _, _, _, BS, BS, BG, BG, BG, BG, BS, BS, _, _, _, _],
  [_, _, _, BS, BG, BG, BG, BG, BG, BG, BG, BG, BS, _, _, _],
  [_, _, BS, BG, BG, BH, BG, BC, BC, BG, BH, BG, BG, BS, _, _],
  [_, _, BG, BG, BG, BG, BG, BC, BC, BG, BG, BG, BG, BG, _, _],
  // Eyes
  [_, _, BG, BG, BK, BK, BG, BC, BC, BG, BK, BK, BG, BG, _, _],
  [_, _, BG, BG, BK, BK, BG, BC, BC, BG, BK, BK, BG, BG, _, _],
  // Mouth
  [_, _, BG, BG, BG, BG, BG, BC, BC, BG, BG, BG, BG, BG, _, _],
  [_, _, _, BG, BG, BG, BG, BK, BK, BG, BG, BG, BG, _, _, _],
  [_, _, _, BS, BG, BG, BG, BG, BG, BG, BG, BG, BS, _, _, _],
  [_, _, _, _, BS, BS, BG, BG, BG, BG, BS, BS, _, _, _, _],
  [_, _, _, _, _, BS, BS, BS, BS, BS, BS, _, _, _, _, _],
];

// --- ENVIRONMENT TILES ---

// Cobblestone ground (16×16 logical)
export const cobblestoneGround: SpriteData = [
  [CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT],
  [CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT],
  [CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT],
  [CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM],
  [CT, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CT],
  [CT, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CT],
  [CT, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CT],
  [CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM],
  [CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT],
  [CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT],
  [CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT],
  [CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM],
  [CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CT, CM],
  [CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CT, CM],
  [CT, CT, CT, CT, CM, CT, CT, CT, CT, CM, CT, CT, CT, CT, CT, CM],
  [CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM, CM],
];

// Wood/tin platform (16×8 logical)
export const woodTinPlatform: SpriteData = [
  [LW, LW, LW, LW, LW, LW, TN, TN, TN, TN, LW, LW, LW, LW, LW, LW],
  [DW, DW, DW, DW, DW, DW, TN, TN, TN, TN, DW, DW, DW, DW, DW, DW],
  [DW, LW, DW, DW, LW, DW, TN, TN, TN, TN, DW, LW, DW, DW, LW, DW],
  [DW, DW, DW, DW, DW, DW, TN, TN, TN, TN, DW, DW, DW, DW, DW, DW],
  [BK, BK, BK, BK, BK, BK, BK, BK, BK, BK, BK, BK, BK, BK, BK, BK],
  [DW, DW, LW, DW, DW, DW, DW, LW, DW, DW, DW, DW, LW, DW, DW, DW],
  [DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW],
  [DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW],
];

// Buna bet gate (32×24 logical, drawn at 2x = 64×48)
export const bunaBetSprite: SpriteData = [
  // Roof
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  // Sign area
  [TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR],
  [TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR],
  // Windows row 1 (warm lit)
  [TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR],
  [TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR],
  [TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  // Windows row 2 (steam)
  [TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR],
  [TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR],
  [TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  // Light above door
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, GW, GW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  // Door
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, DW, DW, DW, GW, DW, DW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, DW, DW, DW, DW, DW, DW, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
  [TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR],
];

// --- ETHIOPIA ITEM SPRITES (all 16×13 logical) ---

export const bunaBagSprite: SpriteData = [
  [_, _, _, _, _, _, TT, TT, TT, TT, _, _, _, _, _, _],
  [_, _, _, _, _, TT, TT, TT, TT, TT, TT, _, _, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, BN, BN, BN, CD, BN, BN, CD, BN, BN, BN, _, _, _],
  [_, _, _, BN, BN, CD, CD, BN, BN, BN, CD, BN, BN, _, _, _],
  [_, _, BN, BN, BN, BN, BN, CD, BN, CD, BN, BN, BN, BN, _, _],
  [_, _, BN, BN, CD, BN, BN, BN, CD, BN, BN, BN, BN, BN, _, _],
  [_, _, BN, BN, BN, BN, CD, BN, BN, BN, BN, CD, BN, BN, _, _],
  [_, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _],
  [_, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _],
  [_, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _],
  [_, _, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
];

export const wetetJugSprite: SpriteData = [
  [_, _, _, _, _, _, _, TR, TR, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, TR, TR, TR, TR, _, _, _, _, _, _],
  [_, _, _, _, _, TR, TR, WC, TR, TR, TR, _, _, _, _, _],
  [_, _, _, _, TR, TR, WC, WC, WC, TR, TR, _, _, _, _, _],
  [_, _, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _, _],
  [_, _, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _],
  [_, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _],
  [_, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _],
  [_, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _],
  [_, _, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _],
  [_, _, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _],
  [_, _, _, _, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _, _],
  [_, _, _, _, _, TD, TD, TD, TD, TD, TD, _, _, _, _, _],
];

export const daboRoundSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, GW, GW, GW, GW, _, _, _, _, _, _],
  [_, _, _, _, _, GW, GW, GW, GW, GW, GW, _, _, _, _, _],
  [_, _, _, _, GW, GW,"#bb7722", GW, GW,"#bb7722", GW, GW, _, _, _, _],
  [_, _, _, GW, GW, GW, GW,"#bb7722", GW, GW, GW, GW, GW, _, _, _],
  [_, _, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, _, _],
  [_, _, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, _, _],
  [_, _, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, GW, _, _],
  [_, _,"#cc8833","#cc8833", GW, GW, GW, GW, GW, GW, GW, GW,"#cc8833","#cc8833", _, _],
  [_, _,"#cc8833","#cc8833","#cc8833", GW, GW, GW, GW, GW, GW,"#cc8833","#cc8833","#cc8833", _, _],
  [_, _,"#cc8833","#cc8833","#cc8833","#cc8833","#cc8833","#cc8833","#cc8833","#cc8833","#cc8833","#cc8833","#cc8833","#cc8833", _, _],
  [_, _, _,"#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722", _, _, _],
  [_, _, _, _,"#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722","#bb7722", _, _, _, _],
];

export const sukwarBagEthSprite: SpriteData = [
  [_, _, _, _, _, WH, WH, WH, WH, WH, WH, _, _, _, _, _],
  [_, _, _, _, WH, WE, WH, WH, WH, WE, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, TR, TR, TR, TR, TR, TR, WH, _, _, _, _],
  [_, _, _, _, WH, TR, TR, TR, TR, TR, TR, WH, _, _, _, _],
  [_, _, _, _, WH, TR, TR, TR, TR, TR, TR, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
];

export const berbereTinSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, LG, LG, LG, LG, LG, LG, _, _, _, _, _],
  [_, _, _, _, LG, LG, LG, LG, LG, LG, LG, LG, _, _, _, _],
  [_, _, _, _, BR, BR, BR, BR, BR, BR, BR, BR, _, _, _, _],
  [_, _, _, _, BR, BR, BR, BR, BR, BR, BR, BR, _, _, _, _],
  [_, _, _, _, BR, NW, NW, NW, NW, NW, NW, BR, _, _, _, _],
  [_, _, _, _, BR, NW, NW, NW, NW, NW, NW, BR, _, _, _, _],
  [_, _, _, _, BR, NW, NW, NW, NW, NW, NW, BR, _, _, _, _],
  [_, _, _, _, BR, BR, BR, BR, BR, BR, BR, BR, _, _, _, _],
  [_, _, _, _, BR, BR, BR, BR, BR, BR, BR, BR, _, _, _, _],
  [_, _, _, _, BR, BR, BR, BR, BR, BR, BR, BR, _, _, _, _],
  [_, _, _, _, BR, BR, BR, BR, BR, BR, BR, BR, _, _, _, _],
  [_, _, _, _, DG, DG, DG, DG, DG, DG, DG, DG, _, _, _, _],
];

export const teffSackSprite: SpriteData = [
  [_, _, _, _, _, _, TT, TT, TT, TT, _, _, _, _, _, _],
  [_, _, _, _, _, TT, TT, TT, TT, TT, TT, _, _, _, _, _],
  [_, _, _, _, IG, IG, IG, IG, IG, IG, IG, IG, _, _, _, _],
  [_, _, _, IG, IG, ID, IG, IG, IG, ID, IG, IG, IG, _, _, _],
  [_, _, _, IG, IG, IG, IG, ID, IG, IG, IG, IG, IG, _, _, _],
  [_, _, IG, IG, ID, IG, IG, IG, IG, ID, IG, IG, IG, IG, _, _],
  [_, _, IG, IG, IG, IG, ID, IG, ID, IG, IG, IG, IG, IG, _, _],
  [_, _, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, _, _],
  [_, _, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, _, _],
  [_, _, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, _, _],
  [_, _, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, _, _],
  [_, _, _, IG, IG, IG, IG, IG, IG, IG, IG, IG, IG, _, _, _],
  [_, _, _, _, IG, IG, IG, IG, IG, IG, IG, IG, _, _, _, _],
];

export const mangoSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, BK, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, BK, GP, _, _, _, _, _, _, _],
  [_, _, _, _, _, MY, MY, MY, MY, MY, _, _, _, _, _, _],
  [_, _, _, _, MY, MY, MY, MY, MY, MY, MY, _, _, _, _, _],
  [_, _, _, MY, MB, MY, MY, MY, MY, MY, MY, MY, _, _, _, _],
  [_, _, MY, MB, MB, MY, MY, MY, MY, MY, MY, MY, MY, _, _, _],
  [_, _, MY, MB, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _, _],
  [_, _, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _, _],
  [_, _, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _, _],
  [_, _, _, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _, _, _],
  [_, _, _, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _, _, _],
  [_, _, _, _, MY, MY, MY, MY, MY, MY, MY, _, _, _, _, _],
  [_, _, _, _, _, _, MY, MY, MY, _, _, _, _, _, _, _],
];

export const bottledWaterSprite: SpriteData = [
  [_, _, _, _, _, _, WE, WE, WE, WE, _, _, _, _, _, _],
  [_, _, _, _, _, _, WE, WE, WE, WE, _, _, _, _, _, _],
  [_, _, _, _, _, WE, WE, WE, WE, WE, WE, _, _, _, _, _],
  [_, _, _, _, _, WE, WE, WE, WE, WE, WE, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, TB, TB, TB, TB, TB, TB, WE, _, _, _, _],
  [_, _, _, _, WE, TB, TB, TB, TB, TB, TB, WE, _, _, _, _],
  [_, _, _, _, WE, TB, TB, TB, TB, TB, TB, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, LG, LG, LG, LG, LG, LG, LG, LG, _, _, _, _],
];

export const shiroBagSprite: SpriteData = [
  [_, _, _, _, _, _, TT, TT, TT, TT, _, _, _, _, _, _],
  [_, _, _, _, _, TT, SG, SG, SG, TT, TT, _, _, _, _, _],
  [_, _, _, _, SG, SG, SG, SG, SG, SG, SG, SG, _, _, _, _],
  [_, _, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _, _],
  [_, _, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _, _],
  [_, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _],
  [_, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _],
  [_, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _],
  [_, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _],
  [_, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _],
  [_, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _],
  [_, _, _, SG, SG, SG, SG, SG, SG, SG, SG, SG, SG, _, _, _],
  [_, _, _, _, SG, SG, SG, SG, SG, SG, SG, SG, _, _, _, _],
];

export const qibeJarSprite: SpriteData = [
  [_, _, _, _, _, _, NW, NW, NW, NW, _, _, _, _, _, _],
  [_, _, _, _, _, NW, NW, NW, NW, NW, NW, _, _, _, _, _],
  [_, _, _, _, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _, _],
  [_, _, _, TR, TR, TR, GW, GW, GW, TR, TR, TR, TR, _, _, _],
  [_, _, _, TR, TR, GW, GW, GW, GW, GW, TR, TR, TR, _, _, _],
  [_, _, TR, TR, TR, GW, GW, GW, GW, GW, TR, TR, TR, TR, _, _],
  [_, _, TR, TR, TR, TR, GW, GW, GW, TR, TR, TR, TR, TR, _, _],
  [_, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _],
  [_, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _],
  [_, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _],
  [_, _, _, TR, TR, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _],
  [_, _, _, _, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _, _],
  [_, _, _, _, _, TD, TD, TD, TD, TD, TD, _, _, _, _, _],
];

export const timatimSprite: SpriteData = [
  [_, _, _, _, _, _, _, GP, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, GP, GP, GP, _, _, _, _, _, _, _],
  [_, _, _, _, _, RD, RD, RD, RD, RD, _, _, _, _, _, _],
  [_, _, _, _, RD, RD, RD, RD, RD, RD, RD, _, _, _, _, _],
  [_, _, _, RD, RD, RD,"#ee4444", RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, RD, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _],
  [_, _, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _],
  [_, _, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _],
  [_, _, _, RD, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, RD, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, _, RD, RD, RD, RD, RD, RD, RD, _, _, _, _, _],
  [_, _, _, _, _, _, RD, RD, RD, _, _, _, _, _, _, _],
];

export const injeraRollSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, IG, IG, IG, IG, IG, IG, _, _, _, _, _],
  [_, _, _, _, IG, IG, IG, IG, IG, IG, IG, IG, _, _, _, _],
  [_, _, _, IG, ID, IG, ID, IG, IG, ID, IG, IG, IG, _, _, _],
  [_, _, IG, IG, IG, IG, IG, ID, IG, IG, IG, IG, IG, IG, _, _],
  [_, _, IG, ID, IG, IG, IG, IG, IG, IG, ID, IG, IG, IG, _, _],
  [_, _, IG, IG, IG, ID, IG, IG, ID, IG, IG, IG, IG, IG, _, _],
  [_, _, IG, IG, IG, IG, IG, IG, IG, IG, IG, ID, IG, IG, _, _],
  [_, _, IG, ID, IG, IG, ID, IG, IG, IG, IG, IG, IG, IG, _, _],
  [_, _, _, IG, IG, IG, IG, IG, ID, IG, IG, IG, IG, _, _, _],
  [_, _, _, _, IG, IG, IG, IG, IG, IG, IG, IG, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const honeyJarSprite: SpriteData = [
  [_, _, _, _, _, _, LG, LG, LG, LG, _, _, _, _, _, _],
  [_, _, _, _, _, LG, LG, LG, LG, LG, LG, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, WE, WE, GW, GW, GW, GW, GW, GW, WE, WE, _, _, _],
  [_, _, _, WE, GW, GW, GW, GW, GW, GW, GW, GW, WE, _, _, _],
  [_, _, _, WE, GW, GW, GW, GW, GW, GW, GW, GW, WE, _, _, _],
  [_, _, _, WE, GW, GW, GW, GW, GW, GW, GW, GW, WE, _, _, _],
  [_, _, _, WE, GW, GW, GW, GW, GW, GW, GW, GW, WE, _, _, _],
  [_, _, _, WE, GW, GW, GW, GW, GW, GW, GW, GW, WE, _, _, _],
  [_, _, _, WE, WE, GW, GW, GW, GW, GW, GW, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
];

export const avocadoSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, GP, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, GP, GP, GP, _, _, _, _, _, _, _],
  [_, _, _, _, _,"#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _, _, _],
  [_, _, _, _,"#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _, _],
  [_, _, _,"#2a5522","#2a5522","#2a5522","#336633","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _],
  [_, _, _,"#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _],
  [_, _, _,"#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _],
  [_, _, _,"#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _],
  [_, _, _, _,"#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _, _],
  [_, _, _, _, _,"#2a5522","#2a5522","#2a5522","#2a5522","#2a5522", _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const miserBagSprite: SpriteData = [
  [_, _, _, _, _, _, TT, TT, TT, TT, _, _, _, _, _, _],
  [_, _, _, _, _, TT, LR, LR, LR, TT, TT, _, _, _, _, _],
  [_, _, _, _, LR, LR, LR, LR, LR, LR, LR, LR, _, _, _, _],
  [_, _, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _, _],
  [_, _, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _, _],
  [_, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _],
  [_, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _],
  [_, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _],
  [_, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _],
  [_, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _],
  [_, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _],
  [_, _, _, LR, LR, LR, LR, LR, LR, LR, LR, LR, LR, _, _, _],
  [_, _, _, _, LR, LR, LR, LR, LR, LR, LR, LR, _, _, _, _],
];

export const qeySirBeetSprite: SpriteData = [
  [_, _, _, _, _, _, _, GP, GP, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, GP, GP, GP, GP, _, _, _, _, _, _],
  [_, _, _, _, _, BP, BP, BP, BP, BP, _, _, _, _, _, _],
  [_, _, _, _, BP, BP, BP, BP, BP, BP, BP, _, _, _, _, _],
  [_, _, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _, _],
  [_, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _],
  [_, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _],
  [_, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _],
  [_, _, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _, _],
  [_, _, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _, _],
  [_, _, _, _, BP, BP, BP, BP, BP, BP, BP, _, _, _, _, _],
  [_, _, _, _, _, _, BP, BP, BP, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, BP, _, _, _, _, _, _, _, _],
];

export const karyaPepperSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, GP, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, GP, GP, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, GP, GP, GP, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, GP, GP, GP, GP, _, _, _, _, _, _, _],
  [_, _, _, _, _, GP, GP, GP, GP, GP, _, _, _, _, _, _],
  [_, _, _, _, GP, GP, GP, GP, GP, GP, GP, _, _, _, _, _],
  [_, _, _, _, GP, GP, GP, GP, GP, GP, GP, GP, _, _, _, _],
  [_, _, _, _, _, GP, GP, GP, GP, GP, GP, GP, _, _, _, _],
  [_, _, _, _, _, _, GP, GP, GP, GP, GP, _, _, _, _, _],
  [_, _, _, _, _, _, _, GP, GP, GP, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const jebenaPotSprite: SpriteData = [
  [_, _, _, _, _, _, _, TT, TT, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, TT, TT, TT, TT, _, _, _, _, _, _],
  [_, _, _, _, _, _, CD, CD, CD, CD, _, _, _, _, _, _],
  [_, _, _, _, _, CD, CD, CD, CD, CD, CD, _, _, _, _, _],
  [_, _, _, _, CD, CD, CD, CD, CD, CD, CD, CD, _, _, _, _],
  [_, _, _, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, _, _, _],
  [_, _, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, _, _],
  [_, _, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, _, _],
  [_, _, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, _, _],
  [_, _, _, CD, CD, CD, CD, CD, CD, CD, CD, CD, CD, _, _, _],
  [_, _, _, _, CD, CD, CD, CD, CD, CD, CD, CD, _, _, _, _],
  [_, _, _, _, _, CD, CD, CD, CD, CD, CD, _, _, _, _, _],
  [_, _, _, _, _, _, TD, TD, TD, TD, _, _, _, _, _, _],
];

export const rekbotCupSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, TR, TR, TR, TR, TR, TR, _, _, _, _, _],
  [_, _, _, _, _, TR, TR, TR, TR, TR, TR, _, _, _, _, _],
  [_, _, _, _, TR, TR, CD, CD, CD, TR, TR, TR, _, _, _, _],
  [_, _, _, _, TR, TR, CD, CD, CD, TR, TR, TR, _, _, _, _],
  [_, _, _, _, TR, TR, CD, CD, CD, TR, TR, TR, _, _, _, _],
  [_, _, _, _, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _, _],
  [_, _, _, _, _, TR, TR, TR, TR, TR, TR, _, _, _, _, _],
  [_, _, _, _, _, _, TD, TD, TD, TD, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const itanIncenseSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, WE, WE, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, WE, _, _, WE, _, _, _, _, _, _],
  [_, _, _, _, _, TR, TR, TR, TR, TR, TR, _, _, _, _, _],
  [_, _, _, _, TR, TR, IA, IA, IA, TR, TR, TR, _, _, _, _],
  [_, _, _, TR, TR, IA, IA,"#eedd99", IA, IA, TR, TR, TR, _, _, _],
  [_, _, _, TR, IA, IA,"#eedd99", IA, IA,"#eedd99", IA, TR, TR, _, _, _],
  [_, _, _, TR, IA,"#eedd99", IA, IA,"#eedd99", IA, IA, TR, TR, _, _, _],
  [_, _, _, TR, IA, IA, IA, IA, IA, IA, IA, TR, TR, _, _, _],
  [_, _, _, TR, TR, IA, IA, IA, IA, IA, TR, TR, TR, _, _, _],
  [_, _, _, _, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _, _],
  [_, _, _, _, _, TD, TD, TD, TD, TD, TD, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const koloBowlSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, GW, GW, GW, GW, GW, GW, _, _, _, _, _],
  [_, _, _, _, GW, GW, SB, GW, SB, GW, GW, GW, _, _, _, _],
  [_, _, _, TR, GW, SB, GW, GW, GW, SB, GW, GW, TR, _, _, _],
  [_, _, _, TR, GW, GW, GW, SB, GW, GW, GW, GW, TR, _, _, _],
  [_, _, _, TR, TR, GW, SB, GW, GW, SB, GW, TR, TR, _, _, _],
  [_, _, _, TR, TR, TR, GW, GW, GW, GW, TR, TR, TR, _, _, _],
  [_, _, _, _, TR, TR, TR, TR, TR, TR, TR, TR, _, _, _, _],
  [_, _, _, _, _, TR, TR, TR, TR, TR, TR, _, _, _, _, _],
  [_, _, _, _, _, _, TD, TD, TD, TD, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const eggSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, EG, EG, EG, EG, _, _, _, _, _, _],
  [_, _, _, _, _, EG, EG, EG, EG, EG, EG, _, _, _, _, _],
  [_, _, _, _, EG, EG, EG, EG, EG, EG, EG, EG, _, _, _, _],
  [_, _, _, _, EG, EG, EG, EG, EG, EG, EG, EG, _, _, _, _],
  [_, _, _, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, _, _, _],
  [_, _, _, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, _, _, _],
  [_, _, _, EG, EG, EG, EG, EG, EG, EG, EG, EG, EG, _, _, _],
  [_, _, _, _, EG, EG, EG, EG, EG, EG, EG, EG, _, _, _, _],
  [_, _, _, _, _, EG, EG, EG, EG, EG, EG, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const teaCupSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, TW, TW, TW, TW, TW, TW, _, _, _, _, _],
  [_, _, _, _, _, TW, TW, TW, TW, TW, TW, _, TW, _, _, _],
  [_, _, _, _, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, _, _],
  [_, _, _, _, TW, TW, TW, TW, TW, TW, TW, TW, _, TW, _, _],
  [_, _, _, _, TW, TW, TW, TW, TW, TW, TW, TW, TW, TW, _, _],
  [_, _, _, _, TW, TW, TW, TW, TW, TW, TW, TW, _, _, _, _],
  [_, _, _, _, _, TW, TW, TW, TW, TW, TW, _, _, _, _, _],
  [_, _, _, _, _, _, LG, LG, LG, LG, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];
