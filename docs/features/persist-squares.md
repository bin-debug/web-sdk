# persist-squares (+ squaresStay, revealEverySpin)

- **Branch:** `feature/persist-squares` · **Needs:** golden-squares, rainbow-reveal · **Shells:** 1 (bonuses)
- **Player view (bonus rules, set per bonus in the game spec `bonuses[].adds`):**
  - `persistSquares`: squares stay until a rainbow fires, across spins.
  - `squaresStay`: squares stay for the whole bonus even after a rainbow fires.
  - `revealEverySpin`: a rainbow (or epic rainbow) fires every spin; every coin is at least 1x (the book enforces the value).
- **Events:** no new ones. The book simply does not emit `squaresClear` at spin end, and emits a
  `squaresReveal` each spin. The client must NOT clear squares between spins when the bonus says persist.
- **Build:** a per-bonus flag from the spec read by `squaresState`: `clearOnSpinEnd` is true in base,
  false when `persistSquares`/`squaresStay` is on. The snapshot restores the set.
- **Art / timing:** none new.
- **Mock scenarios:** `bonus_persist` (10 spins, squares accumulate, one rainbow clears), `bonus_stay`, `bonus_every_spin`.
- **Acceptance:** squares are visible across spin boundaries per mode; a reload mid-bonus restores the exact set.
