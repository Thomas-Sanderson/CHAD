export interface VocabWord {
  id: string;
  script: string;
  translation: string;
  matchesItemId: string | null; // null for meta-words like "produkty"
  category?: "item" | "location"; // default: "item"
  pronunciation?: string; // phonetic hint, e.g. "smeh-TAH-nah"
  ipa?: string; // IPA transcription, e.g. "/smʲɪˈtanə/"
  hint?: string; // funny contextual clue for briefing screen (never the translation)
  audioSlow?: string; // path to slow audio file (future)
  audioNormal?: string; // path to normal-speed audio file (future)
}

export interface VocabPack {
  levelId: string;
  words: VocabWord[];
}

export interface Message {
  id: string;
  sender: "mentor" | "chad";
  text: string;
  vocabWordIds: string[];
  voiceAudio?: string; // path to voice line audio (future)
}

export interface BriefingScript {
  levelId: string;
  messages: Message[];
}

export interface RevealLine {
  vocabWordId: string;
  correct: string;
  wrong: string;
  revealAudio?: string; // path to reveal audio (future)
}

export interface CollectibleItem {
  id: string;
  name: string;
  revealName?: string; // fresh English name shown on reveal card (mystery cans)
  script: string; // native script name, spoken on collection
  description: string;
  isDecoy: boolean;
  color: string; // placeholder color for rectangle rendering
  pronunciation?: string; // Latin-script pronunciation for reveal
  revealSpriteId?: string; // sprite ID to show after decode (mystery cans)
  hints?: string[]; // mentor hints after repeated wrong guesses (mystery cans)
}

export interface PlatformDef {
  x: number;
  y: number;
  width: number;
  height: number;
  isGround?: boolean; // marks avenue ground platforms in tall levels
  passThrough?: boolean; // jump up through from below, land on top (street stairs)
}

export interface PlacedItem {
  itemId: string;
  x: number;
  y: number;
}

export interface PlacedHazard {
  type: "marshrutka";
  y: number;
  speed: number;
  interval: number; // ms between spawns
}

export interface PlacedNPC {
  type: "babushka" | "potato";
  x: number;
  y: number;
  patrolRange?: number;
}

export interface DoorDef {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  targetSegmentId: string;
  targetX: number;
  targetY: number;
  locked: boolean;
  label?: string;
}

export interface ShopkeeperPhrase {
  script: string;
  pronunciation?: string;
  ipa?: string;
  translation?: string;
}

export type ConvoAction = "greet" | "ask" | "price" | "bye";

export interface ConvoPhrase extends VocabWord {
  action: ConvoAction;
}

export interface ShopKeeperConversation {
  greetings: ShopkeeperPhrase[];
  greetingWarm?: ShopkeeperPhrase; // warmer response after пожалуйста
  askPrefix: string;               // "Это " — prepended to item script
  askKnown: ShopkeeperPhrase;      // "Ты знаешь." — impatient for known words
  prices: Record<string, ShopkeeperPhrase>; // itemId → price phrase
  farewells: ShopkeeperPhrase[];
  farewellEmpty: ShopkeeperPhrase; // "bought nothing?" line
  playerPhrases: ConvoPhrase[];    // phrases player can say via WASD trie picker
}

export interface ShopKeeperDef {
  x: number;
  y: number;
  acceptsItemIds: string[];
  daResponses: string[];
  netResponses: string[];
  conversation?: ShopKeeperConversation;
}

export interface StreetCorridor {
  x: number;       // corridor left inner wall face (world x)
  width: number;   // inner corridor width (between wall faces)
  topY: number;    // upper avenue ground Y (corridor opens here)
  bottomY: number; // lower avenue ground Y (corridor opens here)
}

export interface LandmarkDef {
  label: string;
  x: number;
  y?: number; // defaults to ground-level sign placement
}

export interface StreetSignDef {
  id: string;
  label: string;              // "УЛ. ПОБЕДЫ" — street name
  avenueName?: string;        // "ПР. НЕЗАВИСИМОСТИ" — avenue this intersection is on
  x: number;
  y: number;
}

export interface LevelSegment {
  id: string;
  type: "street" | "interior";
  platforms: PlatformDef[];
  collectibles: PlacedItem[];
  hazards: PlacedHazard[];
  npcs: PlacedNPC[];
  doors: DoorDef[];
  bounds: { width: number; height: number };
  shopkeeper?: ShopKeeperDef;
  shelfType?: "wood" | "metal" | "glass";
  landmarks?: LandmarkDef[];
  streetSigns?: StreetSignDef[];
  streetCorridors?: StreetCorridor[];
}

export interface LevelData {
  id: string;
  name: string;
  platforms: PlatformDef[];
  collectibles: PlacedItem[];
  hazards: PlacedHazard[];
  npcs: PlacedNPC[];
  startPosition: { x: number; y: number };
  gatePosition: { x: number; y: number };
  bounds: { width: number; height: number };
  segments?: LevelSegment[];
  landmarks?: LandmarkDef[];
  skylineY?: number; // world Y where sky ends and buildings begin (tall levels)
  deathFloorY?: number; // Y of lowest ground + margin; fall below = respawn
}

export const STREET_SIGN_PRONUNCIATION: Record<string, { pronunciation: string; ipa: string }> = {
  // Street names
  "УЛ. МИРА":       { pronunciation: "ool. MEE-rah",           ipa: "/ul. ˈmʲirə/" },
  "УЛ. ЛЕНИНА":     { pronunciation: "ool. LYEH-nee-nah",      ipa: "/ul. ˈlʲenʲɪnə/" },
  "УЛ. ПОБЕДЫ":     { pronunciation: "ool. pah-BYEH-dih",      ipa: "/ul. pɐˈbʲedɨ/" },
  "УЛ. ПУШКИНА":    { pronunciation: "ool. POOSH-kee-nah",     ipa: "/ul. ˈpuʂkʲɪnə/" },
  "УЛ. ГАГАРИНА":   { pronunciation: "ool. gah-GAH-ree-nah",   ipa: "/ul. ɡɐˈɡarʲɪnə/" },
  "УЛ. ТОЛСТОГО":   { pronunciation: "ool. tahl-STOH-vah",     ipa: "/ul. tɐlˈstovə/" },
  "УЛ. ЧЕХОВА":     { pronunciation: "ool. CHYEH-hah-vah",     ipa: "/ul. ˈtɕexəvə/" },
  "УЛ. ЛЕРМОНТОВА": { pronunciation: "ool. LYER-mahn-tah-vah", ipa: "/ul. ˈlʲerməntəvə/" },
  "УЛ. ГОРЬКОГО":   { pronunciation: "ool. GOR-kah-vah",       ipa: "/ul. ˈɡorʲkəvə/" },
  // Avenue names
  "ПР. НЕЗАВИСИМОСТИ": { pronunciation: "pr. nyeh-zah-VEE-see-mah-stee", ipa: "/pr. nʲɪzɐˈvʲisʲɪməsʲtʲɪ/" },
  "ПР. ПОБЕДИТЕЛЕЙ":   { pronunciation: "pr. pah-byeh-DEE-tyeh-lyey",    ipa: "/pr. pəbʲɪˈdʲitʲɪlʲej/" },
  "ПР. ОКТЯБРЬСКИЙ":   { pronunciation: "pr. ahk-TYAH-brskee",            ipa: "/pr. ɐkˈtʲabrʲskʲɪj/" },
  "ПР. ПАРТИЗАНСКИЙ":  { pronunciation: "pr. par-tee-ZAHN-skee",         ipa: "/pr. pərtʲɪˈzanskʲɪj/" },
  "ПР. ОКТЯБРЯ":       { pronunciation: "pr. ahk-tyah-BRYAH",            ipa: "/pr. ɐkˈtʲabrʲa/" },
};
