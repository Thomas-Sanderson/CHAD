import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

// Four avenues stacked vertically — slightly larger than Level 9
const AVE1_Y = 1550;
const AVE2_Y = 1100;
const AVE3_Y = 650;
const AVE4_Y = 200;
const LEVEL_WIDTH = 3600;
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

const fishShopConversation: ShopKeeperConversation = {
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

const bakeryConversation: ShopKeeperConversation = {
  greetings: GREETINGS,
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    hleb_rye: { script: "ДВА рубля.", pronunciation: "DVAH roob-LYAH", ipa: "/dva rʊˈblʲa/", translation: "Two rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

const dairyConversation: ShopKeeperConversation = {
  greetings: [...GREETINGS, { script: "ПРИВЕТ.", pronunciation: "pree-VYET", ipa: "/prʲɪˈvʲet/", translation: "Hi." }],
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    maslo_butter: { script: "ТРИ рубля.", pronunciation: "TREE roob-LYAH", ipa: "/trʲi rʊˈblʲa/", translation: "Three rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

export const level10Data: LevelData = {
  id: "learn-the-shops",
  name: "Знай Магазины",
  // Fallback fields — segments override them
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 120, y: AVE1_Y - 48 },
  gatePosition: { x: 3400, y: AVE4_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
  skylineY: 50,
  deathFloorY: 1750,
  segments: [
    // === CITY SEGMENT — four avenues + four streets ===
    {
      id: "city",
      type: "street",
      platforms: [
        // ---- Avenue 1 (y=1550) — gaps at St1 (240-490) and St2 (940-1190) ----
        { x: 0, y: AVE1_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE1_Y, width: 450, height: 40, isGround: true },   // 490-940
        { x: 1190, y: AVE1_Y, width: LEVEL_WIDTH - 1190, height: 40, isGround: true },

        // ---- Avenue 2 (y=1100) — gaps at St1 (240-490), St2 (940-1190), St3 (1640-1890) ----
        { x: 0, y: AVE2_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE2_Y, width: 450, height: 40, isGround: true },   // 490-940
        { x: 1190, y: AVE2_Y, width: 450, height: 40, isGround: true },  // 1190-1640
        { x: 1890, y: AVE2_Y, width: LEVEL_WIDTH - 1890, height: 40, isGround: true },

        // ---- Avenue 3 (y=650) — gaps at St3 (1640-1890) and St4 (2340-2590) ----
        { x: 0, y: AVE3_Y, width: 1640, height: 40, isGround: true },
        { x: 1890, y: AVE3_Y, width: 450, height: 40, isGround: true },  // 1890-2340
        { x: 2590, y: AVE3_Y, width: LEVEL_WIDTH - 2590, height: 40, isGround: true },

        // ---- Avenue 4 (y=200) — gap at St4 (2340-2590) ----
        { x: 0, y: AVE4_Y, width: 2340, height: 40, isGround: true },
        { x: 2590, y: AVE4_Y, width: LEVEL_WIDTH - 2590, height: 40, isGround: true },

        // === Street 1 — УЛ. МИРА (x≈300) — Ave1 <-> Ave2, zigzag 130px apart ===
        { x: 260, y: AVE1_Y - 60, width: 90, height: 16 },              // entry (y=1490)
        { x: 390, y: 1415, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 260, y: 1340, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 390, y: 1265, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 260, y: 1190, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 310, y: AVE2_Y + 16, width: 90, height: 16 },              // landing (y=1116)

        // === Street 2 — УЛ. ПОБЕДЫ (x≈1000) — Ave1 <-> Ave2, zigzag 130px apart ===
        { x: 960, y: AVE1_Y - 60, width: 90, height: 16 },              // entry (y=1490)
        { x: 1090, y: 1415, width: 80, height: 16, passThrough: true },  // gap: 75
        { x: 960, y: 1340, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 1090, y: 1265, width: 80, height: 16, passThrough: true },  // gap: 75
        { x: 960, y: 1190, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 1010, y: AVE2_Y + 16, width: 90, height: 16 },             // landing (y=1116)

        // === Street 3 — УЛ. ПУШКИНА (x≈1700) — Ave2 <-> Ave3, zigzag 130px apart ===
        { x: 1660, y: AVE2_Y - 60, width: 90, height: 16 },             // entry (y=1040)
        { x: 1790, y: 965, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 1660, y: 890, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 1790, y: 815, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 1660, y: 740, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 1710, y: AVE3_Y + 16, width: 90, height: 16 },             // landing (y=666)

        // === Street 4 — УЛ. ТОЛСТОГО (x≈2400) — Ave3 <-> Ave4, zigzag 130px apart ===
        { x: 2360, y: AVE3_Y - 60, width: 90, height: 16 },             // entry (y=590)
        { x: 2490, y: 515, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 2360, y: 440, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 2490, y: 365, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 2360, y: 290, width: 80, height: 16, passThrough: true },   // gap: 75
        { x: 2410, y: AVE4_Y + 16, width: 90, height: 16 },             // landing (y=216)

        // Scattered decoy platforms
        { x: 1500, y: 1470, width: 70, height: 16 },    // pickle_jar between Ave1-Ave2
        { x: 2200, y: 1030, width: 80, height: 16 },    // kvass on Ave2
        { x: 2800, y: 1020, width: 80, height: 16 },    // sunflower_seeds on Ave2
        { x: 500, y: 570, width: 80, height: 16 },      // kolbasa on Ave3
        { x: 3100, y: 560, width: 70, height: 16 },     // mystery_can on Ave3

        // Sacred potato platform (hard-to-reach, between Ave3 and Ave4)
        { x: 1950, y: 420, width: 60, height: 16 },
      ],
      collectibles: [
        // Decoys scattered across avenues
        { itemId: "pickle_jar", x: 1520, y: 1444 },
        { itemId: "kvass_bottle", x: 2230, y: 1004 },
        { itemId: "sunflower_seeds", x: 2830, y: 994 },
        { itemId: "kolbasa_ring", x: 530, y: 544 },
        { itemId: "mystery_can", x: 3125, y: 534 },
      ],
      hazards: [
        // Marshrutka on Ave1
        { type: "marshrutka", y: AVE1_Y - 40, speed: 380, interval: 5500 },
        // Marshrutka on Ave2
        { type: "marshrutka", y: AVE2_Y - 40, speed: 400, interval: 5000 },
      ],
      npcs: [
        // 2 babushkas on Ave1
        { type: "babushka", x: 800, y: AVE1_Y - 44, patrolRange: 140 },
        { type: "babushka", x: 2000, y: AVE1_Y - 44, patrolRange: 120 },
        // 1 babushka on Ave2
        { type: "babushka", x: 1400, y: AVE2_Y - 44, patrolRange: 130 },
        // 1 babushka on Ave3
        { type: "babushka", x: 2100, y: AVE3_Y - 44, patrolRange: 120 },
        // Sacred potato on hard-to-reach platform between Ave3 and Ave4
        { type: "potato", x: 1965, y: 390 },
      ],
      doors: [
        // РЫБНАЯ (fish shop) entrance — Ave1, UNLOCKED
        {
          id: "fishshop-enter",
          x: 700,
          y: AVE1_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "fishshop",
          targetX: 150,
          targetY: 226,
          locked: false,
          label: "РЫБНАЯ",
        },
        // ПЕКАРНЯ (bakery) entrance — Ave2, UNLOCKED
        {
          id: "bakery-enter",
          x: 1350,
          y: AVE2_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "bakery",
          targetX: 150,
          targetY: 226,
          locked: false,
          label: "ПЕКАРНЯ",
        },
        // МОЛОЧНАЯ (dairy) entrance — Ave3, LOCKED (requires shout)
        {
          id: "dairy-enter",
          x: 900,
          y: AVE3_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "dairy",
          targetX: 150,
          targetY: 226,
          locked: true,
          label: "МОЛОЧНАЯ",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        { label: "АПТЕКА", x: 54, y: AVE1_Y - 88 },
        { label: "ШКОЛА", x: 2600, y: AVE1_Y - 88 },
        { label: "БАНК", x: 650, y: AVE2_Y - 88 },
        { label: "КАФЕ", x: 2400, y: AVE2_Y - 88 },
        { label: "МАГАЗИН", x: 2800, y: AVE3_Y - 88 },
        { label: "БИБЛИОТЕКА", x: 1200, y: AVE3_Y - 88 },
        { label: "ПОЧТА", x: 1000, y: AVE4_Y - 88 },
        { label: "ПАРК", x: 3200, y: AVE4_Y - 88 },
      ],
      streetSigns: [
        // === Street 1 (УЛ. МИРА) × Avenue 1 ===
        {
          id: "sign-mira-ave1", label: "УЛ. МИРА",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 240, y: AVE1_Y + 5,
        },
        // === Street 1 (УЛ. МИРА) × Avenue 2 ===
        {
          id: "sign-mira-ave2", label: "УЛ. МИРА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 490, y: AVE2_Y + 5,
        },
        // === Street 2 (УЛ. ПОБЕДЫ) × Avenue 1 ===
        {
          id: "sign-pobedy-ave1", label: "УЛ. ПОБЕДЫ",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 940, y: AVE1_Y + 5,
        },
        // === Street 2 (УЛ. ПОБЕДЫ) × Avenue 2 ===
        {
          id: "sign-pobedy-ave2", label: "УЛ. ПОБЕДЫ",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1190, y: AVE2_Y + 5,
        },
        // === Street 3 (УЛ. ПУШКИНА) × Avenue 2 ===
        {
          id: "sign-pushkina-ave2", label: "УЛ. ПУШКИНА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1640, y: AVE2_Y + 5,
        },
        // === Street 3 (УЛ. ПУШКИНА) × Avenue 3 ===
        {
          id: "sign-pushkina-ave3", label: "УЛ. ПУШКИНА",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 1890, y: AVE3_Y + 5,
        },
        // === Street 4 (УЛ. ТОЛСТОГО) × Avenue 3 ===
        {
          id: "sign-tolstogo-ave3", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 2340, y: AVE3_Y + 5,
        },
        // === Street 4 (УЛ. ТОЛСТОГО) × Avenue 4 ===
        {
          id: "sign-tolstogo-ave4", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 2590, y: AVE4_Y + 5,
        },
      ],
      streetCorridors: [
        { x: 250, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 950, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 1650, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },
        { x: 2350, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },
      ],
    },

    // === FISH SHOP INTERIOR (РЫБНАЯ) ===
    {
      id: "fishshop",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Display counter
        { x: 80, y: 190, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "ryba_smoked", x: 100, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "fishshop-exit",
          x: 155,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 700,
          targetY: AVE1_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["ryba_smoked"],
        daResponses: ["ДА! Утром коптили!", "ДА, свежая!"],
        netResponses: ["НЕТ, только рыба.", "НЕТ."],
        conversation: fishShopConversation,
      },
    },

    // === BAKERY INTERIOR (ПЕКАРНЯ) ===
    {
      id: "bakery",
      type: "interior",
      shelfType: "wood",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Display shelf
        { x: 80, y: 190, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "hleb_rye", x: 100, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "bakery-exit",
          x: 155,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 1350,
          targetY: AVE2_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["hleb_rye"],
        daResponses: ["ДА! Свежий!", "ДА, утром пекли!"],
        netResponses: ["НЕТ, только хлеб.", "НЕТ!"],
        conversation: bakeryConversation,
      },
    },

    // === DAIRY INTERIOR (МОЛОЧНАЯ) ===
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
        { itemId: "maslo_butter", x: 120, y: 164 },
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
          targetX: 900,
          targetY: AVE3_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["maslo_butter"],
        daResponses: ["ДА! Свежее масло!", "ДА, берите!"],
        netResponses: ["НЕТ, это не молочное.", "НЕТ!"],
        conversation: dairyConversation,
      },
    },
  ],
};
