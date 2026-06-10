import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3000;

export const level1Data: LevelData = {
  id: "la-spesa",
  name: "La Spesa",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — spread across the level
    { x: 180, y: 330, width: 110, height: 16 },
    { x: 400, y: 290, width: 100, height: 16 },
    { x: 630, y: 320, width: 130, height: 16 },
    { x: 850, y: 270, width: 100, height: 16 },
    { x: 1050, y: 340, width: 120, height: 16 },
    { x: 1300, y: 280, width: 90, height: 16 },
    { x: 1500, y: 310, width: 120, height: 16 },
    { x: 1720, y: 250, width: 100, height: 16 },
    { x: 1940, y: 340, width: 140, height: 16 },
    { x: 2150, y: 290, width: 100, height: 16 },
    { x: 2380, y: 200, width: 80, height: 16 }, // high platform for sacred olive
    { x: 2530, y: 330, width: 100, height: 16 },
    { x: 2700, y: 310, width: 110, height: 16 },
  ],
  collectibles: [
    // Target items
    { itemId: "panna_tub", x: 220, y: 300 },
    { itemId: "latte_bottle", x: 1090, y: 310 },
    { itemId: "salame_link", x: 1980, y: 310 },

    // Decoy items
    { itemId: "olive_jar", x: 440, y: 260 },
    { itemId: "bread_round", x: 670, y: 290 },
    { itemId: "mystery_can", x: 1340, y: 250 },
    { itemId: "vinegar_bottle", x: 1550, y: 280 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 380, interval: 6000 },
  ],
  npcs: [
    { type: "babushka", x: 550, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 1400, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 2200, y: GROUND_Y - 44, patrolRange: 110 },

    // The Sacred Olive — high platform
    { type: "potato", x: 2390, y: 170 },
  ],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 2850, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
