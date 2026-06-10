import type { SkinConfig } from "../../types/skin";
import {
  auntieSprite,
  blueTaxiSprite,
  coffeeBeanSprite,
  cobblestoneGround,
  woodTinPlatform,
  bunaBetSprite,
} from "../../engine/sprites_ethiopia";
import { allLevels } from "./levels";

export const ethiopiaSkin: SkinConfig = {
  id: "ethiopia",
  name: "Ethiopia",
  language: "Amharic",

  mentorName: "Tigist",
  mentorAvatar: "ት",
  mentorColor: "#8b5e3c",
  messageColor: "#ddaa44",

  levels: allLevels,

  environment: {
    skyColor: "#4a90c4",
    latitude: 9,
    flagColors: ["#33aa55", "#ffcc33", "#cc2222"],
    showStars: false,
    groundTile: cobblestoneGround,
    platformTile: woodTinPlatform,
    gateSprite: bunaBetSprite,
    gateLabel: "ቡና ቤት",
    npcSprite: auntieSprite,
    vehicleSprite: blueTaxiSprite,
    sacredItemSprite: coffeeBeanSprite,
    scoldings: ["ቀጭን ነህ!", "ተው!", "ወዴት!", "ጠንቀቅ!", "ኧረ!"],
    headBounceCurse: "ወይ ጉድ!",
    pointPhrase: "እባክህ",
  },

  winMessage:
    "You did it, Chad.\n\n" +
    "You carried a clay jebena across Addis Ababa without breaking it. " +
    "You survived Merkato. You learned the difference between berbere and karya. " +
    "You sat through all three rounds of the coffee ceremony without complaining once.\n\n" +
    "My grandmother said you have the patience of someone who has suffered. " +
    "I think she meant it as a compliment.\n\n" +
    "You learned sixteen Amharic words. You brought me coffee, bread, spices, and incense. " +
    "You brought me dinner. You brought me a ceremony.\n\n" +
    "I'm not going to say thank you. But I'll pour you a fourth round.\n\n" +
    "That means something.\n\n" +
    "— Tigist",

  wordsLearned: [
    { script: "ቡና", translation: "coffee" },
    { script: "ወተት", translation: "milk" },
    { script: "ዳቦ", translation: "bread" },
    { script: "ስኳር", translation: "sugar" },
    { script: "ሽሮ", translation: "chickpea flour" },
    { script: "በርበሬ", translation: "spice blend" },
    { script: "ቅቤ", translation: "clarified butter" },
    { script: "ቲማቲም", translation: "tomato" },
    { script: "እንጀራ", translation: "flatbread" },
    { script: "ምስር", translation: "lentils" },
    { script: "ቀይ ስር", translation: "beetroot" },
    { script: "ቃሪያ", translation: "green pepper" },
    { script: "ጀበና", translation: "coffee pot" },
    { script: "ርኩብ", translation: "small cup" },
    { script: "ዕጣን", translation: "incense" },
    { script: "ቆሎ", translation: "roasted barley snack" },
  ],

  sacredItemName: "The Sacred Coffee Bean",
  sacredItemLine: "The Sacred Coffee Bean knows. It always knew.",
  scoldNo: "አይ!",
  deathText: "ሞተ!",
  deathQuips: [
    "The taxi does not slow down. I said this.",
    "He saw it coming. I watched him see it.",
    "...and he was doing so well.",
    "The aunties tried to warn him.",
    "I'm going to finish my coffee.",
  ],
};
