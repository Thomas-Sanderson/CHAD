export type Phase = "BRIEFING" | "RUN" | "GATE" | "REVEAL";

export interface Vec2 {
  x: number;
  y: number;
}

export interface AABB {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PlayerState {
  position: Vec2;
  velocity: Vec2;
  onGround: boolean;
  width: number;
  height: number;
  lastSafePosition: Vec2;
  facing: "left" | "right";
  invincibleUntil: number; // timestamp, 0 = not invincible
  dead: boolean;
}

export interface ActiveMarshrutka {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
}

export interface BabushkaState {
  x: number;
  y: number;
  originX: number;
  patrolRange: number;
  speed: number;
  direction: 1 | -1;
  width: number;
  height: number;
  scoldingText: string | null;
  scoldingUntil: number;
  segmentId?: string;
}

export interface PotatoState {
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
  segmentId?: string;
}

export interface CollectedInfo {
  itemId: string;
  x: number;
  y: number;
}

export interface ShoutResponse {
  type: "da" | "net";
  text: string;
  until: number;
}

export interface DoorTransition {
  phase: "fadeOut" | "fadeIn";
  timer: number;
  targetSegmentId: string;
  targetX: number;
  targetY: number;
}

export interface GameRunState {
  player: PlayerState;
  collectedItems: string[];
  marshrutkas: ActiveMarshrutka[];
  babushkas: BabushkaState[];
  potato: PotatoState | null;
  remainingCollectibles: CollectedInfo[];
  camera: { x: number };
  score: number;
  reachedGate: boolean;
  elapsed: number;
  scoldings: string[];
  // Segment state
  currentSegmentId: string | null;
  segmentCollectibles: Record<string, CollectedInfo[]>;
  unlockedDoors: string[];
  nearDoor: string | null;
  transition: DoorTransition | null;
  // Shout mechanic
  shoutMenuOpen: boolean;
  shoutTarget: string | null; // door ID for locked doors
  shoutResponse: ShoutResponse | null;
}

export interface InputState {
  left: boolean;
  right: boolean;
  jump: boolean;
  interact: boolean;
}

export interface InferenceResult {
  passed: boolean;
  matches: { vocabWordId: string; correct: boolean; collectedItemId: string | null }[];
  score: number;
}
