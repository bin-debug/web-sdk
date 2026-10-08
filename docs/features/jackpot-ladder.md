# jackpot-ladder

- **Branch:** `feature/jackpot-ladder` · **Needs:** coins · **Shells:** 2 (also usable in 1)
- **Player view:** four jackpot tiers keyed `mini` (5x), `minor` (25x), `major` (250x), `grand` (2,500x).
  The keys are fixed in the contract; the display names and multipliers come from the game spec
  (e.g. MINI / MAJOR / MEGA / GRAND). Pills show the values (x current bet) with an idle light sweep.
  Jackpot coins land inside hold and win like coins, each showing its tier name. A tier is won only when 3 or more coins of that tier are on the grid when the hold ends (one `jackpotWin`, amount = spec mult x bet); fewer than 3 of a tier pay nothing. Each pill shows a progress badge (n/3) and glows at 3.
- **Events:** `jackpotWin { tier, amount, positions }` (amount in book units; `positions` = marker cells).
  The pill values shown are `spec.jackpots[tier].mult x bet`, from the spec (display only).
- **Build:** `features/jackpots/JackpotLadder.svelte` (desktop: left column; mobile: two rows above the
  board, GRAND alone then the rest, matching `kit-layout` slot `widget.jackpots`), tier colours green/blue/pink/orange,
  `jackpotWin` handler: pill flashes, marker coins pop, amount counts up, big-win overlay for grand.
- **Art slots:** `J1`-`J4` stills (blank centre, names in code). Fallback: round badges + text.
- **Mock scenarios:** `jackpot_mini`, `jackpot_grand`, `jackpot_two_tiers` (three MINI and three MINOR in one hold; a lone MAJOR pays nothing).
- **Acceptance:** pill value tracks bet changes; amount paid == book `amount`; names come from the spec (rename test);
  mobile layout shows all four pills without covering the board.

Shipped as `feature/jackpot-ladder`: spec-driven ladder and marker layers, `jackpotWin` handler, resume snapshot reservation, and lines_classic scenario books 326-328.
