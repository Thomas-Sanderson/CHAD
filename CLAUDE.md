# Chad Rescues Nobody — CLAUDE.md

## What this is
A language-learning platformer. Players infer Russian vocabulary from context clues in character messages, then test their guesses by collecting items in a side-scrolling level.

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
- React DOM for briefing, gate, reveal phases
- Phase state machine: BRIEFING → RUN → GATE → REVEAL
- Content is data (src/content/), engine is logic (src/engine/)
- No backend. Client-only. Progress in localStorage.

## Content structure
Levels, vocab packs, messages, items, and reveal lines are all data files in src/content/belarus/.
The engine consumes content through typed interfaces. Content never contains logic.
Adding a new level means adding new data files, not changing engine code.

## Testing
- Vitest for unit tests
- Physics and collision get unit tests
- InferenceChecker gets unit tests (correct match, partial match, all wrong, decoys)
- Level data gets validation tests (all vocab words reference valid items, all items are placed)
- Manual playtesting for feel and comedy

## Conventions
- TypeScript strict mode
- No `any` except in entity.data (which is typed per-entity-type at usage)
- Components in PascalCase, utilities in camelCase
- Content data files export typed constants, not default exports
- Commit messages describe what changed and why
