interface Props {
  deathText: string;
  quip: string;
  mentorAvatar: string;
  mentorColor: string;
  messageColor: string;
  onRestart: () => void;
}

export function DeathScreen({
  deathText,
  quip,
  mentorAvatar,
  mentorColor,
  messageColor,
  onRestart,
}: Props) {
  return (
    <div style={styles.container}>
      <div style={styles.deathText}>{deathText}</div>
      <div style={styles.mentorRow}>
        <div style={{ ...styles.avatar, background: mentorColor }}>{mentorAvatar}</div>
        <div style={{ ...styles.quip, color: messageColor }}>{quip}</div>
      </div>
      <button style={styles.button} onClick={onRestart}>
        Try Again
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
    height: "100vh",
    background: "#0a0a1a",
    gap: 32,
  },
  deathText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#cc2222",
    fontFamily: "monospace",
    letterSpacing: 6,
    textShadow: "0 0 20px rgba(204, 34, 34, 0.5)",
  },
  mentorRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    flexShrink: 0,
  },
  quip: {
    fontSize: 18,
    fontFamily: "monospace",
    fontStyle: "italic",
    maxWidth: 400,
    lineHeight: 1.5,
  },
  button: {
    background: "#FFD54F",
    color: "#000",
    border: "none",
    borderRadius: 20,
    padding: "14px 40px",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "monospace",
    cursor: "pointer",
    letterSpacing: 2,
  },
};
