import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

// Five avenues stacked vertically — the biggest city map yet
const AVE1_Y = 1900;  // ПР. НЕЗАВИСИМОСТИ (bottom)
const AVE2_Y = 1450;  // ПР. ПОБЕДИТЕЛЕЙ
const AVE3_Y = 1000;  // ПР. ОКТЯБРЬСКИЙ
const AVE4_Y = 550;   // ПР. ПАРТИЗАНСКИЙ
const AVE5_Y = 200;   // ПР. ОКТЯБРЯ (top)
const LEVEL_WIDTH = 3800;
const LEVEL_HEIGHT = 2500;

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

// Pharmacy shopkeeper — more clinical tone
const pharmacyConversation: ShopKeeperConversation = {
  greetings: [
    { script: "ЗДРАВСТВУЙТЕ.", pronunciation: "ZDRAH-stvooy-tyeh", ipa: "/ˈzdrastvujtʲe/", translation: "Hello." },
    { script: "ЧТО ВАМ?", pronunciation: "SHTOH VAHM", ipa: "/ʂto vam/", translation: "What do you need?" },
  ],
  greetingWarm: { script: "ПОЖАЛУЙСТА, ПРОХОДИТЕ.", pronunciation: "pah-ZHAH-loo-stah prah-hah-DEE-tyeh", ipa: "/pɐˈʐalʊstə prəxɐˈdʲitʲe/", translation: "Please, come in." },
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    aspirin_box: { script: "ОДИН рубль.", pronunciation: "ah-DEEN roob-L", ipa: "/ɐˈdʲin rublʲ/", translation: "One ruble." },
  },
  farewells: [
    { script: "БУДЬТЕ ЗДОРОВЫ.", pronunciation: "BOOD-tyeh zdah-ROH-vih", ipa: "/ˈbudʲtʲe zdɐˈrovɨ/", translation: "Be well." },
    { script: "ДО СВИДАНИЯ.", pronunciation: "dah svee-DAH-nyah", ipa: "/dɐ svʲɪˈdanʲɪjə/", translation: "Goodbye." },
  ],
  farewellEmpty: { script: "НИЧЕГО НЕ НУЖНО?", pronunciation: "nee-cheh-VOH nyeh NOOZH-nah", ipa: "/nʲɪtɕɪˈvo nʲe ˈnuʐnə/", translation: "Don't need anything?" },
  playerPhrases: PLAYER_PHRASES,
};

export const level11Data: LevelData = {
  id: "the-far-side",
  name: "Дальняя Сторона",
  // Fallback fields — segments override them
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 120, y: AVE1_Y - 48 },
  gatePosition: { x: 3600, y: AVE5_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
  skylineY: 50,
  deathFloorY: 2100,
  segments: [
    // === CITY SEGMENT — five avenues + five streets ===
    {
      id: "city",
      type: "street",
      platforms: [
        // ---- Avenue 1 (y=1900) — gaps at St1 (240-490) and St2 (840-1090) ----
        { x: 0, y: AVE1_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE1_Y, width: 350, height: 40, isGround: true },   // 490-840
        { x: 1090, y: AVE1_Y, width: LEVEL_WIDTH - 1090, height: 40, isGround: true },

        // ---- Avenue 2 (y=1450) — gaps at St1 (240-490), St2 (840-1090), St3 (1440-1690) ----
        { x: 0, y: AVE2_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE2_Y, width: 350, height: 40, isGround: true },   // 490-840
        { x: 1090, y: AVE2_Y, width: 350, height: 40, isGround: true },  // 1090-1440
        { x: 1690, y: AVE2_Y, width: LEVEL_WIDTH - 1690, height: 40, isGround: true },

        // ---- Avenue 3 (y=1000) — gaps at St3 (1440-1690) and St4 (2040-2290) ----
        { x: 0, y: AVE3_Y, width: 1440, height: 40, isGround: true },
        { x: 1690, y: AVE3_Y, width: 350, height: 40, isGround: true },  // 1690-2040
        { x: 2290, y: AVE3_Y, width: LEVEL_WIDTH - 2290, height: 40, isGround: true },

        // ---- Avenue 4 (y=550) — gaps at St4 (2040-2290) and St5 (2640-2890) ----
        { x: 0, y: AVE4_Y, width: 2040, height: 40, isGround: true },
        { x: 2290, y: AVE4_Y, width: 350, height: 40, isGround: true },  // 2290-2640
        { x: 2890, y: AVE4_Y, width: LEVEL_WIDTH - 2890, height: 40, isGround: true },

        // ---- Avenue 5 (y=200) — gap at St5 (2640-2890) ----
        { x: 0, y: AVE5_Y, width: 2640, height: 40, isGround: true },
        { x: 2890, y: AVE5_Y, width: LEVEL_WIDTH - 2890, height: 40, isGround: true },

        // === Street 1 — УЛ. МИРА (x≈300) — Ave1 <-> Ave2, zigzag 130px apart ===
        { x: 260, y: AVE1_Y - 60, width: 90, height: 16 },   // entry (y=1840)
        { x: 390, y: 1765, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 260, y: 1690, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 390, y: 1615, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 260, y: 1540, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 310, y: AVE2_Y + 16, width: 90, height: 16 },   // landing (y=1466)

        // === Street 2 — УЛ. ПОБЕДЫ (x≈900) — Ave1 <-> Ave2, zigzag 130px apart ===
        { x: 860, y: AVE1_Y - 60, width: 90, height: 16 },   // entry (y=1840)
        { x: 990, y: 1765, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 860, y: 1690, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 990, y: 1615, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 860, y: 1540, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 910, y: AVE2_Y + 16, width: 90, height: 16 },   // landing (y=1466)

        // === Street 3 — УЛ. ПУШКИНА (x≈1500) — Ave2 <-> Ave3, zigzag 130px apart ===
        { x: 1460, y: AVE2_Y - 60, width: 90, height: 16 },  // entry (y=1390)
        { x: 1590, y: 1315, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 1460, y: 1240, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 1590, y: 1165, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 1460, y: 1090, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 1510, y: AVE3_Y + 16, width: 90, height: 16 },  // landing (y=1016)

        // === Street 4 — УЛ. ТОЛСТОГО (x≈2100) — Ave3 <-> Ave4, zigzag 130px apart ===
        { x: 2060, y: AVE3_Y - 60, width: 90, height: 16 },  // entry (y=940)
        { x: 2190, y: 865, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2060, y: 790, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2190, y: 715, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2060, y: 640, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2110, y: AVE4_Y + 16, width: 90, height: 16 },  // landing (y=566)

        // === Street 5 — УЛ. ЧЕХОВА (x≈2700) — Ave4 <-> Ave5, zigzag 130px apart ===
        { x: 2660, y: AVE4_Y - 60, width: 90, height: 16 },  // entry (y=490)
        { x: 2790, y: 415, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2660, y: 340, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2790, y: 265, width: 80, height: 16, passThrough: true },           // gap: 75
        { x: 2660, y: 190, width: 80, height: 16, passThrough: true },           // gap: 75 — note: below Ave5 at 200
        { x: 2710, y: AVE5_Y + 16, width: 90, height: 16 },  // landing (y=216)

        // Sacred potato platform (elevated between Ave4 and Ave5, hard to reach)
        { x: 3300, y: 380, width: 60, height: 16 },

        // Scattered platforms for decoys
        { x: 700, y: 1650, width: 70, height: 16 },    // between Ave1-Ave2
        { x: 1800, y: 1370, width: 80, height: 16 },   // near Ave2
        { x: 2500, y: 920, width: 80, height: 16 },    // near Ave3
        { x: 1200, y: 1200, width: 70, height: 16 },   // between Ave2-Ave3
        { x: 3400, y: 470, width: 70, height: 16 },    // near Ave4
      ],
      collectibles: [
        // Decoys scattered across avenues
        { itemId: "vodka_bottle", x: 720, y: 1624 },
        { itemId: "pickle_jar", x: 1830, y: 1344 },
        { itemId: "sunflower_seeds", x: 2530, y: 894 },
        { itemId: "bread_loaf", x: 1225, y: 1174 },
        { itemId: "mystery_can", x: 3425, y: 444 },
      ],
      hazards: [
        // Marshrutka on Ave1
        { type: "marshrutka", y: AVE1_Y - 40, speed: 380, interval: 5500 },
        // Marshrutka on Ave2
        { type: "marshrutka", y: AVE2_Y - 40, speed: 350, interval: 6000 },
        // Marshrutka on Ave3
        { type: "marshrutka", y: AVE3_Y - 40, speed: 420, interval: 7000 },
      ],
      npcs: [
        // Avenue 1: 2 babushkas
        { type: "babushka", x: 1400, y: AVE1_Y - 44, patrolRange: 140 },
        { type: "babushka", x: 2600, y: AVE1_Y - 44, patrolRange: 120 },
        // Avenue 2: 1 babushka
        { type: "babushka", x: 800, y: AVE2_Y - 44, patrolRange: 130 },
        // Avenue 3: 1 babushka
        { type: "babushka", x: 2400, y: AVE3_Y - 44, patrolRange: 120 },
        // Avenue 4: 1 babushka
        { type: "babushka", x: 1600, y: AVE4_Y - 44, patrolRange: 110 },
        // Sacred potato on hard-to-reach platform between Ave4 and Ave5
        { type: "potato", x: 3315, y: 350 },
      ],
      doors: [
        // МЯСНАЯ (butcher) entrance — UNLOCKED (Ave1)
        {
          id: "butcher-enter",
          x: 600,
          y: AVE1_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "butcher",
          targetX: 150,
          targetY: 216,
          locked: false,
          label: "МЯСНАЯ",
        },
        // ОВОЩНАЯ (produce) entrance — LOCKED (Ave2)
        {
          id: "produce-enter",
          x: 1260,
          y: AVE2_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "produce",
          targetX: 150,
          targetY: 226,
          locked: true,
          label: "ОВОЩНАЯ",
        },
        // АПТЕКА (pharmacy) entrance — UNLOCKED (Ave3)
        {
          id: "pharmacy-enter",
          x: 1850,
          y: AVE3_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "pharmacy",
          targetX: 150,
          targetY: 216,
          locked: false,
          label: "АПТЕКА",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        { label: "БАНК", x: 1800, y: AVE1_Y - 88 },
        { label: "ШКОЛА", x: 3200, y: AVE1_Y - 88 },
        { label: "МАГАЗИН", x: 2000, y: AVE2_Y - 88 },
        { label: "КАФЕ", x: 3000, y: AVE2_Y - 88 },
        { label: "БИБЛИОТЕКА", x: 800, y: AVE3_Y - 88 },
        { label: "ПОЧТА", x: 1200, y: AVE4_Y - 88 },
        { label: "ПАРК", x: 1500, y: AVE5_Y - 88 },
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
          x: 840, y: AVE1_Y + 5,
        },
        // === Street 2 (УЛ. ПОБЕДЫ) × Avenue 2 ===
        {
          id: "sign-pobedy-ave2", label: "УЛ. ПОБЕДЫ",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1090, y: AVE2_Y + 5,
        },
        // === Street 3 (УЛ. ПУШКИНА) × Avenue 2 ===
        {
          id: "sign-pushkina-ave2", label: "УЛ. ПУШКИНА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1440, y: AVE2_Y + 5,
        },
        // === Street 3 (УЛ. ПУШКИНА) × Avenue 3 ===
        {
          id: "sign-pushkina-ave3", label: "УЛ. ПУШКИНА",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 1690, y: AVE3_Y + 5,
        },
        // === Street 4 (УЛ. ТОЛСТОГО) × Avenue 3 ===
        {
          id: "sign-tolstogo-ave3", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 2040, y: AVE3_Y + 5,
        },
        // === Street 4 (УЛ. ТОЛСТОГО) × Avenue 4 ===
        {
          id: "sign-tolstogo-ave4", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 2290, y: AVE4_Y + 5,
        },
        // === Street 5 (УЛ. ЧЕХОВА) × Avenue 4 ===
        {
          id: "sign-chehova-ave4", label: "УЛ. ЧЕХОВА",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 2640, y: AVE4_Y + 5,
        },
        // === Street 5 (УЛ. ЧЕХОВА) × Avenue 5 ===
        {
          id: "sign-chehova-ave5", label: "УЛ. ЧЕХОВА",
          avenueName: "ПР. ОКТЯБРЯ",
          x: 2890, y: AVE5_Y + 5,
        },
      ],
      streetCorridors: [
        { x: 250, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },   // St1: Ave1-Ave2
        { x: 850, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },   // St2: Ave1-Ave2
        { x: 1450, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },  // St3: Ave2-Ave3
        { x: 2050, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },  // St4: Ave3-Ave4
        { x: 2650, width: 230, topY: AVE5_Y, bottomY: AVE4_Y },  // St5: Ave4-Ave5
      ],
    },

    // === BUTCHER SHOP INTERIOR (МЯСНАЯ) ===
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
          targetX: 600,
          targetY: AVE1_Y - 48,
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

    // === PRODUCE SHOP INTERIOR (ОВОЩНАЯ) ===
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
          targetX: 1260,
          targetY: AVE2_Y - 48,
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

    // === PHARMACY INTERIOR (АПТЕКА) ===
    {
      id: "pharmacy",
      type: "interior",
      shelfType: "glass",
      platforms: [
        // Floor
        { x: 0, y: 260, width: 380, height: 30 },
        // Shelf
        { x: 110, y: 180, width: 100, height: 12 },
      ],
      collectibles: [
        { itemId: "aspirin_box", x: 130, y: 154 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "pharmacy-exit",
          x: 155,
          y: 200,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 1850,
          targetY: AVE3_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 380, height: 290 },
      shopkeeper: {
        x: 310,
        y: 198,
        acceptsItemIds: ["aspirin_box"],
        daResponses: ["ДА. Аспирин.", "ДА, возьмите."],
        netResponses: ["НЕТ. Это аптека.", "НЕТ, не продаём это."],
        conversation: pharmacyConversation,
      },
    },
  ],
};
