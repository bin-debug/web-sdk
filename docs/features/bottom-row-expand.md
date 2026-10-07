# bottom-row-expand (trigger row)

- **Branch:** `feature/bottom-row-expand` · **Needs:** coins, tumble · **Shells:** 3
- **Player view:** the bottom row of a 5x5 pays-anywhere board is a "trigger row". A special symbol there
  stretches into a full-reel pillar and the reel cells flip into coins one by one (or into free-spin tiles).
- **Events:** `expandReel { reel, kind: 'coin'|'fs', cells }` (`cells` use the `coin` shape, in flip order).
- **Build:** `features/triggerRow/`: trigger-row highlight (red glow strip under the board, code), pillar
  animation (stretch 600 ms), flip-in via `coins.flipIn`, free-spin tile variant for `kind: 'fs'` (count comes
  from `freeSpinTrigger`). Reuse the coin-reel POC (`apps/coin-reel` coin reel + collect) as a code reference only.
- **Timing:** pillar 600-800 ms, flips 80 ms stagger.
- **Art slots:** `C1`-`C4`, `S` for fs tiles, `fx.poof`, `board.cell`. Fallback: code pillar + coloured cells.
- **Mock scenarios:** `expand_coin`, `expand_fs`, `expand_two_reels`.
- **Acceptance:** each expanded cell shows the book value; pillar only on the listed reel; tumble works after the
  expansion; reload mid-expansion ends in the final state.
