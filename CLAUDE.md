# Chad Rescues Nobody — CLAUDE.md

## What this is
A language-learning platformer. Players infer vocabulary from context clues in character messages, then test their guesses by collecting items in a side-scrolling level.

## The two rules
1. Is it funny?
2. Did the player learn a word?

If both yes, ship it. If either no, fix it.

## Locked creative decisions
- The joke is ALWAYS "Chad is an idiot." NEVER "Belarus is weird."
- Anya is never a damsel. She's smarter than Chad and increasingly annoyed by him.
- Learning happens through inference, not instruction. No flashcards. No translations during gameplay.
- Failure is funny, not punitive. The "ГДЕ ПРОДУКТЫ?!" scream is a comedy beat.
- The Sacred Potato is always watching.

## Architecture
- React + TypeScript + Vite
- Canvas for the platformer run phase
- React DOM for all other phases (briefing, gate, sorting, decode, reveal, etc.)
- Content is data (src/content/), engine is logic (src/engine/)
- Skin system: each skin provides all content the engine needs
- No backend. Client-only. Progress + achievements in localStorage per skin.
- Desktop viewport constrained to 1200×520px landscape ratio (src/index.css)

## Phase flow
```
BOOT → SKIN_SELECT → LEVEL_SELECT → BRIEFING → RUN → GATE →
  (if passed) SORTING → (if mystery cans) DECODE → REVEAL →
  (next level or WIN)
  (if failed) back to RUN
```

| Phase | Component | What it does |
|-------|-----------|-------------|
| Boot | BootScreen.tsx | Splash screen |
| Skin Select | SkinSelectScreen.tsx | Pick country/language |
| Level Select | LevelSelectScreen.tsx | Pick level, shows progress + achievements |
| Briefing | BriefingScreen.tsx | Chat UI teaches vocab words before run |
| Run | RunPhase.tsx | Canvas platformer — collect items, avoid hazards |
| Death | DeathScreen.tsx | Hearts hit 0, restart option |
| Gate | GateScreen.tsx | Pass/fail check + achievement display |
| Sorting | SortingScreen.tsx | Match items to vocab words from bag |
| Decode | DecodeScreen.tsx | Spell mystery can words letter by letter |
| Reveal | RevealScreen.tsx | Score card, mentor commentary per word |
| Win | WinScreen.tsx | All levels cleared |

## Briefing screen
Phone-style chat UI. Anya sends messages containing highlighted vocab words.

**Two vocab colors:**
- **Yellow (#FFD54F)** — item words (things to collect: РЫБА, ХЛЕБ, АСПИРИН)
- **Blue (#64B5F6)** — location words (places to go: РЫБНАЯ, ПЕКАРНЯ, АПТЕКА)

**Auto-force sequence:** When a message appears, all vocab words in it are shown in the left card panel one at a time in text order, with a 2s delay between each. Clicking any word pins it until the next message advances. Uses longest-match-first to avoid substring collisions (РЫБА inside РЫБНАЯ).

**L10+ message structure:** Each item/location pair gets two separate messages — item word first ("I need РЫБА"), then location word ("РЫБНАЯ. The fish shop."). This gives each word its own moment in the card sequence.

## Vocab word system (src/types/content.ts)
```ts
VocabWord {
  id, script, translation, pronunciation?, ipa?, hint?,
  matchesItemId: string | null,     // null = meta-word (ПРОДУКТЫ, МАГАЗИН)
  category?: "item" | "location",   // default "item"
}
```
- **Item words** have `matchesItemId` pointing to a CollectibleItem. Tested in sorting.
- **Location words** have `category: "location"` and `matchesItemId: null`. Tested through gameplay navigation (finding the right shop), NOT in sorting.
- Sorting screen filters: `w.matchesItemId !== null && w.category !== "location"`

## Mystery can system
Decoy items that look like grey cans in-game. Player decodes the Cyrillic word letter-by-letter on the decode screen. Each can has:
- `script` — the word to decode (e.g., "ГРЕЧКА")
- `revealName` — English name shown after decode ("Buckwheat")
- `revealSpriteId` — sprite shown on success (e.g., "grechka_reveal")
- `hints[]` — mentor hints after repeated wrong letters

**Rule:** Mystery can words must be standalone grocery items buyable at a store. No "canned-only" words (тушёнка, сгущёнка) — these teach the can word, not the ingredient.

## Content structure
Three skins: Belarus (Russian, 13 levels), Ethiopia (Amharic, 4 levels), Italy (Italian, 6 levels).

Levels, vocab packs, messages, items, and reveal lines are data files in `src/content/{skin}/`.
The engine consumes content through typed interfaces. Content never contains logic.
Adding a new level means adding new data files, not changing engine code.

### Level progression (Belarus)
| Levels | Layout | What's new |
|--------|--------|-----------|
| L1-L5 | Flat (single ground plane) | Core item vocab, mystery cans |
| L6 | 2 avenues, 1 corridor | Segment system, shops, shopkeepers, doors |
| L7 | 2 avenues, stairs | Vertical navigation |
| L8 | 3 avenues | Multiple floors, locked doors |
| L9 | 4 avenues | Full vertical city |
| L10 | 4 avenues | Shop name vocab (item + location pairs) |
| L11 | 5 avenues | New neighborhood, pharmacy |
| L12 | 5 avenues, 7 streets | Full city map, all shops |
| L13 | 5 avenues, 7 streets | Spring City — same geometry as L12, spring season |

## Segment system (L6+)
Multi-avenue levels use segments: typed sections of the world with their own platforms, items, doors, and NPCs.

**Segment types:**
- `"street"` — outdoor avenues with corridors, landmarks, shop doors, street signs
- `"interior"` — shop inside with shelves, counter, shopkeeper, collectibles

**Key structures:**
- **StreetCorridor** `{ x, width, topY, bottomY }` — vertical passage between two avenues
- **DoorDef** — portal between segments. `locked: true` requires shouting vocab to open
- **ShopKeeperDef** — NPC inside shops that accepts/rejects items with ДА/НЕТ responses
- **LandmarkDef** — visual building sprites on avenues (АПТЕКА, БАНК, ШКОЛА, etc.)
- **StreetSignDef** — Soviet-style blue plates mounted on corridor walls, showing street + avenue names

## Sprite system (src/engine/sprites.ts)
All art is pixel-art defined as 2D arrays of hex color strings (null = transparent).
```ts
type SpriteData = (string | null)[][];
```
- Item sprites: ~16×13, registered in `itemSpriteMap` by item ID
- Landmark sprites: 14-24px wide, drawn at 4x scale
- Shop facades: 24×24, drawn at 4x scale (96px), centered on doors
- Street sign plates: variable width (measured text + 12px padding)
- Chad: 16×24 at 2x scale
- All drawn with `drawSprite(ctx, sprite, x, y, scale)` using fillRect per pixel

## Visual overlap rules
Street signs, shop door facades, and landmark buildings must not overlap on the same avenue. Enforced by a validation test in `level1.test.ts`:
- Sign plate width: computed from text content (chars × 6px + 12px padding)
- Sign mount position: mirrors renderer's corridor-binding logic (left wall vs right wall)
- Signs at same intersection are merged (renderer groups signs within 120px on same avenue)
- Door facade half-width: 48px. Landmark half-width: 48px.
- Tolerance: entities within 200px Y are considered same avenue.

## Achievement system
Six achievements tracked per-skin per-level in localStorage (src/game/achievements.ts):
Smell the Roses, Packrat, Speed Demon, Wrong Answer Expert, Untouchable, Sacred Devotion.
SVG badge icons (src/game/AchievementBadge.tsx). Displayed on gate success screen and level select.

## Audio system
- Procedural chiptune music with dual-instance phase offset (src/engine/music.ts)
- Procedural SFX via Web Audio API (src/engine/sfx.ts)
- Speech synthesis for mentor/Chad voices (src/engine/audio.ts)
- Global AudioControls component with mute toggle + phase slider (src/game/AudioControls.tsx)
- iOS iframe unlock: silent buffer + resume on first user gesture; music restarts after unlock
- Mute silences all three systems (music, SFX, speech)

## Testing
- Vitest for unit tests (`npx vitest run`)
- Physics and collision get unit tests (src/engine/physics.test.ts)
- InferenceChecker gets unit tests (src/game/inferenceChecker.test.ts)
- Level data validation across all skins (src/content/belarus/level1.test.ts):
  - All vocab words reference valid items
  - All target items are placed in level/segments
  - All vocab words with matchesItemId have reveal lines
  - Start/gate positions within bounds
  - At least one babushka patrol NPC and one sacred item per level
  - At least 3 decoy items per level
  - **Signs/doors/landmarks don't overlap** in street segments (visual bounds check)
- Manual playtesting for feel and comedy

## Design history
The original creative prompts that built this project are preserved in [docs/SEEDS.md](docs/SEEDS.md).

## Conventions
- TypeScript strict mode
- No `any` except in entity.data (which is typed per-entity-type at usage)
- Components in PascalCase, utilities in camelCase
- Content data files export typed constants, not default exports
- Commit messages describe what changed and why
