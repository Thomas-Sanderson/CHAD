import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

const AVENUE_1_Y = 900; // lower avenue (start)
const AVENUE_2_Y = 400; // upper avenue (gate)
const LEVEL_WIDTH = 2400;
const LEVEL_HEIGHT = 1300;

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
    smetana_tub: { script: "ЧЕТЫРЕ рубля.", pronunciation: "cheh-TIH-ryeh roob-LYAH", ipa: "/tɕɪˈtɨrʲe rʊˈblʲa/", translation: "Four rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

export const level7Data: LevelData = {
  id: "up-the-street",
  name: "Up the Street",
  // Fallback fields — segments override these
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 120, y: AVENUE_1_Y - 48 },
  gatePosition: { x: 80, y: AVENUE_2_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
  skylineY: 100,
  deathFloorY: 1050,
  segments: [
    // === CITY STREET SEGMENT (both avenues + connecting streets) ===
    {
      id: "city",
      type: "street",
      platforms: [
        // --- Avenue 1 (lower) — split at Street A gap (x: 280-520) ---
        { x: 0, y: AVENUE_1_Y, width: 280, height: 40, isGround: true },
        { x: 520, y: AVENUE_1_Y, width: LEVEL_WIDTH - 520, height: 40, isGround: true },

        // --- Avenue 2 (upper) — split at Street A (x: 280-520) and Street B (x: 1830-1970) ---
        { x: 0, y: AVENUE_2_Y, width: 280, height: 40, isGround: true },
        { x: 520, y: AVENUE_2_Y, width: 1310, height: 40, isGround: true },
        { x: 1970, y: AVENUE_2_Y, width: LEVEL_WIDTH - 1970, height: 40, isGround: true },

        // --- Street A (left, x≈300-500): ascending platforms, zigzag 130px apart ---
        { x: 310, y: AVENUE_1_Y - 60, width: 90, height: 16 },   // entry (y=840)
        { x: 440, y: 770, width: 80, height: 16, passThrough: true },   // step 2 (gap: 70)
        { x: 310, y: 700, width: 80, height: 16, passThrough: true },   // step 3 (gap: 70)
        { x: 440, y: 630, width: 80, height: 16, passThrough: true },   // step 4 (gap: 70)
        { x: 310, y: 560, width: 80, height: 16, passThrough: true },   // step 5 (gap: 70)
        { x: 440, y: 490, width: 80, height: 16, passThrough: true },   // step 6 (gap: 70)
        { x: 370, y: AVENUE_2_Y + 16, width: 90, height: 16 },  // landing (y=416, gap: 74)

        // --- Street B (right, x≈1830-1970): drop-only gap ---
        { x: 1870, y: AVENUE_2_Y + 16, width: 80, height: 16 }, // ledge just below Ave 2 edge
        // gap below — falling drops to Avenue 1

        // --- Avenue 1 item platforms ---
        { x: 700, y: 860, width: 80, height: 16 },   // platform for ХЛЕБ area
        { x: 1100, y: 850, width: 80, height: 16 },   // platform for СВЁКЛА
        { x: 1400, y: 840, width: 60, height: 16 },   // puddle jump

        // --- Avenue 2 item platforms ---
        { x: 600, y: 360, width: 80, height: 16 },    // platform for МАСЛО area
        { x: 1200, y: 350, width: 80, height: 16 },   // platform for СМЕТАНА area
        { x: 1600, y: 360, width: 60, height: 16 },   // puddle jump

        // --- Elevated decoy platforms ---
        { x: 900, y: 780, width: 80, height: 16 },    // decoy: pickle_jar
        { x: 2100, y: 340, width: 80, height: 16 },   // decoy: sunflower_seeds
        { x: 1650, y: 300, width: 80, height: 16 },   // mystery can platform

      ],
      collectibles: [
        // Avenue 1 items (outdoor, near bakery)
        { itemId: "hleb_rye", x: 720, y: 830 },
        { itemId: "sveokla_beet", x: 1120, y: 820 },

        // Avenue 2 items (outdoor, near dairy)
        { itemId: "maslo_butter", x: 620, y: 330 },
        { itemId: "smetana_tub", x: 1220, y: 320 },

        // Decoys on elevated platforms
        { itemId: "pickle_jar", x: 920, y: 750 },
        { itemId: "sunflower_seeds", x: 2120, y: 310 },
        { itemId: "mystery_can", x: 1680, y: 270 },
      ],
      hazards: [
        // Marshrutka on Avenue 1
        { type: "marshrutka", y: AVENUE_1_Y - 40, speed: 350, interval: 6000 },
        // Marshrutka on Avenue 2
        { type: "marshrutka", y: AVENUE_2_Y - 40, speed: 400, interval: 5000 },
      ],
      npcs: [
        // Avenue 1 babushka
        { type: "babushka", x: 1000, y: AVENUE_1_Y - 44, patrolRange: 140 },
        // Avenue 2 babushka
        { type: "babushka", x: 1500, y: AVENUE_2_Y - 44, patrolRange: 120 },
        // Sacred potato above МОЛОЧНАЯ rooftop — must jump from facade roof (y=304)
        { type: "potato", x: 915, y: 220 },
      ],
      doors: [
        // Bakery entrance on Avenue 1
        {
          id: "bakery-enter",
          x: 630,
          y: AVENUE_1_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "bakery",
          targetX: 150,
          targetY: 222,
          locked: false,
          label: "ПЕКАРНЯ",
        },
        // Dairy entrance on Avenue 2
        {
          id: "dairy-enter",
          x: 900,
          y: AVENUE_2_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "dairy",
          targetX: 160,
          targetY: 226,
          locked: false,
          label: "МОЛОЧНАЯ",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        { label: "АПТЕКА", x: 1500, y: AVENUE_1_Y - 88 },
        { label: "БАНК", x: 1900, y: AVENUE_1_Y - 88 },
        { label: "КАФЕ", x: 1700, y: AVENUE_2_Y - 88 },
        { label: "МАГАЗИН", x: 2100, y: AVENUE_2_Y - 88 },
      ],
      streetSigns: [
        // === Street A × Avenue 2 (upper) ===
        {
          id: "sign-mira-ave2",
          label: "УЛ. МИРА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 530,
          y: AVENUE_2_Y + 5,
        },
        // === Street A × Avenue 1 (lower) ===
        {
          id: "sign-mira-ave1",
          label: "УЛ. МИРА",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 280,
          y: AVENUE_1_Y + 5,
        },
      ],
      streetCorridors: [
        { x: 300, width: 230, topY: AVENUE_2_Y, bottomY: AVENUE_1_Y },
      ],
    },

    // === BAKERY INTERIOR ===
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
          targetX: 630,
          targetY: AVENUE_1_Y - 48,
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

    // === DAIRY INTERIOR ===
    {
      id: "dairy",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Shelf — left
        { x: 50, y: 190, width: 90, height: 12 },
        // Shelf — right
        { x: 200, y: 190, width: 90, height: 12 },
      ],
      collectibles: [
        { itemId: "maslo_butter", x: 70, y: 164 },
        { itemId: "smetana_tub", x: 220, y: 164 },
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
          targetSegmentId: "city",
          targetX: 900,
          targetY: AVENUE_2_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["maslo_butter", "smetana_tub"],
        daResponses: ["ДА! Свежее!", "ДА, берите!"],
        netResponses: ["НЕТ, не то.", "НЕТ!"],
        conversation: dairyConversation,
      },
    },
  ],
};
