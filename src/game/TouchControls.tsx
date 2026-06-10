import { useCallback, useRef, useState } from "react";
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
    if (input) {
      input[key] = value;
      // Track jumpHeld alongside jump for variable jump height
      if (key === "jump") input.jumpHeld = value;
    }
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
      {/* Left side: Joystick */}
      <Joystick inputRef={inputRef} pad={pad} />

      {/* Right side: Action buttons — mid-height, above ground layer */}
      <div
        style={{
          position: "absolute",
          bottom: "42%",
          right: pad,
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Secondary row: shout + enter — smaller, subtle */}
        <div style={{ display: "flex", gap: 8 }}>
          <ActionButton
            size={actionBtn * 0.7}
            label="P"
            color="rgba(255, 152, 0, 0.3)"
            inputKey="shout"
            id="btn-shout"
            onDown={onDown}
            onUp={onUp}
          />
          <ActionButton
            size={actionBtn * 0.7}
            label="E"
            color="rgba(76, 175, 80, 0.3)"
            inputKey="interact"
            id="btn-interact"
            onDown={onDown}
            onUp={onUp}
          />
        </div>
        {/* Primary: Jump — larger circle */}
        <ActionButton
          size={actionBtn}
          label="A"
          color="rgba(33, 150, 243, 0.3)"
          inputKey="jump"
          id="btn-jump"
          onDown={onDown}
          onUp={onUp}
        />
      </div>
    </div>
  );
}

// ── Virtual joystick ──

const WELL_SIZE = 56;
const NUB_SIZE = 28;
const DEAD_ZONE = 6;
const MAX_TRAVEL = (WELL_SIZE - NUB_SIZE) / 2;

function Joystick({
  inputRef,
  pad,
}: {
  inputRef: React.RefObject<InputState | null>;
  pad: number;
}) {
  const wellRef = useRef<HTMLDivElement>(null);
  const [nubX, setNubX] = useState(0);
  const touchIdRef = useRef<number | null>(null);

  const update = useCallback((clientX: number) => {
    const well = wellRef.current;
    if (!well) return;
    const rect = well.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const dx = Math.max(-MAX_TRAVEL, Math.min(MAX_TRAVEL, clientX - centerX));
    setNubX(dx);

    const input = inputRef.current;
    if (input) {
      input.left = dx < -DEAD_ZONE;
      input.right = dx > DEAD_ZONE;
    }
  }, [inputRef]);

  const release = useCallback(() => {
    touchIdRef.current = null;
    setNubX(0);
    const input = inputRef.current;
    if (input) {
      input.left = false;
      input.right = false;
    }
  }, [inputRef]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const t = e.changedTouches[0];
    if (!t) return;
    touchIdRef.current = t.identifier;
    update(t.clientX);
  }, [update]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i]!;
      if (t.identifier === touchIdRef.current) {
        update(t.clientX);
        return;
      }
    }
  }, [update]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i]!.identifier === touchIdRef.current) {
        release();
        return;
      }
    }
  }, [release]);

  return (
    <div
      ref={wellRef}
      style={{
        position: "absolute",
        bottom: pad + 8,
        left: pad + 8,
        width: WELL_SIZE,
        height: WELL_SIZE,
        borderRadius: WELL_SIZE / 2,
        background: "rgba(255, 255, 255, 0.08)",
        border: "1.5px solid rgba(255, 255, 255, 0.15)",
        pointerEvents: "auto",
        touchAction: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        WebkitUserSelect: "none",
      } as React.CSSProperties}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={release as unknown as React.TouchEventHandler}
    >
      {/* Nub */}
      <div
        style={{
          width: NUB_SIZE,
          height: NUB_SIZE,
          borderRadius: NUB_SIZE / 2,
          background: "rgba(255, 255, 255, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          transform: `translateX(${nubX}px)`,
          transition: nubX === 0 ? "transform 0.1s ease-out" : "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ── Action button ──

function ActionButton({
  size,
  label,
  color,
  inputKey,
  id,
  onDown,
  onUp,
}: {
  size: number;
  label: string;
  color: string;
  inputKey: keyof InputState;
  id: string;
  onDown: (key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => void;
  onUp: (key: keyof InputState, id: string) => (e: React.TouchEvent | React.MouseEvent) => void;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: color,
        border: "1.5px solid rgba(255, 255, 255, 0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        fontSize: size * 0.38,
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.7)",
        fontFamily: "monospace",
        lineHeight: 1,
      }}>
        {label}
      </span>
    </div>
  );
}
