import { useState, useMemo, useRef, useEffect } from "react";
import type { BriefingScript, VocabWord, VocabPack } from "../types/content";
import { pronounceWord } from "../engine/audio";

interface Props {
  briefing: BriefingScript;
  vocabPack: VocabPack;
  mentorName?: string;
  mentorAvatar?: string;
  mentorColor?: string;
  onClose: () => void;
}

export function BriefingPanel({
  briefing, vocabPack, mentorName = "Anya",
  mentorAvatar = "\u0410", mentorColor = "#6C3483", onClose,
}: Props) {
  const [activeWord, setActiveWord] = useState<VocabWord | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const cyrillicWordMap = useMemo(
    () => new Map(vocabPack.words.map(w => [w.script, w])),
    [vocabPack.words],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleInlineClick(word: VocabWord) {
    setActiveWord(word);
    pronounceWord(word);
  }

  function highlightCyrillic(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let key = 0;
    for (const [cyr, word] of cyrillicWordMap) {
      const segments = text.split(cyr);
      if (segments.length > 1) {
        const result: React.ReactNode[] = [];
        segments.forEach((seg, i) => {
          if (i > 0) {
            result.push(
              <span key={`c-${key++}`} style={S.script}
                onClick={e => { e.stopPropagation(); handleInlineClick(word); }}>
                {cyr}
              </span>,
            );
          }
          result.push(<span key={`t-${key++}`}>{seg}</span>);
        });
        return result;
      }
    }
    parts.push(<span key="full">{text}</span>);
    return parts;
  }

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.panel} onClick={e => e.stopPropagation()}>
        <div style={S.header}>
          <span style={S.title}>BRIEFING</span>
          <button style={S.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div style={S.body}>
          {/* Word detail sidebar */}
          <div style={S.sidebar}>
            {activeWord ? (
              <div style={S.wordCard}>
                <div style={S.wordScript}>{activeWord.script}</div>
                {activeWord.pronunciation && (
                  <div style={S.wordPron}>{activeWord.pronunciation}</div>
                )}
                {activeWord.ipa && (
                  <div style={S.wordIpa}>{activeWord.ipa}</div>
                )}
                {activeWord.hint && (
                  <div style={S.wordHint}>{activeWord.hint}</div>
                )}
              </div>
            ) : (
              <div style={S.sidebarEmpty}>Tap a highlighted word</div>
            )}
          </div>

          {/* Messages */}
          <div style={S.phone}>
            <div style={S.phoneHeader}>
              <div style={{ ...S.avatar, background: mentorColor }}>{mentorAvatar}</div>
              <div>
                <div style={S.contactName}>{mentorName}</div>
                <div style={S.contactStatus}>online</div>
              </div>
            </div>
            <div ref={messagesRef} style={S.messages}>
              {briefing.messages.map(msg => (
                <div key={msg.id} style={{
                  ...S.bubble,
                  ...(msg.sender === "mentor" ? S.mentorBubble : S.chadBubble),
                }}>
                  {highlightCyrillic(msg.text)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  panel: {
    background: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    width: "95%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    border: "2px solid #333",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flexShrink: 0,
  },
  title: {
    color: "#FFD54F",
    fontFamily: "monospace",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#666",
    fontSize: 24,
    cursor: "pointer",
    padding: "0 4px",
  },
  body: {
    display: "flex",
    flex: 1,
    gap: 12,
    minHeight: 0,
  },
  sidebar: {
    flex: "0 0 28%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarEmpty: {
    color: "#555",
    fontSize: 13,
    fontStyle: "italic",
    fontFamily: "monospace",
    textAlign: "center" as const,
  },
  wordCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: 12,
  },
  wordScript: {
    fontWeight: "bold",
    color: "#FFD54F",
    fontSize: 28,
    letterSpacing: 2,
  },
  wordPron: {
    color: "#FFD54F",
    fontSize: 13,
    opacity: 0.7,
  },
  wordIpa: {
    color: "#888",
    fontSize: 11,
    fontFamily: "monospace",
  },
  wordHint: {
    color: "#ce93d8",
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 6,
    textAlign: "center" as const,
  },
  phone: {
    flex: 1,
    background: "#0f0f1a",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minHeight: 0,
  },
  phoneHeader: {
    background: "#1a1a2e",
    padding: "8px 12px",
    borderBottom: "1px solid #2a2a3e",
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  contactName: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
  },
  contactStatus: {
    color: "#4CAF50",
    fontSize: 11,
  },
  messages: {
    flex: 1,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflowY: "auto",
    minHeight: 0,
  },
  bubble: {
    padding: "8px 12px",
    borderRadius: 14,
    maxWidth: "85%",
    fontSize: 14,
    lineHeight: 1.5,
  },
  mentorBubble: {
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
};
