# Chad Rescues Nobody

## Premise
A clueless American named Chad tries to "rescue" a Belarusian woman named Anya who does not need rescuing. She texts him in mixed English/Russian. Cyrillic words appear in her messages. The player doesn't know what they mean. Then they're in a side-scrolling level, surrounded by collectible objects. They grab the ones they *think* match the Cyrillic words. At the end, they find out if they were right.

## Learning Model
**Contextual inference** — no flashcards, no translations, no instruction. The player guesses from context, tests the guess through gameplay, and builds real vocabulary acquisition through repetition and embodied association.

The comedy is the pedagogy. The joke is always "Chad is an idiot," never "Belarus is weird." Failure is funny, not punitive.

## Game Phases

Each level has four phases played in sequence:

### BRIEFING
Anya's text messages scroll in. Mixed English/Russian. The Cyrillic words are the vocabulary targets. The player reads and infers. Rendered as a phone chat thread (React DOM).

### RUN
Side-scrolling platformer. Canvas-rendered. Chad moves, jumps, collects items, avoids hazards. Some items match the vocab words. Some are decoys.

### GATE
End-of-level check. Player reaches a building. Collected inventory is compared against vocab targets. Match = pass. Mismatch = comedic failure and restart at briefing.

### REVEAL
On success, each vocab word is shown paired with the item the player collected. Anya roasts Chad in character. This is where learning crystallizes.

## Architecture

### Two Layers
- **Engine** — platforming physics, game loop, rendering, input, collision, collection mechanic, the inference checker, phase state machine, scoring. Skin-agnostic.
- **Content** — all content for a specific language/setting pair. Characters, messages, vocab packs, level layouts, item definitions, reveal lines. Belarus is the first skin.

### Tech Stack
- React 18+ with TypeScript
- Vite
- HTML5 Canvas for the platformer
- Vitest for testing
- No backend. Client-side only. Progress in localStorage.
- No external game framework.

## Characters

### Chad
Player character. American. Cargo shorts. Genuinely believes he's helping. He is not.

### Anya
Belarusian woman. Smarter than Chad. Increasingly annoyed. Texts in mixed English/Russian. Never a damsel.

### Babushkas
Patrol NPCs. Carry shopping bags. Shove Chad backward on contact with Russian scolding. Don't kill.

### Marshrutkas
Minibuses that rip across the screen at ground level. Kill on contact. Chad respawns at last safe position.

### The Sacred Potato
Hidden collectible. Has a face. Worth 100 points. It watches.

## Level 1: The Grocery Run

### Vocab Pack
| Word | Cyrillic | Meaning | Matches Item |
|------|----------|---------|-------------|
| smetana | СМЕТАНА | sour cream | smetana_tub |
| kefir | КЕФИР | fermented milk drink | kefir_bottle |
| kolbasa | КОЛБАСА | sausage/salami | kolbasa_link |
| produkty | ПРОДУКТЫ | groceries (meta-word) | — |

### Briefing Messages
1. "If you're really coming, grab СМЕТАНА on the way."
2. "And КЕФИР. The cold one, not the warm one. Disgusting."
3. "Also КОЛБАСА. You know what that is, right? ...you don't, do you."
4. "I can't believe I'm texting a man in cargo shorts about ПРОДУКТЫ."

### Collectible Items
**Targets:** smetana_tub, kefir_bottle, kolbasa_link
**Decoys:** pickle_jar, bread_loaf, mystery_can, sunflower_seeds

### Gate Fail
"ГДЕ ПРОДУКТЫ?!" — booming, cosmic, screen-shaking.

### Reveal Lines
- СМЕТАНА: "You actually brought the right СМЕТАНА. I'm... impressed? No. Surprised. Don't let it go to your head."
- КЕФИР: "And you got КЕФИР. The cold one. Maybe you're not completely hopeless."
- КОЛБАСА: "КОЛБАСА. Yes. That's sausage. I can't believe I had to watch you figure that out."

## Creative Rules
1. The joke is ALWAYS "Chad is an idiot." NEVER "Belarus is weird."
2. Anya is never a damsel.
3. Learning through inference only. No translations during gameplay.
4. Failure is funny, not punitive.
5. The Sacred Potato is always watching.
