import { useState, useEffect } from "react";
import type { InferenceResult, VocabPack } from "../types";
import type { EarnedAchievement } from "./achievements";
import { AchievementBadge } from "./AchievementBadge";

// Skin-specific apartment building palettes
const BUILDING_THEMES: Record<string, {
  roof: string; body: string; windowBg: string; windowBorder: string;
  canopy: string; doorFrame: string; doorPanel: string; base: string;
  windowRadius: number;
}> = {
  belarus: {
    roof: "#6e6e6e",
    body: "#9a9a9a",
    windowBg: "#a8c4d8",
    windowBorder: "#6e6e6e",
    canopy: "#7a7a7a",
    doorFrame: "#6e6e6e",
    doorPanel: "#5a5a5a",
    base: "#7a7a7a",
    windowRadius: 1,
  },
  ethiopia: {
    roof: "#8b5e3c",
    body: "#c4a062",
    windowBg: "#3a3020",
    windowBorder: "#8b5e3c",
    canopy: "#8b5e3c",
    doorFrame: "#6d4c2a",
    doorPanel: "#4a3218",
    base: "#8b6e4a",
    windowRadius: 2,
  },
  italy: {
    roof: "#b85c38",
    body: "#e8d4b8",
    windowBg: "#6ba3c7",
    windowBorder: "#b85c38",
    canopy: "#a04828",
    doorFrame: "#8b6e4a",
    doorPanel: "#5a3a1a",
    base: "#c4a882",
    windowRadius: 10,
  },
};

function Building({ skinId }: { skinId: string }) {
  const t = BUILDING_THEMES[skinId] ?? BUILDING_THEMES.belarus!;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 160 }}>
      <div style={{ width: 160, height: 6, background: t.roof, borderRadius: "2px 2px 0 0" }} />
      <div style={{
        width: 160, background: t.body, display: "flex", flexDirection: "column",
        alignItems: "center", padding: "12px 16px", gap: 8,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{
              width: 28, height: 22, background: t.windowBg,
              borderRadius: t.windowRadius === 10 ? "10px 10px 2px 2px" : t.windowRadius,
              border: `2px solid ${t.windowBorder}`,
            }} />
          ))}
        </div>
        <div style={{ width: 100, height: 6, background: t.canopy, borderRadius: 2, marginTop: 4 }} />
        <div style={{
          display: "flex", gap: 2, padding: 4, background: t.doorFrame,
          borderRadius: "4px 4px 0 0",
        }}>
          <div style={{ width: 28, height: 48, background: t.doorPanel, borderRadius: 2 }} />
          <div style={{ width: 28, height: 48, background: t.doorPanel, borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ width: 160, height: 8, background: t.base }} />
    </div>
  );
}

interface Props {
  result: InferenceResult;
  vocabPack: VocabPack;
  gateFailText: string;
  gateFailQuiet: boolean;
  mentorName?: string;
  skinId?: string;
  achievements?: EarnedAchievement[];
  onRestart: () => void;
  onReveal: () => void;
}

export function GateScreen({
  result, vocabPack, gateFailText, gateFailQuiet,
  mentorName = "Anya", skinId = "belarus",
  achievements = [], onRestart, onReveal,
}: Props) {
  const [phase, setPhase] = useState<"checking" | "result">("checking");
  const [shakeClass, setShakeClass] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("result");
      if (!result.passed && !gateFailQuiet) {
        setShakeClass(true);
        setTimeout(() => setShakeClass(false), 600);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [result.passed, gateFailQuiet]);

  if (phase === "checking") {
    return (
      <div style={styles.container}>
        <Building skinId={skinId} />
        <div style={styles.checkingText}>Checking bags...</div>
      </div>
    );
  }

  if (result.passed) {
    const totalBonus = achievements.reduce((sum, a) => sum + a.def.points, 0);

    return (
      <div className="gate-screen" style={{ ...styles.container, justifyContent: "flex-start" }}>
        <div className="gate-success-scroll">
          <div className="gate-success">
            <div className="gate-left">
              <Building skinId={skinId} />
              <div style={styles.successText}>&#10003;&nbsp;Correct!</div>
              <div style={styles.subtitle}>
                Chad somehow got the right groceries.
              </div>
            </div>

            <div className="gate-right">
              {achievements.length > 0 && (
                <div style={styles.achievementSection}>
                  {achievements.map(({ def, isNew }) => (
                    <div key={def.id} style={{
                      ...styles.achievementCard,
                      borderColor: isNew ? def.iconColor : "#333",
                      opacity: isNew ? 1 : 0.7,
                    }}>
                      <div style={styles.achievementHeader}>
                        <AchievementBadge icon={def.icon} color={def.iconColor} size={28} />
                        <div style={styles.achievementTitleCol}>
                          <span style={styles.achievementTitle}>{def.title}</span>
                          {isNew && <span style={styles.achievementNew}>NEW</span>}
                        </div>
                        {def.points > 0 && (
                          <span style={styles.achievementPts}>+{def.points}</span>
                        )}
                      </div>
                      <div style={styles.achievementQuote}>
                        {def.subtitles[skinId] ?? def.subtitles.belarus ?? ""}
                      </div>
                    </div>
                  ))}
                  {totalBonus > 0 && (
                    <div style={styles.bonusTotal}>
                      Bonus: +{totalBonus} pts
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <button style={styles.continueButton} onClick={onReveal}>
          See what {mentorName} thinks &rarr;
        </button>
        <style>{gateCSS}</style>
      </div>
    );
  }

  // Fail
  const failTextStyle = gateFailQuiet ? styles.failTextQuiet : styles.failText;

  return (
    <div style={{ ...styles.container, ...(shakeClass ? styles.shaking : {}) }}>
      <div style={failTextStyle}>{gateFailText}</div>
      <div style={styles.failSubtitle}>
        {result.matches.filter((m) => m.correct).length} /{" "}
        {result.matches.length} correct
      </div>
      <div style={styles.chadSays}>Chad: &quot;But I&mdash;&quot;</div>
      <div style={styles.missingList}>
        {result.matches
          .filter((m) => !m.correct)
          .map((m) => {
            const word = vocabPack.words.find((w) => w.id === m.vocabWordId);
            return (
              <div key={m.vocabWordId} style={styles.missingItem}>
                &#10007; {word?.script ?? m.vocabWordId}
              </div>
            );
          })}
      </div>
      <button style={gateFailQuiet ? styles.retryButtonQuiet : styles.retryButton} onClick={onRestart}>
        Try again
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100dvh",
    overflow: "hidden",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: "var(--game-pad)",
    gap: 16,
    transition: "transform 0.05s",
  },
  shaking: {
    animation: "shake 0.5s ease-in-out",
  },
  checkingText: {
    fontSize: 20,
    color: "#888",
    marginTop: 24,
    fontFamily: "monospace",
  },
  successText: {
    fontSize: "clamp(24px, 5vw, 48px)",
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 12,
    whiteSpace: "nowrap",
  },
  subtitle: {
    fontSize: "var(--game-font-body)",
    color: "#888",
  },
  achievementSection: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  achievementCard: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    background: "#111122",
    border: "2px solid #333",
    borderRadius: 10,
    padding: "10px 14px",
  },
  achievementHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  achievementTitleCol: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  achievementTitle: {
    fontSize: 15,
    color: "#FFD54F",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  achievementNew: {
    fontSize: 9,
    color: "#0a0a1a",
    background: "#FFD54F",
    borderRadius: 3,
    padding: "1px 5px",
    fontWeight: "bold",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  achievementPts: {
    fontSize: 15,
    color: "#4CAF50",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  achievementQuote: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    lineHeight: 1.4,
    paddingLeft: 38,
    borderLeft: "2px solid #6C3483",
    marginLeft: 14,
  },
  bonusTotal: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    fontFamily: "monospace",
    textAlign: "right" as const,
    padding: "4px 0",
  },
  continueButton: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    minHeight: 44,
    flexShrink: 0,
  },
  failText: {
    fontSize: "var(--game-font-fail)",
    fontWeight: "bold",
    color: "#FF1744",
    textShadow: "0 0 30px rgba(255,23,68,0.5)",
    letterSpacing: 3,
  },
  failTextQuiet: {
    fontSize: "var(--game-font-fail-quiet)",
    fontWeight: 400,
    color: "#888",
    letterSpacing: 4,
  },
  failSubtitle: {
    fontSize: 18,
    color: "#888",
  },
  chadSays: {
    fontSize: 16,
    color: "#555",
    fontStyle: "italic",
    marginTop: 8,
  },
  missingList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },
  missingItem: {
    fontSize: 18,
    color: "#FF5252",
    fontWeight: "bold",
  },
  retryButton: {
    marginTop: 24,
    background: "#FF1744",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  retryButtonQuiet: {
    marginTop: 24,
    background: "#444",
    color: "#aaa",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    cursor: "pointer",
  },
};

const gateCSS = `
  .gate-success-scroll {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    -webkit-overflow-scrolling: touch;
  }
  .gate-success {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;
    width: 100%;
    max-width: 700px;
    padding: 8px 0;
  }
  .gate-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .gate-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1;
    min-width: 0;
  }

  @media (orientation: portrait), (max-width: 500px) {
    .gate-success {
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .gate-right {
      align-items: center;
      width: 100%;
    }
  }
`;
