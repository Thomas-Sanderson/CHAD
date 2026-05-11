import type { LevelData } from "../../types";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3400;

export const level6Data: LevelData = {
  id: "the-market",
  name: "The Market",
  // These fields are used as fallback; segments override them
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 3200, y: GROUND_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: 450 },
  segments: [
    // === STREET SEGMENT ===
    {
      id: "street",
      type: "street",
      platforms: [
        // Ground — full width
        { x: 0, y: GROUND_Y, width: LEVEL_WIDTH, height: 40 },

        // Light platforming between shops (puddle jumps, low obstacles)
        { x: 350, y: 370, width: 60, height: 16 },
        { x: 700, y: 380, width: 80, height: 16 },
        { x: 1150, y: 370, width: 60, height: 16 },
        { x: 1600, y: 380, width: 80, height: 16 },
        { x: 2050, y: 370, width: 60, height: 16 },
        { x: 2500, y: 380, width: 80, height: 16 },

        // Elevated platforms for decoy items
        { x: 500, y: 300, width: 100, height: 16 },
        { x: 1300, y: 280, width: 100, height: 16 },
        { x: 2200, y: 290, width: 80, height: 16 },
        { x: 2700, y: 200, width: 80, height: 16 }, // high platform for potato
        { x: 2900, y: 330, width: 120, height: 16 },
      ],
      collectibles: [
        // Outdoor decoys only — target items are inside shops
        { itemId: "kolbasa_ring", x: 540, y: 270 },
        { itemId: "kvass_bottle", x: 1340, y: 250 },
        { itemId: "pickle_jar", x: 2240, y: 260 },
        { itemId: "sunflower_seeds", x: 2950, y: 300 },
      ],
      hazards: [
        { type: "marshrutka", y: GROUND_Y - 40, speed: 380, interval: 5500 },
      ],
      npcs: [
        { type: "babushka", x: 400, y: GROUND_Y - 44, patrolRange: 140 },
        { type: "babushka", x: 1200, y: GROUND_Y - 44, patrolRange: 120 },
        { type: "babushka", x: 1900, y: GROUND_Y - 44, patrolRange: 130 },
        { type: "babushka", x: 2600, y: GROUND_Y - 44, patrolRange: 100 },
        { type: "potato", x: 2710, y: 170 },
      ],
      doors: [
        // Dairy shop entrance
        {
          id: "dairy-enter",
          x: 165,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "dairy",
          targetX: 160,
          targetY: 226,
          locked: false,
          label: "МОЛОЧНАЯ",
        },
        // Fish shop entrance
        {
          id: "fish-enter",
          x: 815,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "fish",
          targetX: 140,
          targetY: 206,
          locked: false,
          label: "РЫБНАЯ",
        },
        // Veggies shop entrance — LOCKED, requires shout
        {
          id: "veggies-enter",
          x: 1715,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "veggies",
          targetX: 150,
          targetY: 216,
          locked: true,
          label: "ОВОЩИ-ФРУКТЫ",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: 450 },
    },

    // === DAIRY SHOP INTERIOR ===
    {
      id: "dairy",
      type: "interior",
      shelfType: "wood",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Counter/shelf — left
        { x: 50, y: 190, width: 90, height: 12 },
        // Counter/shelf — right
        { x: 200, y: 190, width: 90, height: 12 },
      ],
      collectibles: [
        { itemId: "syr_wheel", x: 70, y: 164 },
        { itemId: "slivki_jar", x: 220, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "dairy-exit",
          x: 165,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 165,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["syr_wheel", "slivki_jar"],
        daResponses: ["ДА! Свежее!", "ДА, берите!"],
        netResponses: ["НЕТ, не то.", "НЕТ!"],
      },
    },

    // === FISH SHOP INTERIOR ===
    {
      id: "fish",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 250, width: 350, height: 30 },
        // Display counter
        { x: 80, y: 170, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "ryba_smoked", x: 100, y: 144 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "fish-exit",
          x: 145,
          y: 190,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 815,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 350, height: 280 },
      shopkeeper: {
        x: 280,
        y: 188,
        acceptsItemIds: ["ryba_smoked"],
        daResponses: ["ДА! Утром коптили!", "ДА, свежая!"],
        netResponses: ["НЕТ, только рыба.", "НЕТ."],
      },
    },

    // === VEGGIES SHOP INTERIOR ===
    {
      id: "veggies",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 260, width: 380, height: 30 },
        // Shelf
        { x: 110, y: 180, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "grib_basket", x: 130, y: 154 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "veggies-exit",
          x: 155,
          y: 200,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 1715,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 380, height: 290 },
      shopkeeper: {
        x: 310,
        y: 198,
        acceptsItemIds: ["grib_basket"],
        daResponses: ["ДА! Из леса!", "ДА! Свежие грибы!"],
        netResponses: ["НЕТ! Нет такого!", "НЕТ, попробуйте снова."],
      },
    },
  ],
};
