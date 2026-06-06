import { useState, useCallback, useEffect, useMemo } from "react";
import type { VocabWord } from "../types";
import { pronounceWord, speakText } from "../engine/audio";

interface Props {
  learnedWords: VocabWord[];
  onSelect: (word: VocabWord) => void;
  onCancel: () => void;
}

const FLAT_LIST_THRESHOLD = 6;

export function ShoutMenu({ learnedWords, onSelect, onCancel }: Props) {
  const useFlatList = learnedWords.length <= FLAT_LIST_THRESHOLD;

  if (useFlatList) {
    return <FlatMenu learnedWords={learnedWords} onSelect={onSelect} onCancel={onCancel} />;
  }
  return <WASDNavigator learnedWords={learnedWords} onSelect={onSelect} onCancel={onCancel} />;
}

// ── Flat list (≤6 words) ───────────────────────────────────────────

function FlatMenu({ learnedWords, onSelect, onCancel }: Props) {
  const handleSelect = useCallback(
    (word: VocabWord) => { pronounceWord(word); onSelect(word); },
    [onSelect]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") { e.preventDefault(); onCancel(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div style={S.overlay}>
      <div style={S.panel}>
        <div style={S.header}>
          <h2 style={S.title}>SHOUT A WORD</h2>
          <button style={S.closeBtn} onClick={onCancel}>&times;</button>
        </div>
        <div style={S.subtitle}>What do you want from this shop?</div>
        <div style={S.flatList}>
          {learnedWords.map((word) => (
            <button key={word.id} style={S.flatWord} onClick={() => handleSelect(word)}>
              <span style={S.wordCyr}>{word.cyrillic}</span>
              <span style={S.wordTrans}>{word.translation}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── WASD Navigator ─────────────────────────────────────────────────

interface LetterGroup {
  letter: string;
  words: VocabWord[];
}

function groupByChar(words: VocabWord[], charIndex: number): LetterGroup[] {
  const map = new Map<string, VocabWord[]>();
  for (const w of words) {
    const ch = w.cyrillic.charAt(charIndex) || "?";
    const list = map.get(ch) ?? [];
    list.push(w);
    map.set(ch, list);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b, "ru"))
    .map(([letter, ws]) => ({ letter, words: ws }));
}

function WASDNavigator({ learnedWords, onSelect, onCancel }: Props) {
  // Drill path: each entry is the prefix char chosen
  const [path, setPath] = useState<string[]>([]);
  const [groupOffset, setGroupOffset] = useState(0);
  const [highlightKey, setHighlightKey] = useState<"w" | "a" | "d" | null>(null);

  // Filter words matching current drill path
  const activeWords = useMemo(() => {
    return learnedWords.filter((w) => {
      for (let i = 0; i < path.length; i++) {
        if (w.cyrillic.charAt(i) !== path[i]) return false;
      }
      return true;
    });
  }, [learnedWords, path]);

  // Group by next character
  const groups = useMemo(() => groupByChar(activeWords, path.length), [activeWords, path]);

  // Current 3 groups visible (W=top, A=left, D=right)
  const visible = useMemo(() => {
    const start = groupOffset % Math.max(1, groups.length);
    const result: (LetterGroup | null)[] = [null, null, null]; // W, A, D
    for (let i = 0; i < 3; i++) {
      const idx = (start + i) % groups.length;
      if (idx < groups.length && i + start < groups.length + start) {
        result[i] = groups[(start + i) % groups.length] ?? null;
      }
    }
    return result;
  }, [groups, groupOffset]);

  const wGroup = visible[0] ?? null;
  const aGroup = visible[1] ?? null;
  const dGroup = visible[2] ?? null;

  // Drill into a letter
  const drill = useCallback((letter: string) => {
    speakText(letter);
    setPath((p) => [...p, letter]);
    setGroupOffset(0);
    setHighlightKey(null);
  }, []);

  // Cycle S
  const cycle = useCallback(() => {
    if (groups.length <= 3) {
      // At first group and ≤3 groups: go back if drilled
      if (path.length > 0) {
        setPath((p) => p.slice(0, -1));
        setGroupOffset(0);
      }
    } else {
      setGroupOffset((o) => {
        const next = o + 3;
        return next >= groups.length ? 0 : next;
      });
    }
    setHighlightKey(null);
  }, [groups.length, path.length]);

  const handleWordClick = useCallback((word: VocabWord) => {
    pronounceWord(word);
    onSelect(word);
  }, [onSelect]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.code) {
        case "Escape":
          e.preventDefault();
          if (path.length > 0) {
            setPath((p) => p.slice(0, -1));
            setGroupOffset(0);
          } else {
            onCancel();
          }
          break;
        case "KeyW":
        case "ArrowUp":
          e.preventDefault();
          if (wGroup) {
            setHighlightKey("w");
            speakText(wGroup.letter);
            if (wGroup.words.length === 1) {
              handleWordClick(wGroup.words[0]!);
            } else {
              drill(wGroup.letter);
            }
          }
          break;
        case "KeyA":
        case "ArrowLeft":
          e.preventDefault();
          if (aGroup) {
            setHighlightKey("a");
            speakText(aGroup.letter);
            if (aGroup.words.length === 1) {
              handleWordClick(aGroup.words[0]!);
            } else {
              drill(aGroup.letter);
            }
          }
          break;
        case "KeyD":
        case "ArrowRight":
          e.preventDefault();
          if (dGroup) {
            setHighlightKey("d");
            speakText(dGroup.letter);
            if (dGroup.words.length === 1) {
              handleWordClick(dGroup.words[0]!);
            } else {
              drill(dGroup.letter);
            }
          }
          break;
        case "KeyS":
        case "ArrowDown":
          e.preventDefault();
          cycle();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [wGroup, aGroup, dGroup, path, onCancel, drill, cycle, handleWordClick]);

  const pathDisplay = path.length > 0 ? path.join(" → ") + " → ..." : "";

  return (
    <div style={S.overlay}>
      <div style={{ ...S.panel, width: 460 }}>
        <div style={S.header}>
          <h2 style={S.title}>SHOUT A WORD</h2>
          <button style={S.closeBtn} onClick={onCancel}>&times;</button>
        </div>
        {pathDisplay && (
          <div style={S.pathBar}>
            {path.length > 0 && (
              <button
                style={S.backBtn}
                onClick={() => { setPath((p) => p.slice(0, -1)); setGroupOffset(0); }}
              >
                &larr;
              </button>
            )}
            <span>{pathDisplay}</span>
          </div>
        )}
        <div style={S.subtitle}>
          {path.length === 0 ? "Navigate with W/A/D, cycle with S" : "Drill deeper or tap a word"}
        </div>

        {/* WASD layout */}
        <div style={S.wasdGrid}>
          {/* W — top center */}
          <div style={{ ...S.wasdSlot, gridArea: "w" }}>
            <LetterColumn
              group={wGroup}
              keyLabel="W"
              highlight={highlightKey === "w"}
              onDrill={drill}
              onWordClick={handleWordClick}
            />
          </div>
          {/* A — bottom left */}
          <div style={{ ...S.wasdSlot, gridArea: "a" }}>
            <LetterColumn
              group={aGroup}
              keyLabel="A"
              highlight={highlightKey === "a"}
              onDrill={drill}
              onWordClick={handleWordClick}
            />
          </div>
          {/* S — bottom center (cycle) */}
          <div style={{ ...S.wasdSlot, gridArea: "s" }}>
            <button style={S.cycleBtn} onClick={cycle}>
              <span style={S.keyBadge}>S</span>
              <span style={S.cycleLabel}>
                {groups.length <= 3 && path.length > 0 ? "BACK" : "NEXT"}
              </span>
            </button>
          </div>
          {/* D — bottom right */}
          <div style={{ ...S.wasdSlot, gridArea: "d" }}>
            <LetterColumn
              group={dGroup}
              keyLabel="D"
              highlight={highlightKey === "d"}
              onDrill={drill}
              onWordClick={handleWordClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Letter Column ──────────────────────────────────────────────────

function LetterColumn({
  group,
  keyLabel,
  highlight,
  onDrill,
  onWordClick,
}: {
  group: LetterGroup | null;
  keyLabel: string;
  highlight: boolean;
  onDrill: (letter: string) => void;
  onWordClick: (word: VocabWord) => void;
}) {
  if (!group) return <div style={S.emptySlot} />;

  return (
    <div style={S.column}>
      <button
        style={{ ...S.letterBtn, ...(highlight ? S.letterBtnActive : {}) }}
        onClick={() => {
          if (group.words.length === 1) {
            onWordClick(group.words[0]!);
          } else {
            onDrill(group.letter);
          }
        }}
      >
        <span style={S.keyBadge}>{keyLabel}</span>
        <span style={S.letterChar}>{group.letter}</span>
      </button>
      <div style={S.wordCol}>
        {group.words.slice(0, 4).map((w) => (
          <button key={w.id} style={S.wordItem} onClick={() => onWordClick(w)}>
            <span style={S.wordCyr}>{w.cyrillic}</span>
            <span style={S.wordTrans}>{w.translation}</span>
          </button>
        ))}
        {group.words.length > 4 && (
          <div style={S.moreCount}>+{group.words.length - 4} more</div>
        )}
      </div>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────

const S: Record<string, React.CSSProperties> = {
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  panel: {
    background: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    maxWidth: "95%",
    maxHeight: "90%",
    overflowY: "auto",
    border: "2px solid #FFD54F",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    color: "#FFD54F",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
    margin: 0,
    fontFamily: "monospace",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#888",
    fontSize: 24,
    cursor: "pointer",
    padding: "0 8px",
  },
  subtitle: {
    color: "#666",
    fontSize: 11,
    marginBottom: 12,
    fontFamily: "monospace",
  },
  pathBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#FFD54F",
    fontSize: 14,
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 4,
  },
  backBtn: {
    background: "#2a2a3e",
    border: "1px solid #3a3a4e",
    borderRadius: 6,
    color: "#FFD54F",
    fontSize: 14,
    cursor: "pointer",
    padding: "2px 8px",
    fontFamily: "monospace",
  },
  wasdGrid: {
    display: "grid",
    gridTemplateAreas: `". w ." "a s d"`,
    gridTemplateColumns: "1fr auto 1fr",
    gridTemplateRows: "auto auto",
    gap: 8,
    justifyItems: "center",
  },
  wasdSlot: {
    minWidth: 100,
  },
  column: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 4,
  },
  letterBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#2a2a3e",
    border: "2px solid #3a3a4e",
    borderRadius: 10,
    padding: "6px 14px",
    cursor: "pointer",
    transition: "border-color 0.15s",
  },
  letterBtnActive: {
    borderColor: "#FFD54F",
    background: "#2a2a40",
  },
  keyBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: 5,
    background: "#3a3a4e",
    color: "#888",
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "monospace",
    border: "1px solid #4a4a5e",
  },
  letterChar: {
    color: "#FFD54F",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  wordCol: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 3,
    maxHeight: 160,
    overflowY: "auto" as const,
    width: "100%",
  },
  wordItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#22223a",
    border: "1px solid #2a2a3e",
    borderRadius: 6,
    padding: "4px 8px",
    cursor: "pointer",
    transition: "background 0.1s",
    width: "100%",
  },
  wordCyr: {
    color: "#FFD54F",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "monospace",
  },
  wordTrans: {
    color: "#777",
    fontSize: 11,
    fontStyle: "italic",
    fontFamily: "monospace",
  },
  moreCount: {
    color: "#555",
    fontSize: 10,
    fontFamily: "monospace",
    textAlign: "center" as const,
    padding: 2,
  },
  cycleBtn: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 4,
    background: "#2a2a3e",
    border: "2px solid #3a3a4e",
    borderRadius: 10,
    padding: "8px 18px",
    cursor: "pointer",
  },
  cycleLabel: {
    color: "#888",
    fontSize: 10,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  emptySlot: {
    minHeight: 40,
  },
  // Flat list styles
  flatList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 6,
    maxHeight: 300,
    overflowY: "auto" as const,
  },
  flatWord: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#2a2a3e",
    border: "1px solid #3a3a4e",
    borderRadius: 10,
    padding: "10px 14px",
    cursor: "pointer",
  },
};
