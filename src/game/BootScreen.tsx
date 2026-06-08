import { useState, useEffect, useRef } from "react";
import {
  drawSprite,
  chadWalk1,
  chadWalk2,
  chadJump,
  babushkaSprite,
  marshrutkaSprite,
  potatoSprite,
  groundTile,
  breadLoafSprite,
} from "../engine/sprites";
import { speakScold } from "../engine/audio";
import { getAudioContext, sfxJump, sfxCollect } from "../engine/sfx";
import { startMusic } from "../engine/music";

interface Props {
  onComplete: () => void;
}

const ATTEMPTS = [
  { text: "Contextual Heuristic Analysis Daemon", hesitate: 28, backspaceAll: true },
  { text: "Contextual Heuristic Adapt", hesitate: 22, backspaceAll: true },
  { text: "Completely Hopeless American D", hesitate: 26, backspaceAll: true },
  { text: "Cultural Hazard: Avoid Directly", hesitate: 15, backspaceAll: true },
  { text: "Chad Rescues Nobody", hesitate: 0, backspaceAll: false },
];

function humanDelay(): number {
  const base = 30 + Math.random() * 35;
  if (Math.random() < 0.06) return base + 80 + Math.random() * 100;
  return base;
}

function wordBackspaceDelay(): number {
  return 40 + Math.random() * 30;
}

const W = 600;
const H = 200;
const GROUND = 160;
const SCALE = 2.5;
const WALK_MS = 180;

export function BootScreen({ onComplete }: Props) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "scene" | "ready">("typing");
  const [blink, setBlink] = useState(true);
  const cancelled = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cursor blink
  useEffect(() => {
    if (phase !== "typing") return;
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, [phase]);

  // Typing animation
  useEffect(() => {
    let active = true;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function run() {
      for (const attempt of ATTEMPTS) {
        if (!active || cancelled.current) return;
        for (let i = 0; i <= attempt.text.length; i++) {
          if (!active || cancelled.current) return;
          setDisplay(attempt.text.slice(0, i));
          await sleep(humanDelay());
          if (attempt.hesitate > 0 && i === attempt.hesitate) {
            await sleep(200 + Math.random() * 200);
          }
        }
        if (!attempt.backspaceAll) {
          await sleep(600);
          if (active && !cancelled.current) setPhase("scene");
          return;
        }
        await sleep(300 + Math.random() * 300);
        let remaining = attempt.text;
        while (remaining.length > 0) {
          if (!active || cancelled.current) return;
          const lastSpace = remaining.lastIndexOf(" ");
          remaining = lastSpace > 0 ? remaining.slice(0, lastSpace) : "";
          setDisplay(remaining);
          await sleep(wordBackspaceDelay());
        }
        await sleep(150 + Math.random() * 150);
      }
    }

    run();
    return () => { active = false; };
  }, []);

  // Initialize AudioContext on first user gesture
  useEffect(() => {
    const initAudio = () => {
      getAudioContext();
      startMusic("title");
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
    window.addEventListener("click", initAudio);
    window.addEventListener("keydown", initAudio);
    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("keydown", initAudio);
    };
  }, []);

  // Skip typing on click/key
  useEffect(() => {
    if (phase === "ready") return;
    const skip = (e: KeyboardEvent | MouseEvent) => {
      if (phase === "typing") {
        cancelled.current = true;
        setDisplay("Chad Rescues Nobody");
        setPhase("scene");
      } else if (phase === "scene") {
        if (e instanceof KeyboardEvent && e.code !== "Enter" && e.code !== "Space") return;
        onComplete();
      }
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [phase, onComplete]);

  // Scene animation
  useEffect(() => {
    if (phase !== "scene") return;

    // Short delay then show "ready"
    const readyTimer = setTimeout(() => setPhase("ready"), 800);

    return () => clearTimeout(readyTimer);
  }, [phase]);

  // "PRESS ENTER" blink when ready
  useEffect(() => {
    if (phase !== "ready") return;
    const id = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(id);
  }, [phase]);

  // Enter to proceed when ready
  useEffect(() => {
    if (phase !== "ready") return;
    const handler = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.code !== "Enter" && e.code !== "Space") return;
      onComplete();
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [phase, onComplete]);

  // Canvas animation (runs during scene + ready)
  useEffect(() => {
    if (phase !== "scene" && phase !== "ready") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Layout constants
    const groundY = GROUND - 24 * SCALE; // Chad top when standing on ground
    const babY = GROUND - 22 * SCALE;    // Babushka top
    const CHAD_W = 12 * SCALE;           // Chad sprite width px
    const BAB_W = 14 * SCALE;            // Babushka sprite width px
    const ITEM_SC = 2;                    // Item sprite scale
    const ITEM_H = 16 * ITEM_SC;         // Item rendered height
    const ITEM_GND_Y = GROUND - ITEM_H;  // Item y when resting on ground

    // Scene positions — babushkas well-separated, item settles left of both
    const BAB1_BASE = 280;
    const BAB2_BASE = 460;
    const PATROL = 30;
    // Sine frequency: ~4 full patrol cycles per ~650-frame Chad cycle
    const BAB_OMEGA = 2 * Math.PI * 4 / 650;

    const BUS_SPEED = 5;
    const SCOLDINGS = ["КУДА?!", "БЕЗОБРАЗИЕ!", "НЕ ЛЕЗЬ!", "ОЙ!"];

    // Chad state
    type ChadPhase = "walk" | "busjump" | "jumping" | "bounce" | "shoved";
    const chad = {
      x: -50, y: groundY, vx: 1.2, vy: 0,
      onGround: true, hasItem: true, // starts with item on first cycle
      phase: "walk" as ChadPhase,
      invincibleUntil: 0,
    };

    // Babushka state (x computed from sine each frame)
    const bab1 = { x: BAB1_BASE, scoldText: null as string | null, scoldUntil: 0, stunUntil: 0 };
    const bab2 = { x: BAB2_BASE, scoldText: null as string | null, scoldUntil: 0, stunUntil: 0 };

    // Dropped item — persists between cycles, bounces to rest
    const drop = { active: false, x: 0, y: ITEM_GND_Y, vx: 0, vy: 0, settled: false };

    // Buses: A = jump obstacle on left, B = treacherous pass after collision
    const busA = { x: 700 };
    const busB = { x: W + 200, active: false };

    // Sacred Potato state — collectible, follows Chad after pickup
    const potato = { x: W / 2, y: 30, collected: false };
    const POTATO_HOME_X = W / 2;
    const POTATO_HOME_Y = 30;
    const POTATO_HOVER_OFFSET = -40; // floats above Chad's head

    // Per-cycle flags
    let interacted1 = false;
    let interacted2 = false;
    let spoke1 = false;
    let spoke2 = false;
    let cycleFrame = 0;
    let scoldIdx = 0;

    let elapsed = 0;
    let animId: number;

    function resetCycle() {
      chad.x = -50;
      chad.y = groundY;
      chad.vy = 0;
      chad.vx = 1.2;
      chad.onGround = true;
      chad.phase = "walk";
      chad.hasItem = false; // picks up last cycle's dropped item
      chad.invincibleUntil = 0;

      potato.x = POTATO_HOME_X;
      potato.y = POTATO_HOME_Y;
      potato.collected = false;

      interacted1 = false;
      interacted2 = false;
      spoke1 = false;
      spoke2 = false;
      cycleFrame = 0;
      scoldIdx = (scoldIdx + 1) % SCOLDINGS.length;

      busA.x = 700;
      busB.x = W + 200;
      busB.active = false;
    }

    const loop = (now: number) => {
      elapsed = now;
      cycleFrame++;
      ctx.clearRect(0, 0, W, H);

      // --- Stars ---
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 20; i++) {
        const sx = (i * 137 + 50) % W;
        const sy = (i * 97 + 10) % (GROUND - 30);
        ctx.globalAlpha = 0.2 + (Math.sin(elapsed / 1000 + i) * 0.3 + 0.3);
        ctx.fillRect(sx, sy, 2, 2);
      }
      ctx.globalAlpha = 1;

      // --- Ground ---
      for (let tx = 0; tx < W; tx += 16 * SCALE) {
        drawSprite(ctx, groundTile, tx, GROUND, SCALE);
      }

      // --- Babushka positions (sine patrol, returns to base each cycle) ---
      const sinVal = Math.sin(cycleFrame * BAB_OMEGA);
      bab1.x = BAB1_BASE + sinVal * PATROL;
      bab2.x = BAB2_BASE - sinVal * PATROL; // opposite phase
      const bab1FaceLeft = Math.cos(cycleFrame * BAB_OMEGA) < 0;
      const bab2FaceLeft = Math.cos(cycleFrame * BAB_OMEGA) > 0;

      // Draw babushkas (flash when stunned from head-bounce)
      if (!(bab1.stunUntil > elapsed && Math.floor(elapsed / 80) % 2 === 0)) {
        drawSprite(ctx, babushkaSprite, bab1.x, babY, SCALE, bab1FaceLeft);
      }
      if (!(bab2.stunUntil > elapsed && Math.floor(elapsed / 80) % 2 === 0)) {
        drawSprite(ctx, babushkaSprite, bab2.x, babY, SCALE, bab2FaceLeft);
      }

      // Scolding text bubbles
      for (const [bab, bx] of [[bab1, bab1.x], [bab2, bab2.x]]) {
        const b = bab as typeof bab1;
        if (b.scoldText && elapsed < b.scoldUntil) {
          ctx.fillStyle = "#000000";
          ctx.globalAlpha = 0.75;
          const tw = ctx.measureText(b.scoldText).width + 10;
          ctx.fillRect((bx as number) - 2, babY - 20, tw, 16);
          ctx.globalAlpha = 1;
          ctx.fillStyle = "#ff4444";
          ctx.font = "bold 11px monospace";
          ctx.fillText(b.scoldText, (bx as number) + 2, babY - 7);
        }
      }

      // --- Buses ---
      busA.x -= BUS_SPEED;
      if (busA.x > -120) {
        drawSprite(ctx, marshrutkaSprite, busA.x, GROUND - 20 * SCALE, SCALE, true);
      }
      if (busB.active) {
        busB.x -= BUS_SPEED;
        if (busB.x > -120) {
          drawSprite(ctx, marshrutkaSprite, busB.x, GROUND - 20 * SCALE, SCALE, true);
        } else {
          busB.active = false;
        }
      }

      // --- Chad behavior ---
      const chadRight = chad.x + CHAD_W;

      if (chad.phase === "walk") {
        chad.vx = 1.2;

        // Jump over bus A (left side, every cycle)
        if (busA.x > 0 && busA.x - chadRight > 0 && busA.x - chadRight < 60 && chad.onGround) {
          chad.phase = "busjump";
          chad.vy = -8;
          chad.vx = 1.5;
          chad.onGround = false;
          sfxJump();
        }

        // Pick up dropped item from last cycle
        if (drop.active && drop.settled && !chad.hasItem) {
          if (Math.abs(chad.x + CHAD_W / 2 - drop.x) < 25) {
            chad.hasItem = true;
            drop.active = false;
            sfxCollect();
          }
        }

        // Jump for head-bounce on bab1
        if (!interacted1 && bab1.x - chadRight > 15 && bab1.x - chadRight < 50 && chad.onGround) {
          chad.phase = "jumping";
          chad.vy = -8.5;
          chad.vx = 1.6;
          chad.onGround = false;
          sfxJump();
        }

        // Walk into bab2 → side collision
        if (interacted1 && !interacted2) {
          const dist = bab2.x - chadRight;
          if (dist > -10 && dist < 8) {
            chad.phase = "shoved";
            chad.vx = -3;
            chad.vy = -4;
            chad.onGround = false;
            chad.invincibleUntil = elapsed + 2000;
            interacted2 = true;

            const scold = SCOLDINGS[scoldIdx]!;
            bab2.scoldText = scold;
            bab2.scoldUntil = elapsed + 1500;
            if (!spoke2) { spoke2 = true; speakScold(scold); }

            // Drop item — bounces left toward pickup zone
            if (chad.hasItem) {
              chad.hasItem = false;
              drop.active = true;
              drop.settled = false;
              drop.x = chad.x;
              drop.y = chad.y;
              drop.vx = -7;
              drop.vy = -5;
            }

            // Spawn treacherous bus B
            busB.x = W + 80;
            busB.active = true;
          }
        }
      }

      if (chad.phase === "busjump") {
        chad.vx = 1.5;
        if (chad.onGround) chad.phase = "walk";
      }

      if (chad.phase === "jumping") {
        chad.vx = 1.6;
        // Head-bounce detection on bab1
        if (!interacted1 && chad.vy > 0) {
          const chadBottom = chad.y + 24 * SCALE;
          if (chadBottom >= babY && chadBottom <= babY + 15 &&
              chadRight > bab1.x && chad.x < bab1.x + BAB_W) {
            chad.phase = "bounce";
            chad.vy = -10;
            chad.onGround = false;
            interacted1 = true;
            bab1.scoldText = "блять";
            bab1.scoldUntil = elapsed + 1500;
            bab1.stunUntil = elapsed + 800;
            if (!spoke1) { spoke1 = true; speakScold("блять"); }
          }
        }
        if (chad.onGround) chad.phase = "walk";
      }

      if (chad.phase === "bounce") {
        chad.vx = 1.4;
        if (chad.onGround) chad.phase = "walk";
      }

      if (chad.phase === "shoved") {
        if (chad.onGround && chad.vy >= 0) {
          chad.phase = "walk";
          chad.vx = 1.2;
        }
      }

      // Apply movement
      chad.x += chad.vx;

      // Gravity
      if (!chad.onGround) {
        chad.vy += 0.4;
        chad.y += chad.vy;
        if (chad.y >= groundY) {
          chad.y = groundY;
          chad.vy = 0;
          chad.onGround = true;
        }
      }

      // --- Item bounce physics ---
      if (drop.active && !drop.settled) {
        drop.vy += 0.35;
        drop.x += drop.vx;
        drop.y += drop.vy;

        if (drop.y >= ITEM_GND_Y) {
          drop.y = ITEM_GND_Y;
          if (Math.abs(drop.vy) < 2) {
            // Slide on ground with friction
            drop.vy = 0;
            drop.vx *= 0.93;
            if (Math.abs(drop.vx) < 0.15) {
              drop.vx = 0;
              drop.settled = true;
            }
          } else {
            // Bounce
            drop.vy *= -0.4;
            drop.vx *= 0.75;
          }
        }
      }

      // Draw dropped item
      if (drop.active) {
        drawSprite(ctx, breadLoafSprite, drop.x, drop.y, ITEM_SC);
      }

      // --- Draw Chad (flash when invincible) ---
      const isInvincible = chad.invincibleUntil > elapsed;
      if (!(isInvincible && Math.floor(elapsed / 100) % 2 === 0)) {
        const chadSprite = !chad.onGround
          ? chadJump
          : (Math.floor(elapsed / WALK_MS) % 2 === 0 ? chadWalk1 : chadWalk2);
        drawSprite(ctx, chadSprite, chad.x, chad.y, SCALE);
      }

      // --- Sacred Potato — collectible, then follows Chad ---
      if (!potato.collected) {
        // Check if Chad is under the potato
        const chadCenterX = chad.x + CHAD_W / 2;
        if (Math.abs(chadCenterX - potato.x) < 30) {
          potato.collected = true;
        }
        // Idle bob at home position
        potato.y = POTATO_HOME_Y + Math.sin(elapsed / 800) * 6;
      } else {
        // Lerp toward position above Chad
        const targetX = chad.x + CHAD_W / 2 - 8 * SCALE;
        const targetY = chad.y + POTATO_HOVER_OFFSET + Math.sin(elapsed / 600) * 3;
        potato.x += (targetX - potato.x) * 0.12;
        potato.y += (targetY - potato.y) * 0.12;
      }
      // Glow
      ctx.fillStyle = "rgba(255, 238, 136, 0.12)";
      ctx.beginPath();
      ctx.arc(potato.x + 8 * SCALE, potato.y + 5 * SCALE, 18, 0, Math.PI * 2);
      ctx.fill();
      drawSprite(ctx, potatoSprite, potato.x, potato.y, SCALE);

      // --- Cycle reset ---
      if (chad.x > W + 60) {
        resetCycle();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  return (
    <div style={styles.container}>
      {/* Title — typed during typing phase, stays as scene title */}
      <div style={{
        ...styles.title,
        fontSize: phase === "typing" ? 15 : 28,
        transition: "font-size 0.6s ease",
      }}>
        {phase === "typing" && <span style={styles.prefix}>C.H.A.D. &gt; </span>}
        <span style={styles.titleText}>{display}</span>
        {phase === "typing" && (
          <span style={{ ...styles.cursor, opacity: blink ? 1 : 0 }}>_</span>
        )}
      </div>

      {/* Scene canvas — fades in */}
      {(phase === "scene" || phase === "ready") && (
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{
            ...styles.canvas,
            opacity: phase === "ready" ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />
      )}

      {/* Press enter */}
      {phase === "ready" && (
        <div style={{ ...styles.prompt, opacity: blink ? 1 : 0.2 }}>
          PRESS ENTER
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#0a0a1a",
    gap: 16,
  },
  title: {
    fontFamily: "monospace",
    lineHeight: 1.6,
    textAlign: "center",
  },
  prefix: {
    color: "#555",
    fontSize: 15,
  },
  titleText: {
    color: "#FFD54F",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  cursor: {
    color: "#FFD54F",
    fontWeight: "bold",
    transition: "opacity 0.1s",
  },
  canvas: {
    imageRendering: "pixelated" as const,
    maxWidth: "95vw",
  },
  prompt: {
    color: "#FFD54F",
    fontFamily: "monospace",
    fontSize: 13,
    letterSpacing: 4,
    transition: "opacity 0.15s",
  },
};
