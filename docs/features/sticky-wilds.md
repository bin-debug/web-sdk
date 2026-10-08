# sticky-wilds

- **Branch:** `feature/sticky-wilds` · **Needs:** multiplier-wilds, refill-respins · **Shells:** 4
- **Player view (gift-box bonus):** all wild boxes are sticky for the bonus. There are 3 respins that reset to 3
  whenever a new box lands (hold-and-win style). Stuck boxes keep their multiplier.
- **Events:** `addStickyWilds { positions, mults? }` for each landing, `respinCounter` for the counter (see
  refill-respins), `wildMults` when a box opens.
- **Build:** `features/wilds/StickyWilds.ts`: a sticky layer above the reels (survives reel spins; only non-sticky
  cells spin), landing slam, glow idle, restored from the bonus snapshot.
- **Art slots:** `MW1`-`MW3`, `W`. Fallback: code tiles. Timing: land slam 250 ms.
- **Mock scenarios:** `sticky_bonus` (3 respins, reset twice, ends 0), `sticky_stacked`.
- **Shipped as:** `wildLayer.sticky` (wildState.svelte.ts) + `StickyCounter.svelte` stub; round = several reveals, sticky boxes clear on the next reveal with `index === 0`; a box with no `mults` entry shows "W". Test books: lines_classic ids 322 (`sticky_bonus`) and 323 (`sticky_stacked`).
- **Acceptance:** stuck boxes stay across respins; counter follows the book; reload restores them.
