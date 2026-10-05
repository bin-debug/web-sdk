# coin-reel: production art, audio & animation plan + test plan + lean budget

**Goal:** turn `apps/coin-reel` (5Ã—5 structure studied in
`docs/teardowns/coin-reel-5x5-teardown.md`) into a production-quality game with **100% our own
artwork, audio and animation**. Every template asset (mining art, Spine files, bitmap fonts, audio
sprite) is replaced and deleted; nothing from the template or the reference game ships.
Maths is out of scope (separate pipeline); the game keeps using the event names already defined.

**Tooling:** Artlist **AI Starter** ($19.99/month, 16,500 credits; AI Core 40,000 if it proves out) via the Artlist MCP
(`https://mcp.artlist.io/mcp`), `tools/video-to-sprites`, the mock RGS and synthetic books.
**Target:** â‰¤ 5,000 credits for this game (â‰ˆ $5), so 6â€“10 games fit in one month.

---

## 0. Decisions needed from the product owner (before bulk generation)

| # | Decision | Options / default |
|---|---|---|
| D1 | Theme | **DECIDED 2026-10-05: cartoon superhero.** A cheerful coin-powered hero guards the city's gold reserve. Original characters only: no Marvel/DC/Invincible/Incredibles look-alikes (no S/bat/spider emblems, no red-blue-yellow Superman palette). |
| D2 | Final name | **Captain Kachink** (display name; app id stays `coin-reel`). Bonuses: *Power Surge* (was Multiplier Mine), *Vault Rescue* (was Treasure Vault). Do a quick web check for an existing slot with that name before Step 5; fall back to *Kachink Force*. |
| D3 | Art style | Bold cel-shaded comic: thick dark outlines, flat colour + one shade + one highlight, light from top-left, subtle halftone dots on backgrounds only. Palette: teal + gold hero, magenta/orange accents, dusk-purple city. |
| D4 | Mascot | **Captain Kachink**: short, stocky, big square chin, huge grin, gold-and-teal suit, round gold coin emblem with a lightning bolt on the chest, short red cape, teal domino mask, white gloves, chunky boots. Approved from Step 2 master before any mascot clip. |

**Symbol set (superhero):** L1 teal bolt badge, L2 green star badge, L3 purple shield badge, L4 orange fist badge
(simple round emblems, readable at 60 px) · H4 power glove · H3 hero mask · H2 sidekick "Sprocket" (round robot pup) ·
H1 glowing gold Power Core gem · W Kachink coin (gold, bolt emblem; the loudest symbol) · S red hero alarm siren.
Backgrounds: base = city rooftops at dusk; bonus = inside the gold vault with laser beams.

**Fixed style prompt prefix** (use for every still/clip, keep the set consistent):
"Bold cel-shaded comic book illustration style, thick dark ink outlines, flat colour fill with one
shadow tone and one highlight tone, dramatic lighting from top-left, clean vector-like shapes,
original non-licensed character design, no text, no watermark, no logos." Symbols/mascot add:
"Pure solid #00FF00 green screen background, even flat lighting, no shadow on the background."
---

## 1. Tests (run in order, each has a pass/fail)

### Test 0: Pipeline proof (â‰ˆ 150 credits) â€” **PASSED 2026-10-05** (free tier, H1 diamond, book 35)
1. Connect the Artlist MCP; confirm generated files can be **downloaded to disk** (not only saved in the Artlist library).
2. Generate one high symbol still (1024Â², transparent PNG; if transparency is not supported, `#00FF00` background).
3. Generate a 2 s image-to-video win clip from that still on `#00FF00`, first and last frame = the still pose.
4. `node tools/video-to-sprites/video-to-sprites.mjs H1_win.mp4 --name H1_win --key 00ff00 --cell 256 --fps 24 --duration 2 --crop 1240:1076` (crop only for 16:9 clips; Artlist I2V minimum is 5 s, so trim with `--duration`).
5. Wire into `SYMBOL_INFO_MAP.H1.win` (type `spriteSheet`) and play a queued H1 win in the browser.

Pass: files download; keyed edges clean at 2Ã— zoom (no green fringe); loop seam not noticeable;
clip ends and hands back to the static symbol without a pop; **actual credit cost per image / per
clip recorded in this doc** (replace the assumptions in Â§3).

### Test 1: Style board (â‰ˆ 300 credits)
For each theme option: 1 high symbol, 1 low symbol, 1 background thumbnail, 1 mascot sketch.
Pass: owner picks D1/D3.

### Test 2: Mascot lock (â‰ˆ 200 credits)
Mascot master (front, full body, neutral pose) + 3 pose stills (point, cheer, sad). Pass: owner
approves; this master is the **only** source image for every mascot clip (consistency).

### Test 3: Vertical slice (â‰ˆ 600 credits)
All 10 symbol stills + base background + logo in game; H1â€“H4 win clips; W land/expand clip.
Pass: one full base-game spin cycle looks shippable on desktop and phone; owner signs off before
the remaining batch.

### Test 4: Full game QA (no credits)
See Â§5. Pass: every scenario in Â§5.2 plays with zero console errors on desktop, tablet, phone.

---

## 2. Asset manifest (everything new; nothing from the template)

Conventions: masters are PNG/MP4, kept in the art repo; game files go to
`apps/coin-reel/static/assets/<folder>/`. Green screen = pure `#00FF00`, even light, no green on the
subject. Stills: subject centred inside the middle 80%, 1024Â² master. Clips: 24 fps, first and last
frame match the still. "Tries" = generations budgeted including rejects.

### 2.1 Stills (AI images)

| ID | Asset | Spec | Plugs into | Tries |
|---|---|---|---|---|
| S-01..04 | Low symbols L1â€“L4 | 1024Â², transparent, simple icons readable at 64 px | `SYMBOL_INFO_MAP.L*` static/land/postWin | 8 |
| S-05..08 | High symbols H1â€“H4 | 1024Â², transparent, theme characters/objects, clear value order | `SYMBOL_INFO_MAP.H*` | 12 |
| S-09 | Coin special (W) | 1024Â², transparent, loudest symbol on the board | `SYMBOL_INFO_MAP.W` | 4 |
| S-10 | Free-spin special (S) | 1024Â², transparent | `SYMBOL_INFO_MAP.S` | 4 |
| S-11..14 | Coin faces bronze/silver/gold/diamond (blank centre; value drawn in code) | 512Â², transparent | `CoinReels.svelte` (replace procedural circles) | 6 |
| S-15 | Free-spin cell token (blank centre) | 512Â², transparent | `CoinReels.svelte` fs style | 2 |
| S-16 | Mascot master + 3 poses | 1024Ã—1536, transparent | `Mascot.svelte` (`MASCOT_TEXTURE`) + clip sources | (Test 2) |
| S-17 | Logo | 2048Ã—1024, transparent | loading screen, desktop top-left | 4 |
| S-18 | Base background | 16:9 (1920Ã—1080) + 9:16 (1080Ã—1920), opaque | `Background.svelte` | 4 |
| S-19 | Bonus background | 16:9 + 9:16, opaque | `Background.svelte` (freeSpins) | 4 |
| S-20 | Bonus intro panel art Ã—2 (one per bonus; title text in code) | 1536Ã—1024, transparent | `FreeSpinIntro.svelte` | 4 |
| S-21 | Buy-menu card icons Ã—4 | 512Â², transparent | `betModes.ts` `assets.icon` | 6 |
| S-22 | Board frame / cell tile (optional; cells are code-drawn today) | 1024Â², transparent | `BoardCells.svelte` | 2 |
| | **Total stills** | **â‰ˆ 31 finals** | | **â‰ˆ 60 + Test 2** |

### 2.2 Clips (AI video â†’ sprite sheet or video texture)

| ID | Clip | Spec | Becomes | Tries |
|---|---|---|---|---|
| C-01..04 | H1â€“H4 win | 1:1, 1.5â€“2 s, green | sprite sheet â†’ `SYMBOL_INFO_MAP.H*.win` | 8 |
| C-05 | W land | 1:1, 0.5 s, green | `W.land` | 2 |
| C-06 | W expand (grows up the reel) | 1:5 tall, 0.8 s, green | coin column grow in `CoinReels.svelte` | 3 |
| C-07 | S land | 1:1, 0.5 s, green | `S.land` | 2 |
| C-08 | S expand | 1:5 tall, 0.8 s, green | free-spin column grow | 2 |
| C-09 | Coin flip/reveal (one clip, tinted per tier in code) | 1:1, 0.6 s, green | coin pop in `CoinReels.svelte` | 2 |
| C-10..12 | Mascot idle loop, point, cheer | 3:4, 2â€“3 s, green, from S-16 master only | `Mascot.svelte` states | 6 |
| C-13 | Big-win scene (text added by game) | 16:9 + 9:16, 3â€“4 s, alpha or black | video texture in `Win.svelte` | 2 |
| C-14, C-15 | Background loops base + bonus | 16:9 + 9:16, 8â€“12 s seamless loop | video texture in `Background.svelte` | 4 |
| C-16 | Transition wipe | 16:9, 1 s, black-to-alpha | video texture in `Transition.svelte` | 2 |
| | **Total clips** | **16 finals** | | **â‰ˆ 33** |

### 2.3 Audio

| ID | Asset | Spec | Tries |
|---|---|---|---|
| A-01 | Base music loop | 60â€“90 s instrumental, no fade in/out, loopable | 2 |
| A-02 | Bonus music loop | 45â€“60 s, more intense | 2 |
| A-03 | Big-win sting | 3â€“5 s | 1 |
| A-04 | SFX set: spin start, symbol land (Ã—3 weights), win small, tumble pop, coin special land, column grow, coin pop, collect, stash up, button click, buy confirm | short one-shots | from Artlist SFX library if included in the plan; otherwise AI sound; confirm in Test 0 |

Pack into one Howler sprite (`static/assets/audio/sounds.{ogg,mp3,m4a}` + `sounds.json`) with the
same sprite names the game already plays (see `src/game/sound.ts`), or rename them in one pass.

### 2.4 Code animations (free, already built or to build)

Built: gravity drop + squash/stretch, tumble burst, coin column grow, coin pop-in, collect dim and
pulse, stash/collector punch, mascot bob/point/jump, bar transitions.
To build: symbol win pulse + glow (`pixi-filters` Glow), landing dust particles, screen shake on
big hits, shine sweep on high symbols, number count-up styling with a web font (replaces bitmap fonts).

---

## 3. Lean budget

Credit assumptions (replace with Test 0 measurements): **image â‰ˆ 10 credits, 5 s clip â‰ˆ 80 credits
(mid-tier model), song â‰ˆ 150 credits.** AI Core: 40,000 credits for $39.99 â†’ **$0.001 per credit**.

| Block | Generations | Credits |
|---|---|---|
| Tests 0â€“2 (pipeline, style board, mascot) | ~40 images, 1 clip | ~650 |
| Stills (Â§2.1) | ~60 | ~600 |
| Clips (Â§2.2) | ~33 | ~2,640 |
| Music + sting (Â§2.3) | 5 | ~750 |
| Contingency 15% | | ~700 |
| **Total for this game** | | **â‰ˆ 5,300 (â‰ˆ $5.30)** |

Later games reuse the shared library (coin faces, transition, big-win scene, SFX, frames) and skip
Tests 0â€“2, so a follow-on game is **â‰ˆ 3,000â€“4,000 credits**: 8â€“10 games per AI Core month.

Track actuals here after each batch:

| Date | Batch | Credits used | Notes |
|---|---|---|---|
| 2026-10-05 | Test 0 | 0 (free tier) | image: GPT Image 2.0 Low (free gen); video: Kling 2.5 Turbo Pro I2V 5 s (free gen, min duration is 5 s not 2 s); both may be watermarked |
| 2026-10-05 | Step 1 style board | 360 (16,500 → 16,140) | Nano Banana 2 (modelId 2250), 1K, 90 credits/image Ã— 4 (H1 Power Core gem, L1 bolt badge, base bg rooftops, mascot sketch). D1â€“D4 already decided (BUILD-PLAN Â§0 from a prior session); this batch confirms the locked style only (1 option, not per-theme). Fixed style prefix (log below) used for every image and will be reused for all future symbol/bg generations. |

---

## 4. Code work to remove the template completely

1. Delete template folders once replacements land: `static/assets/spines/*` (all 16), `sprites/*`
   (symbolsStatic, reelsFrame, payFrame, freeSpins, winSmall, pressToContinueText, progressBar,
   coin, uiSlotsAssetsBespoke), `fonts/*` (bitmap fonts), `audio/*`, `static/*.gif` loaders.
2. Replace Spine-driven components with sprite-sheet / video / code versions: `LoadingScreen`
   (loader, transition), `Background` (foreground animations), `BoardFrame` (reelhouse glow, now
   unused), `Win`/`WinAnimation` (bigwin), `FreeSpinIntro`/`Outro` (fsIntro), `Anticipation`,
   `TumbleWinAmount*` (tumbleWin), `GlobalMultiplier`, `ClusterWinAmount` (clusterWin).
3. Add a `video` asset type + `Video` component (plan Phase 1, item 4) for C-13..C-16.
4. Replace bitmap fonts with one web font (numbers styled in code).
5. Remove unused template components (MultiplierBoard, MultiplierTotal, GlobalMultiplier, I18nTest).
6. Grep check before sign-off: no `mm_`, `mining`, `MM_`, `symbolsStatic`, `spines/` references left.

---

## 5. Acceptance tests

### 5.1 Per asset
- Still: transparent edges clean, readable at the in-game size (100 px desktop, ~60 px phone), no
  text baked in, consistent light direction and outline weight with the set.
- Clip: keyed cleanly, first/last frame = still, â‰¤ 64 frames at 256 px (â‰¤ one 2048Â² sheet), loops
  without a visible jump where it loops.
- Audio: loops seamlessly, peak â‰¤ âˆ’1 dBFS, music around âˆ’16 LUFS.

### 5.2 Game scenarios (force each with `/mock/queue`)
Base no-win Â· tumble chain (3+ steps) Â· coin reel on the trigger row Â· two coin reels in one spin Â·
free-spin reel â†’ Multiplier Mine (stash goes up) Â· 2+ free-spin reels â†’ Treasure Vault (pots fill
and pay) Â· retrigger inside a bonus Â· win cap Â· reload mid-bonus (resume restores boxes) Â· buy each
of the 4 cards Â· boost on/off Â· autoplay 10 spins Â· turbo Â· big-win tiers.
For each: desktop 1920Ã—1080, tablet 1024Ã—1366, phone 375Ã—812 portrait; zero console errors.

### 5.3 Performance
60 fps on a mid Android phone during a bonus; GPU textures â‰¤ 150 MB; first load â‰¤ 8 MB before
"press to continue"; symbol clips lazy-loaded after the loading screen.
