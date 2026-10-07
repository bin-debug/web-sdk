# Wiring a shell (one session per shell, AFTER its features are merged)

A shell session adds NO new feature code. It makes a shell id selectable and playable.

| Shell | Branch | Features it needs (all merged first) | Default spec highlights |
|---|---|---|---|
| 1 `cluster-squares` | `shell/cluster-squares` | tumble-super, golden-squares, rainbow-reveal, persist-squares, coins, clovers, collectors, symbol-upgrade-bar, tiered-bonuses-boost | 6x5 drop, cluster min 5, 3 bonuses, boost + buys, mascot right |
| 2 `hold-and-win` | `shell/hold-and-win` | coins, clovers, collectors (pot), hold-and-win, jackpot-ladder | 3x3 spin, 9 lines, 2 H&W modes, 4 jackpots |
| 3 `trigger-row` | `shell/trigger-row` | coins, collectors, bottom-row-expand, reel-stash, tiered-bonuses-boost | 5x5 drop, scatter pays, 2 bonuses (multiply, bank) |
| 4 `lines-wilds` | `shell/lines-wilds` | multiplier-wilds, sticky-wilds, expanding-reel-wild, refill-respins, tiered-bonuses-boost | 5x4 spin, 16 lines, gift-box bonus + 10-spin expanding bonus |
| 9 `layers-dynamite` | `shell/layers-dynamite` | coins, clovers, collectors, tumble-super, layers-dynamite, tiered-bonuses-boost | 6x5 drop, 3 layers, 3 bonuses |

Steps:
1. Add the shell to `packages/kit-spec` (shell id, allowed features, default board/reveal/pays).
2. Add `games/<shell-id>-demo/game.spec.json` (a full demo spec) and run spec-check.
3. `tools/book-gen/shell.mjs`: make the shell's generator compose the feature generators
   (`tools/book-gen/features/*.mjs`) into base, every bonus, buys, boost and max win. Then run
   `check-contract` on every book.
4. Layout rule (mobile portrait): the mascot is at the BOTTOM, below the board and above the bet bar, on the
   side set by `layout.mascotSide`; the boost/bonus widget is in the opposite bottom corner; the board is
   never covered. Desktop: mascot beside the board. Apply it in `kit-layout` once (first shell session
   that finds it missing), not per shell.
5. Flip the shell to `implemented: true, verified: true` in `tools/builder-server/shells.json` only after
   the whole-shell check: base, every bonus, bought bonus, boost, max win, reload mid-bonus, `?art=none`,
   desktop 1600x900 and phone 375x812, zero console errors.
6. Tick SHELL-PLAN section 8, update STATUS.md, open the PR, merge.

Shell definition of done = the README definition of done, for the whole shell.
