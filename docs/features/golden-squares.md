# golden-squares

- **Branch:** `feature/golden-squares` · **Needs:** tumble (exists) · **Shells:** 1
- **Player view:** winning positions leave a gold tile behind for the rest of the round. Gold squares
  are what the rainbow later turns into specials. Cleared when a rainbow resolves (base) or per bonus rules.
- **Events:** `squaresAdd { positions }` (after the win highlight, before the tumble) and
  `squaresClear { positions? }`. The client keeps the set from these events only (never from winInfo).
- **Build:** `features/squares/SquaresLayer.svelte` (a tile layer under the symbols), `squaresState`
  (set of positions, restored from `createBonusSnapshot`), handlers for the two events.
- **Timing:** tile fades/scales in over 200 ms with a gold flash; clear = fade over 250 ms.
- **Art slots:** `board.cell_gold` (still). Fallback: gold rounded rect with inner glow.
- **Mock scenarios:** `golden_basic` (win, tumble, win leaving 12 squares), `golden_overlap` (the same cells win twice) = books 318-319. They are full tumble rounds: `reveal, winInfo, squaresAdd, updateTumbleWin, tumbleBoard` per step, winInfo/tumbleBoard rows padded, squaresAdd rows visible.
- **New spin:** a base-game `reveal` clears any tiles left over (a book that clears them with `squaresClear` is unaffected); bonus spins keep them.
- **Acceptance:** squares persist across tumbles and clear exactly on `squaresClear`; reload mid-round
  restores them; non-winning cells dim to 30% only during the win highlight.
