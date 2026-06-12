import type { LevelData } from "../../types";
import type { ShopKeeperConversation, ConvoPhrase } from "../../types/content";

// Five avenues x seven streets — same canonical city geometry as L12
const AVE1_Y = 1900;
const AVE2_Y = 1450;
const AVE3_Y = 1000;
const AVE4_Y = 550;
const AVE5_Y = 200;
const LEVEL_WIDTH = 4600;
const LEVEL_HEIGHT = 2500;

// Shared shopkeeper phrases (same as L12)
const GREETINGS = [
  { script: "ЗДРАВСТВУЙТЕ.", pronunciation: "ZDRAH-stvooy-tyeh", ipa: "/ˈzdrastvujtʲe/", translation: "Hello." },
  { script: "ДОБРЫЙ ДЕНЬ.", pronunciation: "DOH-briy DYEN", ipa: "/ˈdobrɨj dʲenʲ/", translation: "Good day." },
];
const GREETING_WARM = { script: "О, ПОЖАЛУЙСТА! ДОБРО ПОЖАЛОВАТЬ.", pronunciation: "oh, pah-ZHAH-loo-stah! dah-BROH pah-ZHAH-lah-vaht", ipa: "/pɐˈʐalʊstə dɐˈbro pɐˈʐaləvətʲ/", translation: "Oh, please! Welcome." };
const FAREWELLS = [
  { script: "ДО СВИДАНИЯ.", pronunciation: "dah svee-DAH-nyah", ipa: "/dɐ svʲɪˈdanʲɪjə/", translation: "Goodbye." },
  { script: "ПОКА.", pronunciation: "pah-KAH", ipa: "/pɐˈka/", translation: "Bye." },
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

// === ЦВЕТОЧНАЯ (flower shop) — cheerful, fragrant ===
const flowerShopConversation: ShopKeeperConversation = {
  greetings: [
    ...GREETINGS,
    { script: "КРАСИВО, ПРАВДА?", pronunciation: "krah-SEE-vah, PRAHV-dah", ipa: "/krɐˈsʲivə ˈpravdə/", translation: "Beautiful, right?" },
  ],
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    buket_flowers: { script: "ДЕСЯТЬ рублей. С ЛЕНТОЙ — двенадцать.", pronunciation: "DYEH-syat roob-LYEY. s LYEHN-toy — dveh-NAHT-tsat", ipa: "/ˈdʲesʲɪtʲ rʊˈblʲej s ˈlʲentəj dvʲɪˈnatsːətʲ/", translation: "Ten rubles. With ribbon — twelve." },
  },
  farewells: FAREWELLS,
  farewellEmpty: { script: "ДАЖЕ БУКЕТ НЕ ВЗЯЛ? БЕССЕРДЕЧНЫЙ.", pronunciation: "DAH-zheh boo-KYET nyeh VZYAHL? byehs-SYEHR-dyech-niy", ipa: "/ˈdaʐɨ bʊˈkʲet nʲe vzʲal bʲɪsʲˈsʲerdʲɪtɕnɨj/", translation: "Didn't even take a bouquet? Heartless." },
  playerPhrases: PLAYER_PHRASES,
};

// === ГАЗЕТНЫЙ КИОСК (newspaper kiosk) — bored, gruff ===
const kioskConversation: ShopKeeperConversation = {
  greetings: [
    { script: "ЧЕГО НАДО.", pronunciation: "cheh-VOH NAH-dah", ipa: "/tɕɪˈvo ˈnadə/", translation: "What do you need." },
  ],
  greetingWarm: { script: "...ПОЖАЛУЙСТА? ЛАД­НО, СМОТРИ.", pronunciation: "pah-ZHAH-loo-stah? LAHD-nah, smah-TREE", ipa: "/pɐˈʐalʊstə ˈladnə smɐˈtrʲi/", translation: "Please? Fine, look." },
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    gazeta_paper: { script: "РУБЛЬ. ВЧЕРАШНЯЯ — БЕСПЛАТНО.", pronunciation: "ROOBL. vcheh-RAHSH-nyah-yah — byehs-PLAHT-nah", ipa: "/rublʲ ftɕɪˈraʂnʲəjə bʲɪsˈplatnə/", translation: "One ruble. Yesterday's — free." },
  },
  farewells: [
    { script: "СЛЕДУЮЩИЙ.", pronunciation: "SLYE-doo-yoo-shee", ipa: "/ˈslʲedʊjʉɕɪj/", translation: "Next." },
  ],
  farewellEmpty: { script: "ЗАЧЕМ ПРИШЁЛ?", pronunciation: "zah-CHEM pree-SHOHL", ipa: "/zɐˈtɕem prʲɪˈʂol/", translation: "Why did you come?" },
  playerPhrases: PLAYER_PHRASES,
};

// === ХЛЕБОЗАВОД (bread factory outlet) — warm, flour-dusted ===
const breadShopConversation: ShopKeeperConversation = {
  greetings: [
    ...GREETINGS,
    { script: "СВЕЖИЙ ХЛЕБ! ТОЛЬКО ИЗ ПЕЧИ!", pronunciation: "SVYEH-zhiy KHLYEB! TOHL-kah eez pyeh-CHEE", ipa: "/ˈsvʲeʐɨj xlʲep ˈtolʲkə ɪs pʲɪˈtɕi/", translation: "Fresh bread! Straight from the oven!" },
  ],
  greetingWarm: GREETING_WARM,
  askPrefix: "Это ",
  askKnown: ASK_KNOWN,
  prices: {
    bulka_bun: { script: "ТРИ рубля. ТЁПЛАЯ ЕЩЁ.", pronunciation: "TREE roob-LYAH. TYOHP-lah-yah yeh-SHOH", ipa: "/trʲi rʊˈblʲa ˈtʲopləjə jɪˈɕːo/", translation: "Three rubles. Still warm." },
  },
  farewells: FAREWELLS,
  farewellEmpty: { script: "БЕЗ ХЛЕБА УШЁЛ? СТРАННЫЙ.", pronunciation: "byez KHLYEH-bah oo-SHOHL? STRAHN-niy", ipa: "/bʲez ˈxlʲebə ʊˈʂol ˈstrannɨj/", translation: "Left without bread? Strange." },
  playerPhrases: PLAYER_PHRASES,
};

export const level13Data: LevelData = {
  id: "spring-city",
  name: "Весна",
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
    // CITY SEGMENT — 5 avenues, 7 streets, apartment buildings on avenues
    // =========================================================================
    {
      id: "city",
      type: "street",
      platforms: [
        // Avenue 1 (y=1900) — ПР. НЕЗАВИСИМОСТИ
        { x: 0, y: AVE1_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE1_Y, width: 350, height: 40, isGround: true },
        { x: 1090, y: AVE1_Y, width: LEVEL_WIDTH - 1090, height: 40, isGround: true },

        // Avenue 2 (y=1450) — ПР. ПОБЕДИТЕЛЕЙ
        { x: 0, y: AVE2_Y, width: 240, height: 40, isGround: true },
        { x: 490, y: AVE2_Y, width: 350, height: 40, isGround: true },
        { x: 1090, y: AVE2_Y, width: 350, height: 40, isGround: true },
        { x: 1690, y: AVE2_Y, width: 350, height: 40, isGround: true },
        { x: 2290, y: AVE2_Y, width: LEVEL_WIDTH - 2290, height: 40, isGround: true },

        // Avenue 3 (y=1000) — ПР. ОКТЯБРЬСКИЙ
        { x: 0, y: AVE3_Y, width: 1440, height: 40, isGround: true },
        { x: 1690, y: AVE3_Y, width: 350, height: 40, isGround: true },
        { x: 2290, y: AVE3_Y, width: 350, height: 40, isGround: true },
        { x: 2890, y: AVE3_Y, width: 350, height: 40, isGround: true },
        { x: 3490, y: AVE3_Y, width: LEVEL_WIDTH - 3490, height: 40, isGround: true },

        // Avenue 4 (y=550) — ПР. ПАРТИЗАНСКИЙ
        { x: 0, y: AVE4_Y, width: 2640, height: 40, isGround: true },
        { x: 2890, y: AVE4_Y, width: 350, height: 40, isGround: true },
        { x: 3490, y: AVE4_Y, width: 350, height: 40, isGround: true },
        { x: 4090, y: AVE4_Y, width: LEVEL_WIDTH - 4090, height: 40, isGround: true },

        // Avenue 5 (y=200) — ПР. ОКТЯБРЯ
        { x: 0, y: AVE5_Y, width: 3840, height: 40, isGround: true },
        { x: 4090, y: AVE5_Y, width: LEVEL_WIDTH - 4090, height: 40, isGround: true },

        // Street 1 — УЛ. МИРА: Ave1 <-> Ave2
        { x: 260, y: AVE1_Y - 60, width: 90, height: 16 },
        { x: 390, y: 1765, width: 80, height: 16, passThrough: true },
        { x: 260, y: 1690, width: 80, height: 16, passThrough: true },
        { x: 390, y: 1615, width: 80, height: 16, passThrough: true },
        { x: 260, y: 1540, width: 80, height: 16, passThrough: true },
        { x: 310, y: AVE2_Y + 16, width: 90, height: 16 },

        // Street 2 — УЛ. ПОБЕДЫ: Ave1 <-> Ave2
        { x: 860, y: AVE1_Y - 60, width: 90, height: 16 },
        { x: 990, y: 1765, width: 80, height: 16, passThrough: true },
        { x: 860, y: 1690, width: 80, height: 16, passThrough: true },
        { x: 990, y: 1615, width: 80, height: 16, passThrough: true },
        { x: 860, y: 1540, width: 80, height: 16, passThrough: true },
        { x: 910, y: AVE2_Y + 16, width: 90, height: 16 },

        // Street 3 — УЛ. ПУШКИНА: Ave2 <-> Ave3
        { x: 1460, y: AVE2_Y - 60, width: 90, height: 16 },
        { x: 1590, y: 1315, width: 80, height: 16, passThrough: true },
        { x: 1460, y: 1240, width: 80, height: 16, passThrough: true },
        { x: 1590, y: 1165, width: 80, height: 16, passThrough: true },
        { x: 1460, y: 1090, width: 80, height: 16, passThrough: true },
        { x: 1510, y: AVE3_Y + 16, width: 90, height: 16 },

        // Street 4 — УЛ. ТОЛСТОГО: Ave2 <-> Ave3
        { x: 2060, y: AVE2_Y - 60, width: 90, height: 16 },
        { x: 2190, y: 1315, width: 80, height: 16, passThrough: true },
        { x: 2060, y: 1240, width: 80, height: 16, passThrough: true },
        { x: 2190, y: 1165, width: 80, height: 16, passThrough: true },
        { x: 2060, y: 1090, width: 80, height: 16, passThrough: true },
        { x: 2110, y: AVE3_Y + 16, width: 90, height: 16 },

        // Street 5 — УЛ. ЧЕХОВА: Ave3 <-> Ave4
        { x: 2660, y: AVE3_Y - 60, width: 90, height: 16 },
        { x: 2790, y: 865, width: 80, height: 16, passThrough: true },
        { x: 2660, y: 790, width: 80, height: 16, passThrough: true },
        { x: 2790, y: 715, width: 80, height: 16, passThrough: true },
        { x: 2660, y: 640, width: 80, height: 16, passThrough: true },
        { x: 2710, y: AVE4_Y + 16, width: 90, height: 16 },

        // Street 6 — УЛ. ЛЕРМОНТОВА: Ave3 <-> Ave4
        { x: 3260, y: AVE3_Y - 60, width: 90, height: 16 },
        { x: 3390, y: 865, width: 80, height: 16, passThrough: true },
        { x: 3260, y: 790, width: 80, height: 16, passThrough: true },
        { x: 3390, y: 715, width: 80, height: 16, passThrough: true },
        { x: 3260, y: 640, width: 80, height: 16, passThrough: true },
        { x: 3310, y: AVE4_Y + 16, width: 90, height: 16 },

        // Street 7 — УЛ. ГОРЬКОГО: Ave4 <-> Ave5
        { x: 3860, y: AVE4_Y - 60, width: 90, height: 16 },
        { x: 3990, y: 430, width: 80, height: 16, passThrough: true },
        { x: 3860, y: 370, width: 80, height: 16, passThrough: true },
        { x: 3990, y: 310, width: 80, height: 16, passThrough: true },
        { x: 3860, y: 280, width: 80, height: 16, passThrough: true },
        { x: 3910, y: AVE5_Y + 16, width: 90, height: 16 },

        // Sacred potato perch (between Ave4 and Ave5)
        { x: 3600, y: 380, width: 60, height: 16 },
      ],
      collectibles: [
        // Outdoor decoys
        { itemId: "vodka_bottle", x: 620, y: 1870 },
        { itemId: "pickle_jar", x: 1420, y: 1870 },
        { itemId: "kolbasa_ring", x: 1930, y: 1420 },
        { itemId: "sunflower_seeds", x: 2530, y: 1420 },
        { itemId: "mystery_can", x: 830, y: 970 },
      ],
      hazards: [
        { type: "marshrutka", y: AVE1_Y - 40, speed: 400, interval: 5000 },
        { type: "marshrutka", y: AVE2_Y - 40, speed: 380, interval: 5500 },
        { type: "marshrutka", y: AVE3_Y - 40, speed: 420, interval: 6000 },
      ],
      npcs: [
        { type: "babushka", x: 700, y: AVE1_Y - 44, patrolRange: 140 },
        { type: "babushka", x: 1800, y: AVE1_Y - 44, patrolRange: 120 },
        { type: "babushka", x: 1200, y: AVE2_Y - 44, patrolRange: 130 },
        { type: "babushka", x: 2800, y: AVE3_Y - 44, patrolRange: 110 },
        { type: "babushka", x: 1800, y: AVE4_Y - 44, patrolRange: 100 },
        { type: "potato", x: 3615, y: 350 },
      ],
      doors: [
        // === ЦВЕТОЧНАЯ (flower shop) entrance — Ave2, x~1260 ===
        {
          id: "flower-enter",
          x: 1260,
          y: AVE2_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "flower-shop",
          targetX: 150,
          targetY: 226,
          locked: true,
          label: "ЦВЕТОЧНАЯ",
        },
        // === ГАЗЕТНЫЙ КИОСК (kiosk) entrance — Ave3, x~2000 ===
        {
          id: "kiosk-enter",
          x: 2000,
          y: AVE3_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "kiosk",
          targetX: 150,
          targetY: 216,
          locked: true,
          label: "КИОСК",
        },
        // === ХЛЕБОЗАВОД (bread outlet) entrance — Ave4, x~1600 ===
        {
          id: "bread-enter",
          x: 1600,
          y: AVE4_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "bread-shop",
          targetX: 150,
          targetY: 226,
          locked: true,
          label: "ХЛЕБОЗАВОД",
        },
      ],
      bounds: { width: LEVEL_WIDTH, height: LEVEL_HEIGHT },
      landmarks: [
        { label: "МОЛОЧНАЯ", x: 654, y: AVE1_Y - 88 },
        { label: "РЫБНАЯ", x: 2600, y: AVE1_Y - 88 },
        { label: "ШКОЛА", x: 3500, y: AVE1_Y - 88 },
        { label: "ПЕКАРНЯ", x: 650, y: AVE2_Y - 88 },
        { label: "МЯСНАЯ", x: 1800, y: AVE2_Y - 88 },
        { label: "МАГАЗИН", x: 3500, y: AVE2_Y - 88 },
        { label: "ОВОЩНАЯ", x: 600, y: AVE3_Y - 88 },
        { label: "АПТЕКА", x: 3800, y: AVE3_Y - 88 },
        { label: "БИБЛИОТЕКА", x: 1100, y: AVE3_Y - 88 },
        { label: "ПАРК", x: 4246, y: AVE5_Y - 88 },
      ],
      streetSigns: [
        { id: "sign-mira-ave1", label: "УЛ. МИРА", avenueName: "ПР. НЕЗАВИСИМОСТИ", x: 240, y: AVE1_Y + 5 },
        { id: "sign-mira-ave2", label: "УЛ. МИРА", avenueName: "ПР. ПОБЕДИТЕЛЕЙ", x: 490, y: AVE2_Y + 5 },
        { id: "sign-pobedy-ave1", label: "УЛ. ПОБЕДЫ", avenueName: "ПР. НЕЗАВИСИМОСТИ", x: 840, y: AVE1_Y + 5 },
        { id: "sign-pobedy-ave2", label: "УЛ. ПОБЕДЫ", avenueName: "ПР. ПОБЕДИТЕЛЕЙ", x: 1090, y: AVE2_Y + 5 },
        { id: "sign-pushkina-ave2", label: "УЛ. ПУШКИНА", avenueName: "ПР. ПОБЕДИТЕЛЕЙ", x: 1440, y: AVE2_Y + 5 },
        { id: "sign-pushkina-ave3", label: "УЛ. ПУШКИНА", avenueName: "ПР. ОКТЯБРЬСКИЙ", x: 1690, y: AVE3_Y + 5 },
        { id: "sign-tolstogo-ave2", label: "УЛ. ТОЛСТОГО", avenueName: "ПР. ПОБЕДИТЕЛЕЙ", x: 2040, y: AVE2_Y + 5 },
        { id: "sign-tolstogo-ave3", label: "УЛ. ТОЛСТОГО", avenueName: "ПР. ОКТЯБРЬСКИЙ", x: 2290, y: AVE3_Y + 5 },
        { id: "sign-chehova-ave3", label: "УЛ. ЧЕХОВА", avenueName: "ПР. ОКТЯБРЬСКИЙ", x: 2640, y: AVE3_Y + 5 },
        { id: "sign-chehova-ave4", label: "УЛ. ЧЕХОВА", avenueName: "ПР. ПАРТИЗАНСКИЙ", x: 2890, y: AVE4_Y + 5 },
        { id: "sign-lermontova-ave3", label: "УЛ. ЛЕРМОНТОВА", avenueName: "ПР. ОКТЯБРЬСКИЙ", x: 3240, y: AVE3_Y + 5 },
        { id: "sign-lermontova-ave4", label: "УЛ. ЛЕРМОНТОВА", avenueName: "ПР. ПАРТИЗАНСКИЙ", x: 3490, y: AVE4_Y + 5 },
        { id: "sign-gorkogo-ave4", label: "УЛ. ГОРЬКОГО", avenueName: "ПР. ПАРТИЗАНСКИЙ", x: 3840, y: AVE4_Y + 5 },
        { id: "sign-gorkogo-ave5", label: "УЛ. ГОРЬКОГО", avenueName: "ПР. ОКТЯБРЯ", x: 4090, y: AVE5_Y + 5 },
      ],
      streetCorridors: [
        { x: 250, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 850, width: 230, topY: AVE2_Y, bottomY: AVE1_Y },
        { x: 1450, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },
        { x: 2050, width: 230, topY: AVE3_Y, bottomY: AVE2_Y },
        { x: 2650, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },
        { x: 3250, width: 230, topY: AVE4_Y, bottomY: AVE3_Y },
        { x: 3850, width: 230, topY: AVE5_Y, bottomY: AVE4_Y },
      ],
      // Apartment buildings along avenues — dense clusters with green gaps
      // Building half-widths at 6x scale: narrow=24px, wide(1s)=48px, wide(2s)=72px
      // Touching rule: next center = prev center + halfW_prev + halfW_next
      buildings: [
        // ===== AVE1 (y=1900) — ПР. НЕЗАВИСИМОСТИ =====
        // Exclusions: C1[210,520], C2[810,1120], МОЛОЧНАЯ@654±60, РЫБНАЯ@2600±60, ШКОЛА@3500±60
        // Short stretch [0,210]: single narrow
        { x: 100,  y: AVE1_Y, type: "narrow", stories: 2, variant: 0 },
        // Short stretch [520,594]: single narrow
        { x: 555,  y: AVE1_Y, type: "narrow", stories: 2, variant: 1 },
        // Short stretch [714,810]: single narrow
        { x: 762,  y: AVE1_Y, type: "narrow", stories: 3, variant: 2 },
        // [1120–2540] — 3 clusters + 2 green gaps
        // Cluster A @1200: N3, W1, N2 → 1200, +24+48=1272, +48+24=1344
        { x: 1200, y: AVE1_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 1272, y: AVE1_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 1344, y: AVE1_Y, type: "narrow", stories: 2, variant: 1 },
        // (green gap ~1368–1580)
        // Cluster B @1650: W2, N3, N2 → 1650, +72+24=1746, +24+24=1794
        { x: 1650, y: AVE1_Y, type: "wide",   stories: 2, variant: 1 },
        { x: 1746, y: AVE1_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 1794, y: AVE1_Y, type: "narrow", stories: 2, variant: 2 },
        // (green gap ~1818–2050)
        // Cluster C @2120: N2, W1, N3 → 2120, +24+48=2192, +48+24=2264
        { x: 2120, y: AVE1_Y, type: "narrow", stories: 2, variant: 0 },
        { x: 2192, y: AVE1_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 2264, y: AVE1_Y, type: "narrow", stories: 3, variant: 2 },
        // [2660–3440] — 1 cluster + gap + 1 cluster
        // Cluster D @2720: N2, W1, N2 → 2720, +24+48=2792, +48+24=2864
        { x: 2720, y: AVE1_Y, type: "narrow", stories: 2, variant: 1 },
        { x: 2792, y: AVE1_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 2864, y: AVE1_Y, type: "narrow", stories: 2, variant: 2 },
        // (green gap ~2888–3180)
        // Cluster E @3230: N3, N2 → 3230, +24+24=3278
        { x: 3230, y: AVE1_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 3278, y: AVE1_Y, type: "narrow", stories: 2, variant: 1 },
        // [3560–4600] — 2 clusters
        // Cluster F @3630: W1, N3 → 3630, +48+24=3702
        { x: 3630, y: AVE1_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 3702, y: AVE1_Y, type: "narrow", stories: 3, variant: 1 },
        // (green gap ~3726–3980)
        // Cluster G @4050: N2, W2, N2 → 4050, +24+72=4146, +72+24=4242
        { x: 4050, y: AVE1_Y, type: "narrow", stories: 2, variant: 0 },
        { x: 4146, y: AVE1_Y, type: "wide",   stories: 2, variant: 1 },
        { x: 4242, y: AVE1_Y, type: "narrow", stories: 2, variant: 2 },

        // ===== AVE2 (y=1450) — ПР. ПОБЕДИТЕЛЕЙ =====
        // Exclusions: C1-C4, flower@1260±60, ПЕКАРНЯ@650±60, МЯСНАЯ@1800±60, МАГАЗИН@3500±60
        // Short stretches
        { x: 100,  y: AVE2_Y, type: "narrow", stories: 2, variant: 2 },
        { x: 555,  y: AVE2_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 762,  y: AVE2_Y, type: "narrow", stories: 2, variant: 1 },
        // [1120,1200] tight: single narrow
        { x: 1160, y: AVE2_Y, type: "narrow", stories: 2, variant: 0 },
        // [1320,1410]: single narrow
        { x: 1365, y: AVE2_Y, type: "narrow", stories: 3, variant: 2 },
        // [2320–4600] — big open stretch, 4 clusters
        // Cluster A @2400: W2, N3, N2 → 2400, +72+24=2496, +24+24=2544
        { x: 2400, y: AVE2_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 2496, y: AVE2_Y, type: "narrow", stories: 3, variant: 1 },
        { x: 2544, y: AVE2_Y, type: "narrow", stories: 2, variant: 2 },
        // (green gap ~2568–2860)
        // Cluster B @2920: N3, W1, N2 → 2920, +24+48=2992, +48+24=3064
        { x: 2920, y: AVE2_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 2992, y: AVE2_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 3064, y: AVE2_Y, type: "narrow", stories: 2, variant: 0 },
        // (green gap ~3088–3380) — avoids МАГАЗИН@3500
        // Cluster C @3600: N2, W2, N3 → 3600, +24+72=3696, +72+24=3792
        { x: 3600, y: AVE2_Y, type: "narrow", stories: 2, variant: 1 },
        { x: 3696, y: AVE2_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 3792, y: AVE2_Y, type: "narrow", stories: 3, variant: 2 },
        // (green gap ~3816–4060)
        // Cluster D @4120: W1, N2, N3 → 4120, +48+24=4192, +24+24=4240
        { x: 4120, y: AVE2_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 4192, y: AVE2_Y, type: "narrow", stories: 2, variant: 1 },
        { x: 4240, y: AVE2_Y, type: "narrow", stories: 3, variant: 0 },

        // ===== AVE3 (y=1000) — ПР. ОКТЯБРЬСКИЙ =====
        // Exclusions: C3-C6, kiosk@2000±60, ОВОЩНАЯ@600±60, БИБЛИОТЕКА@1100±60, АПТЕКА@3800±60
        // [0,540]: cluster + gap
        // Cluster @60: N2, W1, N3 → 60, +24+48=132, +48+24=204
        { x: 60,   y: AVE3_Y, type: "narrow", stories: 2, variant: 0 },
        { x: 132,  y: AVE3_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 204,  y: AVE3_Y, type: "narrow", stories: 3, variant: 0 },
        // (green gap ~228–460)
        // Single N2 near end of stretch
        { x: 500,  y: AVE3_Y, type: "narrow", stories: 2, variant: 2 },
        // [660,1040]: cluster (avoids ОВОЩНАЯ@600±60, БИБЛИОТЕКА@1100±60)
        // Cluster @720: N3, W1, N2 → 720, +24+48=792, +48+24=864
        { x: 720,  y: AVE3_Y, type: "narrow", stories: 3, variant: 1 },
        { x: 792,  y: AVE3_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 864,  y: AVE3_Y, type: "narrow", stories: 2, variant: 2 },
        // [1160,1410]: cluster
        // @1220: N2, W1 → 1220, +24+48=1292
        { x: 1220, y: AVE3_Y, type: "narrow", stories: 2, variant: 0 },
        { x: 1292, y: AVE3_Y, type: "wide",   stories: 1, variant: 1 },
        // [2060–2610]: cluster + gap + single
        // Cluster @2140: W2, N3 → 2140, +72+24=2236
        { x: 2140, y: AVE3_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 2236, y: AVE3_Y, type: "narrow", stories: 3, variant: 1 },
        // (green gap ~2250–2500)
        // Single N2 near corridor
        { x: 2540, y: AVE3_Y, type: "narrow", stories: 2, variant: 2 },
        // [2920,3210]: cluster
        // @2980: N3, W1, N2 → 2980, +24+48=3052, +48+24=3124
        { x: 2980, y: AVE3_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 3052, y: AVE3_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 3124, y: AVE3_Y, type: "narrow", stories: 2, variant: 0 },
        // [3520,3740]: cluster (avoids АПТЕКА@3800±60)
        // @3580: N2, W1 → 3580, +24+48=3652
        { x: 3580, y: AVE3_Y, type: "narrow", stories: 2, variant: 2 },
        { x: 3652, y: AVE3_Y, type: "wide",   stories: 1, variant: 0 },
        // [3860,4600]: 2 clusters
        // @3920: N2, W1 → 3920, +24+48=3992
        { x: 3920, y: AVE3_Y, type: "narrow", stories: 2, variant: 1 },
        { x: 3992, y: AVE3_Y, type: "wide",   stories: 1, variant: 0 },
        // (green gap ~4040–4260)
        // @4320: N3, W2 → 4320, +24+72=4416
        { x: 4320, y: AVE3_Y, type: "narrow", stories: 3, variant: 2 },
        { x: 4416, y: AVE3_Y, type: "wide",   stories: 2, variant: 0 },

        // ===== AVE4 (y=550) — ПР. ПАРТИЗАНСКИЙ =====
        // Exclusions: C5-C7, bread@1600±60
        // [0–1540]: 3 clusters + 2 gaps
        // Cluster A @130: W2, N3, N2 → 130, +72+24=226, +24+24=274
        { x: 130,  y: AVE4_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 226,  y: AVE4_Y, type: "narrow", stories: 3, variant: 1 },
        { x: 274,  y: AVE4_Y, type: "narrow", stories: 2, variant: 0 },
        // (green gap ~298–560)
        // Cluster B @620: N3, W1, N2 → 620, +24+48=692, +48+24=764
        { x: 620,  y: AVE4_Y, type: "narrow", stories: 3, variant: 2 },
        { x: 692,  y: AVE4_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 764,  y: AVE4_Y, type: "narrow", stories: 2, variant: 1 },
        // (green gap ~788–1040)
        // Cluster C @1100: W1, N3, W1 → 1100, +48+24=1172, +24+48=1244
        { x: 1100, y: AVE4_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 1172, y: AVE4_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 1244, y: AVE4_Y, type: "wide",   stories: 1, variant: 0 },
        // [1660–2610]: 2 clusters + gap
        // Cluster D @1720: N2, W2, N3 → 1720, +24+72=1816, +72+24=1912
        { x: 1720, y: AVE4_Y, type: "narrow", stories: 2, variant: 2 },
        { x: 1816, y: AVE4_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 1912, y: AVE4_Y, type: "narrow", stories: 3, variant: 1 },
        // (green gap ~1936–2200)
        // Cluster E @2260: N2, W1, N2 → 2260, +24+48=2332, +48+24=2404
        { x: 2260, y: AVE4_Y, type: "narrow", stories: 2, variant: 0 },
        { x: 2332, y: AVE4_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 2404, y: AVE4_Y, type: "narrow", stories: 2, variant: 2 },
        // [3520,3810]: cluster
        // @3580: N3, W1, N2 → 3580, +24+48=3652, +48+24=3724
        { x: 3580, y: AVE4_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 3652, y: AVE4_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 3724, y: AVE4_Y, type: "narrow", stories: 2, variant: 0 },
        // [4120,4600]: cluster
        // @4180: N2, W2, N3 → 4180, +24+72=4276, +72+24=4372
        { x: 4180, y: AVE4_Y, type: "narrow", stories: 2, variant: 1 },
        { x: 4276, y: AVE4_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 4372, y: AVE4_Y, type: "narrow", stories: 3, variant: 2 },

        // ===== AVE5 (y=200) — ПР. ОКТЯБРЯ =====
        // Exclusions: C7[3810,4120], ПАРК@4246±60
        // [0–3810]: massive stretch, 7 clusters + 6 gaps
        // Cluster A @100: W2, N3, N2 → 100, +72+24=196, +24+24=244
        { x: 100,  y: AVE5_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 196,  y: AVE5_Y, type: "narrow", stories: 3, variant: 1 },
        { x: 244,  y: AVE5_Y, type: "narrow", stories: 2, variant: 2 },
        // (green gap ~268–540)
        // Cluster B @600: N3, W1, N2, N3 → 600, +24+48=672, +48+24=744, +24+24=792
        { x: 600,  y: AVE5_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 672,  y: AVE5_Y, type: "wide",   stories: 1, variant: 1 },
        { x: 744,  y: AVE5_Y, type: "narrow", stories: 2, variant: 0 },
        { x: 792,  y: AVE5_Y, type: "narrow", stories: 3, variant: 2 },
        // (green gap ~816–1080)
        // Cluster C @1140: W2, N3, N2 → 1140, +72+24=1236, +24+24=1284
        { x: 1140, y: AVE5_Y, type: "wide",   stories: 2, variant: 1 },
        { x: 1236, y: AVE5_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 1284, y: AVE5_Y, type: "narrow", stories: 2, variant: 1 },
        // (green gap ~1308–1580)
        // Cluster D @1640: N2, W1, N3, N2 → 1640, +24+48=1712, +48+24=1784, +24+24=1832
        { x: 1640, y: AVE5_Y, type: "narrow", stories: 2, variant: 2 },
        { x: 1712, y: AVE5_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 1784, y: AVE5_Y, type: "narrow", stories: 3, variant: 1 },
        { x: 1832, y: AVE5_Y, type: "narrow", stories: 2, variant: 0 },
        // (green gap ~1856–2120)
        // Cluster E @2180: W2, N3, W1 → 2180, +72+24=2276, +24+48=2348
        { x: 2180, y: AVE5_Y, type: "wide",   stories: 2, variant: 0 },
        { x: 2276, y: AVE5_Y, type: "narrow", stories: 3, variant: 2 },
        { x: 2348, y: AVE5_Y, type: "wide",   stories: 1, variant: 1 },
        // (green gap ~2396–2660)
        // Cluster F @2720: N2, W2, N3, N2 → 2720, +24+72=2816, +72+24=2912, +24+24=2960
        { x: 2720, y: AVE5_Y, type: "narrow", stories: 2, variant: 0 },
        { x: 2816, y: AVE5_Y, type: "wide",   stories: 2, variant: 1 },
        { x: 2912, y: AVE5_Y, type: "narrow", stories: 3, variant: 0 },
        { x: 2960, y: AVE5_Y, type: "narrow", stories: 2, variant: 2 },
        // (green gap ~2984–3280)
        // Cluster G @3340: W1, N3, N2 → 3340, +48+24=3412, +24+24=3460
        { x: 3340, y: AVE5_Y, type: "wide",   stories: 1, variant: 0 },
        { x: 3412, y: AVE5_Y, type: "narrow", stories: 3, variant: 1 },
        { x: 3460, y: AVE5_Y, type: "narrow", stories: 2, variant: 2 },
      ],
      // Explicit trees in green gaps between building clusters
      trees: [
        // ===== AVE1 trees =====
        // Gap 1 (~1368–1580)
        { x: 1410, y: AVE1_Y, variant: 0 },
        { x: 1460, y: AVE1_Y, variant: 2 },
        { x: 1510, y: AVE1_Y, variant: 0 },
        // Gap 2 (~1818–2050)
        { x: 1870, y: AVE1_Y, variant: 1 },
        { x: 1920, y: AVE1_Y, variant: 2 },
        { x: 1970, y: AVE1_Y, variant: 0 },
        // Gap 3 (~2888–3180)
        { x: 2940, y: AVE1_Y, variant: 0 },
        { x: 2990, y: AVE1_Y, variant: 1 },
        { x: 3050, y: AVE1_Y, variant: 2 },
        // Gap 4 (~3726–3980)
        { x: 3790, y: AVE1_Y, variant: 2 },
        { x: 3850, y: AVE1_Y, variant: 0 },

        // ===== AVE2 trees =====
        // Gap 1 (~2568–2860)
        { x: 2640, y: AVE2_Y, variant: 0 },
        { x: 2700, y: AVE2_Y, variant: 1 },
        { x: 2760, y: AVE2_Y, variant: 2 },
        // Gap 2 (~3088–3380)
        { x: 3160, y: AVE2_Y, variant: 1 },
        { x: 3220, y: AVE2_Y, variant: 0 },
        { x: 3280, y: AVE2_Y, variant: 2 },
        // Gap 3 (~3816–4060)
        { x: 3880, y: AVE2_Y, variant: 2 },
        { x: 3940, y: AVE2_Y, variant: 0 },

        // ===== AVE3 trees =====
        // Gap 1 (~228–460)
        { x: 300,  y: AVE3_Y, variant: 1 },
        { x: 360,  y: AVE3_Y, variant: 0 },
        // Gap 2 (~2250–2500)
        { x: 2330, y: AVE3_Y, variant: 0 },
        { x: 2400, y: AVE3_Y, variant: 2 },
        // Gap 3 (~4040–4260)
        { x: 4100, y: AVE3_Y, variant: 1 },
        { x: 4160, y: AVE3_Y, variant: 0 },
        { x: 4220, y: AVE3_Y, variant: 2 },

        // ===== AVE4 trees =====
        // Gap 1 (~298–560)
        { x: 360,  y: AVE4_Y, variant: 0 },
        { x: 420,  y: AVE4_Y, variant: 2 },
        { x: 480,  y: AVE4_Y, variant: 1 },
        { x: 530,  y: AVE4_Y, variant: 0 },
        // Gap 2 (~788–1040)
        { x: 850,  y: AVE4_Y, variant: 1 },
        { x: 910,  y: AVE4_Y, variant: 0 },
        { x: 970,  y: AVE4_Y, variant: 2 },
        // Gap 3 (~1936–2200)
        { x: 2000, y: AVE4_Y, variant: 0 },
        { x: 2060, y: AVE4_Y, variant: 1 },
        { x: 2120, y: AVE4_Y, variant: 2 },

        // ===== AVE5 trees =====
        // Gap 1 (~268–540)
        { x: 330,  y: AVE5_Y, variant: 0 },
        { x: 400,  y: AVE5_Y, variant: 2 },
        { x: 470,  y: AVE5_Y, variant: 1 },
        // Gap 2 (~816–1080)
        { x: 880,  y: AVE5_Y, variant: 1 },
        { x: 940,  y: AVE5_Y, variant: 0 },
        { x: 1010, y: AVE5_Y, variant: 2 },
        // Gap 3 (~1308–1580)
        { x: 1370, y: AVE5_Y, variant: 0 },
        { x: 1430, y: AVE5_Y, variant: 1 },
        { x: 1490, y: AVE5_Y, variant: 2 },
        { x: 1540, y: AVE5_Y, variant: 0 },
        // Gap 4 (~1856–2120)
        { x: 1920, y: AVE5_Y, variant: 2 },
        { x: 1980, y: AVE5_Y, variant: 0 },
        { x: 2050, y: AVE5_Y, variant: 1 },
        // Gap 5 (~2396–2660)
        { x: 2460, y: AVE5_Y, variant: 0 },
        { x: 2530, y: AVE5_Y, variant: 2 },
        { x: 2600, y: AVE5_Y, variant: 1 },
        // Gap 6 (~2984–3280)
        { x: 3060, y: AVE5_Y, variant: 1 },
        { x: 3130, y: AVE5_Y, variant: 0 },
        { x: 3200, y: AVE5_Y, variant: 2 },
      ],
    },

    // =========================================================================
    // ЦВЕТОЧНАЯ — flower shop interior
    // =========================================================================
    {
      id: "flower-shop",
      type: "interior",
      shelfType: "wood",
      platforms: [
        { x: 0, y: 270, width: 400, height: 30 },
        { x: 80, y: 190, width: 100, height: 12 },
        { x: 260, y: 150, width: 80, height: 12 },
      ],
      collectibles: [
        { itemId: "buket_flowers", x: 100, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "flower-exit",
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
        acceptsItemIds: ["buket_flowers"],
        daResponses: ["ДА! Свежие розы!", "ДА! Красивый букет!"],
        netResponses: ["НЕТ, здесь только цветы.", "НЕТ! Это цветочная!"],
        conversation: flowerShopConversation,
      },
    },

    // =========================================================================
    // ГАЗЕТНЫЙ КИОСК — kiosk interior
    // =========================================================================
    {
      id: "kiosk",
      type: "interior",
      shelfType: "metal",
      platforms: [
        { x: 0, y: 260, width: 380, height: 30 },
        { x: 100, y: 180, width: 110, height: 12 },
      ],
      collectibles: [
        { itemId: "gazeta_paper", x: 125, y: 154 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "kiosk-exit",
          x: 155,
          y: 200,
          width: 30,
          height: 60,
          targetSegmentId: "city",
          targetX: 2000,
          targetY: AVE3_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 380, height: 290 },
      shopkeeper: {
        x: 310,
        y: 198,
        acceptsItemIds: ["gazeta_paper"],
        daResponses: ["ДА. ГАЗЕТА. ЧИТАЙ.", "ДА. СВЕЖАЯ. ПОЧТИ."],
        netResponses: ["НЕТ. ТОЛЬКО ГАЗЕТЫ И ЖУРНАЛЫ.", "НЕТ. ЧТО ЭТО?"],
        conversation: kioskConversation,
      },
    },

    // =========================================================================
    // ХЛЕБОЗАВОД — bread shop interior
    // =========================================================================
    {
      id: "bread-shop",
      type: "interior",
      shelfType: "wood",
      platforms: [
        { x: 0, y: 270, width: 420, height: 30 },
        { x: 100, y: 190, width: 120, height: 12 },
        { x: 280, y: 150, width: 80, height: 12 },
      ],
      collectibles: [
        { itemId: "bulka_bun", x: 130, y: 164 },
      ],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "bread-exit",
          x: 165,
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
      bounds: { width: 420, height: 300 },
      shopkeeper: {
        x: 350,
        y: 208,
        acceptsItemIds: ["bulka_bun"],
        daResponses: ["ДА! ТЁПЛАЯ БУЛОЧКА!", "ДА! ТОЛЬКО ИЗ ПЕЧИ!"],
        netResponses: ["НЕТ. ЭТО НЕ ХЛЕБ.", "НЕТ! МЫ ПЕЧЁМ, А НЕ ПРОДАЁМ ЭТО."],
        conversation: breadShopConversation,
      },
    },
  ],
};
