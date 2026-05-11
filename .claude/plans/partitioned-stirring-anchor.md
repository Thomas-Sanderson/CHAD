# Plan: Fix ГРИБ not available in shout menu (L6 locked door bug)

## Context

In level 6, the ОВОЩИ-ФРУКТЫ (veggies) shop has a locked door. To unlock it, the player must press [E] → Shout → select ГРИБ (mushroom). But the ShoutMenu only shows **previously learned** words — words that were matched correctly in earlier levels' gate phases. Since ГРИБ is introduced for the first time in L6's vocab pack, it's not in `learnedVocab` yet, so the player literally cannot shout it. The mushroom is unobtainable, the gate fails at 3/4 correct, and the level is unwinnable.

## Root cause

`src/game/Game.tsx` lines 78-89: `learnedWordsForSkin` is built exclusively from `learnedVocab[currentSkin.id]`, which is populated only on gate success (line 181). The current level's vocab pack is never included. So any word introduced in the current level that needs to be shouted at a locked door is a dead end.

```tsx
// Current (broken) — only words from completed levels
const learnedWordsForSkin: VocabWord[] = useMemo(() => {
  const learnedIds = learnedVocab[currentSkin.id] ?? [];
  // ...only includes words whose id is in learnedIds
}, [currentSkin, learnedVocab]);
```

## Fix

In `src/game/Game.tsx`, after building the list from `learnedVocab`, also merge in the current level's vocab words (filtered to `matchesItemId !== null`, deduplicated). The briefing has already taught these words — the player should be able to use them.

```tsx
const learnedWordsForSkin: VocabWord[] = useMemo(() => {
  const learnedIds = learnedVocab[currentSkin.id] ?? [];
  const words: VocabWord[] = [];
  for (const level of currentSkin.levels) {
    for (const word of level.vocabPack.words) {
      if (learnedIds.includes(word.id) && word.matchesItemId !== null) {
        words.push(word);
      }
    }
  }
  // Include current level's vocab — player just learned these in briefing
  for (const word of currentLevel.vocabPack.words) {
    if (word.matchesItemId !== null && !words.some(w => w.id === word.id)) {
      words.push(word);
    }
  }
  return words;
}, [currentSkin, learnedVocab, currentLevel]);
```

## Critical files

| File | Change |
|------|--------|
| `src/game/Game.tsx` | Merge current level vocab into `learnedWordsForSkin` (lines 78-89) |

One file, ~4 lines added.

## Don't touch

- ShoutMenu component (it already renders whatever words it receives)
- RunPhase (it passes `learnedWords` through unchanged)
- Level data, vocab packs, briefings, shopkeeper acceptsItemIds
- Gate/inference logic

## Verification

1. `npx tsc --noEmit` — clean
2. `npx vitest run` — all 168 tests pass
3. Play L6: reach veggies door → press [E] → ShoutMenu shows ГРИБ → select it → door unlocks → collect mushroom → gate passes 4/4
