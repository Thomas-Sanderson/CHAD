import type { CollectibleItem } from "../../types";

// === Level 1 items: La Spesa ===
export const level1Items: CollectibleItem[] = [
  // Target items
  {
    id: "panna_tub",
    name: "Cream Tub",
    script: "PANNA",
    description: "A white tub with a blue lid.",
    isDecoy: false,
    color: "#FFFAF0",
  },
  {
    id: "latte_bottle",
    name: "Glass Bottle",
    script: "LATTE",
    description: "A clear glass bottle of something white.",
    isDecoy: false,
    color: "#F5F5F5",
  },
  {
    id: "salame_link",
    name: "Salami",
    script: "SALAME",
    description: "A thick cured meat with a knotted string.",
    isDecoy: false,
    color: "#8B2500",
  },
  // Decoy items
  {
    id: "olive_jar",
    name: "Olive Jar",
    script: "OLIVE",
    description: "A glass jar of green olives in brine.",
    isDecoy: true,
    color: "#556B2F",
  },
  {
    id: "bread_round",
    name: "Round Bread",
    script: "PANE",
    description: "A crusty round loaf.",
    isDecoy: true,
    color: "#D2B48C",
  },
  {
    id: "mystery_can",
    name: "Mystery Can",
    revealName: "Lentils",
    script: "LENTICCHIE",
    description: "A dented grey tin. The label fell off.",
    isDecoy: true,
    color: "#9E9E9E",
    pronunciation: "len-TIK-kye",
    revealSpriteId: "lentil_reveal",
    hints: [
      "Tiny. Flat. You put them in soup. Every nonna knows.",
      "They're a legume, Chad. Brown. Earthy. Think.",
      "The label is in my pocket. You're spelling it yourself.",
    ],
  },
  {
    id: "vinegar_bottle",
    name: "Dark Bottle",
    script: "ACETO",
    description: "A tall dark bottle with a cork.",
    isDecoy: true,
    color: "#4A0000",
  },
];

// === Level 2 items: Coffee Emergency ===
export const level2Items: CollectibleItem[] = [
  // Target items
  {
    id: "caffe_tin",
    name: "Coffee Tin",
    script: "CAFF\u00C8",
    description: "A small red tin with gold lettering.",
    isDecoy: false,
    color: "#8B0000",
  },
  {
    id: "zucchero_bag",
    name: "Sugar Bag",
    script: "ZUCCHERO",
    description: "A white paper bag of something granular.",
    isDecoy: false,
    color: "#EEEEEE",
  },
  {
    id: "biscotti_box",
    name: "Biscuit Box",
    script: "BISCOTTI",
    description: "A yellow box with a wheat design.",
    isDecoy: false,
    color: "#DAA520",
  },
  // Decoy items
  {
    id: "latte_bottle",
    name: "Glass Bottle",
    script: "LATTE",
    description: "A clear glass bottle of something white.",
    isDecoy: true,
    color: "#F5F5F5",
  },
  {
    id: "wine_bottle",
    name: "Wine Bottle",
    script: "VINO",
    description: "A dark green bottle with a red label.",
    isDecoy: true,
    color: "#2F4F2F",
  },
  {
    id: "olive_jar",
    name: "Olive Jar",
    script: "OLIVE",
    description: "A glass jar of green olives in brine.",
    isDecoy: true,
    color: "#556B2F",
  },
  {
    id: "panna_tub",
    name: "Cream Tub",
    script: "PANNA",
    description: "A white tub with a blue lid.",
    isDecoy: true,
    color: "#FFFAF0",
  },
];

// === Level 3 items: Gli Ingredienti ===
export const level3Items: CollectibleItem[] = [
  // Target items
  {
    id: "pasta_box",
    name: "Pasta Box",
    script: "PASTA",
    description: "A blue box with a window showing dried noodles.",
    isDecoy: false,
    color: "#1E3A5F",
  },
  {
    id: "olio_bottle",
    name: "Green Bottle",
    script: "OLIO",
    description: "A dark green bottle with a gold label.",
    isDecoy: false,
    color: "#2E5E1E",
  },
  {
    id: "pomodoro",
    name: "Tomato",
    script: "POMODORO",
    description: "A ripe red tomato, slightly soft.",
    isDecoy: false,
    color: "#CC2222",
  },
  {
    id: "pane_loaf",
    name: "Warm Bread",
    script: "PANE",
    description: "A golden loaf still giving off steam.",
    isDecoy: false,
    color: "#D2A85C",
  },
  // Decoy items
  {
    id: "biscotti_box",
    name: "Biscuit Box",
    script: "BISCOTTI",
    description: "A yellow box with a wheat design.",
    isDecoy: true,
    color: "#DAA520",
  },
  {
    id: "latte_bottle",
    name: "Glass Bottle",
    script: "LATTE",
    description: "A clear glass bottle of something white.",
    isDecoy: true,
    color: "#F5F5F5",
  },
  {
    id: "aglio_bulb",
    name: "Garlic Bulb",
    script: "AGLIO",
    description: "A papery white bulb of garlic.",
    isDecoy: true,
    color: "#F5F5DC",
  },
  {
    id: "bread_round",
    name: "Round Bread",
    script: "PANE",
    description: "A crusty round loaf. Not warm.",
    isDecoy: true,
    color: "#D2B48C",
  },
];

// === Level 4 items: Le Scuse ===
export const level4Items: CollectibleItem[] = [
  // Target items
  {
    id: "cioccolato_bar",
    name: "Dark Chocolate",
    script: "CIOCCOLATO",
    description: "A dark chocolate bar in gold foil.",
    isDecoy: false,
    color: "#3B1E08",
  },
  {
    id: "formaggio_wedge",
    name: "Cheese Wedge",
    script: "FORMAGGIO",
    description: "A pale yellow wedge with a hard rind.",
    isDecoy: false,
    color: "#F5DEB3",
  },
  {
    id: "mela_apple",
    name: "Apple",
    script: "MELA",
    description: "A red apple with a green leaf.",
    isDecoy: false,
    color: "#CC2222",
  },
  // Decoy items
  {
    id: "olio_bottle",
    name: "Green Bottle",
    script: "OLIO",
    description: "A dark green bottle with a gold label.",
    isDecoy: true,
    color: "#2E5E1E",
  },
  {
    id: "caffe_tin",
    name: "Coffee Tin",
    script: "CAFF\u00C8",
    description: "A small red tin with gold lettering.",
    isDecoy: true,
    color: "#8B0000",
  },
  {
    id: "pane_loaf",
    name: "Bread Loaf",
    script: "PANE",
    description: "A round golden loaf.",
    isDecoy: true,
    color: "#D2A85C",
  },
  {
    id: "latte_bottle",
    name: "Glass Bottle",
    script: "LATTE",
    description: "A clear glass bottle of something white.",
    isDecoy: true,
    color: "#F5F5F5",
  },
  {
    id: "mystery_can",
    name: "Mystery Can",
    revealName: "Chickpeas",
    script: "CECI",
    description: "A dented grey tin. The label fell off.",
    isDecoy: true,
    color: "#9E9E9E",
    pronunciation: "CHEH-chee",
    revealSpriteId: "chickpea_reveal",
    hints: [
      "Round. Beige. You mash them into hummus.",
      "Four letters, Chad. Only four. You can do this.",
      "I hid the label under the olive oil. Spell it.",
    ],
  },
];

// === Level 5 items: Sabato Mattina ===
export const level5Items: CollectibleItem[] = [
  // Target items
  {
    id: "piatto_plate",
    name: "Plate",
    script: "PIATTO",
    description: "A white ceramic plate with a blue rim.",
    isDecoy: false,
    color: "#E0E8F0",
  },
  {
    id: "cucchiaio_spoon",
    name: "Spoon",
    script: "CUCCHIAIO",
    description: "A small silver spoon.",
    isDecoy: false,
    color: "#CCCCCC",
  },
  {
    id: "tazza_cup",
    name: "Cup",
    script: "TAZZA",
    description: "A yellow ceramic cup.",
    isDecoy: false,
    color: "#FFD700",
  },
  // Decoy items
  {
    id: "cuscino_pillow",
    name: "Pillow",
    script: "CUSCINO",
    description: "A fluffy white pillow. Not breakfast.",
    isDecoy: true,
    color: "#FFFFFF",
  },
  {
    id: "orologio_clock",
    name: "Clock",
    script: "OROLOGIO",
    description: "A round wall clock with Roman numerals.",
    isDecoy: true,
    color: "#EEEEEE",
  },
  {
    id: "sapone_soap",
    name: "Soap",
    script: "SAPONE",
    description: "A bar of olive soap.",
    isDecoy: true,
    color: "#9ACD32",
  },
  {
    id: "telecomando_remote",
    name: "Remote",
    script: "TELECOMANDO",
    description: "A TV remote control.",
    isDecoy: true,
    color: "#555555",
  },
];

// === Level 6 items: Il Mercato ===
export const level6Items: CollectibleItem[] = [
  // Target items
  {
    id: "pecorino_wheel",
    name: "Cheese Wheel",
    script: "PECORINO",
    description: "A hard wedge of aged cheese with a dark rind.",
    isDecoy: false,
    color: "#F5DEB3",
  },
  {
    id: "prosciutto_leg",
    name: "Cured Ham",
    script: "PROSCIUTTO",
    description: "A thin-sliced pile of rose-pink cured ham.",
    isDecoy: false,
    color: "#E8967A",
  },
  {
    id: "focaccia_slab",
    name: "Focaccia",
    script: "FOCACCIA",
    description: "A golden slab of flatbread dimpled with olive oil.",
    isDecoy: false,
    color: "#DAA520",
  },
  {
    id: "basilico_bunch",
    name: "Basil Bunch",
    script: "BASILICO",
    description: "A bright green bunch of fragrant basil leaves.",
    isDecoy: false,
    color: "#228B22",
  },
  // Decoy items
  {
    id: "salame_ring",
    name: "Sausage Ring",
    script: "SALAME",
    description: "A ring of dried salami.",
    isDecoy: true,
    color: "#8B2500",
  },
  {
    id: "wine_bottle",
    name: "Wine Bottle",
    script: "VINO",
    description: "A dark green bottle with a red label.",
    isDecoy: true,
    color: "#2F4F2F",
  },
  {
    id: "olive_jar",
    name: "Olive Jar",
    script: "OLIVE",
    description: "A glass jar of green olives in brine.",
    isDecoy: true,
    color: "#556B2F",
  },
  {
    id: "biscotti_box",
    name: "Biscuit Box",
    script: "BISCOTTI",
    description: "A yellow box with a wheat design.",
    isDecoy: true,
    color: "#DAA520",
  },
];
