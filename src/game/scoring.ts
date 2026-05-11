import type { InferenceResult } from "../types";

export interface LevelScore {
  runScore: number;
  inferenceScore: number;
  potatoBonus: number;
  total: number;
}

export function calculateLevelScore(
  runScore: number,
  inferenceResult: InferenceResult,
  collectedPotato: boolean
): LevelScore {
  const potatoBonus = collectedPotato ? 100 : 0;
  const total = runScore + inferenceResult.score + potatoBonus;

  return {
    runScore,
    inferenceScore: inferenceResult.score,
    potatoBonus,
    total,
  };
}
