import { describe, it, expect } from "vitest";
import { buildShoutWords } from "./shoutWords";
import { belarusSkin } from "../content/belarus";

describe("buildShoutWords", () => {
  it("includes current level vocab even with no learned words", () => {
    // Player on L6 with zero learned history
    const words = buildShoutWords(belarusSkin, [], 5);
    const ids = words.map(w => w.id);
    // L6 vocab: syr_market, ryba_market, slivki, grib
    expect(ids).toContain("syr_market");
    expect(ids).toContain("ryba_market");
    expect(ids).toContain("slivki");
    expect(ids).toContain("grib");
  });

  it("ГРИБ is available for L6 locked door shout", () => {
    // Simulate: player completed L1+L2, now on L6
    const learnedFromL1L2 = ["smetana", "kefir", "kolbasa", "chai", "moloko", "sakhar"];
    const words = buildShoutWords(belarusSkin, learnedFromL1L2, 5);
    const grib = words.find(w => w.id === "grib");
    expect(grib).toBeDefined();
    expect(grib!.cyrillic).toBe("ГРИБ");
    expect(grib!.matchesItemId).toBe("grib_basket");
  });

  it("includes learned words from prior levels", () => {
    const learnedFromL1 = ["smetana", "kefir", "kolbasa"];
    const words = buildShoutWords(belarusSkin, learnedFromL1, 1); // on L2
    const ids = words.map(w => w.id);
    // L1 learned words (with matchesItemId)
    expect(ids).toContain("smetana");
    expect(ids).toContain("kefir");
    expect(ids).toContain("kolbasa");
    // L2 current level words
    expect(ids).toContain("chai");
    expect(ids).toContain("moloko");
    expect(ids).toContain("sakhar");
  });

  it("excludes meta-words with null matchesItemId", () => {
    // L1 has "produkty" with matchesItemId: null
    const words = buildShoutWords(belarusSkin, ["produkty"], 0);
    const ids = words.map(w => w.id);
    expect(ids).not.toContain("produkty");
  });

  it("deduplicates words already in learned set", () => {
    // If L1 words are learned AND player is on L1, no duplicates
    const learnedFromL1 = ["smetana", "kefir", "kolbasa"];
    const words = buildShoutWords(belarusSkin, learnedFromL1, 0);
    const smetanaCount = words.filter(w => w.id === "smetana").length;
    expect(smetanaCount).toBe(1);
  });
});
