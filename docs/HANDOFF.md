# Handoff: Studio Kit (keep this file current)

**Rule for every agent:** read this first, then `docs/STUDIO-KIT-PLAN.md`. When you finish a
session, update **Status**, **Next up** and **Session log** below, and commit it with your work.
Newest log entry on top. Keep it short and factual.

- Branch: `studio-kit` on `origin` (github.com/bin-debug/web-sdk, a public fork, so no hostnames, tokens or client names in commits).
- Phase: **POC.** No production builds or certification needed yet. Speed over polish.
- Product owner wants: Hacksaw / Paperclip quality and speed; games built from a spec; animation from
  video (no Spine).

## Where things are

| What                                                                                       | Path                                                               |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Master plan (architecture, every layout, mechanics catalogue, animation strategy, roadmap) | `docs/STUDIO-KIT-PLAN.md`                                          |
| **Game shells plan (spec + art slots + feature library, build order) — current direction** | `docs/SHELL-PLAN.md`                                               |
| **Per-feature specs, book-event contract, status, git workflow, session prompts**          | `docs/features/` (start at `README.md`; `STATUS.md`, `PROMPTS.md`) |
| Teardown of the reference game (structure only, no assets)                                 | `docs/teardowns/coin-reel-5x5-teardown.md`                         |
| **coin-reel build plan: art/audio/animation manifest, tests, budget**                      | `docs/games/coin-reel/BUILD-PLAN.md`                               |
| POC game                                                                                   | `apps/coin-reel` (+ its `README.md`)                               |
| Mock RGS (any books, forced outcomes)                                                      | `tools/mock-rgs`                                                   |
| Synthetic book generator for coin-reel                                                     | `tools/book-gen/coin-reel.mjs`                                     |
| Video → sprite sheet                                                                       | `tools/video-to-sprites`                                           |
| Hidden-browser-pane animation fix                                                          | `tools/qa/hidden-pane-raf-shim.js`                                 |
| Sprite-sheet symbol states (pattern)                                                       | `apps/lines/src/components/SymbolSpriteSheet.svelte`               |

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

## Session log

- 2026-10-08: sticky-wilds feature added: `addStickyWilds` boxes stay on their cells for the whole round (several reveals = respins), cleared when a reveal with index 0 starts; stub counter (`respinCounter`, pips + RESET flash) lives in `features/wilds/StickyCounter.svelte` and should be replaced by the refill-respins counter; reload restores boxes and counter (`addStickyWilds`, `respinCounter` are snapshot events); lines_classic books 322-323 (`sticky_bonus`, `sticky_stacked`); contract, 56 contract tests, desktop and mobile `?art=none` QA and reload mid-round passed.
- 2026-10-07: golden-squares visibility fix: moved the marker layer above both normal and tumble boards so `boardHide` cannot remove active gold cells; verified rendered gold outlines at 375×812 during forced scenario 318.
- 2026-10-07: golden-squares feature added: book-directed gold tiles persist beneath symbols across tumbles, restore from snapshots, and clear only on `squaresClear`; cluster_classic golden_basic/overlap scenarios added.
- 2026-10-07: collectors feature added: local/global/pot book-directed coin collection, fallback collector art, source removal, win update, and three cluster_classic scenarios; contract, desktop/mobile no-art/art, turbo and reload QA passed.
- 2026-10-07: clovers visual follow-up: coin/clover layers sort above the board, and clover demo books update the running win rather than opening the generic win scene. The reel-symbol masking attempt was reverted after it blanked the board.
- 2026-10-07: clovers feature added: book-directed adjacent/global multiplier trails, coin value count-up, three cluster_classic forced scenarios; contract, build, desktop and mobile no-art QA passed.

Done and checked in the browser:

- Mock RGS serves all five templates and generated books; resume of an open bonus works.
- coin-reel: 5×5 pays-anywhere + tumbles, teal trigger row, coin reel (tiered coins, collect with
  board dim), free-spin reel, **two bonuses**: _Multiplier Mine_ (per-reel ×N stash) and
  _Treasure Vault_ (per-reel coin pot that pays again), resume restores the boxes.
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

**2026-10-07: remaining shells/features are built one per session from `docs/features/` (one spec each, `BOOK-EVENTS.md` is the contract, `PROMPTS.md` has the copy-paste prompt and wave order). Every session works on its own branch/worktree, opens a PR into `studio-kit` and squash-merges it. Track progress in `docs/features/STATUS.md`.**

**Game Builder v1 is done (see log). Next: `tools/art-gen` to run the queued Artlist requests; then shells 1-4 and 9 feature by feature (each new shell goes into `tools/builder-server/shells.json` once verified).**

**Shell engine phases 1–2 done (see log). Next: shells 1–4 and 9 per SHELL-PLAN §6, one feature module at a time (goldenSquares, rainbowReveal, coins, clovers, collectors, …), each with synthetic books, forced scenarios and a story; then the Game Builder (3b).**

**Demo art library is done (2026-10-06, see session log).** Next for it: SHELL-PLAN phase 1 (slot loader + `lines` on the manifest), then the 8b check in the `lines` shell at desktop and 375x812. Optional polish list is in the log entry.

\*\*2026-10-06: the owner switched direction. coin-reel production is paused; build the game shells

- Game Builder instead.\*\* Follow `docs/SHELL-PLAN.md` (phases 1–3b) and generate the shared demo
  art with `docs/DEMO-ART-SPEC.md` (decided: fox mascot "Rusty", treasure & gems symbols, clips for
  highs/specials/mascot). The two can run in parallel sessions. The coin-reel task below is paused
  and kept for reference only.

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

### 2026-10-07: hold-and-win built (feature/hold-and-win)

- `apps/shell/src/features/holdAndWin/`: `holdState.svelte.ts`, `HoldLayer.svelte` (empty tiles + shimmer + hearts, in `Game.svelte` before `CoinLayer`), `HoldBanner.svelte` (after `RetriggerBanner`), `register.ts` (`holdStart`, `respin`, `holdEnd`). It reuses `coinLayer` (`flipIn`, `payOut`, new `placeCoins` for resume); empty cells are derived from the coin layer so a pot collector that frees cells just works. The client never computes lives or totals.
- Resume: single-reveal win books are closed by the SDK right after the bet (`createPrimaryMachines` `singleRoundWin`), so a reload mid-hold had nothing to resume. `actor.ts` `checkIsBonusGame` now also returns true for a book with `holdStart`; each `respin` calls `recordBookEvent`; `utils.ts` reserves `holdStart/respin/holdEnd/squaresAdd/squaresClear` for the snapshot (the golden-squares snapshot restore was getting nothing before). Checked: reload at lives 2 continues with the held coins and pays 19x.
- book-gen: `features/holdAndWin.mjs` (lines_classic now lists `coins` and `holdAndWin`): BASE ids 317-321. Contract rules for `holdStart/respin/holdEnd` already existed; 384 books, 0 problems.
- Also fixed: the collector's total label showed book units (1700x for 17x); it now divides by 100.
- Dev handle: `window.__hold = { hold, holdFx }` (dev only) so QA scripts can stop on a frame (used by `tools/qa/frame-catch.js`).
- Not done: hold-and-win art slots (`X` blank cell, `bg.bonus`, mascot cheer), jackpot markers (jackpot-ladder), respin counter (refill-respins).

### 2026-10-07: review pass on clovers, collectors, golden-squares (fix/clovers-collectors-golden-review)

- Fixed: chained clovers multiplied from the original coin value (x2 then x2 showed x2); `multiplyCoins` now multiplies the tween's current target. A clover followed by a collector no longer pays out the coins early. Collector win meter now accumulates each `collect.total` (was set to the latest). `reveal` now clears coins, clovers, collectors and (base game only) golden tiles so a skipped or interrupted round never leaves stale cells.
- book-gen: `goldenSquares.mjs` rewritten as real tumble rounds with padded winInfo/tumbleBoard (the old books pushed a full board into `newSymbols`); `clovers.mjs` chain ends with a global collector; `collectors.mjs` pot takes every coin. Ids unchanged (312-319).
- Checked on cluster_classic: desktop with art and 375x812 `?art=none`, turbo, 0 console errors, contract check 0 problems.
- Not done: card/clip art slots (`CL.burst`, `COL.collect`), persistence of golden tiles across free spins (persist-squares feature).

### 2026-10-07: multiplier-wilds built (feature/multiplier-wilds)

- `apps/shell/src/features/wilds/`: `wildState.svelte.ts` (`placeWilds(positions, values, hidden)`, `openWilds(winPositions)`, `clearWilds()`), `MultiplierWild.svelte`, `WildLayer.svelte` (in `Game.svelte`), `register.ts`. Tier by value: <5 wood, <25 iron, else gold; art `symbol.MW1..MW3.static` when present, else a code crate with "xN"; closed hidden crate shows "?".
- Flow: `wildMults` (after `reveal`, visible rows) places the crates; the core `winInfo` handler calls `openWilds(positions)` (winInfo rows are padded: row-1 = visible) so crates inside a win open left to right (80 ms stagger, 350 ms open); `reveal` calls `clearWilds()`. The client never adds multipliers: amounts come from `winInfo`. Other wild features (sticky, expanding) can reuse the layer/pattern; sticky-wilds should keep its own state, not `wildLayer`, so `clearWilds` on reveal doesn't wipe it.
- Not done: the `MW.open` clip (the open burst is code), multiplier text on the win amount pill (it shows the line total only). book-gen: `features/multiplierWilds.mjs` (spec feature id `multiplierWilds`, enabled on lines_classic). Reload mid-round resumes at the unfinished event, wins are credited; hidden crates in a resumed round are not re-shown (board is not rebuilt either). Verified 1600x900 (art) and 375x812 (`?art=none`), turbo, reload, contract check clean.

### 2026-10-07: tiered-bonuses-boost built (feature/tiered-bonuses-boost)

- Most of the flow already existed (spec-driven `betModes.ts`, SDK buy/boost modal: one card per `spec.buys` + one per boost, boost = RGS mode `activate`). Added: `features/bonusTiers/tiers.ts` (tier colour/name/hidden from `spec.bonuses`), intro kicker + tier colour on `FreeSpinIntro` ("3 scatters" / "Secret bonus unlocked"), `RetriggerBanner.svelte` (`retriggerShow`), volatility line on buy cards.
- Retrigger is now an event: `freeSpinTrigger { retrigger: { extra }, totalFs: <new total> }` followed by `updateFreeSpin`; the handler shows the banner and lengthens the counter, no intro. Resume rebuilds from the FIRST non-retrigger trigger with the LAST `totalFs` (verified: intro shows 15 after a +5 retrigger).
- book-gen: tier = highest bonus whose trigger count the scatters reach; hidden flag copied from the spec; one natural-trigger book per tier appended to BASE after the feature scenarios (ids printed by the generator). scatter_tumble spec changed to 3 tiers + `BOOST` (hidden BONUS3 has no buy card by design).
- Not done: card art slots (`S`,`S2`,`RB`,`C3`) in the SDK buy cards (HTML modal has no slot hook; cards are text/colour); per-tier outro. Verified 1600x900 (art) and 375x812 (`?art=none`), turbo, reload mid-bonus, contract check clean (792 books), contract tests 56/56.

### 2026-10-07: coins built (feature/coins)

- `apps/shell/src/features/coins/`: `coinState.svelte.ts` (`flipIn(coins)`, `payOut(coins?)`, `clearCoins()`; other features call these), `Coin.svelte` (art `symbol.C1..C4.static`, else a coloured disc; value text always code), `CoinLayer.svelte` (in `Game.svelte`), `register.ts` (handler map). Turbo/skip = 0.4x time (stop button turns turbo on).
- Coins add no event. Until rainbow-reveal exists, the coin module plays `squaresReveal` itself: flip in, show `total` in the running-win pill, pay out. **rainbow-reveal: take over the handler and call `flipIn`/`payOut` from here.** Kinds clover/collector/jackpot are skipped by this layer (their features draw them); bag/pot use the gold look.
- New shared pattern: `shell.mjs` loads `tools/book-gen/features/<featureId>.mjs` (`export function scenarios(ctx)`) for every feature in a spec and appends the books to BASE. `buildArt` registers `symbol.C1..C4.static` when present. Not used: the `C.flip` clip (the flip is code).
- Resume: coins are transient inside one event, so a reload mid-reveal restarts at the unfinished event (verified: round completes and pays). Verified 1600x900 (art) and 375x812 (`?art=none`), turbo, zero errors, contract check clean.
- Dev-server note: a file named `coinLayer.svelte.ts` next to `CoinLayer.svelte` collides on Windows (case-insensitive); keep state files named differently.

### 2026-10-07: contract-check built (feature/contract-check)

- `tools/book-gen/check-contract.mjs <gameId> [--books=file|dir] [--board=RxC]` validates books against BOOK-EVENTS.md (`.json`, `.jsonl`, `.jsonl.zst`; zst needs Node 22.15+). Exit 1 and one line per problem (book id + event index).
- Rules are auto-loaded from `tools/book-gen/contract/rules/*.mjs` (core SDK events plus every event in BOOK-EVENTS.md, one file per group; helpers in `contract/helpers.mjs`). Feature sessions edit only their group file and add one bad book per rule to `contract-tests/` (`pnpm check:contract-tests`).
- Decisions: SDK events may use padding rows (row up to rows+1, tumble/win positions do); NEW events must sit on the visible board (row < rows). `index` is checked sequential at top level only; events nested in `createBonusSnapshot` are validated but not index-ordered. Unknown event types are errors. Game Builder now runs the check after book-gen.
- All current shell books (lines/ways/cluster/scatter_tumble/simple_test) pass; 56 test cases pass.

### 2026-10-07: feature specs and git workflow (planning session)

- Wrote `docs/features/` (README, BOOK-EVENTS contract, STATUS, PROMPTS, shells, 19 feature/tool specs). Added `DEMO-ART-SPEC` section 11 (art requests from feature sessions). SHELL-PLAN section 5 points to it.
- No code changed. `check-contract` tool is the first item to build (nothing validates books against the contract yet).
- Not yet proven: shells against real math-sdk books (last row in STATUS.md).

### 2026-10-06 (newest) — Game Builder v1

- `apps/game-builder` (SvelteKit SPA, port 3230) + `tools/builder-server` (zero-dep Node, port 3231). Run: `node tools/builder-server/server.mjs` and `cd apps/game-builder && pnpm dev`. The server starts the demo RGS (5119) and one shell dev server per game (ports 3240+, remembered in `tools/builder-server/.state/ports.json`, git-ignored; detached, so they survive a server restart). The UI talks to the server on the same host, port 3231, so it works over LAN/Tailscale.
- Features and decisions: see SHELL-PLAN 7b status. One page, state in the URL (`?view=list|edit|game&game=<id>&tab=play|art|export`); flat list UI, no tiles. Only shells marked `verified` in `tools/builder-server/shells.json` can be picked; features not `implemented` in `kit-spec` are greyed with the reason. Bonus 2/3 scenarios queue BONUS2/BONUS3 books and the user presses BUY BONUS (the iframe is cross-origin, so the builder cannot press it). Replacing a symbol still also swaps that symbol's demo clips for code juice presets so old art never plays over new art.
- Verified this session with `tools/qa/shell-qa.js`: ways_classic (base, forced bonus with retrigger, max win, bought bonus) and scatter_tumble bought bonus: zero errors. `shells.json` now marks all four shells verified. Builder UI checked at 1600x900 and 375x812; export zip built for a throwaway game (only that game's spec in the bundle, no local URLs in it).
- Export gotcha: `vite build` of the shell prints its last line and never exits; the server stops it after that line (`doneWhen` in `run()`). Export output goes to `apps/shell/build` (git-ignored) and the zip to `tools/builder-server/.state/exports/`.
- Not done: "Generate with Artlist" only queues requests into `games/<id>/art-requests.json` (there is no `tools/art-gen`; Artlist MCP tools exist only in an agent session). Next agent: build `tools/art-gen --missing` that reads those requests, generates through Artlist, keys with `tools/demo-art/key_still.py`, and writes via the builder's art PUT endpoint. Hold and win / jackpot scenario buttons are greyed until those features exist. "Release games" workflow hook for export is not wired.
- Ports now: builder UI 3230, builder server 3231, demo RGS 5119, shells 3240+ (builder-built) and 3222 (manual dev), demo art contact sheet 3221.

### 2026-10-06 — Shell engine: phases 1–2 (shells 5–8 run from specs)

- New packages: `kit-spec` (types, feature registry, validator), `kit-assets` (manifest loader + code-drawn fallbacks + Howler audio), `kit-symbols` (KitSymbol: clip or still+juice), `kit-layout` (`compose()`), `kit-ui` (KitBar = coin-reel bar promoted), `kit-fx` (NineSlice). `apps/shell` is the one engine app: the game is chosen at runtime by `?game_id=` from `games/*/game.spec.json` (4 specs: lines_classic, ways_classic, scatter_tumble, cluster_classic). `?art=none|game|demo` forces fallback-only / game art / demo art; art is merged demo manifest under `games/<id>/art`.
- `node tools/spec-check/spec-check.mjs` validates specs in plain English. `node tools/book-gen/shell.mjs` writes synthetic books for every spec (BASE ids 1–300 natural, 301 forced bonus with retrigger, 302 max win, 303 bonus with extra scatter; BONUS buy mode ids 1+). Visual tests only.
- Verified (hidden-pane rAF shim, in-page runner `tools/qa/shell-qa.js`, non-blocking, results in `window.__qa`): lines_classic base wins, forced bonus, bought bonus; scatter_tumble tumble rounds and retrigger bonus; cluster_classic with `?art=none` at 375x812 (all code fallbacks). Zero page errors in rounds. Missing game art manifests are expected 404s.
- Known gaps: logo overlaps frame top on desktop; BALANCE/WIN labels overlap in the phone bar when win is empty; ways_classic and the BONUS buy path in tumble shells only lightly checked; shells 1–4 and 9 (feature modules) not started; `window.__shell` dev handle is always on (gate it before release).
- Ports: shell 3222 (all shells via game_id), demo RGS 5119 (`node tools/mock-rgs/server.mjs 5119`), demo art contact sheet 3221. Reset queues: `curl -XPOST localhost:5119/mock/reset -d '{"gameId":"<id>"}'` then use a new sessionID.

### 2026-10-06 — Demo art library generated (179 slots)

- `packages/kit-demo-art/static/demo/` is complete per DEMO-ART-SPEC sections 3-8a: 54 keyed stills (L1-L6, H1-H6, E1-E4, W, S, S2, RB, RB2, C1-C4, CL1-2, COL1-2, J1-4, MW1-3, DW, T1-3, X, M), 4 backgrounds (16:9 + 9:16), board frame/cell/cell_gold, logo, Rusty master + 6 mascot clips, H1-H6 win clips, 10 special clips (W land/win, S, S2, RB, C flip, CL, COL, MW, DW), FX poof/upgrade (sheets) and bigwin/transition (WebM), 2 music loops, 18 SFX. `manifest.json` (179 slots) and `contact-sheet.html` (24 sheets animate, no broken images in the browser check) come from `python tools/demo-art/build_manifest.py`.
- Tools in `tools/demo-art/`: `key_still.py` (flood-fill key vs sampled bg, `--shadow` for hard ground shadows), `ingest.py`, `sheet.py` (`--speed 2` turns the 4 s clips into 2 s sheets that return exactly to the still), `framecheck.py`, `build_manifest.py`, `synth_sfx.py`. Masters are in `C:\source\shared\demo-art-library\masters\` (not in git); `ids.json`/`clips.json` there map slots to Artlist generation ids.
- Known demo-quality gaps (cheap to redo): CL2 gold clover reads as 3 leaves; T1-T3 are centre crops of slab renders (not edge-to-edge slabs); board cells look like diamond-pattern flagstones; S still has a purple glow haze after keying; RB/RB2 and E1 have faint edge specks; bigwin/transition are on black (play with additive/screen blend); lows carry their rank in the art (no `rankOverlay` needed).
- Not done: spec 8b "verify in the lines shell" (SHELL-PLAN phase 1 not built yet), mobile 375x812 check of the shell, `rankOverlay` fallback. Mascot master was not owner-approved before the clips (owner said no approval stops).
- Artlist gotchas: batches over about 12 jobs hit USER_CONCURRENCY_EXCEEDED; get_balance/credit check flakes (retry); video batches of 1,000+ credits need confirmCost (done under the owner's standing authorisation up to 11,000); 2-image polls are huge, use num_images 1; z-image invents text on "blank" faces; Seedance Mini image-to-video is modelId 2467, text-to-video 2468 (both 200 cr, 480p 4 s, set generate_audio false).
- Credits: 14,300 -> 7,310 (6,990 spent of the 8,500 plan).

### 2026-10-05 — Owner feedback round 2: real template-art bug, mascot occlusion, FS rate

Owner said: still old symbols/UI, free spins keep triggering, mascot too small/invisible, board too
high. Found and fixed real bugs this time, not just polish:

- **The actual "old symbols" bug**: `SYMBOL_INFO_MAP`'s `win` state for L1-L4 and W, and `spin`/`win`
  for S, were _still wired to the original template spine assets_ (old mining suit icons/wild/scatter
  spines) — Steps 3-4 only ever replaced `static`/`land`/`postWinStatic` for those symbols, never
  `win`/`spin`. So every single win flashed old template art for a frame before the code-level
  explosion. Fixed: L1-L4/W/S `win` (and S `spin`) now point at their own new static sprite
  (`constants.ts`). H1-H4 were already correct (Step 4 covered their win clips).
- **Explosion effect was also 100% template art**: the shared `explosion` SYMBOL_INFO_MAP entry
  (`assetKey: 'explosion'`) is a spine from the template's `symbols3.atlas` — never swapped, so
  _every_ tumble-clear across _every_ symbol played old mining art. Added `SymbolExplode.svelte`
  (code-drawn: the symbol's own static art, scale+fade out, ~260ms) and made `Symbol.svelte` use it
  for `state === 'explosion'` regardless of symbol type, bypassing the old asset entirely.
- **"TUMBLE WIN" banner** (`TumbleWinAmountFrame`/`TumbleWinAmountText`) was still the template's
  wood-plaque sprites (`Frame_Tumble.png`, `Frame_TumbleWin.png`) + "gold" bitmap font + a spine
  burst animation. Rewrote both as code-drawn (Rectangle + proxima-nova Text, matching the
  free-spin-intro panel style), with a simple scale-punch tween replacing the spine explosion.
- **Free spins triggering constantly**: two compounding causes. (1) Leftover test books from my own
  earlier `/mock/queue` calls were still sitting in the shared mock-rgs queue — it's keyed by
  `gameId/mode`, not by session, so the owner's real phone session was draining _my_ test queue.
  (2) Natural trigger rate in `base.json` was ~7% (S weight 0.35) even with an empty queue, too
  frequent for casual testing. Lowered `basegame.S` weight 0.35 -> 0.08 in
  `tools/book-gen/coin-reel.mjs` and regenerated (`base.json` natural rate now ~1%). Also discovered
  the mock-rgs server process from earlier in the session had never actually restarted (old PID still
  listening, serving the old books) — killed it and started clean. **Process note for next session**:
  always `curl -XPOST :5109/mock/reset -d '{"gameId":"coin-reel"}'` before/after a testing round.
- **Mascot occlusion**: the mascot wasn't actually invisible — the free-spin-trigger-adjacent
  "TUMBLE WIN" banner (positioned above the board, same zone as the mascot) was painting over it
  since neither had an explicit draw order. Gave `Mascot.svelte`'s container `zIndex={100}` and
  moved the win banner's portrait x-position from board-centre to 36% (`TumbleWinAmountWrap.svelte`)
  so they no longer fully overlap. Also bumped mascot size again (portrait 1.6x -> 2.2x -> no further
  change this round, desktop 2.6x -> 3.0x) and board y (portrait 0.36 -> 0.42, desktop 0.44 -> 0.47)
  for more headroom above the board.
- Verified on both desktop and 375x812 mobile: multiple spins/tumbles/wins, correct new symbols and
  mascot throughout, no old template art, free spins did not trigger once in ~8 spins post-fix.
- 0 Artlist credits this round — all code fixes, still 14,300 of 16,500 (2,200 spent total).
- **Known remaining gap, not fixed**: audio is still the full template Howler sprite (Step 9, not
  started — flagged to the owner last round, still pending their go-ahead). H5 (unused symbol, not in
  any reel strip) still points at old template art too but never renders — Step 10 cleanup.

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
