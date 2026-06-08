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
} from "../engine/sprites";

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

    const chad = { x: -50, y: GROUND - 24 * SCALE, vy: 0, onGround: true };
    const bab1 = { x: 380, speed: 0.4 };
    const bab2 = { x: 500, speed: -0.3 };
    const marsh = { x: W + 80 };
    const marshSpeed = -3;
    let elapsed = 0;
    let animId: number;

    const loop = (now: number) => {
      elapsed = now;
      ctx.clearRect(0, 0, W, H);

      // Stars
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 20; i++) {
        const sx = (i * 137 + 50) % W;
        const sy = (i * 97 + 10) % (GROUND - 30);
        ctx.globalAlpha = 0.2 + (Math.sin(elapsed / 1000 + i) * 0.3 + 0.3);
        ctx.fillRect(sx, sy, 2, 2);
      }
      ctx.globalAlpha = 1;

      // Ground
      for (let tx = 0; tx < W; tx += 16 * SCALE) {
        drawSprite(ctx, groundTile, tx, GROUND, SCALE);
      }

      // Babushkas
      bab1.x += bab1.speed;
      if (bab1.x > 440 || bab1.x < 340) bab1.speed *= -1;
      drawSprite(ctx, babushkaSprite, bab1.x, GROUND - 22 * SCALE, SCALE, bab1.speed < 0);

      bab2.x += bab2.speed;
      if (bab2.x > 540 || bab2.x < 450) bab2.speed *= -1;
      drawSprite(ctx, babushkaSprite, bab2.x, GROUND - 22 * SCALE, SCALE, bab2.speed < 0);

      // Marshrutka
      marsh.x += marshSpeed;
      if (marsh.x < -120) marsh.x = W + 80 + Math.random() * 200;
      drawSprite(ctx, marshrutkaSprite, marsh.x, GROUND - 20 * SCALE, SCALE, true);

      // Chad — walks, jumps over marshrutka
      chad.x += 1.2;
      if (chad.x > W + 60) chad.x = -50;

      // Auto-jump when marshrutka is close
      const distToMarsh = marsh.x - chad.x;
      if (distToMarsh > 10 && distToMarsh < 70 && chad.onGround) {
        chad.vy = -8;
        chad.onGround = false;
      }

      // Gravity
      if (!chad.onGround) {
        chad.vy += 0.4;
        chad.y += chad.vy;
        if (chad.y >= GROUND - 24 * SCALE) {
          chad.y = GROUND - 24 * SCALE;
          chad.vy = 0;
          chad.onGround = true;
        }
      }

      const chadSprite = !chad.onGround
        ? chadJump
        : (Math.floor(elapsed / WALK_MS) % 2 === 0 ? chadWalk1 : chadWalk2);
      drawSprite(ctx, chadSprite, chad.x, chad.y, SCALE);

      // Sacred Potato floating
      const potatoY = 30 + Math.sin(elapsed / 800) * 6;
      ctx.fillStyle = "rgba(255, 238, 136, 0.12)";
      ctx.beginPath();
      ctx.arc(W / 2 + 8 * SCALE, potatoY + 5 * SCALE, 18, 0, Math.PI * 2);
      ctx.fill();
      drawSprite(ctx, potatoSprite, W / 2, potatoY, SCALE);

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
