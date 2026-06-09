import { useCallback, useRef } from "react";
import type { InputState } from "../types";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../engine";

interface Props {
  inputRef: React.RefObject<InputState | null>;
  canvasScale: number;
}

/**
 * Semi-transparent virtual controls overlaid on the canvas for touch devices.
 * Writes directly to the same InputState the keyboard handler uses —
 * zero changes to the game loop.
 */
export function TouchControls({ inputRef, canvasScale }: Props) {
  const activeRef = useRef<Set<string>>(new Set());

  const setInput = useCallback((key: keyof InputState, value: boolean) => {
    const input = inputRef.current;
    if (input) input[key] = value;
  }, [inputRef]);

  const onDown = useCallback((key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    activeRef.current.add(id);
    setInput(key, true);
  }, [setInput]);

  const onUp = useCallback((key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    activeRef.current.delete(id);
    setInput(key, false);
  }, [setInput]);

  const scaledW = CANVAS_WIDTH * canvasScale;
  const scaledH = CANVAS_HEIGHT * canvasScale;

  // Button sizing relative to canvas
  const btnSize = Math.max(44, Math.min(64, scaledW * 0.09));
  const dpadBtn = btnSize;
  const actionBtn = Math.max(48, btnSize * 1.1);
  const pad = Math.max(8, scaledW * 0.02);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: scaledW,
        height: scaledH,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Left side: D-pad */}
      <div
        style={{
          position: "absolute",
          bottom: pad,
          left: pad,
          pointerEvents: "auto",
          display: "grid",
          gridTemplateAreas: `". up ." "left . right"`,
          gridTemplateColumns: `${dpadBtn}px ${dpadBtn}px ${dpadBtn}px`,
          gridTemplateRows: `${dpadBtn}px ${dpadBtn}px`,
          gap: 4,
        }}
      >
        {/* Up — enter doors / interact */}
        <DpadButton
          gridArea="up"
          size={dpadBtn}
          label="&#9650;"
          inputKey="interact"
          id="dpad-up"
          onDown={onDown}
          onUp={onUp}
        />
        <DpadButton
          gridArea="left"
          size={dpadBtn}
          label="&#9664;"
          inputKey="left"
          id="dpad-left"
          onDown={onDown}
          onUp={onUp}
        />
        <DpadButton
          gridArea="right"
          size={dpadBtn}
          label="&#9654;"
          inputKey="right"
          id="dpad-right"
          onDown={onDown}
          onUp={onUp}
        />
      </div>

      {/* Right side: Action buttons */}
      <div
        style={{
          position: "absolute",
          bottom: pad,
          right: pad,
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
        }}
      >
        {/* Top row: shout + interact/enter */}
        <div style={{ display: "flex", gap: 6 }}>
          <ActionButton
            size={actionBtn * 0.8}
            label="P"
            sublabel="SHOUT"
            color="rgba(255, 152, 0, 0.55)"
            inputKey="shout"
            id="btn-shout"
            onDown={onDown}
            onUp={onUp}
          />
          <ActionButton
            size={actionBtn * 0.8}
            label="E"
            sublabel="ENTER"
            color="rgba(76, 175, 80, 0.55)"
            inputKey="interact"
            id="btn-interact"
            onDown={onDown}
            onUp={onUp}
          />
        </div>
        {/* Bottom row: Jump (large) */}
        <ActionButton
          size={actionBtn}
          label="A"
          sublabel="JUMP"
          color="rgba(33, 150, 243, 0.55)"
          inputKey="jump"
          id="btn-jump"
          onDown={onDown}
          onUp={onUp}
          wide
        />
      </div>
    </div>
  );
}

// ── D-pad button ──

function DpadButton({
  gridArea,
  size,
  label,
  inputKey,
  id,
  onDown,
  onUp,
}: {
  gridArea: string;
  size: number;
  label: string;
  inputKey: keyof InputState;
  id: string;
  onDown: (key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => void;
  onUp: (key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => void;
}) {
  return (
    <div
      style={{
        gridArea,
        width: size,
        height: size,
        borderRadius: 10,
        background: "rgba(255, 255, 255, 0.12)",
        border: "1.5px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.4,
        color: "rgba(255, 255, 255, 0.6)",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
      }}
      onTouchStart={onDown(inputKey, id)}
      onTouchEnd={onUp(inputKey, id)}
      onTouchCancel={onUp(inputKey, id)}
      onMouseDown={onDown(inputKey, id)}
      onMouseUp={onUp(inputKey, id)}
      onMouseLeave={onUp(inputKey, id)}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}

// ── Action button ──

function ActionButton({
  size,
  label,
  sublabel,
  color,
  inputKey,
  id,
  onDown,
  onUp,
  wide,
}: {
  size: number;
  label: string;
  sublabel: string;
  color: string;
  inputKey: keyof InputState;
  id: string;
  onDown: (key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => void;
  onUp: (key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => void;
  wide?: boolean;
}) {
  return (
    <div
      style={{
        width: wide ? size * 2 + 6 : size,
        height: size,
        borderRadius: wide ? 14 : size / 2,
        background: color,
        border: "1.5px solid rgba(255, 255, 255, 0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
      }}
      onTouchStart={onDown(inputKey, id)}
      onTouchEnd={onUp(inputKey, id)}
      onTouchCancel={onUp(inputKey, id)}
      onMouseDown={onDown(inputKey, id)}
      onMouseUp={onUp(inputKey, id)}
      onMouseLeave={onUp(inputKey, id)}
    >
      <span style={{
        fontSize: size * 0.35,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.85)",
        fontFamily: "monospace",
        lineHeight: 1,
      }}>
        {label}
      </span>
      <span style={{
        fontSize: Math.max(8, size * 0.16),
        color: "rgba(255, 255, 255, 0.5)",
        fontFamily: "monospace",
        letterSpacing: 1,
        lineHeight: 1,
      }}>
        {sublabel}
      </span>
    </div>
  );
}
