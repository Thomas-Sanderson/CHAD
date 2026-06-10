export type Phase = "BRIEFING" | "RUN" | "GATE" | "SORTING" | "DECODE" | "REVEAL";

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
  lastGroundedTime: number; // elapsed ms when player was last on ground (coyote time)
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
  stunUntil: number;
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

export interface DroppingItem {
  itemId: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface ShoutResponse {
  type: "da" | "net";
  text: string;
  until: number;
}

export interface ShopConvoState {
  greetIndex: number;
  farewellIndex: number;
  askedItems: string[];   // item IDs player has asked about
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
  droppingItems: DroppingItem[];
  camera: { x: number; y: number };
  score: number;
  reachedGate: boolean;
  elapsed: number;
  scoldings: string[];
  headBounceCurse: string;
  pointPhrase: string; // what Chad says when pointing ("пожалуйста" / "per favore")
  // Segment state
  currentSegmentId: string | null;
  segmentCollectibles: Record<string, CollectedInfo[]>;
  unlockedDoors: string[];
  nearDoor: string | null;
  nearLandmark: string | null; // landmark label when player is near one
  transition: DoorTransition | null;
  // Shout mechanic
  shoutMenuOpen: boolean;
  shoutTarget: string | null; // door ID for locked doors
  shoutResponse: ShoutResponse | null;
  // Gate
  nearGate: boolean;
  // Flag animation
  flagProgress: number;
  // Hearts system
  hitCount: number;
  // Achievement tracking
  visitedLandmarks: Set<string>;
  // Inventory
  inventoryOpen: boolean;
  // Shopkeeper conversation
  nearShopkeeper: boolean;
  nearItem: string | null;       // item ID player is standing near (for "what is this?")
  shopConvo: ShopConvoState | null;
  shopConvoMenuOpen: boolean;
  shopBubble: { text: string; pronunciation?: string; translation?: string; until: number } | null;
}

export interface InputState {
  left: boolean;
  right: boolean;
  shout: boolean; // P key — locked door shout menu
  jump: boolean;
  jumpHeld: boolean; // true while jump key is physically held (variable jump height)
  interact: boolean;
  inventory: boolean; // I key — open inventory
}

export interface InferenceResult {
  passed: boolean;
  matches: { vocabWordId: string; correct: boolean; collectedItemId: string | null }[];
  score: number;
}
