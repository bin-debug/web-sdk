# collectors

- **Branch:** `feature/collectors` · **Needs:** coins · **Shells:** 1, 2 (pot), 9
- **Player view:** a collector (loot sack) sucks in the coins around it and pays their sum (3x3 local);
  a global collector (chest) takes every coin on the board; in hold and win a pot collector takes coins
  and frees their cells. Collectors resolve top-to-bottom, left-to-right, after clovers.
- **Events:** `collect { collector: Position|'global'|'pot', sources, total }`. `sources` = the coin cells
  that are absorbed, in play order; `total` = what is added to the win.
- **Build:** `features/collectors/`: sources shrink and fly to the collector along curved trails
  (stagger 70 ms), the collector squashes, the total pops over it, the win meter ticks. Absorbed coin
  cells are removed from `coinLayer`.
- **Timing:** 250-400 ms per step, chained; the board dims to 40% during a global collect.
- **Art slots:** `COL1` (sack) `COL2` (chest), `COL.collect` clip. Fallback: brown/gold box with "$".
- **Mock scenarios:** `collect_local`, `collect_global`, `collect_pot` (no stale cells left).
- **Acceptance:** shown total == `collect.total`; cells in `sources` are empty afterwards; order is
  top-to-bottom, left-to-right as the book lists; turbo/skip ends with the same board.
