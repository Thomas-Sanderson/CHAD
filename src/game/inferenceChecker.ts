import type { VocabPack, InferenceResult } from "../types";
import type { CollectibleItem } from "../types/content";

export function checkInference(
  collectedItemIds: string[],
  vocabPack: VocabPack,
  itemDefs: Map<string, CollectibleItem>
): InferenceResult {
  const targetWords = vocabPack.words.filter((w) => w.matchesItemId !== null);

  const matches = targetWords.map((word) => {
    const targetItemId = word.matchesItemId!;
    const collected = collectedItemIds.includes(targetItemId);
    return {
      vocabWordId: word.id,
      correct: collected,
      collectedItemId: collected ? targetItemId : null,
    };
  });

  const allCorrect = matches.every((m) => m.correct);

  // Score: points for each correct match, bonus for getting all
  let score = matches.filter((m) => m.correct).length * 50;
  if (allCorrect) score += 100;

  // Penalty for collecting decoys
  const decoyCount = collectedItemIds.filter((id) => {
    const def = itemDefs.get(id);
    return def?.isDecoy;
  }).length;
  score -= decoyCount * 20;

  return {
    passed: allCorrect,
    matches,
    score: Math.max(0, score),
  };
}
