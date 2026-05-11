import { describe, it, expect } from "vitest";
import {
  applyGravity,
  applyMovement,
  tryJump,
  aabbOverlap,
  resolvePlatformCollisions,
  GRAVITY,
  JUMP_VELOCITY,
  MOVE_SPEED,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
} from "./physics";
import type { PlayerState, AABB } from "../types";

function makePlayer(overrides: Partial<PlayerState> = {}): PlayerState {
  return {
    position: { x: 100, y: 100 },
    velocity: { x: 0, y: 0 },
    onGround: false,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    lastSafePosition: { x: 100, y: 100 },
    facing: "right",
    invincibleUntil: 0,
    dead: false,
    ...overrides,
  };
}

describe("applyGravity", () => {
  it("increases y velocity when not on ground", () => {
    const player = makePlayer();
    applyGravity(player, 1 / 60);
    expect(player.velocity.y).toBeCloseTo(GRAVITY / 60, 1);
  });

  it("does not apply gravity when on ground", () => {
    const player = makePlayer({ onGround: true });
    applyGravity(player, 1 / 60);
    expect(player.velocity.y).toBe(0);
  });
});

describe("applyMovement", () => {
  it("sets velocity when moving right", () => {
    const player = makePlayer();
    applyMovement(player, 1, 1 / 60);
    expect(player.velocity.x).toBe(MOVE_SPEED);
    expect(player.facing).toBe("right");
  });

  it("sets velocity when moving left", () => {
    const player = makePlayer();
    applyMovement(player, -1, 1 / 60);
    expect(player.velocity.x).toBe(-MOVE_SPEED);
    expect(player.facing).toBe("left");
  });

  it("applies friction when no direction", () => {
    const player = makePlayer({ velocity: { x: 100, y: 0 } });
    applyMovement(player, 0, 1 / 60);
    expect(player.velocity.x).toBeLessThan(100);
  });

  it("updates position by velocity * dt", () => {
    const player = makePlayer();
    applyMovement(player, 1, 0.5);
    // position.x = 100 + MOVE_SPEED * 0.5
    expect(player.position.x).toBeCloseTo(100 + MOVE_SPEED * 0.5, 1);
  });
});

describe("tryJump", () => {
  it("applies jump velocity when on ground", () => {
    const player = makePlayer({ onGround: true });
    tryJump(player);
    expect(player.velocity.y).toBe(JUMP_VELOCITY);
    expect(player.onGround).toBe(false);
  });

  it("does nothing when in air", () => {
    const player = makePlayer({ onGround: false });
    tryJump(player);
    expect(player.velocity.y).toBe(0);
  });
});

describe("aabbOverlap", () => {
  it("detects overlapping boxes", () => {
    const a: AABB = { x: 0, y: 0, width: 10, height: 10 };
    const b: AABB = { x: 5, y: 5, width: 10, height: 10 };
    expect(aabbOverlap(a, b)).toBe(true);
  });

  it("detects non-overlapping boxes", () => {
    const a: AABB = { x: 0, y: 0, width: 10, height: 10 };
    const b: AABB = { x: 20, y: 20, width: 10, height: 10 };
    expect(aabbOverlap(a, b)).toBe(false);
  });

  it("returns false for touching edges (not overlapping)", () => {
    const a: AABB = { x: 0, y: 0, width: 10, height: 10 };
    const b: AABB = { x: 10, y: 0, width: 10, height: 10 };
    expect(aabbOverlap(a, b)).toBe(false);
  });

  it("detects containment", () => {
    const a: AABB = { x: 0, y: 0, width: 20, height: 20 };
    const b: AABB = { x: 5, y: 5, width: 5, height: 5 };
    expect(aabbOverlap(a, b)).toBe(true);
  });
});

describe("resolvePlatformCollisions", () => {
  it("lands player on top of platform", () => {
    // Player is just barely overlapping the top of the platform (5px)
    const player = makePlayer({
      position: { x: 50, y: 100 - PLAYER_HEIGHT + 5 },
      velocity: { x: 0, y: 100 },
    });
    const platforms = [{ x: 0, y: 100, width: 200, height: 16 }];
    resolvePlatformCollisions(player, platforms);
    expect(player.position.y).toBe(100 - PLAYER_HEIGHT);
    expect(player.velocity.y).toBe(0);
    expect(player.onGround).toBe(true);
  });

  it("stops player hitting head on bottom", () => {
    const player = makePlayer({
      position: { x: 50, y: 15 }, // slightly overlapping bottom
      velocity: { x: 0, y: -100 },
      height: PLAYER_HEIGHT,
    });
    const platforms = [{ x: 0, y: 0, width: 200, height: 16 }];
    resolvePlatformCollisions(player, platforms);
    expect(player.position.y).toBe(16);
    expect(player.velocity.y).toBe(0);
  });
});
