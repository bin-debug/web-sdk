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

Not done / known gaps:
- **All art is placeholder** (template mining symbols, procedural coins, symbol-as-mascot).
- Symbol fall-in feel is the template's; needs the "slick drop" pass (Next up #3).
- `I18nTest` overlay is commented out in coin-reel; template header text "ADD YOUR LOGO" still shows.
- No automated tests; verification is manual in the browser.

## Next up (in order)

1. Polish the bar against the reference (hold-to-turbo on spin, bet sheet on tap of the bet value,
   autoplay stop conditions) and move it into a shared package for kit games.
2. **Art via an AI image/video tool** (e.g. Higgsfield, when access is given): generate per the art
   brief in STUDIO-KIT-PLAN §8.2 (symbols as single PNGs on transparent or #00FF00, 1:1 clips with
   first/last frame = still pose; mascot idle/point/cheer clips; coin flip/expand clips; background
   loops). Convert clips with `tools/video-to-sprites`, wire through `SYMBOL_INFO_MAP` states and the
   mascot texture slot (`Mascot.svelte` `MASCOT_TEXTURE`).
3. **Slick symbol drop**: per-column staggered fall with overshoot + squash on land (tune
   `SPIN_OPTIONS_*` in `constants.ts`, add a land "squash" juice in the symbol renderer), quick
   anticipation on reels with a trigger-row special.
4. Move generic pieces into packages per the plan (`kit-board`, `kit-symbols`, `kit-fx`).
5. Second teardown → second game to prove the kit generalises (e.g. a 6×5 or jagged layout).

## Session log

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
