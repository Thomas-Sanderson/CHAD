import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 2800;

export const level5Data: LevelData = {
  id: "sabato-mattina",
  name: "Sabato Mattina",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — spread across the level
    { x: 160, y: 340, width: 100, height: 16 },
    { x: 360, y: 300, width: 110, height: 16 },
    { x: 550, y: 260, width: 80, height: 16 },
    { x: 740, y: 330, width: 130, height: 16 },
    { x: 960, y: 280, width: 100, height: 16 },
    { x: 1160, y: 350, width: 120, height: 16 },
    { x: 1400, y: 290, width: 100, height: 16 },
    { x: 1600, y: 240, width: 80, height: 16 },
    { x: 1800, y: 320, width: 110, height: 16 },
    { x: 2000, y: 270, width: 100, height: 16 },
    { x: 2180, y: 200, width: 80, height: 16 }, // high platform for sacred olive
    { x: 2340, y: 340, width: 110, height: 16 },
    { x: 2530, y: 310, width: 100, height: 16 },
  ],
  collectibles: [
    // Target items
    { itemId: "piatto_plate", x: 200, y: 310 },
    { itemId: "cucchiaio_spoon", x: 1000, y: 250 },
    { itemId: "tazza_cup", x: 1840, y: 290 },

    // Decoy items
    { itemId: "cuscino_pillow", x: 590, y: 230 },
    { itemId: "orologio_clock", x: 780, y: 300 },
    { itemId: "sapone_soap", x: 1440, y: 260 },
    { itemId: "telecomando_remote", x: 2040, y: 240 },
  ],
  hazards: [
    { type: "marshrutka", y: GROUND_Y - 40, speed: 340, interval: 7000 },
  ],
  npcs: [
    { type: "babushka", x: 470, y: GROUND_Y - 44, patrolRange: 120 },
    { type: "babushka", x: 1250, y: GROUND_Y - 44, patrolRange: 110 },
    { type: "babushka", x: 2100, y: GROUND_Y - 44, patrolRange: 100 },

    // The Sacred Olive — high platform
    { type: "potato", x: 2190, y: 170 },
  ],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 2650, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
  landmarks: [
    { label: "FARMACIA", x: 280 },
    { label: "GELATERIA", x: 750 },
    { label: "BANCA", x: 1350 },
    { label: "TABACCHI", x: 1950 },
  ],
};
