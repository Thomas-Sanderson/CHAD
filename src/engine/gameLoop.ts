import type {
  GameRunState,
  InputState,
  LevelData,
  PlacedHazard,
  CollectedInfo,
} from "../types";
import type { CollectibleItem, LevelSegment, PlatformDef, LandmarkDef } from "../types/content";
import { speakText } from "./audio";
import {
  applyGravity,
  applyMovement,
  tryJump,
  resolvePlatformCollisions,
  aabbOverlap,
  playerAABB,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
} from "./physics";
import { CANVAS_WIDTH } from "./renderer";

const MARSHRUTKA_WIDTH = 80;
const MARSHRUTKA_HEIGHT = 40;
const BABUSHKA_SHOVE = 200;
const RESPAWN_INVINCIBILITY = 1500; // ms
const SCOLDING_DURATION = 800; // ms
const TRANSITION_MS = 150; // ms per fade phase

const DEFAULT_SCOLDINGS = [
  "КУДА?!",
  "ОЙ!",
  "НЕ ЛЕЗЬ!",
  "БЕЗОБРАЗИЕ!",
  "ИДИ ОТСЮДА!",
];

export function createGameRunState(level: LevelData, scoldings?: string[]): GameRunState {
  const _scoldings = scoldings ?? DEFAULT_SCOLDINGS;
  const hasSegments = !!level.segments?.length;
  const firstSegment = hasSegments ? level.segments![0]! : null;

  // For segment levels, gather NPCs from all segments
  const babushkaSources = hasSegments
    ? level.segments!.flatMap(seg =>
        seg.npcs
          .filter(n => n.type === "babushka")
          .map(n => ({ ...n, _segmentId: seg.id }))
      )
    : level.npcs
        .filter(n => n.type === "babushka")
        .map(n => ({ ...n, _segmentId: undefined as string | undefined }));

  // Potato: find in any segment or in level NPCs
  let potatoData: { x: number; y: number; segmentId?: string } | null = null;
  if (hasSegments) {
    for (const seg of level.segments!) {
      const p = seg.npcs.find(n => n.type === "potato");
      if (p) {
        potatoData = { x: p.x, y: p.y, segmentId: seg.id };
        break;
      }
    }
  } else {
    const p = level.npcs.find(n => n.type === "potato");
    if (p) potatoData = { x: p.x, y: p.y };
  }

  // Segment collectibles
  const segmentCollectibles: Record<string, CollectedInfo[]> = {};
  if (hasSegments) {
    for (const seg of level.segments!) {
      segmentCollectibles[seg.id] = seg.collectibles.map(c => ({
        itemId: c.itemId,
        x: c.x,
        y: c.y,
      }));
    }
  }

  return {
    player: {
      position: { ...level.startPosition },
      velocity: { x: 0, y: 0 },
      onGround: false,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      lastSafePosition: { ...level.startPosition },
      facing: "right",
      invincibleUntil: 0,
      dead: false,
    },
    collectedItems: [],
    marshrutkas: [],
    babushkas: babushkaSources.map(n => ({
      x: n.x,
      y: n.y,
      originX: n.x,
      patrolRange: n.patrolRange ?? 120,
      speed: 60,
      direction: 1 as const,
      width: 28,
      height: 44,
      scoldingText: null,
      scoldingUntil: 0,
      segmentId: n._segmentId,
    })),
    potato: potatoData
      ? { x: potatoData.x, y: potatoData.y, width: 28, height: 28, collected: false, segmentId: potatoData.segmentId }
      : null,
    remainingCollectibles: hasSegments
      ? []
      : level.collectibles.map(c => ({ itemId: c.itemId, x: c.x, y: c.y })),
    camera: { x: 0 },
    score: 0,
    reachedGate: false,
    elapsed: 0,
    scoldings: _scoldings,
    // Segment state
    currentSegmentId: firstSegment?.id ?? null,
    segmentCollectibles,
    unlockedDoors: [],
    nearDoor: null,
    transition: null,
    // Shout mechanic
    shoutMenuOpen: false,
    shoutTarget: null,
    shoutResponse: null,
    // Flag animation
    flagProgress: 0,
  };
}

export function updateGameState(
  state: GameRunState,
  input: InputState,
  level: LevelData,
  hazards: PlacedHazard[],
  _itemDefs: Map<string, CollectibleItem>,
  dt: number
): void {
  state.elapsed += dt * 1000;

  if (state.player.dead) return;

  // Door transition animation
  if (state.transition) {
    state.transition.timer -= dt * 1000;
    if (state.transition.timer <= 0) {
      if (state.transition.phase === "fadeOut") {
        // Swap to new segment
        state.currentSegmentId = state.transition.targetSegmentId;
        state.player.position = { x: state.transition.targetX, y: state.transition.targetY };
        state.player.velocity = { x: 0, y: 0 };
        state.player.lastSafePosition = { ...state.player.position };
        state.marshrutkas = [];
        state.transition.phase = "fadeIn";
        state.transition.timer = TRANSITION_MS;
        // Snap camera to new segment
        const seg = level.segments?.find(s => s.id === state.currentSegmentId);
        if (seg) {
          const targetCamX = state.player.position.x - CANVAS_WIDTH / 3;
          state.camera.x = Math.max(0, Math.min(targetCamX, seg.bounds.width - CANVAS_WIDTH));
        }
      } else {
        state.transition = null;
      }
    }
    return; // Don't process anything else during transition
  }

  // Resolve active geometry from current segment or level
  let currentSegment: LevelSegment | null = null;
  let activePlatforms: PlatformDef[] = level.platforms;
  let activeCollectiblesKey: string | null = null;
  let activeHazards: PlacedHazard[] = hazards;
  let activeBounds = level.bounds;
  const isFirstSegment = state.currentSegmentId !== null &&
    level.segments?.length &&
    level.segments[0]!.id === state.currentSegmentId;

  if (level.segments?.length && state.currentSegmentId) {
    currentSegment = level.segments.find(s => s.id === state.currentSegmentId) ?? null;
    if (currentSegment) {
      activePlatforms = currentSegment.platforms;
      activeCollectiblesKey = currentSegment.id;
      activeHazards = currentSegment.hazards;
      activeBounds = currentSegment.bounds;
    }
  }

  // Input direction
  const dirX = (input.right ? 1 : 0) - (input.left ? 1 : 0);

  // Jump (consume the flag so it's one-shot)
  if (input.jump) {
    tryJump(state.player);
    input.jump = false;
  }

  // Physics
  state.player.onGround = false;
  applyGravity(state.player, dt);
  applyMovement(state.player, dirX, dt);

  // Clamp to bounds
  if (state.player.position.x < 0) {
    state.player.position.x = 0;
    state.player.velocity.x = 0;
  }
  if (state.player.position.x + state.player.width > activeBounds.width) {
    state.player.position.x = activeBounds.width - state.player.width;
    state.player.velocity.x = 0;
  }

  // Fall off bottom → respawn
  if (state.player.position.y > activeBounds.height + 100) {
    respawnPlayer(state);
    return;
  }

  // Platform collisions
  resolvePlatformCollisions(state.player, activePlatforms);

  // Collectible pickups
  const pBox = playerAABB(state.player);

  if (activeCollectiblesKey !== null) {
    // Segment-based collectibles
    const remaining = state.segmentCollectibles[activeCollectiblesKey];
    if (remaining) {
      state.segmentCollectibles[activeCollectiblesKey] = remaining.filter(item => {
        const itemBox = { x: item.x, y: item.y, width: 24, height: 24 };
        if (aabbOverlap(pBox, itemBox)) {
          state.collectedItems.push(item.itemId);
          state.score += 25;
          return false;
        }
        return true;
      });
    }
  } else {
    // Non-segment collectibles (L1-5)
    state.remainingCollectibles = state.remainingCollectibles.filter(item => {
      const itemBox = { x: item.x, y: item.y, width: 24, height: 24 };
      if (aabbOverlap(pBox, itemBox)) {
        state.collectedItems.push(item.itemId);
        state.score += 25;
        return false;
      }
      return true;
    });
  }

  // Sacred Potato (check segment match)
  if (state.potato && !state.potato.collected) {
    const inCorrectSegment = !state.potato.segmentId ||
      !currentSegment ||
      state.potato.segmentId === currentSegment.id;
    if (inCorrectSegment) {
      const potatoBox = {
        x: state.potato.x,
        y: state.potato.y,
        width: state.potato.width,
        height: state.potato.height,
      };
      if (aabbOverlap(pBox, potatoBox)) {
        state.potato.collected = true;
        state.score += 100;
      }
    }
  }

  // Babushkas (filter by segment)
  for (const b of state.babushkas) {
    if (currentSegment && b.segmentId && b.segmentId !== currentSegment.id) continue;
    if (!currentSegment && b.segmentId) continue;

    // Patrol
    b.x += b.speed * b.direction * dt;
    if (b.x > b.originX + b.patrolRange) b.direction = -1;
    if (b.x < b.originX - b.patrolRange) b.direction = 1;

    // Collision with player
    const bBox = { x: b.x, y: b.y, width: b.width, height: b.height };
    if (
      aabbOverlap(pBox, bBox) &&
      state.player.invincibleUntil < state.elapsed
    ) {
      const shoveDir = state.player.position.x > b.x ? 1 : -1;
      state.player.velocity.x = shoveDir * BABUSHKA_SHOVE;
      state.player.velocity.y = -150;
      state.player.invincibleUntil = state.elapsed + RESPAWN_INVINCIBILITY;
      b.scoldingText = state.scoldings[Math.floor(Math.random() * state.scoldings.length)] ?? "!";
      b.scoldingUntil = state.elapsed + SCOLDING_DURATION;
    }
  }

  // Marshrutka spawning (from current segment hazards or level hazards)
  for (const h of activeHazards) {
    if (h.type === "marshrutka") {
      const shouldSpawn =
        Math.floor(state.elapsed / h.interval) !==
        Math.floor((state.elapsed - dt * 1000) / h.interval);
      if (shouldSpawn) {
        state.marshrutkas.push({
          x: state.camera.x + CANVAS_WIDTH + 50,
          y: h.y,
          speed: -Math.abs(h.speed),
          width: MARSHRUTKA_WIDTH,
          height: MARSHRUTKA_HEIGHT,
        });
      }
    }
  }

  // Marshrutka movement and collision
  state.marshrutkas = state.marshrutkas.filter(m => {
    m.x += m.speed * dt;

    if (m.x + m.width < state.camera.x - 100 || m.x > state.camera.x + CANVAS_WIDTH + 200) {
      return false;
    }

    const mBox = { x: m.x, y: m.y, width: m.width, height: m.height };
    if (
      aabbOverlap(pBox, mBox) &&
      state.player.invincibleUntil < state.elapsed
    ) {
      respawnPlayer(state);
    }

    return true;
  });

  // Door proximity and interaction
  if (currentSegment?.doors.length) {
    state.nearDoor = null;
    for (const door of currentSegment.doors) {
      const doorBox = { x: door.x, y: door.y, width: door.width, height: door.height };
      if (aabbOverlap(pBox, doorBox)) {
        state.nearDoor = door.id;
        break;
      }
    }

    if (state.nearDoor) {
      const door = currentSegment.doors.find(d => d.id === state.nearDoor);
      if (door) {
        const isLocked = door.locked && !state.unlockedDoors.includes(door.id);
        if (input.shout && isLocked) {
          // P key — open shout menu for locked door
          state.shoutMenuOpen = true;
          state.shoutTarget = door.id;
          input.shout = false;
        } else if (input.interact && !isLocked) {
          // E key — enter unlocked door
          state.transition = {
            phase: "fadeOut",
            timer: TRANSITION_MS,
            targetSegmentId: door.targetSegmentId,
            targetX: door.targetX,
            targetY: door.targetY,
          };
          input.interact = false;
        }
      }
      if (input.interact) input.interact = false;
      if (input.shout) input.shout = false;
    }
  }

  // Landmark audio — E near a landmark speaks its label
  if (input.interact && currentSegment?.type !== "interior") {
    const landmarks: LandmarkDef[] = currentSegment?.landmarks ?? level.landmarks ?? [];
    for (const lm of landmarks) {
      const dist = Math.abs(state.player.position.x - lm.x);
      if (dist < 60) {
        speakText(lm.label);
        break;
      }
    }
    input.interact = false;
  }

  // Shout response decay
  if (state.shoutResponse && state.shoutResponse.until < state.elapsed) {
    state.shoutResponse = null;
  }

  // Gate check (only in first segment or non-segment levels)
  if (!currentSegment || isFirstSegment) {
    const gateBox = {
      x: level.gatePosition.x,
      y: level.gatePosition.y,
      width: 60,
      height: 80,
    };
    // Flag rises as Chad approaches (within 120px)
    const distToGate = Math.abs(state.player.position.x - level.gatePosition.x);
    if (distToGate < 120 && state.flagProgress < 1) {
      state.flagProgress = Math.min(1, state.flagProgress + dt * 1.5);
    }
    if (aabbOverlap(pBox, gateBox)) {
      state.flagProgress = 1;
      state.reachedGate = true;
    }
  }

  // Camera — lerp for consistent feel in both street and interior
  const targetCamX = Math.max(
    0,
    Math.min(
      state.player.position.x - CANVAS_WIDTH / 3,
      activeBounds.width - CANVAS_WIDTH
    )
  );
  const camLerp = 1 - Math.pow(0.001, dt); // ~0.92 at 60fps — smooth but responsive
  state.camera.x += (targetCamX - state.camera.x) * camLerp;
}

function respawnPlayer(state: GameRunState): void {
  state.player.position = { ...state.player.lastSafePosition };
  state.player.velocity = { x: 0, y: 0 };
  state.player.invincibleUntil = state.elapsed + RESPAWN_INVINCIBILITY;
  state.score = Math.max(0, state.score - 10);
}
