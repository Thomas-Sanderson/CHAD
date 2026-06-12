import type { VocabPack, BriefingScript, RevealLine, LevelData, CollectibleItem } from "./content";
import type { SpriteData } from "../engine/sprites";
import type { TimeOfDay } from "../engine/sky";

export type Season = "spring" | "summer" | "autumn" | "winter";

export interface LevelConfig {
  id: string;
  name: string;
  vocabPack: VocabPack;
  briefing: BriefingScript;
  items: CollectibleItem[];
  revealLines: RevealLine[];
  levelData: LevelData;
  gateFailText: string;
  gateFailQuiet: boolean;
  timeOfDay?: TimeOfDay;
  season?: Season;
}

export interface SkinEnvironment {
  skyColor: string;
  showStars: boolean;
  latitude?: number; // degrees N — drives sky hue/saturation shifts per skin
  flagColors: string[]; // horizontal stripes top→bottom
  groundTile: SpriteData;
  platformTile: SpriteData;
  gateSprite: SpriteData;
  gateLabel: string;
  npcSprite: SpriteData;
  vehicleSprite: SpriteData;
  sacredItemSprite: SpriteData;
  scoldings: string[];
  headBounceCurse: string; // profanity when player jumps on NPC's head
  pointPhrase: string; // what Chad says when pointing at landmark ("пожалуйста")
  shopExteriorSprite?: SpriteData;
  shopInteriorBg?: SpriteData;
  shopShelfSprite?: SpriteData;
  shopkeeperSprite?: SpriteData;
  shopkeeperBabushkaSprite?: SpriteData;
  doorFrontSprite?: SpriteData;
  doorBackSprite?: SpriteData;
  doorLockedOverlay?: SpriteData;
  exitSignSprite?: SpriteData;
  interiorWallTile?: SpriteData;
  interiorFloorTile?: SpriteData;
  interiorCeilingTile?: SpriteData;
  shelfWoodSprite?: SpriteData;
  shelfMetalSprite?: SpriteData;
  counterSprite?: SpriteData;
  shopFrontStallSprite?: SpriteData;
}

export interface SkinConfig {
  id: string;
  name: string;
  language: string;
  mentorName: string;
  mentorAvatar: string; // single character for avatar circle
  mentorColor: string; // avatar background color
  messageColor: string; // mentor message text color
  levels: LevelConfig[];
  environment: SkinEnvironment;
  winMessage: string;
  wordsLearned: { script: string; translation: string }[];
  sacredItemName: string; // "The Sacred Potato" / "The Sacred Coffee Bean"
  sacredItemLine: string; // end-screen potato/bean line
  scoldNo: string; // sharp "No!" in target language for decode screen
  deathText: string; // "УБИТ!" / "ሞተ!" — big heading on death screen
  deathQuips: string[]; // rotating mentor lines for death screen
}
