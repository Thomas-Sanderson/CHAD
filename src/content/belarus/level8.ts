import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

// Three stacked avenues
const AVE1_Y = 1200;
const AVE2_Y = 750;
const AVE3_Y = 300;
const LEVEL_WIDTH = 3000;
const LEVEL_HEIGHT = 1700;

// Shared greetings / farewells — all Belarus shopkeepers use these
const GREETINGS = [
  { script: "ЗДРАВСТВУЙТЕ.", pronunciation: "ZDRAH-stvooy-tyeh", ipa: "/ˈzdrastvujtʲe/", translation: "Hello." },
  { script: "ДОБРЫЙ ДЕНЬ.", pronunciation: "DOH-briy DYEN", ipa: "/ˈdobrɨj dʲenʲ/", translation: "Good day." },
];
const GREETING_WARM = { script: "О, ПОЖАЛУЙСТА! ДОБРО ПОЖАЛОВАТЬ.", pronunciation: "oh, pah-ZHAH-loo-stah! dah-BROH pah-ZHAH-lah-vaht", ipa: "/pɐˈʐalʊstə dɐˈbro pɐˈʐaləvətʲ/", translation: "Oh, please! Welcome." };
const FAREWELLS = [
  { script: "ДО СВИДАНИЯ.", pronunciation: "dah svee-DAH-nyah", ipa: "/dɐ svʲɪˈdanʲɪjə/", translation: "Goodbye." },
  { script: "ПОКА.", pronunciation: "pah-KAH", ipa: "/pɐˈka/", translation: "Bye." },
  { script: "УДАЧИ.", pronunciation: "oo-DAH-chee", ipa: "/ʊˈdatɕɪ/", translation: "Good luck." },
];
const FAREWELL_EMPTY = { script: "ДО СВИДАНИЯ... ничего не купил?", pronunciation: "dah svee-DAH-nyah... nee-cheh-VOH nyeh koo-PEEL", ipa: "/dɐ svʲɪˈdanʲɪjə nʲɪtɕɪˈvo nʲe kʊˈpʲil/", translation: "Goodbye... bought nothing?" };
const ASK_KNOWN = { script: "Ты знаешь.", pronunciation: "tih ZNAH-yesh", ipa: "/tɨ ˈznajɪʂ/", translation: "You know." };

const PLAYER_PHRASES: ConvoPhrase[] = [
  { id: "convo-greet-1", script: "ЗДРАВСТВУЙТЕ", translation: "Hello (formal)", matchesItemId: null, pronunciation: "ZDRAH-stvooy-tyeh", ipa: "/ˈzdrastvujtʲe/", action: "greet" },
  { id: "convo-greet-2", script: "ПРИВЕТ", translation: "Hi (informal)", matchesItemId: null, pronunciation: "pree-VYET", ipa: "/prʲɪˈvʲet/", action: "greet" },
  { id: "convo-ask", script: "ЧТО ЭТО", translation: "What is this?", matchesItemId: null, pronunciation: "SHTOH EH-tah", ipa: "/ʂto ˈɛtə/", action: "ask" },
  { id: "convo-price", script: "СКОЛЬКО", translation: "How much?", matchesItemId: null, pronunciation: "SKOHL-kah", ipa: "/ˈskolʲkə/", action: "price" },
  { id: "convo-bye-1", script: "ДО СВИДАНИЯ", translation: "Goodbye (formal)", matchesItemId: null, pronunciation: "dah svee-DAH-nyah", ipa: "/dɐ svʲɪˈdanʲɪjə/", action: "bye" },
  { id: "convo-bye-2", script: "ПОКА", translation: "Bye (informal)", matchesItemId: null, pronunciation: "pah-KAH", ipa: "/pɐˈka/", action: "bye" },
];

const fishConversation: ShopKeeperConversation = {
  greetings: [...GREETINGS, { script: "ПРИВЕТ.", pronunciation: "pree-VYET", ipa: "/prʲɪˈvʲet/", translation: "Hi." }],
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    ryba_smoked: { script: "ДЕСЯТЬ рублей.", pronunciation: "DYEH-syaht roo-BLYEY", ipa: "/ˈdʲesʲətʲ rʊˈblʲej/", translation: "Ten rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

const produceConversation: ShopKeeperConversation = {
  greetings: GREETINGS,
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    grib_basket: { script: "ДВА рубля.", pronunciation: "DVAH roob-LYAH", ipa: "/dva rʊˈblʲa/", translation: "Two rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

export const level8Data: LevelData = {
  id: "the-intersection",
  name: "Перекрёсток",
  // Fallback fields — segments override these
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 50, y: AVE1_Y - 48 },
  gatePosition: { x: 2850, y: AVE3_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
  skylineY: 50,
  deathFloorY: 1400,
  segments: [
    // === CITY SEGMENT (all three avenues + streets) ===
    {
      id: "city",
      type: "street",
      platforms: [
        // ——— Avenue 1 (y=1200) — gaps at Street A (330-510) and Street B (1150-1330) ———
        { x: 0, y: AVE1_Y, width: 330, height: 40, isGround: true },
        { x: 510, y: AVE1_Y, width: 640, height: 40, isGround: true },   // 510-1150
        { x: 1330, y: AVE1_Y, width: LEVEL_WIDTH - 1330, height: 40, isGround: true },

        // ——— Avenue 2 (y=750) — gaps at St A (330-510), St B (1150-1330), hidden drop (1470-1530), St C (1960-2120), St D (2560-2680) ———
        { x: 0, y: AVE2_Y, width: 330, height: 40, isGround: true },
        { x: 510, y: AVE2_Y, width: 640, height: 40, isGround: true },   // 510-1150
        { x: 1330, y: AVE2_Y, width: 140, height: 40, isGround: true },  // 1330-1470
        { x: 1530, y: AVE2_Y, width: 430, height: 40, isGround: true },  // 1530-1960
        { x: 2120, y: AVE2_Y, width: 440, height: 40, isGround: true },  // 2120-2560
        { x: 2680, y: AVE2_Y, width: LEVEL_WIDTH - 2680, height: 40, isGround: true },

        // ——— Avenue 3 (y=300) — gaps at St C (1960-2120) and St D (2560-2680) ———
        { x: 0, y: AVE3_Y, width: 1960, height: 40, isGround: true },
        { x: 2120, y: AVE3_Y, width: 440, height: 40, isGround: true },  // 2120-2560
        { x: 2680, y: AVE3_Y, width: LEVEL_WIDTH - 2680, height: 40, isGround: true },

        // ——— Street A (x~400): Ave1 <-> Ave2, zigzag 130px apart horizontally ———
        { x: 350, y: AVE1_Y - 60, width: 90, height: 16 },   // entry (y=1140)
        { x: 460, y: 1065, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 350, y: 990, width: 80, height: 16, passThrough: true },            // gap: 75
        { x: 460, y: 915, width: 80, height: 16, passThrough: true },            // gap: 75
        { x: 350, y: 840, width: 80, height: 16, passThrough: true },            // gap: 75
        { x: 400, y: AVE2_Y + 16, width: 90, height: 16 },   // landing (y=766, gap: 74)

        // ——— Street B (x~1230): Ave1 -> Ave2, zigzag 130px apart ———
        { x: 1170, y: AVE1_Y - 60, width: 80, height: 16 },  // entry (y=1140)
        { x: 1280, y: 1065, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 1170, y: 990, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1280, y: 915, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1170, y: 840, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1210, y: AVE2_Y + 16, width: 90, height: 16 },  // landing (y=766, gap: 74)

        // ——— Street C (x~2030): Ave2 <-> Ave3, zigzag 130px apart ———
        { x: 1970, y: AVE2_Y - 60, width: 90, height: 16 },  // entry (y=690)
        { x: 2080, y: 615, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1970, y: 540, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2080, y: 465, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1970, y: 390, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2010, y: AVE3_Y + 16, width: 90, height: 16 },  // landing (y=316, gap: 74)

        // ——— Street D (x~2620): drop-only Ave3 -> Ave2 ———
        { x: 2600, y: AVE3_Y + 16, width: 70, height: 16 },  // ledge just below Ave3

        // Elevated platform for ukrop on Street A
        { x: 400, y: 950, width: 70, height: 16, passThrough: true },

        // Hard-to-reach platform for sacred potato (above Street C)
        { x: 2030, y: 340, width: 60, height: 16, passThrough: true },
      ],
      collectibles: [
        // Target item on street platform
        { itemId: "ukrop_bunch", x: 410, y: 920 },

        // Decoys on elevated street platforms
        { itemId: "kvass_bottle", x: 1200, y: 1050 },
        { itemId: "kolbasa_ring", x: 2000, y: 630 },
        { itemId: "pickle_jar", x: 2030, y: 400 },
      ],
      hazards: [
        // One marshrutka per avenue
        { type: "marshrutka", y: AVE1_Y - 40, speed: 400, interval: 5000 },
        { type: "marshrutka", y: AVE2_Y - 40, speed: 350, interval: 6000 },
        { type: "marshrutka", y: AVE3_Y - 40, speed: 420, interval: 7000 },
      ],
      npcs: [
        // Avenue 1: 2 babushkas
        { type: "babushka", x: 600, y: AVE1_Y - 44, patrolRange: 140 },
        { type: "babushka", x: 1800, y: AVE1_Y - 44, patrolRange: 120 },

        // Avenue 2: 1 babushka
        { type: "babushka", x: 1000, y: AVE2_Y - 44, patrolRange: 130 },

        // Sacred potato on hard-to-reach platform above Street C
        { type: "potato", x: 2055, y: 310 },
      ],
      doors: [
        // Fish shop entrance (Avenue 1)
        {
          id: "fish-enter",
          x: 900,
          y: AVE1_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "fishmonger",
          targetX: 140,
          targetY: 206,
          locked: false,
          label: "РЫБНАЯ",
        },
        // Produce stall entrance (Avenue 2) — LOCKED, requires shout
        {
          id: "produce-enter",
          x: 700,
          y: AVE2_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "produce",
          targetX: 150,
          targetY: 216,
          locked: true,
          label: "ОВОЩИ-ФРУКТЫ",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        { label: "ШКОЛА", x: 800, y: AVE1_Y - 88 },
        { label: "БАНК", x: 1400, y: AVE2_Y - 88 },
        { label: "ПОЧТА", x: 1500, y: AVE3_Y - 88 },
      ],
      streetSigns: [
        { label: "УЛ. ПОБЕДЫ", x: 420, y: AVE1_Y + 5 },
        { label: "УЛ. ПУШКИНА", x: 1240, y: AVE1_Y + 5 },
        { label: "УЛ. МИРА", x: 2030, y: AVE2_Y + 5 },
        { label: "УЛ. ГАГАРИНА", x: 2610, y: AVE3_Y + 5 },
      ],
      streetCorridors: [
        { x: 340, width: 210, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 1160, width: 210, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 1960, width: 210, topY: AVE3_Y, bottomY: AVE2_Y },
      ],
    },

    // === FISHMONGER INTERIOR ===
    {
      id: "fishmonger",
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
          targetSegmentId: "city",
          targetX: 900,
          targetY: AVE1_Y - 48,
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
        conversation: fishConversation,
      },
    },

    // === PRODUCE STALL INTERIOR ===
    {
      id: "produce",
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
          id: "produce-exit",
          x: 155,
          y: 200,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 700,
          targetY: AVE2_Y - 48,
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
        conversation: produceConversation,
      },
    },
  ],
};
