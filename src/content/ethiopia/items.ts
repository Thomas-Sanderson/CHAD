import type { CollectibleItem } from "../../types";

// === Level 1 items: Coffee Run ===
export const level1Items: CollectibleItem[] = [
  // Target items
  {
    id: "buna_bag",
    name: "Coffee Bag",
    description: "A burlap sack of dark coffee beans.",
    isDecoy: false,
    color: "#8b6633",
  },
  {
    id: "wetet_jug",
    name: "Milk Jug",
    description: "A terracotta jug of fresh milk.",
    isDecoy: false,
    color: "#c4724a",
  },
  {
    id: "dabo_round",
    name: "Round Bread",
    description: "A golden round loaf with a cracked top.",
    isDecoy: false,
    color: "#ddaa44",
  },
  {
    id: "sukwar_bag_eth",
    name: "Sugar Bag",
    description: "A white bag with a red label. Granulated sugar.",
    isDecoy: false,
    color: "#eeeeee",
  },
  // Decoy items
  {
    id: "berbere_tin",
    name: "Red Tin",
    description: "A small tin of something red and spicy.",
    isDecoy: true,
    color: "#cc3311",
  },
  {
    id: "mango",
    name: "Mango",
    description: "A plump yellow-orange mango.",
    isDecoy: true,
    color: "#ffaa22",
  },
  {
    id: "bottled_water",
    name: "Water Bottle",
    description: "A plastic bottle of mineral water.",
    isDecoy: true,
    color: "#eeeeee",
  },
];

// === Level 2 items: Market Day ===
export const level2Items: CollectibleItem[] = [
  // Targets
  {
    id: "shiro_bag",
    name: "Golden Bag",
    description: "A bag of fine golden chickpea flour.",
    isDecoy: false,
    color: "#ddcc88",
  },
  {
    id: "berbere_tin",
    name: "Red Tin",
    description: "A small tin of fiery red spice blend.",
    isDecoy: false,
    color: "#cc3311",
  },
  {
    id: "qibe_jar",
    name: "Butter Jar",
    description: "A clay jar of golden spiced butter.",
    isDecoy: false,
    color: "#c4724a",
  },
  {
    id: "timatim_tomato",
    name: "Tomato",
    description: "A ripe red tomato with a green stem.",
    isDecoy: false,
    color: "#cc2222",
  },
  // Decoys
  {
    id: "injera_roll",
    name: "Rolled Flatbread",
    description: "A pale rolled-up spongy flatbread.",
    isDecoy: true,
    color: "#c4b8a4",
  },
  {
    id: "honey_jar",
    name: "Honey Jar",
    description: "A glass jar of golden honey.",
    isDecoy: true,
    color: "#ddaa44",
  },
  {
    id: "avocado",
    name: "Avocado",
    description: "A dark green avocado. Surprisingly large.",
    isDecoy: true,
    color: "#2a5522",
  },
];

// === Level 3 items: The Dinner ===
export const level3Items: CollectibleItem[] = [
  // Targets
  {
    id: "injera_roll",
    name: "Rolled Flatbread",
    description: "A pale spongy flatbread, rolled up tight.",
    isDecoy: false,
    color: "#c4b8a4",
  },
  {
    id: "miser_bag",
    name: "Lentil Bag",
    description: "A bag of small red-orange lentils.",
    isDecoy: false,
    color: "#cc6633",
  },
  {
    id: "qey_sir_beet",
    name: "Beetroot",
    description: "A deep purple beetroot with green tops.",
    isDecoy: false,
    color: "#882244",
  },
  {
    id: "karya_pepper",
    name: "Green Pepper",
    description: "A curved green pepper. Not hot, just green.",
    isDecoy: false,
    color: "#44882a",
  },
  // Decoys
  {
    id: "teff_sack",
    name: "Grain Sack",
    description: "A sack of tiny pale grains.",
    isDecoy: true,
    color: "#c4b8a4",
  },
  {
    id: "egg",
    name: "Egg",
    description: "A plain brown egg.",
    isDecoy: true,
    color: "#e8d5b5",
  },
  {
    id: "timatim_tomato",
    name: "Tomato",
    description: "A ripe red tomato. Not on the list this time.",
    isDecoy: true,
    color: "#cc2222",
  },
  {
    id: "berbere_tin",
    name: "Red Tin",
    description: "A tin of spice blend. Already got that.",
    isDecoy: true,
    color: "#cc3311",
  },
];

// === Level 4 items: Buna Ceremony ===
export const level4Items: CollectibleItem[] = [
  // Targets
  {
    id: "jebena_pot",
    name: "Clay Coffee Pot",
    description: "A round-bellied clay pot with a narrow spout.",
    isDecoy: false,
    color: "#3a2211",
  },
  {
    id: "rekbot_cup",
    name: "Small Cup",
    description: "A tiny handleless ceramic cup.",
    isDecoy: false,
    color: "#c4724a",
  },
  {
    id: "itan_incense",
    name: "Incense",
    description: "Amber chunks of frankincense in a clay dish.",
    isDecoy: false,
    color: "#ddc088",
  },
  {
    id: "kolo_bowl",
    name: "Snack Bowl",
    description: "A bowl of roasted barley kernels.",
    isDecoy: false,
    color: "#ddaa44",
  },
  // Decoys
  {
    id: "buna_bag",
    name: "Coffee Bag",
    description: "A burlap sack of coffee beans. Not what she asked for this time.",
    isDecoy: true,
    color: "#8b6633",
  },
  {
    id: "tea_cup",
    name: "Tea Cup",
    description: "A white cup with a handle. Wrong ceremony.",
    isDecoy: true,
    color: "#ddddee",
  },
  {
    id: "mango",
    name: "Mango",
    description: "A plump yellow-orange mango. Not for the ceremony.",
    isDecoy: true,
    color: "#ffaa22",
  },
  {
    id: "honey_jar",
    name: "Honey Jar",
    description: "A glass jar of golden honey.",
    isDecoy: true,
    color: "#ddaa44",
  },
];
