import type { PlayerState, AABB, PlatformDef } from "../types";

export const GRAVITY = 1200;
export const JUMP_VELOCITY = -480;
export const MOVE_SPEED = 280;
export const FRICTION = 0.85;
export const PLAYER_WIDTH = 32;
export const PLAYER_HEIGHT = 48;
export const JUMP_CUT_VELOCITY = -200;
export const COYOTE_MS = 100;

export function applyGravity(player: PlayerState, dt: number): void {
  if (!player.onGround) {
    player.velocity.y += GRAVITY * dt;
  }
}

export function applyMovement(player: PlayerState, dirX: number, dt: number): void {
  if (dirX !== 0) {
    player.velocity.x = dirX * MOVE_SPEED;
    player.facing = dirX > 0 ? "right" : "left";
  } else {
    player.velocity.x *= FRICTION;
    if (Math.abs(player.velocity.x) < 5) player.velocity.x = 0;
  }

  player.position.x += player.velocity.x * dt;
  player.position.y += player.velocity.y * dt;
}

export function tryJump(player: PlayerState, elapsed?: number): void {
  const canJump = player.onGround ||
    (elapsed !== undefined && (elapsed - player.lastGroundedTime) < COYOTE_MS);
  if (canJump) {
    player.velocity.y = JUMP_VELOCITY;
    player.onGround = false;
    player.lastGroundedTime = -Infinity; // consume coyote window
  }
}

export function cutJump(player: PlayerState, jumpHeld: boolean): void {
  if (!jumpHeld && player.velocity.y < JUMP_CUT_VELOCITY) {
    player.velocity.y = JUMP_CUT_VELOCITY;
  }
}

export function aabbOverlap(a: AABB, b: AABB): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function playerAABB(player: PlayerState): AABB {
  return {
    x: player.position.x,
    y: player.position.y,
    width: player.width,
    height: player.height,
  };
}

export function resolvePlatformCollisions(
  player: PlayerState,
  platforms: PlatformDef[]
): void {
  const pBox = playerAABB(player);

  for (const plat of platforms) {
    if (!aabbOverlap(pBox, plat)) continue;

    // Pass-through: only land on top when falling
    if (plat.passThrough) {
      const overlapTop = pBox.y + pBox.height - plat.y;
      if (player.velocity.y >= 0 && overlapTop > 0 && overlapTop < 16) {
        player.position.y = plat.y - player.height;
        player.velocity.y = 0;
        player.onGround = true;
        player.lastSafePosition = { ...player.position };
      }
      pBox.x = player.position.x;
      pBox.y = player.position.y;
      continue;
    }

    const overlapLeft = pBox.x + pBox.width - plat.x;
    const overlapRight = plat.x + plat.width - pBox.x;
    const overlapTop = pBox.y + pBox.height - plat.y;
    const overlapBottom = plat.y + plat.height - pBox.y;

    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    if (minOverlap === overlapTop && player.velocity.y >= 0) {
      // Landing on top
      player.position.y = plat.y - player.height;
      player.velocity.y = 0;
      player.onGround = true;
      player.lastSafePosition = { ...player.position };
    } else if (minOverlap === overlapBottom && player.velocity.y < 0) {
      // Hitting head on bottom
      player.position.y = plat.y + plat.height;
      player.velocity.y = 0;
    } else if (minOverlap === overlapLeft) {
      player.position.x = plat.x - player.width;
      player.velocity.x = 0;
    } else if (minOverlap === overlapRight) {
      player.position.x = plat.x + plat.width;
      player.velocity.x = 0;
    }

    // Update bounding box after resolution
    pBox.x = player.position.x;
    pBox.y = player.position.y;
  }
}
