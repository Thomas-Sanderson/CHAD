import { useState, useEffect } from "react";
import type { InferenceResult, VocabPack } from "../types";

interface Props {
  result: InferenceResult;
  vocabPack: VocabPack;
  gateFailText: string;
  gateFailQuiet: boolean;
  mentorName?: string;
  onRestart: () => void;
  onReveal: () => void;
}

export function GateScreen({ result, vocabPack, gateFailText, gateFailQuiet, mentorName = "Anya", onRestart, onReveal }: Props) {
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
        <div style={styles.building}>
          <div style={styles.buildingWindows}>
            <div style={styles.window} />
            <div style={styles.window} />
            <div style={styles.window} />
            <div style={styles.window} />
          </div>
          <div style={styles.door} />
        </div>
        <div style={styles.checkingText}>Checking bags...</div>
      </div>
    );
  }

  if (result.passed) {
    return (
      <div style={styles.container}>
        <div style={styles.successText}>&#10003; Correct!</div>
        <div style={styles.subtitle}>
          Chad somehow got the right groceries.
        </div>
        <button style={styles.continueButton} onClick={onReveal}>
          See what {mentorName} thinks &rarr;
        </button>
      </div>
    );
  }

  // Fail — style differs for quiet vs loud
  const failTextStyle = gateFailQuiet
    ? styles.failTextQuiet
    : styles.failText;

  return (
    <div
      style={{
        ...styles.container,
        ...(shakeClass ? styles.shaking : {}),
      }}
    >
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
    height: "100vh",
    overflowY: "auto",
    background: "#0a0a1a",
    color: "#fff",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    padding: 32,
    gap: 16,
    transition: "transform 0.05s",
  },
  shaking: {
    animation: "shake 0.5s ease-in-out",
  },
  building: {
    width: 120,
    height: 160,
    background: "#aa9977",
    borderRadius: "4px 4px 0 0",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  buildingWindows: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 16,
  },
  window: {
    width: 28,
    height: 24,
    background: "#88ccdd",
    borderRadius: 2,
  },
  door: {
    width: 36,
    height: 50,
    background: "#664422",
    borderRadius: "4px 4px 0 0",
    marginTop: "auto",
  },
  checkingText: {
    fontSize: 20,
    color: "#888",
    marginTop: 24,
    fontFamily: "monospace",
  },
  successText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
  },
  continueButton: {
    marginTop: 24,
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
  },
  failText: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#FF1744",
    textShadow: "0 0 30px rgba(255,23,68,0.5)",
    letterSpacing: 3,
  },
  failTextQuiet: {
    fontSize: 48,
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
