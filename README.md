# Chad Rescues Nobody

A language-learning platformer where players infer vocabulary from context clues. A clueless American named Chad tries to "rescue" women who don't need rescuing — they text him grocery lists in their native language, and he has to figure out what to collect in a side-scrolling level. The joke is always Chad.

Two skins ship today: **Belarus** (Russian/Cyrillic, 6 levels) and **Ethiopia** (Amharic/Ge'ez, 4 levels).

## Run it

```bash
npm install
npm run dev
```

## Test it

```bash
npm test
```

## How it works

**Content is data, engine is logic.** The engine handles physics, rendering, input, collision, the inference checker, and the phase state machine. Content provides characters, messages, vocab packs, level layouts, items, and reveal lines. Adding a new language means adding a new content directory, not changing engine code.

**Phase system:** SKIN_SELECT -> BRIEFING -> RUN -> GATE -> REVEAL

**Learning model:** Contextual inference. No flashcards, no translations during gameplay. Players see unfamiliar script in chat messages, guess meanings from context, test guesses by collecting items, and get feedback at the gate.

## Project structure

```
src/
  content/       # Skin data (belarus/, ethiopia/)
  engine/        # Physics, rendering, collision, segments
  game/          # React components for each phase
  types/         # TypeScript interfaces
```

See [CLAUDE.md](CLAUDE.md) for contribution conventions.
See [docs/SEEDS.md](docs/SEEDS.md) for the original design prompts that built this project.
