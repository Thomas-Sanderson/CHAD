import type { PlatformDef, StreetCorridor, StreetSignDef } from "../types/content";

// Russian pluralization: pick form based on number
// 1 → one, 2-4 → few, 5-20 → many, 21 → one, 22-24 → few ...
function pluralRu(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function pluralFloor(n: number): string {
  return `${n} ${pluralRu(n, "ЭТАЖ", "ЭТАЖА", "ЭТАЖЕЙ")}`;
}

function pluralStreet(n: number): string {
  return `${n} ${pluralRu(n, "УЛИЦА", "УЛИЦЫ", "УЛИЦ")}`;
}

// Find the nearest corridor to a point (by center-x distance)
export function findNearestCorridor(
  point: { x: number },
  corridors: StreetCorridor[],
): StreetCorridor {
  let best = corridors[0]!;
  let bestDist = Infinity;
  for (const c of corridors) {
    const cx = c.x + c.width / 2;
    const dist = Math.abs(point.x - cx);
    if (dist < bestDist) {
      bestDist = dist;
      best = c;
    }
  }
  return best;
}

// Build avenue Y values and name map from segment data
export function buildAvenueData(
  platforms: PlatformDef[],
  signs: StreetSignDef[],
): { avenueYs: number[]; avenueNames: Map<number, string> } {
  // Deduplicate ground-platform Y values (these are the avenues)
  const ySet = new Set<number>();
  for (const p of platforms) {
    if (p.isGround) ySet.add(p.y);
  }
  // Sorted ascending by world Y (highest avenue = smallest Y first)
  const avenueYs = [...ySet].sort((a, b) => a - b);

  // Map avenue Y → name from signs that have avenueName
  // A sign sits on the nearest avenue; use its avenueName as the label
  const avenueNames = new Map<number, string>();
  for (const sign of signs) {
    if (!sign.avenueName) continue;
    // Find nearest avenue Y to this sign's Y
    let bestY = avenueYs[0]!;
    let bestDist = Infinity;
    for (const ay of avenueYs) {
      const dist = Math.abs(sign.y - ay);
      if (dist < bestDist) {
        bestDist = dist;
        bestY = ay;
      }
    }
    // Only set if not already set (first sign wins for each avenue)
    if (!avenueNames.has(bestY)) {
      avenueNames.set(bestY, sign.avenueName);
    }
  }

  return { avenueYs, avenueNames };
}

// Compute direction lines from a sign to a target
export function computeDirection(
  sign: { x: number; y: number },
  signCorridor: StreetCorridor,
  target: { x: number; y: number },
  corridors: StreetCorridor[],
  avenueYs: number[],
  avenueNames: Map<number, string>,
): string[] {
  // Sign's avenue Y — nearest of corridor's topY/bottomY to sign.y
  const signAvenueY = Math.abs(sign.y - signCorridor.topY) <= Math.abs(sign.y - signCorridor.bottomY)
    ? signCorridor.topY
    : signCorridor.bottomY;

  // Target's avenue Y — nearest avenue Y to target.y
  let targetAvenueY = avenueYs[0]!;
  let bestDist = Infinity;
  for (const ay of avenueYs) {
    const dist = Math.abs(target.y - ay);
    if (dist < bestDist) {
      bestDist = dist;
      targetAvenueY = ay;
    }
  }

  // Vertical count — index difference in sorted avenueYs
  // Lower world Y = higher floor, so going from higher index to lower = going up
  const signFloorIdx = avenueYs.indexOf(signAvenueY);
  const targetFloorIdx = avenueYs.indexOf(targetAvenueY);
  const verticalCount = Math.abs(signFloorIdx - targetFloorIdx);
  // Going up means target Y is smaller (higher on screen)
  const goingUp = targetAvenueY < signAvenueY;

  // Horizontal count — corridors on sign's avenue whose center X
  // is strictly between sign corridor center X and target X
  const signCorridorCX = signCorridor.x + signCorridor.width / 2;
  const targetX = target.x;
  const goingRight = targetX > signCorridorCX;

  let horizontalCount = 0;
  for (const c of corridors) {
    const cx = c.x + c.width / 2;
    // Skip the sign's own corridor
    if (Math.abs(cx - signCorridorCX) < 10) continue;
    // Check if corridor is between sign and target horizontally
    if (goingRight && cx > signCorridorCX && cx < targetX) horizontalCount++;
    if (!goingRight && cx < signCorridorCX && cx > targetX) horizontalCount++;
  }

  // Special case: same avenue, no streets between — it's right here
  if (verticalCount === 0 && horizontalCount === 0) {
    return ["ТЫ ЧТО, ГЛАЗА ОТКРОЙ!"];
  }

  const lines: string[] = [];

  // Line 1: horizontal direction with street count
  if (horizontalCount > 0 || (verticalCount === 0 && targetX !== signCorridorCX)) {
    const arrow = goingRight ? "→" : "←";
    const dir = goingRight ? "НАПРАВО" : "НАЛЕВО";
    if (horizontalCount > 0) {
      lines.push(`${arrow} ${dir}, ${pluralStreet(horizontalCount)}`);
    } else {
      lines.push(`${arrow} ${dir}`);
    }
  }

  // Line 2: vertical direction with floor count
  if (verticalCount > 0) {
    const arrow = goingUp ? "↑" : "↓";
    const dir = goingUp ? "ВВЕРХ" : "ВНИЗ";
    lines.push(`${arrow} ${dir}, ${pluralFloor(verticalCount)}`);
  }

  // Line 3: destination avenue name
  const destAveName = avenueNames.get(targetAvenueY);
  if (destAveName) {
    lines.push(destAveName);
  }

  return lines;
}
