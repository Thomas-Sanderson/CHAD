# CC Prompt: Skin System + Ethiopia Skin

## What this adds

Two things:

1. **Skin selection system.** The game currently hardcodes Belarus content. Refactor so content is loaded from a skin directory, and add a skin select screen before level select. Two skins at launch: Belarus and Ethiopia.

2. **Ethiopia skin.** Full content for a second country — Amharic language, Addis Ababa setting, new characters, new items, new environment. Same engine, same mechanics. See `SKIN_ETHIOPIA_CONTENT.md` (delivered alongside this prompt) for all content.

## Skin architecture

A skin provides everything the engine needs to render a complete game experience:

```typescript
interface Skin {
  id: string                    // "belarus" | "ethiopia"
  name: string                  // display name
  language: string              // "Russian" | "Amharic"
  character: {
    player: CharacterDef        // Chad is always Chad, but same structure
    mentor: MentorDef           // Anya / Tigist — name, portrait
    hazardNPC: NPCDef           // Babushka / Auntie
    hazardVehicle: VehicleDef   // Marshrutka / Blue Taxi
    sacredItem: SacredItemDef   // Potato / Coffee Bean
  }
  environment: {
    groundTile: SpriteDef
    platformTile: SpriteDef
    gateBuilding: SpriteDef
    gateLabel: string           // "КВАРТИРА" / "ቡና ቤት"
    skyColor: string            // hex
    palette: Record<string, string>
  }
  levels: LevelData[]           // 4 levels per skin
  items: CollectibleItem[]      // all items for this skin
  vocabPacks: VocabPack[]
  briefings: BriefingScript[]
  reveals: RevealLine[][]
  gateFails: string[]           // one per level
  winMessage: string            // final message after all levels
}
```

The engine consumes a Skin object. It doesn't know or care which skin is loaded. All rendering, physics, and game logic work identically regardless of skin.

## Skin select screen

Before level select, show a skin selection screen. Two cards:

**Belarus** — flag colors or visual hint, "Russian" language label, "Anya" character name
**Ethiopia** — flag colors or visual hint, "Amharic" language label, "Tigist" character name

Each card shows the mentor's name and the language being learned. Selecting a skin loads that skin's content and goes to level select. Progress is tracked per-skin in localStorage.

Keep the UI minimal and consistent with the game's dark retro aesthetic.

## Ethiopia content

All content is in `SKIN_ETHIOPIA_CONTENT.md`. Key differences from Belarus:

**Characters:**
- Mentor: Tigist (ትግስት) — software engineer in Addis. Warmer than Anya but equally sharp.
- Hazard NPCs: Aunties from Merkato (shove + "ቀጭን ነህ!" text flash)
- Hazard vehicles: Blue-and-white minibus taxis (blue #3355aa / white #ddddee)
- Sacred item: Coffee Bean (dark brown, ancient knowing eyes, golden glow, serene)

**Environment:**
- Ground: warm tan cobblestone (#d4a574)
- Platforms: wood planks with tin patches (#5c3a1e wood, #8899aa tin)
- Gate: coffee house with "ቡና ቤት" sign
- Sky: bright blue (#4a90c4) — high-altitude daylight, not dark/night

**Items:** 16 new items total across 4 levels. See the content doc for full list with descriptions.

**Pedagogical note:** Items rotate between decoy and target across levels (berbere is decoy in L1, target in L2; injera is decoy in L2, target in L3). This is deliberate — repeated exposure in different contexts builds acquisition.

**Emotional arc of gate fails:**
- L1: "ቡናዬ የት ነው?!" (Where is my coffee?!) — personal
- L2: "ምን ይዘህ መጣህ?!" (What did you bring?!) — exasperated
- L3: "እራት የለም።" (There is no dinner.) — flat, final
- L4: "ይሂዱ።" (Go.) — one word, formal register, devastating

## Sprite approach

Same as Belarus — pixel art drawn directly on canvas via fillRect. New color palette for Ethiopia (warmer tones — see palette in the content doc). Chad keeps his existing sprites but the world around him changes completely.

New sprites needed:
- Auntie NPC (replaces babushka)
- Blue taxi (replaces marshrutka)
- Sacred Coffee Bean (replaces potato)
- All 16 food/item sprites
- Environment tiles (cobblestone, wood platforms, coffee house gate, blue sky)

## Files to create

```
src/content/ethiopia/
  levels/
    level1.ts through level4.ts
  vocab/
    level1.ts through level4.ts
  messages/
    level1.ts through level4.ts
  reveals/
    level1.ts through level4.ts
  characters.ts
  items.ts
```

## Files to modify

- **App.tsx or Game.tsx** — add skin select screen before level select
- **Content loading** — refactor to load from a skin directory instead of hardcoded belarus
- **Types** — add Skin interface if it doesn't exist
- **Renderer** — add new sprite data for Ethiopia characters/items/tiles
- **Progress tracker** — track progress per-skin

## Don't touch

- Engine core (physics, collision, game loop)
- Phase state machine logic
- Inference checker
- Belarus content (it stays exactly as-is, just loaded through the skin system instead of directly)

## Acceptance criteria

- [ ] Skin select screen appears at game start with Belarus and Ethiopia options
- [ ] Selecting a skin loads that skin's content throughout the entire game
- [ ] All 4 Ethiopia levels are playable end-to-end
- [ ] Ethiopia environment visuals are distinctly different from Belarus (warm palette, bright sky)
- [ ] Auntie NPCs shove Chad with Amharic scolding text
- [ ] Blue taxis replace marshrutkas as hazards
- [ ] Sacred Coffee Bean replaces Sacred Potato (same mechanic, different sprite)
- [ ] Gate building shows "ቡና ቤት" sign
- [ ] Each level has its own unique gate fail line
- [ ] Win screen shows Tigist's final message
- [ ] Progress is tracked separately per skin
- [ ] Belarus still works exactly as before
- [ ] All existing tests pass
- [ ] New level data passes validation tests
