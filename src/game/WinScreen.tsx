interface Props {
  totalScore: number;
  mentorAvatar: string;
  mentorColor: string;
  messageColor: string;
  winMessage: string;
  wordsLearned: { script: string; translation: string }[];
  sacredItemLine: string;
  onBackToLevels: () => void;
}

export function WinScreen({
  totalScore,
  mentorAvatar,
  mentorColor,
  messageColor,
  winMessage,
  wordsLearned,
  sacredItemLine,
  onBackToLevels,
}: Props) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ ...styles.avatar, background: mentorColor }}>
          {mentorAvatar}
        </div>
        <div style={{ ...styles.message, color: messageColor }}>
          {winMessage}
        </div>
      </div>

      <div style={styles.scoreSection}>
        <div style={styles.label}>Total Score</div>
        <div style={styles.score}>{totalScore}</div>
      </div>

      <div style={styles.wordsLearned}>
        <div style={styles.wordsTitle}>Words Learned</div>
        <div style={styles.wordGrid}>
          {wordsLearned.map((w) => (
            <div key={w.script} style={styles.wordItem}>
              <span style={styles.wordCyrillic}>{w.script}</span>
              <span style={styles.wordTranslation}>{w.translation}</span>
            </div>
          ))}
        </div>
      </div>

      <button style={styles.button} onClick={onBackToLevels}>
        Back to Levels
      </button>

      <div style={styles.footer}>{sacredItemLine}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: "var(--game-pad)",
    gap: "var(--game-gap-sm)",
    overflowY: "auto",
  },
  card: {
    display: "flex",
    gap: 16,
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    maxWidth: 460,
    width: "100%",
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    flexShrink: 0,
  },
  message: {
    fontSize: 16,
    lineHeight: 1.6,
    fontStyle: "italic",
    whiteSpace: "pre-line",
  },
  scoreSection: {
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFD54F",
  },
  wordsLearned: {
    maxWidth: 460,
    width: "100%",
  },
  wordsTitle: {
    fontSize: 14,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: "center",
  },
  wordGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  wordItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 12px",
    background: "#1a1a2e",
    borderRadius: 8,
    fontSize: 13,
  },
  wordCyrillic: {
    color: "#FFD54F",
    fontWeight: "bold",
  },
  wordTranslation: {
    color: "#888",
    fontStyle: "italic",
  },
  button: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 8,
  },
  footer: {
    fontSize: 13,
    color: "#444",
    fontStyle: "italic",
    marginTop: 8,
  },
};
