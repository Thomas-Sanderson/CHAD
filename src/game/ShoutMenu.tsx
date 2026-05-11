import { useCallback, useEffect } from "react";
import type { VocabWord } from "../types";
import { pronounceWord } from "../engine/audio";

interface Props {
  learnedWords: VocabWord[];
  onSelect: (word: VocabWord) => void;
  onCancel: () => void;
}

export function ShoutMenu({ learnedWords, onSelect, onCancel }: Props) {
  const handleSelect = useCallback(
    (word: VocabWord) => {
      pronounceWord(word);
      onSelect(word);
    },
    [onSelect]
  );

  // ESC to cancel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <h2 style={styles.title}>SHOUT A WORD</h2>
          <button style={styles.closeButton} onClick={onCancel}>
            &times;
          </button>
        </div>
        <div style={styles.subtitle}>
          What do you want from this shop?
        </div>
        <div style={styles.wordList}>
          {learnedWords.map((word) => (
            <button
              key={word.id}
              style={styles.wordButton}
              onClick={() => handleSelect(word)}
            >
              <span style={styles.wordCyrillic}>{word.cyrillic}</span>
              <span style={styles.wordTranslation}>{word.translation}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  panel: {
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 24,
    width: 340,
    maxWidth: "90%",
    maxHeight: "80%",
    overflowY: "auto",
    border: "2px solid #FFD54F",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    color: "#FFD54F",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    margin: 0,
    fontFamily: "monospace",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: 24,
    cursor: "pointer",
    padding: "0 8px",
  },
  subtitle: {
    color: "#888",
    fontSize: 13,
    marginBottom: 16,
    fontFamily: "monospace",
  },
  wordList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  wordButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2a2a3e",
    border: "1px solid #3a3a4e",
    borderRadius: 10,
    padding: "12px 16px",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  wordCyrillic: {
    color: "#FFD54F",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: "monospace",
  },
  wordTranslation: {
    color: "#aaa",
    fontSize: 14,
    fontStyle: "italic",
    fontFamily: "monospace",
  },
};
