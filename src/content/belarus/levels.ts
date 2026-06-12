import type { LevelConfig } from "../../types/skin";
import { level1VocabPack, level2VocabPack, level3VocabPack, level4VocabPack, level5VocabPack, level6VocabPack, level7VocabPack, level8VocabPack, level9VocabPack, level10VocabPack, level11VocabPack, level12VocabPack } from "./vocabPack";
import { level1Briefing, level2Briefing, level3Briefing, level4Briefing, level5Briefing, level6Briefing, level7Briefing, level8Briefing, level9Briefing, level10Briefing, level11Briefing, level12Briefing } from "./briefing";
import { level1Items, level2Items, level3Items, level4Items, level5Items, level6Items, level7Items, level8Items, level9Items, level10Items, level11Items, level12Items } from "./items";
import { level1RevealLines, level2RevealLines, level3RevealLines, level4RevealLines, level5RevealLines, level6RevealLines, level7RevealLines, level8RevealLines, level9RevealLines, level10RevealLines, level11RevealLines, level12RevealLines } from "./revealLines";
import { level1Data } from "./level1";
import { level2Data } from "./level2";
import { level3Data } from "./level3";
import { level4Data } from "./level4";
import { level5Data } from "./level5";
import { level6Data } from "./level6";
import { level7Data } from "./level7";
import { level8Data } from "./level8";
import { level9Data } from "./level9";
import { level10Data } from "./level10";
import { level11Data } from "./level11";
import { level12Data } from "./level12";

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
  {
    id: "up-the-street",
    name: "Up the Street",
    vocabPack: level7VocabPack,
    briefing: level7Briefing,
    items: level7Items,
    revealLines: level7RevealLines,
    levelData: level7Data,
    gateFailText: "ГДЕ МОЙ БОРЩ?!",
    gateFailQuiet: false,
    timeOfDay: "afternoon",
  },
  {
    id: "the-intersection",
    name: "The Intersection",
    vocabPack: level8VocabPack,
    briefing: level8Briefing,
    items: level8Items,
    revealLines: level8RevealLines,
    levelData: level8Data,
    gateFailText: "ОПЯТЬ?!",
    gateFailQuiet: false,
    timeOfDay: "morning",
  },
  {
    id: "the-other-side",
    name: "The Other Side",
    vocabPack: level9VocabPack,
    briefing: level9Briefing,
    items: level9Items,
    revealLines: level9RevealLines,
    levelData: level9Data,
    gateFailText: "Ты потерялся.",
    gateFailQuiet: true,
    timeOfDay: "evening",
  },
  {
    id: "the-shop-names",
    name: "The Shop Names",
    vocabPack: level10VocabPack,
    briefing: level10Briefing,
    items: level10Items,
    revealLines: level10RevealLines,
    levelData: level10Data,
    gateFailText: "ГДЕ ПОКУПКИ?!",
    gateFailQuiet: false,
    timeOfDay: "morning",
  },
  {
    id: "the-far-side",
    name: "The Far Side",
    vocabPack: level11VocabPack,
    briefing: level11Briefing,
    items: level11Items,
    revealLines: level11RevealLines,
    levelData: level11Data,
    gateFailText: "ДАЛЬШЕ.",
    gateFailQuiet: true,
    timeOfDay: "afternoon",
  },
  {
    id: "the-full-map",
    name: "The Full Map",
    vocabPack: level12VocabPack,
    briefing: level12Briefing,
    items: level12Items,
    revealLines: level12RevealLines,
    levelData: level12Data,
    gateFailText: "Ты знаешь этот ГОРОД.",
    gateFailQuiet: true,
    timeOfDay: "evening",
  },
];
