import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

// Four avenues stacked vertically — the biggest vertical level
const AVE1_Y = 1550;
const AVE2_Y = 1100;
const AVE3_Y = 650;
const AVE4_Y = 200;
const LEVEL_WIDTH = 3400;
const LEVEL_HEIGHT = 2100;

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

const produceConversation: ShopKeeperConversation = {
  greetings: GREETINGS,
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    sveokla_beet: { script: "ДВА рубля.", pronunciation: "DVAH roob-LYAH", ipa: "/dva rʊˈblʲa/", translation: "Two rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

const dairyConversation: ShopKeeperConversation = {
  greetings: GREETINGS,
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    tvorog_tub: { script: "ЧЕТЫРЕ рубля.", pronunciation: "cheh-TIH-ryeh roob-LYAH", ipa: "/tɕɪˈtɨrʲe rʊˈblʲa/", translation: "Four rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

const butcherConversation: ShopKeeperConversation = {
  greetings: [...GREETINGS, { script: "ПРИВЕТ.", pronunciation: "pree-VYET", ipa: "/prʲɪˈvʲet/", translation: "Hi." }],
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    sosiski_pack: { script: "ШЕСТЬ рублей.", pronunciation: "SHEHST roo-BLYEY", ipa: "/ʂesʲtʲ rʊˈblʲej/", translation: "Six rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

export const level9Data: LevelData = {
  id: "the-other-side",
  name: "Другая Сторона",
  // Fallback fields — segments override them
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 120, y: AVE1_Y - 48 },
  gatePosition: { x: 3200, y: AVE4_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
  skylineY: 50,
  deathFloorY: 1750,
  segments: [
    // === CITY SEGMENT — four avenues + six streets ===
    {
      id: "city",
      type: "street",
      platforms: [
        // ---- Avenue 1 (y=1550) — gaps at St1 (240-490) and St2 (840-1090) ----
        { x: 0, y: AVE1_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE1_Y, width: 350, height: 40, isGround: true },   // 490-840
        { x: 1090, y: AVE1_Y, width: LEVEL_WIDTH - 1090, height: 40, isGround: true },

        // ---- Avenue 2 (y=1100) — gaps at St1 (240-490), St2 (840-1090), St3 (1440-1690), St4 (2040-2290) ----
        { x: 0, y: AVE2_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE2_Y, width: 350, height: 40, isGround: true },   // 490-840
        { x: 1090, y: AVE2_Y, width: 350, height: 40, isGround: true },  // 1090-1440
        { x: 1690, y: AVE2_Y, width: 350, height: 40, isGround: true },  // 1690-2040
        { x: 2290, y: AVE2_Y, width: LEVEL_WIDTH - 2290, height: 40, isGround: true },

        // ---- Avenue 3 (y=650) — gaps at St3 (1440-1690), St4 (2040-2290), St5 (2640-2890), St6 (1740-1990) ----
        { x: 0, y: AVE3_Y, width: 1440, height: 40, isGround: true },
        { x: 1690, y: AVE3_Y, width: 50, height: 40, isGround: true },   // 1690-1740
        { x: 1990, y: AVE3_Y, width: 50, height: 40, isGround: true },   // 1990-2040
        { x: 2290, y: AVE3_Y, width: 350, height: 40, isGround: true },  // 2290-2640
        { x: 2890, y: AVE3_Y, width: LEVEL_WIDTH - 2890, height: 40, isGround: true },

        // ---- Avenue 4 (y=200) — gaps at St5 (2640-2890) and St6 (1740-1990) ----
        { x: 0, y: AVE4_Y, width: 1740, height: 40, isGround: true },
        { x: 1990, y: AVE4_Y, width: 650, height: 40, isGround: true },  // 1990-2640
        { x: 2890, y: AVE4_Y, width: LEVEL_WIDTH - 2890, height: 40, isGround: true },

        // === Street 1 — УЛ. ТОЛСТОГО (x≈300) — Ave1 <-> Ave2, zigzag 130px apart ===
        { x: 260, y: AVE1_Y - 60, width: 90, height: 16 },   // entry (y=1490)
        { x: 390, y: 1415, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 260, y: 1340, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 390, y: 1265, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 260, y: 1190, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 310, y: AVE2_Y + 16, width: 90, height: 16 },   // landing (y=1116, gap: 74)

        // === Street 2 — УЛ. ЧЕХОВА (x≈900) — Ave1 <-> Ave2, zigzag 130px apart ===
        { x: 860, y: AVE1_Y - 60, width: 90, height: 16 },   // entry (y=1490)
        { x: 990, y: 1415, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 860, y: 1340, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 990, y: 1265, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 860, y: 1190, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 910, y: AVE2_Y + 16, width: 90, height: 16 },   // landing (y=1116, gap: 74)

        // === Street 3 — УЛ. МИРА (x≈1500) — Ave2 <-> Ave3, zigzag 130px apart ===
        { x: 1460, y: AVE2_Y - 60, width: 90, height: 16 },  // entry (y=1040)
        { x: 1590, y: 965, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1460, y: 890, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1590, y: 815, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1460, y: 740, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1510, y: AVE3_Y + 16, width: 90, height: 16 },  // landing (y=666, gap: 74)

        // === Street 4 — УЛ. ПОБЕДЫ (x≈2100) — Ave2 <-> Ave3, zigzag 130px apart ===
        { x: 2060, y: AVE2_Y - 60, width: 90, height: 16 },  // entry (y=1040)
        { x: 2190, y: 965, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2060, y: 890, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2190, y: 815, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2060, y: 740, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2110, y: AVE3_Y + 16, width: 90, height: 16 },  // landing (y=666, gap: 74)

        // === Street 5 — УЛ. ЛЕРМОНТОВА (x≈2700) — Ave3 <-> Ave4, zigzag 130px apart ===
        { x: 2660, y: AVE3_Y - 60, width: 90, height: 16 },  // entry (y=590)
        { x: 2790, y: 515, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2660, y: 440, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2790, y: 365, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2660, y: 290, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2710, y: AVE4_Y + 16, width: 90, height: 16 },  // landing (y=216, gap: 74)

        // === Street 6 — УЛ. ГОРЬКОГО (x≈1800) — Ave3 <-> Ave4, zigzag 130px apart ===
        { x: 1760, y: AVE3_Y - 60, width: 90, height: 16 },  // entry (y=590)
        { x: 1890, y: 515, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1760, y: 440, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1890, y: 365, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1760, y: 290, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 1810, y: AVE4_Y + 16, width: 90, height: 16 },  // landing (y=216, gap: 74)

        // Scattered platforms for decoys and kefir
        { x: 600, y: 1300, width: 70, height: 16 },   // kefir between Ave1-Ave2
        { x: 1800, y: 1020, width: 80, height: 16 },  // Ave2 decoy
        { x: 2500, y: 1030, width: 80, height: 16 },  // Ave2 decoy
        { x: 500, y: 570, width: 80, height: 16 },    // Ave3 decoy
        { x: 1100, y: 560, width: 80, height: 16 },   // Ave3 decoy
        { x: 2200, y: 420, width: 60, height: 16 },   // sacred potato between Ave3-Ave4
      ],
      collectibles: [
        // Kefir on a tricky mid-air platform between Ave1 and Ave2
        { itemId: "kefir_bottle", x: 620, y: 1274 },
        // Decoys scattered across avenues
        { itemId: "vodka_bottle", x: 1830, y: 994 },
        { itemId: "bread_loaf", x: 2530, y: 1004 },
        { itemId: "sunflower_seeds", x: 530, y: 544 },
        { itemId: "pickle_jar", x: 1130, y: 534 },
      ],
      hazards: [
        // Marshrutka on Ave1
        { type: "marshrutka", y: AVE1_Y - 40, speed: 360, interval: 6000 },
        // Marshrutka on Ave2
        { type: "marshrutka", y: AVE2_Y - 40, speed: 400, interval: 5000 },
      ],
      npcs: [
        // Babushka on Ave1
        { type: "babushka", x: 1200, y: AVE1_Y - 44, patrolRange: 140 },
        // Babushka on Ave2
        { type: "babushka", x: 700, y: AVE2_Y - 44, patrolRange: 120 },
        // Babushka on Ave3
        { type: "babushka", x: 2300, y: AVE3_Y - 44, patrolRange: 130 },
        // Sacred potato on tricky platform between Ave3 and Ave4
        { type: "potato", x: 2215, y: 390 },
      ],
      doors: [
        // Produce stall entrance — UNLOCKED (Ave1)
        {
          id: "produce-enter",
          x: 580,
          y: AVE1_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "produce",
          targetX: 150,
          targetY: 226,
          locked: false,
          label: "ОВОЩИ",
        },
        // Dairy shop entrance — LOCKED (Ave3)
        {
          id: "dairy-enter",
          x: 800,
          y: AVE3_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "dairy",
          targetX: 150,
          targetY: 226,
          locked: true,
          label: "МОЛОЧНАЯ",
        },
        // Butcher shop entrance — LOCKED (Ave2, on ground stretch 1690-2040)
        {
          id: "butcher-enter",
          x: 1820,
          y: AVE2_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "butcher",
          targetX: 150,
          targetY: 216,
          locked: true,
          label: "МЯСНАЯ",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        { label: "АПТЕКА", x: 1800, y: AVE1_Y - 88 },
        { label: "ШКОЛА", x: 2800, y: AVE2_Y - 88 },
        { label: "КАФЕ", x: 1200, y: AVE3_Y - 88 },
        { label: "БИБЛИОТЕКА", x: 1000, y: AVE4_Y - 88 },
      ],
      streetSigns: [
        // === Street 1 (УЛ. ТОЛСТОГО) × Avenue 1 ===
        {
          id: "sign-tolstogo-ave1", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 240, y: AVE1_Y + 5,
        },
        // === Street 1 (УЛ. ТОЛСТОГО) × Avenue 2 ===
        {
          id: "sign-tolstogo-ave2", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 490, y: AVE2_Y + 5,
        },
        // === Street 2 (УЛ. ЧЕХОВА) × Avenue 1 ===
        {
          id: "sign-chehova-ave1", label: "УЛ. ЧЕХОВА",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 840, y: AVE1_Y + 5,
        },
        // === Street 2 (УЛ. ЧЕХОВА) × Avenue 2 ===
        {
          id: "sign-chehova-ave2", label: "УЛ. ЧЕХОВА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1090, y: AVE2_Y + 5,
        },
        // === Street 3 (УЛ. МИРА) × Avenue 2 ===
        {
          id: "sign-mira-ave2", label: "УЛ. МИРА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1440, y: AVE2_Y + 5,
        },
        // === Street 3 (УЛ. МИРА) × Avenue 3 ===
        {
          id: "sign-mira-ave3", label: "УЛ. МИРА",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 1690, y: AVE3_Y + 5,
        },
        // === Street 4 (УЛ. ПОБЕДЫ) × Avenue 2 ===
        {
          id: "sign-pobedy-ave2", label: "УЛ. ПОБЕДЫ",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 2040, y: AVE2_Y + 5,
        },
        // === Street 4 (УЛ. ПОБЕДЫ) × Avenue 3 ===
        {
          id: "sign-pobedy-ave3", label: "УЛ. ПОБЕДЫ",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 2290, y: AVE3_Y + 5,
        },
        // === Street 5 (УЛ. ЛЕРМОНТОВА) × Avenue 3 ===
        {
          id: "sign-lermontova-ave3", label: "УЛ. ЛЕРМОНТОВА",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 2640, y: AVE3_Y + 5,
        },
        // === Street 5 (УЛ. ЛЕРМОНТОВА) × Avenue 4 ===
        {
          id: "sign-lermontova-ave4", label: "УЛ. ЛЕРМОНТОВА",
          avenueName: "ПР. МАШЕРОВА",
          x: 2890, y: AVE4_Y + 5,
        },
        // === Street 6 (УЛ. ГОРЬКОГО) × Avenue 3 ===
        {
          id: "sign-gorkogo-ave3", label: "УЛ. ГОРЬКОГО",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 1740, y: AVE3_Y + 5,
        },
        // === Street 6 (УЛ. ГОРЬКОГО) × Avenue 4 ===
        {
          id: "sign-gorkogo-ave4", label: "УЛ. ГОРЬКОГО",
          avenueName: "ПР. МАШЕРОВА",
          x: 1990, y: AVE4_Y + 5,
        },
      ],
      streetCorridors: [
        { x: 250, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 850, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 1450, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },
        { x: 2050, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },
        { x: 2650, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },
        { x: 1750, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },
      ],
    },

    // === PRODUCE SHOP INTERIOR ===
    {
      id: "produce",
      type: "interior",
      shelfType: "wood",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Shelf
        { x: 100, y: 190, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "sveokla_beet", x: 120, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "produce-exit",
          x: 155,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 580,
          targetY: AVE1_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["sveokla_beet"],
        daResponses: ["ДА! Свежая свёкла!", "ДА, берите!"],
        netResponses: ["НЕТ, только овощи.", "НЕТ!"],
        conversation: produceConversation,
      },
    },

    // === DAIRY SHOP INTERIOR ===
    {
      id: "dairy",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Shelf
        { x: 100, y: 190, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "tvorog_tub", x: 120, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "dairy-exit",
          x: 155,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 800,
          targetY: AVE3_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["tvorog_tub"],
        daResponses: ["ДА! Домашний творог!", "ДА, свежий!"],
        netResponses: ["НЕТ, это не молочное.", "НЕТ!"],
        conversation: dairyConversation,
      },
    },

    // === BUTCHER SHOP INTERIOR ===
    {
      id: "butcher",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 260, width: 380, height: 30 },
        // Shelf
        { x: 110, y: 180, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "sosiski_pack", x: 130, y: 154 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "butcher-exit",
          x: 155,
          y: 200,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 1820,
          targetY: AVE2_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 380, height: 290 },
      shopkeeper: {
        x: 310,
        y: 198,
        acceptsItemIds: ["sosiski_pack"],
        daResponses: ["ДА! Свежие сосиски!", "ДА! Утром привезли!"],
        netResponses: ["НЕТ! Только мясо здесь.", "НЕТ, не то."],
        conversation: butcherConversation,
      },
    },
  ],
};
