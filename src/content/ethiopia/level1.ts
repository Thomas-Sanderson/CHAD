import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3200;

export const level1Data: LevelData = {
  id: "coffee-run",
  name: "The Coffee Run",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — spread across the level
    { x: 180, y: 330, width: 120, height: 16 },
    { x: 420, y: 290, width: 100, height: 16 },
    { x: 660, y: 320, width: 140, height: 16 },
    { x: 900, y: 260, width: 100, height: 16 },
    { x: 1100, y: 340, width: 120, height: 16 },
    { x: 1340, y: 280, width: 80, height: 16 },
    { x: 1560, y: 310, width: 130, height: 16 },
    { x: 1800, y: 250, width: 100, height: 16 },
    { x: 2000, y: 340, width: 150, height: 16 },
    { x: 2250, y: 290, width: 100, height: 16 },
    { x: 2500, y: 200, width: 80, height: 16 }, // high platform for sacred coffee bean

    // Stepping stones near the gate
    { x: 2650, y: 330, width: 100, height: 16 },
    { x: 2850, y: 310, width: 120, height: 16 },
  ],
  collectibles: [
    // Target items
    { itemId: "buna_bag", x: 220, y: 300 },
    { itemId: "wetet_jug", x: 940, y: 230 },
    { itemId: "dabo_round", x: 1600, y: 280 },
    { itemId: "sukwar_bag_eth", x: 2290, y: 260 },

    // Decoy items
    { itemId: "berbere_tin", x: 460, y: 260 },
    { itemId: "mango", x: 700, y: 290 },
    { itemId: "bottled_water", x: 1380, y: 250 },
  ],
  hazards: [
    // Blue taxis crossing at ground level
    { type: "marshrutka", y: GROUND_Y - 40, speed: 400, interval: 6000 },
  ],
  npcs: [
    // Aunties patrolling ground sections
    { type: "babushka", x: 550, y: GROUND_Y - 44, patrolRange: 150 },
    { type: "babushka", x: 1450, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 2300, y: GROUND_Y - 44, patrolRange: 100 },

    // The Sacred Coffee Bean — high platform
    { type: "potato", x: 2510, y: 170 },
  ],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 3050, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
