export interface VocabWord {
  id: string;
  cyrillic: string;
  translation: string;
  matchesItemId: string | null; // null for meta-words like "produkty"
  pronunciation?: string; // phonetic hint, e.g. "smeh-TAH-nah"
  audioSlow?: string; // path to slow audio file (future)
  audioNormal?: string; // path to normal-speed audio file (future)
}

export interface VocabPack {
  levelId: string;
  words: VocabWord[];
}

export interface Message {
  id: string;
  sender: "anya" | "chad";
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
  description: string;
  isDecoy: boolean;
  color: string; // placeholder color for rectangle rendering
}

export interface PlatformDef {
  x: number;
  y: number;
  width: number;
  height: number;
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

export interface ShopKeeperDef {
  x: number;
  y: number;
  acceptsItemIds: string[];
  daResponses: string[];
  netResponses: string[];
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
  shelfType?: "wood" | "metal";
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
}
