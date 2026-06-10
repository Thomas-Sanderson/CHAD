import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3200;

export const level4Data: LevelData = {
  id: "buna-ceremony",
  name: "The Buna Ceremony",
  platforms: [
    // Ground
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms
    { x: 220, y: 320, width: 100, height: 16 },
    { x: 460, y: 270, width: 120, height: 16 },
    { x: 710, y: 310, width: 100, height: 16 },
    { x: 940, y: 250, width: 110, height: 16 },
    { x: 1160, y: 330, width: 130, height: 16 },
    { x: 1400, y: 280, width: 100, height: 16 },
    { x: 1640, y: 240, width: 90, height: 16 },
    { x: 1860, y: 310, width: 120, height: 16 },
    { x: 2060, y: 260, width: 110, height: 16 },
    { x: 2300, y: 200, width: 80, height: 16 }, // high for sacred coffee bean
    { x: 2500, y: 320, width: 120, height: 16 },
    { x: 2700, y: 290, width: 100, height: 16 },
    { x: 2860, y: 340, width: 110, height: 16 },
  ],
  collectibles: [
    // Targets
    { itemId: "jebena_pot", x: 500, y: 240 },
    { itemId: "rekbot_cup", x: 1200, y: 300 },
    { itemId: "itan_incense", x: 1900, y: 280 },
    { itemId: "kolo_bowl", x: 2540, y: 290 },

    // Decoys — more of them to make it trickier
    { itemId: "buna_bag", x: 260, y: 290 },
    { itemId: "tea_cup", x: 750, y: 280 },
    { itemId: "mango", x: 1440, y: 250 },
    { itemId: "honey_jar", x: 2100, y: 230 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 450, interval: 4500 },
  ],
  npcs: [
    { type: "babushka", x: 400, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 1000, y: GROUND_Y - 44, patrolRange: 150 },
    { type: "babushka", x: 1700, y: GROUND_Y - 44, patrolRange: 110 },
    { type: "babushka", x: 2400, y: GROUND_Y - 44, patrolRange: 130 },

    // Sacred Coffee Bean
    { type: "potato", x: 2310, y: 170 },
  ],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 3050, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
