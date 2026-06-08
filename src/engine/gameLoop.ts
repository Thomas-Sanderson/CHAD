import type {
  GameRunState,
  InputState,
  LevelData,
  PlacedHazard,
  CollectedInfo,
} from "../types";
import type { CollectibleItem, LevelSegment, PlatformDef, LandmarkDef } from "../types/content";
import { speakText, speakScold, speakAsChad } from "./audio";
import {
  applyGravity,
  applyMovement,
  tryJump,
  resolvePlatformCollisions,
  aabbOverlap,
  playerAABB,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  GRAVITY,
} from "./physics";
import { CANVAS_WIDTH } from "./renderer";

const MARSHRUTKA_WIDTH = 80;
const MARSHRUTKA_HEIGHT = 40;
const BABUSHKA_SHOVE = 200;
const RESPAWN_INVINCIBILITY = 1500; // ms
const SCOLDING_DURATION = 800; // ms
const HEAD_BOUNCE_VY = -250;
const SUPER_BOUNCE_VY = -600;
const BABUSHKA_STUN_DURATION = 500; // ms — babushka flashes, not Chad
const ITEM_SIZE = 24;
const DROP_BOUNCE_DAMPING = 0.45;
const DROP_SETTLE_THRESHOLD = 40; // vy below this → item settles
const TRANSITION_MS = 150; // ms per fade phase
const SHOPKEEPER_RANGE = 120; // px — interaction radius
const NEAR_ITEM_RANGE = 60;   // px — "standing near" an item

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
      stunUntil: 0,
      segmentId: n._segmentId,
    })),
    potato: potatoData
      ? { x: potatoData.x, y: potatoData.y, width: 28, height: 28, collected: false, segmentId: potatoData.segmentId }
      : null,
    remainingCollectibles: hasSegments
      ? []
      : level.collectibles.map(c => ({ itemId: c.itemId, x: c.x, y: c.y })),
    droppingItems: [],
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
    // Gate
    nearGate: false,
    // Flag animation
    flagProgress: 0,
    // Hearts system
    hitCount: 0,
    // Inventory
    inventoryOpen: false,
    // Shopkeeper conversation
    nearShopkeeper: false,
    nearItem: null,
    shopConvo: null,
    shopConvoMenuOpen: false,
    shopBubble: null,
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

  // Capture jump intent before consuming (used for super-bounce on babushka heads)
  const jumpPressed = input.jump;

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
    state.hitCount++;
    respawnPlayer(state);
    return;
  }

  // Platform collisions
  resolvePlatformCollisions(state.player, activePlatforms);

  // Collectible pickups (skip while invincible — prevents re-collecting dropped items)
  const pBox = playerAABB(state.player);
  const canPickup = state.player.invincibleUntil < state.elapsed;

  if (canPickup) {
    if (activeCollectiblesKey !== null) {
      // Segment-based collectibles
      const remaining = state.segmentCollectibles[activeCollectiblesKey];
      if (remaining) {
        state.segmentCollectibles[activeCollectiblesKey] = remaining.filter(item => {
          const itemBox = { x: item.x, y: item.y, width: ITEM_SIZE, height: ITEM_SIZE };
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
        const itemBox = { x: item.x, y: item.y, width: ITEM_SIZE, height: ITEM_SIZE };
        if (aabbOverlap(pBox, itemBox)) {
          state.collectedItems.push(item.itemId);
          state.score += 25;
          return false;
        }
        return true;
      });
    }
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

    // Patrol (skip while stunned)
    if (b.stunUntil < state.elapsed) {
      b.x += b.speed * b.direction * dt;
      if (b.x > b.originX + b.patrolRange) b.direction = -1;
      if (b.x < b.originX - b.patrolRange) b.direction = 1;
    }

    // Collision with player
    const bBox = { x: b.x, y: b.y, width: b.width, height: b.height };
    if (
      aabbOverlap(pBox, bBox) &&
      state.player.invincibleUntil < state.elapsed &&
      b.stunUntil < state.elapsed
    ) {
      // Head bounce: player falling, bottom near babushka top, horizontally overlapping
      const playerBottom = state.player.position.y + state.player.height;
      const isHeadBounce =
        state.player.velocity.y > 0 &&
        playerBottom <= b.y + 8 &&
        pBox.x + pBox.width > bBox.x &&
        pBox.x < bBox.x + bBox.width;

      if (isHeadBounce) {
        // Super bounce if player pressed jump this frame, otherwise small bounce
        state.player.velocity.y = jumpPressed ? SUPER_BOUNCE_VY : HEAD_BOUNCE_VY;
        state.player.onGround = false;
        // Stun the babushka (she flashes), NOT Chad
        b.stunUntil = state.elapsed + BABUSHKA_STUN_DURATION;
        b.scoldingText = "блять";
        b.scoldingUntil = state.elapsed + SCOLDING_DURATION;
        speakScold("блять");
      } else {
        // Side collision: shove + drop item + scolding
        const shoveDir = state.player.position.x > b.x ? 1 : -1;
        state.player.velocity.x = shoveDir * BABUSHKA_SHOVE;
        state.player.velocity.y = -150;
        state.player.invincibleUntil = state.elapsed + RESPAWN_INVINCIBILITY;
        b.scoldingText = state.scoldings[Math.floor(Math.random() * state.scoldings.length)] ?? "!";
        b.scoldingUntil = state.elapsed + SCOLDING_DURATION;
        speakScold(b.scoldingText);

        // Drop last collected item — bounces out as a DroppingItem
        if (state.collectedItems.length > 0) {
          const droppedId = state.collectedItems.pop()!;
          state.droppingItems.push({
            itemId: droppedId,
            x: state.player.position.x,
            y: state.player.position.y,
            vx: -shoveDir * 120, // flies opposite to Chad's shove direction
            vy: -200,
          });
          state.score = Math.max(0, state.score - 25);
        }
      }
    }
  }

  // Dropping items — bounce physics, settle into collectibles
  state.droppingItems = state.droppingItems.filter(item => {
    item.vy += GRAVITY * dt;
    item.x += item.vx * dt;
    item.y += item.vy * dt;

    // Platform collision — bounce or settle
    for (const p of activePlatforms) {
      if (
        item.vy > 0 &&
        item.y + ITEM_SIZE >= p.y &&
        item.y + ITEM_SIZE <= p.y + p.height &&
        item.x + ITEM_SIZE > p.x &&
        item.x < p.x + p.width
      ) {
        if (Math.abs(item.vy) < DROP_SETTLE_THRESHOLD) {
          // Settle: convert to static collectible
          const info: CollectedInfo = { itemId: item.itemId, x: item.x, y: p.y - ITEM_SIZE };
          if (activeCollectiblesKey !== null) {
            const seg = state.segmentCollectibles[activeCollectiblesKey];
            if (seg) seg.push(info);
          } else {
            state.remainingCollectibles.push(info);
          }
          return false;
        }
        item.y = p.y - ITEM_SIZE;
        item.vy *= -DROP_BOUNCE_DAMPING;
        item.vx *= 0.7;
        return true;
      }
    }

    // Fell out of bounds
    if (item.y > activeBounds.height + 100) return false;

    return true;
  });

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
      state.hitCount++;
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
          // P key — say "please" then open shout menu
          speakAsChad("пожалуйста");
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

  // --- Shopkeeper conversation ---
  if (currentSegment?.type === "interior" && currentSegment.shopkeeper?.conversation) {
    const sk = currentSegment.shopkeeper;
    const dist = Math.abs(state.player.position.x - sk.x);
    state.nearShopkeeper = dist < SHOPKEEPER_RANGE;

    // Detect nearest shelf item (for "what is this?")
    const segItems = state.segmentCollectibles[currentSegment.id] ?? [];
    let closestItem: string | null = null;
    let closestDist = NEAR_ITEM_RANGE;
    for (const item of segItems) {
      const dx = Math.abs(state.player.position.x - item.x);
      const dy = Math.abs(state.player.position.y - item.y);
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < closestDist) {
        closestDist = d;
        closestItem = item.itemId;
      }
    }
    state.nearItem = closestItem;

    // Init conversation tracking per segment visit
    if (!state.shopConvo) {
      state.shopConvo = { greetIndex: 0, farewellIndex: 0, askedItems: [] };
    }

    // E key near shopkeeper → open WASD trie picker (runs AFTER door handling)
    if (state.nearShopkeeper && input.interact && !state.shopConvoMenuOpen) {
      state.shopConvoMenuOpen = true;
      input.interact = false;
    }
  } else {
    state.nearShopkeeper = false;
    state.nearItem = null;
    // Reset conversation when leaving interior
    if (state.shopConvo && !currentSegment?.shopkeeper) {
      state.shopConvo = null;
    }
  }

  // Shop bubble decay
  if (state.shopBubble && state.elapsed > state.shopBubble.until) {
    state.shopBubble = null;
  }

  // Gate check (only in first segment or non-segment levels) — before landmarks so E isn't consumed
  if (!currentSegment || isFirstSegment) {
    const gateBox = {
      x: level.gatePosition.x,
      y: level.gatePosition.y,
      width: 60,
      height: 80,
    };
    state.nearGate = aabbOverlap(pBox, gateBox);
    if (state.nearGate && input.interact) {
      state.reachedGate = true;
      input.interact = false;
    }
  } else {
    state.nearGate = false;
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

