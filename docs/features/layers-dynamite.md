# layers-dynamite

- **Branch:** `feature/layers-dynamite` · **Needs:** coins, collectors, tumble (and clovers if used) · **Shells:** 9
- **Player view:** the board sits on 3 layers of slab. Each removal (a win or a blast) peels one layer under
  that cell: layers 1 and 2 hold normal symbols, layer 3 is gold and reveals specials once the grid settles.
  After the grid settles the mascot may throw 1-5 dynamite sticks; each blasts a 2x2 area and peels a layer.
  Hitting a wild dynamite causes a 3x3 chain explosion. Resolve order: clovers, collectors (top-to-bottom,
  left-to-right); new reveals repeat the loop.
- **Events:** `layerBreak { positions, layer }` (the layer that was just exposed, 1-3), `dynamite { throws, chain? }`
  (`throws[].area` = cells hit, `chain` = extra blasts caused by wild dynamite), `layerReveal { cells }`
  (layer-3 specials, `coin` shape). Collectors/clovers use their own events.
- **Build:** `features/layers/`: `LayerGrid` (slab tile per cell with a layer number from the book state;
  the client tracks the layer count per cell from `layerBreak` events only), crack animation (code: crack lines +
  `fx.poof` + debris), `DynamiteThrow` (arc from the mascot to the target, fuse 300 ms, burst + shake), chain handling,
  `layerReveal` using `coins.flipIn`. Snapshot restores layer counts.
- **Timing:** 500-700 ms per blast; crack 250 ms; arc 400 ms; screen shake 200 ms (off in turbo).
- **Art slots:** `T1` `T2` `T3` (tiles), `DW` + `DW.explode`, `fx.poof`, mascot `throw` clip. Fallback: coloured slabs
  (sand/rock/gold) with crack lines; code-drawn stick + circle burst.
- **Mock scenarios:** `layers_basic` (win peels, layer 2 shown), `dynamite_single`, `dynamite_chain` (wild dynamite 3x3),
  `layers_reveal` (layer 3 specials then collector), `layers_full` (all three layers gone).
- **Acceptance:** a cell's slab shows the layer the book says after every event; blast areas equal `area`; chain runs in
  the book order; reload restores layers; turbo ends identical.
- **Out of scope:** the gamble (stateless books can't do it); dynamite collector bonus variants (later).
