# hold-and-win

- **Branch:** `feature/hold-and-win` · **Needs:** coins, (jackpot-ladder for markers; refill-respins for the counter) · **Shells:** 2, 4 (gift-box variant)
- **Player view:** a trigger fills the board with coin cells that STICK. You get 3 respins (lives, shown as
  hearts in a life meter outside the board). Each landing special sticks and resets the lives to 3.
  The round ends when lives hit 0 or the board is full. A full grid pays everything.
  Two modes in the spec: normal (`mode: 'standard'`) and epic (`mode: 'epic'`: starts on a guaranteed
  full grid with at least 1 coin and 1 pot; every coin at least 1x).
- **Events:** `holdStart { board, coins, lives, mode }`, then per respin `respin { new, lives, remaining? }`
  (`lives` already reset to 3 when `new` is non-empty), then `holdEnd { total, fullGrid }`.
  Pots/collectors inside H&W use `collect {collector:'pot'}` (see collectors) and free cells.
- **Build:** `features/holdAndWin/`: state machine (`idle -> intro -> respin loop -> outro`), life meter,
  sticky coin layer (reuses `coinLayer`), respin spin that only spins EMPTY cells (the rest stay),
  intro banner, full-grid celebration, total fly-up. Works with `reveal: spin|respin`. Resume from
  `createBonusSnapshot` restores board + lives.
- **Timing:** intro 800 ms; each respin 1.0-1.2 s; landing coins flip 250 ms; lives pulse on reset 300 ms.
- **Art slots:** `C1`-`C4`, `X` (blank cell), `bg.bonus`, mascot cheer clip. Fallback: dark empty tile, disc coins, hearts in code.
- **Mock scenarios:** `hold_basic` (6 coins, 3 respins, 2 land), `hold_full` (full grid), `hold_epic`, `hold_pot`
  (a pot clears cells then more land), `hold_resume` (reload at respin 2).
- **Acceptance:** lives shown == book lives after every respin; only cells in `new` change; total == `holdEnd.total`;
  full-grid flag drives the celebration; reload resumes; turbo shortens spins but ends identical.
- **Out of scope:** jackpot markers (jackpot-ladder), the respin counter variant (refill-respins).
