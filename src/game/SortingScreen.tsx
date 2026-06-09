import { useState, useRef, useEffect, useMemo } from "react";
import type { VocabPack, RevealLine } from "../types";
import type { CollectibleItem } from "../types/content";
import { getItemSprite, drawSprite } from "../engine/sprites";
import { pronounceWord, speakText, speakScold } from "../engine/audio";

function ItemSpriteThumb({ itemId }: { itemId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = getItemSprite(itemId);
    if (!sprite) return;

    const spriteW = (sprite[0]?.length ?? 0) * 2;
    const spriteH = sprite.length * 2;
    canvas.width = spriteW;
    canvas.height = spriteH;
    ctx.clearRect(0, 0, spriteW, spriteH);
    drawSprite(ctx, sprite, 0, 0, 2);
  }, [itemId]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 32, height: 26, imageRendering: "pixelated" }}
    />
  );
}

interface Props {
  vocabPack: VocabPack;
  collectedItemIds: string[];
  itemDefs: Map<string, CollectibleItem>;
  revealLines: RevealLine[];
  mentorName: string;
  mentorAvatar: string;
  mentorColor: string;
  messageColor: string;
  onComplete: () => void;
}

interface SortResult {
  vocabWordId: string;
  pickedItemId: string;
  correct: boolean;
}

export function SortingScreen({
  vocabPack,
  collectedItemIds,
  itemDefs,
  revealLines,
  mentorName,
  mentorAvatar,
  mentorColor,
  messageColor,
  onComplete,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<SortResult[]>([]);
  const [shaking, setShaking] = useState(false);

  const targetWords = useMemo(
    () => vocabPack.words.filter((w) => w.matchesItemId !== null),
    [vocabPack]
  );

  // Items still available in the bag (remove correctly matched ones)
  const matchedItemIds = useMemo(
    () => new Set(results.filter((r) => r.correct).map((r) => r.pickedItemId)),
    [results]
  );

  const bagItems = useMemo(() => {
    return collectedItemIds
      .filter((id) => !matchedItemIds.has(id))
      .map((id) => itemDefs.get(id))
      .filter((item): item is CollectibleItem => item !== undefined);
  }, [collectedItemIds, matchedItemIds, itemDefs]);

  const currentWord = targetWords[currentIndex];
  const done = currentIndex >= targetWords.length;

  // Speak the target word when a new word appears
  useEffect(() => {
    if (done || !currentWord) return;
    const timer = setTimeout(() => pronounceWord(currentWord), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handlePick = (itemId: string) => {
    if (picked !== null) return; // already picked, waiting for next

    const item = itemDefs.get(itemId);
    if (item) speakText(item.script);

    const correct = itemId === currentWord?.matchesItemId;
    setPicked(itemId);
    setIsCorrect(correct);

    if (correct) {
      setResults((prev) => [
        ...prev,
        { vocabWordId: currentWord!.id, pickedItemId: itemId, correct: true },
      ]);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      // Scold after the item speech finishes
      if (item) setTimeout(() => speakScold(item.name), 600);
    }
  };

  const handleNext = () => {
    setPicked(null);
    setIsCorrect(null);
    if (currentIndex + 1 >= targetWords.length) {
      setCurrentIndex(currentIndex + 1); // triggers done state
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRetry = () => {
    setPicked(null);
    setIsCorrect(null);
  };

  // Feedback text
  const getFeedback = (): { text: string; color: string } => {
    if (picked === null) {
      return { text: `${mentorName} is waiting...`, color: "#888" };
    }
    if (isCorrect) {
      const reveal = revealLines.find(
        (r) => r.vocabWordId === currentWord?.id
      );
      return {
        text: reveal?.correct ?? "Yes!",
        color: "#4CAF50",
      };
    }
    // Wrong pick
    const pickedItem = itemDefs.get(picked);
    return {
      text: `No... that's ${pickedItem?.name ?? "something else"}.`,
      color: "#f44336",
    };
  };

  const feedback = picked !== null || done ? getFeedback() : getFeedback();

  if (done) {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <div className="sorting-screen" style={styles.container}>
        <h1 className="sorting-title" style={styles.title}>BAG SORTED!</h1>
        <div className="sorting-subtitle" style={styles.subtitle}>
          {correctCount}/{targetWords.length} matched
        </div>
        <div style={styles.doneAvatar}>
          <div
            style={{
              ...styles.avatar,
              background: mentorColor,
            }}
          >
            {mentorAvatar}
          </div>
          <div style={{ ...styles.mentorBubble, color: messageColor }}>
            {correctCount === targetWords.length
              ? `${mentorName} nods approvingly.`
              : `${mentorName} sighs but accepts your effort.`}
          </div>
        </div>
        <button style={styles.completeButton} onClick={onComplete}>
          See results &rarr;
        </button>
        <style>{sortingCSS}</style>
      </div>
    );
  }

  return (
    <div className="sorting-screen" style={styles.container}>
      <div className="sorting-header">
        <h1 className="sorting-title" style={styles.title}>UNPACK THE BAG</h1>
        <div className="sorting-subtitle" style={styles.subtitle}>(show {mentorName} what you got)</div>
      </div>

      <div className="sorting-body">
        {/* Left 2/3: bag grid */}
        <div className="sorting-bag" style={styles.bagGrid}>
          {bagItems.map((item) => {
            const isPickedItem = picked === item.id;
            const borderColor = isPickedItem
              ? isCorrect
                ? "#4CAF50"
                : "#f44336"
              : "transparent";

            return (
              <button
                key={item.id}
                style={{
                  ...styles.itemButton,
                  borderColor,
                  animation:
                    isPickedItem && !isCorrect && shaking
                      ? "shake 0.5s ease-in-out"
                      : undefined,
                }}
                onClick={() => handlePick(item.id)}
                disabled={picked !== null}
              >
                <ItemSpriteThumb itemId={item.id} />
                <span style={styles.itemName}>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right 1/3: word prompt + picked flash + progress + feedback + button */}
        <div className="sorting-right">
          {/* Current word prompt */}
          <div className="sorting-word" style={styles.wordPrompt}>
            <span style={styles.wordScript}>{currentWord?.script}</span>
            {currentWord?.pronunciation && (
              <span style={styles.wordPronunciation}>
                {currentWord.pronunciation}
              </span>
            )}
          </div>

          {/* Picked item flash */}
          {picked !== null && (() => {
            const pickedItem = itemDefs.get(picked);
            return pickedItem ? (
              <div className="sorting-picked-flash" style={{
                ...styles.wordPrompt,
                borderColor: isCorrect ? "#4CAF50" : "#f44336",
                border: "2px solid",
                flexDirection: "row" as const,
                gap: 10,
                padding: "8px 16px",
                animation: "flash-in 0.25s ease-out",
              }}>
                <ItemSpriteThumb itemId={picked} />
                <span style={{ ...styles.wordScript, fontSize: "clamp(20px, 4vw, 28px)" }}>
                  {pickedItem.script}
                </span>
                <span style={styles.itemName}>{pickedItem.name}</span>
              </div>
            ) : null;
          })()}

          {/* Progress dots */}
          <div className="sorting-progress" style={styles.progressRow}>
            {targetWords.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.dot,
                  background:
                    i < currentIndex
                      ? "#4CAF50"
                      : i === currentIndex
                        ? "#FFD54F"
                        : "#333",
                }}
              />
            ))}
          </div>

          {/* Mentor feedback */}
          <div className="sorting-feedback" style={styles.feedbackArea}>
            <div
              style={{
                ...styles.avatar,
                background: mentorColor,
              }}
            >
              {mentorAvatar}
            </div>
            <div
              style={{
                ...styles.mentorBubble,
                color: feedback.color,
              }}
            >
              {isCorrect && picked !== null && (
                <span style={styles.feedbackIcon}>&#10003; </span>
              )}
              {isCorrect === false && picked !== null && (
                <span style={styles.feedbackIcon}>&#10007; </span>
              )}
              {feedback.text}
            </div>
          </div>

          {/* Spacer pushes button to bottom */}
          <div style={{ flex: 1 }} />

          {/* Action button pinned at bottom of right column */}
          {picked !== null && (
            <button
              className="sorting-action-btn"
              style={isCorrect ? styles.nextButton : styles.retryButton}
              onClick={isCorrect ? handleNext : handleRetry}
            >
              {isCorrect
                ? currentIndex + 1 >= targetWords.length
                  ? "See results \u2192"
                  : "Next \u2192"
                : "Try again"}
            </button>
          )}
        </div>
      </div>

      <style>{sortingCSS}</style>
    </div>
  );
}

const sortingCSS = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }

  @keyframes flash-in {
    0% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 1; transform: scale(1); }
  }

  /* Default: 2/3 bag + 1/3 text side-by-side */
  .sorting-header {
    text-align: center;
    flex-shrink: 0;
    width: 100%;
  }
  .sorting-body {
    display: flex;
    flex-direction: row;
    gap: var(--game-gap, 12px);
    flex: 1;
    min-height: 0;
    width: 100%;
  }
  .sorting-bag {
    flex: 2;
    min-width: 0;
  }
  .sorting-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--game-gap, 12px);
    min-width: 0;
  }

  /* Landscape on short viewports (mobile landscape) */
  @media (orientation: landscape) and (max-height: 500px) {
    .sorting-screen {
      padding: 8px 16px !important;
      gap: 6px !important;
      overflow-y: auto !important;
    }
    .sorting-header {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }
    .sorting-title {
      font-size: 16px !important;
      margin: 0 !important;
    }
    .sorting-subtitle {
      font-size: 11px !important;
      margin: 0 !important;
    }
    .sorting-right {
      gap: 8px;
    }
    .sorting-word {
      padding: 8px 16px !important;
      min-width: auto !important;
    }
    .sorting-bag {
      grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)) !important;
      gap: 6px !important;
    }
    .sorting-feedback {
      padding: 4px 0 !important;
    }
    .sorting-action-btn {
      padding: 8px 20px !important;
      font-size: 14px !important;
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
  wordPrompt: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "12px 24px",
    background: "#1a1a2e",
    borderRadius: 12,
    minWidth: 160,
  },
  wordScript: {
    fontSize: "clamp(28px, 6vw, 40px)",
    fontWeight: "bold",
    color: "#FFD54F",
    letterSpacing: 2,
  },
  wordPronunciation: {
    fontSize: "var(--game-font-sm, 13px)",
    color: "#FFD54F",
    opacity: 0.7,
  },
  progressRow: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    transition: "background 0.3s",
  },
  bagGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
    gap: "var(--game-list-gap, 8px)",
    overflowY: "auto",
    minHeight: 0,
    padding: "4px 0",
    alignContent: "start",
  },
  itemButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "10px 6px",
    background: "#1a1a2e",
    border: "2px solid transparent",
    borderRadius: 10,
    cursor: "pointer",
    transition: "border-color 0.2s, transform 0.2s",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "var(--game-font-xs, 11px)",
  },
  itemName: {
    fontSize: "var(--game-font-xs, 11px)",
    color: "#aaa",
    textAlign: "center",
    lineHeight: 1.2,
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
  feedbackIcon: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButton: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  retryButton: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  completeButton: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "14px 36px",
    fontSize: 18,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 16,
  },
  doneAvatar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    maxWidth: 400,
  },
};
