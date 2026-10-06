# Game Shells: build once, ship games as art + sound

**Audience:** agents (Sonnet/Opus) building the shells. Read `docs/HANDOFF.md` and
`docs/STUDIO-KIT-PLAN.md` first; this file narrows that plan into a concrete build order.
**Reference teardown:** the "Hacksaw-Style Slot Teardown" doc (Le Vampire, Le Catcher, Le Digger,
Le Bandit Hold & Win, Le Sortudo, Wicked Grin, Dork Show), with measured layouts, rules and timings.
**Written:** 2026-10-06. **Last checked:** 2026-10-06 (phases 1–3 done).

---

## 1. What a "shell" is

A shell is a **fully playable game with demo art**. To make a real game you pick a shell, fill in a
spec, and drop in art and sound. No code changes.

```
order  ->  game.spec.json  +  art/ (Artlist output)  +  audio/  +  books
           (board, spin style,   (named slots, any     (named      (synthetic now,
            symbols, features,    missing slot falls    slots)      math-sdk later)
            bonuses, layout)      back to code art)
```

The owner's request format, e.g. *"6×5 board, drop spin, 4 low + 4 high symbols, 2 bonus symbols,
golden squares + coins + hold & win, mascot on the right"*, maps 1:1 to spec fields (section 4).

### The one rule that makes shells work

**Every visual and every sound is a named slot with a code fallback.** No component may reference a
template file directly. If `art/symbols/H1.png` is missing, the game draws a coloured tile with
"H1" on it. If `art/mascot/idle.webm` is missing, a coloured silhouette bobs. The shell must play
end to end with an **empty** `art/` folder.

Why: in coin-reel every template asset that was not explicitly replaced (win spines, explosion,
tumble banner, free-spin intro, loader, audio) leaked old art into the "new" game, and it took
three feedback rounds to find them all (HANDOFF session log, 2026-10-05). Slots + fallbacks make
leaks impossible: there is nothing old to leak.

---

## 2. Architecture

One engine app, not one app per game type.

| Piece | Where | Job |
|---|---|---|
| `apps/shell` | new | The only game app. Reads `game.spec.json` at build time, renders board, symbols, mascot, UI, features from it. A game = a folder `games/<gameId>/` with spec, art, audio. Build: `pnpm build:game <gameId>`. |
| `packages/kit-board` | new (plan Phase 1) | Board topologies + geometry: grid N×M, jagged. Cell centres, masks, padding rows. |
| `packages/kit-symbols` | new | One `Symbol` component. States `static, spin, land, win, postWin, explode, upgrade` from art slots → fallback juice (bounce, pulse, shine, squash). |
| `packages/kit-reveal` | new | The two spin styles: `spin` (reel strips, L→R stops, bounce, slam) and `drop` (column-staggered gravity drop with squash; coin-reel's version). Plus `respin` (Hold & Win: only unlocked cells spin). |
| `packages/kit-mechanics` | new | One module per feature (section 5): book event types + handler fragment + components + synthetic-book generator + story. |
| `packages/kit-fx` | new | Win tiers, count-up, screen shake, flash, particles, transitions, bonus intro/outro panels (all code-drawn by default, art slot optional). |
| `packages/kit-layout` | new | Layout presets from the teardown: board centred, logo above, mascot beside on the bar (left/right), feature widget on the opposite side; portrait stacks widgets above the board and the mascot below. |
| `packages/kit-ui` | promote `apps/coin-reel/src/components/HacksawBar.svelte` | Our own control bar ("own twist" goes here), menu, info/paytable generated from the spec, buy menu cards from `bonuses[]`/`boosts[]`. Keeps `--bc-*` colour theming and all jurisdiction flags. |
| `tools/book-gen` | extend | Synthetic books for any spec: valid boards + every enabled feature's events + forced scenarios. |
| `tools/mock-rgs` | exists | Serves books, forced outcomes via `/mock/queue`. |
| `tools/art-gen` | new | Reads the spec, lists missing art slots, generates them through the Artlist MCP with the slot's prompt recipe, keys/crops, writes them into `games/<gameId>/art/`. |

Start each package by **extracting** working code from the templates/coin-reel (Appendix A of
STUDIO-KIT-PLAN), not rewriting.

---

## 3. Art and sound slot contract

Fixed names and sizes so Artlist output drops straight in. Masters are bigger; the build resizes.

| Slot | File | Master size | Fallback |
|---|---|---|---|
| Background base / bonus | `art/bg/base_16x9.png`, `base_9x16.png`, `bonus_*.png` (or `.webm` loop) | 1920×1080 / 1080×1920 | Gradient in the spec's palette |
| Board frame | `art/board/frame.png` (9-slice, insets in spec) | per board | Rounded rect stroke |
| Cell tile / highlight tile / dim | `art/board/cell.png`, `cell_gold.png` | 256×256 | Flat rounded square; gold tint |
| Logo | `art/logo.png` | 1200×400 transparent | Game name in display font |
| Mascot | `art/mascot/idle.png` (+ optional `idle.webm`, `react.webm`, `bigwin.webm`, `throw.webm`) | 1024×1024 transparent | Silhouette + code idle/react |
| Symbols | `art/symbols/<NAME>.png`, optional `<NAME>_win.webm`, `<NAME>_land.webm` | 512×512 transparent | Coloured tile + name, juice presets |
| Feature symbols | `art/features/<id>/*.png` (coins by tier, clover green/gold, collector, pot, rainbow, jackpot markers, gift boxes, dynamite, FS scatter) | 512×512 | Code-drawn coin/badge with value text |
| Widgets | `art/widgets/jackpot_<tier>.png`, `symbol_bar.png`, `bonus_hunt_sign.png` | per widget | Code-drawn pill/bar |
| Splash cards | `art/splash/card_<n>.png` + copy in spec | 600×800 | Code card with title/body |
| Win tiers | `art/fx/bigwin_<tier>.webm` (optional) | 16:9 | Code scene: tier word + count-up + particles |
| Audio | `audio/base.mp3`, `bonus.mp3`, `sfx/<event>.mp3` (spin_start, reel_stop, land_<sym>, win_small…, bonus_trigger, coin_collect, …) | — | Silence, or a shared demo SFX pack |

Symbol names are generic and positional: `L1..L6`, `H1..H6`, `W`, `S`, plus feature ids. The
spec gives each a display name for the paytable.

---

## 4. The spec (what the owner chooses)

```jsonc
{
  "gameId": "neon_heist",
  "name": "Neon Heist",
  "shell": "cluster-squares",            // section 6
  "board": { "reels": 6, "rows": 5, "cell": 124, "gap": 4 },
  "reveal": "drop",                      // spin | drop | respin
  "pays": { "type": "cluster", "min": 5 },  // lines(n) | ways | cluster | scatter
  "symbols": { "low": 4, "high": 4, "epicVariants": true, "wild": true },
  "features": ["tumble", "goldenSquares", "rainbowReveal", "coins", "clovers", "collectors"],
  "bonuses": [
    { "id": "BONUS",  "name": "Night Shift",  "trigger": "3 S", "spins": 10, "adds": ["persistSquares", "symbolBar"] },
    { "id": "BONUS2", "name": "Vault Run",     "trigger": "4 S", "spins": 10, "adds": ["squaresStay"] },
    { "id": "BONUS3", "name": "Hidden Heist",  "trigger": "5 S", "spins": 10, "adds": ["revealEverySpin"], "hidden": true }
  ],
  "boosts": [ { "id": "HUNT", "name": "Hot Streak", "cost": 3 } ],
  "buys":  [ { "mode": "BONUS", "cost": 100 }, { "mode": "BONUS2", "cost": 200 } ],
  "layout": { "preset": "board-hero", "mascotSide": "right", "widget": "bonusHuntSign" },
  "ui": { "accent": "#F5C400", "bar": "kit" },
  "palette": ["#1b1030", "#e0245e", "#ffd23f"],
  "artStyle": "thick-outline cel-shaded cartoon, saturated, dark background"
}
```

`tools/spec-check` validates it in plain English ("feature `collectors` needs `coins`").

---

## 5. Feature library (prebuilt modules)

Our own names; never Hacksaw's (FeatureSpins, BonusHunt, etc. are their marks). Each module ships
with book events, choreography, a synthetic generator and a story. "Seen in" = the teardown game
the behaviour reproduces.

| Module | Seen in | Book events (contract for math-sdk) | Start from |
|---|---|---|---|
| `lines` / `ways` / `scatterPays` / `clusterPays` | all | `reveal`, `winInfo` | `lines`, `ways`, `scatter`, `cluster` |
| `tumble` (+ `superTumble`: remove every symbol of a winning type) | Vampire, Catcher | `tumbleBoard {explodingSymbols, newSymbols}` | `scatter`/`cluster` |
| `goldenSquares` (win cells leave a marked tile; persist modes) | Vampire, Catcher | `squaresAdd {positions}`, `squaresClear` | cluster `MultiplierGrid` pattern |
| `rainbowReveal` (trigger symbol turns squares into specials) | Vampire, Catcher | `squaresReveal {cells:[{pos, kind, value}]}` | new |
| `coins` (Bronze/Silver/Gold/Diamond, values) | all Le games | inside `squaresReveal` / `reveal` meta | coin-reel coins |
| `clovers` (adjacent / global multiplier) | Le games | `cloverApply {pos, scope, mult, targets[]}` | new |
| `collectors` (3×3 local, global) | Le games | `collect {collector, sources[], total}` | coin-reel collect |
| `layers` + `dynamite` (grid layers, blasts, chain) | Digger | `layerBreak {positions}`, `dynamite {targets[], chain[]}` | new |
| `holdAndWin` (3 lives, sticky specials, full-grid) | Bandit, Sortudo | `holdStart`, `respin {new[], lives}`, `holdEnd {total}` | `price` superspin |
| `jackpotLadder` (Mini/Major/Mega/Grand) | Bandit, Sortudo | `jackpotWin {tier}` | new widget |
| `bottomRowExpand` (coin reel / FS reel from trigger row) | Wicked Grin | `expandReel {reel, kind, cells[]}` | coin-reel |
| `reelStash` (per-reel multiplier or bank) | Wicked Grin | `stashUpdate {reel, value}` | coin-reel |
| `multiplierWilds` (gift-box style: visible / hidden tiers, additive) | Dork Show | `wildMults {positions, values, hidden}` | `lines` wilds |
| `stickyWilds` / `expandingReelWild` (multiplier re-rolls each spin) | Dork Show | `addStickyWilds`, `expandingWildReel {reel, mult}` | `price` |
| `symbolUpgrade` (high → epic variant for the bonus) + `symbolBar` (levels, +spins) | Vampire, Catcher | `upgradeSymbol {symbol}`, `barLevel {level, spinsAdded}` | new |
| `refillRespins` (respins reset when something lands) | Dork Show, Bandit | `respinCounter {remaining}` | `holdAndWin` |
| `tieredBonuses` (3/4/5 scatters → 3 bonuses, last one hidden) | all | `freeSpinTrigger {bonusType, spins}` | templates |
| `boost` (paid mode, raises bonus odds) + `featureSpins` (paid guaranteed-feature spin) | all | RGS bet modes | coin-reel `betModes.ts` |
| `buyMenu` (cards from spec, volatility, price) | all | RGS bet modes | coin-reel 4-card menu |
| `winTiers`, `anticipation`, `maxWin` | all | `winInfo`, `reveal.anticipation`, `wincap` | templates |

Gamble (the Digger "bonus gamble") is out: stateless books can't do it.

---

## 6. Shell catalogue (build order)

| # | Shell id | Board | Reveal | Built-in features | Reference | Maths |
|---|---|---|---|---|---|---|
| 1 | `cluster-squares` | 6×5 | drop | tumble, goldenSquares, rainbowReveal, coins, clovers, collectors, 3 tiered bonuses, symbolUpgrade/Bar, boost, buy | Le Vampire / Le Catcher | synthetic → `0_0_cluster` |
| 2 | `hold-and-win` | 3×3 (any N×M) | spin + respin | 9 lines, coins, jackpotLadder, holdAndWin, clovers, pot collector, 2 H&W modes | Le Bandit / Le Sortudo | `hold_and_win` |
| 3 | `trigger-row` | 5×5 | drop | scatterPays, tumble, bottomRowExpand, coins, reelStash, 2 bonuses | Wicked Grin (= coin-reel) | synthetic |
| 4 | `lines-wilds` | 5×4 | spin | 16 lines, multiplierWilds, stickyWilds, expandingReelWild, refillRespins | Dork Show | `0_0_lines`, `0_0_expwilds` |
| 5 | `lines-classic` | 5×3 | spin | lines, wilds, scatter FS, global mult | `lines` template | `0_0_lines` |
| 6 | `ways-classic` | 5×3 | spin | 243 ways, FS | `ways` template | `0_0_ways` |
| 7 | `scatter-tumble` | 6×5 | drop | pay-anywhere 8+, multiplier symbols | `scatter` template | `0_0_scatter` |
| 8 | `cluster-classic` | 7×7 | drop | cluster, cell multiplier grid | `cluster` template (current production games) | `cluster_967_low` |
| 9 | `layers-dynamite` | 6×5 | drop | layers, dynamite, coins, collectors | Le Digger | synthetic |

Shells 5–8 are cheap (the templates already work); they mainly prove the slot/fallback system.
Shells 1–4 carry the Hacksaw-grade feel.

---

## 7. Demo art (Artlist)

One **shared demo art library** generated once and used by every shell, so shells look and move
like a real game. Real games later replace it slot by slot. **Full spec: `docs/DEMO-ART-SPEC.md`**
(decided 2026-10-06: "Rusty" the fox treasure hunter with 6 animated clips; treasure & gems
symbols L1–L6, H1–H6, E1–E4; every bonus/feature symbol; 27 clips; about 8,500 credits one-off).

- `tools/art-gen` stores each slot's prompt recipe so a real game's art is generated the same way:
  `art-gen neon_heist --missing` fills only what's absent.

---

## 7b. Game Builder (the owner's UI)

A web app where the owner defines a game, builds it and plays it, all in one place.

| Area | What it does |
|---|---|
| **New game form** | Name, shell (or "custom"), board reels × rows, reveal style (spin / drop / respin), pays (lines n / ways / cluster min / scatter min), number of low, high and bonus symbols, feature checkboxes (section 5; invalid combos greyed out with the reason), bonuses (trigger, spins, buy price), boosts, layout (mascot side, widget), accent colour. Writes `games/<gameId>/game.spec.json`. |
| **Art panel** | Every art and sound slot the spec needs, shown as a grid of thumbnails: demo art by default, a badge where a slot uses a code fallback. Drag a file onto a slot to replace it, or "Generate with Artlist" per slot / "Generate all missing" (runs `tools/art-gen`). |
| **Build** | "Build & Play" runs spec-check → build → starts the shell against the mock RGS; streams the log. |
| **Play** | The game in an iframe with device toggles (desktop 1600×900, phone 375×812, tablet), plus **scenario buttons** that queue books: base win, tumble chain, bonus 1/2/3, hold & win, jackpot, max win, retrigger. |
| **Export** | Production build zip for Stake Engine; later, the "Release games" workflow. |

**Status (2026-10-06):** built. UI `apps/game-builder` (port 3230), server `tools/builder-server` (3231), games on 3240+.
- [x] New game form (shell radio list, board, reveal, pays, symbols, features with greyed reasons, bonuses with buys, boosts, layout, colours, art style) with live spec-check; writes `games/<id>/game.spec.json`.
- [x] Build & Play (spec-check, book-gen for that game, start demo RGS 5119, start a shell dev server on its own port, streamed log); iframe with desktop/tablet/phone toggles; Copy phone link per game.
- [x] Scenario buttons: base win, big win, tumble chain, bonus 1/2/3, retrigger, max win (queue synthetic books). Hold and win and jackpot are greyed (features not built).
- [x] Art panel: every slot with thumbnail/video/audio, source badge (game / demo / code fallback), drag-and-drop or Replace (writes `games/<id>/art/uploads/` + `art/manifest.json`), Revert.
- [ ] "Generate with Artlist" per slot and "Generate all missing" only QUEUE requests (`games/<id>/art-requests.json`, with prompts from the spec's art style). `tools/art-gen` does not exist yet; an agent session with the Artlist tools must run the queue and drop results through the Replace path.
- [x] Export: `vite build` of the shell with only this game, demo + game art added, zip (served by the builder server). RGS url is never baked in.
- Only verified shells are selectable (`tools/builder-server/shells.json`).

Tech: `apps/game-builder` (SvelteKit, HTML only) + `tools/builder-server` (Node: writes specs,
runs builds, manages mock-RGS queues, proxies Artlist generation). Runs locally first; it can
later move into the backoffice console.

---

## 8. Phases (agent-sized; each ends with mock-RGS play + desktop and 375×812 screenshots)

1. [x] **Slot system + fallbacks.** `kit-symbols`, art/audio slot loader, code fallbacks. *Accept:*
   `lines` plays with an empty `art/` folder; then with demo art; zero template assets loaded
   (network log check).
2. [x] **`apps/shell` + spec + `kit-layout` + `kit-ui`.** Spec drives board size, reveal style, layout
   preset, bar, info/paytable, buy menu. *Accept:* specs for lines/ways/scatter/cluster reproduce
   shells 5–8.
3. [x] **Demo art library**: run `docs/DEMO-ART-SPEC.md` (can run in parallel with phases 1–2;
   only needs the Artlist MCP) + `tools/art-gen`. *Accept:* shells 5–8 render with it.
3b. [x] **Game Builder v1** (built 2026-10-06; see 7b status) (section 7b): form → spec → build → play with scenario buttons, for the
   shells that exist so far. Grows as each shell lands.
4. **Shell 1 `cluster-squares`** feature by feature (tumble → squares → reveal → coins → clovers →
   collectors → bonuses → upgrade/bar → boost/buy), each with book-gen scenarios.
5. **Shell 2 `hold-and-win`** (+ jackpot ladder).
6. **Shell 3 `trigger-row`**: port coin-reel onto the kit.
7. **Shell 4 `lines-wilds`**, then **Shell 9 `layers-dynamite`**.
8. **Order flow:** `create-slot-game` skill accepts the owner's sentence → writes the spec →
   `art-gen --missing` → builds → starts mock RGS + Vite → returns the Tailscale link.
9. **Real maths** per shell in math-sdk using section 5's events; register books; release via the
   "Release games" workflow.

Realistic pace: phases 1–3 are the foundation (largest step); after that each new shell is mostly
one feature module at a time, and each new *game* on an existing shell is spec + art + sound only.

---

## 9. Rules

- Work in this worktree (`studio-kit` branch). Don't touch `C:\source\web-sdk`.
- No template asset may be referenced by a shell; fallbacks are code.
- Our own names, characters and art only; no competitor trademarks (section 5 note).
- Kit bar is allowed for shells/new games (owner approval 2026-10-04); production client games
  keep the shared bar (colours + radius only).
- Never bake localhost/Tailscale RGS URLs into release builds.
- Update `docs/HANDOFF.md` every session.
