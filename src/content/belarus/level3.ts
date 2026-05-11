import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3600;

export const level3Data: LevelData = {
  id: "dinner-ingredients",
  name: "Dinner Ingredients",
  platforms: [
    // Ground
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // More platforms — 4 target items means a longer level
    { x: 200, y: 330, width: 110, height: 16 },
    { x: 420, y: 280, width: 100, height: 16 },
    { x: 650, y: 310, width: 130, height: 16 },
    { x: 880, y: 260, width: 100, height: 16 },
    { x: 1100, y: 340, width: 120, height: 16 },
    { x: 1320, y: 290, width: 90, height: 16 },
    { x: 1550, y: 250, width: 110, height: 16 },
    { x: 1780, y: 320, width: 140, height: 16 },
    { x: 2020, y: 270, width: 100, height: 16 },
    { x: 2250, y: 310, width: 120, height: 16 },
    { x: 2500, y: 240, width: 100, height: 16 },
    { x: 2700, y: 330, width: 130, height: 16 },
    { x: 2900, y: 190, width: 80, height: 16 }, // high for potato
    { x: 3050, y: 300, width: 120, height: 16 },
    { x: 3250, y: 340, width: 100, height: 16 },
  ],
  collectibles: [
    // Targets — spread out
    { itemId: "ryba_fish", x: 460, y: 250 },
    { itemId: "maslo_butter", x: 1140, y: 310 },
    { itemId: "kartoshka", x: 1820, y: 290 },
    { itemId: "hleb_rye", x: 2540, y: 210 },

    // Decoys — bread_loaf is the tricky one, place it near hleb_rye
    { itemId: "sunflower_seeds", x: 240, y: 300 },
    { itemId: "smetana_tub", x: 920, y: 230 },
    { itemId: "ogurtsy_cuke", x: 1580, y: 220 },
    { itemId: "bread_loaf", x: 2290, y: 280 }, // close to hleb_rye to make the choice hard
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 440, interval: 5000 },
  ],
  npcs: [
    { type: "babushka", x: 600, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 1300, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 2100, y: GROUND_Y - 44, patrolRange: 130 },
    { type: "babushka", x: 2800, y: GROUND_Y - 44, patrolRange: 100 },

    // Sacred Potato
    { type: "potato", x: 2910, y: 160 },
  ],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 3450, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
