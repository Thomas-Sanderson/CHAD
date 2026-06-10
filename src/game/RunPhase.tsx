import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import type { LevelData, GameRunState, InputState, SkinEnvironment, VocabWord } from "../types";
import type { TimeOfDay } from "../engine/sky";
import type { CollectibleItem, ConvoPhrase } from "../types/content";
import { isEmbedded } from "../engine/embed";
import { isTouchDevice } from "../engine/touch";
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
import type { HudData } from "../engine";
import { pronounceWord, speakText, speakQueued } from "../engine/audio";
import { sfxJump, sfxCollect, sfxHeartLost, sfxDoorEnter, sfxShout, sfxGateSuccess, isMuted, setMuted } from "../engine/sfx";
import { setMusicVolume } from "../engine/music";
import { ShoutMenu } from "./ShoutMenu";
import { InventoryPanel } from "./InventoryPanel";
import { TouchControls } from "./TouchControls";

interface Props {
  level: LevelData;
  itemDefs: Map<string, CollectibleItem>;
  environment: SkinEnvironment;
  onGateReached: (state: GameRunState) => void;
  onHeartLost: () => void;
  hearts: number;
  maxHearts: number;
  checkGateResult: (state: GameRunState) => boolean;
  learnedWords?: VocabWord[];
  vocabWords?: VocabWord[];
  timeOfDay?: TimeOfDay;
}

export function RunPhase({
  level, itemDefs, environment, onGateReached,
  onHeartLost, hearts, maxHearts, checkGateResult,
  learnedWords = [], vocabWords = [], timeOfDay,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameRunState | null>(null);
  const inputRef = useRef<InputState | null>(null);
  const onGateReachedRef = useRef(onGateReached);
  onGateReachedRef.current = onGateReached;
  const onHeartLostRef = useRef(onHeartLost);
  onHeartLostRef.current = onHeartLost;
  const checkGateResultRef = useRef(checkGateResult);
  checkGateResultRef.current = checkGateResult;
  const vocabWordsRef = useRef(vocabWords);
  vocabWordsRef.current = vocabWords;
  const learnedWordsRef = useRef(learnedWords);
  learnedWordsRef.current = learnedWords;
  const heartsRef = useRef(hearts);
  heartsRef.current = hearts;
  const maxHeartsRef = useRef(maxHearts);
  maxHeartsRef.current = maxHearts;
  const [shoutMenuOpen, setShoutMenuOpen] = useState(false);
  const [shopConvoOpen, setShopConvoOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [currentSegmentId, setCurrentSegmentId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasScale, setCanvasScale] = useState(() => {
    if (typeof window === "undefined") return 1.5;
    const pad = isEmbedded || isTouchDevice ? 0 : 32;
    const scaleX = (window.innerWidth - pad) / CANVAS_WIDTH;
    const scaleY = (window.innerHeight - pad) / CANVAS_HEIGHT;
    return Math.min(scaleX, scaleY, 3);
  });
  const pausedRef = useRef(false);
  const prevHitCountRef = useRef(0);
  const prevOnGroundRef = useRef(true);
  const prevTransitionRef = useRef<boolean>(false);
  const mutedRef = useRef(isMuted());
  const flagAnimatingRef = useRef(false);

  const initAndRun = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameState = createGameRunState(level, environment.scoldings, environment.headBounceCurse);
    stateRef.current = gameState;
    prevHitCountRef.current = 0;

    const input = createInputState();
    inputRef.current = input;

    const cleanupKeyboard = setupKeyboardInput(input);
    const cleanupTouch = setupTouchInput(canvas, input);

    let lastTime = performance.now();
    let animFrameId: number;

    const loop = (now: number) => {
      // Pause when shout menu or inventory is open
      if (pausedRef.current) {
        animFrameId = requestAnimationFrame(loop);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Flag animation mode — skip physics, just animate flag
      if (flagAnimatingRef.current) {
        gameState.flagProgress = Math.min(1, gameState.flagProgress + dt * 0.45);
        const hud: HudData = {
          hearts: heartsRef.current,
          maxHearts: maxHeartsRef.current,
          muted: mutedRef.current,
        };
        renderFrame(ctx, gameState, level, itemDefs, environment, hud, timeOfDay);
        if (gameState.flagProgress >= 1) {
          flagAnimatingRef.current = false;
          onGateReachedRef.current(gameState);
          return;
        }
        animFrameId = requestAnimationFrame(loop);
        return;
      }

      // Track state before update
      const prevCollectedCount = gameState.collectedItems.length;
      const wasOnGround = prevOnGroundRef.current;
      const hadTransition = prevTransitionRef.current;

      // Handle inventory key
      if (input.inventory) {
        input.inventory = false;
        pausedRef.current = true;
        setInventoryOpen(true);
        animFrameId = requestAnimationFrame(loop);
        return;
      }

      updateGameState(gameState, input, level, level.hazards, itemDefs, dt);

      // SFX: hit detection
      if (gameState.hitCount > prevHitCountRef.current) {
        prevHitCountRef.current = gameState.hitCount;
        sfxHeartLost();
        onHeartLostRef.current();
      }

      // SFX: jump (ground→air with upward velocity)
      if (wasOnGround && !gameState.player.onGround && gameState.player.velocity.y < 0) {
        sfxJump();
      }
      prevOnGroundRef.current = gameState.player.onGround;

      // SFX: item collected
      if (gameState.collectedItems.length > prevCollectedCount) {
        sfxCollect();
        const newItemId = gameState.collectedItems[gameState.collectedItems.length - 1];
        const allWords = [...vocabWordsRef.current, ...learnedWordsRef.current];
        const matchingWord = allWords.find(w => w.matchesItemId === newItemId);
        if (matchingWord) {
          setTimeout(() => pronounceWord(matchingWord), 100);
        } else {
          const itemDef = itemDefs.get(newItemId!);
          if (itemDef?.script?.trim()) setTimeout(() => speakText(itemDef.script), 100);
        }
      }

      // SFX: door enter
      if (gameState.transition && !hadTransition) {
        sfxDoorEnter();
      }
      prevTransitionRef.current = !!gameState.transition;

      // Track segment for conversation phrase derivation
      setCurrentSegmentId(gameState.currentSegmentId);

      // Check if game state wants to open shop convo menu
      if (gameState.shopConvoMenuOpen && !pausedRef.current) {
        gameState.shopConvoMenuOpen = false;
        pausedRef.current = true;
        setShopConvoOpen(true);
      }

      // Check if game state wants to open shout menu
      if (gameState.shoutMenuOpen && !pausedRef.current) {
        gameState.shoutMenuOpen = false;
        pausedRef.current = true;
        sfxShout();
        setShoutMenuOpen(true);
      }

      const hud: HudData = {
        hearts: heartsRef.current,
        maxHearts: maxHeartsRef.current,
        muted: mutedRef.current,
      };
      renderFrame(ctx, gameState, level, itemDefs, environment, hud, timeOfDay);

      // Gate reached — check if passed for flag animation
      if (gameState.reachedGate) {
        const passed = checkGateResultRef.current(gameState);
        if (passed) {
          sfxGateSuccess();
          flagAnimatingRef.current = true;
          animFrameId = requestAnimationFrame(loop);
          return;
        } else {
          // Failed — immediate transition
          onGateReachedRef.current(gameState);
          return;
        }
      }

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameId);
      cleanupKeyboard();
      cleanupTouch();
    };
  }, [level, itemDefs, environment, timeOfDay]);

  useEffect(() => {
    const cleanup = initAndRun();
    return cleanup;
  }, [initAndRun]);

  // Dynamic canvas scaling on resize
  useEffect(() => {
    const onResize = () => {
      const pad = isEmbedded || isTouchDevice ? 0 : 32;
      const scaleX = (window.innerWidth - pad) / CANVAS_WIDTH;
      const scaleY = (window.innerHeight - pad) / CANVAS_HEIGHT;
      setCanvasScale(Math.min(scaleX, scaleY, 3));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Canvas click handler for mute toggle and inventory bag
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Mute icon region (top-right, ~30px area)
    if (x > CANVAS_WIDTH - 40 && y < 30) {
      const newMuted = !mutedRef.current;
      mutedRef.current = newMuted;
      setMuted(newMuted);
      setMusicVolume(newMuted ? 0 : 0.08);
      return;
    }

    // Bag icon region (center-right of HUD)
    const bagX = CANVAS_WIDTH / 2 + 60;
    if (x > bagX - 5 && x < bagX + 40 && y < 30) {
      pausedRef.current = true;
      setInventoryOpen(true);
    }
  }, []);

  const handleShoutSelect = useCallback(
    (word: VocabWord) => {
      const state = stateRef.current;
      if (!state || !state.shoutTarget || !level.segments) return;

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

  // --- Shop conversation via WASD trie picker ---
  const convoPhrases = useMemo((): ConvoPhrase[] => {
    if (!level.segments || !currentSegmentId) return [];
    const seg = level.segments.find(s => s.id === currentSegmentId);
    if (!seg?.shopkeeper?.conversation) return [];
    const phrases = seg.shopkeeper.conversation.playerPhrases;
    const state = stateRef.current;
    const hasNearItem = state?.nearItem !== null;
    // Filter out ask/price if player isn't near a shelf item
    return hasNearItem ? phrases : phrases.filter(p => p.action !== "ask" && p.action !== "price");
  }, [level.segments, currentSegmentId]);

  const handleShopConvoSelect = useCallback(
    (word: VocabWord) => {
      const state = stateRef.current;
      if (!state || !level.segments) return;
      const seg = level.segments.find(s => s.id === state.currentSegmentId);
      if (!seg?.shopkeeper?.conversation) return;
      const convo = seg.shopkeeper.conversation;
      const phrase = word as ConvoPhrase;
      // ShoutMenu already calls pronounceWord(word) — don't duplicate

      // Init conversation tracking if needed
      if (!state.shopConvo) {
        state.shopConvo = { greetIndex: 0, farewellIndex: 0, askedItems: [] };
      }

      // Determine shopkeeper response based on action
      let responseText: string;
      let responsePron: string | undefined;
      let responseTrans: string | undefined;
      switch (phrase.action) {
        case "greet": {
          const greeting = convo.greetings[state.shopConvo.greetIndex % convo.greetings.length]!;
          state.shopConvo.greetIndex++;
          responseText = greeting.script;
          responsePron = greeting.pronunciation;
          responseTrans = greeting.translation;
          break;
        }
        case "ask": {
          if (!state.nearItem) { responseText = "..."; break; }
          const itemDef = itemDefs.get(state.nearItem);
          if (!itemDef) { responseText = "..."; break; }
          const isKnown = state.shopConvo.askedItems.includes(state.nearItem);
          if (isKnown) {
            responseText = `${itemDef.script}. ${convo.askKnown.script}`;
            responsePron = convo.askKnown.pronunciation;
            responseTrans = `${itemDef.name}. ${convo.askKnown.translation ?? "You know."}`;
          } else {
            state.shopConvo.askedItems.push(state.nearItem);
            responseText = `${convo.askPrefix}${itemDef.script}.`;
            responseTrans = `This is ${itemDef.name}.`;
          }
          break;
        }
        case "price": {
          if (!state.nearItem) { responseText = "..."; break; }
          const price = convo.prices[state.nearItem];
          responseText = price?.script ?? "...";
          responsePron = price?.pronunciation;
          responseTrans = price?.translation;
          break;
        }
        case "bye": {
          const hasItems = state.collectedItems.length > 0;
          if (hasItems) {
            const farewell = convo.farewells[state.shopConvo.farewellIndex % convo.farewells.length]!;
            state.shopConvo.farewellIndex++;
            responseText = farewell.script;
            responsePron = farewell.pronunciation;
            responseTrans = farewell.translation;
          } else {
            responseText = convo.farewellEmpty.script;
            responsePron = convo.farewellEmpty.pronunciation;
            responseTrans = convo.farewellEmpty.translation;
          }
          break;
        }
      }

      // Show shopkeeper speech bubble + whiteboard data
      state.shopBubble = {
        text: responseText,
        pronunciation: responsePron,
        translation: responseTrans,
        until: state.elapsed + 3500,
      };

      // Queue shopkeeper response — babushka voice, plays after Chad finishes
      speakQueued(responseText, { pitch: 1.3, rate: 0.75 });

      // Close menu, unpause
      setShopConvoOpen(false);
      pausedRef.current = false;
    },
    [level, itemDefs]
  );

  const handleShopConvoCancel = useCallback(() => {
    setShopConvoOpen(false);
    pausedRef.current = false;
  }, []);

  const handleInventoryDrop = useCallback((itemId: string) => {
    const state = stateRef.current;
    if (!state) return;
    const idx = state.collectedItems.indexOf(itemId);
    if (idx !== -1) {
      state.collectedItems.splice(idx, 1);
      state.score = Math.max(0, state.score - 25);
    }
  }, []);

  const handleInventoryClose = useCallback(() => {
    setInventoryOpen(false);
    pausedRef.current = false;
  }, []);

  const scaledW = CANVAS_WIDTH * canvasScale;
  const scaledH = CANVAS_HEIGHT * canvasScale;

  return (
    <div style={styles.container} ref={containerRef}>
      <div style={{
        position: "relative",
        width: scaledW,
        height: scaledH,
      }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            ...styles.canvas,
            width: scaledW,
            height: scaledH,
            transform: "none",
          }}
          onClick={handleCanvasClick}
        />
        {isTouchDevice && !shoutMenuOpen && !shopConvoOpen && !inventoryOpen && (
          <TouchControls inputRef={inputRef} canvasScale={canvasScale} />
        )}
        {shoutMenuOpen && (
          <ShoutMenu
            learnedWords={learnedWords}
            onSelect={handleShoutSelect}
            onCancel={handleShoutCancel}
            chadVoice
          />
        )}
        {shopConvoOpen && (
          <ShoutMenu
            learnedWords={convoPhrases}
            onSelect={handleShopConvoSelect}
            onCancel={handleShopConvoCancel}
            forceWASD
            chadVoice
            title="TALK TO SHOPKEEPER"
            subtitle="Spell a phrase with W/A/D, cycle with S"
          />
        )}
        {inventoryOpen && stateRef.current && (
          <InventoryPanel
            collectedItems={[...stateRef.current.collectedItems]}
            itemDefs={itemDefs}
            onDropItem={handleInventoryDrop}
            onClose={handleInventoryClose}
          />
        )}
      </div>
      {!isEmbedded && !isTouchDevice && (
        <div style={styles.controls}>
          <span>
            &larr; &rarr; or A/D to move | &uarr; or W or Space to jump | E to enter/talk/listen | P to shout | I for inventory
          </span>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: isTouchDevice ? "center" : "flex-start",
    paddingTop: isTouchDevice ? 0 : 16,
    minHeight: "100dvh",
    background: "#0a0a1a",
    overflow: "hidden",
  },
  canvas: {
    imageRendering: "pixelated",
    cursor: "pointer",
    display: "block",
  },
  controls: {
    marginTop: 12,
    color: "#666",
    fontSize: 13,
    fontFamily: "monospace",
  },
};
