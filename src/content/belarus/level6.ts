import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

// Two avenues — gentle introduction to vertical city
const AVE1_Y = 600; // lower avenue (start)
const AVE2_Y = 250; // upper avenue (gate)
const LEVEL_WIDTH = 2600;
const LEVEL_HEIGHT = 900;

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

const dairyConversation: ShopKeeperConversation = {
  greetings: GREETINGS,
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    syr_wheel: { script: "ПЯТЬ рублей.", pronunciation: "PYAHT roo-BLYEY", ipa: "/pʲætʲ rʊˈblʲej/", translation: "Five rubles." },
    slivki_jar: { script: "ТРИ рубля.", pronunciation: "TREE roob-LYAH", ipa: "/trʲi rʊˈblʲa/", translation: "Three rubles." },
  },
  farewells: FAREWELLS,
  farewellEmpty: FAREWELL_EMPTY,
  playerPhrases: PLAYER_PHRASES,
};

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

const veggiesConversation: ShopKeeperConversation = {
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

export const level6Data: LevelData = {
  id: "the-market",
  name: "The Market",
  // Fallback fields — segments override these
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 120, y: AVE1_Y - 48 },
  gatePosition: { x: 2400, y: AVE2_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
  skylineY: 50,
  deathFloorY: 800,
  segments: [
    // === CITY STREET SEGMENT (both avenues + connecting street) ===
    {
      id: "street",
      type: "street",
      platforms: [
        // --- Avenue 1 (lower) — gap at Street A (x: 780-1010) ---
        { x: 0, y: AVE1_Y, width: 780, height: 40, isGround: true },
        { x: 1010, y: AVE1_Y, width: LEVEL_WIDTH - 1010, height: 40, isGround: true },

        // --- Avenue 2 (upper) — gap at Street A (x: 780-1010) ---
        { x: 0, y: AVE2_Y, width: 780, height: 40, isGround: true },
        { x: 1010, y: AVE2_Y, width: LEVEL_WIDTH - 1010, height: 40, isGround: true },

        // --- Street A (x≈800-1000): gentle ascending platforms ---
        { x: 800, y: AVE1_Y - 60, width: 90, height: 16 },                  // entry (y=540)
        { x: 920, y: 470, width: 80, height: 16, passThrough: true },        // step 2 (gap: 70)
        { x: 800, y: 400, width: 80, height: 16, passThrough: true },        // step 3 (gap: 70)
        { x: 920, y: 330, width: 80, height: 16, passThrough: true },        // step 4 (gap: 70)
        { x: 850, y: AVE2_Y + 16, width: 90, height: 16 },                  // landing (y=266, gap: 64)

        // --- Avenue 1 platforming ---
        { x: 350, y: 560, width: 60, height: 16 },       // puddle jump
        { x: 600, y: 550, width: 80, height: 16 },        // decoy platform
        { x: 1400, y: 560, width: 60, height: 16 },       // puddle jump
        { x: 1800, y: 550, width: 80, height: 16 },       // decoy platform

        // --- Avenue 2 platforming ---
        { x: 1200, y: 210, width: 80, height: 16 },       // decoy platform
        { x: 1700, y: 200, width: 80, height: 16 },       // high platform for potato
        { x: 2000, y: 210, width: 80, height: 16 },       // mystery can platform
      ],
      collectibles: [
        // Outdoor decoys only — target items are inside shops
        { itemId: "kolbasa_ring", x: 620, y: 520 },
        { itemId: "kvass_bottle", x: 1820, y: 520 },
        { itemId: "pickle_jar", x: 1220, y: 180 },
        { itemId: "sunflower_seeds", x: 1420, y: 530 },
        { itemId: "mystery_can", x: 2020, y: 180 },
      ],
      hazards: [
        // Marshrutka on Avenue 1
        { type: "marshrutka", y: AVE1_Y - 40, speed: 350, interval: 6000 },
      ],
      npcs: [
        // Avenue 1 babushkas
        { type: "babushka", x: 400, y: AVE1_Y - 44, patrolRange: 140 },
        { type: "babushka", x: 1500, y: AVE1_Y - 44, patrolRange: 120 },
        // Avenue 2 babushka
        { type: "babushka", x: 1600, y: AVE2_Y - 44, patrolRange: 100 },
        // Sacred potato on high platform
        { type: "potato", x: 1710, y: 170 },
      ],
      doors: [
        // Dairy shop entrance (Avenue 1, left)
        {
          id: "dairy-enter",
          x: 165,
          y: AVE1_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "dairy",
          targetX: 160,
          targetY: 226,
          locked: false,
          label: "МОЛОЧНАЯ",
        },
        // Veggies shop entrance (Avenue 1, right of corridor) — LOCKED
        {
          id: "veggies-enter",
          x: 1200,
          y: AVE1_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "veggies",
          targetX: 150,
          targetY: 216,
          locked: true,
          label: "ОВОЩИ-ФРУКТЫ",
        },
        // Fish shop entrance (Avenue 2, right of corridor)
        {
          id: "fish-enter",
          x: 1500,
          y: AVE2_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "fish",
          targetX: 140,
          targetY: 206,
          locked: false,
          label: "РЫБНАЯ",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        { label: "МАГАЗИН", x: 450, y: AVE1_Y - 88 },
        { label: "БАНК", x: 1700, y: AVE1_Y - 88 },
        { label: "КАФЕ", x: 300, y: AVE2_Y - 88 },
        { label: "АПТЕКА", x: 2000, y: AVE2_Y - 88 },
        { label: "ПАРК", x: 2300, y: AVE2_Y - 88 },
      ],
      streetSigns: [
        // === Street A × Avenue 1 (lower) ===
        {
          id: "sign-mira-ave1",
          label: "УЛ. МИРА",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 780,
          y: AVE1_Y + 5,
        },
        // === Street A × Avenue 2 (upper) ===
        {
          id: "sign-mira-ave2",
          label: "УЛ. МИРА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1010,
          y: AVE2_Y + 5,
        },
      ],
      streetCorridors: [
        { x: 790, width: 220, topY: AVE2_Y, bottomY: AVE1_Y },
      ],
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
          targetY: AVE1_Y - 48,
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
        conversation: dairyConversation,
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
          targetX: 1500,
          targetY: AVE2_Y - 48,
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
          targetX: 1200,
          targetY: AVE1_Y - 48,
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
        conversation: veggiesConversation,
      },
    },
  ],
};
