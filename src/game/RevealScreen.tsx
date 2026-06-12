import { useState, useRef, useEffect, useCallback } from "react";
import type { VocabPack, InferenceResult, RevealLine } from "../types";
import type { CollectibleItem } from "../types/content";
import type { LevelScore } from "./scoring";
import { getItemSprite, drawSprite, heartFullSprite, heartEmptySprite } from "../engine/sprites";
import { pronounceWord, stopAll } from "../engine/audio";
import { sfxHeartRefill } from "../engine/sfx";
import {
  isSpeechAvailable,
  getSpeechConsent,
  setSpeechConsent,
  listenForWord,
} from "../engine/speechRecognition";

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

// Small canvas for drawing heart sprites in React
function HeartSprite({ full }: { full: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sprite = full ? heartFullSprite : heartEmptySprite;
    canvas.width = 14;
    canvas.height = 12;
    ctx.clearRect(0, 0, 14, 12);
    drawSprite(ctx, sprite, 0, 0, 2);
  }, [full]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 14, height: 12, imageRendering: "pixelated" }}
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
  hearts?: number;
  maxHearts?: number;
  sacredItemName?: string;
  onHeartsRefilled?: () => void;
  sortingAttempts?: Map<string, number>;
  runElapsed?: number;
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
  hearts = 3,
  maxHearts = 3,
  sacredItemName,
  onHeartsRefilled,
  sortingAttempts,
  runElapsed = 0,
}: Props) {
  const [revealedCount, setRevealedCount] = useState(0);
  const prevRevealedCount = useRef(0);
  const [heartsFilled, setHeartsFilled] = useState(0);
  const [showExtraLife, setShowExtraLife] = useState(false);
  const [showRefilled, setShowRefilled] = useState(false);
  const heartRefillDone = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);

  const targetWords = vocabPack.words.filter((w) => w.matchesItemId !== null);

  // --- Speech gate state ---
  const speechSupported = isSpeechAvailable();
  const [speechConsent, setSpeechConsentState] = useState<boolean | null>(
    () => getSpeechConsent(),
  );
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  const [speechState, setSpeechState] = useState<
    "idle" | "listening" | "success" | "fail" | "almost"
  >("idle");
  const [, setSpeechAttempts] = useState(0);
  const [speechFeedback, setSpeechFeedback] = useState("");
  const activeSpeechWord = useRef(-1);
  // Advance timers tracked so they can't fire after unmount
  const advanceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    const timers = advanceTimers.current;
    return () => { timers.forEach(clearTimeout); };
  }, []);

  const canUseSpeech = speechSupported && speechConsent === true;

  // When speech is active, the last word needs one extra increment
  // (speech gate completion) before we consider everything revealed.
  const allRevealed = canUseSpeech
    ? revealedCount > targetWords.length
    : revealedCount >= targetWords.length;

  // Reset speech state when advancing to next word
  useEffect(() => {
    setSpeechState("idle");
    setSpeechAttempts(0);
    setSpeechFeedback("");
    activeSpeechWord.current = -1;
  }, [revealedCount]);

  const handleConsentYes = useCallback(() => {
    setSpeechConsent(true);
    setSpeechConsentState(true);
    setShowConsentPrompt(false);
  }, []);

  const handleConsentNo = useCallback(() => {
    setSpeechConsent(false);
    setSpeechConsentState(false);
    setShowConsentPrompt(false);
  }, []);

  const handleMicClick = useCallback(async () => {
    if (speechConsent === null) {
      setShowConsentPrompt(true);
      return;
    }
    if (revealedCount === 0 || revealedCount > targetWords.length) return;
    const word = targetWords[revealedCount - 1];
    if (!word) return;

    const wordIdx = revealedCount - 1;
    activeSpeechWord.current = wordIdx;
    setSpeechState("listening");
    setSpeechFeedback("");

    stopAll();
    const result = await listenForWord(word.script, word.pronunciation);

    // Stale result — user already advanced past this word
    if (activeSpeechWord.current !== wordIdx) return;

    switch (result.type) {
      case "match": {
        setSpeechState("success");
        setSpeechFeedback(
          result.distance === 0
            ? `Your accent is... I won't comment. But yes. ${word.script}.`
            : `Close enough. ${word.script}. Moving on.`,
        );
        pronounceWord(word);
        advanceTimers.current.push(setTimeout(() => {
          if (activeSpeechWord.current === wordIdx) {
            setRevealedCount((c) => c + 1);
          }
        }, 1500));
        break;
      }
      case "no_match": {
        setSpeechAttempts((prev) => {
          const newAttempts = prev + 1;
          if (newAttempts >= 3) {
            setSpeechState("fail");
            setSpeechFeedback("...close enough. We'll work on it.");
            pronounceWord(word);
            advanceTimers.current.push(setTimeout(() => {
              if (activeSpeechWord.current === wordIdx) {
                setRevealedCount((c) => c + 1);
              }
            }, 1500));
          } else if (result.distance <= 5) {
            setSpeechState("almost");
            setSpeechFeedback(
              `Almost. It's ${word.pronunciation ?? word.script}, not... whatever that was.`,
            );
            pronounceWord(word);
          } else {
            setSpeechState("fail");
            setSpeechFeedback("Нет. Listen...");
            pronounceWord(word);
          }
          return newAttempts;
        });
        break;
      }
      case "no_speech":
        setSpeechState("idle");
        setSpeechFeedback("I didn't hear anything. Try again.");
        break;
      case "error":
        if (result.error === "not-allowed") {
          setSpeechConsentState(false);
          setSpeechFeedback("Microphone access denied.");
        } else if (result.error === "network" || result.error === "service-not-allowed") {
          setSpeechFeedback("Speech recognition blocked by browser. Try Chrome.");
        } else {
          setSpeechFeedback("Could not start microphone. Try again.");
        }
        setSpeechState("idle");
        break;
    }
  }, [speechConsent, revealedCount, targetWords]);

  const handleNextWord = useCallback(() => {
    activeSpeechWord.current = -1;
    setRevealedCount((c) => c + 1);
  }, []);

  // Prevent accidental tap-through from "Next word" to "Next Level"
  const [navReady, setNavReady] = useState(false);
  useEffect(() => {
    if (!allRevealed) { setNavReady(false); return; }
    const timer = setTimeout(() => setNavReady(true), 600);
    return () => clearTimeout(timer);
  }, [allRevealed]);

  // Heart refill animation when all words revealed and potato collected
  useEffect(() => {
    if (!allRevealed || !collectedPotato || heartRefillDone.current) return;
    heartRefillDone.current = true;

    const wasFullHealth = hearts === maxHearts;
    let i = 0;
    const interval = setInterval(() => {
      if (i < maxHearts) {
        sfxHeartRefill(i);
        setHeartsFilled(i + 1);
        i++;
      } else {
        clearInterval(interval);
        if (wasFullHealth && maxHearts < 5) {
          setShowExtraLife(true);
        } else if (!wasFullHealth) {
          setShowRefilled(true);
        }
        onHeartsRefilled?.();
      }
    }, 400);

    return () => clearInterval(interval);
  }, [allRevealed, collectedPotato, hearts, maxHearts, onHeartsRefilled]);

  // Auto-scroll reveal list to bottom
  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [revealedCount]);

  // Auto-pronounce when a new word is revealed
  useEffect(() => {
    if (revealedCount > prevRevealedCount.current && revealedCount <= targetWords.length) {
      const word = targetWords[revealedCount - 1];
      if (word) pronounceWord(word);
    }
    prevRevealedCount.current = revealedCount;
  }, [revealedCount, targetWords]);

  return (
    <div className="reveal-screen" style={styles.container}>
      <div className="reveal-header">
        <h1 className="reveal-title" style={styles.title}>WHAT YOU LEARNED</h1>
        <div className="reveal-subtitle" style={styles.subtitle}>(whether you wanted to or not)</div>
      </div>

      <div className="reveal-body">
        <div className="reveal-left" ref={listRef}>
          {targetWords.slice(0, revealedCount).map((word, idx) => {
            const result = inferenceResult.matches.find(
              (m) => m.vocabWordId === word.id
            );
            const reveal = revealLines.find((r) => r.vocabWordId === word.id);
            const item = word.matchesItemId
              ? itemDefs.get(word.matchesItemId)
              : null;

            const isFlashing =
              speechState === "success" &&
              idx === revealedCount - 1;

            return (
              <div
                key={word.id}
                className={isFlashing ? "speech-flash" : ""}
                style={{
                  ...styles.revealCard,
                  ...(isFlashing ? styles.greenFlash : {}),
                }}
              >
                <div style={styles.wordRow}>
                  <div style={styles.wordStack}>
                    <span style={styles.scriptWord}>{word.script}</span>
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

        <div className="reveal-right">
          <div className="reveal-right-scroll">
            <div style={styles.progressText}>
              {allRevealed
                ? `${targetWords.filter((w) => (sortingAttempts?.get(w.id) ?? 1) === 1).length} of ${targetWords.length} first try`
                : `Word ${Math.min(revealedCount + 1, targetWords.length)} of ${targetWords.length}`}
            </div>
            <div style={styles.progressRow}>
              {targetWords.map((word, i) => {
                let bg = "#333";
                if (i < revealedCount) {
                  const attempts = sortingAttempts?.get(word.id) ?? 1;
                  bg = attempts <= 1 ? "#4CAF50" : "#FF9800";
                } else if (i === revealedCount) {
                  bg = "#FFD54F";
                }
                return (
                  <div
                    key={i}
                    style={{ ...styles.progressDot, background: bg }}
                  />
                );
              })}
            </div>

            {allRevealed && (
              <div style={styles.scoreSection}>
                {collectedPotato && (
                  <>
                    <div style={styles.potatoLine}>
                      {sacredItemName ?? "The Sacred Potato"} acknowledges your devotion. (+100)
                    </div>
                    <div style={styles.heartsRow}>
                      {Array.from({ length: maxHearts }, (_, i) => (
                        <HeartSprite key={i} full={i < heartsFilled} />
                      ))}
                      {showExtraLife && (
                        <span style={styles.extraLife}>+1 Extra Life!</span>
                      )}
                      {showRefilled && (
                        <span style={styles.extraLife}>Lives refilled!</span>
                      )}
                    </div>
                  </>
                )}
                <div style={styles.scoreBreakdown}>
                  <div>Run score: {score.runScore}</div>
                  <div>Vocab score: {score.inferenceScore}</div>
                  {runElapsed > 0 && (
                    <div>Time: {Math.floor(runElapsed / 60000)}:{String(Math.floor((runElapsed / 1000) % 60)).padStart(2, "0")}</div>
                  )}
                  {score.potatoBonus > 0 && (
                    <div>{(sacredItemName ?? "The Sacred Potato").replace("The Sacred ", "")} bonus: {score.potatoBonus}</div>
                  )}
                  {score.decodeBonus > 0 && (
                    <div>Mystery can bonus: {score.decodeBonus}</div>
                  )}
                  {score.achievementBonus > 0 && (
                    <div>Achievement bonus: {score.achievementBonus}</div>
                  )}
                  <div style={styles.totalScore}>Total: {score.total}</div>
                </div>
              </div>
            )}
          </div>

          <div className="reveal-right-actions">
            {!allRevealed ? (
              showConsentPrompt ? (
                <div style={styles.consentCard}>
                  <div style={styles.consentText}>
                    Speech recognition sends audio to your browser&apos;s
                    speech service. No audio is stored by this game.
                  </div>
                  <div style={styles.consentButtons}>
                    <button
                      className="reveal-action-btn"
                      style={styles.consentYes}
                      onClick={handleConsentYes}
                    >
                      Enable speech
                    </button>
                    <button
                      className="reveal-action-btn"
                      style={styles.consentNo}
                      onClick={handleConsentNo}
                    >
                      No thanks
                    </button>
                  </div>
                </div>
              ) : (
                <div style={styles.speechArea}>
                  {speechFeedback && (
                    <div
                      style={{
                        ...styles.speechFeedback,
                        color:
                          speechState === "success"
                            ? "#4CAF50"
                            : speechState === "almost"
                              ? "#FF9800"
                              : "#ce93d8",
                      }}
                    >
                      {speechFeedback}
                    </div>
                  )}
                  <div style={styles.buttonPair}>
                    {(canUseSpeech ||
                      (speechSupported && speechConsent === null)) &&
                      revealedCount > 0 && (
                        <button
                          className={`speech-mic-btn${speechState === "listening" ? " listening" : ""}${speechState === "success" ? " success" : ""}`}
                          style={styles.micButton}
                          onClick={
                            canUseSpeech
                              ? handleMicClick
                              : () => setShowConsentPrompt(true)
                          }
                          disabled={
                            speechState === "listening" ||
                            speechState === "success"
                          }
                        >
                          {speechState === "listening"
                            ? "..."
                            : speechState === "success"
                              ? "\u2713"
                              : "\uD83C\uDFA4"}
                        </button>
                      )}
                    <button
                      className="reveal-action-btn"
                      style={styles.nextButton}
                      onClick={handleNextWord}
                      disabled={
                        speechState === "listening" ||
                        speechState === "success"
                      }
                    >
                      {revealedCount === 0 || !canUseSpeech
                        ? "Next word"
                        : "Skip"}{" "}
                      &rarr;
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div style={{ ...styles.buttonRow, opacity: navReady ? 1 : 0.4, pointerEvents: navReady ? "auto" : "none", transition: "opacity 0.3s" }}>
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
            )}
          </div>
        </div>
      </div>

      <style>{revealCSS}</style>
    </div>
  );
}

const revealCSS = `
  .reveal-header {
    text-align: center;
    flex-shrink: 0;
    width: 100%;
  }
  .reveal-body {
    display: flex;
    flex-direction: row;
    gap: var(--game-gap, 12px);
    flex: 1;
    min-height: 0;
    width: 100%;
  }
  .reveal-left {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: var(--game-list-gap, 8px);
    overflow-y: auto;
    min-height: 0;
  }
  .reveal-right {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--game-gap, 12px);
    min-width: 0;
    min-height: 0;
  }
  .reveal-right-scroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--game-gap, 12px);
  }
  .reveal-right-actions {
    flex-shrink: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }

  .speech-mic-btn {
    transition: all 0.2s;
  }
  .speech-mic-btn.listening {
    animation: pulse-mic 1s infinite;
  }
  .speech-mic-btn.success {
    background: #4CAF50 !important;
    color: #fff !important;
  }
  .speech-mic-btn:disabled {
    opacity: 0.6;
    cursor: default;
  }
  .speech-flash {
    animation: flash-green 0.4s ease-out;
  }
  @keyframes pulse-mic {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 213, 79, 0.6); }
    50% { box-shadow: 0 0 0 8px rgba(255, 213, 79, 0); }
  }
  @keyframes flash-green {
    0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.8); }
    100% { box-shadow: 0 0 20px rgba(76, 175, 80, 0.3); }
  }

  @media (orientation: landscape) and (max-height: 500px) {
    .reveal-screen {
      padding: 8px 16px !important;
      gap: 6px !important;
    }
    .reveal-header {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 8px;
    }
    .reveal-title {
      font-size: 16px !important;
      margin: 0 !important;
    }
    .reveal-subtitle {
      font-size: 11px !important;
      margin: 0 !important;
    }
    .reveal-right {
      gap: 8px;
    }
    .reveal-action-btn {
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
    height: "100dvh",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: "var(--game-pad)",
    overflow: "hidden",
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
    marginBottom: 0,
  },
  revealCard: {
    background: "#1a1a2e",
    borderRadius: 12,
    padding: "var(--game-card-pad)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--game-card-gap)",
  },
  wordRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--game-word-gap)",
    fontSize: "var(--game-word-font)",
  },
  wordStack: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  },
  scriptWord: {
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
  progressText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "bold",
  },
  progressRow: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    transition: "background 0.3s",
  },
  nextButton: {
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
  heartsRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },
  extraLife: {
    color: "#FFD54F",
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  greenFlash: {
    boxShadow: "0 0 20px rgba(76, 175, 80, 0.4)",
    border: "1px solid #4CAF50",
    transition: "box-shadow 0.3s, border 0.3s",
  },
  speechArea: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 6,
    width: "100%",
  },
  speechFeedback: {
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center" as const,
    lineHeight: 1.4,
    maxWidth: 280,
  },
  buttonPair: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "2px solid #FFD54F",
    background: "transparent",
    fontSize: 20,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFD54F",
    flexShrink: 0,
  },
  consentCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 10,
    padding: 12,
    background: "#1a1a2e",
    borderRadius: 12,
    maxWidth: 300,
  },
  consentText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center" as const,
    lineHeight: 1.5,
  },
  consentButtons: {
    display: "flex",
    gap: 10,
  },
  consentYes: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 16,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: "bold",
    cursor: "pointer",
  },
  consentNo: {
    background: "transparent",
    color: "#888",
    border: "1px solid #555",
    borderRadius: 16,
    padding: "8px 16px",
    fontSize: 13,
    cursor: "pointer",
  },
};
