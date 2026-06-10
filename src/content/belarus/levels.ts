import type { LevelConfig } from "../../types/skin";
import { level1VocabPack, level2VocabPack, level3VocabPack, level4VocabPack, level5VocabPack, level6VocabPack } from "./vocabPack";
import { level1Briefing, level2Briefing, level3Briefing, level4Briefing, level5Briefing, level6Briefing } from "./briefing";
import { level1Items, level2Items, level3Items, level4Items, level5Items, level6Items } from "./items";
import { level1RevealLines, level2RevealLines, level3RevealLines, level4RevealLines, level5RevealLines, level6RevealLines } from "./revealLines";
import { level1Data } from "./level1";
import { level2Data } from "./level2";
import { level3Data } from "./level3";
import { level4Data } from "./level4";
import { level5Data } from "./level5";
import { level6Data } from "./level6";

export const allLevels: LevelConfig[] = [
  {
    id: "grocery-run",
    name: "The Grocery Run",
    vocabPack: level1VocabPack,
    briefing: level1Briefing,
    items: level1Items,
    revealLines: level1RevealLines,
    levelData: level1Data,
    gateFailText: "ГДЕ ПРОДУКТЫ?!",
    gateFailQuiet: false,
    timeOfDay: "midday",
  },
  {
    id: "tea-emergency",
    name: "The Tea Emergency",
    vocabPack: level2VocabPack,
    briefing: level2Briefing,
    items: level2Items,
    revealLines: level2RevealLines,
    levelData: level2Data,
    gateFailText: "ГДЕ МОЙ ЧАЙ?!",
    gateFailQuiet: false,
    timeOfDay: "morning",
  },
  {
    id: "dinner-ingredients",
    name: "Dinner Ingredients",
    vocabPack: level3VocabPack,
    briefing: level3Briefing,
    items: level3Items,
    revealLines: level3RevealLines,
    levelData: level3Data,
    gateFailText: "ЭТО НЕ УЖИН!",
    gateFailQuiet: false,
    timeOfDay: "afternoon",
  },
  {
    id: "the-apology",
    name: "The Apology",
    vocabPack: level4VocabPack,
    briefing: level4Briefing,
    items: level4Items,
    revealLines: level4RevealLines,
    levelData: level4Data,
    gateFailText: "УХОДИ.",
    gateFailQuiet: true,
    timeOfDay: "night",
  },
  {
    id: "saturday-morning",
    name: "Saturday Morning",
    vocabPack: level5VocabPack,
    briefing: level5Briefing,
    items: level5Items,
    revealLines: level5RevealLines,
    levelData: level5Data,
    gateFailText: "ЭТО НЕ ЗАВТРАК!",
    gateFailQuiet: false,
    timeOfDay: "dawn",
  },
  {
    id: "the-market",
    name: "The Market",
    vocabPack: level6VocabPack,
    briefing: level6Briefing,
    items: level6Items,
    revealLines: level6RevealLines,
    levelData: level6Data,
    gateFailText: "НЕ ХВАТАЕТ.",
    gateFailQuiet: false,
    timeOfDay: "morning",
  },
];
