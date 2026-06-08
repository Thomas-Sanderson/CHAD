import { useState, useMemo, useCallback, useEffect } from "react";
import type { Phase, GameRunState, InferenceResult, SkinConfig, VocabWord } from "../types";
import type { CollectibleItem } from "../types/content";
import { belarusSkin } from "../content/belarus";
import { ethiopiaSkin } from "../content/ethiopia";
import { checkInference, calculateLevelScore } from "./index";
import type { LevelScore } from "./scoring";
import { buildShoutWords } from "./shoutWords";
import { SkinSelectScreen } from "./SkinSelectScreen";
import { BootScreen } from "./BootScreen";
import { BriefingScreen } from "./BriefingScreen";
import { RunPhase } from "./RunPhase";
import { GateScreen } from "./GateScreen";
import { RevealScreen } from "./RevealScreen";
import { LevelSelectScreen } from "./LevelSelectScreen";
import { WinScreen } from "./WinScreen";
import { DeathScreen } from "./DeathScreen";
import { sfxDeath } from "../engine/sfx";
import { startMusic, stopMusic } from "../engine/music";

const ALL_SKINS: SkinConfig[] = [belarusSkin, ethiopiaSkin];

type GameScreen = "BOOT" | "COUNTRY_SELECT" | "LEVEL_SELECT" | Phase | "WIN";

interface LevelProgress {
  completed: boolean;
  score: number;
}

const STORAGE_KEY = "chad-rescues-nobody-progress";
const VOCAB_STORAGE_KEY = "chad-rescues-nobody-vocab";

function loadProgress(): Map<string, LevelProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, LevelProgress>;
      return new Map(Object.entries(parsed));
    }
  } catch {
    // corrupted data, start fresh
  }
  return new Map();
}

function saveProgress(progress: Map<string, LevelProgress>): void {
  const obj: Record<string, LevelProgress> = {};
  for (const [key, val] of progress) {
    obj[key] = val;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

// Progress keys are scoped per-skin: "skinId:levelId"
function progressKey(skinId: string, levelId: string): string {
  return `${skinId}:${levelId}`;
}

export function Game() {
  const [screen, setScreen] = useState<GameScreen>("BOOT");
  const [currentSkin, setCurrentSkin] = useState<SkinConfig>(belarusSkin);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [progress, setProgress] = useState(() => loadProgress());
  const [inferenceResult, setInferenceResult] = useState<InferenceResult | null>(null);
  const [levelScore, setLevelScore] = useState<LevelScore | null>(null);
  const [collectedPotato, setCollectedPotato] = useState(false);
  const [runScore, setRunScore] = useState(0);

  // Hearts system
  const [hearts, setHearts] = useState(3);
  const [maxHearts, setMaxHearts] = useState(3);
  const [isDead, setIsDead] = useState(false);
  const [deathQuipIndex, setDeathQuipIndex] = useState(0);

  // Learned vocabulary tracking (persisted per skin)
  const [learnedVocab, setLearnedVocab] = useState<Record<string, string[]>>(() => {
    try {
      const raw = localStorage.getItem(VOCAB_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(learnedVocab));
  }, [learnedVocab]);

  const learnedWordsForSkin: VocabWord[] = useMemo(() => {
    const learnedIds = learnedVocab[currentSkin.id] ?? [];
    return buildShoutWords(currentSkin, learnedIds, currentLevelIndex);
  }, [currentSkin, learnedVocab, currentLevelIndex]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const currentLevel = currentSkin.levels[currentLevelIndex]!;

  const itemDefs = useMemo(() => {
    const map = new Map<string, CollectibleItem>();
    for (const item of currentLevel.items) {
      map.set(item.id, item);
    }
    return map;
  }, [currentLevel]);

  // Progress scoped to current skin
  const skinProgress = useMemo(() => {
    const map = new Map<string, LevelProgress>();
    for (const level of currentSkin.levels) {
      const key = progressKey(currentSkin.id, level.id);
      const prog = progress.get(key);
      if (prog) map.set(level.id, prog);
    }
    return map;
  }, [progress, currentSkin]);

  const handleSelectSkin = useCallback((skinId: string) => {
    const skin = ALL_SKINS.find(s => s.id === skinId);
    if (skin) {
      setCurrentSkin(skin);
      setScreen("LEVEL_SELECT");
    }
  }, []);

  const handleSelectLevel = useCallback((index: number) => {
    setCurrentLevelIndex(index);
    setInferenceResult(null);
    setLevelScore(null);
    setCollectedPotato(false);
    setRunScore(0);
    setScreen("BRIEFING");
  }, []);

  const handleBriefingComplete = useCallback(() => {
    setScreen("RUN");
  }, []);

  const handleGateReached = useCallback(
    (state: GameRunState) => {
      const result = checkInference(
        state.collectedItems,
        currentLevel.vocabPack,
        itemDefs
      );
      setInferenceResult(result);
      setRunScore(state.score);
      setCollectedPotato(state.potato?.collected ?? false);
      setScreen("GATE");
    },
    [currentLevel, itemDefs]
  );

  const handleHeartLost = useCallback(() => {
    setHearts(prev => {
      const next = prev - 1;
      if (next <= 0) {
        setIsDead(true);
        setDeathQuipIndex(i => (i + 1) % (currentSkin.deathQuips.length || 1));
        sfxDeath();
        stopMusic();
      }
      return Math.max(0, next);
    });
  }, [currentSkin.deathQuips.length]);

  const handleDeathRestart = useCallback(() => {
    setHearts(3);
    setMaxHearts(3);
    setIsDead(false);
    setInferenceResult(null);
    setLevelScore(null);
    setCollectedPotato(false);
    setRunScore(0);
    setScreen("BRIEFING");
  }, []);

  const handleHeartsRefilled = useCallback(() => {
    // Called after reveal screen heart refill animation
  }, []);

  const checkGateResult = useCallback((state: GameRunState): boolean => {
    const result = checkInference(state.collectedItems, currentLevel.vocabPack, itemDefs);
    return result.passed;
  }, [currentLevel, itemDefs]);

  const handleRestart = useCallback(() => {
    setInferenceResult(null);
    setLevelScore(null);
    setCollectedPotato(false);
    setRunScore(0);
    setScreen("BRIEFING");
  }, []);

  const handleReveal = useCallback(() => {
    if (inferenceResult) {
      const score = calculateLevelScore(runScore, inferenceResult, collectedPotato);
      setLevelScore(score);

      setProgress(prev => {
        const next = new Map(prev);
        const key = progressKey(currentSkin.id, currentLevel.id);
        const existing = next.get(key);
        next.set(key, {
          completed: true,
          score: Math.max(score.total, existing?.score ?? 0),
        });
        return next;
      });

      // Merge correctly-matched words into learned vocab
      const correctWordIds = inferenceResult.matches
        .filter(m => m.correct)
        .map(m => m.vocabWordId);
      if (correctWordIds.length > 0) {
        setLearnedVocab(prev => {
          const existing = prev[currentSkin.id] ?? [];
          const merged = [...new Set([...existing, ...correctWordIds])];
          return { ...prev, [currentSkin.id]: merged };
        });
      }
    }
    // Heart refill: sacred item delivery refills hearts; extra life if at max
    if (collectedPotato) {
      if (hearts === maxHearts && maxHearts < 5) {
        setMaxHearts(prev => prev + 1);
        setHearts(prev => prev + 1);
      } else {
        setHearts(maxHearts);
      }
    } else {
      setHearts(maxHearts);
    }

    setScreen("REVEAL");
  }, [inferenceResult, runScore, collectedPotato, currentSkin.id, currentLevel.id, hearts, maxHearts]);

  const handleNextLevel = useCallback(() => {
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex >= currentSkin.levels.length) {
      setScreen("WIN");
    } else {
      setCurrentLevelIndex(nextIndex);
      setInferenceResult(null);
      setLevelScore(null);
      setCollectedPotato(false);
      setRunScore(0);
      setScreen("BRIEFING");
    }
  }, [currentLevelIndex, currentSkin.levels.length]);

  const handleBackToLevels = useCallback(() => {
    setScreen("LEVEL_SELECT");
  }, []);

  const handleBackToSkins = useCallback(() => {
    setScreen("COUNTRY_SELECT");
  }, []);

  const totalScore = useMemo(() => {
    let total = 0;
    for (const level of currentSkin.levels) {
      const key = progressKey(currentSkin.id, level.id);
      const prog = progress.get(key);
      if (prog) total += prog.score;
    }
    return total;
  }, [progress, currentSkin]);

  const hasNextLevel = currentLevelIndex < currentSkin.levels.length - 1;

  // Music lifecycle
  useEffect(() => {
    if (screen === "BOOT" || screen === "COUNTRY_SELECT" || screen === "LEVEL_SELECT") {
      startMusic("title");
    } else if (screen === "BRIEFING" || screen === "RUN") {
      startMusic("level");
    } else if (screen === "WIN") {
      stopMusic();
    }
  }, [screen]);

  switch (screen) {
    case "BOOT":
      return <BootScreen onComplete={() => setScreen("COUNTRY_SELECT")} />;
    case "COUNTRY_SELECT":
      return (
        <SkinSelectScreen
          skins={ALL_SKINS}
          onSelectSkin={handleSelectSkin}
        />
      );
    case "LEVEL_SELECT":
      return (
        <LevelSelectScreen
          levels={currentSkin.levels}
          progress={skinProgress}
          onSelectLevel={handleSelectLevel}
          skinName={currentSkin.name}
          onBackToSkins={handleBackToSkins}
        />
      );
    case "BRIEFING":
      return (
        <BriefingScreen
          briefing={currentLevel.briefing}
          vocabPack={currentLevel.vocabPack}
          onComplete={handleBriefingComplete}
          mentorName={currentSkin.mentorName}
          mentorAvatar={currentSkin.mentorAvatar}
          mentorColor={currentSkin.mentorColor}
        />
      );
    case "RUN":
      if (isDead) {
        return (
          <DeathScreen
            deathText={currentSkin.deathText}
            quip={currentSkin.deathQuips[deathQuipIndex % currentSkin.deathQuips.length] ?? "..."}
            mentorAvatar={currentSkin.mentorAvatar}
            mentorColor={currentSkin.mentorColor}
            messageColor={currentSkin.messageColor}
            onRestart={handleDeathRestart}
          />
        );
      }
      return (
        <RunPhase
          key={`${currentSkin.id}-${currentLevel.id}`}
          level={currentLevel.levelData}
          itemDefs={itemDefs}
          environment={currentSkin.environment}
          onGateReached={handleGateReached}
          onHeartLost={handleHeartLost}
          hearts={hearts}
          maxHearts={maxHearts}
          checkGateResult={checkGateResult}
          learnedWords={learnedWordsForSkin}
          vocabWords={currentLevel.vocabPack.words}
        />
      );
    case "GATE":
      return inferenceResult ? (
        <GateScreen
          result={inferenceResult}
          vocabPack={currentLevel.vocabPack}
          gateFailText={currentLevel.gateFailText}
          gateFailQuiet={currentLevel.gateFailQuiet}
          mentorName={currentSkin.mentorName}
          onRestart={handleRestart}
          onReveal={handleReveal}
        />
      ) : null;
    case "REVEAL":
      return inferenceResult && levelScore ? (
        <RevealScreen
          vocabPack={currentLevel.vocabPack}
          inferenceResult={inferenceResult}
          revealLines={currentLevel.revealLines}
          itemDefs={itemDefs}
          score={levelScore}
          collectedPotato={collectedPotato}
          hasNextLevel={hasNextLevel}
          onNextLevel={handleNextLevel}
          onBackToLevels={handleBackToLevels}
          hearts={hearts}
          maxHearts={maxHearts}
          sacredItemName={currentSkin.sacredItemName}
          onHeartsRefilled={handleHeartsRefilled}
        />
      ) : null;
    case "WIN":
      return (
        <WinScreen
          totalScore={totalScore}
          mentorAvatar={currentSkin.mentorAvatar}
          mentorColor={currentSkin.mentorColor}
          messageColor={currentSkin.messageColor}
          winMessage={currentSkin.winMessage}
          wordsLearned={currentSkin.wordsLearned}
          sacredItemLine={currentSkin.sacredItemLine}
          onBackToLevels={handleBackToLevels}
        />
      );
  }
}
