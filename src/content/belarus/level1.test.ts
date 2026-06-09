import { describe, it, expect } from "vitest";
import { belarusSkin } from "./skin";
import { ethiopiaSkin } from "../ethiopia/skin";
import { italySkin } from "../italy/skin";
import type { SkinConfig } from "../../types/skin";

const allSkins: SkinConfig[] = [belarusSkin, ethiopiaSkin, italySkin];

// Validate every level of every skin
for (const skin of allSkins) {
  describe(`Skin: ${skin.name}`, () => {
    describe.each(skin.levels.map((l, i) => ({ level: l, index: i })))(
      "Level $index+1: $level.name data validation",
      ({ level }) => {
        const itemIds = new Set(level.items.map((i) => i.id));
        const placedItemIds = new Set(
          level.levelData.collectibles.map((c) => c.itemId)
        );
        const revealWordIds = new Set(
          level.revealLines.map((r) => r.vocabWordId)
        );

        it("all vocab words reference valid items", () => {
          for (const word of level.vocabPack.words) {
            if (word.matchesItemId !== null) {
              expect(
                itemIds.has(word.matchesItemId),
                `Vocab word "${word.id}" references item "${word.matchesItemId}" which doesn't exist`
              ).toBe(true);
            }
          }
        });

        it("all target items are placed in the level", () => {
          const targetItemIds = level.vocabPack.words
            .filter((w) => w.matchesItemId !== null)
            .map((w) => w.matchesItemId!);

          // Items can be in collectibles OR inside segment collectibles
          const segmentItemIds = new Set<string>();
          if (level.levelData.segments) {
            for (const seg of level.levelData.segments) {
              for (const c of seg.collectibles) {
                segmentItemIds.add(c.itemId);
              }
            }
          }

          for (const id of targetItemIds) {
            expect(
              placedItemIds.has(id) || segmentItemIds.has(id),
              `Target item "${id}" is not placed in the level or in a segment`
            ).toBe(true);
          }
        });

        it("all placed items have item definitions", () => {
          // Check level collectibles and segment collectibles
          const allCollectibles = level.levelData.segments
            ? level.levelData.segments.flatMap(s => s.collectibles)
            : level.levelData.collectibles;
          for (const placed of allCollectibles) {
            expect(
              itemIds.has(placed.itemId),
              `Placed item "${placed.itemId}" has no item definition`
            ).toBe(true);
          }
        });

        it("all vocab words with matchesItemId have reveal lines", () => {
          const targetWords = level.vocabPack.words.filter(
            (w) => w.matchesItemId !== null
          );
          for (const word of targetWords) {
            expect(
              revealWordIds.has(word.id),
              `Vocab word "${word.id}" has no reveal lines`
            ).toBe(true);
          }
        });

        it("level has a start position within bounds", () => {
          expect(level.levelData.startPosition.x).toBeGreaterThanOrEqual(0);
          expect(level.levelData.startPosition.x).toBeLessThan(
            level.levelData.bounds.width
          );
          expect(level.levelData.startPosition.y).toBeGreaterThanOrEqual(0);
          expect(level.levelData.startPosition.y).toBeLessThan(
            level.levelData.bounds.height
          );
        });

        it("level has a gate position within bounds", () => {
          expect(level.levelData.gatePosition.x).toBeGreaterThanOrEqual(0);
          expect(level.levelData.gatePosition.x).toBeLessThan(
            level.levelData.bounds.width
          );
        });

        it("has at least one patrol NPC", () => {
          // Check both level NPCs and segment NPCs
          const allNpcs = level.levelData.segments
            ? level.levelData.segments.flatMap(s => s.npcs)
            : level.levelData.npcs;
          const patrols = allNpcs.filter(n => n.type === "babushka");
          expect(patrols.length).toBeGreaterThan(0);
        });

        it("has the sacred item", () => {
          const allNpcs = level.levelData.segments
            ? level.levelData.segments.flatMap(s => s.npcs)
            : level.levelData.npcs;
          const sacred = allNpcs.find(n => n.type === "potato");
          expect(sacred).toBeDefined();
        });

        it("has decoy items", () => {
          const decoys = level.items.filter((i) => i.isDecoy);
          expect(decoys.length).toBeGreaterThanOrEqual(3);
        });

        it("has a gate fail text", () => {
          expect(level.gateFailText.length).toBeGreaterThan(0);
        });
      }
    );
  });

  describe(`Skin ${skin.name} — config`, () => {
    it("has at least 4 levels", () => {
      expect(skin.levels.length).toBeGreaterThanOrEqual(4);
    });

    it("has win message", () => {
      expect(skin.winMessage.length).toBeGreaterThan(0);
    });

    it("has words learned list", () => {
      expect(skin.wordsLearned.length).toBeGreaterThan(0);
    });

    it("has sacred item name", () => {
      expect(skin.sacredItemName.length).toBeGreaterThan(0);
    });

    it("has environment config", () => {
      expect(skin.environment.skyColor).toBeTruthy();
      expect(skin.environment.gateLabel).toBeTruthy();
      expect(skin.environment.scoldings.length).toBeGreaterThan(0);
    });
  });
}

// Level-specific checks — Belarus
describe("Belarus: Level 3 bread distinction", () => {
  it("bread_loaf and hleb_rye are both present with distinct names", () => {
    const level3 = belarusSkin.levels[2]!;
    const breadLoaf = level3.items.find((i) => i.id === "bread_loaf");
    const hlebRye = level3.items.find((i) => i.id === "hleb_rye");
    expect(breadLoaf).toBeDefined();
    expect(hlebRye).toBeDefined();
    expect(breadLoaf!.name).not.toBe(hlebRye!.name);
  });
});

describe("Belarus: Level 4 gate fail is quiet", () => {
  it("Level 4 has gateFailQuiet set to true", () => {
    expect(belarusSkin.levels[3]!.gateFailQuiet).toBe(true);
  });
});

// Level-specific checks — Ethiopia
describe("Ethiopia: gate fail escalation", () => {
  it("Level 3 gate fail is quiet (flat/final)", () => {
    expect(ethiopiaSkin.levels[2]!.gateFailQuiet).toBe(true);
  });

  it("Level 4 gate fail is quiet (formal/devastating)", () => {
    expect(ethiopiaSkin.levels[3]!.gateFailQuiet).toBe(true);
  });

  it("Levels 1-2 gate fail are not quiet", () => {
    expect(ethiopiaSkin.levels[0]!.gateFailQuiet).toBe(false);
    expect(ethiopiaSkin.levels[1]!.gateFailQuiet).toBe(false);
  });
});

describe("Ethiopia: item rotation across levels", () => {
  it("berbere_tin is decoy in L1 and target in L2", () => {
    const l1Berbere = ethiopiaSkin.levels[0]!.items.find(i => i.id === "berbere_tin");
    const l2Berbere = ethiopiaSkin.levels[1]!.items.find(i => i.id === "berbere_tin");
    expect(l1Berbere?.isDecoy).toBe(true);
    expect(l2Berbere?.isDecoy).toBe(false);
  });

  it("injera_roll is decoy in L2 and target in L3", () => {
    const l2Injera = ethiopiaSkin.levels[1]!.items.find(i => i.id === "injera_roll");
    const l3Injera = ethiopiaSkin.levels[2]!.items.find(i => i.id === "injera_roll");
    expect(l2Injera?.isDecoy).toBe(true);
    expect(l3Injera?.isDecoy).toBe(false);
  });
});

describe("Ethiopia: environment differs from Belarus", () => {
  it("sky colors differ", () => {
    expect(ethiopiaSkin.environment.skyColor).not.toBe(belarusSkin.environment.skyColor);
  });

  it("Ethiopia has no stars", () => {
    expect(ethiopiaSkin.environment.showStars).toBe(false);
    expect(belarusSkin.environment.showStars).toBe(true);
  });
});

// Segment system tests
describe("Belarus: Level 6 segment architecture", () => {
  const level6 = belarusSkin.levels[5]!;

  it("Level 6 has segments defined", () => {
    expect(level6.levelData.segments).toBeDefined();
    expect(level6.levelData.segments!.length).toBeGreaterThan(1);
  });

  it("first segment is a street", () => {
    expect(level6.levelData.segments![0]!.type).toBe("street");
  });

  it("has interior segments (shops)", () => {
    const interiors = level6.levelData.segments!.filter(s => s.type === "interior");
    expect(interiors.length).toBeGreaterThan(0);
  });

  it("segment collectibles reference valid items", () => {
    const itemIds = new Set(level6.items.map(i => i.id));
    for (const seg of level6.levelData.segments!) {
      for (const c of seg.collectibles) {
        expect(
          itemIds.has(c.itemId),
          `Segment "${seg.id}" references item "${c.itemId}" which has no definition`
        ).toBe(true);
      }
    }
  });

  it("shopkeeper acceptsItemIds reference valid items", () => {
    const itemIds = new Set(level6.items.map(i => i.id));
    for (const seg of level6.levelData.segments!) {
      if (seg.shopkeeper) {
        for (const acceptedId of seg.shopkeeper.acceptsItemIds) {
          expect(
            itemIds.has(acceptedId),
            `Segment "${seg.id}" shopkeeper accepts "${acceptedId}" which has no definition`
          ).toBe(true);
        }
      }
    }
  });

  it("door targets reference valid segments", () => {
    const segmentIds = new Set(level6.levelData.segments!.map(s => s.id));
    for (const seg of level6.levelData.segments!) {
      for (const door of seg.doors) {
        expect(
          segmentIds.has(door.targetSegmentId),
          `Door "${door.id}" targets segment "${door.targetSegmentId}" which doesn't exist`
        ).toBe(true);
      }
    }
  });

  it("at least one door is locked (requires shout)", () => {
    const lockedDoors = level6.levelData.segments!.flatMap(s => s.doors).filter(d => d.locked);
    expect(lockedDoors.length).toBeGreaterThan(0);
  });

  it("locked doors target segments with shopkeepers", () => {
    const segments = level6.levelData.segments!;
    const lockedDoors = segments.flatMap(s => s.doors).filter(d => d.locked);
    for (const door of lockedDoors) {
      const target = segments.find(s => s.id === door.targetSegmentId);
      expect(
        target?.shopkeeper,
        `Locked door "${door.id}" targets segment "${door.targetSegmentId}" which has no shopkeeper`
      ).toBeDefined();
    }
  });

  it("interior segments have exit doors back to street", () => {
    const interiors = level6.levelData.segments!.filter(s => s.type === "interior");
    for (const seg of interiors) {
      const exitDoor = seg.doors.find(d => d.targetSegmentId === "street");
      expect(
        exitDoor,
        `Interior segment "${seg.id}" has no exit door to street`
      ).toBeDefined();
    }
  });

  it("exit doors have green ВЫХОД label", () => {
    const interiors = level6.levelData.segments!.filter(s => s.type === "interior");
    for (const seg of interiors) {
      const exitDoor = seg.doors.find(d => d.targetSegmentId === "street");
      expect(exitDoor?.label).toBe("ВЫХОД");
    }
  });
});

describe("Belarus: Levels 1-5 have no segments", () => {
  for (let i = 0; i < 5; i++) {
    it(`Level ${i + 1} has no segments`, () => {
      const level = belarusSkin.levels[i]!;
      expect(level.levelData.segments ?? []).toHaveLength(0);
    });
  }
});

describe("Belarus: Level 5 is standard platformer", () => {
  const level5 = belarusSkin.levels[4]!;

  it("has no segments", () => {
    expect(level5.levelData.segments).toBeUndefined();
  });

  it("has household items as vocab", () => {
    const words = level5.vocabPack.words.filter(w => w.matchesItemId !== null);
    expect(words.length).toBeGreaterThanOrEqual(3);
  });
});
