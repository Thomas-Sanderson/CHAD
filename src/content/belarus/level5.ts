import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3000;

export const level5Data: LevelData = {
  id: "saturday-morning",
  name: "Saturday Morning",
  platforms: [
    // Ground — full width
    { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

    // Floating platforms — apartment interior vibe
    { x: 180, y: 340, width: 100, height: 16 },
    { x: 380, y: 300, width: 120, height: 16 },
    { x: 580, y: 260, width: 80, height: 16 },
    { x: 780, y: 330, width: 140, height: 16 },
    { x: 1000, y: 280, width: 100, height: 16 },
    { x: 1200, y: 350, width: 130, height: 16 },
    { x: 1450, y: 290, width: 100, height: 16 },
    { x: 1650, y: 240, width: 80, height: 16 },
    { x: 1850, y: 320, width: 120, height: 16 },
    { x: 2050, y: 270, width: 100, height: 16 },
    { x: 2250, y: 200, width: 80, height: 16 }, // high platform for potato
    { x: 2400, y: 340, width: 120, height: 16 },
    { x: 2600, y: 310, width: 100, height: 16 },
  ],
  collectibles: [
    // Target items
    { itemId: "tarelka_plate", x: 220, y: 310 },
    { itemId: "lozhka_spoon", x: 1050, y: 250 },
    { itemId: "chashka_cup", x: 1900, y: 290 },

    // Decoy items — household items that aren't what Anya asked for
    { itemId: "podushka_pillow", x: 620, y: 230 },
    { itemId: "chasy_clock", x: 830, y: 300 },
    { itemId: "mylo_soap", x: 1500, y: 260 },
    { itemId: "pult_remote", x: 2100, y: 240 },
  ],
  hazards: [
    // Marshrutka (even on Saturday morning, they're out there)
    { type: "marshrutka", y: GROUND_Y - 40, speed: 350, interval: 7000 },
  ],
  npcs: [
    // Babushkas — even at home, they patrol
    { type: "babushka", x: 500, y: GROUND_Y - 44, patrolRange: 130 },
    { type: "babushka", x: 1300, y: GROUND_Y - 44, patrolRange: 110 },
    { type: "babushka", x: 2200, y: GROUND_Y - 44, patrolRange: 100 },

    // The Sacred Potato
    { type: "potato", x: 2260, y: 170 },
  ],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 2800, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
  landmarks: [
    { label: "КАФЕ", x: 280 },
    { label: "МАГАЗИН", x: 750 },
    { label: "АПТЕКА", x: 1250 },
    { label: "БИБЛИОТЕКА", x: 1800 },
    { label: "ПОЧТА", x: 2350 },
  ],
};
