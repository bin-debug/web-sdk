# clovers

- **Branch:** `feature/clovers` · **Needs:** coins · **Shells:** 1, 2
- **Player view:** a clover multiplies coins. Green clover = adjacent coins only (the 3x3 around it);
  gold clover = every coin on the board (global). The multiplier shows as "x2".."x10" on the clover.
- **Events:** `cloverApply { pos, scope: 'adjacent'|'global', mult, targets }` (BOOK-EVENTS.md).
  `targets` are the coins whose value changes; the new total is in the next `squaresReveal.total` /
  `collect.total` (the client shows value x mult on each target; it never recomputes the total).
- **Resolve order:** clovers resolve BEFORE collectors, bags and pots (the book already orders events).
- **Build:** `features/clovers/`: the clover pops (burst clip), a trail runs to each target, targets
  pulse and their value text counts up to value x mult. Hooks into `coinLayer`. Coin and clover layers
  render above the board; clover scenarios update the running win rather than opening the generic
  full-screen win scene.
- **Timing:** burst 300 ms, trails 250 ms (stagger 60 ms), count-up 250 ms.
- **Art slots:** `CL1` (green) `CL2` (gold) stills, `CL.burst` clip. Fallback: green/gold disc with "x2".
- **Mock scenarios:** `clover_adjacent`, `clover_global`, `clover_chain` (two clovers, then a global collector; books 312-314 on cluster_classic).
- **Chained clovers:** a coin hit twice shows value x mult x mult (the tween multiplies its current target, not the original value); coins stay on the board until the last clover/collector has run.
- **Acceptance:** an edge clover only hits in-board neighbours (the book lists them); global hits all
  coins; shown target values equal book values; turbo and reload ok.
