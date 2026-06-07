# Plan: Secret Belarus dot on personal site linking to CHAD game

## Context
The user wants to add Chad Rescues Nobody as a hidden easter egg on their personal website (Thomas-Sanderson/site, deployed to Vercel). A dot appears on Belarus on the map only when the year scrubber shows 2023, clicking it opens a passcode gate, and the correct password reveals the game.

## What's already done
- Created `/Users/lixo/Projects/site-chad/src/app/chad/page.tsx` — passcode gate ("grib") + iframe to deployed game
- Started editing `MapSection.tsx` — added `useRouter`, computed `belarusCoords` and `showBelarusDot`

## Remaining work

### 1. Finish the secret dot in MapSection.tsx
Add a `<g>` element after the regular pin clusters in the SVG that:
- Only renders when `showBelarusDot` is true
- Shows a small pulsing dot at Belarus coordinates (53.9°N, 27.57°E)
- On click, navigates to `/chad` via `router.push("/chad")`
- Uses a subtle, slightly different color so it doesn't scream "click me" but is discoverable

### 2. Deploy CHAD game separately
The iframe in `/chad` points to `https://chad-rescues-nobody.vercel.app`. The user needs to:
- Import Thomas-Sanderson/CHAD into Vercel as a new project
- Or we can use a different URL

### 3. Commit and push to site repo
Stage the two changed/created files and push to Thomas-Sanderson/site.

## Files
- `src/components/MapSection.tsx` — add secret dot rendering (partially done)
- `src/app/chad/page.tsx` — new route with passcode gate + game iframe (done)

## Verification
- Scroll the map to 2023 → dot appears on Belarus
- Click dot → navigates to /chad
- Enter "grib" → game loads in iframe
- Scroll away from 2023 → dot disappears
