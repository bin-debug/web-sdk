# rainbow-reveal

- **Branch:** `feature/rainbow-reveal` · **Needs:** golden-squares, coins (clovers/collectors if the book uses them) · **Shells:** 1
- **Player view:** a Rainbow symbol lands, then every gold square flips into a special (coin, bag, pot,
  clover, collector, jackpot). Order: clovers, then bags (top-to-bottom, left-to-right), then pots; new
  reveals can chain. The total is paid, then the squares clear. The epic rainbow (RB2) reveals the whole board.
- **Events:** `squaresReveal { cells, total }`, then any `cloverApply` / `collect` events, then
  `squaresClear`. `cells` are already in resolve order. A chain is another `squaresReveal` event.
- **Build:** `features/rainbow/RainbowReveal.ts`: plays the RB `activate` clip, sweeps a light across the
  squares, flips each cell via `coins.flipIn` in `cells` order, hands off to clovers/collectors, pays
  `total` to the win meter, then clears. Registers the `squaresReveal` handler.
- **Timing:** rainbow flare 500 ms, flips 80 ms stagger, 250-400 ms per resolve step.
- **Art slots:** `RB` `RB2` stills, `RB.activate` clip, `fx.poof`. Fallback: coloured arc + sparkle particles.
- **Mock scenarios:** `rainbow_basic`, `rainbow_chain` (reveal, clover, reveal again), `rainbow_epic` (RB2, full grid).
- **Acceptance:** squares count == reveal cells count; pay == `total`; epic covers every cell; turbo ok;
  a reload mid-reveal resumes in the final state.
