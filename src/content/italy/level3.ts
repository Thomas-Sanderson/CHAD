import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3400;

export const level3Data: LevelData = {
  id: "gli-ingredienti",
  name: "Gli Ingredienti",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — spread across the level
    { x: 180, y: 330, width: 110, height: 16 },
    { x: 400, y: 280, width: 100, height: 16 },
    { x: 620, y: 310, width: 120, height: 16 },
    { x: 850, y: 260, width: 100, height: 16 },
    { x: 1070, y: 340, width: 120, height: 16 },
    { x: 1290, y: 290, width: 90, height: 16 },
    { x: 1510, y: 250, width: 110, height: 16 },
    { x: 1740, y: 320, width: 130, height: 16 },
    { x: 1970, y: 270, width: 100, height: 16 },
    { x: 2200, y: 310, width: 110, height: 16 },
    { x: 2430, y: 240, width: 100, height: 16 },
    { x: 2650, y: 330, width: 120, height: 16 },
    { x: 2820, y: 190, width: 80, height: 16 }, // high platform for sacred olive
    { x: 2960, y: 300, width: 110, height: 16 },
    { x: 3130, y: 340, width: 100, height: 16 },
  ],
  collectibles: [
    // Target items
    { itemId: "pasta_box", x: 440, y: 250 },
    { itemId: "olio_bottle", x: 1110, y: 310 },
    { itemId: "pomodoro", x: 1780, y: 290 },
    { itemId: "pane_loaf", x: 2470, y: 210 },

    // Decoy items
    { itemId: "biscotti_box", x: 220, y: 300 },
    { itemId: "latte_bottle", x: 890, y: 230 },
    { itemId: "aglio_bulb", x: 1550, y: 220 },
    { itemId: "bread_round", x: 2240, y: 280 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 420, interval: 5000 },
  ],
  npcs: [
    { type: "babushka", x: 550, y: GROUND_Y - 44, patrolRange: 140 },
    { type: "babushka", x: 1250, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 2050, y: GROUND_Y - 44, patrolRange: 130 },
    { type: "babushka", x: 2750, y: GROUND_Y - 44, patrolRange: 100 },

    // The Sacred Olive — high platform
    { type: "potato", x: 2830, y: 160 },
  ],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 3250, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
  landmarks: [
    { label: "FARMACIA", x: 320 },
    { label: "TABACCHI", x: 950 },
    { label: "BAR", x: 1600 },
    { label: "GELATERIA", x: 2100 },
    { label: "EDICOLA", x: 2700 },
  ],
};
