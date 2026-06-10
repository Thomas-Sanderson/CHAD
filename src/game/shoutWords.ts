import type { VocabWord } from "../types";
import type { SkinConfig } from "../types/skin";

/**
 * Build the list of words available in the shout menu.
 * Includes all previously learned words (from completed levels)
 * PLUS the current level's vocab words (learned in briefing).
 */
export function buildShoutWords(
  skin: SkinConfig,
  learnedIds: string[],
  currentLevelIndex: number
): VocabWord[] {
  const words: VocabWord[] = [];

  // Words from completed levels
  for (const level of skin.levels) {
    for (const word of level.vocabPack.words) {
      if (learnedIds.includes(word.id) && word.matchesItemId !== null && !words.some(w => w.script === word.script)) {
        words.push(word);
      }
    }
  }

  // Current level's vocab — player learned these in the briefing
  const currentLevel = skin.levels[currentLevelIndex]!;
  for (const word of currentLevel.vocabPack.words) {
    if (word.matchesItemId !== null && !words.some(w => w.script === word.script)) {
      words.push(word);
    }
  }

  return words;
}
