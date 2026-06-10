import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3600;

export const level3Data: LevelData = {
  id: "the-dinner",
  name: "The Dinner",
  platforms: [
    // Ground
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // More platforms — 4 target items means a longer level
    { x: 200, y: 330, width: 110, height: 16 },
    { x: 430, y: 280, width: 100, height: 16 },
    { x: 660, y: 310, width: 130, height: 16 },
    { x: 900, y: 260, width: 100, height: 16 },
    { x: 1120, y: 340, width: 120, height: 16 },
    { x: 1340, y: 290, width: 90, height: 16 },
    { x: 1570, y: 250, width: 110, height: 16 },
    { x: 1800, y: 320, width: 140, height: 16 },
    { x: 2040, y: 270, width: 100, height: 16 },
    { x: 2280, y: 310, width: 120, height: 16 },
    { x: 2520, y: 240, width: 100, height: 16 },
    { x: 2720, y: 330, width: 130, height: 16 },
    { x: 2920, y: 190, width: 80, height: 16 }, // high for sacred coffee bean
    { x: 3080, y: 300, width: 120, height: 16 },
    { x: 3280, y: 340, width: 100, height: 16 },
  ],
  collectibles: [
    // Targets — spread out
    { itemId: "injera_roll", x: 470, y: 250 },
    { itemId: "miser_bag", x: 1160, y: 310 },
    { itemId: "qey_sir_beet", x: 1840, y: 290 },
    { itemId: "karya_pepper", x: 2560, y: 210 },

    // Decoys — teff_sack near injera to make the choice hard
    { itemId: "teff_sack", x: 240, y: 300 },
    { itemId: "egg", x: 940, y: 230 },
    { itemId: "timatim_tomato", x: 1600, y: 220 },
    { itemId: "berbere_tin", x: 2320, y: 280 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 440, interval: 5000 },
  ],
  npcs: [
    { type: "babushka", x: 600, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 1300, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 2100, y: GROUND_Y - 44, patrolRange: 130 },
    { type: "babushka", x: 2800, y: GROUND_Y - 44, patrolRange: 100 },

    // Sacred Coffee Bean
    { type: "potato", x: 2930, y: 160 },
  ],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 3450, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
};
