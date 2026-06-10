import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3200;

export const level4Data: LevelData = {
  id: "the-apology",
  name: "The Apology",
  platforms: [
    // Ground
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms
    { x: 220, y: 320, width: 100, height: 16 },
    { x: 450, y: 270, width: 120, height: 16 },
    { x: 700, y: 310, width: 100, height: 16 },
    { x: 930, y: 250, width: 110, height: 16 },
    { x: 1150, y: 330, width: 130, height: 16 },
    { x: 1400, y: 280, width: 100, height: 16 },
    { x: 1620, y: 240, width: 90, height: 16 },
    { x: 1850, y: 310, width: 120, height: 16 },
    { x: 2050, y: 260, width: 110, height: 16 },
    { x: 2300, y: 200, width: 80, height: 16 }, // high for potato
    { x: 2500, y: 320, width: 120, height: 16 },
    { x: 2700, y: 290, width: 100, height: 16 },
    { x: 2850, y: 340, width: 110, height: 16 },
  ],
  collectibles: [
    // Targets
    { itemId: "konfeta_candy", x: 490, y: 240 },
    { itemId: "syr_cheese", x: 1190, y: 300 },
    { itemId: "yabloko_apple", x: 1890, y: 280 },

    // Decoys — more of them to make it trickier
    { itemId: "vodka_bottle", x: 260, y: 290 },
    { itemId: "maslo_butter", x: 740, y: 280 },
    { itemId: "moloko_carton", x: 1440, y: 250 },
    { itemId: "kartoshka", x: 1660, y: 210 },
    { itemId: "mystery_can", x: 2540, y: 290 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 450, interval: 4500 },
  ],
  npcs: [
    { type: "babushka", x: 400, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 1000, y: GROUND_Y - 44, patrolRange: 150 },
    { type: "babushka", x: 1700, y: GROUND_Y - 44, patrolRange: 110 },
    { type: "babushka", x: 2400, y: GROUND_Y - 44, patrolRange: 130 },

    // Sacred Potato
    { type: "potato", x: 2310, y: 170 },
  ],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 3050, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
  landmarks: [
    { label: "ПОЧТА", x: 300 },
    { label: "АПТЕКА", x: 850 },
    { label: "ПАРК", x: 1500 },
    { label: "БАНК", x: 2100 },
    { label: "ШКОЛА", x: 2650 },
  ],
};
