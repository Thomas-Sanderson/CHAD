import type { LevelSegment, PlatformDef } from "../types/content";
import type { SpriteData } from "./sprites";

const WALL_THICKNESS = 48;
const FACADE_SCALE = 4;
const LANDMARK_SCALE = 4;
const PLATFORM_HEIGHT = 8;

/** Find the first row in a sprite that has any non-null pixel. */
function firstVisibleRow(sprite: SpriteData): number {
  for (let r = 0; r < sprite.length; r++) {
    if (sprite[r]!.some(px => px !== null)) return r;
  }
  return 0;
}

/**
 * Generate pass-through rooftop platforms from segment geometry.
 * Buildings are visible but have no collision — these platforms
 * let the player land on rooftops when falling from above.
 */
export function generateRooftopPlatforms(
  segment: LevelSegment,
  landmarkSpriteMap: Record<string, SpriteData>,
  facadeSpriteMap: Record<string, SpriteData>,
): PlatformDef[] {
  if (segment.type !== "street") return [];

  const platforms: PlatformDef[] = [];

  // 1. Corridor wall rooftops
  if (segment.streetCorridors) {
    for (const c of segment.streetCorridors) {
      // Left wall: extends WALL_THICKNESS to the left of corridor x
      platforms.push({
        x: c.x - WALL_THICKNESS,
        y: c.topY,
        width: WALL_THICKNESS,
        height: PLATFORM_HEIGHT,
        passThrough: true,
      });
      // Right wall: starts at corridor x + width
      platforms.push({
        x: c.x + c.width,
        y: c.topY,
        width: WALL_THICKNESS,
        height: PLATFORM_HEIGHT,
        passThrough: true,
      });
    }
  }

  // 2. Shop facade rooftops
  for (const door of segment.doors) {
    if (!door.label) continue;
    const facade = facadeSpriteMap[door.label];
    if (!facade) continue;

    const facadeW = (facade[0]?.length ?? 24) * FACADE_SCALE;
    const facadeH = facade.length * FACADE_SCALE;
    const facadeX = door.x + door.width / 2 - facadeW / 2;
    const facadeTopY = door.y + door.height - facadeH;
    const roofOffset = firstVisibleRow(facade) * FACADE_SCALE;

    platforms.push({
      x: facadeX,
      y: facadeTopY + roofOffset,
      width: facadeW,
      height: PLATFORM_HEIGHT,
      passThrough: true,
    });
  }

  // 3. Landmark rooftops
  if (segment.landmarks) {
    // Find ground Y from first isGround platform, or fall back to bounds
    const groundPlatform = segment.platforms.find(p => p.isGround);
    const groundY = groundPlatform?.y ?? (segment.bounds.height - 40);

    for (const lm of segment.landmarks) {
      const sprite = landmarkSpriteMap[lm.label];
      if (!sprite) continue;

      const sprW = (sprite[0]?.length ?? 20) * LANDMARK_SCALE;
      const sprH = sprite.length * LANDMARK_SCALE;
      const spriteTopY = lm.y ?? (groundY - sprH);
      const roofOffset = firstVisibleRow(sprite) * LANDMARK_SCALE;

      platforms.push({
        x: lm.x - sprW / 2,
        y: spriteTopY + roofOffset,
        width: sprW,
        height: PLATFORM_HEIGHT,
        passThrough: true,
      });
    }
  }

  return platforms;
}
