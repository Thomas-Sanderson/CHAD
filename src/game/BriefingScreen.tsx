import { useState, useEffect, useCallback, useRef } from "react";
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

  // Which word is shown in the side panel, and whether the hint (translation) is visible
  const [activeWord, setActiveWord] = useState<VocabWord | null>(null);
  const [showHint, setShowHint] = useState(false);
  // Key increments to re-trigger the flash animation even for the same word
  const [flashKey, setFlashKey] = useState(0);

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

  // Build a map of script words for highlighting
  const cyrillicWordMap = new Map(vocabPack.words.map((w) => [w.script, w]));

  // Auto-force the word from the most recent visible message
  useEffect(() => {
    if (visibleCount === 0 || typing) return;
    // Walk backwards through visible messages to find the latest one with a vocab word
    for (let i = visibleCount - 1; i >= 0; i--) {
      const msg = briefing.messages[i]!;
      for (const [, word] of cyrillicWordMap) {
        if (msg.text.includes(word.script)) {
          setActiveWord(word);
          setShowHint(false); // forced word shows pronunciation/IPA but not hint
          return;
        }
      }
    }
  }, [visibleCount, typing]);

  // Auto-scroll messages to bottom
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = messagesRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [visibleCount, typing]);

  function handleInlineClick(word: VocabWord) {
    setActiveWord(word);
    setShowHint(true);
    setFlashKey((k) => k + 1);
    pronounceWord(word);
  }

  function highlightCyrillic(text: string): React.ReactNode[] {
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
                onClick={(e) => { e.stopPropagation(); handleInlineClick(word); }}
              >
                {cyr}
              </span>
            );
          }
          result.push(<span key={`txt-${key++}`}>{seg}</span>);
        });
        return result;
      }
    }

    parts.push(<span key="full">{remaining}</span>);
    return parts;
  }

  return (
    <div className="briefing-screen" style={styles.container}>
      <div className="briefing-body">
        <div className="briefing-left">
          {activeWord ? (
            <div key={flashKey} className="briefing-word-panel" style={styles.wordPanel}>
              <div style={styles.wordScript}>{activeWord.script}</div>
              {activeWord.pronunciation && (
                <div style={styles.wordPronunciation}>{activeWord.pronunciation}</div>
              )}
              {activeWord.ipa && (
                <div style={styles.wordIpa}>{activeWord.ipa}</div>
              )}
              {showHint && activeWord.hint && (
                <div className="briefing-hint-reveal" style={styles.wordHintLine}>
                  {activeWord.hint}
                </div>
              )}
            </div>
          ) : (
            <div style={styles.wordPanelEmpty}>
              Tap a highlighted word
            </div>
          )}
        </div>

        <div className="briefing-right">
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

            <div ref={messagesRef} style={styles.messages}>
              {briefing.messages.slice(0, visibleCount).map((msg, i) => {
                const isLast = i === visibleCount - 1;
                const showTyping = isLast && typing;

                return (
                  <div
                    key={msg.id}
                    style={{
                      ...styles.messageBubble,
                      ...(msg.sender === "mentor"
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
      </div>

      <style>{briefingCSS}</style>
    </div>
  );
}

const briefingCSS = `
  .briefing-body {
    display: flex;
    flex-direction: row;
    gap: var(--game-gap, 12px);
    flex: 1;
    min-height: 0;
    width: 100%;
  }
  .briefing-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }
  .briefing-right {
    flex: 2;
    display: flex;
    min-height: 0;
  }

  @keyframes briefing-flash {
    0% { background: rgba(255, 213, 79, 0.25); }
    100% { background: transparent; }
  }
  @keyframes briefing-hint-in {
    0% { opacity: 0; transform: translateY(-4px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .briefing-word-panel {
    animation: briefing-flash 0.5s ease-out;
  }
  .briefing-hint-reveal {
    animation: briefing-hint-in 0.25s ease-out;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    .briefing-screen {
      padding: 8px 16px !important;
    }
  }
`;

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    padding: "var(--game-pad)",
    background: "#1a1a2e",
    fontFamily: "'SF Pro', -apple-system, sans-serif",
    overflow: "hidden",
  },
  phone: {
    flex: 1,
    background: "#0f0f1a",
    borderRadius: "clamp(16px, 3vw, 24px)",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
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
  wordPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: 16,
    borderRadius: 12,
  },
  wordPanelEmpty: {
    color: "#555",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center" as const,
  },
  wordScript: {
    fontWeight: "bold",
    color: "#FFD54F",
    fontSize: "clamp(24px, 5vw, 36px)",
    letterSpacing: 2,
  },
  wordPronunciation: {
    color: "#FFD54F",
    fontSize: 14,
    opacity: 0.7,
  },
  wordIpa: {
    color: "#888",
    fontSize: 12,
    fontFamily: "monospace",
  },
  wordHintLine: {
    color: "#ce93d8",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 8,
  },
};
