# Teardown: Hacksaw "Wicked Grin" (studied 2026-10-04, Stake demo, v1.43.1)

**Purpose:** learn the *structure*: layout, mechanics, pacing, book events. Nothing here may be
reused as assets, names or characters. Our build of this structure is `apps/coin-reel`
(original theme, placeholder art) and must stay visually distinct.

Source facts: Stake game page (RTP 96.27%, max 10,000×, 5×5, pays 6+ anywhere, cascading,
volatility switch, bonus buy) and playing the demo.

## 1. Screen layout (desktop 16:9)

| Element | Position / size | Notes |
|---|---|---|
| Board | centred-right, ~45% of width, ~80% of height, 5×5 square cells | dark rounded cells with a subtle bevel; thin metal frame with small red arrow markers on each row edge |
| **Trigger row** | bottom row of the board | tinted red glow; special symbols only act when they land here |
| Logo | top-left, ~25% width | chunky white outlined type |
| Mascot | left of board, full-body, ~55% height | idle pose, changes pose (points at board) during wins/collects |
| Buy-bonus button | round yellow coin, bottom-left under mascot | |
| Bar | thin dark strip under the board: menu, balance, (win), bet with up/down, big round spin, autoplay | in bonus: bet/spin replaced by TOTAL WIN + FREE SPINS counters |
| Background | base: concentric dark rings (tunnel); bonus: checkerboard floor | monochrome base so coloured symbols pop |

Intro screen: logo, volatility meter, three feature cards (icon + red ribbon title + 2-line text),
"click to continue". Bonus intro: theatre curtains, title, spins won, rules paragraph, click to continue.
Transitions: film-grain / TV static wipe.

## 2. Symbols

- Low: 4 card suits drawn as flat white/grey icons (very low contrast on purpose).
- High: fruit-machine icons in full colour (grapes, watermelon, bell, cherries, seven).
- Specials: grin coin (normal + "epic"), FS coin, Super FS coin (appear as round medallions).
- Coins revealed by expansion: bronze 1–4×, silver 5–9×, gold 10–50×, diamond 100–500×, plus
  plain multiplier coins 2–20×.

## 3. Mechanics and their book events (what our maths/books must emit)

| Step | Visual | Book event (our naming) |
|---|---|---|
| Spin | symbols drop in from above, column by column; no spinning strip | `reveal` (cascading engine) |
| Scatter pay 6+ | winners scale up and burst; amount in board centre | `winInfo` (scatter style) |
| Tumble | winners removed, survivors fall, new symbols fall in | `tumbleBoard`, `updateTumbleWin` |
| Coin expand | special on trigger row grows up the whole reel; every cell on that reel becomes a coin with a value | `coinReelExpand {reel, kind, coins:[{row, tier, value}]}` |
| Coin collect | screen dims, coins pulse, values summed and paid | `coinReelCollect {reel, total, multiplier}` |
| FS expand | FS special on trigger row grows up the reel; each covered cell is worth spins | `freeSpinReelExpand {reel, cells:[{row, spins}]}`, then `freeSpinTrigger` |
| Stash (bonus A) | box above each reel, starts ×1, +1 each time that reel's coin expands; multiplies that reel's coin values | `stashUpdate {reel, multiplier}` |
| Collector (bonus B) | box above each reel keeps all coin values until the end | `collectorUpdate {reel, total}` |
| Bonus end | outro with total | `freeSpinEnd` |

## 4. Bonus buy / modes (structure we copy into our RGS modes)

| Card | Type | Cost (× bet) | Our mode |
|---|---|---|---|
| Boost: 5× bonus chance | activate (per spin) | 3× | `BOOST` |
| Boost: guaranteed coin special each spin | activate | 50× | `COINSPIN` |
| Bonus A (stash) | buy | 80× | `BONUS` |
| Bonus B (collector) | buy | 200× | `SUPER` |

Buy flow: card grid, one bet selector on top, confirm dialog ("will be subtracted from your balance").

## 5. Timing (eyeballed from the demo)

- Spin to fully landed: ~0.8 s (drop-in, columns staggered ~60 ms).
- Win burst + amount: ~0.9 s per tumble step; tumble refill ~0.4 s.
- Coin expand: ~0.6 s grow, coin reveal ~0.6 s, collect ~1.2 s with dim + mascot pose.
- Bonus intro: static wipe ~1 s then click-to-continue panel.

## 6. What we take, what we change

Take: 5×5 pays-anywhere tumble, trigger row, expanding coin reel with tiered coins, per-reel
stash/collector boxes, four-card buy menu, monochrome base with colourful symbols, mascot reacting.
Change (must): theme, mascot, symbol art, coin art, names, sounds, colours of the trigger row,
background, intro copy.
