import { useEffect, useRef, useState } from "react";
import {
  drawSprite,
  chadWalk1,
  chadWalk2,
  babushkaSprite,
  marshrutkaSprite,
  potatoSprite,
  groundTile,
} from "../engine/sprites";

interface Props {
  onStart: () => void;
}

const W = 600;
const H = 300;
const GROUND = 250;
const SCALE = 3;
const WALK_FRAME_MS = 180;

interface Actor {
  x: number;
  y: number;
  speed: number;
  flipH: boolean;
}

export function TitleScreen({ onStart }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blink, setBlink] = useState(true);

  // Blink "PRESS ENTER"
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(id);
  }, []);

  // Skip on click/key
  useEffect(() => {
    const handler = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.code !== "Enter" && e.code !== "Space") return;
      onStart();
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [onStart]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Chad walks right, babushkas patrol, marshrutka zooms, potato floats
    const chad: Actor = { x: -60, y: GROUND - 24 * SCALE, speed: 1.2, flipH: false };
    const bab1: Actor = { x: 400, y: GROUND - 22 * SCALE, speed: 0.4, flipH: false };
    const bab2: Actor = { x: 520, y: GROUND - 22 * SCALE, speed: 0.3, flipH: true };
    const marsh: Actor = { x: W + 100, y: GROUND - 20 * SCALE, speed: -3.5, flipH: true };
    const potato = { x: W / 2, y: GROUND - 38 * SCALE, bobPhase: 0 };

    let elapsed = 0;
    let animId: number;

    const loop = (now: number) => {
      elapsed = now;

      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(0, 0, W, H);

      // Stars
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 30; i++) {
        const sx = (i * 137 + 50) % W;
        const sy = (i * 97 + 20) % (GROUND - 40);
        const opacity = 0.2 + (Math.sin(elapsed / 1000 + i) * 0.3 + 0.3);
        ctx.globalAlpha = opacity;
        ctx.fillRect(sx, sy, 2, 2);
      }
      ctx.globalAlpha = 1;

      // Ground tiles
      for (let tx = 0; tx < W; tx += 16 * SCALE) {
        drawSprite(ctx, groundTile, tx, GROUND, SCALE);
      }

      // Babushkas patrolling
      bab1.x += bab1.speed;
      if (bab1.x > 480 || bab1.x < 350) bab1.speed *= -1;
      bab1.flipH = bab1.speed < 0;
      drawSprite(ctx, babushkaSprite, bab1.x, bab1.y, SCALE, bab1.flipH);

      bab2.x += bab2.speed;
      if (bab2.x > 560 || bab2.x < 440) bab2.speed *= -1;
      bab2.flipH = bab2.speed < 0;
      drawSprite(ctx, babushkaSprite, bab2.x, bab2.y, SCALE, bab2.flipH);

      // Chad walking
      chad.x += chad.speed;
      if (chad.x > W + 60) chad.x = -60;
      const chadFrame = Math.floor(elapsed / WALK_FRAME_MS) % 2 === 0 ? chadWalk1 : chadWalk2;
      drawSprite(ctx, chadFrame, chad.x, chad.y, SCALE);

      // Marshrutka zooming past
      marsh.x += marsh.speed;
      if (marsh.x < -200) marsh.x = W + 100 + Math.random() * 200;
      drawSprite(ctx, marshrutkaSprite, marsh.x, marsh.y, SCALE, marsh.flipH);

      // Sacred Potato floating with halo bob
      potato.bobPhase = elapsed / 800;
      const bobY = potato.y + Math.sin(potato.bobPhase) * 6;
      // Halo glow
      ctx.fillStyle = "rgba(255, 238, 136, 0.15)";
      ctx.beginPath();
      ctx.arc(potato.x + 8 * SCALE, bobY + 4 * SCALE, 20, 0, Math.PI * 2);
      ctx.fill();
      drawSprite(ctx, potatoSprite, potato.x, bobY, SCALE);

      // Title text
      ctx.fillStyle = "#FFD54F";
      ctx.font = "bold 36px monospace";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 8;
      ctx.fillText("CHAD RESCUES NOBODY", W / 2, 60);
      ctx.shadowBlur = 0;

      // Subtitle
      ctx.fillStyle = "#888";
      ctx.font = "13px monospace";
      ctx.fillText("a language-learning platformer", W / 2, 85);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={styles.container}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={styles.canvas}
      />
      <div style={{ ...styles.prompt, opacity: blink ? 1 : 0.2 }}>
        PRESS ENTER
      </div>
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
    gap: 20,
  },
  canvas: {
    imageRendering: "pixelated",
    maxWidth: "95vw",
  },
  prompt: {
    color: "#FFD54F",
    fontFamily: "monospace",
    fontSize: 14,
    letterSpacing: 4,
    transition: "opacity 0.15s",
  },
};
