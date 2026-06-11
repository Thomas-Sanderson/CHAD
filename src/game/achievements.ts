import type { LevelData } from "../types/content";

export interface AchievementDef {
  id: string;
  title: string;
  subtitles: Record<string, string>; // skinId → mentor quote
  icon: string;
  iconColor: string;
  points: number;
  check: (stats: RunStats) => boolean;
}

export interface RunStats {
  elapsed: number;          // ms
  collectedCount: number;   // non-sacred items collected
  totalCollectibles: number;
  visitedLandmarks: number;
  totalLandmarks: number;
  vehicleHits: number;
  potatoCollected: boolean;
  correctItemCount: number;
  totalTargetCount: number;
  levelId: string;
  catTimeJumps: number;     // lifetime coyote-time jumps (КОШАЧЬЕ ВРЕМЯ)
}

export interface EarnedAchievement {
  def: AchievementDef;
  isNew: boolean;
}

// Par times in seconds, keyed by level ID
const PAR_TIMES: Record<string, number> = {
  // Belarus
  "grocery-run": 45,
  "tea-emergency": 50,
  "dinner-ingredients": 55,
  "the-apology": 45,
  "saturday-morning": 40,
  "the-market": 70,
  // Italy
  "la-spesa": 45,
  "coffee-emergency": 50,
  "gli-ingredienti": 55,
  "le-scuse": 45,
  "sabato-mattina": 40,
  "il-mercato": 70,
  // Ethiopia
  "coffee-run": 45,
  "market-day": 50,
  "the-dinner": 55,
  "buna-ceremony": 50,
};

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "smell-the-roses",
    title: "Smell the Roses",
    subtitles: {
      belarus: "You stopped at every building. Every single one. ...were you lost or curious? \u2014 A.",
      ethiopia: "You visited every sign on the street. Most people just walk past. ...maybe you're paying attention.",
      italy: "You stopped at every building? Really? ...okay. Maybe you do see this city. \u2014 G.",
    },
    icon: "rose",
    iconColor: "#e91e63",
    points: 50,
    check: (s) => s.totalLandmarks > 0 && s.visitedLandmarks >= s.totalLandmarks,
  },
  {
    id: "packrat",
    title: "Packrat",
    subtitles: {
      belarus: "You grabbed one of everything. ONE OF EVERYTHING. Do you think this is a warehouse?",
      ethiopia: "You took... all of it. Everything. The bag is heavier than you are.",
      italy: "You literally took everything in the store. Everything. The shopkeeper is still staring. \u2014 G.",
    },
    icon: "backpack",
    iconColor: "#8d6e63",
    points: 75,
    check: (s) => s.totalCollectibles > 0 && s.collectedCount >= s.totalCollectibles,
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    subtitles: {
      belarus: "You did that in under a minute. I'm not sure if I should be impressed or concerned.",
      ethiopia: "...that was fast. Did you even read my messages?",
      italy: "You were faster than the Vespa. I don't know how to feel about that. \u2014 G.",
    },
    icon: "lightning",
    iconColor: "#fdd835",
    points: 100,
    check: (s) => {
      const par = PAR_TIMES[s.levelId];
      return par !== undefined && s.elapsed / 1000 < par;
    },
  },
  {
    id: "wrong-answer-expert",
    title: "Wrong Answer Expert",
    subtitles: {
      belarus: "You got everything wrong. Not SOME things. EVERYTHING. That takes a special kind of talent.",
      ethiopia: "Not a single correct item. I'm... I don't have words. In any language.",
      italy: "Zero. Out of all of them. Zero. I need to sit down. \u2014 G.",
    },
    icon: "clown",
    iconColor: "#f44336",
    points: 0,
    check: (s) => s.totalTargetCount > 0 && s.correctItemCount === 0,
  },
  {
    id: "untouchable",
    title: "Untouchable",
    subtitles: {
      belarus: "Not a single marshrutka touched you. The babushkas are impressed. They'll never say it.",
      ethiopia: "You dodged every taxi. Every single one. The aunties want to know your secret.",
      italy: "You avoided every Vespa. In ROME. That's not skill, that's divine intervention. \u2014 G.",
    },
    icon: "ghost",
    iconColor: "#b0bec5",
    points: 75,
    check: (s) => s.vehicleHits === 0,
  },
  {
    id: "sacred-devotion",
    title: "Sacred Devotion",
    subtitles: {
      belarus: "The potato acknowledges you. It has seen empires rise and fall. It is mildly interested.",
      ethiopia: "The bean knows you now. It has watched since Kaffa. It approves. Quietly.",
      italy: "The olive nods. It has pressed civilizations into oil. You amuse it. \u2014 G.",
    },
    icon: "sacred",
    iconColor: "#c4a035",
    points: 0, // 100 already awarded by collection
    check: (s) => s.potatoCollected,
  },
  {
    id: "cat-time",
    title: "КОШАЧЬЕ ВРЕМЯ",
    subtitles: {
      belarus: "The cats like you. I don't know why. Cats don't like anyone. \u2014 A.",
      ethiopia: "The cats watch you jump. They've seen worse. They've seen better. \u2014 S.",
      italy: "I gatti ti guardano. Non ti giudicano. ...sì, ti giudicano. \u2014 G.",
    },
    icon: "cat",
    iconColor: "#cc8844",
    points: 50,
    check: (s) => s.catTimeJumps >= 50,
  },
];

export function countTotalCollectibles(level: LevelData): number {
  if (level.segments?.length) {
    return level.segments.reduce((acc, seg) => acc + seg.collectibles.length, 0);
  }
  return level.collectibles.length;
}

export function countTotalLandmarks(level: LevelData): number {
  let count = level.landmarks?.length ?? 0;
  if (level.segments) {
    for (const seg of level.segments) {
      if (seg.type !== "interior") {
        count += seg.landmarks?.length ?? 0;
      }
    }
  }
  return count;
}

const STORAGE_PREFIX = "chad-achievements-";

export function loadEarnedAchievements(skinId: string, levelId: string): string[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${skinId}-${levelId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEarnedAchievements(skinId: string, levelId: string, ids: string[]): void {
  localStorage.setItem(`${STORAGE_PREFIX}${skinId}-${levelId}`, JSON.stringify(ids));
}

export function loadAllAchievements(skinId: string, levelIds: string[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const levelId of levelIds) {
    const ids = loadEarnedAchievements(skinId, levelId);
    if (ids.length > 0) map.set(levelId, ids);
  }
  return map;
}

export function checkAndAwardAchievements(
  stats: RunStats,
  skinId: string,
  levelId: string,
): EarnedAchievement[] {
  const previouslyEarned = new Set(loadEarnedAchievements(skinId, levelId));
  const earned: EarnedAchievement[] = [];
  const newIds: string[] = [...previouslyEarned];

  for (const def of ACHIEVEMENTS) {
    if (def.check(stats)) {
      const isNew = !previouslyEarned.has(def.id);
      earned.push({ def, isNew });
      if (isNew) newIds.push(def.id);
    }
  }

  if (newIds.length > previouslyEarned.size) {
    saveEarnedAchievements(skinId, levelId, newIds);
  }

  return earned;
}
