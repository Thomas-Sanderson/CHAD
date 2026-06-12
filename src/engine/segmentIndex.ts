import type { LevelData } from "../types";
import type { LevelSegment } from "../types/content";

/**
 * Per-level segment index — segments are immutable content data, so the
 * id → segment map is built once per LevelData instead of a linear find()
 * every frame in the game loop and renderer.
 */
const segmentIndexCache = new WeakMap<LevelData, Map<string, LevelSegment>>();

export function getSegmentById(level: LevelData, id: string | null): LevelSegment | null {
  if (id === null || !level.segments?.length) return null;
  let index = segmentIndexCache.get(level);
  if (!index) {
    index = new Map(level.segments.map(seg => [seg.id, seg]));
    segmentIndexCache.set(level, index);
  }
  return index.get(id) ?? null;
}
