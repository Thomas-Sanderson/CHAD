import { useState, useEffect, useCallback } from "react";
import type { BriefingScript, VocabPack, VocabWord } from "../types";
import { pronounceWord } from "../engine/audio";

interface Props {
  briefing: BriefingScript;
  vocabPack: VocabPack;
  onComplete: () => void;
  mentorName?: string;
  mentorAvatar?: string;
  mentorColor?: string;
}

export function BriefingScreen({ briefing, vocabPack, onComplete, mentorName = "Anya", mentorAvatar = "А", mentorColor = "#6C3483" }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(true);

  const advanceMessage = useCallback(() => {
    if (typing) {
      setTyping(false);
      return;
    }
    if (visibleCount < briefing.messages.length) {
      setVisibleCount((c) => c + 1);
      setTyping(true);
    }
  }, [typing, visibleCount, briefing.messages.length]);

  // Auto-show first message
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCount(1);
      setTyping(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation for each new message
  useEffect(() => {
    if (typing && visibleCount > 0) {
      const timer = setTimeout(() => setTyping(false), 800);
      return () => clearTimeout(timer);
    }
  }, [typing, visibleCount]);

  const allShown = visibleCount >= briefing.messages.length && !typing;

  const [phoneticHint, setPhoneticHint] = useState<{ word: string; pronunciation?: string; ipa?: string; until: number } | null>(null);

  // Clear phonetic hint after 3s
  useEffect(() => {
    if (!phoneticHint) return;
    const timer = setTimeout(() => setPhoneticHint(null), 3000);
    return () => clearTimeout(timer);
  }, [phoneticHint]);

  // Build a map of cyrillic words for highlighting
  const cyrillicWordMap = new Map(vocabPack.words.map((w) => [w.script, w]));

  function handleCyrillicClick(word: VocabWord) {
    pronounceWord(word);
    if (word.pronunciation || word.ipa) {
      setPhoneticHint({ word: word.script, pronunciation: word.pronunciation, ipa: word.ipa, until: Date.now() + 3000 });
    }
  }

  function highlightCyrillic(text: string): React.ReactNode[] {
    // Split on Cyrillic word boundaries
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    for (const [cyr, word] of cyrillicWordMap) {
      const segments = remaining.split(cyr);
      if (segments.length > 1) {
        const result: React.ReactNode[] = [];
        segments.forEach((seg, i) => {
          if (i > 0) {
            result.push(
              <span
                key={`cyr-${key++}`}
                style={styles.script}
                onClick={(e) => { e.stopPropagation(); handleCyrillicClick(word); }}
              >
                {cyr}
              </span>
            );
          }
          result.push(<span key={`txt-${key++}`}>{seg}</span>);
        });
        // Since each message has at most one Cyrillic word, return early
        return result;
      }
    }

    parts.push(<span key="full">{remaining}</span>);
    return parts;
  }

  return (
    <div style={styles.container}>
      <div style={styles.phone}>
        <div style={styles.phoneHeader}>
          <div style={styles.statusBar}>
            <span>9:41</span>
            <span>●●●○ 📶</span>
          </div>
          <div style={styles.contactBar}>
            <div style={{ ...styles.avatar, background: mentorColor }}>{mentorAvatar}</div>
            <div>
              <div style={styles.contactName}>{mentorName}</div>
              <div style={styles.contactStatus}>online</div>
            </div>
          </div>
        </div>

        <div style={styles.messages}>
          {briefing.messages.slice(0, visibleCount).map((msg, i) => {
            const isLast = i === visibleCount - 1;
            const showTyping = isLast && typing;

            return (
              <div
                key={msg.id}
                style={{
                  ...styles.messageBubble,
                  ...(msg.sender === "anya"
                    ? styles.anyaBubble
                    : styles.chadBubble),
                  opacity: showTyping ? 0.6 : 1,
                }}
              >
                {showTyping ? (
                  <span style={styles.typingDots}>...</span>
                ) : (
                  highlightCyrillic(msg.text)
                )}
              </div>
            );
          })}
        </div>

        {phoneticHint && (
          <div style={styles.phoneticHint}>
            <div style={styles.hintCyrillic}>{phoneticHint.word}</div>
            {phoneticHint.pronunciation && <div style={styles.hintPronunciation}>{phoneticHint.pronunciation}</div>}
            {phoneticHint.ipa && <div style={styles.hintIpa}>{phoneticHint.ipa}</div>}
          </div>
        )}

        <div style={styles.phoneFooter}>
          {allShown ? (
            <button style={styles.goButton} onClick={onComplete}>
              GO SHOPPING →
            </button>
          ) : (
            <button style={styles.tapButton} onClick={advanceMessage}>
              {visibleCount === 0 ? "Read messages" : "Next message"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: 32,
    background: "#1a1a2e",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
  },
  phone: {
    width: 380,
    maxWidth: "95vw",
    background: "#0f0f1a",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
  },
  phoneHeader: {
    background: "#1a1a2e",
    padding: "12px 16px 8px",
    borderBottom: "1px solid #2a2a3e",
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  contactBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#6C3483",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  contactName: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
  },
  contactStatus: {
    color: "#4CAF50",
    fontSize: 12,
  },
  messages: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto",
    minHeight: 0,
  },
  messageBubble: {
    padding: "10px 14px",
    borderRadius: 16,
    maxWidth: "85%",
    fontSize: 15,
    lineHeight: 1.5,
    transition: "opacity 0.3s",
  },
  anyaBubble: {
    background: "#2a2a3e",
    color: "#e0e0e0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  chadBubble: {
    background: "#1B5E20",
    color: "#e0e0e0",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  script: {
    fontWeight: "bold",
    color: "#FFD54F",
    letterSpacing: 1,
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationStyle: "dotted" as const,
    textUnderlineOffset: 3,
  },
  phoneticHint: {
    textAlign: "center" as const,
    padding: "8px 16px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 2,
  },
  hintCyrillic: {
    color: "#FFD54F",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  hintPronunciation: {
    color: "#FFD54F",
    fontSize: 14,
    opacity: 0.8,
  },
  hintIpa: {
    color: "#aaa",
    fontSize: 12,
    fontFamily: "monospace",
    opacity: 0.7,
  },
  typingDots: {
    letterSpacing: 3,
    animation: "pulse 1s infinite",
  },
  phoneFooter: {
    padding: 16,
    borderTop: "1px solid #2a2a3e",
    display: "flex",
    justifyContent: "center",
  },
  tapButton: {
    background: "#2a2a3e",
    color: "#aaa",
    border: "none",
    borderRadius: 20,
    padding: "10px 24px",
    fontSize: 14,
    cursor: "pointer",
    width: "100%",
  },
  goButton: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 20,
    padding: "12px 32px",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: 1,
    width: "100%",
  },
};
