// Sprite data: each sprite is a 2D grid of hex colors or null (transparent).
// Drawn with fillRect at pixel scale for retro pixel-art aesthetic.

type Row = (string | null)[];
export type SpriteData = Row[];

// --- Color palette ---
const _ = null; // transparent
const CR = "#cc3333"; // Chad Red (cap)
const CB = "#992222"; // Cap brim
const TS = "#22b5a0"; // Teal shirt
const PF = "#ff6b9d"; // Pink flower
const YF = "#ffcc44"; // Yellow flower
const CT = "#cc9955"; // Cargo tan
const CP = "#bb8844"; // Cargo pocket
const FB = "#886644"; // Fanny brown strap
const FL = "#aa8855"; // Fanny light pouch
const SK = "#f5c99a"; // Skin
const BP = "#8855aa"; // Babushka purple
const BD = "#664488"; // Babushka dark
const BS = "#f0c090"; // Babushka skin
const SB = "#cc9933"; // Shopping bag
const MY = "#ddcc33"; // Marshrutka yellow
const MD = "#ccbb22"; // Marshrutka dark
const WB = "#88ccdd"; // Window blue
const PB = "#c4944a"; // Potato brown
const PD = "#b8883e"; // Potato dark
const PS = "#a87830"; // Potato spot
const HG = "#ffee88"; // Halo gold
const GG = "#556644"; // Ground green
const GR = "#668855"; // Grass
const GB = "#77aa55"; // Grass blade
const BT = "#887766"; // Brick tan
const BL = "#998877"; // Brick light
const BM = "#776655"; // Brick line (mortar)
const AT = "#aa9977"; // Apartment tan
const DB = "#664422"; // Door brown
const BK = "#000000"; // Black
const WH = "#ffffff"; // White
const WE = "#eeeeee"; // Off-white
const LB = "#aaddff"; // Light blue
const DG = "#555555"; // Dark gray
const LG = "#999999"; // Light gray
const RD = "#cc2222"; // Red
const DR = "#991111"; // Dark red
const GN = "#449944"; // Green
const DK = "#336633"; // Dark green
const YL = "#ddaa22"; // Yellow-gold
const OG = "#cc7733"; // Orange
const BN = "#8B5E3C"; // Brown
const LN = "#c4a882"; // Light brown / tan
const PP = "#9944bb"; // Purple
const GD = "#ddbb44"; // Gold

// --- Shop interior palette ---
const SW = "#d4c8b0"; // Shop Wall Cream
const SS = "#c4b8a0"; // Shop Wall Shadow
const FG = "#998888"; // Floor Tile Gray
const TL = "#aa9999"; // Floor Tile Light
const FT = "#887777"; // Floor Grout
const SH = "#996633"; // Shelf Wood
const SD = "#884422"; // Shelf Wood Dark
const SL = "#aa7744"; // Shelf Light (bracket)
const KT = "#bbaa88"; // Counter Top
const MS = "#8899aa"; // Metal Shelf
const ML = "#99aabb"; // Metal Shelf Light
const EG = "#2d8c3c"; // Exit Green (ГОСТ standard)
const ED = "#1f6b2e"; // Exit Green Dark (ГОСТ border)
const LR = "#cc4444"; // Lock Red
const LD = "#aa3333"; // Lock Dark

// --- Landmark palette ---
const LS = "#c8b8a0"; // Landmark Stone
const LW = "#d4c4ac"; // Landmark Wall Light
const PG = "#33aa55"; // Pharmacy Green
const BV = "#2a4a6a"; // Bank Navy
const PO = "#3355aa"; // Post Blue
const SO = "#dd6622"; // Shop Orange
const CF = "#553322"; // Café Sign
const LM = "#442233"; // Library Maroon
const WN = "#88aabb"; // Window
const WG = "#aaccdd"; // Window Glass
const LK = "#cc9966"; // Landmark Brick
const AW = "#ddddd0"; // Apron White
const RG2 = "#777766"; // Register Gray
const RS = "#99aa88"; // Register Screen
const FC = "#eeeedd"; // Fluorescent
const FW = "#ffffee"; // Fluorescent Glow
const DF = "#775533"; // Door Frame
const GL = "#aaccdd"; // Glass
const GH = "#bbddee"; // Glass Highlight
const KB = "#6688bb"; // Keeper Blue
const DV = "#667766"; // Door Back Green
const DW = "#778877"; // Door Back Green Light
const DX = "#556655"; // Door Back Green Dark
const BR = "#ccaa44"; // Brass

// --- CHAD SPRITES (16×24 logical, drawn at 2x = 32×48) ---
// Each row is 16 pixels wide, 24 rows tall

export const chadIdle: SpriteData = [
  // Row 0-2: Cap
  [_, _, _, _, _, CR, CR, CR, CR, CR, CR, _, _, _, _, _],
  [_, _, _, _, CR, CR, CR, CR, CR, CR, CR, CR, _, _, _, _],
  [_, _, _, CB, CB, CB, CB, CB, CB, CB, CB, CB, CB, _, _, _],
  // Row 3-6: Head
  [_, _, _, _, _, SK, SK, SK, SK, SK, SK, _, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  [_, _, _, _, SK, BK, SK, SK, SK, SK, BK, SK, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  // Row 7-12: Shirt
  [_, _, _, _, _, TS, TS, TS, TS, TS, TS, _, _, _, _, _],
  [_, _, _, TS, TS, TS, PF, TS, TS, YF, TS, TS, TS, _, _, _],
  [_, _, SK, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, SK, _, _],
  [_, _, SK, TS, TS, YF, TS, TS, TS, TS, PF, TS, TS, SK, _, _],
  [_, _, _, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, _, _, _],
  [_, _, _, _, FB, FB, FL, FL, FL, FL, FB, FB, _, _, _, _],
  // Row 13-17: Cargo shorts
  [_, _, _, _, _, CT, CT, CT, CT, CT, CT, _, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CP, CT, CT, CT, CT, CP, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  // Row 18-23: Legs and shoes
  [_, _, _, _, _, SK, SK, _, _, SK, SK, _, _, _, _, _],
  [_, _, _, _, _, SK, SK, _, _, SK, SK, _, _, _, _, _],
  [_, _, _, _, _, SK, SK, _, _, SK, SK, _, _, _, _, _],
  [_, _, _, _, _, SK, SK, _, _, SK, SK, _, _, _, _, _],
  [_, _, _, _, BK, BK, BK, _, _, BK, BK, BK, _, _, _, _],
  [_, _, _, _, BK, BK, BK, _, _, BK, BK, BK, _, _, _, _],
];

export const chadWalk1: SpriteData = [
  [_, _, _, _, _, CR, CR, CR, CR, CR, CR, _, _, _, _, _],
  [_, _, _, _, CR, CR, CR, CR, CR, CR, CR, CR, _, _, _, _],
  [_, _, _, CB, CB, CB, CB, CB, CB, CB, CB, CB, CB, _, _, _],
  [_, _, _, _, _, SK, SK, SK, SK, SK, SK, _, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  [_, _, _, _, SK, BK, SK, SK, SK, SK, BK, SK, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  [_, _, _, _, _, TS, TS, TS, TS, TS, TS, _, _, _, _, _],
  [_, _, _, TS, TS, TS, PF, TS, TS, YF, TS, TS, TS, _, _, _],
  [_, _, SK, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, SK, _, _],
  [_, _, SK, TS, TS, YF, TS, TS, TS, TS, PF, TS, TS, SK, _, _],
  [_, _, _, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, _, _, _],
  [_, _, _, _, FB, FB, FL, FL, FL, FL, FB, FB, _, _, _, _],
  [_, _, _, _, _, CT, CT, CT, CT, CT, CT, _, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CP, CT, CT, CT, CT, CP, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, _, CT, CT, CT, CT, _, _, _, _],
  // Walk pose: legs apart
  [_, _, _, _, SK, SK, _, _, _, _, SK, SK, _, _, _, _],
  [_, _, _, SK, SK, _, _, _, _, _, _, SK, SK, _, _, _],
  [_, _, _, SK, SK, _, _, _, _, _, _, SK, SK, _, _, _],
  [_, _, _, SK, SK, _, _, _, _, _, _, _, SK, SK, _, _],
  [_, _, BK, BK, BK, _, _, _, _, _, _, BK, BK, BK, _, _],
  [_, _, BK, BK, BK, _, _, _, _, _, _, _, BK, BK, BK, _],
];

export const chadWalk2: SpriteData = [
  [_, _, _, _, _, CR, CR, CR, CR, CR, CR, _, _, _, _, _],
  [_, _, _, _, CR, CR, CR, CR, CR, CR, CR, CR, _, _, _, _],
  [_, _, _, CB, CB, CB, CB, CB, CB, CB, CB, CB, CB, _, _, _],
  [_, _, _, _, _, SK, SK, SK, SK, SK, SK, _, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  [_, _, _, _, SK, BK, SK, SK, SK, SK, BK, SK, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  [_, _, _, _, _, TS, TS, TS, TS, TS, TS, _, _, _, _, _],
  [_, _, _, TS, TS, TS, PF, TS, TS, YF, TS, TS, TS, _, _, _],
  [_, _, SK, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, SK, _, _],
  [_, _, SK, TS, TS, YF, TS, TS, TS, TS, PF, TS, TS, SK, _, _],
  [_, _, _, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, _, _, _],
  [_, _, _, _, FB, FB, FL, FL, FL, FL, FB, FB, _, _, _, _],
  [_, _, _, _, _, CT, CT, CT, CT, CT, CT, _, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CP, CT, CT, CT, CT, CP, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, _, CT, CT, CT, _, _, _, _],
  // Walk pose: legs apart opposite
  [_, _, _, _, _, SK, SK, _, _, SK, SK, _, _, _, _, _],
  [_, _, _, _, _, _, SK, SK, SK, SK, _, _, _, _, _, _],
  [_, _, _, _, _, _, SK, SK, SK, SK, _, _, _, _, _, _],
  [_, _, _, _, _, SK, SK, _, _, SK, SK, _, _, _, _, _],
  [_, _, _, _, BK, BK, BK, _, BK, BK, BK, _, _, _, _, _],
  [_, _, _, BK, BK, BK, _, _, _, BK, BK, BK, _, _, _, _],
];

export const chadJump: SpriteData = [
  [_, _, _, _, _, CR, CR, CR, CR, CR, CR, _, _, _, _, _],
  [_, _, _, _, CR, CR, CR, CR, CR, CR, CR, CR, _, _, _, _],
  [_, _, _, CB, CB, CB, CB, CB, CB, CB, CB, CB, CB, _, _, _],
  [_, _, _, _, _, SK, SK, SK, SK, SK, SK, _, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  [_, _, _, _, SK, BK, SK, SK, SK, SK, BK, SK, _, _, _, _],
  [_, _, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _, _],
  // Arms up
  [_, _, SK, _, _, TS, TS, TS, TS, TS, TS, _, _, SK, _, _],
  [_, SK, _, TS, TS, TS, PF, TS, TS, YF, TS, TS, _, SK, _, _],
  [_, _, _, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, _, _, _],
  [_, _, _, TS, TS, YF, TS, TS, TS, TS, PF, TS, TS, _, _, _],
  [_, _, _, TS, TS, TS, TS, TS, TS, TS, TS, TS, TS, _, _, _],
  [_, _, _, _, FB, FB, FL, FL, FL, FL, FB, FB, _, _, _, _],
  [_, _, _, _, _, CT, CT, CT, CT, CT, CT, _, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CP, CT, CT, CT, CT, CP, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  [_, _, _, _, CT, CT, CT, CT, CT, CT, CT, CT, _, _, _, _],
  // Legs tucked
  [_, _, _, _, _, SK, SK, _, _, SK, SK, _, _, _, _, _],
  [_, _, _, _, SK, SK, _, _, _, _, SK, SK, _, _, _, _],
  [_, _, _, _, SK, SK, _, _, _, _, SK, SK, _, _, _, _],
  [_, _, _, BK, BK, BK, _, _, _, BK, BK, BK, _, _, _, _],
  [_, _, _, BK, BK, _, _, _, _, _, _, BK, BK, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// --- BABUSHKA (14×23 logical, drawn at 2x = 28×46) ---
export const babushkaSprite: SpriteData = [
  // Headscarf
  [_, _, _, _, _, BP, BP, BP, BP, _, _, _, _, _],
  [_, _, _, _, BP, BP, BP, BP, BP, BP, _, _, _, _],
  [_, _, _, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _],
  [_, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _],
  // Face
  [_, _, _, _, BS, BS, BS, BS, BS, BS, _, _, _, _],
  [_, _, _, BS, BS, BK, BS, BS, BK, BS, BS, _, _, _],
  [_, _, _, BS, BS, BS, BS, BS, BS, BS, BS, _, _, _],
  [_, _, _, _, BS, BS, BK, BK, BS, BS, _, _, _, _],
  // Coat
  [_, _, _, BP, BP, BP, BP, BP, BP, BP, BP, _, _, _],
  [_, _, BP, BP, BD, BP, BP, BP, BP, BD, BP, BP, _, _],
  [_, _, BP, BP, BD, BP, BP, BP, BP, BD, BP, BP, _, _],
  [_, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _],
  [_, _, BP, BP, BP, BP, BP, BP, BP, BP, BP, BP, _, _],
  [_, _, BD, BP, BP, BP, BP, BP, BP, BP, BP, BD, _, _],
  [_, _, BD, BP, BP, BP, BP, BP, BP, BP, BP, BD, _, _],
  // Shopping bag (in hand)
  [_, _, BS, BP, BP, BP, BP, BP, BP, BP, BP, BS, SB, _],
  [_, _, _, BP, BP, BP, BP, BP, BP, BP, BP, _, SB, _],
  [_, _, _, BP, BP, BP, BP, BP, BP, BP, BP, _, SB, SB],
  [_, _, _, _, BD, BD, BD, BD, BD, BD, _, _, SB, SB],
  // Legs (short, sturdy)
  [_, _, _, _, _, BD, BD, _, BD, BD, _, _, _, _],
  [_, _, _, _, _, BD, BD, _, BD, BD, _, _, _, _],
  [_, _, _, _, BK, BK, BK, _, BK, BK, BK, _, _, _],
  [_, _, _, _, BK, BK, BK, _, BK, BK, BK, _, _, _],
];

// --- MARSHRUTKA (32×20 logical, drawn at 2x = 64×40) ---
export const marshrutkaSprite: SpriteData = [
  // Roof
  [_, _, _, _, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, _, _, _, _],
  [_, _, _, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, MD, _, _, _],
  // Body with windows
  [_, _, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  [_, MY, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, MY, MY, _, _],
  [_, MY, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, MY, MY, _, _],
  [_, MY, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, WB, WB, WB, WB, MY, MY, MY, _, _],
  [_, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  [_, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  // Route plate area
  [_, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  [_, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  // Lower body
  [_, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  [_, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  [_, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, _, _],
  // Bumper
  [_, _, BK, BK, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, MY, BK, BK, _, _],
  // Wheels
  [_, _, _, _, _, BK, BK, BK, BK, _, _, _, _, _, _, _, _, _, _, _, _, _, _, BK, BK, BK, BK, _, _, _, _, _],
  [_, _, _, _, BK, DG, DG, DG, BK, _, _, _, _, _, _, _, _, _, _, _, _, _, BK, DG, DG, DG, BK, _, _, _, _],
  [_, _, _, _, BK, DG, LG, DG, BK, _, _, _, _, _, _, _, _, _, _, _, _, _, BK, DG, LG, DG, BK, _, _, _, _],
  [_, _, _, _, BK, DG, DG, DG, BK, _, _, _, _, _, _, _, _, _, _, _, _, _, BK, DG, DG, DG, BK, _, _, _, _],
  [_, _, _, _, _, BK, BK, BK, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, BK, BK, BK, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// --- SACRED POTATO (16×13 logical, drawn at 2x = 32×26) ---
export const potatoSprite: SpriteData = [
  // Halo
  [_, _, _, _, _, _, HG, HG, HG, HG, _, _, _, _, _, _],
  [_, _, _, _, _, HG, HG, HG, HG, HG, HG, _, _, _, _, _],
  // Body
  [_, _, _, _, PD, PD, PB, PB, PB, PB, PD, PD, _, _, _, _],
  [_, _, _, PD, PB, PB, PB, PB, PB, PB, PB, PB, PD, _, _, _],
  [_, _, PD, PB, PB, PB, PS, PB, PB, PS, PB, PB, PB, PD, _, _],
  [_, _, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, _, _],
  // Eyes
  [_, _, PB, PB, WH, WH, BK, PB, PB, WH, WH, BK, PB, PB, _, _],
  [_, _, PB, PB, WH, WH, BK, PB, PB, WH, WH, BK, PB, PB, _, _],
  // Mouth
  [_, _, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, _, _],
  [_, _, _, PB, PB, PB, PB, BK, BK, PB, PB, PB, PB, _, _, _],
  [_, _, _, PD, PB, PB, PB, PB, PB, PB, PB, PB, PD, _, _, _],
  [_, _, _, _, PD, PD, PB, PB, PB, PB, PD, PD, _, _, _, _],
  [_, _, _, _, _, PD, PD, PD, PD, PD, PD, _, _, _, _, _],
];

// --- ENVIRONMENT TILES ---

// Ground tile (16×16 logical, drawn at 2x = 32×32)
export const groundTile: SpriteData = [
  [GB, _, GB, _, _, GB, _, _, _, GB, _, _, GB, _, _, GB],
  [GR, GB, GR, GB, GR, GR, GB, GR, GR, GR, GB, GR, GR, GB, GR, GR],
  [GR, GR, GR, GR, GR, GR, GR, GR, GR, GR, GR, GR, GR, GR, GR, GR],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
  [GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG, GG],
];

// Platform tile (16×8 logical)
export const platformTile: SpriteData = [
  [BL, BL, BL, BL, BL, BL, BL, BL, BL, BL, BL, BL, BL, BL, BL, BL],
  [BT, BT, BT, BT, BT, BT, BT, BM, BT, BT, BT, BT, BT, BT, BT, BT],
  [BT, BT, BT, BM, BT, BT, BT, BM, BT, BT, BT, BT, BM, BT, BT, BT],
  [BT, BT, BT, BM, BT, BT, BT, BT, BT, BT, BT, BT, BM, BT, BT, BT],
  [BM, BM, BM, BM, BM, BM, BM, BM, BM, BM, BM, BM, BM, BM, BM, BM],
  [BT, BT, BT, BT, BT, BT, BM, BT, BT, BT, BT, BM, BT, BT, BT, BT],
  [BT, BT, BT, BT, BT, BT, BM, BT, BT, BT, BT, BM, BT, BT, BT, BT],
  [BT, BT, BT, BT, BT, BT, BT, BT, BT, BT, BT, BT, BT, BT, BT, BT],
];

// --- HUD sprites ---

// Heart full (7×6) — red filled heart
export const heartFullSprite: SpriteData = [
  [_, RD, RD, _, RD, RD, _],
  [RD, RD, RD, RD, RD, RD, RD],
  [RD, RD, RD, RD, RD, RD, RD],
  [_, RD, RD, RD, RD, RD, _],
  [_, _, RD, RD, RD, _, _],
  [_, _, _, RD, _, _, _],
];

// Heart empty (7×6) — dark gray outline
export const heartEmptySprite: SpriteData = [
  [_, DG, DG, _, DG, DG, _],
  [DG, _, _, DG, _, _, DG],
  [DG, _, _, _, _, _, DG],
  [_, DG, _, _, _, DG, _],
  [_, _, DG, _, DG, _, _],
  [_, _, _, DG, _, _, _],
];

// Bag sprite (7×8) — brown sack
export const bagSprite: SpriteData = [
  [_, _, BN, BN, BN, _, _],
  [_, BN, _, _, _, BN, _],
  [_, BN, LN, LN, LN, BN, _],
  [BN, LN, LN, LN, LN, LN, BN],
  [BN, LN, LN, LN, LN, LN, BN],
  [BN, LN, LN, LN, LN, LN, BN],
  [BN, LN, LN, LN, LN, LN, BN],
  [_, BN, BN, BN, BN, BN, _],
];

// Speaker on (7×7)
export const speakerOnSprite: SpriteData = [
  [_, _, DG, DG, _, _, _],
  [_, DG, DG, DG, _, LG, _],
  [DG, DG, DG, DG, LG, _, LG],
  [DG, DG, DG, DG, _, LG, _],
  [DG, DG, DG, DG, LG, _, LG],
  [_, DG, DG, DG, _, LG, _],
  [_, _, DG, DG, _, _, _],
];

// Speaker off (7×7) — speaker with X
export const speakerOffSprite: SpriteData = [
  [_, _, DG, DG, _, _, _],
  [_, DG, DG, DG, RD, _, RD],
  [DG, DG, DG, DG, _, RD, _],
  [DG, DG, DG, DG, RD, _, _],
  [DG, DG, DG, DG, _, RD, _],
  [_, DG, DG, DG, RD, _, RD],
  [_, _, DG, DG, _, _, _],
];

// Apartment gate (32×40 logical, drawn at 2x = 64×80)
// Taller sprite to reach ground level. Includes flagpole on right side.
export const apartmentSprite: SpriteData = [
  // Flagpole top (right side)
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,DG,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,DG,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,DG,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,DG,_,_],
  // Roof
  [BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  // Windows row 1
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  // Windows row 2
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  // Windows row 3
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,WB,WB,WB,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  // Canopy above door
  [AT,AT,AT,AT,AT,AT,AT,AT,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,DG,DG,DG,DG,DG,DG,DG,DG,DG,DG,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  // Light
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,YL,YL,YL,YL,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  // Door frame + double door
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,DB,DB,DB,DB,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,DB,BK,BK,DB,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,DB,BK,BK,DB,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,YL,BK,BK,YL,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,DB,BK,BK,DB,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,DB,BK,BK,DB,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,DB,BK,BK,DB,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,BM,DB,DB,DB,BK,BK,DB,DB,DB,BM,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  // Base
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,AT,_,DG,_,_],
  [BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,BM,_,DG,_,_],
  // Foundation — full width, fills gap to ground
  [BT,BT,BT,BT,BT,BT,BT,BT,BT,BL,BL,BL,BL,BL,BL,BL,BL,BL,BL,BT,BT,BT,BT,BT,BT,BT,BT,BT,DG,DG,DG,_],
  [BT,BT,BT,BT,BT,BT,BT,BT,BL,BL,BL,BL,BL,BL,BL,BL,BL,BL,BL,BL,BT,BT,BT,BT,BT,BT,BT,BT,DG,DG,DG,_],
  [BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,DG,DG,DG,_],
  [BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,DG,DG,DG,_],
];

// --- Distinct shop exterior sprites (24×24 logical, drawn at 2x = 48×48) ---
// Each mapped by door label for visual identification.

// МОЛОЧНАЯ — Dairy (blue awning, glass display, clean plaster)
export const shopDairySprite: SpriteData = buildLandmark(24, 24, [
  [0, 2, 24, 2, "#4488cc"],   // sign plate
  [0, 2, 4, 2, "#3377bb"],    // sign dark stripe
  [8, 2, 4, 2, "#3377bb"],
  [16, 2, 4, 2, "#3377bb"],
  [0, 4, 24, 20, "#e8e0d4"],  // building body
  [0, 4, 24, 1, "#ddd8cc"],   // cornice
  [0, 6, 24, 3, "#4488cc"],   // awning
  [0, 6, 4, 3, "#3377bb"],    // awning dark
  [8, 6, 4, 3, "#3377bb"],
  [16, 6, 4, 3, "#3377bb"],
  [2, 10, 9, 7, "#c8dde8"],   // display window
  [3, 11, 7, 5, "#ddeef4"],   // glass
  [6, 10, 1, 7, "#bbccdd"],   // window divider
  [4, 13, 2, 2, WH],          // milk carton in window
  [7, 13, 2, 2, "#ffcc44"],   // cheese in window
  [15, 11, 6, 13, "#3377bb"], // door
  [16, 12, 4, 11, "#2266aa"], // door inner
  [19, 16, 1, 1, WH],         // handle
  [16, 13, 3, 3, "#c8dde8"],  // door window
]);

// РЫБНАЯ — Fish market (weathered wood, tin roof, open counter)
export const shopFishSprite: SpriteData = buildLandmark(24, 24, [
  [0, 3, 24, 1, "#8899aa"],   // tin roof
  [0, 4, 24, 1, "#7788aa"],   // tin dark
  [0, 5, 24, 19, "#8b7a66"],  // wood body
  [0, 5, 24, 4, "#2a7a7a"],   // teal sign plate
  [1, 6, 22, 2, "#338888"],   // sign inner
  [0, 9, 24, 1, "#7a6a56"],   // plank line
  [0, 15, 24, 1, "#7a6a56"],  // plank line
  [2, 10, 10, 6, "#6a5a46"],  // open front
  [2, 15, 10, 2, "#9b8a76"],  // counter
  [3, 14, 8, 1, "#aaccdd"],   // ice display
  [4, 11, 3, 1, "#7799bb"],   // raw fish
  [8, 11, 3, 1, "#cc8844"],   // smoked fish
  [15, 10, 6, 14, "#5a4a36"], // door
  [16, 11, 4, 12, "#4a3a26"], // door inner
  [18, 11, 1, 12, "#3a2a16"], // door plank
  [19, 16, 1, 1, "#887766"],  // handle
]);

// ОВОЩИ-ФРУКТЫ — Produce (green awning, crates)
export const shopProduceSprite: SpriteData = buildLandmark(24, 24, [
  [0, 2, 24, 2, "#448833"],   // sign plate
  [1, 2, 22, 1, "#337722"],   // sign inner
  [0, 4, 24, 20, "#ccbb99"],  // building body
  [0, 4, 24, 1, "#ddccaa"],   // cornice
  [0, 5, 24, 3, "#448833"],   // awning
  [0, 5, 3, 3, "#337722"],    // awning dark
  [6, 5, 3, 3, "#337722"],
  [12, 5, 3, 3, "#337722"],
  [18, 5, 3, 3, "#337722"],
  [2, 10, 10, 8, "#bbaa88"],  // open area
  [2, 14, 5, 4, "#886644"],   // crate 1
  [3, 12, 2, 2, "#cc2222"],   // tomatoes
  [5, 12, 2, 2, "#ee7722"],   // carrots
  [8, 14, 4, 4, "#886644"],   // crate 2
  [9, 12, 2, 2, "#44882a"],   // greens
  [11, 12, 1, 2, "#ffcc33"],  // lemon
  [0, 18, 4, 3, "#775533"],   // spillover crate
  [1, 17, 2, 1, "#44882a"],   // spilling greens
  [15, 10, 6, 14, "#664422"], // door
  [16, 11, 4, 12, "#553311"], // door inner
  [19, 16, 1, 1, "#ccaa55"],  // handle
]);

// Shop facade lookup by door label
export const shopFacadeSprites: Record<string, SpriteData> = {
  "МОЛОЧНАЯ": shopDairySprite,
  "РЫБНАЯ": shopFishSprite,
  "ОВОЩИ-ФРУКТЫ": shopProduceSprite,
  // Italy shops
  "SALUMERIA": macelleriaSpriteIT,
  "PANETTERIA": panetteriaSpriteIT,
  "FRUTTIVENDOLO": fruttivendoloSpriteIT,
};

// --- ITEM SPRITES (all 16×13 logical, drawn at 2x = 32×26) ---

export const smetanaTubSprite: SpriteData = [
  [_, _, _, _, _, _, WH, WH, WH, WH, _, _, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, LB, LB, LB, LB, LB, LB, LB, LB, LB, LB, WH, _, _],
  [_, _, WH, LB, LB, LB, LB, LB, LB, LB, LB, LB, LB, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
];

export const kefirBottleSprite: SpriteData = [
  [_, _, _, _, _, _, GN, GN, GN, GN, _, _, _, _, _, _],
  [_, _, _, _, _, _, GN, GN, GN, GN, _, _, _, _, _, _],
  [_, _, _, _, _, WH, WH, WH, WH, WH, WH, _, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, GN, GN, GN, GN, GN, GN, WH, _, _, _, _],
  [_, _, _, _, WH, GN, GN, GN, GN, GN, GN, WH, _, _, _, _],
  [_, _, _, _, WH, GN, GN, GN, GN, GN, GN, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
];

export const kolbasaLinkSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, LN, LN, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, DR, DR, DR, _, _, _, _, _, _, _, _, _, _],
  [_, _, DR, DR, RD, RD, DR, _, _, _, _, _, _, _, _, _],
  [_, DR, DR, RD, RD, WE, RD, RD, _, _, _, _, _, _, _, _],
  [_, DR, RD, RD, WE, RD, RD, RD, RD, _, _, _, _, _, _, _],
  [_, _, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _, _, _],
  [_, _, _, RD, RD, RD, WE, RD, RD, RD, RD, _, _, _, _, _],
  [_, _, _, _, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, _, _, RD, RD, RD, WE, RD, RD, RD, DR, _, _, _],
  [_, _, _, _, _, _, DR, RD, RD, RD, RD, DR, DR, _, _, _],
  [_, _, _, _, _, _, _, DR, DR, DR, DR, DR, _, _, _, _],
  [_, _, _, _, _, _, _, _, LN, LN, _, _, _, _, _, _],
];

export const pickleJarSprite: SpriteData = [
  [_, _, _, _, _, _, LG, LG, LG, LG, _, _, _, _, _, _],
  [_, _, _, _, _, LG, LG, LG, LG, LG, LG, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, WE, WE, GN, WE, GN, WE, GN, WE, WE, WE, _, _, _],
  [_, _, _, WE, GN, GN, GN, GN, GN, GN, GN, WE, WE, _, _, _],
  [_, _, _, WE, WE, GN, GN, GN, GN, GN, WE, WE, WE, _, _, _],
  [_, _, _, WE, GN, GN, WE, GN, WE, GN, GN, WE, WE, _, _, _],
  [_, _, _, WE, WE, GN, GN, GN, GN, GN, WE, WE, WE, _, _, _],
  [_, _, _, WE, GN, GN, GN, GN, GN, GN, GN, WE, WE, _, _, _],
  [_, _, _, WE, WE, GN, WE, GN, WE, GN, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
];

export const breadLoafSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, LN, LN, LN, LN, _, _, _, _, _, _],
  [_, _, _, _, _, LN, LN, LN, LN, LN, LN, _, _, _, _, _],
  [_, _, _, _, LN, LN, BN, LN, LN, BN, LN, LN, _, _, _, _],
  [_, _, _, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, _, _, _],
  [_, _, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, _, _],
  [_, _, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, _, _],
  [_, _, OG, OG, LN, LN, LN, LN, LN, LN, LN, LN, OG, OG, _, _],
  [_, _, OG, OG, OG, LN, LN, LN, LN, LN, LN, OG, OG, OG, _, _],
  [_, _, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, _, _],
  [_, _, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, _, _],
  [_, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _],
  [_, _, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _],
];

export const mysteryCanSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, LG, LG, LG, LG, LG, LG, _, _, _, _, _],
  [_, _, _, _, LG, LG, LG, LG, LG, LG, LG, LG, _, _, _, _],
  [_, _, _, _, DG, DG, DG, DG, DG, DG, DG, DG, _, _, _, _],
  [_, _, _, _, DG, DG, DG, DG, DG, DG, DG, DG, _, _, _, _],
  [_, _, _, _, DG, WH, WH, WH, WH, WH, WH, DG, _, _, _, _],
  [_, _, _, _, DG, WH, BK, BK, BK, WH, WH, DG, _, _, _, _],
  [_, _, _, _, DG, WH, BK, WH, WH, BK, WH, DG, _, _, _, _],
  [_, _, _, _, DG, WH, WH, WH, BK, WH, WH, DG, _, _, _, _],
  [_, _, _, _, DG, WH, WH, BK, WH, WH, WH, DG, _, _, _, _],
  [_, _, _, _, DG, WH, WH, WH, WH, WH, WH, DG, _, _, _, _],
  [_, _, _, _, DG, WH, WH, BK, WH, WH, WH, DG, _, _, _, _],
  [_, _, _, _, DG, DG, DG, DG, DG, DG, DG, DG, _, _, _, _],
];

// Revealed mystery can foods — shown after decode
const _BD = "#4a1e40"; // Beet dark purple
const MR = "#6b2d5b"; // Beet medium purple
const _BL = "#8b3d7b"; // Beet light purple
const PV = "#55aa44"; // Pea vegetal green
const DPG = "#448833"; // Dark pea green
const LPG = "#77cc66"; // Light pea green
const CY = "#eebb33"; // Corn yellow
const DCY = "#cc9922"; // Dark corn yellow
const LCY = "#ffdd55"; // Light corn yellow
const LT = "#bb7733"; // Lentil brown
const DLN = "#995522"; // Dark lentil
const LLN = "#dd9944"; // Light lentil
const CHP = "#ddbb88"; // Chickpea beige
const DHP = "#bb9966"; // Dark chickpea
const LHP = "#eedd99"; // Light chickpea

export const beetRevealSprite: SpriteData = [
  [_, _, _, _, _, _, GN, _, GN, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, GN, GN, GN, _, _, _, _, _, _, _],
  [_, _, _, _, _, GN, GN, GN, GN, GN, _, _, _, _, _, _],
  [_, _, _, _, _BD, MR, GN, GN, MR, _BD, _, _, _, _, _, _],
  [_, _, _, _BD, MR, _BL, MR, MR, _BL, MR, _BD, _, _, _, _, _],
  [_, _, _BD, MR, MR, MR, _BL, MR, MR, MR, MR, _BD, _, _, _, _],
  [_, _, _BD, MR, _BL, MR, MR, MR, MR, _BL, MR, _BD, _, _, _, _],
  [_, _, _BD, MR, MR, MR, MR, MR, _BL, MR, MR, _BD, _, _, _, _],
  [_, _, _, _BD, MR, MR, _BL, MR, MR, MR, _BD, _, _, _, _, _],
  [_, _, _, _, _BD, _BD, MR, MR, _BD, _BD, _, _, _, _, _, _],
  [_, _, _, _, _, _BD, _BD, _BD, _BD, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _BD, BN, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, BN, _, _, _, _, _, _, _, _],
];

export const peaRevealSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, DPG, PV, DPG, _, _, _, _, _, _, _, _],
  [_, _, _, _, DPG, PV, LPG, PV, DPG, _, _, _, _, _, _, _],
  [_, _, _, _, DPG, PV, PV, PV, DPG, _, _, _, _, _, _, _],
  [_, _, _, _, _, DPG, DPG, DPG, _, DPG, PV, DPG, _, _, _, _],
  [_, _, DPG, PV, DPG, _, _, _, DPG, PV, LPG, PV, DPG, _, _, _],
  [_, DPG, PV, LPG, PV, DPG, _, _, DPG, PV, PV, PV, DPG, _, _, _],
  [_, DPG, PV, PV, PV, DPG, _, _, _, DPG, DPG, DPG, _, _, _, _],
  [_, _, DPG, DPG, DPG, _, DPG, PV, DPG, _, _, _, _, _, _, _],
  [_, _, _, _, _, DPG, PV, LPG, PV, DPG, _, _, _, _, _, _],
  [_, _, _, _, _, DPG, PV, PV, PV, DPG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DPG, DPG, DPG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const cornRevealSprite: SpriteData = [
  [_, _, _, _, _, _, _, GN, GN, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, GN, GN, GN, GN, _, _, _, _, _, _],
  [_, _, _, _, _, GN, DCY, CY, CY, GN, _, _, _, _, _, _],
  [_, _, _, _, _, GN, CY, LCY, CY, DCY, GN, _, _, _, _, _],
  [_, _, _, _, GN, CY, LCY, CY, LCY, CY, GN, _, _, _, _, _],
  [_, _, _, _, GN, CY, CY, LCY, CY, CY, GN, _, _, _, _, _],
  [_, _, _, _, GN, DCY, CY, CY, LCY, CY, GN, _, _, _, _, _],
  [_, _, _, _, GN, CY, LCY, CY, CY, DCY, GN, _, _, _, _, _],
  [_, _, _, _, GN, CY, CY, CY, CY, CY, GN, _, _, _, _, _],
  [_, _, _, _, _, GN, DCY, CY, DCY, GN, _, _, _, _, _, _],
  [_, _, _, _, _, _, GN, GN, GN, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, GN, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const lentilRevealSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, DLN, LT, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, DLN, LT, LLN, LT, _, _, _, _, _, _, _, _],
  [_, _, _, _, DLN, LT, LT, DLN, _, DLN, LT, _, _, _, _, _],
  [_, _, _, _, _, DLN, DLN, _, DLN, LT, LLN, LT, _, _, _, _],
  [_, _, DLN, LT, _, _, _, _, DLN, LT, LT, DLN, _, _, _, _],
  [_, DLN, LT, LLN, LT, _, _, _, _, DLN, DLN, _, _, _, _, _],
  [_, DLN, LT, LT, DLN, _, _, DLN, LT, _, _, _, _, _, _, _],
  [_, _, DLN, DLN, _, _, DLN, LT, LLN, LT, _, _, _, _, _, _],
  [_, _, _, _, _, _, DLN, LT, LT, DLN, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, DLN, DLN, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const chickpeaRevealSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, DHP, CHP, DHP, _, _, _, _, _, _, _, _],
  [_, _, _, _, DHP, CHP, LHP, CHP, DHP, _, _, _, _, _, _, _],
  [_, _, _, _, DHP, CHP, CHP, CHP, DHP, _, _, _, _, _, _, _],
  [_, _, _, _, _, DHP, DHP, DHP, _, DHP, CHP, DHP, _, _, _, _],
  [_, _, DHP, CHP, DHP, _, _, _, DHP, CHP, LHP, CHP, DHP, _, _, _],
  [_, DHP, CHP, LHP, CHP, DHP, _, _, DHP, CHP, CHP, CHP, DHP, _, _, _],
  [_, DHP, CHP, CHP, CHP, DHP, _, _, _, DHP, DHP, DHP, _, _, _, _],
  [_, _, DHP, DHP, DHP, _, DHP, CHP, DHP, _, _, _, _, _, _, _],
  [_, _, _, _, _, DHP, CHP, LHP, CHP, DHP, _, _, _, _, _, _],
  [_, _, _, _, _, DHP, CHP, CHP, CHP, DHP, _, _, _, _, _, _],
  [_, _, _, _, _, _, DHP, DHP, DHP, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const sunflowerSeedsSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, RD, RD, RD, RD, _, _, _, _, _, _],
  [_, _, _, _, _, RD, RD, RD, RD, RD, RD, _, _, _, _, _],
  [_, _, _, _, _, BK, BK, BK, BK, BK, BK, _, _, _, _, _],
  [_, _, _, _, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, _, RD, RD, YL, YL, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, _, RD, YL, YL, YF, YL, YL, RD, RD, _, _, _, _],
  [_, _, _, _, RD, YL, YF, OG, YF, YL, RD, RD, _, _, _, _],
  [_, _, _, _, RD, YL, YL, YF, YL, YL, RD, RD, _, _, _, _],
  [_, _, _, _, RD, RD, YL, YL, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, _, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, _, RD, RD, RD, RD, RD, RD, RD, RD, _, _, _, _],
  [_, _, _, _, _, RD, RD, RD, RD, RD, RD, _, _, _, _, _],
];

// --- NEW ITEM SPRITES FOR LEVELS 2-4 ---

export const molokoCartonSprite: SpriteData = [
  [_, _, _, _, _, WH, WH, WH, WH, WH, WH, _, _, _, _, _],
  [_, _, _, _, WH, WH, _, _, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, WH, WH, _, _, _, _, WH, WH, WH, WH, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, _, WH, LB, LB, LB, LB, LB, LB, LB, LB, WH, _, _, _],
  [_, _, _, WH, LB, LB, LB, LB, LB, LB, LB, LB, WH, _, _, _],
  [_, _, _, WH, LB, LB, LB, LB, LB, LB, LB, LB, WH, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
];

export const chaiBoxSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, OG, OG, OG, OG, OG, OG, OG, OG, _, _, _, _],
  [_, _, _, _, OG, OG, OG, OG, OG, OG, OG, OG, _, _, _, _],
  [_, _, _, _, OG, YF, YF, YF, YF, YF, YF, OG, _, _, _, _],
  [_, _, _, _, OG, YF, YF, YF, YF, YF, YF, OG, _, _, _, _],
  [_, _, _, _, OG, YF, YF, YF, YF, YF, YF, OG, _, _, _, _],
  [_, _, _, _, OG, OG, OG, OG, OG, OG, OG, OG, _, _, _, _],
  [_, _, _, _, OG, OG, OG, GN, GN, OG, OG, OG, _, _, _, _],
  [_, _, _, _, OG, OG, GN, GN, GN, GN, OG, OG, _, _, _, _],
  [_, _, _, _, OG, OG, OG, OG, OG, OG, OG, OG, _, _, _, _],
  [_, _, _, _, OG, OG, OG, OG, OG, OG, OG, OG, _, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, _, _, BN, BN, BN, BN, BN, BN, _, _, _, _, _],
];

export const sakharBagSprite: SpriteData = [
  [_, _, _, _, _, WH, WH, WH, WH, WH, WH, _, _, _, _, _],
  [_, _, _, _, WH, LN, WH, WH, WH, LN, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, LN, LN, LN, LN, LN, LN, WH, _, _, _, _],
  [_, _, _, _, WH, LN, LN, LN, LN, LN, LN, WH, _, _, _, _],
  [_, _, _, _, WH, LN, LN, LN, LN, LN, LN, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
];

export const masloButterSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, LG, LG, YF, YF, YF, YF, YF, YF, YF, LG, LG, _, _],
  [_, _, LG, LG, YF, YF, YF, YF, YF, YF, YF, YF, YF, LG, LG, _],
  [_, _, LG, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, LG, _],
  [_, _, LG, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, LG, _],
  [_, _, LG, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, LG, _],
  [_, _, LG, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, LG, _],
  [_, _, LG, LG, YF, YF, YF, YF, YF, YF, YF, YF, YF, LG, LG, _],
  [_, _, _, LG, LG, LG, LG, LG, LG, LG, LG, LG, LG, LG, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const yablokoAppleSprite: SpriteData = [
  [_, _, _, _, _, _, _, BN, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, BN, GN, _, _, _, _, _, _, _],
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

export const kartoshkaSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, PD, PD, PB, PB, PB, PB, PD, PD, _, _, _, _],
  [_, _, _, PD, PB, PB, PB, PB, PB, PB, PB, PB, PD, _, _, _],
  [_, _, PD, PB, PB, PB, PS, PB, PB, PS, PB, PB, PB, PD, _, _],
  [_, _, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, _, _],
  [_, _, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, _, _],
  [_, _, PB, PB, PB, PS, PB, PB, PB, PB, PS, PB, PB, PB, _, _],
  [_, _, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, PB, _, _],
  [_, _, _, PD, PB, PB, PB, PB, PB, PB, PB, PB, PD, _, _, _],
  [_, _, _, _, PD, PD, PB, PB, PB, PB, PD, PD, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const rybaFishSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, LB, LB, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, LB, LB, LB, _, _, _, _, _],
  [_, _, DG, DG, _, _, DG, DG, DG, DG, DG, DG, DG, _, _, _],
  [_, DG, DG, DG, DG, DG, DG, DG, DG, DG, WH, BK, DG, DG, _, _],
  [_, _, DG, DG, DG, DG, DG, DG, DG, DG, DG, DG, DG, DG, _, _],
  [_, _, DG, DG, DG, DG, DG, DG, DG, DG, DG, DG, DG, DG, _, _],
  [_, _, _, DG, DG, DG, DG, DG, DG, DG, DG, DG, DG, _, _, _],
  [_, _, _, _, _, _, _, _, LB, LB, LB, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, LB, LB, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const hlebRyeSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, LN, LN, LN, LN, _, _, _, _, _, _],
  [_, _, _, _, _, BN, LN, BN, LN, BN, BN, _, _, _, _, _],
  [_, _, _, _, BN, BN, BN, LN, BN, LN, BN, BN, _, _, _, _],
  [_, _, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _],
  [_, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _],
  [_, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _],
  [_, _,"#5a3a1a","#5a3a1a", BN, BN, BN, BN, BN, BN, BN, BN,"#5a3a1a","#5a3a1a", _, _],
  [_, _,"#5a3a1a","#5a3a1a","#5a3a1a", BN, BN, BN, BN, BN, BN,"#5a3a1a","#5a3a1a","#5a3a1a", _, _],
  [_, _,"#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a", _, _],
  [_, _,"#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a","#5a3a1a", _, _],
  [_, _,"#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10", _, _],
  [_, _, _,"#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10","#4a2a10", _, _, _],
];

export const syrCheeseSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, YF, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, YF, YF, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, YF, YF, YF, _, _, _, _],
  [_, _, _, _, _, _, _, _, YF, YF, OG, YF, _, _, _, _],
  [_, _, _, _, _, _, _, YF, YF, YF, YF, YF, _, _, _, _],
  [_, _, _, _, _, _, YF, YF, OG, YF, YF, YF, _, _, _, _],
  [_, _, _, _, _, YF, YF, YF, YF, YF, YF, YF, _, _, _, _],
  [_, _, _, _, YF, YF, YF, YF, YF, OG, YF, YF, _, _, _, _],
  [_, _, _, YF, YF, OG, YF, YF, YF, YF, YF, YF, _, _, _, _],
  [_, _, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, _, _, _, _],
  [_, _, YL, YL, YL, YL, YL, YL, YL, YL, YL, YL, _, _, _, _],
];

export const vodkaBottleSprite: SpriteData = [
  [_, _, _, _, _, _, WE, WE, WE, WE, _, _, _, _, _, _],
  [_, _, _, _, _, _, WE, WE, WE, WE, _, _, _, _, _, _],
  [_, _, _, _, _, WE, WE, WE, WE, WE, WE, _, _, _, _, _],
  [_, _, _, _, _, WE, WE, WE, WE, WE, WE, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, WH, RD, RD, RD, RD, WH, WE, _, _, _, _],
  [_, _, _, _, WE, WH, WH, WH, WH, WH, WH, WE, _, _, _, _],
  [_, _, _, _, WE, WH, WH, WH, WH, WH, WH, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, LG, LG, LG, LG, LG, LG, LG, LG, _, _, _, _],
];

export const konfetaCandySprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, PP, PP, _, _, _, _, _, _, _, _, PP, PP, _, _],
  [_, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, _],
  [_, _, PP, PP, PP, GD, GD, GD, GD, GD, GD, PP, PP, PP, _, _],
  [_, _, PP, PP, PP, GD, GD, GD, GD, GD, GD, PP, PP, PP, _, _],
  [_, _, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, _, _],
  [_, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, PP, _],
  [_, _, PP, PP, _, _, _, _, _, _, _, _, PP, PP, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

export const ogurtsyCukeSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, DK, DK, GN, GN, GN, GN, _, _, _, _, _],
  [_, _, _, _, DK, GN, GN, GN, GN, GN, GN, GN, _, _, _, _],
  [_, _, _, DK, GN, GN, DK, GN, GN, DK, GN, GN, GN, _, _, _],
  [_, _, _, GN, GN, GN, GN, GN, GN, GN, GN, GN, GN, _, _, _],
  [_, _, _, GN, GN, DK, GN, GN, DK, GN, GN, GN, GN, _, _, _],
  [_, _, _, GN, GN, GN, GN, GN, GN, GN, GN, GN, GN, _, _, _],
  [_, _, _, _, GN, GN, GN, GN, GN, GN, GN, GN, _, _, _, _],
  [_, _, _, _, _, GN, GN, GN, GN, GN, GN, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// --- SHOP SPRITES ---

// Shop exterior (32×24 logical, drawn at 2x = 64×48)
export const shopExteriorSprite: SpriteData = [
  // Awning top
  [_, _, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, RD, _, _],
  [_, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, WH, RD, RD, _],
  [RD, WH, WH, RD, RD, WH, WH, RD, RD, WH, WH, RD, RD, WH, WH, RD, RD, WH, WH, RD, RD, WH, WH, RD, RD, WH, WH, RD, RD, WH, WH, RD],
  // Sign area
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  // Wall
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  // Door area
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, YL, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
];

// Shop shelf (16×8 logical)
export const shopShelfSprite: SpriteData = [
  [BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN],
  [LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN],
  [BN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, BN],
  [BN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, BN],
  [BN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, BN],
  [BN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, BN],
  [BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN],
  [_, _, BN, _, _, _, _, _, _, _, _, _, _, BN, _, _],
];

// Shopkeeper (14×22 logical)
export const shopkeeperSprite: SpriteData = [
  // Hat
  [_, _, _, _, _, WH, WH, WH, WH, _, _, _, _, _],
  [_, _, _, _, WH, WH, WH, WH, WH, WH, _, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  // Face
  [_, _, _, _, SK, SK, SK, SK, SK, SK, _, _, _, _],
  [_, _, _, SK, SK, BK, SK, SK, BK, SK, SK, _, _, _],
  [_, _, _, SK, SK, SK, SK, SK, SK, SK, SK, _, _, _],
  [_, _, _, _, SK, SK, RD, RD, SK, SK, _, _, _, _],
  // Apron
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  // Legs
  [_, _, _, _, _, BK, BK, _, BK, BK, _, _, _, _],
  [_, _, _, _, _, BK, BK, _, BK, BK, _, _, _, _],
  [_, _, _, _, _, BK, BK, _, BK, BK, _, _, _, _],
  [_, _, _, _, BK, BK, BK, _, BK, BK, BK, _, _, _],
  [_, _, _, _, BK, BK, BK, _, BK, BK, BK, _, _, _],
];

// Shop interior background (32×24 logical)
export const shopInteriorBgSprite: SpriteData = (() => {
  const rows: Row[] = [];
  // Ceiling
  for (let i = 0; i < 3; i++) {
    rows.push(Array(32).fill(BM));
  }
  // Walls
  for (let i = 0; i < 18; i++) {
    const row: (string | null)[] = Array(32).fill(WE);
    row[0] = BT; row[31] = BT;
    rows.push(row);
  }
  // Floor
  for (let i = 0; i < 3; i++) {
    rows.push(Array(32).fill(BT));
  }
  return rows;
})();

// --- SHOP INTERIOR SPRITES ---

// Shopkeeper babushka (24×31 logical, drawn at 2x = 48×62)
// Blue headscarf, white apron, skeptical eyes. NOT purple like street babushka.
export const shopkeeperBabushkaSprite: SpriteData = [
  [_,_,_,_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,KB,BS,BS,BS,BS,BS,BS,BS,BS,KB,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,BS,BS,BS,BS,BS,BS,BS,BS,BS,BS,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,BS,BK,BS,BS,BS,BS,BK,BS,BS,BS,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,BS,BS,BS,BS,BS,BS,BS,BS,BS,BS,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,BS,BS,BS,"#dd9977",BS,BS,BS,BS,BS,BS,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,_,KB,KB,BS,BS,BS,BS,BS,BS,BS,KB,KB,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_,_,_,_,_],
  [_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,KB,_,_,_,_],
  [_,_,BS,BS,KB,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,KB,BS,BS,_,_],
  [_,_,_,_,KB,KB,KB,KB,AW,AW,AW,AW,AW,AW,AW,AW,KB,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,KB,KB,AW,AW,AW,AW,AW,AW,KB,KB,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,KB,KB,AW,AW,AW,AW,AW,AW,KB,KB,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_],
  [_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_],
  [_,_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,KB,_,_,_,_,_],
  [_,_,_,_,_,_,KB,KB,KB,_,_,_,_,_,_,KB,KB,KB,_,_,_,_,_,_],
  [_,_,_,_,_,_,KB,KB,KB,_,_,_,_,_,_,KB,KB,KB,_,_,_,_,_,_],
  [_,_,_,_,_,"#333333","#333333",KB,KB,_,_,_,_,_,_,KB,KB,"#333333","#333333",_,_,_,_,_],
  [_,_,_,_,_,"#333333","#333333","#333333",_,_,_,_,_,_,_,_,"#333333","#333333","#333333",_,_,_,_,_],
];

// Front door (16×40 logical, drawn at 2x = 32×80)
// Glass pane top third, brass handle, wood panels
export const doorFrontSprite: SpriteData = [
  [DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF],
  [DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GL,GL,GL,GL,GL,GL,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GH,GH,GH,GH,GH,GH,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GH,GL,GL,GL,GL,GH,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GH,GL,GL,GL,GL,GH,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GH,GL,GL,GL,GL,GH,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GH,GL,GL,GL,GL,GH,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GH,GL,GL,GL,GL,GH,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,GL,GL,GL,GL,GL,GL,GL,GL,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DF,DF,DF,DF,DF,DF,DF,DF,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,BR,BR,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,BR,BR,DB,DF,DF],
  [DF,DF,DB,DB,DF,DF,DF,DF,DF,DF,DF,DF,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DB,DF,DF],
  [DF,DF,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,DF,DF],
  [DF,DF,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,DF,DF],
];

// Back door (16×40 logical, drawn at 2x = 32×80)
// Gray-green solid panel, push bar, no glass. ВЫХОД sign mounts above.
export const doorBackSprite: SpriteData = [
  [DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF],
  [DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF],
  [DF,DF,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,MS,MS,MS,MS,MS,MS,MS,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,ML,ML,ML,ML,ML,ML,ML,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DF,DF,DF,DF,DF,DF,DF,DF,DF,DF,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,DW,DV,DV,DV,DV,DV,DV,DV,DV,DV,DV,DX,DF,DF],
  [DF,DF,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,DF,DF],
  [DF,DF,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,BT,DF,DF],
];

// Door locked overlay (10×8 logical, drawn at 2x = 20×16)
// Red padlock centered on locked doors
export const doorLockedOverlay: SpriteData = [
  [_,_,_,LD,LD,LD,LD,_,_,_],
  [_,_,_,LD,_,_,LD,_,_,_],
  [_,_,LD,LD,LD,LD,LD,LD,_,_],
  [_,_,LR,LR,LR,LR,LR,LR,_,_],
  [_,_,LR,LR,LR,LR,LR,LR,_,_],
  [_,_,LR,LR,LD,LD,LR,LR,_,_],
  [_,_,LR,LR,LD,LD,LR,LR,_,_],
  [_,_,LR,LR,LR,LR,LR,LR,_,_],
];

// Exit sign — ВЫХОД (24×8 logical, drawn at 2x = 48×16)
// Soviet green with white pixel text + running man icon
export const exitSignSprite: SpriteData = [
  [ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED],
  [ED,EG,EG,WH,EG,EG,EG,EG,WH,_,WH,EG,WH,WH,_,EG,WH,_,WH,EG,WH,_,WH,ED],
  [ED,EG,WH,EG,WH,EG,EG,EG,WH,_,WH,EG,WH,EG,WH,EG,_,WH,_,EG,WH,_,WH,ED],
  [ED,EG,WH,WH,WH,EG,EG,EG,_,WH,_,EG,WH,WH,_,EG,_,WH,_,EG,WH,_,WH,ED],
  [ED,EG,WH,EG,EG,WH,EG,EG,WH,_,WH,EG,WH,EG,WH,EG,_,WH,_,EG,WH,_,WH,ED],
  [ED,EG,WH,EG,EG,WH,WH,EG,WH,_,WH,EG,WH,WH,_,EG,WH,_,WH,EG,_,WH,_,ED],
  [ED,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,ED],
  [ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED],
];

// --- LANDMARK SPRITES ---
// Background buildings for street levels — passive Cyrillic vocabulary exposure.
// Each is ~20×22 logical, drawn at 2x = 40×44 display.

function buildLandmark(w: number, h: number, ops: [number, number, number, number, string][]): SpriteData {
  const data: (string | null)[][] = Array.from({length: h}, () => Array(w).fill(null));
  for (const [x, y, bw, bh, c] of ops) {
    for (let dy = 0; dy < bh; dy++) {
      for (let dx = 0; dx < bw; dx++) {
        if (y + dy < h && x + dx < w) data[y + dy]![x + dx] = c;
      }
    }
  }
  return data;
}

// АПТЕКА — Pharmacy (green cross on white sign)
export const landmarkApteka: SpriteData = buildLandmark(20, 22, [
  [0, 5, 20, 15, LS],   // building body
  [1, 4, 18, 2, LW],    // cornice
  [2, 6, 16, 5, WH],    // sign bg (white)
  [2, 6, 16, 1, PG],    // sign top trim
  [2, 10, 16, 1, PG],   // sign bottom trim
  [3, 7, 2, 3, PG],     // cross vertical
  [2, 8, 4, 1, PG],     // cross horizontal
  [4, 13, 4, 4, WN],    // window
  [5, 14, 2, 2, WG],    // glass
  [11, 13, 5, 7, DB],   // door
  [12, 14, 3, 5, CF],   // door inner
  [14, 16, 1, 1, YL],   // handle
  [0, 20, 20, 2, GG],   // ground
]);

// БАНК — Bank (columns, navy sign)
export const landmarkBank: SpriteData = buildLandmark(22, 22, [
  [0, 4, 22, 16, BL],   // building body
  [1, 3, 20, 2, AT],    // cornice
  [2, 3, 2, 16, LW],    // column 1
  [7, 3, 2, 16, LW],    // column 2
  [13, 3, 2, 16, LW],   // column 3
  [18, 3, 2, 16, LW],   // column 4
  [4, 6, 14, 4, BV],    // sign bg (navy)
  [8, 12, 6, 8, DB],    // door
  [9, 13, 4, 6, CF],    // door inner
  [12, 16, 1, 1, YL],   // handle
  [0, 20, 22, 2, GG],   // ground
]);

// АВТОБУС — Bus stop (shelter with blue sign)
export const landmarkAvtobus: SpriteData = buildLandmark(14, 22, [
  [0, 1, 14, 1, LG],    // shelter roof
  [0, 1, 1, 20, DG],    // shelter post
  [6, 5, 2, 15, DG],    // sign post
  [1, 2, 12, 7, PO],    // sign plate (blue)
  [2, 3, 10, 5, PO],    // sign inner
  [4, 5, 5, 2, YL],     // bus icon body
  [5, 4, 3, 1, YL],     // bus icon roof
  [5, 7, 1, 1, BK],     // wheel 1
  [7, 7, 1, 1, BK],     // wheel 2
  [2, 18, 10, 1, SH],   // bench
  [3, 19, 2, 2, SH],    // bench leg 1
  [9, 19, 2, 2, SH],    // bench leg 2
  [0, 20, 14, 2, GG],   // ground
]);

// ПАРК — Park (gate with fence and tree peeking over)
export const landmarkPark: SpriteData = buildLandmark(20, 22, [
  [0, 8, 3, 12, AT],    // left pillar
  [17, 8, 3, 12, AT],   // right pillar
  [0, 6, 20, 3, BL],    // arch
  [5, 7, 10, 2, DK],    // sign on arch
  [3, 11, 1, 9, DG],    // fence bar 1
  [6, 11, 1, 9, DG],    // fence bar 2
  [9, 11, 1, 9, DG],    // fence bar 3
  [12, 11, 1, 9, DG],   // fence bar 4
  [15, 11, 1, 9, DG],   // fence bar 5
  [3, 12, 14, 1, DG],   // fence rail
  [7, 3, 6, 6, GN],     // tree canopy
  [6, 4, 8, 4, GN],     // tree canopy wider
  [9, 9, 2, 3, SH],     // trunk
  [0, 20, 20, 2, GG],   // ground
]);

// ШКОЛА — School (bell icon on brown sign)
export const landmarkShkola: SpriteData = buildLandmark(24, 22, [
  [0, 5, 24, 15, LK],   // building body
  [1, 4, 22, 2, LW],    // cornice
  [3, 6, 18, 4, SD],    // sign bg (brown)
  [4, 7, 3, 1, YL],     // bell top
  [5, 6, 1, 1, YL],     // bell handle
  [3, 8, 5, 1, YL],     // bell rim
  [2, 12, 3, 3, WN],    // window 1
  [7, 12, 3, 3, WN],    // window 2
  [14, 12, 3, 3, WN],   // window 3
  [19, 12, 3, 3, WN],   // window 4
  [10, 14, 4, 6, DB],   // door
  [11, 15, 2, 4, CF],   // door inner
  [9, 18, 6, 1, BL],    // steps
  [0, 20, 24, 2, GG],   // ground
]);

// ПОЧТА — Post office (blue sign, envelope icon)
export const landmarkPochta: SpriteData = buildLandmark(18, 22, [
  [0, 5, 18, 15, BL],   // building body
  [1, 4, 16, 2, AT],    // cornice
  [2, 6, 14, 5, PO],    // sign bg (blue)
  [3, 7, 4, 3, WH],     // envelope body
  [3, 7, 1, 1, PO],     // envelope flap L
  [6, 7, 1, 1, PO],     // envelope flap R
  [4, 8, 2, 1, WE],     // envelope fold
  [3, 12, 4, 4, WN],    // window
  [4, 13, 2, 2, WG],    // glass
  [9, 13, 4, 7, DB],    // door
  [10, 14, 2, 5, CF],   // door inner
  [11, 16, 1, 1, YL],   // handle
  [14, 14, 3, 2, PO],   // mail slot
  [0, 20, 18, 2, GG],   // ground
]);

// КАФЕ — Café (red striped awning)
export const landmarkKafe: SpriteData = buildLandmark(20, 22, [
  [0, 6, 18, 14, LK],   // building body
  [1, 5, 16, 2, LW],    // cornice
  [0, 7, 18, 2, RD],    // awning stripe 1
  [0, 7, 3, 2, DR],     // awning dark 1
  [6, 7, 3, 2, DR],     // awning dark 2
  [12, 7, 3, 2, DR],    // awning dark 3
  [3, 5, 12, 2, CF],    // sign bg
  [2, 10, 6, 5, WN],    // big window
  [3, 11, 4, 3, WG],    // glass
  [11, 11, 4, 9, DB],   // door
  [12, 12, 2, 7, CF],   // door inner
  [13, 15, 1, 1, YL],   // handle
  [16, 17, 2, 2, SH],   // outdoor table
  [0, 20, 20, 2, GG],   // ground
]);

// МАГАЗИН — Shop (orange sign, display window)
export const landmarkMagazin: SpriteData = buildLandmark(22, 22, [
  [0, 5, 22, 15, BL],   // building body
  [1, 4, 20, 2, AT],    // cornice
  [1, 6, 20, 4, SO],    // sign bg (orange)
  [2, 12, 8, 5, WN],    // display window
  [3, 13, 6, 3, WG],    // glass
  [4, 14, 2, 1, RD],    // item 1 (red)
  [6, 14, 2, 1, YL],    // item 2 (yellow)
  [13, 12, 5, 8, DB],   // door
  [14, 13, 3, 6, CF],   // door inner
  [16, 16, 1, 1, YL],   // handle
  [14, 13, 3, 2, GN],   // ОТКРЫТО sign
  [0, 20, 22, 2, GG],   // ground
]);

// БИБЛИОТЕКА — Library (maroon sign, book icons)
export const landmarkBiblioteka: SpriteData = buildLandmark(24, 22, [
  [0, 2, 24, 18, BL],   // building body
  [1, 1, 22, 2, AT],    // cornice
  [1, 3, 22, 5, LM],    // sign bg (maroon)
  [2, 4, 4, 1, SO],     // book 1 (orange)
  [2, 5, 4, 1, PO],     // book 2 (blue)
  [2, 6, 4, 1, GN],     // book 3 (green)
  [2, 4, 1, 3, WH],     // book spine
  [2, 10, 3, 3, WN],    // window 1
  [7, 10, 3, 3, WN],    // window 2
  [14, 10, 3, 3, WN],   // window 3
  [19, 10, 3, 3, WN],   // window 4
  [2, 14, 3, 3, WN],    // window 5
  [7, 14, 3, 3, WN],    // window 6
  [14, 14, 3, 3, WN],   // window 7
  [19, 14, 3, 3, WN],   // window 8
  [10, 14, 4, 6, DB],   // door
  [11, 15, 2, 4, CF],   // door inner
  [8, 19, 8, 1, BL],    // steps
  [0, 20, 24, 2, GG],   // ground
]);

// Landmark sprite lookup map
export const landmarkSprites: Record<string, SpriteData> = {
  "АПТЕКА": landmarkApteka,
  "БАНК": landmarkBank,
  "АВТОБУС": landmarkAvtobus,
  "ПАРК": landmarkPark,
  "ШКОЛА": landmarkShkola,
  "ПОЧТА": landmarkPochta,
  "КАФЕ": landmarkKafe,
  "МАГАЗИН": landmarkMagazin,
  "БИБЛИОТЕКА": landmarkBiblioteka,
};

// Wood shelf (32×8 logical, drawn at 2x = 64×16)
// Brown planks with L-brackets at edges. For dairy/bakery shops.
export const shelfWoodSprite: SpriteData = [
  [SL,SL,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SL,SL],
  [SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SD,SD,SH,SH,SH,SH,SH,SH,SH,SD,SD,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH],
  [SH,SH,SH,SD,SD,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SD,SD,SH,SH,SH,SH,SH,SH,SH],
  [SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SD,SD,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH],
  [SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH,SH],
  [SD,SD,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,SD,SD],
  [SD,SD,SD,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,SD,SD,SD],
  [SD,SD,SD,SD,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,SD,SD,SD,SD],
];

// Metal shelf (32×8 logical, drawn at 2x = 64×16)
// Wire rack with uprights. For butcher/produce shops.
export const shelfMetalSprite: SpriteData = [
  [MS,MS,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,MS,MS],
  [MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS],
  [MS,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,MS],
  [MS,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,MS],
  [MS,MS,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,ML,MS,MS],
  [MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS,MS],
  [MS,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,MS],
  [MS,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,MS],
];

// Interior wall tile (32×32 logical, drawn at 2x = 64×64)
// Cream plaster with wear marks and baseboard at bottom
export const interiorWallTile: SpriteData = (() => {
  const rows: Row[] = [];
  const wearMarks = new Set(["5,6","15,13","24,4","10,20","26,17","4,24","19,10","28,26"]);
  for (let y = 0; y < 32; y++) {
    const row: (string | null)[] = [];
    for (let x = 0; x < 32; x++) {
      if (y >= 30) { row.push(BT); }
      else if (y === 29) { row.push(BL); }
      else { row.push(wearMarks.has(`${x},${y}`) ? SS : SW); }
    }
    rows.push(row);
  }
  return rows;
})();

// Interior floor tile (32×32 logical, drawn at 2x = 64×64)
// Checkerboard linoleum with 8×8 tiles and grout lines
export const interiorFloorTile: SpriteData = (() => {
  const rows: Row[] = [];
  for (let y = 0; y < 32; y++) {
    const row: (string | null)[] = [];
    for (let x = 0; x < 32; x++) {
      const tileX = Math.floor(x / 8);
      const tileY = Math.floor(y / 8);
      const isGrout = (x % 8 === 7) || (y % 8 === 7);
      if (isGrout) { row.push(FT); }
      else if ((tileX + tileY) % 2 === 0) { row.push(TL); }
      else { row.push(FG); }
    }
    rows.push(row);
  }
  return rows;
})();

// Interior ceiling tile (32×4 logical, drawn at 2x = 64×8)
// Cream with fluorescent strip
export const interiorCeilingTile: SpriteData = [
  [SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW,SW],
  [SW,SW,SW,SW,SW,SW,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,SW,SW,SW,SW,SW,SW],
  [SW,SW,SW,SW,SW,SW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,FW,SW,SW,SW,SW,SW,SW],
  [SW,SW,SW,SW,SW,SW,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,FC,SW,SW,SW,SW,SW,SW],
];

// Counter (48×16 logical, drawn at 2x = 96×32)
// Laminate top, wood front, cash register
export const counterSprite: SpriteData = (() => {
  const rows: Row[] = [];
  for (let y = 0; y < 16; y++) {
    const row: (string | null)[] = [];
    for (let x = 0; x < 48; x++) {
      if (y < 4) {
        // Counter top with register area
        if (x >= 36 && x < 46 && y < 4) {
          if (y < 1) row.push(RG2);
          else if (x >= 38 && x < 42 && y >= 1 && y < 3) row.push(RS);
          else row.push(RG2);
        } else {
          row.push(KT);
        }
      } else if (y === 4 || y === 8) {
        row.push(SD);
      } else {
        row.push(SH);
      }
    }
    rows.push(row);
  }
  return rows;
})();

// --- LEVEL 5 ITEM SPRITES ---

// Plate (16×13)
export const tarelkaPlateSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, WE, WE, WE, LB, LB, LB, LB, LB, LB, WE, WE, WE, _, _],
  [_, _, WE, WE, LB, LB, LB, LB, LB, LB, LB, LB, WE, WE, _, _],
  [_, _, WE, WE, LB, LB, LB, LB, LB, LB, LB, LB, WE, WE, _, _],
  [_, _, WE, WE, WE, LB, LB, LB, LB, LB, LB, WE, WE, WE, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Spoon (16×13)
export const lozhkaSpoonSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, LG, LG, LG, _, _, _, _, _, _],
  [_, _, _, _, _, _, LG, LG, LG, LG, LG, _, _, _, _, _],
  [_, _, _, _, _, LG, LG, WE, WE, LG, LG, _, _, _, _, _],
  [_, _, _, _, _, LG, LG, WE, WE, LG, LG, _, _, _, _, _],
  [_, _, _, _, _, _, LG, LG, LG, LG, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, LG, LG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, LG, LG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, LG, LG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, LG, LG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, LG, LG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, LG, LG, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Cup (16×13)
export const chashkaCupSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, WE, LB, LB, LB, LB, LB, LB, WE, _, _, _, _],
  [_, _, _, _, WE, LB, LB, LB, LB, LB, LB, WE, WE, _, _, _],
  [_, _, _, _, WE, LB, LB, LB, LB, LB, LB, WE, _, WE, _, _],
  [_, _, _, _, WE, LB, LB, LB, LB, LB, LB, WE, _, WE, _, _],
  [_, _, _, _, WE, LB, LB, LB, LB, LB, LB, WE, WE, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, _, WE, WE, WE, WE, WE, WE, _, _, _, _, _],
  [_, _, _, _, _, _, WE, WE, WE, WE, _, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Pillow decoy (16×13)
export const podushkaPillowSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, WH, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, WH, _, _],
  [_, _, WH, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, WH, _, _],
  [_, _, WH, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, WH, _, _],
  [_, _, WH, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, WH, _, _],
  [_, _, WH, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, WH, _, _],
  [_, _, _, WH, WH, WH, WH, WH, WH, WH, WH, WH, WH, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Clock decoy (16×13)
export const chasyClock: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, WE, WE, WE, WE, WE, WE, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, BK, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, BK, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, BK, BK, BK, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, _, _, WE, WE, WE, WE, WE, WE, _, _, _, _, _],
  [_, _, _, _, _, _, _, BK, BK, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, BK, BK, BK, BK, _, _, _, _, _, _],
];

// Soap decoy (16×13)
export const myloSoapSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, PP, PP, PP, PP, PP, PP, _, _, _, _, _],
  [_, _, _, _, PP, PP, PP, PP, PP, PP, PP, PP, _, _, _, _],
  [_, _, _, _, PP, PP, WE, WE, WE, PP, PP, PP, _, _, _, _],
  [_, _, _, _, PP, PP, WE, WE, WE, PP, PP, PP, _, _, _, _],
  [_, _, _, _, PP, PP, PP, PP, PP, PP, PP, PP, _, _, _, _],
  [_, _, _, _, PP, PP, PP, PP, PP, PP, PP, PP, _, _, _, _],
  [_, _, _, _, _, PP, PP, PP, PP, PP, PP, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Remote control decoy (16×13)
export const pultRemoteSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, DG, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, RD, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, DG, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, DG, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, LG, LG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, LG, LG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, DG, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, LG, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, DG, LG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, LG, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, DG, DG, DG, DG, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// --- LEVEL 6 ITEM SPRITES ---

// Cheese wheel (16×13) — different from cheese wedge
export const syrWheelSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, YF, YF, YF, YF, YF, YF, _, _, _, _, _],
  [_, _, _, _, YF, YF, YF, YF, YF, YF, YF, YF, _, _, _, _],
  [_, _, _, YF, YF, YF, OG, YF, YF, OG, YF, YF, YF, _, _, _],
  [_, _, _, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, _, _, _],
  [_, _, YF, YF, OG, YF, YF, YF, YF, YF, OG, YF, YF, YF, _, _],
  [_, _, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, _, _],
  [_, _, YF, YF, YF, YF, OG, YF, YF, OG, YF, YF, YF, YF, _, _],
  [_, _, _, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, _, _, _],
  [_, _, _, YF, YF, YF, YF, YF, YF, YF, YF, YF, YF, _, _, _],
  [_, _, _, _, YF, YF, YF, YF, YF, YF, YF, YF, _, _, _, _],
  [_, _, _, _, _, YL, YL, YL, YL, YL, YL, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Smoked fish (16×13)
export const rybaSmokedSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, OG, OG, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, OG, OG, OG, _, _, _, _, _],
  [_, _, DG, DG, _, _, OG, OG, OG, OG, OG, OG, OG, _, _, _],
  [_, OG, OG, OG, OG, OG, OG, OG, OG, OG, WH, BK, OG, OG, _, _],
  [_, _, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, _, _],
  [_, _, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, _, _],
  [_, _, _, OG, OG, OG, OG, OG, OG, OG, OG, OG, OG, _, _, _],
  [_, _, _, _, _, _, _, _, OG, OG, OG, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, OG, OG, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Cream jar (16×13)
export const slivkiJarSprite: SpriteData = [
  [_, _, _, _, _, _, WH, WH, WH, WH, _, _, _, _, _, _],
  [_, _, _, _, _, WH, WH, WH, WH, WH, WH, _, _, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, YF, YF, YF, YF, YF, YF, YF, YF, WE, _, _, _],
  [_, _, _, WE, YF, YF, YF, YF, YF, YF, YF, YF, WE, _, _, _],
  [_, _, _, WE, YF, YF, YF, YF, YF, YF, YF, YF, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, WE, WE, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _],
  [_, _, _, _, WE, WE, WE, WE, WE, WE, WE, WE, _, _, _, _],
];

// Mushroom basket (16×13)
export const gribBasketSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, BN, _, _, _, BN, _, _, _, _, _, _],
  [_, _, _, _, BN, BN, BN, _, BN, BN, BN, _, _, _, _, _],
  [_, _, _, _, OG, BN, _, _, _, OG, BN, _, _, _, _, _],
  [_, _, _, _, OG, OG, _, _, _, OG, OG, _, _, _, _, _],
  [_, _, _, BN, BN, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _],
  [_, _, BN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, BN, _, _],
  [_, _, BN, LN, BN, LN, BN, LN, BN, LN, BN, LN, LN, BN, _, _],
  [_, _, BN, LN, LN, LN, LN, LN, LN, LN, LN, LN, LN, BN, _, _],
  [_, _, BN, BN, LN, BN, LN, BN, LN, BN, LN, BN, BN, BN, _, _],
  [_, _, _, BN, LN, LN, LN, LN, LN, LN, LN, LN, BN, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Sausage ring decoy for L6 (16×13)
export const kolbasaRingSprite: SpriteData = [
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, DR, DR, DR, DR, DR, DR, _, _, _, _, _],
  [_, _, _, _, DR, RD, RD, RD, RD, RD, RD, DR, _, _, _, _],
  [_, _, _, DR, RD, RD, WE, RD, RD, WE, RD, RD, DR, _, _, _],
  [_, _, _, DR, RD, _, _, _, _, _, _, RD, DR, _, _, _],
  [_, _, _, DR, RD, _, _, _, _, _, _, RD, DR, _, _, _],
  [_, _, _, DR, RD, _, _, _, _, _, _, RD, DR, _, _, _],
  [_, _, _, DR, RD, RD, _, _, _, _, RD, RD, DR, _, _, _],
  [_, _, _, _, DR, RD, RD, RD, RD, RD, RD, DR, _, _, _, _],
  [_, _, _, _, _, DR, DR, DR, DR, DR, DR, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _],
];

// Kvass bottle decoy for L6 (16×13)
export const kvassBottleSprite: SpriteData = [
  [_, _, _, _, _, _, BN, BN, BN, BN, _, _, _, _, _, _],
  [_, _, _, _, _, _, BN, BN, BN, BN, _, _, _, _, _, _],
  [_, _, _, _, _, BN, BN, BN, BN, BN, BN, _, _, _, _, _],
  [_, _, _, _, _, BN, BN, BN, BN, BN, BN, _, _, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, _, BN, YL, YL, YL, YL, YL, YL, BN, _, _, _, _],
  [_, _, _, _, BN, YL, YL, YL, YL, YL, YL, BN, _, _, _, _],
  [_, _, _, _, BN, YL, YL, YL, YL, YL, YL, BN, _, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, _, BN, BN, BN, BN, BN, BN, BN, BN, _, _, _, _],
  [_, _, _, _, LG, LG, LG, LG, LG, LG, LG, LG, _, _, _, _],
];

// --- Sprite drawing utility ---

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: SpriteData,
  x: number,
  y: number,
  scale: number = 2,
  flipH: boolean = false
): void {
  const w = sprite[0]?.length ?? 0;
  for (let row = 0; row < sprite.length; row++) {
    const spriteRow = sprite[row];
    if (!spriteRow) continue;
    for (let col = 0; col < spriteRow.length; col++) {
      const color = spriteRow[col];
      if (!color) continue;
      ctx.fillStyle = color;
      const drawCol = flipH ? w - 1 - col : col;
      ctx.fillRect(x + drawCol * scale, y + row * scale, scale, scale);
    }
  }
}

// --- Sprite lookup for items ---

import {
  bunaBagSprite, wetetJugSprite, daboRoundSprite, sukwarBagEthSprite,
  berbereTinSprite, teffSackSprite, mangoSprite, bottledWaterSprite,
  shiroBagSprite, qibeJarSprite, timatimSprite, injeraRollSprite,
  honeyJarSprite, avocadoSprite, miserBagSprite, qeySirBeetSprite,
  karyaPepperSprite, jebenaPotSprite, rekbotCupSprite, itanIncenseSprite,
  koloBowlSprite, eggSprite, teaCupSprite,
} from "./sprites_ethiopia";

import {
  pannaTubSprite, latteBottleSprite, salameLinkSprite,
  oliveJarSprite, breadRoundSprite, vinegarBottleSprite,
  caffeTinSprite, zuccheroBagSprite, biscottiBoxSprite,
  wineBottleSprite, pastaBoxSprite, olioBottleSprite,
  pomodoroSprite, paneLoafSprite, aglioBulbSprite,
  cioccolatoBarSprite, formaggioWedgeSprite, melaAppleSprite,
  piattoPlateSprite, cucchiaioSpoonSprite, tazzaCupSprite,
  cuscinoPillowSprite, orologioClockSprite, saponeSoapSprite,
  telecomandoRemoteSprite, pecorinoWheelSprite, prosciuttoLegSprite,
  focacciaSlabSprite, basilicoBunchSprite, salameRingSprite,
  panetteriaSpriteIT, macelleriaSpriteIT, fruttivendoloSpriteIT,
} from "./sprites_italy";

const itemSpriteMap: Record<string, SpriteData> = {
  // Belarus items (L1-4)
  smetana_tub: smetanaTubSprite,
  kefir_bottle: kefirBottleSprite,
  kolbasa_link: kolbasaLinkSprite,
  pickle_jar: pickleJarSprite,
  bread_loaf: breadLoafSprite,
  mystery_can: mysteryCanSprite,
  beet_reveal: beetRevealSprite,
  pea_reveal: peaRevealSprite,
  corn_reveal: cornRevealSprite,
  lentil_reveal: lentilRevealSprite,
  chickpea_reveal: chickpeaRevealSprite,
  sunflower_seeds: sunflowerSeedsSprite,
  moloko_carton: molokoCartonSprite,
  chai_box: chaiBoxSprite,
  sakhar_bag: sakharBagSprite,
  maslo_butter: masloButterSprite,
  yabloko_apple: yablokoAppleSprite,
  kartoshka: kartoshkaSprite,
  ryba_fish: rybaFishSprite,
  hleb_rye: hlebRyeSprite,
  syr_cheese: syrCheeseSprite,
  vodka_bottle: vodkaBottleSprite,
  konfeta_candy: konfetaCandySprite,
  ogurtsy_cuke: ogurtsyCukeSprite,
  // Belarus items (L5)
  tarelka_plate: tarelkaPlateSprite,
  lozhka_spoon: lozhkaSpoonSprite,
  chashka_cup: chashkaCupSprite,
  podushka_pillow: podushkaPillowSprite,
  chasy_clock: chasyClock,
  mylo_soap: myloSoapSprite,
  pult_remote: pultRemoteSprite,
  // Belarus items (L6)
  syr_wheel: syrWheelSprite,
  ryba_smoked: rybaSmokedSprite,
  slivki_jar: slivkiJarSprite,
  grib_basket: gribBasketSprite,
  kolbasa_ring: kolbasaRingSprite,
  kvass_bottle: kvassBottleSprite,
  // Ethiopia items
  buna_bag: bunaBagSprite,
  wetet_jug: wetetJugSprite,
  dabo_round: daboRoundSprite,
  sukwar_bag_eth: sukwarBagEthSprite,
  berbere_tin: berbereTinSprite,
  teff_sack: teffSackSprite,
  mango: mangoSprite,
  bottled_water: bottledWaterSprite,
  shiro_bag: shiroBagSprite,
  qibe_jar: qibeJarSprite,
  timatim_tomato: timatimSprite,
  injera_roll: injeraRollSprite,
  honey_jar: honeyJarSprite,
  avocado: avocadoSprite,
  miser_bag: miserBagSprite,
  qey_sir_beet: qeySirBeetSprite,
  karya_pepper: karyaPepperSprite,
  jebena_pot: jebenaPotSprite,
  rekbot_cup: rekbotCupSprite,
  itan_incense: itanIncenseSprite,
  kolo_bowl: koloBowlSprite,
  egg: eggSprite,
  tea_cup: teaCupSprite,
  // Italy items
  panna_tub: pannaTubSprite,
  latte_bottle: latteBottleSprite,
  salame_link: salameLinkSprite,
  olive_jar: oliveJarSprite,
  bread_round: breadRoundSprite,
  vinegar_bottle: vinegarBottleSprite,
  caffe_tin: caffeTinSprite,
  zucchero_bag: zuccheroBagSprite,
  biscotti_box: biscottiBoxSprite,
  wine_bottle: wineBottleSprite,
  pasta_box: pastaBoxSprite,
  olio_bottle: olioBottleSprite,
  pomodoro: pomodoroSprite,
  pane_loaf: paneLoafSprite,
  aglio_bulb: aglioBulbSprite,
  cioccolato_bar: cioccolatoBarSprite,
  formaggio_wedge: formaggioWedgeSprite,
  mela_apple: melaAppleSprite,
  piatto_plate: piattoPlateSprite,
  cucchiaio_spoon: cucchiaioSpoonSprite,
  tazza_cup: tazzaCupSprite,
  cuscino_pillow: cuscinoPillowSprite,
  orologio_clock: orologioClockSprite,
  sapone_soap: saponeSoapSprite,
  telecomando_remote: telecomandoRemoteSprite,
  pecorino_wheel: pecorinoWheelSprite,
  prosciutto_leg: prosciuttoLegSprite,
  focaccia_slab: focacciaSlabSprite,
  basilico_bunch: basilicoBunchSprite,
  salame_ring: salameRingSprite,
};

export function getItemSprite(itemId: string): SpriteData | undefined {
  return itemSpriteMap[itemId];
}
