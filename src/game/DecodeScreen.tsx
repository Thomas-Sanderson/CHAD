import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import type { CollectibleItem } from "../types/content";
import type { DecodeResult } from "./scoring";
import { getItemSprite, drawSprite } from "../engine/sprites";
import { speakText, speakScold } from "../engine/audio";
import { sfxGateSuccess } from "../engine/sfx";
import { isTouchDevice } from "../engine/touch";

const CYRILLIC = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function isCyrillic(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text);
}

function getAlphabet(text: string): string {
  return isCyrillic(text) ? CYRILLIC : LATIN;
}

/** Pick `count` random letters from alphabet, excluding `exclude`. */
function randomLetters(alphabet: string, count: number, exclude: string): string[] {
  const pool = [...alphabet].filter((c) => c !== exclude);
  const result: string[] = [];
  while (result.length < count && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(idx, 1)[0]!);
  }
  return result;
}

/** Build 3 shuffled options for one letter position (1 correct + 2 distractors). */
function buildOptions(correct: string, alphabet: string): string[] {
  const distractors = randomLetters(alphabet, 2, correct);
  const all = [correct, ...distractors];
  // Fisher-Yates shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j]!, all[i]!];
  }
  return all;
}

const CHAD_QUIPS = [
  "What even IS this?",
  "This wasn't on the list...",
  "I don't remember grabbing this.",
  "Is this... food?",
  "The label is all squiggly.",
];

function ItemSpriteThumb({ itemId }: { itemId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sprite = getItemSprite(itemId);
    if (!sprite) return;
    const spriteW = (sprite[0]?.length ?? 0) * 3;
    const spriteH = sprite.length * 3;
    canvas.width = spriteW;
    canvas.height = spriteH;
    ctx.clearRect(0, 0, spriteW, spriteH);
    drawSprite(ctx, sprite, 0, 0, 3);
  }, [itemId]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 48, height: 39, imageRendering: "pixelated" }}
    />
  );
}

interface Props {
  mysteryCans: CollectibleItem[];
  mentorName: string;
  mentorAvatar: string;
  mentorColor: string;
  messageColor: string;
  scoldNo: string;
  onComplete: (results: DecodeResult[]) => void;
}

export function DecodeScreen({
  mysteryCans,
  mentorName,
  mentorAvatar,
  mentorColor,
  messageColor,
  scoldNo,
  onComplete,
}: Props) {
  const [canIndex, setCanIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [shaking, setShaking] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [results, setResults] = useState<DecodeResult[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const celebrateTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const unmounted = useRef(false);
  const quipIndex = useRef(Math.floor(Math.random() * CHAD_QUIPS.length));

  const currentCan = mysteryCans[canIndex];
  const letters = useMemo(
    () => (currentCan ? [...currentCan.script.toUpperCase()] : []),
    [currentCan]
  );
  const alphabet = useMemo(
    () => (currentCan ? getAlphabet(currentCan.script) : LATIN),
    [currentCan]
  );

  // Build letter options once per position
  const options = useMemo(
    () => {
      if (!letters[letterIndex]) return [];
      return buildOptions(letters[letterIndex], alphabet);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canIndex, letterIndex, alphabet]
  );

  // 3 options = 1 per WASD key (W, A, D)
  const wLetter = options[0] ?? null;
  const aLetter = options[1] ?? null;
  const dLetter = options[2] ?? null;

  // Speak the target letter aloud in the target language
  useEffect(() => {
    const target = letters[letterIndex];
    if (!target) return;
    const timer = setTimeout(() => speakText(target), 300);
    return () => clearTimeout(timer);
  }, [canIndex, letterIndex, letters]);

  // Clean up celebration timers on unmount
  useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
      for (const t of celebrateTimers.current) clearTimeout(t);
      celebrateTimers.current = [];
    };
  }, []);

  const handleCorrect = useCallback(() => {
    const letter = letters[letterIndex]!;
    setConfirmed((prev) => [...prev, letter]);
    setFeedback(null);

    const nextLetterIndex = letterIndex + 1;
    if (nextLetterIndex >= letters.length) {
      // Word complete — speak the full word
      setCelebrating(true);
      speakText(currentCan!.script);

      const result: DecodeResult = {
        itemId: currentCan!.id,
        script: currentCan!.script,
        wrongAttempts,
      };
      const newResults = [...results, result];
      setResults(newResults);

      const t = setTimeout(() => {
        if (unmounted.current) return;
        setCelebrating(false);
        const nextCan = canIndex + 1;
        if (nextCan >= mysteryCans.length) {
          sfxGateSuccess();
          onComplete(newResults);
        } else {
          setCanIndex(nextCan);
          setLetterIndex(0);
          setWrongAttempts(0);
          setConfirmed([]);
          setFeedback(null);
        }
      }, 2800);
      celebrateTimers.current.push(t);
    } else {
      setLetterIndex(nextLetterIndex);
    }
  }, [letterIndex, letters, currentCan, wrongAttempts, results, canIndex, mysteryCans.length, onComplete]);

  const handleWrong = useCallback(() => {
    const next = wrongAttempts + 1;
    setWrongAttempts(next);
    setShaking(true);
    const hints = currentCan?.hints;
    if (hints && next % 3 === 0) {
      const hintIdx = Math.min(Math.floor(next / 3) - 1, hints.length - 1);
      setFeedback(`${mentorName}: "${hints[hintIdx]}"`);
    } else {
      speakScold(scoldNo);
      setFeedback(`${mentorName}: "${scoldNo}"`);
    }
    setTimeout(() => setShaking(false), 500);
  }, [mentorName, scoldNo, wrongAttempts, currentCan]);

  // Keyboard handler for WASD — each key picks exactly one letter
  useEffect(() => {
    if (isTouchDevice || celebrating) return;

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      let picked: string | null = null;
      if (key === "W") picked = wLetter;
      else if (key === "A") picked = aLetter;
      else if (key === "D") picked = dLetter;
      if (!picked) return;

      if (picked === letters[letterIndex]) {
        handleCorrect();
      } else {
        handleWrong();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [wLetter, aLetter, dLetter, letterIndex, letters, celebrating, handleCorrect, handleWrong]);

  const handleTapLetter = (letter: string) => {
    if (celebrating) return;
    const correct = letters[letterIndex];
    if (letter === correct) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  if (!currentCan) return null;

  return (
    <div className="decode-screen" style={styles.container}>
      <div className="decode-header" style={styles.header}>
        <h1 className="decode-title" style={styles.title}>MYSTERY CAN</h1>
        <div className="decode-subtitle" style={styles.subtitle}>
          Spell it out, letter by letter
        </div>
      </div>

      <div className="decode-body">
        {/* Left: can info + Chad quip */}
        <div className="decode-left">
          <div style={styles.canCard}>
            <ItemSpriteThumb itemId={currentCan.id} />
            <div style={styles.canInfo}>
              <div style={styles.canName}>{currentCan.name}</div>
              <div style={styles.canDesc}>{currentCan.description}</div>
            </div>
          </div>
          <div style={styles.chadQuip}>
            &ldquo;{CHAD_QUIPS[quipIndex.current % CHAD_QUIPS.length]}&rdquo;
            <span style={styles.chadLabel}> — Chad</span>
          </div>

          {/* Mentor feedback */}
          <div style={styles.feedbackArea}>
            <div style={{ ...styles.avatar, background: mentorColor }}>
              {mentorAvatar}
            </div>
            <div style={{ ...styles.mentorBubble, color: feedback ? "#f44336" : messageColor }}>
              {feedback ?? `${mentorName} is watching...`}
            </div>
          </div>
        </div>

        {/* Right: letter boxes + picker */}
        <div className="decode-right">
          {/* Letter boxes */}
          <div style={styles.letterBoxRow}>
            {letters.map((_, i) => {
              const isConfirmed = i < confirmed.length;
              const isCurrent = i === letterIndex && !celebrating;
              return (
                <div
                  key={i}
                  style={{
                    ...styles.letterBox,
                    ...(isConfirmed ? styles.letterBoxConfirmed : {}),
                    ...(isCurrent ? styles.letterBoxCurrent : {}),
                    animation: isCurrent && shaking ? "shake 0.5s ease-in-out" : undefined,
                    fontSize: `clamp(16px, ${Math.min(5, 30 / letters.length)}vw, 28px)`,
                  }}
                >
                  {isConfirmed ? confirmed[i] : isCurrent ? "?" : "_"}
                </div>
              );
            })}
          </div>

          {celebrating && (
            <div style={styles.revealCard}>
              {currentCan.revealSpriteId && (
                <div style={styles.revealSprite}>
                  <ItemSpriteThumb itemId={currentCan.revealSpriteId} />
                </div>
              )}
              <div style={styles.revealScript}>{currentCan.script}!</div>
              <div style={styles.revealEnglish}>{currentCan.revealName ?? currentCan.name}</div>
              {currentCan.pronunciation && (
                <div style={styles.revealPronunciation}>{currentCan.pronunciation}</div>
              )}
            </div>
          )}

          {/* Letter picker */}
          {!celebrating && (
            isTouchDevice ? (
              // Mobile: tap to pick a letter
              <div style={styles.tapGrid}>
                {options.map((letter, i) => (
                  <button
                    key={`${canIndex}-${letterIndex}-${i}`}
                    style={styles.tapButton}
                    onClick={() => handleTapLetter(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ) : (
              // Desktop: WASD spatial grid — keys match keyboard layout
              <div style={styles.wasdGrid}>
                <div style={{ gridArea: "w" }}>
                  <button style={styles.wasdTile} onClick={() => wLetter && handleTapLetter(wLetter)}>
                    <span style={styles.wasdTileKey}>W</span>
                    <span style={styles.wasdTileLetter}>{wLetter ?? ""}</span>
                  </button>
                </div>
                <div style={{ gridArea: "a" }}>
                  <button style={styles.wasdTile} onClick={() => aLetter && handleTapLetter(aLetter)}>
                    <span style={styles.wasdTileKey}>A</span>
                    <span style={styles.wasdTileLetter}>{aLetter ?? ""}</span>
                  </button>
                </div>
                <div style={{ gridArea: "d" }}>
                  <button style={styles.wasdTile} onClick={() => dLetter && handleTapLetter(dLetter)}>
                    <span style={styles.wasdTileKey}>D</span>
                    <span style={styles.wasdTileLetter}>{dLetter ?? ""}</span>
                  </button>
                </div>
                <div style={styles.wasdHint}>Press W, A, or D</div>
              </div>
            )
          )}

          {/* Can progress */}
          {mysteryCans.length > 1 && (
            <div style={styles.canProgress}>
              Can {canIndex + 1} of {mysteryCans.length}
            </div>
          )}
        </div>
      </div>

      <style>{decodeCSS}</style>
    </div>
  );
}

const decodeCSS = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 213, 79, 0.4); }
    50% { box-shadow: 0 0 0 6px rgba(255, 213, 79, 0); }
  }

  @keyframes celebrate {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  .decode-header {
    text-align: center;
    flex-shrink: 0;
    width: 100%;
  }
  .decode-body {
    display: flex;
    flex-direction: row;
    gap: var(--game-gap, 12px);
    flex: 1;
    min-height: 0;
    width: 100%;
  }
  .decode-left {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: var(--game-gap, 12px);
    min-width: 0;
    justify-content: center;
  }
  .decode-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--game-gap, 12px);
    min-width: 0;
    justify-content: center;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    .decode-screen {
      padding: 8px 16px !important;
      gap: 6px !important;
      overflow-y: auto !important;
    }
    .decode-header {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }
    .decode-title {
      font-size: 16px !important;
      margin: 0 !important;
    }
    .decode-subtitle {
      font-size: 11px !important;
      margin: 0 !important;
    }
    .decode-right {
      gap: 8px;
    }
  }
`;

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100dvh",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: "var(--game-pad)",
    overflowY: "auto",
    gap: "var(--game-gap, 12px)",
  },
  header: {
    textAlign: "center",
    width: "100%",
  },
  title: {
    fontSize: "var(--game-font-lg)",
    fontWeight: "bold",
    color: "#FFD54F",
    letterSpacing: 2,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: "var(--game-font-sm)",
    color: "#555",
    marginBottom: 4,
  },
  canCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "#1a1a2e",
    borderRadius: 12,
    padding: "16px 20px",
  },
  canInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  canName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD54F",
  },
  canDesc: {
    fontSize: 13,
    color: "#888",
    fontStyle: "italic",
  },
  chadQuip: {
    fontSize: 14,
    color: "#aaa",
    fontStyle: "italic",
    padding: "8px 16px",
    background: "#111122",
    borderRadius: 8,
    borderLeft: "3px solid #555",
  },
  chadLabel: {
    color: "#666",
    fontSize: 12,
  },
  feedbackArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    padding: "8px 0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    flexShrink: 0,
  },
  mentorBubble: {
    fontSize: "var(--game-font-sm, 14px)",
    lineHeight: 1.4,
    fontStyle: "italic",
    borderLeft: "3px solid #6C3483",
    paddingLeft: 12,
    flex: 1,
  },
  letterBoxRow: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  letterBox: {
    width: 36,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    background: "#222",
    border: "2px solid #444",
    fontWeight: "bold",
    color: "#666",
    fontFamily: "monospace",
    transition: "all 0.2s",
  },
  letterBoxConfirmed: {
    background: "#3a2e00",
    borderColor: "#FFD54F",
    color: "#FFD54F",
  },
  letterBoxCurrent: {
    borderColor: "#FFD54F",
    color: "#FFD54F",
    animation: "pulse 1.5s infinite",
  },
  revealCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    background: "#1a2e1a",
    border: "2px solid #4CAF50",
    borderRadius: 12,
    padding: "16px 24px",
    animation: "celebrate 0.6s ease-in-out",
  },
  revealSprite: {
    imageRendering: "pixelated" as const,
  },
  revealScript: {
    fontSize: "clamp(22px, 4.5vw, 32px)",
    fontWeight: "bold",
    color: "#4CAF50",
    letterSpacing: 3,
  },
  revealEnglish: {
    fontSize: "clamp(14px, 2.5vw, 18px)",
    color: "#aaa",
  },
  revealPronunciation: {
    fontSize: "clamp(12px, 2vw, 15px)",
    color: "#FFD54F",
    fontStyle: "italic",
    letterSpacing: 1,
  },
  // Mobile tap grid
  tapGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    width: "100%",
    maxWidth: 240,
  },
  tapButton: {
    padding: "12px 0",
    fontSize: "clamp(18px, 4vw, 24px)",
    fontWeight: "bold",
    fontFamily: "monospace",
    background: "#1a1a2e",
    border: "2px solid #444",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  // Desktop WASD spatial grid
  wasdGrid: {
    display: "grid",
    gridTemplateAreas: `". w ." "a . d" ". hint ."`,
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "auto auto auto",
    gap: 8,
    justifyItems: "center",
  },
  wasdTile: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    background: "#2a2a3e",
    border: "2px solid #3a3a4e",
    borderRadius: 12,
    cursor: "pointer",
    gap: 2,
    transition: "border-color 0.15s, background 0.15s",
  },
  wasdTileKey: {
    color: "#666",
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  wasdTileLetter: {
    color: "#FFD54F",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "monospace",
    lineHeight: "1",
  },
  wasdHint: {
    gridArea: "hint",
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  canProgress: {
    fontSize: 12,
    color: "#555",
    marginTop: 8,
  },
};
