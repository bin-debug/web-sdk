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
