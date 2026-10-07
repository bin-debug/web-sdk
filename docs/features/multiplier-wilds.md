# multiplier-wilds

- **Branch:** `feature/multiplier-wilds` · **Needs:** lines or ways shell (exists) · **Shells:** 4
- **Player view:** wild crates (wood / iron / gold tiers) can land stacked. On a win they open to reveal a
  multiplier (rare and epic tiers are hidden until the win). Multipliers on wilds sharing a line ADD together.
- **Events:** `wildMults { positions, values, hidden? }` (parallel arrays; `hidden[i]` true = shown closed until
  the win). The line win amount in `winInfo` already includes the multiplier; the client only displays it.
- **Build:** `features/wilds/MultiplierWild.svelte` (tier from `values[i]`: <5 wood, <25 iron, else gold; closed
  state for `hidden`), `open` animation on the win highlight (lid bursts, number pops), multiplier text on wins.
- **Timing:** open 350 ms during the win highlight; stacked wilds open left to right, 80 ms stagger.
- **Art slots:** `MW1` `MW2` `MW3` stills, `MW.open` clip. Fallback: crate-coloured tile with "xN".
- **Mock scenarios:** `mwild_single`, `mwild_stacked`, `mwild_hidden` (opens on win), `mwild_additive` (two on one line).
- **Acceptance:** shown multipliers equal the book values; hidden ones stay closed with no win; lines pay as in the book.
