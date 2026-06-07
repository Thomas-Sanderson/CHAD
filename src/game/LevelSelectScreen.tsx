import type { LevelConfig } from "../types/skin";

interface LevelProgress {
  completed: boolean;
  score: number;
}

interface Props {
  levels: LevelConfig[];
  progress: Map<string, LevelProgress>;
  onSelectLevel: (index: number) => void;
  skinName?: string;
  onBackToSkins?: () => void;
}

export function LevelSelectScreen({ levels, progress, onSelectLevel, skinName, onBackToSkins }: Props) {
  return (
    <div style={styles.container}>
      {onBackToSkins && (
        <button style={styles.backButton} onClick={onBackToSkins}>
          &larr; Change country
        </button>
      )}
      <div style={styles.header}>
        <h1 style={styles.title}>CHAD RESCUES NOBODY</h1>
        {skinName && <div style={styles.skinLabel}>{skinName}</div>}
        <div style={styles.subtitle}>A language-learning platformer about groceries, tea, and poor life choices</div>
      </div>

      <div style={styles.levelList}>
        {levels.map((level, index) => {
          const prog = progress.get(level.id);
          const prevCompleted = index === 0 || progress.get(levels[index - 1]!.id)?.completed;
          const unlocked = prevCompleted;
          const completed = prog?.completed ?? false;

          return (
            <button
              key={level.id}
              style={{
                ...styles.levelCard,
                ...(unlocked ? {} : styles.lockedCard),
                ...(completed ? styles.completedCard : {}),
              }}
              onClick={() => unlocked && onSelectLevel(index)}
              disabled={!unlocked}
            >
              <div style={styles.levelNumber}>
                {completed ? "\u2713" : unlocked ? `${index + 1}` : "\uD83D\uDD12"}
              </div>
              <div style={styles.levelInfo}>
                <div style={{
                  ...styles.levelName,
                  ...(unlocked ? {} : styles.lockedText),
                }}>
                  {level.name}
                </div>
                <div style={styles.levelWords}>
                  {level.vocabPack.words
                    .filter(w => w.matchesItemId !== null)
                    .map(w => w.script)
                    .join("  ")}
                </div>
                {completed && prog && (
                  <div style={styles.levelScore}>Score: {prog.score}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div style={styles.footer}>
        Arrow keys to move. Space to jump. Collect what Anya asked for.
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    overflowY: "auto",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: 32,
    gap: 32,
  },
  backButton: {
    alignSelf: "flex-start",
    background: "none",
    border: "1px solid #333",
    borderRadius: 8,
    color: "#888",
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  skinLabel: {
    fontSize: 14,
    color: "#FFD54F",
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  header: {
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFD54F",
    letterSpacing: 3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    maxWidth: 400,
  },
  levelList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    maxWidth: 440,
  },
  levelCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "16px 20px",
    background: "#1a1a2e",
    border: "2px solid #2a2a3e",
    borderRadius: 12,
    cursor: "pointer",
    textAlign: "left",
    color: "#fff",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    fontSize: "inherit",
  },
  lockedCard: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  completedCard: {
    borderColor: "#4CAF50",
  },
  levelNumber: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#2a2a3e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD54F",
    flexShrink: 0,
  },
  levelInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  levelName: {
    fontSize: 16,
    fontWeight: 600,
  },
  lockedText: {
    color: "#666",
  },
  levelWords: {
    fontSize: 13,
    color: "#FFD54F",
    letterSpacing: 1,
    opacity: 0.7,
  },
  levelScore: {
    fontSize: 12,
    color: "#4CAF50",
  },
  footer: {
    fontSize: 13,
    color: "#444",
    fontFamily: "monospace",
    textAlign: "center",
  },
};
