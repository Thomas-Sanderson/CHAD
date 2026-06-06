import { useEffect, useRef, useCallback, useState } from "react";
import type { LevelData, GameRunState, InputState, SkinEnvironment, VocabWord } from "../types";
import type { CollectibleItem } from "../types/content";
import {
  createGameRunState,
  updateGameState,
  renderFrame,
  createInputState,
  setupKeyboardInput,
  setupTouchInput,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "../engine";
import { pronounceWord, speakText } from "../engine/audio";
import { ShoutMenu } from "./ShoutMenu";

interface Props {
  level: LevelData;
  itemDefs: Map<string, CollectibleItem>;
  environment: SkinEnvironment;
  onGateReached: (state: GameRunState) => void;
  learnedWords?: VocabWord[];
  vocabWords?: VocabWord[];
}

export function RunPhase({ level, itemDefs, environment, onGateReached, learnedWords = [], vocabWords = [] }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameRunState | null>(null);
  const inputRef = useRef<InputState | null>(null);
  const onGateReachedRef = useRef(onGateReached);
  onGateReachedRef.current = onGateReached;
  const vocabWordsRef = useRef(vocabWords);
  vocabWordsRef.current = vocabWords;
  const learnedWordsRef = useRef(learnedWords);
  learnedWordsRef.current = learnedWords;
  const [shoutMenuOpen, setShoutMenuOpen] = useState(false);
  const pausedRef = useRef(false);

  const initAndRun = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameState = createGameRunState(level, environment.scoldings);
    stateRef.current = gameState;

    const input = createInputState();
    inputRef.current = input;

    const cleanupKeyboard = setupKeyboardInput(input);
    const cleanupTouch = setupTouchInput(canvas, input);

    let lastTime = performance.now();
    let animFrameId: number;

    const loop = (now: number) => {
      // Pause when shout menu is open
      if (pausedRef.current) {
        animFrameId = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const prevCollectedCount = gameState.collectedItems.length;
      updateGameState(gameState, input, level, level.hazards, itemDefs, dt);

      // Pronounce Russian word when item is collected
      if (gameState.collectedItems.length > prevCollectedCount) {
        const newItemId = gameState.collectedItems[gameState.collectedItems.length - 1];
        const allWords = [...vocabWordsRef.current, ...learnedWordsRef.current];
        const matchingWord = allWords.find(w => w.matchesItemId === newItemId);
        if (matchingWord) {
          pronounceWord(matchingWord);
        } else {
          const itemDef = itemDefs.get(newItemId!);
          if (itemDef?.cyrillic) speakText(itemDef.cyrillic);
        }
      }

      // Check if game state wants to open shout menu
      if (gameState.shoutMenuOpen && !pausedRef.current) {
        gameState.shoutMenuOpen = false;
        pausedRef.current = true;
        setShoutMenuOpen(true);
      }

      renderFrame(ctx, gameState, level, itemDefs, environment);

      if (gameState.reachedGate) {
        onGateReachedRef.current(gameState);
        return;
      }

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameId);
      cleanupKeyboard();
      cleanupTouch();
    };
  }, [level, itemDefs, environment]);

  useEffect(() => {
    const cleanup = initAndRun();
    return cleanup;
  }, [initAndRun]);

  const handleShoutSelect = useCallback(
    (word: VocabWord) => {
      const state = stateRef.current;
      if (!state || !state.shoutTarget || !level.segments) return;

      // shoutTarget is a door ID — find the door and target segment's shopkeeper
      for (const seg of level.segments) {
        const door = seg.doors.find(d => d.id === state.shoutTarget);
        if (door) {
          const targetSegment = level.segments.find(s => s.id === door.targetSegmentId);
          if (targetSegment?.shopkeeper) {
            const accepted = targetSegment.shopkeeper.acceptsItemIds.includes(word.matchesItemId ?? "");
            if (accepted) {
              state.shoutResponse = {
                type: "da",
                text: targetSegment.shopkeeper.daResponses[Math.floor(Math.random() * targetSegment.shopkeeper.daResponses.length)] ?? "ДА!",
                until: state.elapsed + 2000,
              };
              // Unlock the door
              state.unlockedDoors.push(door.id);
              state.shoutTarget = null;
            } else {
              state.shoutResponse = {
                type: "net",
                text: targetSegment.shopkeeper.netResponses[Math.floor(Math.random() * targetSegment.shopkeeper.netResponses.length)] ?? "НЕТ!",
                until: state.elapsed + 2000,
              };
            }
          }
          break;
        }
      }

      setShoutMenuOpen(false);
      pausedRef.current = false;
    },
    [level]
  );

  const handleShoutCancel = useCallback(() => {
    const state = stateRef.current;
    if (state) {
      state.shoutTarget = null;
    }
    setShoutMenuOpen(false);
    pausedRef.current = false;
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={styles.canvas}
        />
        {shoutMenuOpen && (
          <ShoutMenu
            learnedWords={learnedWords}
            onSelect={handleShoutSelect}
            onCancel={handleShoutCancel}
          />
        )}
      </div>
      <div style={styles.controls}>
        <span>&larr; &rarr; or A/D to move | &uarr; or W or Space to jump | E to enter/listen | P to shout</span>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
    minHeight: "100vh",
    background: "#0a0a1a",
    overflow: "hidden",
  },
  canvas: {
    border: "2px solid #333",
    borderRadius: 4,
    imageRendering: "pixelated",
    transform: "scale(1.5)",
    transformOrigin: "top center",
  },
  controls: {
    marginTop: 12,
    color: "#666",
    fontSize: 13,
    fontFamily: "monospace",
  },
};
