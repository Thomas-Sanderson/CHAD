import type {
  GameRunState,
  LevelData,
  SkinEnvironment,
  CollectedInfo,
} from "../types";
import type { CollectibleItem, LevelSegment, DoorDef, PlatformDef, StreetCorridor } from "../types/content";
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
  heartFullSprite,
  heartEmptySprite,
  bagSprite,
} from "./sprites";
import type { TimeOfDay } from "./sky";
import { getSkyPhase, renderSky, renderGroundTint, renderSceneBrightness, renderWarmthOverlay } from "./sky";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 450;
const TRANSITION_MS = 150;

export { CANVAS_WIDTH, CANVAS_HEIGHT };

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

export interface HudData {
  hearts: number;
  maxHearts: number;
}

const WALL_THICKNESS = 48;

function drawStreetCorridors(
  ctx: CanvasRenderingContext2D,
  corridors: StreetCorridor[],
  camX: number,
  camY: number,
): void {
  for (let ci = 0; ci < corridors.length; ci++) {
    const c = corridors[ci]!;
    const height = c.bottomY - c.topY;
    // Left wall
    const lwX = c.x - WALL_THICKNESS - camX;
    const lwY = c.topY - camY;
    // Right wall
    const rwX = c.x + c.width - camX;
    const rwY = c.topY - camY;

    // Cull if both walls off-screen
    if (lwX + WALL_THICKNESS < -10 && rwX > CANVAS_WIDTH + 10) { /* corridor visible but walls off edges — skip walls only */ }
    if (rwX + WALL_THICKNESS < -10 || lwX > CANVAS_WIDTH + 10) continue;

    for (let side = 0; side < 2; side++) {
      const wx = side === 0 ? lwX : rwX;
      const wy = side === 0 ? lwY : rwY;
      // Cull individual wall
      if (wx + WALL_THICKNESS < 0 || wx > CANVAS_WIDTH) continue;
      if (wy + height < 0 || wy > CANVAS_HEIGHT) continue;

      // 1. Plaster base fill
      ctx.fillStyle = "#c8b89a";
      ctx.fillRect(wx, wy, WALL_THICKNESS, height);

      // 2. Mortar grid
      ctx.strokeStyle = "#b8a888";
      ctx.lineWidth = 1;
      for (let row = 0; row < height; row += 16) {
        const lineY = wy + row;
        if (lineY < -1 || lineY > CANVAS_HEIGHT + 1) continue;
        ctx.beginPath();
        ctx.moveTo(wx, lineY);
        ctx.lineTo(wx + WALL_THICKNESS, lineY);
        ctx.stroke();
      }
      for (let row = 0; row < height; row += 16) {
        const offset = (Math.floor(row / 16) % 2) * 16;
        for (let col = offset; col < WALL_THICKNESS; col += 32) {
          const lineX = wx + col;
          const lineY = wy + row;
          if (lineX < -1 || lineX > CANVAS_WIDTH + 1) continue;
          ctx.beginPath();
          ctx.moveTo(lineX, lineY);
          ctx.lineTo(lineX, lineY + 16);
          ctx.stroke();
        }
      }

      // 3. Inner edge shadow (corridor-facing side)
      ctx.fillStyle = "#8a7a6a";
      const shadowX = side === 0 ? wx + WALL_THICKNESS - 2 : wx;
      ctx.fillRect(shadowX, wy, 2, height);

      // 4. Windows every 80px on inner face
      const winW = 20;
      const winH = 24;
      for (let row = 40; row < height - 40; row += 80) {
        const winX = side === 0 ? wx + WALL_THICKNESS - winW - 6 : wx + 6;
        const winY = wy + row;
        if (winY + winH < 0 || winY > CANVAS_HEIGHT) continue;
        // Window glass
        ctx.fillStyle = "#2a2a3e";
        ctx.fillRect(winX, winY, winW, winH);
        // Frame
        ctx.strokeStyle = "#4a4a5e";
        ctx.lineWidth = 2;
        ctx.strokeRect(winX, winY, winW, winH);
        // Cross divider
        ctx.strokeStyle = "#3a3a4e";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.moveTo(winX, winY + winH / 2);
        ctx.lineTo(winX + winW, winY + winH / 2);
        ctx.stroke();
        // Glint
        ctx.fillStyle = "#5a6a7a";
        ctx.fillRect(winX + 3, winY + 3, 5, 4);
      }

      // 5. Drainpipe — on alternating side per corridor
      const hasPipe = (ci % 2 === 0) === (side === 0);
      if (hasPipe) {
        const pipeX = side === 0 ? wx + WALL_THICKNESS - 8 : wx + 4;
        ctx.fillStyle = "#666";
        ctx.fillRect(pipeX, wy, 4, height);
        ctx.fillStyle = "#777";
        ctx.fillRect(pipeX + 1, wy, 1, height);
      }
    }

    // 6. Clothesline between walls (~30% down)
    const lineY = c.topY + height * 0.3 - camY;
    if (lineY > 0 && lineY < CANVAS_HEIGHT) {
      const lineStartX = c.x - camX;
      const lineEndX = c.x + c.width - camX;
      ctx.strokeStyle = "#888";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineY);
      ctx.lineTo(lineEndX, lineY);
      ctx.stroke();
      // Hanging laundry rectangles
      const colors = ["#b8d4e3", "#e8d4b8", "#d4b8b8", "#c8c8b8"];
      for (let lx = lineStartX + 20; lx < lineEndX - 20; lx += 35) {
        ctx.fillStyle = colors[Math.floor((lx * 7) % colors.length)]!;
        ctx.fillRect(lx, lineY + 1, 16, 12);
      }
    }
  }
}

function drawPlatformBrackets(
  ctx: CanvasRenderingContext2D,
  platform: PlatformDef,
  corridors: StreetCorridor[],
  camX: number,
  camY: number,
): void {
  if (!platform.passThrough) return;
  const py = platform.y - camY;
  for (const c of corridors) {
    if (platform.y <= c.topY || platform.y >= c.bottomY) continue;
    const pRight = platform.x + platform.width;
    if (pRight < c.x || platform.x > c.x + c.width) continue;
    // Left bracket
    if (platform.x <= c.x + 10) {
      ctx.fillStyle = "#887766";
      ctx.fillRect(c.x - camX - 6, py, 6, 8);
    }
    // Right bracket
    if (pRight >= c.x + c.width - 10) {
      ctx.fillStyle = "#887766";
      ctx.fillRect(c.x + c.width - camX, py, 6, 8);
    }
  }
}

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  state: GameRunState,
  level: LevelData,
  itemDefs: Map<string, CollectibleItem>,
  env: SkinEnvironment,
  hud?: HudData,
  timeOfDay?: TimeOfDay
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
  const camX = state.camera.x;
  const camY = state.camera.y;

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
    // Sky — fills the entire canvas; ground tiles and corridor walls paint over it
    const skyPhase = timeOfDay ? getSkyPhase(timeOfDay, env.latitude) : null;
    if (skyPhase) {
      renderSky(ctx, skyPhase, CANVAS_WIDTH, CANVAS_HEIGHT, camX);
    } else {
      ctx.fillStyle = env.skyColor;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // Ground tiles — render all isGround platforms, or platform[0] as fallback
    const groundPlatforms = activePlatforms.filter(p => p.isGround);
    const groundTargets = groundPlatforms.length > 0 ? groundPlatforms : (activePlatforms[0] ? [activePlatforms[0]] : []);
    // Earth fill below the lowest avenue — extends to canvas bottom
    let lowestGroundY = -Infinity;
    for (const gp of groundTargets) {
      if (gp.y > lowestGroundY) lowestGroundY = gp.y;
    }
    if (lowestGroundY > -Infinity) {
      const earthTop = lowestGroundY + 16 - camY; // just below the ground tile sprite
      if (earthTop < CANVAS_HEIGHT) {
        ctx.fillStyle = "#5a4a3a";
        ctx.fillRect(0, Math.max(0, earthTop), CANVAS_WIDTH, CANVAS_HEIGHT - Math.max(0, earthTop));
        // Darker sub-layer for depth
        const deepTop = earthTop + 24;
        if (deepTop < CANVAS_HEIGHT) {
          ctx.fillStyle = "#4a3a2e";
          ctx.fillRect(0, Math.max(0, deepTop), CANVAS_WIDTH, CANVAS_HEIGHT - Math.max(0, deepTop));
        }
      }
    }
    for (const gp of groundTargets) {
      const gpScreenY = gp.y - camY;
      if (gpScreenY > CANVAS_HEIGHT + 32 || gpScreenY + 32 < -32) continue;
      const groundStartX = Math.floor(camX / 32) * 32;
      for (let tx = groundStartX; tx < camX + CANVAS_WIDTH + 32; tx += 32) {
        if (tx >= gp.x && tx < gp.x + gp.width) {
          drawSprite(ctx, env.groundTile, tx - camX, gpScreenY, 2);
        }
      }
    }
  }

  // --- Street corridor walls (background, behind platforms) ---
  const corridors = currentSegment?.streetCorridors;
  if (corridors?.length && !isInterior) {
    drawStreetCorridors(ctx, corridors, camX, camY);
  }

  // --- Platforms ---
  // Skip ground platforms (rendered by ground tiles above) and index 0 fallback
  const hasIsGround = activePlatforms.some(p => p.isGround);
  for (let i = 0; i < activePlatforms.length; i++) {
    const p = activePlatforms[i]!;
    // Skip ground platforms (rendered above)
    if (p.isGround || (!hasIsGround && i === 0)) continue;
    const py = p.y - camY;
    if (py > CANVAS_HEIGHT + 16 || py + 32 < -16) continue; // off-screen cull
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
          ctx.rect(p.x + tx - camX, py, drawW, shelfSpr.length * 2);
          ctx.clip();
          drawSprite(ctx, shelfSpr, p.x + tx - camX, py, 2);
          ctx.restore();
        } else {
          drawSprite(ctx, shelfSpr, p.x + tx - camX, py, 2);
        }
      }
    } else if (p.passThrough) {
      // Pass-through: thin grate — visually lighter than solid platforms
      ctx.fillStyle = "#887766";
      ctx.fillRect(p.x - camX, py, p.width, 2);
      ctx.fillStyle = "#776655";
      for (let tx = 4; tx < p.width; tx += 12) {
        ctx.fillRect(p.x + tx - camX, py + 2, 4, 6);
      }
      // Wall brackets where grate meets corridor walls
      if (corridors?.length) {
        drawPlatformBrackets(ctx, p, corridors, camX, camY);
      }
    } else {
      const tileW = 32;
      for (let tx = 0; tx < p.width; tx += tileW) {
        const drawW = Math.min(tileW, p.width - tx);
        if (drawW < tileW) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(p.x + tx - camX, py, drawW, 16);
          ctx.clip();
          drawSprite(ctx, env.platformTile, p.x + tx - camX, py, 2);
          ctx.restore();
        } else {
          drawSprite(ctx, env.platformTile, p.x + tx - camX, py, 2);
        }
      }
    }
  }

  // --- Doors (with building facades in street, door frames in interior) ---
  if (currentSegment?.doors.length) {
    for (const door of currentSegment.doors) {
      renderDoor(ctx, door, state, env, currentSegment.type, camX, camY);
    }
  }

  // --- Landmarks (background Cyrillic signs on buildings) ---
  const landmarks = currentSegment?.landmarks ?? level.landmarks;
  if (landmarks && !isInterior) {
    const groundY = activePlatforms[0]?.y ?? CANVAS_HEIGHT - 40;
    for (const lm of landmarks) {
      const lx = lm.x - camX;
      if (lx < -120 || lx > CANVAS_WIDTH + 120) continue;
      const sprite = landmarkSprites[lm.label];
      if (sprite) {
        const scale = 4;
        const sprW = (sprite[0]?.length ?? 20) * scale;
        const sprH = sprite.length * scale;
        const ly = (lm.y ?? groundY - sprH) - camY;
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

  // --- Street signs (passive Cyrillic labels at street entrances) ---
  const streetSigns = currentSegment?.streetSigns;
  if (streetSigns && !isInterior) {
    for (const sign of streetSigns) {
      const sx = sign.x - camX;
      const sy = sign.y - camY;
      if (sx < -80 || sx > CANVAS_WIDTH + 80 || sy < -20 || sy > CANVAS_HEIGHT + 20) continue;
      const tw = ctx.measureText(sign.label).width + 10;
      ctx.fillStyle = "#2e7d32";
      ctx.fillRect(sx - tw / 2, sy, tw, 16);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(sign.label, sx, sy + 12);
    }
  }

  // --- Collectibles ---
  for (const item of activeCollectibles) {
    const sx = item.x - camX;
    const sy = item.y - camY;
    const sprite = getItemSprite(item.itemId);
    if (sprite) {
      drawSprite(ctx, sprite, sx, sy, 2);
    } else {
      const def = itemDefs.get(item.itemId);
      ctx.fillStyle = def?.color ?? "#FFD700";
      ctx.fillRect(sx, sy, 32, 26);
    }

    const def = itemDefs.get(item.itemId);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 3;
    ctx.fillText(def?.name ?? item.itemId, sx + 16, sy - 4);
    ctx.shadowBlur = 0;
  }

  // --- Dropping items (bouncing out from babushka collisions) ---
  for (const drop of state.droppingItems) {
    const sx = drop.x - camX;
    const sy = drop.y - camY;
    const sprite = getItemSprite(drop.itemId);
    if (sprite) {
      drawSprite(ctx, sprite, sx, sy, 2);
    } else {
      const def = itemDefs.get(drop.itemId);
      ctx.fillStyle = def?.color ?? "#FFD700";
      ctx.fillRect(sx, sy, 32, 26);
    }
  }

  // --- Sacred item (potato / coffee bean — with idle bob) ---
  if (state.potato && !state.potato.collected) {
    const inSegment = !state.potato.segmentId || !currentSegment || state.potato.segmentId === currentSegment.id;
    if (inSegment) {
      const p = state.potato;
      const sx = p.x - camX;
      const bobOffset = Math.sin(state.elapsed / 1000 * Math.PI) * 2;
      drawSprite(ctx, env.sacredItemSprite, sx, p.y - camY + bobOffset, 2);
    }
  }

  // --- Shopkeeper with counter (interior only) ---
  if (currentSegment?.shopkeeper) {
    const sk = currentSegment.shopkeeper;

    // Counter in front of shopkeeper
    const ctrSpr = env.counterSprite ?? counterSprite;
    const ctrW = (ctrSpr[0]?.length ?? 48) * 2;
    drawSprite(ctx, ctrSpr, sk.x - camX - ctrW + 20, sk.y - camY + 40, 2);

    // Shopkeeper (prefer babushka sprite)
    const keeperSpr = env.shopkeeperBabushkaSprite ?? shopkeeperBabushkaSprite;
    drawSprite(ctx, keeperSpr, sk.x - camX, sk.y - camY, 2);

    // Speech bubble above shopkeeper — shout response OR shop conversation
    const bubbleText = state.shoutResponse?.text ?? state.shopBubble?.text ?? null;
    if (bubbleText) {
      const isDa = state.shoutResponse?.type === "da";
      const isNet = state.shoutResponse?.type === "net";
      const sprW = (keeperSpr[0]?.length ?? 24) * 2;
      const skCenterX = sk.x - camX + sprW / 2;
      ctx.font = "bold 14px monospace";
      const textW = ctx.measureText(bubbleText).width + 16;
      const bubbleY = sk.y - camY - 30;
      ctx.fillStyle = isDa ? "rgba(76, 175, 80, 0.9)"
        : isNet ? "rgba(244, 67, 54, 0.9)"
        : "rgba(40, 40, 70, 0.9)";
      ctx.fillRect(skCenterX - textW / 2, bubbleY, textW, 24);
      ctx.beginPath();
      ctx.moveTo(skCenterX - 6, bubbleY + 24);
      ctx.lineTo(skCenterX + 6, bubbleY + 24);
      ctx.lineTo(skCenterX, bubbleY + 32);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(bubbleText, skCenterX, bubbleY + 17);
    }

    // --- Whiteboard: shopkeeper response with pronunciation + translation ---
    if (state.shopBubble) {
      const boardW = 260;
      const boardH = 110;
      const boardX = CANVAS_WIDTH - boardW - 30;
      const boardY = 35;
      const pad = 12;
      const innerW = boardW - pad * 2;

      // Board background — off-white with subtle border
      ctx.fillStyle = "#f0ece0";
      ctx.fillRect(boardX, boardY, boardW, boardH);
      ctx.strokeStyle = "#8B7355";
      ctx.lineWidth = 2;
      ctx.strokeRect(boardX, boardY, boardW, boardH);
      ctx.strokeStyle = "#c4b89a";
      ctx.lineWidth = 1;
      ctx.strokeRect(boardX + 3, boardY + 3, boardW - 6, boardH - 6);

      const cx = boardX + boardW / 2;
      let ty = boardY + pad + 14;

      // Script — large, dark, allow two lines for long phrases
      ctx.fillStyle = "#2a2a3e";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      const scriptText = state.shopBubble.text;
      const scriptW = ctx.measureText(scriptText).width;
      if (scriptW > innerW) {
        // Word-wrap into two lines
        const words = scriptText.split(" ");
        let line1 = "";
        let line2 = "";
        for (const w of words) {
          const test = line1 ? line1 + " " + w : w;
          if (ctx.measureText(test).width <= innerW) {
            line1 = test;
          } else {
            line2 += (line2 ? " " : "") + w;
          }
        }
        ctx.fillText(line1, cx, ty);
        if (line2) { ty += 16; ctx.fillText(line2, cx, ty); }
      } else {
        ctx.fillText(scriptText, cx, ty);
      }
      ty += 18;

      // Pronunciation — muted brown
      if (state.shopBubble.pronunciation) {
        ctx.fillStyle = "#8B6914";
        ctx.font = "12px monospace";
        ctx.fillText(state.shopBubble.pronunciation, cx, ty, innerW);
        ty += 16;
      }

      // Translation — gray italic
      if (state.shopBubble.translation) {
        ctx.fillStyle = "#666";
        ctx.font = "italic 12px monospace";
        ctx.fillText(state.shopBubble.translation, cx, ty, innerW);
      }
    }

    // --- [E] Talk prompt when near shopkeeper ---
    if (state.nearShopkeeper && !state.shopConvoMenuOpen) {
      const keeperW = (keeperSpr[0]?.length ?? 24) * 2;
      const promptX = sk.x - camX + keeperW / 2;
      const promptY = sk.y - camY - 40;
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      const tw = ctx.measureText("[E] Talk").width + 16;
      ctx.fillRect(promptX - tw / 2, promptY - 6, tw, 22);
      ctx.fillStyle = "#FFD54F";
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.fillText("[E] Talk", promptX, promptY + 11);
    }
  }

  // --- NPCs (babushkas / aunties — filtered by segment) ---
  for (const b of state.babushkas) {
    if (currentSegment && b.segmentId && b.segmentId !== currentSegment.id) continue;
    if (!currentSegment && b.segmentId) continue;

    const sx = b.x - camX;
    const by = b.y - camY;
    const flipH = b.direction === -1;
    // Flash when stunned (head-bounced)
    const isStunned = b.stunUntil > state.elapsed;
    if (isStunned && Math.floor(state.elapsed / 80) % 2 === 0) {
      // blink frame — skip drawing sprite
    } else {
      drawSprite(ctx, env.npcSprite, sx, by, 2, flipH);
    }
    if (b.scoldingText && b.scoldingUntil > state.elapsed) {
      ctx.fillStyle = "#FF0000";
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 3;
      ctx.fillText(b.scoldingText, sx + b.width / 2, by - 8);
      ctx.shadowBlur = 0;
    }
  }

  // --- Gate building (street / non-segment only) ---
  // Drawn before vehicles so vehicles pass in front of it

  if (!isInterior) {
    const gx = level.gatePosition.x - camX;
    // Gate collision box is 60×80 at gatePosition; bottom sits on ground
    const gateGroundScreen = (level.gatePosition.y + 80) - camY;
    const sprH = env.gateSprite.length * 2;
    const gy = gateGroundScreen - sprH; // anchor sprite to ground
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

  // --- Vehicles (marshrutkas / vespas / taxis — street only) ---
  if (!isInterior) {
    for (const m of state.marshrutkas) {
      const sx = m.x - camX;
      const flipH = m.speed > 0;
      // Bottom-align sprite to collision box bottom (sits on ground)
      const sprH = env.vehicleSprite.length * 2;
      const vy = m.y + m.height - sprH - camY;
      drawSprite(ctx, env.vehicleSprite, sx, vy, 2, flipH);
    }
  }

  // --- Player (Chad) ---
  const px = state.player.position.x - camX;
  const py = state.player.position.y - camY;

  if (state.player.invincibleUntil > state.elapsed && Math.floor(state.elapsed / 100) % 2 === 0) {
    // Blink during invincibility
  } else {
    const frame = getChadFrame(state);
    const flipH = state.player.facing === "left";
    drawSprite(ctx, frame, px, py, 2, flipH);
  }

  // --- Sky overlays (outdoor only, before HUD) ---
  if (!isInterior && timeOfDay) {
    const skyPhase = getSkyPhase(timeOfDay, env.latitude);
    const groundY = (activePlatforms[0]?.y ?? CANVAS_HEIGHT - 40) - camY;
    renderGroundTint(ctx, skyPhase, groundY, CANVAS_WIDTH, CANVAS_HEIGHT);
    renderSceneBrightness(ctx, skyPhase, CANVAS_WIDTH, CANVAS_HEIGHT);
    renderWarmthOverlay(ctx, skyPhase, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // --- HUD ---
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, CANVAS_WIDTH, 30);
  ctx.shadowBlur = 0;

  // Left: Score
  ctx.fillStyle = "#FFD54F";
  ctx.font = "bold 14px monospace";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${state.score}`, 10, 20);

  if (hud) {
    // Center-left: Hearts
    const heartsStartX = 150;
    for (let i = 0; i < hud.maxHearts; i++) {
      const sprite = i < hud.hearts ? heartFullSprite : heartEmptySprite;
      drawSprite(ctx, sprite, heartsStartX + i * 18, 5, 2);
    }

    // Center-right: Bag + collected count
    const bagX = CANVAS_WIDTH / 2 + 60;
    drawSprite(ctx, bagSprite, bagX, 4, 2);
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`${state.collectedItems.length}`, bagX + 20, 20);

    // Right: Timer
    const totalSec = Math.floor(state.elapsed / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    ctx.fillStyle = "#888";
    ctx.font = "12px monospace";
    ctx.textAlign = "right";
    ctx.fillText(`${mins}:${secs.toString().padStart(2, "0")}`, CANVAS_WIDTH - 10, 19);
  } else {
    // Fallback HUD (no hearts data)
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFF";
    ctx.fillText(`Items: ${state.collectedItems.length}`, CANVAS_WIDTH / 2, 20);
  }
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

  // --- Landmark [P] Point prompt ---
  if (state.nearLandmark && !state.nearDoor) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(CANVAS_WIDTH / 2 - 55, CANVAS_HEIGHT - 55, 110, 28);
    ctx.fillStyle = "#ce93d8";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    ctx.fillText("[P] Point", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 36);
  }

  // --- Gate interact prompt ---
  if (state.nearGate && !state.reachedGate) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(CANVAS_WIDTH / 2 - 60, CANVAS_HEIGHT - 55, 120, 28);
    ctx.fillStyle = "#FFD54F";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    ctx.fillText("[E] Enter", CANVAS_WIDTH / 2, CANVAS_HEIGHT - 36);
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
  camX: number,
  camY: number
): void {
  const dx = door.x - camX;
  const dy = door.y - camY;

  if (segmentType === "street") {
    // Building facade behind door — scale 4 to match landmark buildings
    const facadeScale = 4;
    const labelFacade = door.label ? shopFacadeSprites[door.label] : undefined;
    const facade = labelFacade ?? env.shopFrontStallSprite ?? env.shopExteriorSprite ?? shopExteriorSprite;
    const facadeW = (facade[0]?.length ?? 24) * facadeScale;
    const facadeH = facade.length * facadeScale;
    drawSprite(ctx, facade, dx + door.width / 2 - facadeW / 2, dy + door.height - facadeH, facadeScale);

    // Sign text above facade
    if (door.label) {
      ctx.fillStyle = "#FFD54F";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 3;
      ctx.fillText(door.label, dx + door.width / 2, dy + door.height - facadeH - 4);
      ctx.shadowBlur = 0;
    }

    // Lock overlay (padlock sprite instead of emoji)
    const isLocked = door.locked && !state.unlockedDoors.includes(door.id);
    if (isLocked) {
      const lockSpr = env.doorLockedOverlay ?? doorLockedOverlay;
      const lockW = (lockSpr[0]?.length ?? 10) * facadeScale;
      const lockH = lockSpr.length * facadeScale;
      drawSprite(ctx, lockSpr, dx + door.width / 2 - lockW / 2, dy + door.height / 2 - lockH / 2, facadeScale);
    }
  } else {
    // Interior door — back door sprite
    const doorSpr = env.doorBackSprite ?? doorBackSprite;
    const sprH = doorSpr.length * 2;
    const sprW = (doorSpr[0]?.length ?? 16) * 2;
    const sprY = dy + door.height - sprH;
    drawSprite(ctx, doorSpr, dx + door.width / 2 - sprW / 2, sprY, 2);

    // Green ВЫХОД exit sign sprite above door
    const signSpr = env.exitSignSprite ?? exitSignSprite;
    const signW = (signSpr[0]?.length ?? 20) * 2;
    const signH = signSpr.length * 2;
    drawSprite(ctx, signSpr, dx + door.width / 2 - signW / 2, sprY - signH - 4, 2);
  }
}

