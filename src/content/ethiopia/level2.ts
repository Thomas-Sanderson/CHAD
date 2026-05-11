import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3400;

export const level2Data: LevelData = {
  id: "market-day",
  name: "Market Day",
  platforms: [
    // Ground
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms
    { x: 200, y: 340, width: 100, height: 16 },
    { x: 430, y: 300, width: 120, height: 16 },
    { x: 660, y: 260, width: 100, height: 16 },
    { x: 880, y: 330, width: 140, height: 16 },
    { x: 1120, y: 280, width: 100, height: 16 },
    { x: 1360, y: 320, width: 120, height: 16 },
    { x: 1600, y: 260, width: 90, height: 16 },
    { x: 1840, y: 340, width: 130, height: 16 },
    { x: 2080, y: 290, width: 100, height: 16 },
    { x: 2320, y: 250, width: 110, height: 16 },
    { x: 2580, y: 310, width: 100, height: 16 },
    { x: 2800, y: 200, width: 80, height: 16 }, // high platform for sacred coffee bean
    { x: 2960, y: 330, width: 120, height: 16 },
  ],
  collectibles: [
    // Targets
    { itemId: "shiro_bag", x: 460, y: 270 },
    { itemId: "berbere_tin", x: 1160, y: 250 },
    { itemId: "qibe_jar", x: 1880, y: 310 },
    { itemId: "timatim_tomato", x: 2360, y: 220 },

    // Decoys
    { itemId: "injera_roll", x: 700, y: 230 },
    { itemId: "honey_jar", x: 1400, y: 290 },
    { itemId: "avocado", x: 2620, y: 280 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 420, interval: 5500 },
  ],
  npcs: [
    { type: "babushka", x: 500, y: GROUND_Y - 44, patrolRange: 130 },
    { type: "babushka", x: 1300, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 2200, y: GROUND_Y - 44, patrolRange: 110 },

    // Sacred Coffee Bean
    { type: "potato", x: 2810, y: 170 },
  ],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 3250, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
