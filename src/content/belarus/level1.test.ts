import { describe, it, expect } from "vitest";
import { belarusSkin } from "./skin";
import { ethiopiaSkin } from "../ethiopia/skin";
import { italySkin } from "../italy/skin";
import type { SkinConfig } from "../../types/skin";
import type { LevelSegment, StreetSignDef, StreetCorridor } from "../../types/content";
import { getApartmentSprite, APARTMENT_SCALE } from "../../engine/seasonalSprites";

// --- Overlap detection helpers ---
// Replicates the renderer's sign mounting logic to compute actual visual bounds.
// Approximate monospace char width at "bold 9px monospace" — ~6px per char (generous).
const CHAR_W = 6;
const PLATE_PAD = 12; // ctx.measureText(line).width + 12 in renderer
const DOOR_FACADE_HALF_W = 48; // 24px sprite × scale 4 = 96px, half = 48
const LANDMARK_HALF_W = 48;    // 20-24px sprite × scale 4 = 80-96px, half ≤ 48

type SpanKind = "sign" | "door" | "landmark" | "building";
interface Span { label: string; left: number; right: number; aveY: number; kind: SpanKind }

/** Mirrors the renderer's corridor-binding for a sign. */
function signMount(sign: StreetSignDef, corridors: StreetCorridor[]) {
  let bestC = corridors[0]!;
  let bestDist = Infinity;
  for (const c of corridors) {
    const cx = c.x + c.width / 2;
    const dist = Math.abs(sign.x - cx);
    if (dist < bestDist) { bestDist = dist; bestC = c; }
  }
  const atTop = Math.abs(sign.y - bestC.topY) <= Math.abs(sign.y - bestC.bottomY);
  const aveY = atTop ? bestC.topY : bestC.bottomY;
  let onLeft = true;
  if (atTop) {
    let continuesUp = false;
    for (const oc of corridors) {
      if (oc === bestC) continue;
      if (oc.bottomY === bestC.topY && Math.abs((oc.x + oc.width / 2) - (bestC.x + bestC.width / 2)) < 300) {
        continuesUp = true; break;
      }
    }
    if (!continuesUp) onLeft = false;
  }
  const mountX = onLeft ? bestC.x - 2 : bestC.x + bestC.width + 2;
  return { mountX, aveY, onLeft };
}

/** Build the sign plate text lines (same logic as renderer) to measure width. */
function signPlateLines(sign: StreetSignDef, streetArrow: string, avenueArrow: string): string[] {
  const streetLine = `${streetArrow} ${sign.label}`;
  const aveLine = sign.avenueName ? `${avenueArrow} ${sign.avenueName}` : "";
  return aveLine ? [streetLine, aveLine] : [streetLine];
}

function mergedPlateLines(group: { sign: StreetSignDef; streetArrow: string; avenueArrow: string }[]): string[] {
  if (group.length === 1) return signPlateLines(group[0]!.sign, group[0]!.streetArrow, group[0]!.avenueArrow);
  const up = group.find(m => m.streetArrow === "↑");
  const down = group.find(m => m.streetArrow === "↓");
  const primary = group[0]!;
  const aveLine = primary.sign.avenueName ? `${primary.avenueArrow} ${primary.sign.avenueName}` : "";
  return [
    up ? `↑ ${up.sign.label}` : "",
    aveLine,
    down ? `↓ ${down.sign.label}` : "",
  ].filter(l => l !== "");
}

function plateWidth(lines: string[]): number {
  let w = 0;
  for (const l of lines) w = Math.max(w, l.length * CHAR_W + PLATE_PAD);
  return w;
}

function collectStreetSpans(seg: LevelSegment): Span[] {
  const spans: Span[] = [];
  const corridors = seg.streetCorridors ?? [];

  // Street signs — group merged signs (same aveY, mountX within 120px),
  // then compute actual plate bounds (extends left or right, or centered for merged)
  if (seg.streetSigns && corridors.length) {
    const mounts = seg.streetSigns.map(sign => {
      const m = signMount(sign, corridors);
      const streetArrow = (Math.abs(sign.y - corridors.reduce((best, c) => {
        const d = Math.abs(sign.x - (c.x + c.width / 2));
        return d < Math.abs(sign.x - (best.x + best.width / 2)) ? c : best;
      }, corridors[0]!).topY) <= Math.abs(sign.y - corridors.reduce((best, c) => {
        const d = Math.abs(sign.x - (c.x + c.width / 2));
        return d < Math.abs(sign.x - (best.x + best.width / 2)) ? c : best;
      }, corridors[0]!).bottomY)) ? "↓" : "↑";
      return { sign, ...m, streetArrow, avenueArrow: sign.avenueName ? "→" : "" };
    });

    const used = new Set<number>();
    for (let i = 0; i < mounts.length; i++) {
      if (used.has(i)) continue;
      const group = [mounts[i]!];
      used.add(i);
      for (let j = i + 1; j < mounts.length; j++) {
        if (used.has(j)) continue;
        if (mounts[i]!.aveY === mounts[j]!.aveY &&
            Math.abs(mounts[i]!.mountX - mounts[j]!.mountX) < 120) {
          group.push(mounts[j]!);
          used.add(j);
        }
      }
      const isMerged = group.length > 1;
      const lines = mergedPlateLines(group);
      const pw = plateWidth(lines);
      const avgMountX = Math.round(group.reduce((s, m) => s + m.mountX, 0) / group.length);
      const labels = group.map(m => m.sign.label).join(" + ");

      let left: number, right: number;
      if (isMerged) {
        // Centered on avgMountX
        left = avgMountX - pw / 2;
        right = avgMountX + pw / 2;
      } else {
        // Extends entirely to one side
        if (group[0]!.onLeft) {
          right = group[0]!.mountX;
          left = right - pw;
        } else {
          left = group[0]!.mountX;
          right = left + pw;
        }
      }
      spans.push({ label: `sign "${labels}"`, left, right, aveY: group[0]!.aveY, kind: "sign" });
    }
  }

  // Doors with labels (shop facades)
  if (seg.type === "street") {
    for (const door of seg.doors) {
      if (!door.label) continue;
      const cx = door.x + door.width / 2;
      spans.push({
        label: `door "${door.label}" (${door.id})`,
        left: cx - DOOR_FACADE_HALF_W,
        right: cx + DOOR_FACADE_HALF_W,
        aveY: door.y + door.height,
        kind: "door",
      });
    }
  }

  // Landmarks
  if (seg.landmarks) {
    for (const lm of seg.landmarks) {
      const groundY = lm.y ? lm.y + 88 : 0;
      spans.push({
        label: `landmark "${lm.label}"`,
        left: lm.x - LANDMARK_HALF_W,
        right: lm.x + LANDMARK_HALF_W,
        aveY: groundY,
        kind: "landmark",
      });
    }
  }

  // Apartment buildings
  if (seg.buildings) {
    for (const bld of seg.buildings) {
      const sprite = getApartmentSprite(bld.type, bld.stories, bld.variant);
      const halfW = ((sprite[0]?.length ?? 8) * APARTMENT_SCALE) / 2;
      spans.push({
        label: `building ${bld.type}${bld.stories ?? ""}@${bld.x}`,
        left: bld.x - halfW,
        right: bld.x + halfW,
        aveY: bld.y,
        kind: "building",
      });
    }
  }

  return spans;
}

/** Check if two spans on the same avenue overlap horizontally.
 *  Skips: building-building (clusters are intentionally touching)
 *         building-sign (buildings can exist at intersections) */
function findOverlaps(spans: Span[], aveTolerance = 200): string[] {
  const errors: string[] = [];
  for (let i = 0; i < spans.length; i++) {
    for (let j = i + 1; j < spans.length; j++) {
      const a = spans[i]!, b = spans[j]!;
      // Buildings may touch each other (clusters) and overlap with signs (intersections)
      if (a.kind === "building" && b.kind === "building") continue;
      if ((a.kind === "building" && b.kind === "sign") || (a.kind === "sign" && b.kind === "building")) continue;
      if (Math.abs(a.aveY - b.aveY) > aveTolerance) continue;
      const overlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      if (overlap > 0) {
        errors.push(`${a.label} overlaps ${b.label} by ${overlap.toFixed(0)}px (${a.left.toFixed(0)}-${a.right.toFixed(0)} vs ${b.left.toFixed(0)}-${b.right.toFixed(0)})`);
      }
    }
  }
  return errors;
}

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

        it("signs, doors, landmarks, and buildings do not overlap in street segments", () => {
          const segments = level.levelData.segments;
          if (!segments) return; // flat levels don't have segments
          for (const seg of segments) {
            if (seg.type !== "street") continue;
            const spans = collectStreetSpans(seg);
            const overlaps = findOverlaps(spans);
            expect(overlaps, `Overlaps in segment "${seg.id}":\n${overlaps.join("\n")}`).toHaveLength(0);
          }
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
