import type { SkinConfig } from "../../types/skin";
import {
  nonnaSprite,
  sacredOliveSprite,
  vespaSprite,
  cobblestoneGround,
  terracottaPlatform,
  appartamentoSprite,
} from "../../engine/sprites_italy";
import {
  interiorWallTile,
  interiorFloorTile,
  interiorCeilingTile,
  shelfWoodSprite,
  shelfMetalSprite,
  counterSprite,
  doorFrontSprite,
  doorBackSprite,
  doorLockedOverlay,
  exitSignSprite,
  shopkeeperSprite,
  shopkeeperBabushkaSprite,
} from "../../engine/sprites";
import { allLevels } from "./levels";

export const italySkin: SkinConfig = {
  id: "italy",
  name: "Italy",
  language: "Italian",

  mentorName: "Giulia",
  mentorAvatar: "G",
  mentorColor: "#C75B39",
  messageColor: "#FFB088",

  levels: allLevels,

  environment: {
    skyColor: "#5B8DB8",
    flagColors: ["#009246", "#ffffff", "#ce2b37"],
    showStars: false,
    groundTile: cobblestoneGround,
    platformTile: terracottaPlatform,
    gateSprite: appartamentoSprite,
    gateLabel: "APPARTAMENTO",
    npcSprite: nonnaSprite,
    vehicleSprite: vespaSprite,
    sacredItemSprite: sacredOliveSprite,
    scoldings: ["ATTENZIONE!", "MA CHE FAI?!", "VAI VIA!", "MALEDUCATO!", "MADONNA MIA!"],
    headBounceCurse: "CAZZO!",
    interiorWallTile,
    interiorFloorTile,
    interiorCeilingTile,
    shelfWoodSprite,
    shelfMetalSprite,
    counterSprite,
    doorFrontSprite,
    doorBackSprite,
    doorLockedOverlay,
    exitSignSprite,
    shopkeeperSprite,
    shopkeeperBabushkaSprite,
  },

  winMessage:
    "You survived Roman grocery shopping.\n\n" +
    "You know OLIO from ACETO, PANE from PASTA, and you said BUONGIORNO to a shopkeeper " +
    "and she didn't laugh... much.\n\n" +
    "Rome is not easy. But you... you might be okay here. Maybe.\n\n" +
    "— G.",

  wordsLearned: [
    { script: "PANNA", translation: "cream" },
    { script: "LATTE", translation: "milk" },
    { script: "SALAME", translation: "salami" },
    { script: "SPESA", translation: "groceries" },
    { script: "CAFFÈ", translation: "coffee" },
    { script: "ZUCCHERO", translation: "sugar" },
    { script: "BISCOTTI", translation: "cookies" },
    { script: "PASTA", translation: "pasta" },
    { script: "OLIO", translation: "olive oil" },
    { script: "POMODORO", translation: "tomato" },
    { script: "PANE", translation: "bread" },
    { script: "CIOCCOLATO", translation: "chocolate" },
    { script: "FORMAGGIO", translation: "cheese" },
    { script: "MELA", translation: "apple" },
    { script: "PIATTO", translation: "plate" },
    { script: "CUCCHIAIO", translation: "spoon" },
    { script: "TAZZA", translation: "cup" },
    { script: "COLAZIONE", translation: "breakfast" },
    { script: "PECORINO", translation: "pecorino cheese" },
    { script: "PROSCIUTTO", translation: "cured ham" },
    { script: "FOCACCIA", translation: "focaccia" },
    { script: "BASILICO", translation: "basil" },
  ],

  sacredItemName: "The Sacred Olive",
  sacredItemLine: "The Sacred Olive judges you. It always has.",
  deathText: "MORTO!",
  deathQuips: [
    "The Vespa does not stop. I told you this.",
    "He saw it coming. He walked into it.",
    "...and he was doing so well. Almost.",
    "The nonnas tried to warn him.",
    "I'm going to finish my espresso.",
  ],
};
