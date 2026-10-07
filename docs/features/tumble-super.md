# tumble-super (super tumble)

- **Branch:** `feature/tumble-super` · **Needs:** tumble (exists) · **Shells:** 1, 9
- **Player view:** on a win, EVERY symbol of the winning type is removed (not just the cluster). New
  symbols drop in until there are no more wins.
- **Events:** the existing `tumbleBoard { explodingSymbols, newSymbols }`; the book lists all removed
  positions in `explodingSymbols` (so super tumble is data, not client logic). `winInfo` still lists the
  winning cluster only; the extra removed cells are in `explodingSymbols`.
- **Build:** in the tumble handler, play the win highlight on `winInfo.positions`, then remove
  `explodingSymbols`: the non-winning matches get a short "sympathy" pop (a shimmer, 120 ms) before
  they leave with the winners. Flip `superTumble.implemented = true`; spec-check needs `tumble`.
- **Timing:** remove 300 ms + refill 400 ms (existing); sympathy pop adds 120 ms.
- **Art slots:** `fx.poof`. Fallback: code particles.
- **Mock scenarios:** `supertumble_basic` (cluster of 5, 9 matching symbols removed), `supertumble_chain`.
- **Acceptance:** removed set == `explodingSymbols` exactly; after refill the board equals the book's
  next board; turbo ok; works inside bonuses.
