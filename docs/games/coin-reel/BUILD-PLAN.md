# coin-reel: production art, audio & animation plan + test plan + lean budget

**Goal:** turn `apps/coin-reel` (5×5 structure studied in
`docs/teardowns/coin-reel-5x5-teardown.md`) into a production-quality game with **100% our own
artwork, audio and animation**. Every template asset (mining art, Spine files, bitmap fonts, audio
sprite) is replaced and deleted; nothing from the template or the reference game ships.
Maths is out of scope (separate pipeline); the game keeps using the event names already defined.

**Tooling:** Artlist **AI Core** ($39.99/month, 40,000 credits) via the Artlist MCP
(`https://mcp.artlist.io/mcp`), `tools/video-to-sprites`, the mock RGS and synthetic books.
**Target:** ≤ 5,000 credits for this game (≈ $5), so 6–10 games fit in one month.

---

## 0. Decisions needed from the product owner (before bulk generation)

| # | Decision | Options / default |
|---|---|---|
| D1 | Theme | Must be clearly different from the reference game (no 1930s rubber-hose cartoon, no grinning skull, no black-and-white base). Proposals: **(a) Dwarven gold mine** (keeps the coin/mining logic, our own stout dwarf mascot), **(b) Pirate treasure vault** (parrot or captain mascot), **(c) Neon arcade robot** (coins = tokens). |
| D2 | Final name | Working title "Coin Reel" until D1 is chosen. Bonus names follow the theme (current: *Multiplier Mine*, *Treasure Vault*). |
| D3 | Art style | Default: bold comic/cel-shaded, thick dark outlines, saturated symbols on a darker scene (industry "punchy" look). |
| D4 | Mascot design | Approved from a turnaround sheet (Test 2) before any mascot clips are generated. |

---

## 1. Tests (run in order, each has a pass/fail)

### Test 0: Pipeline proof (≈ 150 credits)
1. Connect the Artlist MCP; confirm generated files can be **downloaded to disk** (not only saved in the Artlist library).
2. Generate one high symbol still (1024², transparent PNG; if transparency is not supported, `#00FF00` background).
3. Generate a 2 s image-to-video win clip from that still on `#00FF00`, first and last frame = the still pose.
4. `node tools/video-to-sprites/video-to-sprites.mjs H1_win.mp4 --name H1_win --key 00ff00 --cell 256 --fps 24`.
5. Wire into `SYMBOL_INFO_MAP.H1.win` (type `spriteSheet`) and play a queued H1 win in the browser.

Pass: files download; keyed edges clean at 2× zoom (no green fringe); loop seam not noticeable;
clip ends and hands back to the static symbol without a pop; **actual credit cost per image / per
clip recorded in this doc** (replace the assumptions in §3).

### Test 1: Style board (≈ 300 credits)
For each theme option: 1 high symbol, 1 low symbol, 1 background thumbnail, 1 mascot sketch.
Pass: owner picks D1/D3.

### Test 2: Mascot lock (≈ 200 credits)
Mascot master (front, full body, neutral pose) + 3 pose stills (point, cheer, sad). Pass: owner
approves; this master is the **only** source image for every mascot clip (consistency).

### Test 3: Vertical slice (≈ 600 credits)
All 10 symbol stills + base background + logo in game; H1–H4 win clips; W land/expand clip.
Pass: one full base-game spin cycle looks shippable on desktop and phone; owner signs off before
the remaining batch.

### Test 4: Full game QA (no credits)
See §5. Pass: every scenario in §5.2 plays with zero console errors on desktop, tablet, phone.

---

## 2. Asset manifest (everything new; nothing from the template)

Conventions: masters are PNG/MP4, kept in the art repo; game files go to
`apps/coin-reel/static/assets/<folder>/`. Green screen = pure `#00FF00`, even light, no green on the
subject. Stills: subject centred inside the middle 80%, 1024² master. Clips: 24 fps, first and last
frame match the still. "Tries" = generations budgeted including rejects.

### 2.1 Stills (AI images)

| ID | Asset | Spec | Plugs into | Tries |
|---|---|---|---|---|
| S-01..04 | Low symbols L1–L4 | 1024², transparent, simple icons readable at 64 px | `SYMBOL_INFO_MAP.L*` static/land/postWin | 8 |
| S-05..08 | High symbols H1–H4 | 1024², transparent, theme characters/objects, clear value order | `SYMBOL_INFO_MAP.H*` | 12 |
| S-09 | Coin special (W) | 1024², transparent, loudest symbol on the board | `SYMBOL_INFO_MAP.W` | 4 |
| S-10 | Free-spin special (S) | 1024², transparent | `SYMBOL_INFO_MAP.S` | 4 |
| S-11..14 | Coin faces bronze/silver/gold/diamond (blank centre; value drawn in code) | 512², transparent | `CoinReels.svelte` (replace procedural circles) | 6 |
| S-15 | Free-spin cell token (blank centre) | 512², transparent | `CoinReels.svelte` fs style | 2 |
| S-16 | Mascot master + 3 poses | 1024×1536, transparent | `Mascot.svelte` (`MASCOT_TEXTURE`) + clip sources | (Test 2) |
| S-17 | Logo | 2048×1024, transparent | loading screen, desktop top-left | 4 |
| S-18 | Base background | 16:9 (1920×1080) + 9:16 (1080×1920), opaque | `Background.svelte` | 4 |
| S-19 | Bonus background | 16:9 + 9:16, opaque | `Background.svelte` (freeSpins) | 4 |
| S-20 | Bonus intro panel art ×2 (one per bonus; title text in code) | 1536×1024, transparent | `FreeSpinIntro.svelte` | 4 |
| S-21 | Buy-menu card icons ×4 | 512², transparent | `betModes.ts` `assets.icon` | 6 |
| S-22 | Board frame / cell tile (optional; cells are code-drawn today) | 1024², transparent | `BoardCells.svelte` | 2 |
| | **Total stills** | **≈ 31 finals** | | **≈ 60 + Test 2** |

### 2.2 Clips (AI video → sprite sheet or video texture)

| ID | Clip | Spec | Becomes | Tries |
|---|---|---|---|---|
| C-01..04 | H1–H4 win | 1:1, 1.5–2 s, green | sprite sheet → `SYMBOL_INFO_MAP.H*.win` | 8 |
| C-05 | W land | 1:1, 0.5 s, green | `W.land` | 2 |
| C-06 | W expand (grows up the reel) | 1:5 tall, 0.8 s, green | coin column grow in `CoinReels.svelte` | 3 |
| C-07 | S land | 1:1, 0.5 s, green | `S.land` | 2 |
| C-08 | S expand | 1:5 tall, 0.8 s, green | free-spin column grow | 2 |
| C-09 | Coin flip/reveal (one clip, tinted per tier in code) | 1:1, 0.6 s, green | coin pop in `CoinReels.svelte` | 2 |
| C-10..12 | Mascot idle loop, point, cheer | 3:4, 2–3 s, green, from S-16 master only | `Mascot.svelte` states | 6 |
| C-13 | Big-win scene (text added by game) | 16:9 + 9:16, 3–4 s, alpha or black | video texture in `Win.svelte` | 2 |
| C-14, C-15 | Background loops base + bonus | 16:9 + 9:16, 8–12 s seamless loop | video texture in `Background.svelte` | 4 |
| C-16 | Transition wipe | 16:9, 1 s, black-to-alpha | video texture in `Transition.svelte` | 2 |
| | **Total clips** | **16 finals** | | **≈ 33** |

### 2.3 Audio

| ID | Asset | Spec | Tries |
|---|---|---|---|
| A-01 | Base music loop | 60–90 s instrumental, no fade in/out, loopable | 2 |
| A-02 | Bonus music loop | 45–60 s, more intense | 2 |
| A-03 | Big-win sting | 3–5 s | 1 |
| A-04 | SFX set: spin start, symbol land (×3 weights), win small, tumble pop, coin special land, column grow, coin pop, collect, stash up, button click, buy confirm | short one-shots | from Artlist SFX library if included in the plan; otherwise AI sound; confirm in Test 0 |

Pack into one Howler sprite (`static/assets/audio/sounds.{ogg,mp3,m4a}` + `sounds.json`) with the
same sprite names the game already plays (see `src/game/sound.ts`), or rename them in one pass.

### 2.4 Code animations (free, already built or to build)

Built: gravity drop + squash/stretch, tumble burst, coin column grow, coin pop-in, collect dim and
pulse, stash/collector punch, mascot bob/point/jump, bar transitions.
To build: symbol win pulse + glow (`pixi-filters` Glow), landing dust particles, screen shake on
big hits, shine sweep on high symbols, number count-up styling with a web font (replaces bitmap fonts).

---

## 3. Lean budget

Credit assumptions (replace with Test 0 measurements): **image ≈ 10 credits, 5 s clip ≈ 80 credits
(mid-tier model), song ≈ 150 credits.** AI Core: 40,000 credits for $39.99 → **$0.001 per credit**.

| Block | Generations | Credits |
|---|---|---|
| Tests 0–2 (pipeline, style board, mascot) | ~40 images, 1 clip | ~650 |
| Stills (§2.1) | ~60 | ~600 |
| Clips (§2.2) | ~33 | ~2,640 |
| Music + sting (§2.3) | 5 | ~750 |
| Contingency 15% | | ~700 |
| **Total for this game** | | **≈ 5,300 (≈ $5.30)** |

Later games reuse the shared library (coin faces, transition, big-win scene, SFX, frames) and skip
Tests 0–2, so a follow-on game is **≈ 3,000–4,000 credits**: 8–10 games per AI Core month.

Track actuals here after each batch:

| Date | Batch | Credits used | Notes |
|---|---|---|---|
| 2026-10-05 | Test 0 | 0 (free tier) | image: GPT Image 2.0 Low (free gen); video: Kling 2.5 Turbo Pro I2V 5 s (free gen, min duration is 5 s not 2 s); both may be watermarked |

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
- Clip: keyed cleanly, first/last frame = still, ≤ 64 frames at 256 px (≤ one 2048² sheet), loops
  without a visible jump where it loops.
- Audio: loops seamlessly, peak ≤ −1 dBFS, music around −16 LUFS.

### 5.2 Game scenarios (force each with `/mock/queue`)
Base no-win · tumble chain (3+ steps) · coin reel on the trigger row · two coin reels in one spin ·
free-spin reel → Multiplier Mine (stash goes up) · 2+ free-spin reels → Treasure Vault (pots fill
and pay) · retrigger inside a bonus · win cap · reload mid-bonus (resume restores boxes) · buy each
of the 4 cards · boost on/off · autoplay 10 spins · turbo · big-win tiers.
For each: desktop 1920×1080, tablet 1024×1366, phone 375×812 portrait; zero console errors.

### 5.3 Performance
60 fps on a mid Android phone during a bonus; GPU textures ≤ 150 MB; first load ≤ 8 MB before
"press to continue"; symbol clips lazy-loaded after the loading screen.
