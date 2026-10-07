# coins

- **Branch:** `feature/coins` · **Needs:** nothing · **Shells:** 1, 2, 9 (and 3 via bottom-row-expand)
- **Player view:** special cells hold coins of four tiers (bronze, silver, gold, diamond) showing a
  payout value (x bet). Coins are revealed by other features (rainbow, hold and win, layers) and are
  summed by collectors/clovers or paid at the end of the reveal.
- **Events:** the `coin` shape in BOOK-EVENTS.md, carried inside `squaresReveal.cells`, `holdStart.coins`,
  `respin.new`, `layerReveal.cells`, `expandReel.cells`. This feature adds NO new event; it is the
  shared renderer and animation those features use.
- **Build:** `apps/shell/src/features/coins/`: `Coin.svelte` (tier from `kind`, value text drawn in code,
  gold glint idle), `coinLayer` (a layer over the board holding coins by position),
  `flipIn(coins, {stagger})` (flip reveal), `payOut(coins)` (pop to the win meter). Tier tints are code
  (one coin still tinted per tier).
- **Timing (turbo = 0.4x):** flip 250 ms, stagger 80 ms, glint on landing 300 ms; value text pops at
  120% then settles.
- **Art slots:** `C1` `C2` `C3` `C4` (stills), `C.flip` (clip, tinted per tier). Fallback: coloured disc +
  value text. The value text is always code (the art has a blank centre).
- **Mock scenarios (book-gen):** `coins_basic` (3-8 coins on a 6x5 reveal, all four tiers), `coins_big`
  (a diamond coin 100x+).
- **Acceptance:** four tiers render at 1600x900 and 375x812; values equal the book; turbo ends in the
  same state; `?art=none` shows disc + value.
- **Out of scope:** how coins are revealed or summed (other features).
