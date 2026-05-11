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
const EG = "#33aa44"; // Exit Green
const ED = "#228833"; // Exit Green Dark
const LR = "#cc4444"; // Lock Red
const LD = "#aa3333"; // Lock Dark
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

// Apartment gate (32×24 logical, drawn at 2x = 64×48)
export const apartmentSprite: SpriteData = [
  // Roof edge
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  // Windows row 1
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  // Windows row 2
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT, AT, AT, WB, WB, WB, WB, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  // Light above door
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, YL, YL, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  // Door area
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, YL, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, DB, DB, DB, DB, DB, DB, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
  [AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT, AT],
];

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

// Exit sign — ВЫХОД (20×8 logical, drawn at 2x = 40×16)
// Soviet green with white pixel text
export const exitSignSprite: SpriteData = [
  [ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED],
  [ED,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,EG,ED],
  [ED,EG,WH,_,WH,EG,WH,WH,_,EG,WH,_,WH,EG,WH,_,WH,EG,WH,ED],
  [ED,EG,WH,_,WH,EG,WH,EG,WH,EG,_,WH,_,EG,WH,_,WH,EG,WH,ED],
  [ED,EG,_,WH,_,EG,WH,WH,_,EG,_,WH,_,EG,WH,_,WH,EG,WH,ED],
  [ED,EG,WH,_,WH,EG,WH,EG,WH,EG,_,WH,_,EG,WH,_,WH,EG,EG,ED],
  [ED,EG,WH,_,WH,EG,WH,WH,_,EG,WH,_,WH,EG,_,WH,_,EG,WH,ED],
  [ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED,ED],
];

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

const itemSpriteMap: Record<string, SpriteData> = {
  // Belarus items (L1-4)
  smetana_tub: smetanaTubSprite,
  kefir_bottle: kefirBottleSprite,
  kolbasa_link: kolbasaLinkSprite,
  pickle_jar: pickleJarSprite,
  bread_loaf: breadLoafSprite,
  mystery_can: mysteryCanSprite,
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
};

export function getItemSprite(itemId: string): SpriteData | undefined {
  return itemSpriteMap[itemId];
}
