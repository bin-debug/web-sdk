# tiered-bonuses-boost (3/4/5 scatters, boost, buy menu)

- **Branch:** `feature/tiered-bonuses-boost` · **Needs:** existing bonus flow (`freeSpinTrigger`, `betModes.ts`) · **Shells:** all
- **Player view:** 3 / 4 / 5 scatters trigger BONUS / BONUS2 / BONUS3 (the 5-scatter one is "hidden", shown as a
  secret). A paid **boost** toggle (e.g. 3x bet) raises the bonus chance; the **buy menu** shows one card per
  `spec.buys` plus the boost modes, with price and volatility. All names come from the spec.
- **Events:** `freeSpinTrigger { bonusType, bonusName, totalFs, positions, hidden? }` and `retrigger`. Bet modes
  are RGS modes (`BASE`, `BONUS`, `BONUS2`, `BONUS3`, boost modes) from `spec.bonuses/boosts/buys` via `betModes.ts`.
- **Build:** make `betModes.ts`, the buy menu and the boost toggle fully spec-driven (no hard-coded modes); a bonus
  intro/outro per bonus (name card + fx.transition), hidden-bonus reveal; the boost widget sits in the bottom
  corner opposite the mascot on mobile (layout rule in SHELL-PLAN).
- **Art slots:** `S` `S2` `RB` `C3` stills for card art, `fx.transition`, `bg.bonus`. Fallback: coloured cards + text.
- **Mock scenarios:** `trigger_3`, `trigger_4`, `trigger_5_hidden`, `retrigger`, `boost_on`, `buy_each_mode`.
- **Acceptance:** adding/removing a bonus in the Game Builder form changes the buy menu and triggers without
  code edits; each trigger plays the right intro; boost mode is sent as the RGS mode; reload mid-bonus resumes.
