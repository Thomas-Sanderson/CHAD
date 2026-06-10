import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3400;

export const level2Data: LevelData = {
  id: "tea-emergency",
  name: "The Tea Emergency",
  platforms: [
    // Ground
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms
    { x: 180, y: 340, width: 100, height: 16 },
    { x: 400, y: 300, width: 120, height: 16 },
    { x: 620, y: 260, width: 100, height: 16 },
    { x: 850, y: 330, width: 140, height: 16 },
    { x: 1100, y: 280, width: 100, height: 16 },
    { x: 1350, y: 320, width: 120, height: 16 },
    { x: 1600, y: 260, width: 90, height: 16 },
    { x: 1850, y: 340, width: 130, height: 16 },
    { x: 2100, y: 290, width: 100, height: 16 },
    { x: 2350, y: 250, width: 110, height: 16 },
    { x: 2600, y: 310, width: 100, height: 16 },
    { x: 2800, y: 200, width: 80, height: 16 }, // high platform for potato
    { x: 2950, y: 330, width: 120, height: 16 },
  ],
  collectibles: [
    // Targets
    { itemId: "chai_box", x: 430, y: 270 },
    { itemId: "moloko_carton", x: 1380, y: 290 },
    { itemId: "sakhar_bag", x: 2130, y: 260 },

    // Decoys
    { itemId: "pickle_jar", x: 660, y: 230 },
    { itemId: "mystery_can", x: 1140, y: 250 },
    { itemId: "vodka_bottle", x: 1890, y: 310 },
    { itemId: "konfeta_candy", x: 2640, y: 280 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 420, interval: 5500 },
  ],
  npcs: [
    { type: "babushka", x: 500, y: GROUND_Y - 44, patrolRange: 130 },
    { type: "babushka", x: 1400, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 2200, y: GROUND_Y - 44, patrolRange: 110 },

    // Sacred Potato
    { type: "potato", x: 2810, y: 170 },
  ],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 3250, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
