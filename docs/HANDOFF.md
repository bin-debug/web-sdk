# Handoff: Studio Kit (keep this file current)

**Rule for every agent:** read this first, then `docs/STUDIO-KIT-PLAN.md`. When you finish a
session, update **Status**, **Next up** and **Session log** below, and commit it with your work.
Newest log entry on top. Keep it short and factual.

- Branch: `studio-kit` on `origin` (github.com/bin-debug/web-sdk, a public fork, so no hostnames, tokens or client names in commits).
- Phase: **POC.** No production builds or certification needed yet. Speed over polish.
- Product owner wants: Hacksaw / Paperclip quality and speed; games built from a spec; animation from
  video (no Spine).

## Where things are

| What | Path |
|---|---|
| Master plan (architecture, every layout, mechanics catalogue, animation strategy, roadmap) | `docs/STUDIO-KIT-PLAN.md` |
| Teardown of the reference game (structure only, no assets) | `docs/teardowns/coin-reel-5x5-teardown.md` |
| **coin-reel build plan: art/audio/animation manifest, tests, budget** | `docs/games/coin-reel/BUILD-PLAN.md` |
| POC game | `apps/coin-reel` (+ its `README.md`) |
| Mock RGS (any books, forced outcomes) | `tools/mock-rgs` |
| Synthetic book generator for coin-reel | `tools/book-gen/coin-reel.mjs` |
| Video → sprite sheet | `tools/video-to-sprites` |
| Hidden-browser-pane animation fix | `tools/qa/hidden-pane-raf-shim.js` |
| Sprite-sheet symbol states (pattern) | `apps/lines/src/components/SymbolSpriteSheet.svelte` |

## Run the POC

```bash
pnpm install
pnpm run build --filter=pixi-svelte
node tools/book-gen/coin-reel.mjs          # writes tools/mock-rgs/books/coin-reel/*.json (git-ignored)
node tools/mock-rgs/server.mjs 5099
cd apps/coin-reel && npx vite dev --host --port 3203
```

Open `http://localhost:3203/?sessionID=dev-1&game_id=coin-reel&currency=ZAR&lang=en&device=desktop&rgs_url=http://localhost:5099`.
New `sessionID` = fresh 10,000 wallet. Force outcomes:
`curl "localhost:5099/mock/books/coin-reel/BASE?event=collectorUpdate"` then
`curl -XPOST localhost:5099/mock/queue -d '{"gameId":"coin-reel","mode":"BASE","id":[12]}'`.

## Status (2026-10-04)

Done and checked in the browser:
- Mock RGS serves all five templates and generated books; resume of an open bonus works.
- coin-reel: 5×5 pays-anywhere + tumbles, teal trigger row, coin reel (tiered coins, collect with
  board dim), free-spin reel, **two bonuses**: *Multiplier Mine* (per-reel ×N stash) and
  *Treasure Vault* (per-reel coin pot that pays again), resume restores the boxes.
- **Four-card buy menu** (BONUS HUNT 3×, COIN RUSH 50× = boosts; MULTIPLIER MINE 80×, TREASURE VAULT
  200× = buys) via `src/game/betModes.ts` + mock modes; bought Treasure Vault end to end.
- Placeholder **mascot** with code-driven reactions (idle bob, point on collect, jump on bonus/big win).
- Portrait pass: board scaled to ~85–90% width, meter/stash stacked above.
- Video clip → in-game symbol win animation proven in `lines`.
- **Hacksaw-style bar** (`apps/coin-reel/src/components/HacksawBar.svelte`, HTML overlay, replaces the
  Pixi UI): slim strip with menu (sound, turbo, paytable, rules, settings), balance, win, bet with
  chevrons, big round spin/stop, autoplay; coin-style BUY BONUS outside the strip (shows BOOST ON when
  a boost mode is active); in free spins it shows TOTAL WIN + FREE SPINS; hides on `uiHide`; phone
  layout stacks into two rows. Honours jurisdiction flags and `--bc-*` colours.
- **Slick symbol drop:** gravity easing (`cubicIn`) on fall-in/out via new optional
  `symbolFallInEasing`/`symbolFallOutEasing` in `utils-slots` (other games unchanged), tighter column
  stagger, small overshoot, and squash-and-stretch per symbol (`src/game/squash.svelte.ts`: stretch
  1.12 while falling, squash 0.76 on impact, elastic spring back) on spins and tumbles.

Not done / known gaps:
- **All art is placeholder** (template mining symbols, procedural coins, symbol-as-mascot).
- `I18nTest` overlay is commented out in coin-reel; template header text "ADD YOUR LOGO" still shows.
- No automated tests; verification is manual in the browser.

## Next up (in order)

**Current task: build our own version of the Hacksaw 5×5 coin game as a production-quality
`apps/coin-reel`, with 100% our own art, audio and animation.**
Follow `docs/games/coin-reel/BUILD-PLAN.md` (theme decisions, Tests 0–4, full asset manifest,
lean budget ≈ 5,300 Artlist credits, template-removal checklist, acceptance tests).

1. Get the product owner's decisions D1–D4 (theme, name, style, mascot); do not bulk-generate before.
2. Run **Test 0** (Artlist MCP pipeline proof) and record real credit costs in BUILD-PLAN §3.
3. Tests 1–2 (style board, mascot lock), then Test 3 vertical slice for sign-off.
4. Generate the remaining assets in batches; wire each into the game; log credits per batch.
5. Template removal (BUILD-PLAN §4): replace Spine-based components, add the `video` asset type,
   web font for numbers, delete all template assets.
6. Run the acceptance tests (BUILD-PLAN §5) and record results here.
7. Afterwards: pull shared pieces into kit packages (`kit-board`, `kit-symbols`, `kit-fx`) and the
   shared art library, then start the next game from the owner's reference list.

Budget rule from the owner: AI Core ($40/month, 40,000 credits) must cover **5–10 games a month**,
so keep each game ≤ ~5,000 credits: video only for premium moments, everything else animated in code,
and reuse the shared library across games. Flag anything that looks patented or trademarked
(e.g. Megaways) instead of copying it.

## Session log

### 2026-10-05 (even newer) — Owner feedback: mascot/mobile/bg/old-art fixes
Owner review of the vertical slice flagged: free spins still shows old symbols/audio, backgrounds
need to be better, mascot doesn't look like he's flying, mascot missing on mobile. Addressed:
- **Mascot flying pose**: regenerated on Nano Banana 2. First attempt had a two-head AI glitch (90cr
  wasted); simplified the prompt to force a single character and regenerated clean (90cr). Re-keyed,
  overwrote `captain_kachink.webp` in place (no code change needed, same asset key).
- **Mascot on mobile**: `Mascot.svelte` only showed on `desktop`/`landscape` layouts before. Now
  always visible; portrait gets a smaller size (1.6x symbol vs 2.6x) positioned above the board
  (previous side-of-board position would've been off-screen on a narrow phone, and the first
  attempt at an above-board position was still half-hidden behind the board's own layer — fixed by
  pushing it further up so it clears the board top edge).
- **Background quality**: regenerated base + bonus on Nano Banana 2 2K (130cr each) instead of
  z-image Turbo (10cr) â€” noticeably more detail, atmosphere and polish. 9:16 portraits re-cropped
  from the new masters with ffmpeg, no extra credits.
- **Old art removal (free spins)**: the "old symbols" the owner saw were the free-spin intro panel
  (spine `fsIntro` background + `freespins_en.png`/`freespins.png` sprites) and the free-spin counter
  badge (`Frame_FSCounter.png` + bitmap "gold" font) â€” both 100% template mining art. Rewrote
  `FreeSpinAnimation.svelte`, `FreeSpinIntro.svelte` and `FreeSpinCounter.svelte` to use code-drawn
  panels (Rectangle + proxima-nova Text) in our palette instead â€” zero new credits, fully removes
  the old art from that screen.
- **Loading screen**: also still showed the full "MINING MAYHEM" spine title card on every load â€”
  very visible template branding the owner likely meant too. Swapped it for our new logo Sprite.
  Logo's first keying pass failed silently (the "green screen" the AI produced was `#1ac95e`, a
  muted sea-green, not pure `#00FF00` â€” re-keyed against the sampled colour, clean now).
- Marked `logo` and all 4 background assets `preload: true` so they're ready before first paint
  (was causing a `"not found in loadedAssets"` console warning on mount).
- **Not fixed yet â€” flagged, not silently skipped**: the "old audio" the owner heard is real; none of
  Step 9 has run (7 music tracks + ~38 SFX names in `sound.ts`, still 100% the template Howler
  sprite). This is its own 800-credit step with real scope (generation + packing into a Howler
  sprite) â€” didn't want to half-do it. Asked the owner whether to run it next.
- **Reference game**: no visual reference exists or is used â€” only a structure-only teardown
  (`docs/teardowns/coin-reel-5x5-teardown.md`, no images) per the project's no-copying rule. Told the
  owner directly rather than silently ignoring the question.
- Credits: 440 this round (14,740 -> 14,300). Total so far: 2,200 of the ~5,300 budget.

### 2026-10-05 (newest) — Step 5 backgrounds + logo, vertical slice ready — STOP
- Base background (dusk rooftops) and bonus background (gold vault, laser beams) generated 16:9 on
  z-image Turbo, 10cr each; logo ("CAPTAIN KACHINK" wordmark) same model, keyed transparent. 9:16
  portrait versions made by ffmpeg-cropping the 16:9 masters instead of a second generation — 0 extra
  credits (backgrounds are static scenery, a centre crop holds up). 30 credits total; 14,770 -> 14,740.
- Replaced `Background.svelte`'s spine idle/dust layers (template mining background) with plain
  Sprites, switching between the landscape/portrait texture based on
  `stateLayoutDerived.layoutType()`. Verified on both desktop and a 375x812 phone-portrait viewport —
  background fills correctly in both, matches the symbol/mascot style.
- Logo asset generated and keyed but **not wired in yet** — the loading screen's "Mining Mayhem" title
  card is a spine animation (`loader` asset, `title_screen` track), and replacing it belongs to Step 10
  (template removal / LoadingScreen rebuild), not Step 5. Flagging so the next session doesn't think the
  logo was missed.
- One harmless console warning on first mount ("baseBackgroundPortrait not found in loadedAssets") —
  logged once before the asset preload finished, never recurs on later spins/resizes. Not blocking.
- **Total spent: 1,760 credits (16,500 -> 14,740)**, far under the 5,300 budget. This is the Step 5
  **STOP**: vertical slice (mascot, all symbols, win clips, backgrounds, logo) is ready for the owner
  to review on phone before the remaining batches (coins/bonus UI, mascot clips, big win, audio,
  template removal, QA).

### 2026-10-05 (latest) — Step 4 win clips done
- H1-H4 win + W/S land generated as image-to-video from the Step 3 stills on Seedance 2.0 Mini
  (480p, 4s, no audio, 200cr each = 1,200 total; 15,970 -> 14,770). Picked after comparing costs:
  Kling 2.5 Turbo Pro 750cr, Omni 1.1 350cr, Seedance Mini 200cr — cheapest capable option.
  Prompts kept the still's pose as first/last frame with one small motion (pulse, bounce, flip,
  fist clench, spin-flash) per the fixed-style rules (camera locked, green stays pure).
  Sheeted with `video-to-sprites` (48 frames/256px, square so no `--crop` needed). Wired into
  `SYMBOL_INFO_MAP`: H2/H3/H4 win and W/S land moved off the template's spine animations onto the
  new spriteSheets (H1 win already done in Test 0). Verified across several spins in the browser
  (books 35, 22, 23, 28, 40, 44) — all symbols animate, zero console errors.
- Total spent so far this game: 1,730 credits (16,500 -> 14,770), well under the 5,300 budget even
  before the "least credits" instruction.
- Next: Step 5 backgrounds + logo, then the vertical-slice STOP for owner review.

### 2026-10-05 (latest) — Step 3 symbols done, switched to a cheaper model
- Owner approved the mascot and said to finish the game on the least credits possible. Switched bulk
  image generation from Nano Banana 2 (90cr) to z-image Turbo (10cr/image at 2K) — ~90% cheaper, still
  matches the cel-shaded style fine at this size.
- Generated L2 (star badge), L3 (shield badge), L4 (fist badge), H2 (Sprocket the robot pup), H3
  (domino mask), H4 (power glove), W (Kachink coin), S (alarm siren) — 8 images, 80 credits total.
  Reused L1 and H1 from the Step 1 style board instead of regenerating (already paid for).
  16,050 -> 15,970.
- Keyed all 10 to transparent 512px webp with ffmpeg (same colorkey/despill settings as H1, no fringe
  needed a second pass). Registered each as its own `sprite` asset in `assets.ts`
  (`H1_static`..`S_static`) and repointed `constants.ts`'s `h1Static`..`sStatic`/`wStatic` assetKeys
  at them (was `symbolsStatic` sheet frames like `h1.webp`). H5 left untouched — it's not used in any
  reel strip, template leftover, will be deleted in Step 10.
- Verified in the browser: full board renders with new symbols, no console errors, no green fringe.
- Next: Step 4 win clips (H1-H4 win, W/S land) via image-to-video on the cheapest capable model.

### 2026-10-05 (even later) — Step 2 mascot locked, owner approved
- Owner approved the Captain Kachink master. Keyed it green→transparent with ffmpeg (no despill
  needed, clean edges) into `apps/coin-reel/static/assets/mascot/captain_kachink.webp` (62 KB).
- Skipped the 3 pose stills from the manifest: `Mascot.svelte` only ever shows one texture and
  animates "point"/"cheer" reactions in code (tilt/bob/punch tweens), there's no pose-swap path to
  wire them into. Registered `captainKachink` as a `sprite` asset in `assets.ts` and pointed
  `MASCOT_TEXTURE` at it (was the `h1.webp` placeholder). Verified in the browser: mascot renders
  correctly next to the board, no console errors. Saved ~150-270 credits; the point/cheer/idle clips
  in Step 7 will source straight from this master instead.
- Owner said to finish the game using the least credits possible — going forward: cheaper models by
  default (GPT Image 2.0 Low/Medium instead of Nano Banana 2 unless quality demands it), one try per
  asset instead of the manifest's budgeted retries, skip anything not actually wired into the code.
- Next: Step 3 symbols (L1-L4, H1-H4, W, S stills) on a budget model, replacing `symbolsStatic`.

### 2026-10-05 (later still) — Step 1 style board
- Artlist MCP confirmed working on the paid plan ("AI Suite 16500", 16,500 credits/month). D1â€“D4 were
  already decided (BUILD-PLAN Â§0), so this batch generated one confirmation style board (not
  per-theme options): H1 Power Core gem, L1 bolt badge, base background (dusk rooftops), mascot
  sketch, all via Nano Banana 2 (1K) at 90 credits each = 360 total (16,500 â†’ 16,140). Downloaded to
  `C:\source\_studio-kit\art-masters\coin-reel\style-board\` and copied into the review page.
- Recorded a fixed style prompt prefix in BUILD-PLAN Â§0 to reuse for every future symbol/bg/mascot
  generation so the set stays consistent.
- RUNBOOK Step 1 ticked. Next: STOP for owner to confirm the look, then Step 2 (mascot lock, needs
  owner approval before any mascot clip).

### 2026-10-05 (later) — Test 0 PASSED
- The "blocker" was the test, not the code: the books had been regenerated, so book 9 no longer had an H1 win. Find a book with a given win before forcing it, e.g. book 35 (H1 wins on the 2nd tumble). The spriteSheet branch was mounting and playing all 48 frames.
- Fixed quality: `video-to-sprites` `despill` default turned gold to orange → new `--despill-mix` (default 1, keeps yellow/gold); new `--crop w:h` so 16:9 AI clips fill the square cell. H1 rebuilt with `--key 00ff00 --duration 2 --crop 1240:1076`.
- Masters (mp4/png) moved out of the game to `C:source_studio-kitart-masterscoin-reel` (not in git, not shipped). Only the sheet json/webp/preview stay in `static/assets/symbols`.
- How to verify a clip in the game: queue a book with that symbol's win, spin, and in the console pause sprite sheets with 48 textures at frame ~26 (see the session log tip) or just watch.
- Next: product owner decisions D1–D4, then Test 1 (style board). Artlist free outputs are watermarked/unlicensed: buy AI Core before generating ship assets.

### 2026-10-05 — Test 0 pipeline (partial)

**What was done:**
- Generated H1 still via GPT Image 2.0 Low (free): gold diamond on `#00FF00`. File: `apps/coin-reel/static/assets/symbols/H1_win.png`.
- Generated 5 s I2V clip via Kling 2.5 Turbo Pro I2V (free, only model available; min duration = 5 s, not 2 s). File: `apps/coin-reel/static/assets/symbols/H1_win.mp4`.
- Ran `video-to-sprites` (`--duration 2` trims to first 2 s worth of frames). Output: `H1_win.json` (48 frames), `H1_win.webp` (texture atlas), `H1_win.preview.webp`.
- Registered `H1_win` in `apps/coin-reel/src/game/assets.ts` as `type: 'spriteSheet'`.
- Added `apps/coin-reel/src/components/SymbolSpriteSheet.svelte` (adapted from `apps/lines`).
- Updated `apps/coin-reel/src/components/Symbol.svelte` to branch on `isSpriteSheet`.
- Updated `apps/coin-reel/src/game/constants.ts`: `SYMBOL_INFO_MAP.H1.win` → `{ type: 'spriteSheet', assetKey: 'H1_win', fps: 24, sizeRatios: { width: 1, height: 1 } }`.
- Fixed `apps/coin-reel/src/components/ReelSymbol.svelte`: `animating` condition now includes `symbolInfo.type === 'spriteSheet'` so SymbolWrap shows the animated layer.
- Confirmed `H1_win.json` loads (200 OK) and no `SpriteSheet key not found` errors in console.

**Blocker / next agent:**
- `SymbolSpriteSheet` mounts but `Symbol.svelte`'s `$effect` debug log never fired during an H1 win (book 9, cascade 4). The `spriteSheet` branch in `Symbol.svelte` may not be reached — investigate whether `getSymbolInfo` returns the correct type at runtime, or whether `SymbolWrap.svelte`'s visibility logic is swallowing the component before Svelte mounts it.
- Useful facts: H1 wins in book 9 cascade 4 (4th `winInfo` event); H1 positions reel/row = (0,4),(0,5),(2,3),(2,5),(3,5),(4,2). Queue with: `curl -XPOST localhost:5099/mock/queue -d '{"gameId":"coin-reel","mode":"BASE","id":[9]}'`.
- Once the animation plays visually, Test 0 is done. Record pass/fail in `BUILD-PLAN.md §1` and move to Test 1.
- Credit costs recorded in BUILD-PLAN §3: both gens were **free** (watermarked, not licensed for ship). Buy AI Core before Tests 1–3.

### 2026-10-05 — Artlist MCP
- Artlist MCP added to the owner's Claude Code user config (`~/.claude.json` → `mcpServers.artlist`, http, `https://mcp.artlist.io/mcp`). The `claude` CLI is not installed; the desktop app is used. Owner signs in via `/mcp` in a new session.
- Owner is on the Artlist **free** account first: use it for Test 0 (pipeline + quality). Free outputs may be watermarked and are not licensed for shipping; buy AI Core only after Test 0 passes.
- Next: confirm MCP tools load, check credit balance, run Test 0 (BUILD-PLAN §1), record real credit costs in BUILD-PLAN §3.

### 2026-10-04 (later) — coin-reel production plan
- Wrote `docs/games/coin-reel/BUILD-PLAN.md`: all template art/audio/animation to be replaced by our
  own (Artlist AI Core via MCP), Tests 0–4, asset manifest (31 stills, 16 clips, music/SFX), lean
  budget ≈ 5,300 credits (follow-on games ≈ 3,000–4,000), template-removal checklist, QA scenarios.
  Waiting on owner decisions D1–D4 and the Artlist MCP connection.

### 2026-10-04 (later) — symbol drop
- Added fall easing to the cascading reel engine (opt-in) and squash-and-stretch in coin-reel;
  measured in the browser (sx/sy ranges above). Cost estimate for AI art discussed with the owner.

### 2026-10-04 (later) — Hacksaw-style bar
- Replaced the template Pixi UI in coin-reel with `HacksawBar.svelte`; checked desktop, narrow and
  bonus states in the browser. Mascot now shows only on desktop/landscape; win meter uses the stacked
  position on tablet. Product owner approved a non-standard bar for kit games (POC).

### 2026-10-04 — Studio Kit kickoff + coin-reel POC
- Wrote the plan, mock RGS, video-to-sprites, sprite-sheet symbols in `lines`.
- Studied a Hacksaw 5×5 demo on Stake (structure only), built `apps/coin-reel` from the `scatter`
  template: trigger row, coin/free-spin reels, stash + collector bonuses, buy menu, mascot,
  portrait layout. All verified against the mock RGS in the browser.
- Gotcha: the Claude desktop browser pane pauses `requestAnimationFrame` when hidden; run the shim.
- Gotcha: files in the templates use CRLF; multi-line scripted edits must normalise line endings.
- Gotcha: PowerShell 5 `Set-Content -Encoding utf8` writes a BOM; don't use it on `package.json`.
