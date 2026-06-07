import type {
  GameRunState,
  LevelData,
  SkinEnvironment,
  CollectedInfo,
} from "../types";
import type { CollectibleItem, LevelSegment, DoorDef, PlatformDef } from "../types/content";
import {
  drawSprite,
  getItemSprite,
  chadIdle,
  chadWalk1,
  chadWalk2,
  chadJump,
  shopExteriorSprite,
  shopkeeperBabushkaSprite,
  doorBackSprite,
  doorLockedOverlay,
  exitSignSprite,
  shelfWoodSprite,
  shelfMetalSprite,
  counterSprite,
  landmarkSprites,
  shopFacadeSprites,
} from "./sprites";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;
const TRANSITION_MS = 150;

export { CANVAS_WIDTH, CANVAS_HEIGHT };

// Star field — generated once, drawn every frame
const stars: { x: number; y: number; opacity: number }[] = [];
for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * 3200,
    y: Math.random() * 350,
    opacity: 0.2 + Math.random() * 0.6,
  });
}

// Chad animation constants
const WALK_FRAME_MS = 200;

function getChadFrame(state: GameRunState): typeof chadIdle {
  if (!state.player.onGround) return chadJump;
  if (Math.abs(state.player.velocity.x) > 10) {
    const frame = Math.floor(state.elapsed / WALK_FRAME_MS) % 2;
    return frame === 0 ? chadWalk1 : chadWalk2;
  }
  return chadIdle;
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  state: GameRunState,
  level: LevelData,
  itemDefs: Map<string, CollectibleItem>,
  env: SkinEnvironment
): void {
  // Resolve current segment
  let currentSegment: LevelSegment | null = null;
  if (level.segments?.length && state.currentSegmentId) {
    currentSegment = level.segments.find(s => s.id === state.currentSegmentId) ?? null;
  }

  const isInterior = currentSegment?.type === "interior";
  const activePlatforms: PlatformDef[] = currentSegment?.platforms ?? level.platforms;
  const activeCollectibles: CollectedInfo[] = currentSegment
    ? (state.segmentCollectibles[currentSegment.id] ?? [])
    : state.remainingCollectibles;
  const cam = state.camera.x;

  // --- Background ---
  if (isInterior && currentSegment) {
    const floorY = activePlatforms[0]?.y ?? CANVAS_HEIGHT - 40;

    // Wall tiles
    const wallTile = env.interiorWallTile;
    if (wallTile) {
      const tW = (wallTile[0]?.length ?? 32) * 2;
      const tH = wallTile.length * 2;
      for (let ty = 0; ty < floorY; ty += tH) {
        for (let tx = 0; tx < CANVAS_WIDTH; tx += tW) {
          drawSprite(ctx, wallTile, tx, ty, 2);
        }
      }
    } else {
      ctx.fillStyle = "#d4c4a8";
      ctx.fillRect(0, 0, CANVAS_WIDTH, floorY);
    }

    // Floor tiles
    const floorTile = env.interiorFloorTile;
    if (floorTile) {
      const tW = (floorTile[0]?.length ?? 32) * 2;
      const tH = floorTile.length * 2;
      for (let ty = floorY; ty < CANVAS_HEIGHT; ty += tH) {
        for (let tx = 0; tx < CANVAS_WIDTH; tx += tW) {
          drawSprite(ctx, floorTile, tx, ty, 2);
        }
      }
    } else {
      ctx.fillStyle = "#b8a888";
      ctx.fillRect(0, floorY, CANVAS_WIDTH, CANVAS_HEIGHT - floorY);
    }

    // Ceiling tiles
    const ceilTile = env.interiorCeilingTile;
    if (ceilTile) {
      const tW = (ceilTile[0]?.length ?? 32) * 2;
      for (let tx = 0; tx < CANVAS_WIDTH; tx += tW) {
        drawSprite(ctx, ceilTile, tx, 0, 2);
      }
    } else {
      ctx.fillStyle = "#b8a888";
      ctx.fillRect(0, 0, CANVAS_WIDTH, 20);
    }
  } else {
    // Sky
    ctx.fillStyle = env.skyColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Stars (only for night sky skins)
    if (env.showStars) {
      ctx.fillStyle = "#ffffff";
      for (const star of stars) {
        const sx = star.x - cam * 0.3;
        const wrappedX = ((sx % CANVAS_WIDTH) + CANVAS_WIDTH) % CANVAS_WIDTH;
        ctx.globalAlpha = star.opacity;
        ctx.fillRect(wrappedX, star.y, 2, 2);
      }
      ctx.globalAlpha = 1;
    }

    // Ground tiles (first platform is ground)
    const groundPlatform = activePlatforms[0];
    if (groundPlatform) {
      const groundStartX = Math.floor(cam / 32) * 32;
      for (let tx = groundStartX; tx < cam + CANVAS_WIDTH + 32; tx += 32) {
        if (tx >= groundPlatform.x && tx < groundPlatform.x + groundPlatform.width) {
          drawSprite(ctx, env.groundTile, tx - cam, groundPlatform.y, 2);
        }
      }
    }
  }

  // --- Platforms ---
  // Skip index 0 (ground/floor) — rendered by tiles above
  for (let i = 1; i < activePlatforms.length; i++) {
    const p = activePlatforms[i]!;
    if (isInterior) {
      // Shelf sprite based on segment type
      const shelfSpr = currentSegment?.shelfType === "metal"
        ? (env.shelfMetalSprite ?? shelfMetalSprite)
        : (env.shelfWoodSprite ?? shelfWoodSprite);
      const tileW = (shelfSpr[0]?.length ?? 32) * 2;
      for (let tx = 0; tx < p.width; tx += tileW) {
        const drawW = Math.min(tileW, p.width - tx);
        if (drawW < tileW) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(p.x + tx - cam, p.y, drawW, shelfSpr.length * 2);
          ctx.clip();
          drawSprite(ctx, shelfSpr, p.x + tx - cam, p.y, 2);
          ctx.restore();
        } else {
          drawSprite(ctx, shelfSpr, p.x + tx - cam, p.y, 2);
        }
      }
    } else {
      const tileW = 32;
      for (let tx = 0; tx < p.width; tx += tileW) {
        const drawW = Math.min(tileW, p.width - tx);
        if (drawW < tileW) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(p.x + tx - cam, p.y, drawW, 16);
          ctx.clip();
          drawSprite(ctx, env.platformTile, p.x + tx - cam, p.y, 2);
          ctx.restore();
        } else {
          drawSprite(ctx, env.platformTile, p.x + tx - cam, p.y, 2);
        }
      }
    }
  }

  // --- Doors (with building facades in street, door frames in interior) ---
  if (currentSegment?.doors.length) {
    for (const door of currentSegment.doors) {
      renderDoor(ctx, door, state, env, currentSegment.type, cam);
    }
  }

  // --- Landmarks (background Cyrillic signs on buildings) ---
  const landmarks = currentSegment?.landmarks ?? level.landmarks;
  if (landmarks && !isInterior) {
    const groundY = activePlatforms[0]?.y ?? CANVAS_HEIGHT - 40;
    for (const lm of landmarks) {
      const lx = lm.x - cam;
      if (lx < -120 || lx > CANVAS_WIDTH + 120) continue;
      const sprite = landmarkSprites[lm.label];
      if (sprite) {
        const scale = 4;
        const sprW = (sprite[0]?.length ?? 20) * scale;
        const sprH = sprite.length * scale;
        const ly = lm.y ?? groundY - sprH;
        drawSprite(ctx, sprite, lx - sprW / 2, ly, scale);
        // Sign text on building — large enough to read at a glance
        ctx.fillStyle = "#eee";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.shadowColor = "#000";
        ctx.shadowBlur = 3;
        ctx.fillText(lm.label, lx, ly + 32);
        ctx.shadowBlur = 0;
      }
    }
  }

  // --- Collectibles ---
  for (const item of activeCollectibles) {
    const sx = item.x - cam;
    const sprite = getItemSprite(item.itemId);
    if (sprite) {
      drawSprite(ctx, sprite, sx, item.y, 2);
    } else {
      const def = itemDefs.get(item.itemId);
      ctx.fillStyle = def?.color ?? "#FFD700";
      ctx.fillRect(sx, item.y, 32, 26);
    }

    const def = itemDefs.get(item.itemId);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 3;
    ctx.fillText(def?.name ?? item.itemId, sx + 16, item.y - 4);
    ctx.shadowBlur = 0;
  }

  // --- Sacred item (potato / coffee bean — with idle bob) ---
  if (state.potato && !state.potato.collected) {
    const inSegment = !state.potato.segmentId || !currentSegment || state.potato.segmentId === currentSegment.id;
    if (inSegment) {
      const p = state.potato;
      const sx = p.x - cam;
      const bobOffset = Math.sin(state.elapsed / 1000 * Math.PI) * 2;
      drawSprite(ctx, env.sacredItemSprite, sx, p.y + bobOffset, 2);
    }
  }

  // --- Shopkeeper with counter (interior only) ---
  if (currentSegment?.shopkeeper) {
    const sk = currentSegment.shopkeeper;

    // Counter in front of shopkeeper
    const ctrSpr = env.counterSprite ?? counterSprite;
    const ctrW = (ctrSpr[0]?.length ?? 48) * 2;
    drawSprite(ctx, ctrSpr, sk.x - cam - ctrW + 20, sk.y + 40, 2);

    // Shopkeeper (prefer babushka sprite)
    const keeperSpr = env.shopkeeperBabushkaSprite ?? shopkeeperBabushkaSprite;
    drawSprite(ctx, keeperSpr, sk.x - cam, sk.y, 2);

    // Speech bubble above shopkeeper when shout response is active
    if (state.shoutResponse) {
      const isDa = state.shoutResponse.type === "da";
      const sprW = (keeperSpr[0]?.length ?? 24) * 2;
      const skCenterX = sk.x - cam + sprW / 2;
      ctx.font = "bold 14px monospace";
      const textW = ctx.measureText(state.shoutResponse.text).width + 16;
      const bubbleY = sk.y - 30;
      ctx.fillStyle = isDa ? "rgba(76, 175, 80, 0.9)" : "rgba(244, 67, 54, 0.9)";
      ctx.fillRect(skCenterX - textW / 2, bubbleY, textW, 24);
      ctx.beginPath();
      ctx.moveTo(skCenterX - 6, bubbleY + 24);
      ctx.lineTo(skCenterX + 6, bubbleY + 24);
      ctx.lineTo(skCenterX, bubbleY + 32);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(state.shoutResponse.text, skCenterX, bubbleY + 17);
    }
  }

  // --- NPCs (babushkas / aunties — filtered by segment) ---
  for (const b of state.babushkas) {
    if (currentSegment && b.segmentId && b.segmentId !== currentSegment.id) continue;
    if (!currentSegment && b.segmentId) continue;

    const sx = b.x - cam;
    const flipH = b.direction === -1;
    drawSprite(ctx, env.npcSprite, sx, b.y, 2, flipH);
    if (b.scoldingText && b.scoldingUntil > state.elapsed) {
      ctx.fillStyle = "#FF0000";
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 3;
      ctx.fillText(b.scoldingText, sx + b.width / 2, b.y - 8);
      ctx.shadowBlur = 0;
    }
  }

  // --- Vehicles (marshrutkas / blue taxis — street only) ---
  if (!isInterior) {
    for (const m of state.marshrutkas) {
      const sx = m.x - cam;
      const flipH = m.speed > 0;
      drawSprite(ctx, env.vehicleSprite, sx, m.y, 2, flipH);
    }
  }

  // --- Gate building (street / non-segment only) ---
  if (!isInterior) {
    const gx = level.gatePosition.x - cam;
    const groundY = activePlatforms[0]?.y ?? CANVAS_HEIGHT - 40;
    const sprH = env.gateSprite.length * 2;
    const gy = groundY - sprH; // anchor to ground
    drawSprite(ctx, env.gateSprite, gx, gy, 2);
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 3;
    ctx.fillText(env.gateLabel, gx + 28, gy - 4);
    ctx.shadowBlur = 0;

    // Flag animation — rises on flagpole when Chad approaches
    if (state.flagProgress > 0 && env.flagColors.length > 0) {
      const poleX = gx + 58;
      const poleTop = gy + 4;
      const poleBottom = gy + sprH - 12;
      const stripeCount = env.flagColors.length;
      const flagHeight = stripeCount * 4;
      const flagWidth = 16;
      const flagY = poleBottom - (poleBottom - poleTop) * state.flagProgress;
      const stripeH = flagHeight / stripeCount;
      for (let i = 0; i < stripeCount; i++) {
        ctx.fillStyle = env.flagColors[i]!;
        ctx.fillRect(poleX + 1, flagY + i * stripeH, flagWidth, stripeH);
      }
    }
  }

  // --- Player (Chad) ---
  const px = state.player.position.x - cam;
  const py = state.player.position.y;

  if (state.player.invincibleUntil > state.elapsed && Math.floor(state.elapsed / 100) % 2 === 0) {
    // Blink during invincibility
  } else {
    const frame = getChadFrame(state);
    const flipH = state.player.facing === "left";
    drawSprite(ctx, frame, px, py, 2, flipH);
  }

  // --- HUD ---
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, 30);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#FFD54F";
  ctx.font = "bold 14px monospace";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${state.score}`, 10, 20);
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFF";
  if (isInterior && currentSegment) {
    // Show which shop we're in
    const entryDoor = level.segments
      ?.flatMap(s => s.doors)
      .find(d => d.targetSegmentId === currentSegment!.id);
    const shopName = entryDoor?.label ?? "";
    ctx.fillText(`Items: ${state.collectedItems.length}  |  ${shopName}`, CANVAS_WIDTH / 2, 20);
  } else {
    ctx.fillText(`Items: ${state.collectedItems.length}`, CANVAS_WIDTH / 2, 20);
  }
  ctx.textAlign = "right";
  ctx.fillStyle = "#aaa";
  ctx.font = "12px monospace";
  const itemNames = state.collectedItems.map(id => itemDefs.get(id)?.name ?? id).join(", ");
  ctx.fillText(itemNames || "No items", CANVAS_WIDTH - 10, 20);
  ctx.textAlign = "left";

  // --- Interact prompt ---
  if (state.nearDoor && currentSegment) {
    const door = currentSegment.doors.find(d => d.id === state.nearDoor);
    if (door) {
      const isLocked = door.locked && !state.unlockedDoors.includes(door.id);
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(CANVAS_WIDTH / 2 - 60, CANVAS_HEIGHT - 55, 120, 28);
      ctx.fillStyle = isLocked ? "#FF5722" : "#FFD54F";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText(
        isLocked ? "[P] Please" : (isInterior ? "[E] Exit" : "[E] Enter"),
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT - 36
      );
    }
  }

  // --- Shout response bubble (centered — only when no shopkeeper speech bubble) ---
  if (state.shoutResponse && !currentSegment?.shopkeeper) {
    const isDa = state.shoutResponse.type === "da";
    ctx.fillStyle = isDa ? "rgba(76, 175, 80, 0.9)" : "rgba(244, 67, 54, 0.9)";
    const bubbleW = 200;
    const bubbleX = CANVAS_WIDTH / 2 - bubbleW / 2;
    ctx.fillRect(bubbleX, 50, bubbleW, 40);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = "center";
    ctx.fillText(state.shoutResponse.text, CANVAS_WIDTH / 2, 76);
  }

  // --- Door transition overlay ---
  if (state.transition) {
    const alpha = state.transition.phase === "fadeOut"
      ? 1 - (state.transition.timer / TRANSITION_MS)
      : state.transition.timer / TRANSITION_MS;
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, Math.min(1, alpha))})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function renderDoor(
  ctx: CanvasRenderingContext2D,
  door: DoorDef,
  state: GameRunState,
  env: SkinEnvironment,
  segmentType: "street" | "interior",
  cam: number
): void {
  const dx = door.x - cam;

  if (segmentType === "street") {
    // Building facade behind door — distinct per shop type
    const labelFacade = door.label ? shopFacadeSprites[door.label] : undefined;
    const facade = labelFacade ?? env.shopFrontStallSprite ?? env.shopExteriorSprite ?? shopExteriorSprite;
    const facadeW = (facade[0]?.length ?? 24) * 2;
    const facadeH = facade.length * 2;
    drawSprite(ctx, facade, dx + door.width / 2 - facadeW / 2, door.y + door.height - facadeH, 2);

    // Sign text above facade
    if (door.label) {
      ctx.fillStyle = "#FFD54F";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 3;
      ctx.fillText(door.label, dx + door.width / 2, door.y + door.height - facadeH - 4);
      ctx.shadowBlur = 0;
    }

    // Lock overlay (padlock sprite instead of emoji)
    const isLocked = door.locked && !state.unlockedDoors.includes(door.id);
    if (isLocked) {
      const lockSpr = env.doorLockedOverlay ?? doorLockedOverlay;
      const lockW = (lockSpr[0]?.length ?? 10) * 2;
      const lockH = lockSpr.length * 2;
      drawSprite(ctx, lockSpr, dx + door.width / 2 - lockW / 2, door.y + door.height / 2 - lockH / 2, 2);
    }
  } else {
    // Interior door — back door sprite
    const doorSpr = env.doorBackSprite ?? doorBackSprite;
    const sprH = doorSpr.length * 2;
    const sprW = (doorSpr[0]?.length ?? 16) * 2;
    const sprY = door.y + door.height - sprH;
    drawSprite(ctx, doorSpr, dx + door.width / 2 - sprW / 2, sprY, 2);

    // Green ВЫХОД exit sign sprite above door
    const signSpr = env.exitSignSprite ?? exitSignSprite;
    const signW = (signSpr[0]?.length ?? 20) * 2;
    const signH = signSpr.length * 2;
    drawSprite(ctx, signSpr, dx + door.width / 2 - signW / 2, sprY - signH - 4, 2);
  }
}
