import { describe, it, expect } from "vitest";
import { checkInference } from "./inferenceChecker";
import type { VocabPack, CollectibleItem } from "../types";

const vocabPack: VocabPack = {
  levelId: "test",
  words: [
    { id: "smetana", cyrillic: "СМЕТАНА", translation: "sour cream", matchesItemId: "smetana_tub" },
    { id: "kefir", cyrillic: "КЕФИР", translation: "kefir", matchesItemId: "kefir_bottle" },
    { id: "kolbasa", cyrillic: "КОЛБАСА", translation: "sausage", matchesItemId: "kolbasa_link" },
    { id: "produkty", cyrillic: "ПРОДУКТЫ", translation: "groceries", matchesItemId: null },
  ],
};

const itemDefs = new Map<string, CollectibleItem>([
  ["smetana_tub", { id: "smetana_tub", name: "White Tub", description: "", isDecoy: false, color: "#fff" }],
  ["kefir_bottle", { id: "kefir_bottle", name: "Tall Bottle", description: "", isDecoy: false, color: "#fff" }],
  ["kolbasa_link", { id: "kolbasa_link", name: "Sausage", description: "", isDecoy: false, color: "#fff" }],
  ["pickle_jar", { id: "pickle_jar", name: "Pickle Jar", description: "", isDecoy: true, color: "#fff" }],
  ["bread_loaf", { id: "bread_loaf", name: "Bread", description: "", isDecoy: true, color: "#fff" }],
]);

describe("checkInference", () => {
  it("passes when all target items are collected", () => {
    const result = checkInference(
      ["smetana_tub", "kefir_bottle", "kolbasa_link"],
      vocabPack,
      itemDefs
    );
    expect(result.passed).toBe(true);
    expect(result.matches).toHaveLength(3);
    expect(result.matches.every((m) => m.correct)).toBe(true);
    expect(result.score).toBeGreaterThan(0);
  });

  it("fails when some target items are missing", () => {
    const result = checkInference(
      ["smetana_tub"],
      vocabPack,
      itemDefs
    );
    expect(result.passed).toBe(false);
    expect(result.matches.filter((m) => m.correct)).toHaveLength(1);
    expect(result.matches.filter((m) => !m.correct)).toHaveLength(2);
  });

  it("fails when no target items are collected", () => {
    const result = checkInference(
      ["pickle_jar", "bread_loaf"],
      vocabPack,
      itemDefs
    );
    expect(result.passed).toBe(false);
    expect(result.matches.every((m) => !m.correct)).toBe(true);
  });

  it("ignores meta-words (produkty) in matching", () => {
    const result = checkInference(
      ["smetana_tub", "kefir_bottle", "kolbasa_link"],
      vocabPack,
      itemDefs
    );
    // produkty has no matchesItemId, so only 3 matches
    expect(result.matches).toHaveLength(3);
    expect(result.passed).toBe(true);
  });

  it("penalizes decoy collection", () => {
    const withDecoys = checkInference(
      ["smetana_tub", "kefir_bottle", "kolbasa_link", "pickle_jar", "bread_loaf"],
      vocabPack,
      itemDefs
    );
    const withoutDecoys = checkInference(
      ["smetana_tub", "kefir_bottle", "kolbasa_link"],
      vocabPack,
      itemDefs
    );
    expect(withDecoys.score).toBeLessThan(withoutDecoys.score);
  });

  it("passes with decoys collected alongside all targets", () => {
    const result = checkInference(
      ["smetana_tub", "kefir_bottle", "kolbasa_link", "pickle_jar"],
      vocabPack,
      itemDefs
    );
    expect(result.passed).toBe(true);
  });
});
