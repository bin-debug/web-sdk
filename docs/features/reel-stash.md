# reel-stash

- **Branch:** `feature/reel-stash` · **Needs:** bottom-row-expand, coins · **Shells:** 3
- **Player view:** a stash above each reel. Two bonus variants set in the game spec:
  `multiply`: stash starts at x1; when a reel expands its coins are multiplied by the stash, then the stash goes +1.
  `bank`: a collector above each reel banks every expanded coin value for the whole bonus; multipliers also hit
  the banked totals on that reel and its neighbours; everything pays at the end.
- **Events:** `stashUpdate { reel, value, banked? }` after each expansion (`value` = multiplier shown, `banked` =
  bank total for the `bank` variant). The coin values in `expandReel.cells` are already multiplied by the book.
- **Build:** `features/stash/StashRow.svelte` (one box per reel above the board; bump animation on update, number
  tween), end-of-bonus pay-out for `bank` (boxes drain into the win meter left to right).
- **Art slots:** none required (code boxes in the board-frame style); `COL1` may be used as the bank icon. Timing: bump 250 ms.
- **Mock scenarios:** `stash_multiply` (x1 -> x4 over a bonus), `stash_bank` (bank with neighbour multipliers).
- **Acceptance:** displayed stash/bank == book numbers after every event; end payout == book; reload restores boxes.
- **Shipped as:** `features/stash/` (`stashState.svelte.ts`, `StashRow.svelte`, `register.ts`). `scatter_tumble` selects both variants and provides books 308 (`stash_multiply`) and 309 (`stash_bank`). Bank totals drain at free-spin end; snapshot restoration is instant.
