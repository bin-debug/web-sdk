# symbol-upgrade-bar (symbolUpgrade + symbolBar)

- **Branch:** `feature/symbol-upgrade-bar` · **Needs:** nothing hard (shell 1 uses it with persist-squares) · **Shells:** 1
- **Player view:**
  - `symbolUpgrade`: in a bonus, a winning high symbol becomes its Epic version for the rest of the bonus.
  - `symbolBar`: a bar outside the grid (levels 1-4). Each level adds spins (+2 per level); level 4 also
    guarantees a rainbow on the next spin. In some bonuses the bar is locked at a level.
- **Events:** `upgradeSymbol { symbol }` (e.g. `H2` -> client now draws every `H2` as its epic variant, `E2`),
  `barLevel { level, spinsAdded, guaranteeReveal? }`. Spin counter changes come from `updateFreeSpin`.
- **Build:** `features/upgrade/`: `upgradeMap` state (restored from the bonus snapshot) used by the symbol
  renderer to swap `Hn` -> `En`; `UpgradeFlash` (fx.upgrade on every cell of that symbol, 800 ms);
  `SymbolBar.svelte` (4 segments, fills with a pulse, "+2 SPINS" pops on level-up). Position of the bar:
  beside the board on desktop, above the board on mobile (layout slot `widget.symbolBar`).
- **Art slots:** `E1`-`E4` epic stills (see DEMO-ART-SPEC), `fx.upgrade` clip. Fallback: same tile with a
  gold ring + "EPIC" tag; bar drawn in code.
- **Mock scenarios:** `upgrade_basic` (H1 wins, upgrade flash, later wins show epic), `bar_levels` (L1 to L4 + guarantee).
- **Acceptance:** after an upgrade every later `H2` cell renders epic, including after tumble refills and reload;
  bar level == book level; spinsAdded shows exactly the book number.
