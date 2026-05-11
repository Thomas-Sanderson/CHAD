import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3200;

export const level1Data: LevelData = {
  id: "grocery-run",
  name: "The Grocery Run",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — spread across the level
    { x: 200, y: 330, width: 120, height: 16 },
    { x: 450, y: 290, width: 100, height: 16 },
    { x: 680, y: 320, width: 140, height: 16 },
    { x: 900, y: 260, width: 100, height: 16 },
    { x: 1100, y: 340, width: 120, height: 16 },
    { x: 1350, y: 280, width: 80, height: 16 },
    { x: 1550, y: 310, width: 130, height: 16 },
    { x: 1800, y: 250, width: 100, height: 16 },
    { x: 2000, y: 340, width: 150, height: 16 },
    { x: 2250, y: 290, width: 100, height: 16 },
    { x: 2500, y: 200, width: 80, height: 16 }, // high platform for potato

    // Stepping stones near the gate
    { x: 2650, y: 330, width: 100, height: 16 },
    { x: 2850, y: 310, width: 120, height: 16 },
  ],
  collectibles: [
    // Target items — spread across the level on platforms and ground
    { itemId: "smetana_tub", x: 240, y: 300 },
    { itemId: "kefir_bottle", x: 1150, y: 310 },
    { itemId: "kolbasa_link", x: 2050, y: 310 },

    // Decoy items — interspersed to tempt the player
    { itemId: "pickle_jar", x: 490, y: 260 },
    { itemId: "bread_loaf", x: 720, y: 290 },
    { itemId: "mystery_can", x: 1390, y: 250 },
    { itemId: "sunflower_seeds", x: 1600, y: 280 },
  ],
  hazards: [
    // Marshrutkas crossing at ground level
    { type: "marshrutka", y: GROUND_Y - 40, speed: 400, interval: 6000 },
  ],
  npcs: [
    // Babushkas patrolling ground sections
    { type: "babushka", x: 600, y: GROUND_Y - 44, patrolRange: 150 },
    { type: "babushka", x: 1500, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 2300, y: GROUND_Y - 44, patrolRange: 100 },

    // The Sacred Potato — high platform, hard to reach
    { type: "potato", x: 2510, y: 170 },
  ],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 3050, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
