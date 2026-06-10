import type { InferenceResult } from "../types";

export interface DecodeResult {
  itemId: string;
  script: string;
  wrongAttempts: number;
}

export interface LevelScore {
  runScore: number;
  inferenceScore: number;
  potatoBonus: number;
  decodeBonus: number;
  total: number;
}

export function calculateLevelScore(
  runScore: number,
  inferenceResult: InferenceResult,
  collectedPotato: boolean,
  decodeResults?: DecodeResult[]
): LevelScore {
  const potatoBonus = collectedPotato ? 100 : 0;

  let decodeBonus = 0;
  if (decodeResults) {
    for (const r of decodeResults) {
      decodeBonus += Math.max(0, 15 - r.wrongAttempts * 3);
    }
  }

  const total = runScore + inferenceResult.score + potatoBonus + decodeBonus;

  return {
    runScore,
    inferenceScore: inferenceResult.score,
    potatoBonus,
    decodeBonus,
    total,
  };
}
