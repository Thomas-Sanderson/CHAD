# Sprite Reference — Chad Rescues Nobody
<!-- Visual reference for all game sprites. Use alongside the CC prompt. -->
<!-- Each sprite is described as a pixel grid with hex colors. -->
<!-- The visual sprite sheet (SVG) was delivered separately to the Human. -->

## Color palette (24 colors)

### Characters
| Name | Hex | Usage |
|------|-----|-------|
| Chad Red | #cc3333 | Baseball cap |
| Chad Brim | #992222 | Cap brim shadow |
| Teal Shirt | #22b5a0 | Hawaiian shirt base |
| Pink Flower | #ff6b9d | Shirt flower pattern |
| Yellow Flower | #ffcc44 | Shirt flower pattern |
| Cargo Tan | #cc9955 | Cargo shorts |
| Cargo Pocket | #bb8844 | Pocket detail |
| Fanny Brown | #886644 | Fanny pack strap |
| Fanny Light | #aa8855 | Fanny pack pouch |
| Skin | #f5c99a | Chad skin |
| Babushka Purple | #8855aa | Headscarf, coat |
| Babushka Dark | #664488 | Coat shadow |
| Babushka Skin | #f0c090 | Babushka face |
| Shopping Bag | #cc9933 | Babushka's bag |

### Hazards
| Name | Hex | Usage |
|------|-----|-------|
| Marshrutka Yellow | #ddcc33 | Bus body |
| Marshrutka Dark | #ccbb22 | Roof |
| Window Blue | #88ccdd | Bus windows |

### Potato
| Name | Hex | Usage |
|------|-----|-------|
| Potato Brown | #c4944a | Body |
| Potato Dark | #b8883e | Top/bottom edge |
| Potato Spot | #a87830 | Blemish spots |
| Halo Gold | #ffee88 | Halo glow |

### Environment
| Name | Hex | Usage |
|------|-----|-------|
| Ground Green | #556644 | Ground fill |
| Grass | #668855 | Grass top layer |
| Grass Blade | #77aa55 | Individual grass blades |
| Brick Tan | #887766 | Platform fill |
| Brick Light | #998877 | Platform top highlight |
| Brick Line | #776655 | Mortar lines |
| Apartment Tan | #aa9977 | Building body |
| Door Brown | #664422 | Door |
| Night Sky | #1a1a2e | Background |

## Sprite dimensions

| Sprite | Width | Height | Frames |
|--------|-------|--------|--------|
| Chad | 32 | 48 | 4 (idle, walk1, walk2, jump) |
| Babushka | 28 | 45 | 1 (patrols by flipping horizontally) |
| Marshrutka | 64 | 40 | 1 (moves by translation) |
| Sacred Potato | 32 | 26 | 1 (idle bob via y-offset oscillation) |
| All collectible items | ~32 | ~26 | 1 |
| Ground tile | 32 | 32 | 1 (tileable) |
| Platform tile | 32 | 32 | 1 (tileable) |
| Apartment gate | 64 | 48 | 1 |

## Item sprites (new for Levels 2-4)

### moloko_carton (milk)
White carton body, blue horizontal label band with "МОЛОКО" text. Peaked top.

### chai_box (tea)
Orange/brown box, yellow label area with "ЧАЙ" text, small green leaf detail.

### sakhar_bag (sugar)
White bag, cream/beige label band with "САХАР" text, sugar granule dots near opening.

### maslo_butter (butter)
Yellow butter block with silver/gray foil wrapper on left and right ends.

### yabloko_apple (apple)
Red apple body with lighter red highlight. Brown stem, small green leaf.

### kartoshka (potato — regular, NOT Sacred)
Brown oval, same colors as Sacred Potato body BUT no face, no eyes, no mouth, no halo. Just a potato. The Sacred Potato is special. This one is not.

### ryba_fish (fish)
Blue-gray body, white eye with dark pupil, lighter fins top and bottom, distinct tail. Faces right.

### hleb_rye (dark rye bread)
Dark brown body — visually much darker than the decoy bread_loaf. Seeds/grains on top (light tan dots). This distinction matters for Level 3's pedagogy.

### syr_cheese (cheese wedge)
Yellow triangle/wedge shape with darker yellow holes. Classic cartoon cheese.

### vodka_bottle
Tall clear/frosted bottle, white label with red horizontal stripe at top. Clear cap.

### konfeta_candy (chocolate candy)
Purple wrapped candy, gold foil stripe across middle, twisted wrapper ends on left and right.

### ogurtsy_cuke (cucumber)
Green elongated oval, slightly lighter green on top, small bumps/dots along the body.

## Ethiopia skin sprites

All sprites follow the same pixel grid and scale as Belarus. Same rendering approach (fillRect at pixel grid). Different palette, different world.

### Characters
- **Auntie** — 28×46px. Orange headscarf (#dd7722), dark skin (#8b5e3c), green dress with gold cross-stitch pattern (#448844 dress, #ffcc44 pattern), overloaded Merkato shopping bag with items spilling out. Warm but firm eyes. Knowing smile. She shoves you because she cares.
- **Blue Taxi** — 56×36px. Blue body (#3355aa) with white horizontal stripe (#ddddee). Shorter and boxier than marshrutka. Light blue windows with passenger silhouettes inside. Dark wheels. Always full. Always fast.
- **Sacred Coffee Bean** — 32×26px. Dark brown bean shape (#3a2211) with center crease (#2a1508). Large cream-colored eyes (#ffeedd) with dark pupils. Serene mouth. Golden glow on top and sides (#ddaa44). Same energy as Sacred Potato — ancient, knowing, calm.

### Items (Ethiopia)
All ~32×26px unless noted:
- `buna_bag` — burlap coffee sack, dark brown (#8b6633), twine tie (#ccaa77), beans visible at top (#3a2211)
- `wetet_jug` — clay milk jug, terracotta (#c4724a), handle on right, milk visible at top (#eeeedd)
- `dabo_round` — round bread, golden (#dd9944), cross-score pattern on top (#bb7722)
- `sukwar_bag` — white sugar bag, Amharic label "ስኳር"
- `berbere_tin` — bright red tin (#cc3311), spice visible, cream label area
- `teff_sack` — gray-tan grain sack (#c4b8a4), tiny grains visible
- `shiro_bag` — golden chickpea flour bag (#ddcc88)
- `qibe_jar` — clay jar (#c4724a) with cloth lid (#eee8dd), golden butter visible (#ddaa44)
- `timatim` — red tomato (#dd3333), green stem
- `injera_roll` — gray-tan roll (#c4b8a4), spongy texture dots (#a49884), rolled edge on left
- `miser_bag` — red-orange lentil bag (#cc6633)
- `qey_sir_beet` — dark purple beetroot (#882244), green leaf tuft, thin root
- `karya_pepper` — bright green pepper (#44882a), elongated, stem on left
- `jebena_pot` — black clay coffee pot (#3a2211), round body, narrow neck, straw lid (#ccaa77), spout right, handle left
- `rekbot_cup` — small clay cup (#c4724a), NO HANDLE, coffee visible inside (#3a2211)
- `itan_incense` — frankincense chunks (#ddc088/#eedd99) on clay dish (#c4724a), faint smoke wisps
- `kolo_bowl` — clay bowl (#c4724a) with golden roasted barley (#ddaa44/#cc9933)
- `honey_jar` — glass jar with golden honey (#ddaa44), metal lid
- `mango` — yellow-orange (#ffaa22) with red blush (#ee6633), green stem
- `bottled_water` — clear/frosted with blue label
- `egg` — brown oval (#e8d5b5)
- `tea_cup` — white/gray cup WITH HANDLE (#ddddee) — the handle is the decoy tell vs rekbot

### Environment (Ethiopia)
- **Cobblestone** — warm tan (#d4a574), irregular stone grid with mortar lines (#b89060). Tileble 32×32.
- **Wood/tin platform** — dark wood planks (#5c3a1e/#6b4428) with corrugated tin patch (#8899aa). Plank gaps visible. 32×32.
- **Buna bet (gate)** — 64×48. Warm terracotta (#c4956a), dark wood sign reading "ቡና ቤት", warm-lit windows (#ddaa44), dark wood door, steam wisps.
- **Day sky** — bright blue (#4a90c4), white cloud patches, distant green hills (#557744) with transparency.

### Ethiopia color palette
| Name | Hex | Usage |
|------|-----|-------|
| Terracotta | #c4724a | Clay items, jug, jebena |
| Warm Tan | #d4a574 | Cobblestone ground |
| Deep Wood | #5c3a1e | Dark wood, platforms |
| Light Wood | #6b4428 | Wood planks |
| Injera Gray | #c4b8a4 | Injera, teff |
| Berbere Red | #cc3311 | Spice tin |
| Sky Blue | #4a90c4 | Background sky |
| Eucalyptus | #557744 | Trees, distant hills |
| Taxi Blue | #3355aa | Blue taxis |
| Taxi White | #ddddee | Taxi stripe |
| Coffee Dark | #3a2211 | Coffee beans, jebena |
| Gold Warm | #ddaa44 | Kolo, honey, glow, qibe |
| Beet Purple | #882244 | Beetroot |
| Lentil Orange | #cc6633 | Miser |
| Green Pepper | #44882a | Karya, stems |
| Auntie Orange | #dd7722 | Headscarf |
| Auntie Green | #448844 | Dress |
| Incense Amber | #ddc088 | Frankincense |
| Skin Deep | #8b5e3c | Tigist, aunties |
| Netela White | #eee8dd | Ceremony cloth, lids |
| Shiro Gold | #ddcc88 | Chickpea flour |
| Mango Yellow | #ffaa22 | Mango body |
| Mango Blush | #ee6633 | Mango blush |

## Animation notes

**Chad walk cycle:** Alternate between walk1 and walk2 frames every ~200ms when moving horizontally. Use idle frame when stationary. Use jump frame when not grounded.

**Sacred Potato bob:** Oscillate y-position by ±1-2 pixels on a slow sine wave (~2 second period). The potato is calm. The potato is always calm.

**Babushka patrol:** Flip sprite horizontally when changing direction. No walk animation needed — she glides with authority.

**Marshrutka:** No animation. It moves by translation at high speed. The exhaust puff could optionally fade/cycle but this is not required.

**Item collection:** When Chad overlaps a collectible, the item disappears immediately (set active=false). Optional: brief sparkle/flash effect at the collection point, but not required.
