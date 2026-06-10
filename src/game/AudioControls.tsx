import { useState, useRef, useCallback, useEffect } from "react";
import { isMuted, setMuted } from "../engine/sfx";
import { setMusicVolume, getPhaseOffset, setPhaseOffset } from "../engine/music";
import { drawSprite, speakerOnSprite, speakerOffSprite } from "../engine/sprites";

function SpeakerSprite({ muted }: { muted: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 14, 14);
    drawSprite(ctx, muted ? speakerOffSprite : speakerOnSprite, 0, 0, 2);
  }, [muted]);

  return (
    <canvas
      ref={ref}
      width={14}
      height={14}
      style={{ width: 14, height: 14, imageRendering: "pixelated" }}
    />
  );
}

export function AudioControls() {
  const [muted, setMutedState] = useState(isMuted());
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState(getPhaseOffset());
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    setMusicVolume(next ? 0 : 0.08);
  }, [muted]);

  // Close panel on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  const handlePhaseChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPhase(val);
    setPhaseOffset(val);
  }, []);

  const handleRandomize = useCallback(() => {
    const val = Math.round(Math.random() * 100) / 100;
    setPhase(val);
    setPhaseOffset(val);
  }, []);

  return (
    <div ref={wrapperRef} className="audio-controls" style={styles.wrapper}>
      <button
        style={styles.iconButton}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Audio controls"
      >
        <SpeakerSprite muted={muted} />
      </button>

      {open && (
        <div style={styles.panel}>
          <button style={styles.muteRow} onClick={toggleMute}>
            <SpeakerSprite muted={muted} />
            <span style={{ color: muted ? "#666" : "#fff", fontSize: 12, fontFamily: "monospace" }}>
              {muted ? "MUTED" : "SOUND ON"}
            </span>
          </button>

          <div style={styles.divider} />

          <div style={styles.sliderRow}>
            <span style={styles.label}>PHASE</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={phase}
              onChange={handlePhaseChange}
              style={styles.slider}
            />
          </div>
          <div style={styles.seedRow}>
            <span style={styles.seedValue}>{phase.toFixed(2)}</span>
            <button style={styles.randomButton} onClick={handleRandomize} title="Randomize">
              {"\u{1F3B2}"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "fixed",
    top: 8,
    right: 8,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  iconButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    border: "1px solid #2a2a3e",
    background: "rgba(10, 10, 26, 0.85)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    WebkitTapHighlightColor: "transparent",
  },
  panel: {
    marginTop: 4,
    background: "#1a1a2e",
    borderRadius: 8,
    padding: "8px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: 152,
    border: "1px solid #2a2a3e",
    boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
  },
  muteRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "2px 0",
  },
  divider: {
    height: 1,
    background: "#2a2a3e",
  },
  sliderRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  label: {
    fontSize: 9,
    color: "#555",
    fontFamily: "monospace",
    letterSpacing: 1,
    fontWeight: "bold",
    flexShrink: 0,
  },
  slider: {
    flex: 1,
    height: 4,
    accentColor: "#FFD54F",
    cursor: "pointer",
  },
  seedRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  seedValue: {
    fontSize: 13,
    color: "#FFD54F",
    fontFamily: "monospace",
    fontWeight: "bold",
    flex: 1,
  },
  randomButton: {
    width: 22,
    height: 22,
    borderRadius: 4,
    border: "1px solid #333",
    background: "#222",
    cursor: "pointer",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
};
