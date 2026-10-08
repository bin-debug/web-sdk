# refill-respins

- **Branch:** `feature/refill-respins` · **Needs:** hold-and-win (and sticky-wilds for shell 4) · **Shells:** 2, 4
- **Player view:** a respin counter ("3 spins left") shown outside the board that RESETS whenever
  something new lands (sticky coin or gift box). Used instead of hearts in the gift-box bonus.
- **Events:** `respinCounter { remaining, reset }` after each respin (`reset` true when it refilled).
  In hold and win it replaces the life meter display (the book decides which events it sends).
- **Build:** `features/respins/RespinCounter.svelte` (number + pips, pulse + "RESET" flash when `reset`),
  a `counterStyle: 'hearts' | 'counter'` per bonus from the spec.
- **Art slots:** none (code). **Timing:** pulse 300 ms.
- **Mock scenarios:** `refill_basic` (3 -> 2 -> reset 3 -> 2 -> 1 -> 0).
- **Acceptance:** shown value == `remaining` every step; reset flash only when `reset`; reload restores it.

- **Shipped as:** `features/respins/RespinCounter.svelte` with its event-driven state and snapshot restore. Hold and win now uses the shared component while continuing to source its display from the book's `lives`; sticky wilds uses the same shared `respinCounter` event handler. Test book: lines_classic BASE 329 (`refill_basic`).
