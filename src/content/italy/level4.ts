import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3000;

export const level4Data: LevelData = {
  id: "le-scuse",
  name: "Le Scuse",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — spread across the level
    { x: 200, y: 320, width: 100, height: 16 },
    { x: 430, y: 270, width: 110, height: 16 },
    { x: 670, y: 310, width: 100, height: 16 },
    { x: 900, y: 250, width: 100, height: 16 },
    { x: 1120, y: 330, width: 120, height: 16 },
    { x: 1360, y: 280, width: 100, height: 16 },
    { x: 1580, y: 240, width: 90, height: 16 },
    { x: 1810, y: 310, width: 110, height: 16 },
    { x: 2010, y: 260, width: 100, height: 16 },
    { x: 2230, y: 200, width: 80, height: 16 }, // high platform for sacred olive
    { x: 2410, y: 320, width: 110, height: 16 },
    { x: 2600, y: 290, width: 100, height: 16 },
    { x: 2750, y: 340, width: 100, height: 16 },
  ],
  collectibles: [
    // Target items
    { itemId: "cioccolato_bar", x: 470, y: 240 },
    { itemId: "formaggio_wedge", x: 1160, y: 300 },
    { itemId: "mela_apple", x: 1850, y: 280 },

    // Decoy items
    { itemId: "olio_bottle", x: 240, y: 290 },
    { itemId: "caffe_tin", x: 710, y: 280 },
    { itemId: "pane_loaf", x: 1400, y: 250 },
    { itemId: "latte_bottle", x: 1620, y: 210 },
    { itemId: "mystery_can", x: 2450, y: 290 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 430, interval: 4500 },
  ],
  npcs: [
    { type: "babushka", x: 380, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 970, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 1650, y: GROUND_Y - 44, patrolRange: 110 },
    { type: "babushka", x: 2350, y: GROUND_Y - 44, patrolRange: 120 },

    // The Sacred Olive — high platform
    { type: "potato", x: 2240, y: 170 },
  ],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 2850, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
  landmarks: [
    { label: "EDICOLA", x: 300 },
    { label: "BANCA", x: 850 },
    { label: "BAR", x: 1450 },
    { label: "TABACCHI", x: 2100 },
  ],
};
