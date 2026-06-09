import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3200;

export const level2Data: LevelData = {
  id: "coffee-emergency",
  name: "L'Emergenza Caff\u00e8",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — spread across the level
    { x: 200, y: 340, width: 100, height: 16 },
    { x: 420, y: 300, width: 110, height: 16 },
    { x: 650, y: 260, width: 100, height: 16 },
    { x: 880, y: 330, width: 130, height: 16 },
    { x: 1120, y: 280, width: 100, height: 16 },
    { x: 1370, y: 320, width: 110, height: 16 },
    { x: 1600, y: 260, width: 90, height: 16 },
    { x: 1830, y: 340, width: 120, height: 16 },
    { x: 2060, y: 290, width: 100, height: 16 },
    { x: 2300, y: 250, width: 100, height: 16 },
    { x: 2540, y: 310, width: 100, height: 16 },
    { x: 2700, y: 200, width: 80, height: 16 }, // high platform for sacred olive
    { x: 2850, y: 330, width: 110, height: 16 },
  ],
  collectibles: [
    // Target items
    { itemId: "caffe_tin", x: 460, y: 270 },
    { itemId: "zucchero_bag", x: 1400, y: 290 },
    { itemId: "biscotti_box", x: 2100, y: 260 },

    // Decoy items
    { itemId: "latte_bottle", x: 690, y: 230 },
    { itemId: "wine_bottle", x: 1160, y: 250 },
    { itemId: "olive_jar", x: 1870, y: 310 },
    { itemId: "panna_tub", x: 2580, y: 280 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 400, interval: 5500 },
  ],
  npcs: [
    { type: "babushka", x: 500, y: GROUND_Y - 44, patrolRange: 130 },
    { type: "babushka", x: 1300, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 2100, y: GROUND_Y - 44, patrolRange: 110 },

    // The Sacred Olive — high platform
    { type: "potato", x: 2710, y: 170 },
  ],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 3050, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
