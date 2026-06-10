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
    id: "la-spesa",
    name: "La Spesa",
    vocabPack: level1VocabPack,
    briefing: level1Briefing,
    items: level1Items,
    revealLines: level1RevealLines,
    levelData: level1Data,
    gateFailText: "DOVE È LA SPESA?!",
    gateFailQuiet: false,
    timeOfDay: "midday",
  },
  {
    id: "coffee-emergency",
    name: "L'Emergenza Caffè",
    vocabPack: level2VocabPack,
    briefing: level2Briefing,
    items: level2Items,
    revealLines: level2RevealLines,
    levelData: level2Data,
    gateFailText: "IL MIO CAFFÈ?!",
    gateFailQuiet: false,
    timeOfDay: "dawn",
  },
  {
    id: "gli-ingredienti",
    name: "Gli Ingredienti",
    vocabPack: level3VocabPack,
    briefing: level3Briefing,
    items: level3Items,
    revealLines: level3RevealLines,
    levelData: level3Data,
    gateFailText: "QUESTA NON È CENA!",
    gateFailQuiet: false,
    timeOfDay: "afternoon",
  },
  {
    id: "le-scuse",
    name: "Le Scuse",
    vocabPack: level4VocabPack,
    briefing: level4Briefing,
    items: level4Items,
    revealLines: level4RevealLines,
    levelData: level4Data,
    gateFailText: "VAI VIA.",
    gateFailQuiet: true,
    timeOfDay: "night",
  },
  {
    id: "sabato-mattina",
    name: "Sabato Mattina",
    vocabPack: level5VocabPack,
    briefing: level5Briefing,
    items: level5Items,
    revealLines: level5RevealLines,
    levelData: level5Data,
    gateFailText: "QUESTA NON È COLAZIONE!",
    gateFailQuiet: false,
    timeOfDay: "dawn",
  },
  {
    id: "il-mercato",
    name: "Il Mercato",
    vocabPack: level6VocabPack,
    briefing: level6Briefing,
    items: level6Items,
    revealLines: level6RevealLines,
    levelData: level6Data,
    gateFailText: "NON BASTA.",
    gateFailQuiet: false,
    timeOfDay: "morning",
  },
];
