import { useState, useRef, useEffect } from "react";
import type { VocabPack, InferenceResult, RevealLine } from "../types";
import type { CollectibleItem } from "../types/content";
import type { LevelScore } from "./scoring";
import { getItemSprite, drawSprite } from "../engine/sprites";
import { pronounceWord } from "../engine/audio";

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
  inferenceResult: InferenceResult;
  revealLines: RevealLine[];
  itemDefs: Map<string, CollectibleItem>;
  score: LevelScore;
  collectedPotato: boolean;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onBackToLevels: () => void;
}

export function RevealScreen({
  vocabPack,
  inferenceResult,
  revealLines,
  itemDefs,
  score,
  collectedPotato,
  hasNextLevel,
  onNextLevel,
  onBackToLevels,
}: Props) {
  const [revealedCount, setRevealedCount] = useState(0);
  const prevRevealedCount = useRef(0);

  const targetWords = vocabPack.words.filter((w) => w.matchesItemId !== null);
  const allRevealed = revealedCount >= targetWords.length;

  // Auto-pronounce when a new word is revealed
  useEffect(() => {
    if (revealedCount > prevRevealedCount.current && revealedCount <= targetWords.length) {
      const word = targetWords[revealedCount - 1];
      if (word) pronounceWord(word);
    }
    prevRevealedCount.current = revealedCount;
  }, [revealedCount, targetWords]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>WHAT YOU LEARNED</h1>
      <div style={styles.subtitle}>(whether you wanted to or not)</div>

      <div style={styles.revealList}>
        {targetWords.slice(0, revealedCount).map((word) => {
          const result = inferenceResult.matches.find(
            (m) => m.vocabWordId === word.id
          );
          const reveal = revealLines.find((r) => r.vocabWordId === word.id);
          const item = word.matchesItemId
            ? itemDefs.get(word.matchesItemId)
            : null;

          return (
            <div key={word.id} style={styles.revealCard}>
              <div style={styles.wordRow}>
                <div style={styles.wordStack}>
                  <span style={styles.cyrillicWord}>{word.cyrillic}</span>
                  {word.pronunciation && <span style={styles.pronunciation}>{word.pronunciation}</span>}
                  {word.ipa && <span style={styles.ipa}>{word.ipa}</span>}
                </div>
                <span style={styles.arrow}>&rarr;</span>
                <span style={styles.translation}>{word.translation}</span>
              </div>
              {item && (
                <div style={styles.itemRow}>
                  <ItemSpriteThumb itemId={item.id} />
                  <span style={styles.itemName}>{item.name}</span>
                  {result?.correct && (
                    <span style={styles.checkmark}>&#10003;</span>
                  )}
                </div>
              )}
              <div style={styles.anyaLine}>
                {reveal
                  ? result?.correct
                    ? reveal.correct
                    : reveal.wrong
                  : ""}
              </div>
            </div>
          );
        })}
      </div>

      {!allRevealed ? (
        <button
          style={styles.nextButton}
          onClick={() => setRevealedCount((c) => c + 1)}
        >
          Next word &rarr;
        </button>
      ) : (
        <div style={styles.scoreSection}>
          {collectedPotato && (
            <div style={styles.potatoLine}>
              The Sacred Potato acknowledges your devotion. (+100)
            </div>
          )}
          <div style={styles.scoreBreakdown}>
            <div>Run score: {score.runScore}</div>
            <div>Vocab score: {score.inferenceScore}</div>
            {score.potatoBonus > 0 && (
              <div>Potato bonus: {score.potatoBonus}</div>
            )}
            <div style={styles.totalScore}>Total: {score.total}</div>
          </div>

          <div style={styles.buttonRow}>
            {hasNextLevel ? (
              <button style={styles.nextLevelButton} onClick={onNextLevel}>
                Next Level &rarr;
              </button>
            ) : (
              <button style={styles.nextLevelButton} onClick={onBackToLevels}>
                Back to Levels
              </button>
            )}
          </div>
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
    height: "100vh",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: 32,
    overflowY: "auto",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD54F",
    letterSpacing: 2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 32,
  },
  revealList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    maxWidth: 500,
  },
  revealCard: {
    background: "#1a1a2e",
    borderRadius: 12,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  wordRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 20,
  },
  wordStack: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  },
  cyrillicWord: {
    fontWeight: "bold",
    color: "#FFD54F",
    fontSize: 24,
    letterSpacing: 1,
  },
  pronunciation: {
    color: "#FFD54F",
    fontSize: 13,
    opacity: 0.8,
  },
  ipa: {
    color: "#888",
    fontSize: 12,
    fontFamily: "monospace",
  },
  arrow: {
    color: "#555",
  },
  translation: {
    color: "#aaa",
    fontStyle: "italic",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    color: "#888",
  },
  itemName: {
    flex: 1,
  },
  checkmark: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "bold",
  },
  anyaLine: {
    fontSize: 14,
    color: "#ce93d8",
    lineHeight: 1.5,
    fontStyle: "italic",
    borderLeft: "3px solid #6C3483",
    paddingLeft: 12,
  },
  nextButton: {
    marginTop: 24,
    background: "#FFD54F",
    color: "#000",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  scoreSection: {
    marginTop: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  potatoLine: {
    fontSize: 16,
    color: "#C4A035",
    fontStyle: "italic",
  },
  scoreBreakdown: {
    fontSize: 16,
    color: "#888",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  totalScore: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD54F",
    marginTop: 8,
  },
  buttonRow: {
    display: "flex",
    gap: 16,
    marginTop: 16,
  },
  nextLevelButton: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
};
