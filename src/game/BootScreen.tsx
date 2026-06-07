import { useState, useEffect, useRef } from "react";

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

// Human-like typing: variable speed, occasional pauses
function humanDelay(): number {
  const base = 45 + Math.random() * 55;
  // Occasional longer pause (thinking)
  if (Math.random() < 0.08) return base + 150 + Math.random() * 200;
  return base;
}

function backspaceDelay(): number {
  return 25 + Math.random() * 25;
}

export function BootScreen({ onComplete }: Props) {
  const [display, setDisplay] = useState("");
  const [cursor, setCursor] = useState(true);
  const [done, setDone] = useState(false);
  const cancelled = useRef(false);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  // Skip on click/key
  useEffect(() => {
    const skip = () => {
      if (done) return;
      cancelled.current = true;
      setDisplay("Chad Rescues Nobody");
      setDone(true);
    };
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [done]);

  // Auto-advance after done
  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(onComplete, 1200);
    return () => clearTimeout(timer);
  }, [done, onComplete]);

  // Typing animation
  useEffect(() => {
    let active = true;

    async function sleep(ms: number): Promise<void> {
      return new Promise((r) => setTimeout(r, ms));
    }

    async function run() {
      for (const attempt of ATTEMPTS) {
        if (!active || cancelled.current) return;

        // Type forward
        for (let i = 0; i <= attempt.text.length; i++) {
          if (!active || cancelled.current) return;
          const partial = attempt.text.slice(0, i);
          setDisplay(partial);
          await sleep(humanDelay());

          // Hesitate before finishing some attempts
          if (attempt.hesitate > 0 && i === attempt.hesitate) {
            await sleep(400 + Math.random() * 300);
          }
        }

        if (!attempt.backspaceAll) {
          // Final answer — done
          setDone(true);
          return;
        }

        // Pause before backspacing (realizing it's wrong)
        await sleep(600 + Math.random() * 500);

        // Backspace — sometimes delete in chunks
        let remaining = attempt.text;
        while (remaining.length > 0) {
          if (!active || cancelled.current) return;
          // Sometimes delete 2-3 chars at once (holding backspace)
          const chunk = Math.random() < 0.3 ? Math.min(2 + Math.floor(Math.random() * 2), remaining.length) : 1;
          remaining = remaining.slice(0, -chunk);
          setDisplay(remaining);
          await sleep(backspaceDelay());
        }

        // Brief pause before next attempt
        await sleep(300 + Math.random() * 200);
      }
    }

    run();
    return () => { active = false; };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.terminal}>
        <div style={styles.prompt}>
          <span style={styles.prefix}>C.H.A.D. &gt; </span>
          <span style={styles.text}>{display}</span>
          <span style={{ ...styles.cursor, opacity: cursor ? 1 : 0 }}>_</span>
        </div>
      </div>
      {done && (
        <div style={styles.subtitle}>
          a language-learning platformer about groceries, tea, and poor life choices
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
    gap: 24,
  },
  terminal: {
    padding: "0 24px",
    maxWidth: 600,
  },
  prompt: {
    fontFamily: "monospace",
    fontSize: 22,
    lineHeight: 1.6,
  },
  prefix: {
    color: "#555",
  },
  text: {
    color: "#FFD54F",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  cursor: {
    color: "#FFD54F",
    fontWeight: "bold",
    transition: "opacity 0.1s",
  },
  subtitle: {
    color: "#555",
    fontFamily: "monospace",
    fontSize: 12,
    textAlign: "center",
    maxWidth: 400,
    opacity: 0,
    animation: "fadeIn 0.8s ease forwards",
  },
};
