import { describe, it, expect } from "vitest";
import { createGameRunState, updateGameState } from "./gameLoop";
import { createInputState } from "./input";
import type { LevelData } from "../types";
import type { CollectibleItem } from "../types/content";

// Minimal segment-based level for testing
const GROUND_Y = 200;
const testLevel: LevelData = {
  id: "test",
  name: "Test",
  platforms: [],
  collectibles: [],
  hazards: [],
  npcs: [],
  startPosition: { x: 50, y: GROUND_Y - 48 },
  gatePosition: { x: 400, y: GROUND_Y - 80 },
  bounds: { width: 500, height: 250 },
  segments: [
    {
      id: "street",
      type: "street",
      platforms: [{ x: 0, y: GROUND_Y, width: 500, height: 40 }],
      collectibles: [],
      hazards: [],
      npcs: [
        { type: "babushka", x: 300, y: GROUND_Y - 44 },
        { type: "potato", x: 250, y: GROUND_Y - 60 },
      ],
      doors: [
        {
          id: "shop-door",
          x: 100,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "shop",
          targetX: 80,
          targetY: 100,
          locked: false,
          label: "ТЕСТ",
        },
        {
          id: "locked-door",
          x: 200,
          y: GROUND_Y - 60,
          width: 30,
          height: 60,
          targetSegmentId: "locked-shop",
          targetX: 80,
          targetY: 100,
          locked: true,
          label: "ЗАКРЫТО",
        },
      ],
      bounds: { width: 500, height: 250 },
    },
    {
      id: "shop",
      type: "interior",
      platforms: [{ x: 0, y: 150, width: 200, height: 30 }],
      collectibles: [{ itemId: "test_item", x: 50, y: 124 }],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "shop-exit",
          x: 80,
          y: 90,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 100,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 200, height: 180 },
      shopkeeper: {
        x: 150,
        y: 106,
        acceptsItemIds: ["test_item"],
        daResponses: ["ДА!"],
        netResponses: ["НЕТ!"],
      },
    },
    {
      id: "locked-shop",
      type: "interior",
      platforms: [{ x: 0, y: 150, width: 200, height: 30 }],
      collectibles: [{ itemId: "locked_item", x: 50, y: 124 }],
      hazards: [],
      npcs: [],
      doors: [
        {
          id: "locked-shop-exit",
          x: 80,
          y: 90,
          width: 30,
          height: 60,
          targetSegmentId: "street",
          targetX: 200,
          targetY: GROUND_Y - 48,
          locked: false,
          label: "ВЫХОД",
        },
      ],
      bounds: { width: 200, height: 180 },
      shopkeeper: {
        x: 150,
        y: 106,
        acceptsItemIds: ["locked_item"],
        daResponses: ["ДА!"],
        netResponses: ["НЕТ!"],
      },
    },
  ],
};

const emptyItemDefs = new Map<string, CollectibleItem>();

describe("Segment-based game loop", () => {
  it("initializes with first segment as current", () => {
    const state = createGameRunState(testLevel);
    expect(state.currentSegmentId).toBe("street");
  });

  it("initializes segment collectibles for all segments", () => {
    const state = createGameRunState(testLevel);
    expect(state.segmentCollectibles["shop"]).toHaveLength(1);
    expect(state.segmentCollectibles["street"]).toHaveLength(0);
    expect(state.segmentCollectibles["locked-shop"]).toHaveLength(1);
  });

  it("sets nearDoor when player overlaps a door", () => {
    const state = createGameRunState(testLevel);
    state.player.position = { x: 105, y: GROUND_Y - 48 };
    state.player.onGround = true;
    const input = createInputState();
    updateGameState(state, input, testLevel, [], emptyItemDefs, 0.016);
    expect(state.nearDoor).toBe("shop-door");
  });

  it("starts transition on interact with unlocked door", () => {
    const state = createGameRunState(testLevel);
    state.player.position = { x: 105, y: GROUND_Y - 48 };
    state.player.onGround = true;
    const input = createInputState();
    input.interact = true;
    // First update to set nearDoor
    updateGameState(state, input, testLevel, [], emptyItemDefs, 0.016);
    // Need to interact again since first update consumed interact for setting nearDoor
    input.interact = true;
    updateGameState(state, input, testLevel, [], emptyItemDefs, 0.016);
    expect(state.transition).not.toBeNull();
    expect(state.transition?.targetSegmentId).toBe("shop");
  });

  it("completes transition to new segment after fade", () => {
    const state = createGameRunState(testLevel);
    state.player.position = { x: 105, y: GROUND_Y - 48 };
    state.player.onGround = true;

    // Start transition manually
    state.transition = {
      phase: "fadeOut",
      timer: 150,
      targetSegmentId: "shop",
      targetX: 80,
      targetY: 100,
    };

    // Advance past fade-out
    updateGameState(state, createInputState(), testLevel, [], emptyItemDefs, 0.2);
    expect(state.currentSegmentId).toBe("shop");
    expect(state.transition?.phase).toBe("fadeIn");

    // Advance past fade-in
    updateGameState(state, createInputState(), testLevel, [], emptyItemDefs, 0.2);
    expect(state.transition).toBeNull();
    expect(state.currentSegmentId).toBe("shop");
  });

  it("opens shout menu on interact with locked door", () => {
    const state = createGameRunState(testLevel);
    state.player.position = { x: 205, y: GROUND_Y - 48 };
    state.player.onGround = true;
    const input = createInputState();
    // Set nearDoor first
    updateGameState(state, input, testLevel, [], emptyItemDefs, 0.016);
    expect(state.nearDoor).toBe("locked-door");

    input.interact = true;
    updateGameState(state, input, testLevel, [], emptyItemDefs, 0.016);
    expect(state.shoutMenuOpen).toBe(true);
    expect(state.shoutTarget).toBe("locked-door");
    expect(state.transition).toBeNull(); // No transition — door is locked
  });

  it("unlocked door allows transition after unlock", () => {
    const state = createGameRunState(testLevel);
    state.unlockedDoors.push("locked-door"); // Simulate successful shout
    state.player.position = { x: 205, y: GROUND_Y - 48 };
    state.player.onGround = true;
    const input = createInputState();
    // Set nearDoor
    updateGameState(state, input, testLevel, [], emptyItemDefs, 0.016);
    expect(state.nearDoor).toBe("locked-door");

    input.interact = true;
    updateGameState(state, input, testLevel, [], emptyItemDefs, 0.016);
    expect(state.transition).not.toBeNull();
    expect(state.transition?.targetSegmentId).toBe("locked-shop");
  });

  it("collects items inside shop segments", () => {
    const state = createGameRunState(testLevel);
    // Teleport to shop segment
    state.currentSegmentId = "shop";
    state.player.position = { x: 50, y: 124 };
    state.player.onGround = true;

    expect(state.segmentCollectibles["shop"]).toHaveLength(1);
    updateGameState(state, createInputState(), testLevel, [], emptyItemDefs, 0.016);
    expect(state.segmentCollectibles["shop"]).toHaveLength(0);
    expect(state.collectedItems).toContain("test_item");
  });

  it("babushkas only process in their segment", () => {
    const state = createGameRunState(testLevel);
    // Babushka is in street segment
    expect(state.babushkas[0]!.segmentId).toBe("street");

    // Give the player a safe position so the game loop doesn't just respawn
    state.player.position = { x: 50, y: GROUND_Y - 48 };
    state.player.lastSafePosition = { ...state.player.position };

    const initialX = state.babushkas[0]!.x;

    // In street segment — babushka should move (multiple frames)
    for (let i = 0; i < 10; i++) {
      updateGameState(state, createInputState(), testLevel, [], emptyItemDefs, 0.016);
    }
    expect(state.babushkas[0]!.x).not.toBe(initialX);

    // Switch to shop segment — babushka should NOT move
    const babX = state.babushkas[0]!.x;
    state.currentSegmentId = "shop";
    state.player.position = { x: 80, y: 130 };
    state.player.lastSafePosition = { ...state.player.position };
    for (let i = 0; i < 10; i++) {
      updateGameState(state, createInputState(), testLevel, [], emptyItemDefs, 0.016);
    }
    expect(state.babushkas[0]!.x).toBe(babX);
  });
});
