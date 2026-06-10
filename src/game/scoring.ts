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
  achievementBonus: number;
  total: number;
}

export function calculateLevelScore(
  runScore: number,
  inferenceResult: InferenceResult,
  collectedPotato: boolean,
  decodeResults?: DecodeResult[],
  achievementBonus: number = 0,
): LevelScore {
  const potatoBonus = collectedPotato ? 100 : 0;

  let decodeBonus = 0;
  if (decodeResults) {
    for (const r of decodeResults) {
      decodeBonus += Math.max(0, 15 - r.wrongAttempts * 3);
    }
  }

  const total = runScore + inferenceResult.score + potatoBonus + decodeBonus + achievementBonus;

  return {
    runScore,
    inferenceScore: inferenceResult.score,
    potatoBonus,
    decodeBonus,
    achievementBonus,
    total,
  };
}
