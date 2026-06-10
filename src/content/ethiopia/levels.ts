import type { LevelConfig } from "../../types/skin";
import { level1VocabPack, level2VocabPack, level3VocabPack, level4VocabPack } from "./vocabPack";
import { level1Briefing, level2Briefing, level3Briefing, level4Briefing } from "./briefing";
import { level1Items, level2Items, level3Items, level4Items } from "./items";
import { level1RevealLines, level2RevealLines, level3RevealLines, level4RevealLines } from "./revealLines";
import { level1Data } from "./level1";
import { level2Data } from "./level2";
import { level3Data } from "./level3";
import { level4Data } from "./level4";

export const allLevels: LevelConfig[] = [
  {
    id: "coffee-run",
    name: "The Coffee Run",
    vocabPack: level1VocabPack,
    briefing: level1Briefing,
    items: level1Items,
    revealLines: level1RevealLines,
    levelData: level1Data,
    gateFailText: "ቡናዬ የት ነው?!",
    gateFailQuiet: false,
    timeOfDay: "morning",
  },
  {
    id: "market-day",
    name: "Market Day",
    vocabPack: level2VocabPack,
    briefing: level2Briefing,
    items: level2Items,
    revealLines: level2RevealLines,
    levelData: level2Data,
    gateFailText: "ምን ይዘህ መጣህ?!",
    gateFailQuiet: false,
    timeOfDay: "midday",
  },
  {
    id: "the-dinner",
    name: "The Dinner",
    vocabPack: level3VocabPack,
    briefing: level3Briefing,
    items: level3Items,
    revealLines: level3RevealLines,
    levelData: level3Data,
    gateFailText: "እራት የለም።",
    gateFailQuiet: true,
    timeOfDay: "evening",
  },
  {
    id: "buna-ceremony",
    name: "The Buna Ceremony",
    vocabPack: level4VocabPack,
    briefing: level4Briefing,
    items: level4Items,
    revealLines: level4RevealLines,
    levelData: level4Data,
    gateFailText: "ይሂዱ።",
    gateFailQuiet: true,
    timeOfDay: "afternoon",
  },
];
