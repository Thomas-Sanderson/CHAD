import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

const GROUND_Y = 410;
const LEVEL_WIDTH = 3200;

// Shared greetings / farewells — all Italy shopkeepers use these
const GREETINGS = [
  { script: "BUONGIORNO.", pronunciation: "bwon-JOHR-noh", ipa: "/bwonˈdʒorno/", translation: "Good morning." },
  { script: "SALVE.", pronunciation: "SAHL-veh", ipa: "/ˈsalve/", translation: "Hello." },
];
const GREETING_WARM = { script: "AH, PREGO! BENVENUTO.", pronunciation: "ah, PREH-goh! ben-veh-NOO-toh", ipa: "/ˈprɛɡo benveˈnuto/", translation: "Ah, please! Welcome." };
const FAREWELLS = [
  { script: "ARRIVEDERCI.", pronunciation: "ah-ree-veh-DEHR-chee", ipa: "/arriveˈdertʃi/", translation: "Goodbye." },
  { script: "CIAO.", pronunciation: "CHOW", ipa: "/tʃao/", translation: "Bye." },
  { script: "BUONA GIORNATA.", pronunciation: "BWOH-nah johr-NAH-tah", ipa: "/ˈbwɔna dʒorˈnata/", translation: "Have a good day." },
];
const FAREWELL_EMPTY = { script: "ARRIVEDERCI... niente oggi?", pronunciation: "ah-ree-veh-DEHR-chee... NYEHN-teh OHD-jee", ipa: "/arriveˈdertʃi ˈnjɛnte ˈɔddʒi/", translation: "Goodbye... nothing today?" };
const ASK_KNOWN = { script: "Lo sai già.", pronunciation: "loh SAH-ee JAH", ipa: "/lo ˈsai dʒa/", translation: "You already know." };

const PLAYER_PHRASES: ConvoPhrase[] = [
  { id: "convo-greet-1", script: "BUONGIORNO", translation: "Good morning", matchesItemId: null, pronunciation: "bwon-JOHR-noh", ipa: "/bwonˈdʒorno/", action: "greet" },
  { id: "convo-greet-2", script: "CIAO", translation: "Hi/Bye", matchesItemId: null, pronunciation: "CHOW", ipa: "/tʃao/", action: "greet" },
  { id: "convo-ask", script: "COS'È QUESTO", translation: "What is this?", matchesItemId: null, pronunciation: "koh-ZEH KWEH-stoh", ipa: "/koˈzɛ ˈkwesto/", action: "ask" },
  { id: "convo-price", script: "QUANTO COSTA", translation: "How much?", matchesItemId: null, pronunciation: "KWAHN-toh KOH-stah", ipa: "/ˈkwanto ˈkɔsta/", action: "price" },
  { id: "convo-bye-1", script: "ARRIVEDERCI", translation: "Goodbye", matchesItemId: null, pronunciation: "ah-ree-veh-DEHR-chee", ipa: "/arriveˈdertʃi/", action: "bye" },
  { id: "convo-bye-2", script: "CIAO CIAO", translation: "Bye bye", matchesItemId: null, pronunciation: "CHOW CHOW", ipa: "/tʃao tʃao/", action: "bye" },
];

const salumeriaConversation: ShopKeeperConversation = {
  greetings: GREETINGS,
  greetingWarm: GREETING_WARM,
  askPrefix: "Questo è ",
  askKnown: ASK_KNOWN,
  prices: {
    pecorino_wheel: { script: "CINQUE euro.", pronunciation: "CHEEN-kweh EH-oo-roh", ipa: "/ˈtʃinkwe ˈɛuro/", translation: "Five euros." },
    prosciutto_leg: { script: "OTTO euro.", pronunciation: "OHT-toh EH-oo-roh", ipa: "/ˈɔtto ˈɛuro/", translation: "Eight euros." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

const panetteriaConversation: ShopKeeperConversation = {
  greetings: [...GREETINGS, { script: "CIAO.", pronunciation: "CHOW", ipa: "/tʃao/", translation: "Hi." }],
  greetingWarm: GREETING_WARM,
  askPrefix: "Questo è ",
  askKnown: ASK_KNOWN,
  prices: {
    focaccia_slab: { script: "TRE euro.", pronunciation: "TREH EH-oo-roh", ipa: "/tre ˈɛuro/", translation: "Three euros." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

const fruttivendoloConversation: ShopKeeperConversation = {
  greetings: GREETINGS,
  greetingWarm: GREETING_WARM,
  askPrefix: "Questo è ",
  askKnown: ASK_KNOWN,
  prices: {
    basilico_bunch: { script: "DUE euro.", pronunciation: "DOO-eh EH-oo-roh", ipa: "/ˈdue ˈɛuro/", translation: "Two euros." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

export const level6Data: LevelData = {
  id: "the-market-italy",
  name: "Il Mercato",
  // These fields are used as fallback; segments override them
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 120, y: GROUND_Y - 48 },
  gatePosition: { x: 3050, y: GROUND_Y - 80 },
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
        { x: 320, y: 370, width: 60, height: 16 },
        { x: 670, y: 380, width: 80, height: 16 },
        { x: 1120, y: 370, width: 60, height: 16 },
        { x: 1570, y: 380, width: 80, height: 16 },
        { x: 2020, y: 370, width: 60, height: 16 },
        { x: 2450, y: 380, width: 80, height: 16 },

        // Elevated platforms for decoy items
        { x: 480, y: 300, width: 100, height: 16 },
        { x: 1260, y: 280, width: 100, height: 16 },
        { x: 2150, y: 290, width: 80, height: 16 },
        { x: 2650, y: 200, width: 80, height: 16 }, // high platform for sacred olive
        { x: 2850, y: 330, width: 110, height: 16 },
      ],
      collectibles: [
        // Outdoor decoys only — target items are inside shops
        { itemId: "salame_ring", x: 520, y: 270 },
        { itemId: "wine_bottle", x: 1300, y: 250 },
        { itemId: "olive_jar", x: 2190, y: 260 },
        { itemId: "biscotti_box", x: 2900, y: 300 },
      ],
      hazards: [
        { type: "marshrutka", y: GROUND_Y - 40, speed: 360, interval: 5500 },
      ],
      npcs: [
        { type: "babushka", x: 380, y: GROUND_Y - 44, patrolRange: 130 },
        { type: "babushka", x: 1150, y: GROUND_Y - 44, patrolRange: 120 },
        { type: "babushka", x: 1850, y: GROUND_Y - 44, patrolRange: 130 },
        { type: "babushka", x: 2550, y: GROUND_Y - 44, patrolRange: 100 },
        { type: "potato", x: 2660, y: 170 },
      ],
      doors: [
        // Salumeria entrance
        {
          id: "salumeria-enter",
          x: 165,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "salumeria",
          targetX: 160,
          targetY: 226,
          locked: false,
          label: "SALUMERIA",
        },
        // Panetteria entrance
        {
          id: "panetteria-enter",
          x: 815,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "panetteria",
          targetX: 140,
          targetY: 206,
          locked: false,
          label: "PANETTERIA",
        },
        // Fruttivendolo entrance — LOCKED, requires shout
        {
          id: "fruttivendolo-enter",
          x: 1715,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "fruttivendolo",
          targetX: 150,
          targetY: 216,
          locked: true,
          label: "FRUTTIVENDOLO",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: 450 },
      landmarks: [
        { label: "CAFFÈ", x: 450 },
        { label: "NEGOZIO", x: 1050 },
        { label: "LIBRERIA", x: 1900 },
        { label: "BANCA", x: 2400 },
        { label: "PARCO", x: 3000 },
      ],
    },

    // === SALUMERIA INTERIOR ===
    {
      id: "salumeria",
      type: "interior",
      shelfType: "wood",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Shelf — left
        { x: 50, y: 190, width: 90, height: 12 },
        // Shelf — right
        { x: 200, y: 190, width: 90, height: 12 },
      ],
      collectibles: [
        { itemId: "pecorino_wheel", x: 70, y: 164 },
        { itemId: "prosciutto_leg", x: 220, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "salumeria-exit",
          x: 165,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 165,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "USCITA",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["pecorino_wheel", "prosciutto_leg"],
        daResponses: ["SÌ! Freschissimo!", "SÌ, ottima scelta!"],
        netResponses: ["NO, non quello.", "NO! Solo salumi e formaggi."],
        conversation: salumeriaConversation,
      },
    },

    // === PANETTERIA INTERIOR ===
    {
      id: "panetteria",
      type: "interior",
      shelfType: "wood",
      platforms: [
        // Floor
        { x: 0, y: 250, width: 350, height: 30 },
        // Counter
        { x: 80, y: 170, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "focaccia_slab", x: 100, y: 144 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "panetteria-exit",
          x: 145,
          y: 190,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 815,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "USCITA",
        },
      ],
      bounds: { width: 350, height: 280 },
      shopkeeper: {
        x: 280,
        y: 188,
        acceptsItemIds: ["focaccia_slab"],
        daResponses: ["SÌ! Appena sfornata!", "SÌ, ancora calda!"],
        netResponses: ["NO, solo pane qui.", "NO!"],
        conversation: panetteriaConversation,
      },
    },

    // === FRUTTIVENDOLO INTERIOR ===
    {
      id: "fruttivendolo",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 260, width: 380, height: 30 },
        // Shelf
        { x: 110, y: 180, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "basilico_bunch", x: 130, y: 154 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "fruttivendolo-exit",
          x: 155,
          y: 200,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 1715,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "USCITA",
        },
      ],
      bounds: { width: 380, height: 290 },
      shopkeeper: {
        x: 310,
        y: 198,
        acceptsItemIds: ["basilico_bunch"],
        daResponses: ["SÌ! Dal giardino!", "SÌ! Basilico fresco!"],
        netResponses: ["NO! Non ce l'ho!", "NO, prova ancora."],
        conversation: fruttivendoloConversation,
      },
    },
  ],
};
