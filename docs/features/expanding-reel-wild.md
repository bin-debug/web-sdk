# expanding-reel-wild

- **Branch:** `feature/expanding-reel-wild` · **Needs:** multiplier-wilds · **Shells:** 4
- **Player view (10-spin bonus):** a wild character lands only on reels 2-4 and expands into a full-reel wild
  that stays for the bonus. Each spin a random character pops up on each expanded reel and shows a multiplier
  that RE-ROLLS every spin (small 2-4, medium 5-20, large 25-200). Multipliers on a shared line add together.
- **Events:** `expandingWildReel { reel, mult, who? }` once on expansion (mult = first roll) and again every spin
  with the new `mult` for that reel. `who` = character id for the tier look (display only).
- **Build:** `features/wilds/ExpandingReelWild.svelte`: expansion animation (600 ms), a persistent reel overlay,
  character pop-up + number tween each spin, state in the snapshot.
- **Art slots:** `W` + `W.win`, mascot clips; a character still per tier (re-use `MW1`-`MW3` as a stand-in). Fallback: code overlay.
- **Mock scenarios:** `expwild_bonus` (reels 2 and 4 expand, re-roll for 10 spins), `expwild_adjacent` (shared line adds).
- **Shipped as:** `expandState.svelte.ts` + `ExpandedReels.svelte`; the first event per reel expands, later ones re-roll. Test books: lines_classic 324 (`expwild_bonus`) and 325 (`expwild_adjacent`).
- **Acceptance:** overlay stays until the bonus ends; shown multiplier == latest event per reel; reload restores it.
