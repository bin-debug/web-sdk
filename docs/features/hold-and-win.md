# hold-and-win

- **Branch:** `feature/hold-and-win` · **Needs:** coins, (jackpot-ladder for markers; refill-respins for the counter) · **Shells:** 2, 4 (gift-box variant)
- **Player view:** a base spin lands coin symbols (`C`, 6 or more in the demo books); they turn into coin cells that STICK. You get 3 respins (lives, shown as
  hearts in a life meter outside the board). Each landing special sticks and resets the lives to 3.
  The round ends when lives hit 0 or the board is full. A full grid pays everything.
  Two modes in the spec: normal (`mode: 'standard'`) and epic (`mode: 'epic'`: starts on a guaranteed
  full grid with at least 1 coin and 1 pot; every coin at least 1x).
- **Events:** `holdStart { board, coins, lives, mode }`, then per respin `respin { new, lives, remaining? }`
  (`lives` already reset to 3 when `new` is non-empty), then `holdEnd { total, fullGrid }`.
  Pots/collectors inside H&W use `collect {collector:'pot'}` (see collectors) and free cells.
- **Reels (reworked):** during the hold the board stays up; every cell with no coin or jackpot marker is a dark tile with a scrolling strip of symbols
  while a respin runs (the reels spin together, then stop left to right; coins and markers land as their reel stops). Strip symbols are cosmetic.
- **Build:** `features/holdAndWin/`: state machine (`idle -> intro -> respin loop -> outro`), life meter,
  sticky coin layer (reuses `coinLayer`), respin spin that only spins EMPTY cells (the rest stay),
  intro banner, full-grid celebration, total fly-up. Works with `reveal: spin|respin`. Resume from
  `createBonusSnapshot` restores board + lives.
- **Timing:** intro 800 ms; each respin 1.0-1.2 s; landing coins flip 250 ms; lives pulse on reset 300 ms.
- **Art slots:** `C1`-`C4`, `X` (blank cell), `bg.bonus`, mascot cheer clip. Fallback: dark empty tile, disc coins, hearts in code.
- **Mock scenarios** (lines_classic BASE books 317-321, `tools/book-gen/features/holdAndWin.mjs`): `hold_basic` (6 coins, one respin lands),
  `hold_full` (12 coins, last 3 cells land = full grid), `hold_epic` (starts on a full grid, mode `epic`), `hold_pot` (a pot collects
  two coins, cells free up, new coins land in them), `hold_resume` (longer round: reload mid-hold and it carries on).
- **Built (client):** `features/holdAndWin/` = `holdState.svelte.ts` (hold, lives, spin phase, banner, `startHold`/`respin`/`endHold`/`restoreHold`/`clearHold`),
  `HoldLayer.svelte` (dark empty tiles from `coinLayer`, ghost shimmer while a respin spins, hearts above the board, full-grid flash),
  `HoldBanner.svelte` (HOLD & WIN / EPIC HOLD & WIN / FULL GRID!), `register.ts`. Empty cells = cells with no coin right now, so a pot collector that frees
  cells makes them spin again. `reveal` calls `clearHold()`.
- **Resume:** a book with `holdStart` counts as a bonus book (`actor.ts` `checkIsBonusGame`), so the RGS round stays open until the last event.
  Every `respin` records its index; on reload `convertTorResumableBet` replays `holdStart`/`respin`/`holdEnd`/`squares*` events before that index
  into the snapshot, `restoreHold` rebuilds coins + lives with no animation, then the rest of the book plays.
- **Acceptance:** lives shown == book lives after every respin; only cells in `new` change; total == `holdEnd.total`;
  full-grid flag drives the celebration; reload resumes (checked: reload mid-round continues from the held coins and lives and credits the same win); turbo shortens spins but ends identical.
- **Out of scope:** jackpot markers (jackpot-ladder), the respin counter variant (refill-respins).
