import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

// Five avenues x seven streets — the canonical city map
const AVE1_Y = 1900; // bottom — ПР. НЕЗАВИСИМОСТИ
const AVE2_Y = 1450; // ПР. ПОБЕДИТЕЛЕЙ
const AVE3_Y = 1000; // ПР. ОКТЯБРЬСКИЙ
const AVE4_Y = 550;  // ПР. ПАРТИЗАНСКИЙ
const AVE5_Y = 200;  // ПР. ОКТЯБРЯ
const LEVEL_WIDTH = 4600;
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
const ASK_KNOWN = { script: "Ты знаешь.", pronunciation: "tih ZNAH-yesh", ipa: "/tɨ ˈznajɪʂ/", translation: "You know." };

const PLAYER_PHRASES: ConvoPhrase[] = [
  { id: "convo-greet-1", script: "ЗДРАВСТВУЙТЕ", translation: "Hello (formal)", matchesItemId: null, pronunciation: "ZDRAH-stvooy-tyeh", ipa: "/ˈzdrastvujtʲe/", action: "greet" },
  { id: "convo-greet-2", script: "ПРИВЕТ", translation: "Hi (informal)", matchesItemId: null, pronunciation: "pree-VYET", ipa: "/prʲɪˈvʲet/", action: "greet" },
  { id: "convo-ask", script: "ЧТО ЭТО", translation: "What is this?", matchesItemId: null, pronunciation: "SHTOH EH-tah", ipa: "/ʂto ˈɛtə/", action: "ask" },
  { id: "convo-price", script: "СКОЛЬКО", translation: "How much?", matchesItemId: null, pronunciation: "SKOHL-kah", ipa: "/ˈskolʲkə/", action: "price" },
  { id: "convo-bye-1", script: "ДО СВИДАНИЯ", translation: "Goodbye (formal)", matchesItemId: null, pronunciation: "dah svee-DAH-nyah", ipa: "/dɐ svʲɪˈdanʲɪjə/", action: "bye" },
  { id: "convo-bye-2", script: "ПОКА", translation: "Bye (informal)", matchesItemId: null, pronunciation: "pah-KAH", ipa: "/pɐˈka/", action: "bye" },
];

// === КАФЕ shopkeeper — friendly, chatty ===
const cafeConversation: ShopKeeperConversation = {
  greetings: [
    ...GREETINGS,
    { script: "ПРИВЕТ! САДИТЕСЬ!", pronunciation: "pree-VYET! sah-DEE-tyehs", ipa: "/prʲɪˈvʲet sɐˈdʲitʲɪsʲ/", translation: "Hi! Sit down!" },
  ],
  greetingWarm: { script: "О! ДАВАЙТЕ ПИРОЖОК!", pronunciation: "oh! dah-VUY-tyeh pee-rah-ZHOK", ipa: "/dɐˈvajtʲe pʲɪrɐˈʐok/", translation: "Oh! Have a pie!" },
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    pirog_slice: { script: "ДВА рубля. ДЁШЕВО!", pronunciation: "DVAH roob-LYAH. DYOH-sheh-vah", ipa: "/dva rʊˈblʲa ˈdʲoʂɨvə/", translation: "Two rubles. Cheap!" },
  },
  farewells: FAREWELLS,
  farewellEmpty: { script: "ДАЖЕ ПИРОЖОК НЕ ВЗЯЛ?!", pronunciation: "DAH-zheh pee-rah-ZHOK nyeh VZYAHL", ipa: "/ˈdaʐɨ pʲɪrɐˈʐok nʲe vzʲal/", translation: "Didn't even take a pie?!" },
  playerPhrases: PLAYER_PHRASES,
};

// === ПОЧТА shopkeeper — bureaucratic, curt ===
const postConversation: ShopKeeperConversation = {
  greetings: [
    { script: "СЛЕДУЮЩИЙ.", pronunciation: "SLYE-doo-yoo-shee", ipa: "/ˈslʲedʊjʉɕɪj/", translation: "Next." },
  ],
  greetingWarm: { script: "...ЛАДНО. ЧТО НАДО?", pronunciation: "LAHD-nah. SHTOH NAH-dah", ipa: "/ˈladnə ʂto ˈnadə/", translation: "...Fine. What do you need?" },
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    konvert_envelope: { script: "ОДИН рубль. МАРКА ОТДЕЛЬНО.", pronunciation: "ah-DEEN ROOBL. MAHR-kah ahd-DYEHL-nah", ipa: "/ɐˈdʲin rublʲ ˈmarkə ɐˈdʲelʲnə/", translation: "One ruble. Stamp separate." },
  },
  farewells: [
    { script: "СЛЕДУЮЩИЙ!", pronunciation: "SLYE-doo-yoo-shee", ipa: "/ˈslʲedʊjʉɕɪj/", translation: "Next!" },
    { script: "ОКОШКО ЗАКРЫВАЕТСЯ.", pronunciation: "ah-KOSH-kah zah-krih-VAH-yet-sah", ipa: "/ɐˈkoʂkə zəkrɨˈvaɪtsə/", translation: "Window is closing." },
  ],
  farewellEmpty: { script: "ЗАЧЕМ ПРИХОДИЛ?", pronunciation: "zah-CHEM pree-hah-DEEL", ipa: "/zɐˈtɕem prʲɪxɐˈdʲil/", translation: "Why did you come?" },
  playerPhrases: PLAYER_PHRASES,
};

// === БАНК shopkeeper — formal, serious ===
const bankConversation: ShopKeeperConversation = {
  greetings: [
    { script: "ДОБРЫЙ ДЕНЬ. ВАШ ПАСПОРТ.", pronunciation: "DOH-briy DYEN. VAHSH PAHS-pahrt", ipa: "/ˈdobrɨj dʲenʲ vaʂ ˈpaspərt/", translation: "Good day. Your passport." },
  ],
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    moneta_coin: { script: "ПЯТЬ рублей. КОМИССИЯ ДВА.", pronunciation: "PYAHT roo-BLYEY. kah-MEE-see-yah DVAH", ipa: "/pʲætʲ rʊˈblʲej kɐˈmʲisʲɪjə dva/", translation: "Five rubles. Commission two." },
  },
  farewells: [
    { script: "ВСЕГО ДОБРОГО.", pronunciation: "vsyeh-VOH DOHB-rah-vah", ipa: "/vsʲɪˈvo ˈdobrəvə/", translation: "All the best." },
    { script: "ДО СВИДАНИЯ.", pronunciation: "dah svee-DAH-nyah", ipa: "/dɐ svʲɪˈdanʲɪjə/", translation: "Goodbye." },
  ],
  farewellEmpty: { script: "ПАСПОРТ ВЕРНИТЕ.", pronunciation: "PAHS-pahrt vyehr-NEE-tyeh", ipa: "/ˈpaspərt vʲɪrˈnʲitʲe/", translation: "Return the passport." },
  playerPhrases: PLAYER_PHRASES,
};

export const level12Data: LevelData = {
  id: "the-full-map",
  name: "Полная Карта",
  // Fallback fields — segments override them
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 120, y: AVE1_Y - 48 },
  gatePosition: { x: 4400, y: AVE5_Y - 80 },
  bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
  skylineY: 50,
  deathFloorY: 2100,
  segments: [
    // =========================================================================
    // CITY SEGMENT — 5 avenues, 7 streets, all canonical shops as landmarks
    // =========================================================================
    {
      id: "city",
      type: "street",
      platforms: [
        // =====================================================================
        // Avenue 1 (y=1900) — ПР. НЕЗАВИСИМОСТИ
        // Gaps at St1 (240-490) and St2 (840-1090)
        // =====================================================================
        { x: 0, y: AVE1_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE1_Y, width: 350, height: 40, isGround: true },       // 490-840
        { x: 1090, y: AVE1_Y, width: LEVEL_WIDTH - 1090, height: 40, isGround: true },

        // =====================================================================
        // Avenue 2 (y=1450) — ПР. ПОБЕДИТЕЛЕЙ
        // Gaps at St1 (240-490), St2 (840-1090), St3 (1440-1690), St4 (2040-2290)
        // =====================================================================
        { x: 0, y: AVE2_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE2_Y, width: 350, height: 40, isGround: true },       // 490-840
        { x: 1090, y: AVE2_Y, width: 350, height: 40, isGround: true },      // 1090-1440
        { x: 1690, y: AVE2_Y, width: 350, height: 40, isGround: true },      // 1690-2040
        { x: 2290, y: AVE2_Y, width: LEVEL_WIDTH - 2290, height: 40, isGround: true },

        // =====================================================================
        // Avenue 3 (y=1000) — ПР. ОКТЯБРЬСКИЙ
        // Gaps at St3 (1440-1690), St4 (2040-2290), St5 (2640-2890), St6 (3240-3490)
        // =====================================================================
        { x: 0, y: AVE3_Y, width: 1440, height: 40, isGround: true },
        { x: 1690, y: AVE3_Y, width: 350, height: 40, isGround: true },      // 1690-2040
        { x: 2290, y: AVE3_Y, width: 350, height: 40, isGround: true },      // 2290-2640
        { x: 2890, y: AVE3_Y, width: 350, height: 40, isGround: true },      // 2890-3240
        { x: 3490, y: AVE3_Y, width: LEVEL_WIDTH - 3490, height: 40, isGround: true },

        // =====================================================================
        // Avenue 4 (y=550) — ПР. ПАРТИЗАНСКИЙ
        // Gaps at St5 (2640-2890), St6 (3240-3490), St7 (3840-4090)
        // =====================================================================
        { x: 0, y: AVE4_Y, width: 2640, height: 40, isGround: true },
        { x: 2890, y: AVE4_Y, width: 350, height: 40, isGround: true },      // 2890-3240
        { x: 3490, y: AVE4_Y, width: 350, height: 40, isGround: true },      // 3490-3840
        { x: 4090, y: AVE4_Y, width: LEVEL_WIDTH - 4090, height: 40, isGround: true },

        // =====================================================================
        // Avenue 5 (y=200) — ПР. ОКТЯБРЯ
        // Gap at St7 (3840-4090)
        // =====================================================================
        { x: 0, y: AVE5_Y, width: 3840, height: 40, isGround: true },
        { x: 4090, y: AVE5_Y, width: LEVEL_WIDTH - 4090, height: 40, isGround: true },

        // =================================================================
        // Street 1 — УЛ. МИРА (x~300): Ave1 <-> Ave2, zigzag 130px apart
        // =================================================================
        { x: 260, y: AVE1_Y - 60, width: 90, height: 16 },                     // entry (y=1840)
        { x: 390, y: 1765, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 260, y: 1690, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 390, y: 1615, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 260, y: 1540, width: 80, height: 16, passThrough: true },          // gap: 75
        { x: 310, y: AVE2_Y + 16, width: 90, height: 16 },                     // landing (y=1466)

        // =================================================================
        // Street 2 — УЛ. ПОБЕДЫ (x~900): Ave1 <-> Ave2, zigzag 130px apart
        // =================================================================
        { x: 860, y: AVE1_Y - 60, width: 90, height: 16 },                     // entry (y=1840)
        { x: 990, y: 1765, width: 80, height: 16, passThrough: true },
        { x: 860, y: 1690, width: 80, height: 16, passThrough: true },
        { x: 990, y: 1615, width: 80, height: 16, passThrough: true },
        { x: 860, y: 1540, width: 80, height: 16, passThrough: true },
        { x: 910, y: AVE2_Y + 16, width: 90, height: 16 },                     // landing (y=1466)

        // =================================================================
        // Street 3 — УЛ. ПУШКИНА (x~1500): Ave2 <-> Ave3, zigzag 130px apart
        // =================================================================
        { x: 1460, y: AVE2_Y - 60, width: 90, height: 16 },                    // entry (y=1390)
        { x: 1590, y: 1315, width: 80, height: 16, passThrough: true },
        { x: 1460, y: 1240, width: 80, height: 16, passThrough: true },
        { x: 1590, y: 1165, width: 80, height: 16, passThrough: true },
        { x: 1460, y: 1090, width: 80, height: 16, passThrough: true },
        { x: 1510, y: AVE3_Y + 16, width: 90, height: 16 },                    // landing (y=1016)

        // =================================================================
        // Street 4 — УЛ. ТОЛСТОГО (x~2100): Ave2 <-> Ave3, zigzag 130px apart
        // =================================================================
        { x: 2060, y: AVE2_Y - 60, width: 90, height: 16 },                    // entry (y=1390)
        { x: 2190, y: 1315, width: 80, height: 16, passThrough: true },
        { x: 2060, y: 1240, width: 80, height: 16, passThrough: true },
        { x: 2190, y: 1165, width: 80, height: 16, passThrough: true },
        { x: 2060, y: 1090, width: 80, height: 16, passThrough: true },
        { x: 2110, y: AVE3_Y + 16, width: 90, height: 16 },                    // landing (y=1016)

        // =================================================================
        // Street 5 — УЛ. ЧЕХОВА (x~2700): Ave3 <-> Ave4, zigzag 130px apart
        // =================================================================
        { x: 2660, y: AVE3_Y - 60, width: 90, height: 16 },                    // entry (y=940)
        { x: 2790, y: 865, width: 80, height: 16, passThrough: true },
        { x: 2660, y: 790, width: 80, height: 16, passThrough: true },
        { x: 2790, y: 715, width: 80, height: 16, passThrough: true },
        { x: 2660, y: 640, width: 80, height: 16, passThrough: true },
        { x: 2710, y: AVE4_Y + 16, width: 90, height: 16 },                    // landing (y=566)

        // =================================================================
        // Street 6 — УЛ. ЛЕРМОНТОВА (x~3300): Ave3 <-> Ave4, zigzag 130px apart
        // =================================================================
        { x: 3260, y: AVE3_Y - 60, width: 90, height: 16 },                    // entry (y=940)
        { x: 3390, y: 865, width: 80, height: 16, passThrough: true },
        { x: 3260, y: 790, width: 80, height: 16, passThrough: true },
        { x: 3390, y: 715, width: 80, height: 16, passThrough: true },
        { x: 3260, y: 640, width: 80, height: 16, passThrough: true },
        { x: 3310, y: AVE4_Y + 16, width: 90, height: 16 },                    // landing (y=566)

        // =================================================================
        // Street 7 — УЛ. ГОРЬКОГО (x~3900): Ave4 <-> Ave5, zigzag 130px apart
        // =================================================================
        { x: 3860, y: AVE4_Y - 60, width: 90, height: 16 },                    // entry (y=490)
        { x: 3990, y: 430, width: 80, height: 16, passThrough: true },
        { x: 3860, y: 370, width: 80, height: 16, passThrough: true },
        { x: 3990, y: 310, width: 80, height: 16, passThrough: true },
        { x: 3860, y: 280, width: 80, height: 16, passThrough: true },
        { x: 3910, y: AVE5_Y + 16, width: 90, height: 16 },                    // landing (y=216)

        // =================================================================
        // Scattered platforming — decoy perches and shortcuts
        // =================================================================
        // Ave1 puddle jumps
        { x: 600, y: 1860, width: 60, height: 16 },
        { x: 1400, y: 1860, width: 60, height: 16 },
        // Ave2 decoy platforms
        { x: 1900, y: 1410, width: 80, height: 16 },
        { x: 2500, y: 1420, width: 80, height: 16 },
        // Ave3 decoy platforms
        { x: 800, y: 960, width: 80, height: 16 },
        { x: 2000, y: 970, width: 80, height: 16 },
        // Ave4 decoy platforms
        { x: 1200, y: 510, width: 80, height: 16 },
        { x: 2200, y: 520, width: 70, height: 16 },
        // Sacred potato perch (between Ave4 and Ave5)
        { x: 3600, y: 380, width: 60, height: 16 },
      ],
      collectibles: [
        // Outdoor decoys scattered across avenues
        { itemId: "vodka_bottle", x: 620, y: 1830 },
        { itemId: "pickle_jar", x: 1420, y: 1830 },
        { itemId: "kolbasa_ring", x: 1930, y: 1384 },
        { itemId: "sunflower_seeds", x: 2530, y: 1394 },
        { itemId: "mystery_can", x: 830, y: 930 },
      ],
      hazards: [
        // Marshrutka on Ave1
        { type: "marshrutka", y: AVE1_Y - 40, speed: 400, interval: 5000 },
        // Marshrutka on Ave2
        { type: "marshrutka", y: AVE2_Y - 40, speed: 380, interval: 5500 },
        // Marshrutka on Ave3
        { type: "marshrutka", y: AVE3_Y - 40, speed: 420, interval: 6000 },
      ],
      npcs: [
        // Avenue 1 — 2 babushkas
        { type: "babushka", x: 700, y: AVE1_Y - 44, patrolRange: 140 },
        { type: "babushka", x: 1800, y: AVE1_Y - 44, patrolRange: 120 },
        // Avenue 2 — 1 babushka
        { type: "babushka", x: 1200, y: AVE2_Y - 44, patrolRange: 130 },
        // Avenue 3 — 1 babushka
        { type: "babushka", x: 2800, y: AVE3_Y - 44, patrolRange: 110 },
        // Avenue 4 — 1 babushka
        { type: "babushka", x: 1800, y: AVE4_Y - 44, patrolRange: 100 },
        // Sacred potato on tricky perch between Ave4 and Ave5
        { type: "potato", x: 3615, y: 350 },
      ],
      doors: [
        // === КАФЕ entrance (Ave4, x~1600) ===
        {
          id: "cafe-enter",
          x: 1600,
          y: AVE4_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "cafe",
          targetX: 150,
          targetY: 226,
          locked: false,
          label: "КАФЕ",
        },
        // === ПОЧТА entrance (Ave4, x~3000) ===
        {
          id: "post-enter",
          x: 3060,
          y: AVE4_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "post",
          targetX: 150,
          targetY: 216,
          locked: false,
          label: "ПОЧТА",
        },
        // === БАНК entrance (Ave5, x~2000) ===
        {
          id: "bank-enter",
          x: 2000,
          y: AVE5_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "bank",
          targetX: 150,
          targetY: 226,
          locked: false,
          label: "БАНК",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        // Old shops as backdrop landmarks (not enterable in L12)
        { label: "МОЛОЧНАЯ", x: 654, y: AVE1_Y - 88 },
        { label: "РЫБНАЯ", x: 1200, y: AVE1_Y - 88 },
        { label: "ШКОЛА", x: 2200, y: AVE1_Y - 88 },
        { label: "ПЕКАРНЯ", x: 650, y: AVE2_Y - 88 },
        { label: "МЯСНАЯ", x: 1800, y: AVE2_Y - 88 },
        { label: "МАГАЗИН", x: 3000, y: AVE2_Y - 88 },
        { label: "ОВОЩНАЯ", x: 1100, y: AVE3_Y - 88 },
        { label: "АПТЕКА", x: 2450, y: AVE3_Y - 88 },
        { label: "БИБЛИОТЕКА", x: 3800, y: AVE3_Y - 88 },
        // Enterable shops are labeled by their doors, not duplicated here
        { label: "ПАРК", x: 4246, y: AVE5_Y - 88 },
      ],
      streetSigns: [
        // === Street 1 (УЛ. МИРА) ===
        {
          id: "sign-mira-ave1", label: "УЛ. МИРА",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 240, y: AVE1_Y + 5,
        },
        {
          id: "sign-mira-ave2", label: "УЛ. МИРА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 490, y: AVE2_Y + 5,
        },
        // === Street 2 (УЛ. ПОБЕДЫ) ===
        {
          id: "sign-pobedy-ave1", label: "УЛ. ПОБЕДЫ",
          avenueName: "ПР. НЕЗАВИСИМОСТИ",
          x: 840, y: AVE1_Y + 5,
        },
        {
          id: "sign-pobedy-ave2", label: "УЛ. ПОБЕДЫ",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1090, y: AVE2_Y + 5,
        },
        // === Street 3 (УЛ. ПУШКИНА) ===
        {
          id: "sign-pushkina-ave2", label: "УЛ. ПУШКИНА",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 1440, y: AVE2_Y + 5,
        },
        {
          id: "sign-pushkina-ave3", label: "УЛ. ПУШКИНА",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 1690, y: AVE3_Y + 5,
        },
        // === Street 4 (УЛ. ТОЛСТОГО) ===
        {
          id: "sign-tolstogo-ave2", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. ПОБЕДИТЕЛЕЙ",
          x: 2040, y: AVE2_Y + 5,
        },
        {
          id: "sign-tolstogo-ave3", label: "УЛ. ТОЛСТОГО",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 2290, y: AVE3_Y + 5,
        },
        // === Street 5 (УЛ. ЧЕХОВА) ===
        {
          id: "sign-chehova-ave3", label: "УЛ. ЧЕХОВА",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 2640, y: AVE3_Y + 5,
        },
        {
          id: "sign-chehova-ave4", label: "УЛ. ЧЕХОВА",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 2890, y: AVE4_Y + 5,
        },
        // === Street 6 (УЛ. ЛЕРМОНТОВА) ===
        {
          id: "sign-lermontova-ave3", label: "УЛ. ЛЕРМОНТОВА",
          avenueName: "ПР. ОКТЯБРЬСКИЙ",
          x: 3240, y: AVE3_Y + 5,
        },
        {
          id: "sign-lermontova-ave4", label: "УЛ. ЛЕРМОНТОВА",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 3490, y: AVE4_Y + 5,
        },
        // === Street 7 (УЛ. ГОРЬКОГО) ===
        {
          id: "sign-gorkogo-ave4", label: "УЛ. ГОРЬКОГО",
          avenueName: "ПР. ПАРТИЗАНСКИЙ",
          x: 3840, y: AVE4_Y + 5,
        },
        {
          id: "sign-gorkogo-ave5", label: "УЛ. ГОРЬКОГО",
          avenueName: "ПР. ОКТЯБРЯ",
          x: 4090, y: AVE5_Y + 5,
        },
      ],
      streetCorridors: [
        // Street 1 — УЛ. МИРА: Ave1 <-> Ave2
        { x: 250, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        // Street 2 — УЛ. ПОБЕДЫ: Ave1 <-> Ave2
        { x: 850, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        // Street 3 — УЛ. ПУШКИНА: Ave2 <-> Ave3
        { x: 1450, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },
        // Street 4 — УЛ. ТОЛСТОГО: Ave2 <-> Ave3
        { x: 2050, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },
        // Street 5 — УЛ. ЧЕХОВА: Ave3 <-> Ave4
        { x: 2650, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },
        // Street 6 — УЛ. ЛЕРМОНТОВА: Ave3 <-> Ave4
        { x: 3250, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },
        // Street 7 — УЛ. ГОРЬКОГО: Ave4 <-> Ave5
        { x: 3850, width: 230, topY: AVE5_Y, bottomY: AVE4_Y },
      ],
    },

    // =========================================================================
    // КАФЕ INTERIOR — friendly, warm, pie on the counter
    // =========================================================================
    {
      id: "cafe",
      type: "interior",
      shelfType: "wood",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 400, height: 30 },
        // Counter with pie
        { x: 80, y: 190, width: 100, height: 12 },
        // Tall shelf (decoration / jump challenge)
        { x: 250, y: 150, width: 80, height: 12 },
      ],
      collectibles: [
        { itemId: "pirog_slice", x: 100, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "cafe-exit",
          x: 155,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 1600,
          targetY: AVE4_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 400, height: 300 },
      shopkeeper: {
        x: 330,
        y: 208,
        acceptsItemIds: ["pirog_slice"],
        daResponses: ["ДА! Горячий пирожок!", "ДА! Только из печки!"],
        netResponses: ["НЕТ, здесь только пирожки.", "НЕТ! Это кафе, не магазин!"],
        conversation: cafeConversation,
      },
    },

    // =========================================================================
    // ПОЧТА INTERIOR — bureaucratic, no-nonsense
    // =========================================================================
    {
      id: "post",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 260, width: 380, height: 30 },
        // Counter window shelf
        { x: 100, y: 180, width: 110, height: 12 },
      ],
      collectibles: [
        { itemId: "konvert_envelope", x: 125, y: 154 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "post-exit",
          x: 155,
          y: 200,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 3060,
          targetY: AVE4_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 380, height: 290 },
      shopkeeper: {
        x: 310,
        y: 198,
        acceptsItemIds: ["konvert_envelope"],
        daResponses: ["ДА. КОНВЕРТ. МАРКУ КЛЕИТЬ САМОМУ.", "ДА. СЛЕДУЮЩИЙ."],
        netResponses: ["НЕТ. ТОЛЬКО ПОЧТОВЫЕ ТОВАРЫ.", "НЕТ. ЧИТАЙТЕ ПРАВИЛА."],
        conversation: postConversation,
      },
    },

    // =========================================================================
    // БАНК INTERIOR — formal, serious, coin behind the counter
    // =========================================================================
    {
      id: "bank",
      type: "interior",
      shelfType: "metal",
      platforms: [
        // Floor
        { x: 0, y: 270, width: 420, height: 30 },
        // Teller counter
        { x: 100, y: 190, width: 120, height: 12 },
        // Security shelf (high, for challenge)
        { x: 280, y: 140, width: 80, height: 12 },
      ],
      collectibles: [
        { itemId: "moneta_coin", x: 130, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "bank-exit",
          x: 165,
          y: 210,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 2000,
          targetY: AVE5_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 420, height: 300 },
      shopkeeper: {
        x: 350,
        y: 208,
        acceptsItemIds: ["moneta_coin"],
        daResponses: ["ДА. РАСПИШИТЕСЬ.", "ДА. КВИТАНЦИЮ СОХРАНИТЕ."],
        netResponses: ["НЕТ. ЭТО НЕ БАНКОВСКАЯ ОПЕРАЦИЯ.", "НЕТ. ПОПРОБУЙТЕ ПОЧТУ."],
        conversation: bankConversation,
      },
    },
  ],
};
