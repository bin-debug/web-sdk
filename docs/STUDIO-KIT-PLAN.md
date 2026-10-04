# Studio Kit: plan for Hacksaw/Paperclip-grade slots on the web-sdk

**Audience:** AI agents and developers who will build games from this repo. Read it top to bottom
once; afterwards use the catalogues (sections 5–8) as a menu.
**Branch:** `studio-kit` (worktree `C:\source\_studio-kit\web-sdk`, cut from `dev` @ 8a0a4b7).
**Status:** Phase 0 done and verified locally (mock RGS, video→sprite tool, sprite-sheet symbols).
Phases 1–7 are the plan.
**Last checked against the code:** 2026-10-04.

---

## 0. The goal in one paragraph

Today every game is a copy of one of five template apps, re-skinned by swapping a fixed 5×2 symbol
sheet and a few images. That gets cluster games out fast, but every game looks and plays alike, and
nothing can animate without Spine. The goal is a **Studio Kit**: one engine where a game is
*data* (a spec), *art* (stills + short videos), and *books* (maths), so a request like
**"5×5 board, expanding symbol in free spins, gritty western, mascot on the left"** becomes a
playable build the same day. The look and feel to hit is Hacksaw Gaming and Paperclip Gaming:
bold art, a big board, punchy animation, and a deep feature menu.

---

## 1. How the SDK works today (what an agent must know first)

### 1.1 Monorepo

- `apps/<game>`: one SvelteKit + PixiJS 8 app per game. **Templates:** `lines`, `ways`,
  `scatter`, `cluster`, `price`. All other apps are re-themed cluster games (first production wave).
- `packages/*`: shared code. The ones that matter:

| Package | What it gives you |
|---|---|
| `pixi-svelte` | Declarative Pixi: `App`, `Container`, `Sprite`, `SpriteSheet`, `AnimatedSprite`, `SpineProvider`/`SpineTrack`, `BitmapText`, `ParticleEmitter`, `Graphics`. **Consumed from `dist/`: run `pnpm run build --filter=pixi-svelte` after editing it.** |
| `utils-slots` | Reel engines: `createReelForSpinning` (classic strip spin, bounce, anticipation, slam stop) and `createReelForCascading` (symbols fall in/out). `createEnhanceBoard` spins all reels from a `reveal` book event. |
| `utils-book` | `createPlayBookUtils`: plays `book.events` one after another through a `bookEventHandlerMap`. |
| `utils-event-emitter` | `broadcast` / `broadcastAsync` / `subscribeOnMount`: the glue between book events and components. |
| `utils-layout` | `createLayout`: layout types `desktop`/`tablet`/`landscape`/`portrait`, `mainLayout()` scaling, background fitting. |
| `utils-xstate` | Bet lifecycle state machines: play → book → end-round, autoplay, resume, replay. |
| `state-shared` | `stateBet`, `stateConfig` (bet levels, jurisdiction), `stateUrl` (`sessionID`, `game_id`, `rgs_url`, …), `stateMeta` (bet-mode cards), promos. |
| `components-ui-html` | **Shared `BettingBar.svelte`** (on `dev`), modals (buy bonus, free-spin award), promo layer. Operators theme the bar via `--bc-*` CSS variables from the backoffice. |
| `components-ui-pixi` | Older Pixi UI (buttons/labels/layouts) still used by the templates. |
| `rgs-requests` / `rgs-fetcher` | `/wallet/authenticate`, `/wallet/play`, `/wallet/end-round`, `/bet/event`, `/bet/replay/...`. |
| `pixi-filters` (dep) | Glow, bloom, outline, shockwave, godrays, displacement, etc. Available, mostly unused. |

### 1.2 Inside a game app

```
src/game/
  config.ts            maths metadata (symbols, paytable, betModes, paddingReels) exported from math-sdk
  constants.ts         SYMBOL_SIZE, INITIAL_BOARD (defines board dimensions), SYMBOL_INFO_MAP, spin speeds
  assets.ts            every texture/spine/font/audio, loaded by key
  typesBookEvent.ts    the book events this game understands
  bookEventHandlerMap.ts  book event -> sequence of emitter events (the game's "director")
  stateGame.svelte.ts  board (array of reels), game type, feature state
  stateLayout.ts       main sizes per layout type
src/components/        Board, Symbol, ReelSymbol, BoardFrame, Background, Win, FreeSpinIntro/Outro/Counter,
                       Transition, Anticipation, plus feature components (TumbleBoard, MultiplierGrid,
                       ExpandingWilds, StickyBoard, ...)
src/stories/data/      sample books per mode (*_books.ts) and one sample of each event (*_events.ts)
static/assets/         art, spines, fonts, audio (served at /assets/...)
```

**The flow:** RGS returns a book → `playBookEvents` walks `book.events` → each
`bookEventHandlerMap[event.type]` broadcasts small emitter events (`boardShow`,
`tumbleBoardExplode`, `winUpdate`, …) → components subscribed with `subscribeOnMount` animate and
resolve. To add a feature: add the book event type, write its handler as a choreography of emitter
events, write/extend the components that handle those emitter events, add a story.

**Symbols:** `SYMBOL_INFO_MAP[symbol][state]` picks what to draw for each state
(`static`, `spin`, `land`, `win`, `postWinStatic`, `explosion`). Each entry is
`{ type: 'sprite' | 'spine' | 'spriteSheet', assetKey, sizeRatios, animationName?, fps? }`.
`spriteSheet` support is new (Phase 0; `lines` only so far).

### 1.3 What the five templates teach

| Template | Board | Reel engine | Pays | Features shown |
|---|---|---|---|---|
| `lines` | 5×3 | spinning | paylines | wilds with multipliers, scatter → free spins, global multiplier |
| `ways` | 5×3 | spinning | 243 ways | same as lines minus global multiplier |
| `scatter` | 6×5 | cascading | pay-anywhere (8+) | tumble, multiplier symbols board, global multiplier, tumble-win meter |
| `cluster` | 7×7 | cascading | clusters (5+) | tumble, per-cell multiplier grid (`updateGrid`), cluster win amounts |
| `price` | 5×5 | spinning | lines + prizes | expanding wilds with multipliers, sticky prize symbols (`superspin` mode), win cap |

### 1.4 The gaps this plan closes

1. **Board shape is implied, not declared.** Dimensions come from `INITIAL_BOARD`; geometry
   (`getSymbolX/Y`, `BoardMask`, `SymbolWrap`) assumes a full rectangle. No jagged reels, no
   variable rows, no expanding boards, no multiple boards.
2. **Animation means Spine.** We do not use Spine. Static PNGs look dead; there is no
   programmatic juice, no video path for symbols (until Phase 0), no video backgrounds.
3. **Copy-paste apps.** ~50 components duplicated per app (24 apps). Fixes and improvements do not
   propagate; the graphify graph shows identical component clusters in every app.
4. **The art pipeline is fixed** to 10 symbols on a 5×2 sheet, cluster only.
5. **Local books are cluster only**, so non-cluster work could not be played end to end.
   (Solved in Phase 0 by the mock RGS.)
6. **Feature menu is thin** compared with Hacksaw/Paperclip (tiered bonus buys, feature spins,
   mystery/nudge/VS/collector mechanics, multi-board bonuses).

---

## 2. What "Hacksaw / Paperclip quality" means (style brief)

Use these as **inspiration only**. Never copy names, characters, logos, symbols, sound, or
trademarked feature names (for example *xWays*, *xNudge*, *xSplit*, *FeatureSpins*, *BonusHunt* are
Hacksaw marks). Invent our own names for every mechanic (section 6 suggests some).

### 2.1 Hacksaw Gaming

- **Art:** graphic-novel / comic look: thick dark outlines, flat or cel shading with hard shadows,
  high-contrast saturated symbols on dark, moody backgrounds. Themes mix cute with dark, punk,
  horror, westerns, heists. Characters have attitude (the mascot *is* the brand of each game).
- **Board:** dominant, centred, usually 5×5, 5×4, 6×5 or 7×7; thin or no ornate frame; cells
  often have a subtle tile/slot shape. The board fills most of a portrait phone screen.
- **Symbols:** 4–5 premium character/object symbols that read at a glance, low symbols as stylised
  card ranks or simple icons, special symbols (wild, scatter, feature symbols) that are visually
  louder than everything else.
- **Mechanics:** high volatility, multiplier-heavy, sticky/nudging/expanding wilds, mystery reveals,
  duel/versus symbols, split symbols, collectors; usually **2–3 different bonus games** per title,
  each buyable directly, plus paid "boost" spins that raise feature odds.
- **Feel:** fast spins, hard slam-stop, chunky landings, screen shake on big moments, bold win
  tiers, very short intros. Minimal UI chrome so the art carries the screen.

### 2.2 Paperclip Gaming

- Founded 2025, Stake-exclusive, built **on Stake Engine** (same RGS contract as us). Shipped 3
  games in their first 5 months, then a broad catalogue (slots, crash, plinko/pinball "burst"
  games, merge games). Speed of production is a core advantage, and it is the one we want.
- **Layout variety per title:** 6×5 scatter-pay cascade (*Deadspin Bonanza*), a 3-4-4-4-3 reel
  shape (*Borrowed Time*), a 5×3 reel that drops symbols onto a 5×6 breakable block grid below it
  (*Minedrop*), merge mechanics (*Farm and Merge*), pinball/plinko ball games.
- **Art:** clean modern illustration, one strong idea per game, readable on mobile, stylised
  rather than ornate.
- **Lesson:** a reusable engine with many board shapes and mechanics, with each game mostly art
  plus a spec, lets you ship as often as they do.

### 2.3 Our quality bar (acceptance checklist for any new game)

- [ ] Board readable at 360 px wide portrait; symbols distinguishable in greyscale.
- [ ] Every symbol has at least: static, land (bounce), win (clip or juice), post-win.
- [ ] Wild/scatter/feature symbols have a land animation and anticipation behaviour.
- [ ] Spin start to first reel stop under 600 ms normal, 250 ms turbo; slam stop works.
- [ ] Win tiers: small (in-board), big / mega / epic / max (full-screen), each skippable.
- [ ] Bonus intro ≤ 2.5 s, skippable; outro shows total, skippable.
- [ ] 60 fps on a mid Android phone; GPU textures ≤ 150 MB; first load ≤ 8 MB before "press to
      continue".
- [ ] Works in portrait, landscape and desktop; respects all jurisdiction flags (section 9.4).

---

## 3. Target architecture: the Studio Kit

### 3.1 Principles

1. **A game = spec + art + books.** Code is only written when a *new* mechanic is invented; then
   it goes into the kit so every later game gets it.
2. **Book events are the contract.** Every mechanic is defined by the book events it needs. The
   front end never decides outcomes.
3. **Shared, not copied.** Engine pieces live in `packages/kit-*`. A game app is a thin shell
   (config, assets, overrides).
4. **Animate without Spine.** Every visual state can be a still with programmatic juice, a video
   clip turned into a sprite sheet, a video texture, layered sprites, particles or filters.
5. **Test without maths.** Synthetic books through the mock RGS prove the visuals before certified
   maths exists.

### 3.2 New packages

| Package | Responsibility | Grows out of |
|---|---|---|
| `kit-board` | Board *topology* and *geometry*: declared shape, cell centres, masks, reel lengths, mapping book positions ↔ screen; variable/expanding rows; multiple boards | `constants.ts`, `utils.ts` (`getSymbolX/Y`), `BoardMask`, `SymbolWrap` |
| `kit-symbols` | One `Symbol` renderer for `sprite`/`spriteSheet`/`video`/`layers`/`spine`; state machine; programmatic juice presets | `Symbol*.svelte` in every app |
| `kit-mechanics` | One module per mechanic: book event types, handler fragment, components, synthetic book generator, story | template features (TumbleBoard, ExpandingWilds, StickyBoard, MultiplierGrid, …) |
| `kit-fx` | Screen shake, flash, hit-stop, shine sweep, glow/bloom, particles presets, win counters, win tiers, transitions, video player | `Win`, `WinCoins`, `Transition`, `Anticipation` |
| `kit-layout` | Screen composition presets (board, logo, mascot, counters, buy button) per layout type | `stateLayout.ts`, `Game.svelte` |
| `kit-spec` | JSON schema for `game.spec.json`, loader, validation, phrasebook (natural language → spec) | `gambit-game-studio/src/pipeline/spec.ts` |

Plus one new template **`apps/kit`**: a shell that renders whatever `game.spec.json` says. The five
existing templates stay as references and regression tests.

### 3.3 The game spec (extends the studio's `GameSpec`)

```jsonc
{
  "name": "Dusty Gulch",
  "gameId": "dusty_gulch",
  "board": {
    "shape": "grid",                 // grid | jagged | megaways | hex | multi | hybrid (section 5)
    "reels": 5, "rows": 5,           // or "rows": [3,4,5,4,3] for jagged
    "cellSize": 160, "gap": 6,
    "engine": "spin",                // spin | cascade | respin | static
    "frame": "thin"                  // none | thin | ornate | image
  },
  "pays": { "type": "lines", "lines": 15 },     // lines | ways | cluster | scatter | collect
  "mechanics": [
    { "id": "expandingSymbol", "when": "freegame" },
    { "id": "stickyWild", "when": "freegame", "multiplier": "additive" }
  ],
  "bonuses": [
    { "mode": "BONUS",  "name": "Showdown Spins", "trigger": "3 S", "buyCost": 100 },
    { "mode": "BONUS2", "name": "High Noon",      "trigger": "4 S", "buyCost": 400 }
  ],
  "boosts": [ { "mode": "BOOST", "name": "Double Chance", "cost": 2 } ],
  "symbols": [
    { "name": "H1", "kind": "high", "art": "h1.png", "clips": { "win": "H1_win.mp4", "land": "juice:bounce" } },
    { "name": "W",  "kind": "wild", "art": "w.png",  "clips": { "land": "W_land.mp4", "expand": "W_expand.mp4" } },
    { "name": "S",  "kind": "scatter", "art": "s.png", "clips": { "land": "S_land.mp4", "anticipate": "juice:pulse" } }
  ],
  "look": {
    "preset": "comic-dark",          // style preset: outline weight, shadows, win-tier colours, fonts
    "layout": "board-hero",          // section 7
    "mascot": { "art": "mascot.png", "clips": { "idle": "mascot_idle.mp4", "cheer": "mascot_cheer.mp4" }, "side": "left" },
    "background": { "base": "bg_base.mp4", "bonus": "bg_bonus.mp4" }
  },
  "audio": { "base": "base.mp3", "bonus": "bonus.mp3" },
  "rgsUrl": "https://<tailscale-host>:5078"
}
```

`clips` values: a file (video → sprite sheet or video texture, chosen by size), `juice:<preset>`
(programmatic, section 8.2), or omitted (static).

---

## 4. Natural language → spec (how "give me a 5×5 with an expanding symbol" works)

An agent turns the request into a spec using this phrasebook, fills defaults, then runs the build.
Ask the user only for what cannot be defaulted: **game name, theme, which maths/book**.

| Phrase | Spec |
|---|---|
| "5×5", "6 by 5", "7x7" | `board.reels`, `board.rows` |
| "3-4-5-4-3", "diamond", "pyramid" | `board.shape: "jagged"`, `rows: [..]` |
| "megaways", "variable rows", "up to 117,649 ways" | `shape: "megaways"`, `rows: {min:2,max:7}`, `pays.type: "ways"` |
| "cluster pays", "clusters of 5" | `pays.type: "cluster"`, `engine: "cascade"` |
| "pay anywhere", "scatter pays", "8 or more" | `pays.type: "scatter"`, `engine: "cascade"` |
| "tumble", "cascade", "avalanche" | `engine: "cascade"` + mechanic `tumble` |
| "expanding symbol" (book-style) | mechanic `expandingSymbol` (special symbol chosen at bonus start, expands to fill reels) |
| "expanding wild" | mechanic `expandingWild` |
| "sticky wilds" / "walking wilds" / "nudging wilds" | `stickyWild` / `walkingWild` / `nudgeWild` |
| "mystery symbols" | `mysteryReveal` |
| "multiplier grid", "spots that multiply" | `cellMultiplierGrid` |
| "hold and win", "cash/coin respins" | `holdAndWin` (`engine: "respin"`) |
| "collector", "cash collect" | `collector` |
| "duel", "versus", "VS symbol" | `versusSymbol` |
| "split symbols" | `splitSymbol` |
| "colossal", "giant 2×2/3×3 symbols" | `giantSymbol` |
| "board grows", "unlock rows" | `expandingBoard` |
| "two/three/four boards in the bonus" | `shape: "multi"` in the bonus game type |
| "bonus buy", "3 bonuses to buy" | `bonuses[]` with `buyCost` |
| "ante", "bet boost", "double chance" | `boosts[]` |
| "Hacksaw style", "gritty", "comic" | `look.preset: "comic-dark"`, `layout: "board-hero"`, thin frame |
| "clean", "modern", "Paperclip style" | `look.preset: "clean-modern"`, `layout: "board-hero"` |

Worked example. *"Give me a 5×5 board with an expanding symbol, western theme"* →
`board {grid 5×5, spin, thin}`, `pays {lines, 19}`, `mechanics [expandingSymbol@freegame]`,
`bonuses [{BONUS, "3 S"}]`, `look {comic-dark, board-hero}`, symbols H1–H4, L1–L5, W, S. Books:
synthetic (Phase 4 generator) until maths exists; the agent reports which book events the maths
must emit (section 6 lists them per mechanic).

---

## 5. Board layout catalogue (every layout the kit must support)

Each layout is a `kit-board` topology. Geometry contract: `cells(): {reel,row,x,y,w,h,active}[]`,
`size()`, `mask()`, `toScreen(reel,row)`, `reelLength(reel)`. Book boards stay
`board[reel][row]` (with top/bottom padding rows as now); inactive cells are skipped.

| # | Layout | Spec | Engine | Where it exists today | Notes / build work |
|---|---|---|---|---|---|
| L1 | Classic 3×3 | `grid 3×3` | spin | none | small boards use bigger cells; good for "classic" and mini-games |
| L2 | 5×3 | `grid 5×3` | spin | `lines`, `ways` | baseline |
| L3 | 5×4 / 6×4 | `grid` | spin | none | change `INITIAL_BOARD` only; verify portrait scale |
| L4 | **5×5** | `grid 5×5` | spin | `price` | Hacksaw staple; lines or ways |
| L5 | **6×5** | `grid 6×5` | cascade | `scatter` | scatter pays + tumble |
| L6 | 6×6, **7×7**, 8×8 | `grid` | cascade | `cluster` (7×7) | cluster pays; >7 needs cell ≤ 100 px |
| L7 | Jagged / diamond `3-4-5-4-3`, `3-4-4-4-3`, pyramid | `jagged rows:[..]` | spin | none | per-reel length; vertical centring; mask per reel; anticipation per reel |
| L8 | Megaways-style variable rows (2–7 per reel) + optional horizontal top reel | `megaways` | spin + cascade | none | cell height = reelHeight/rows per spin; symbols squash to fit; reveal event carries row counts |
| L9 | Expanding board (rows unlock, e.g. 5×4 → 5×8) | `grid` + `expandingBoard` | spin/cascade | none | animated mask growth; book event `boardExpand {rows}` |
| L10 | Split board (two grids side by side or stacked, linked) | `multi` | spin | none | e.g. base board + mirror board, or top board feeding bottom |
| L11 | Multi-board bonus (2–4 boards) | `multi count:n` | spin | none | book reveal per board (`boardIndex`); camera zoom-out; shared or separate multipliers |
| L12 | Hold & Win / coin board | `grid` + `holdAndWin` | respin | `price` superspin (sticky prizes) | locked cells, respin counter (3 → reset), per-cell values, collect at end |
| L13 | Reel + grid hybrid (reels drop symbols into a block grid below) | `hybrid` | spin + grid | none | two topologies on screen; book events move symbols between them |
| L14 | Hex grid | `hex` | cascade | none | offset rows; cluster adjacency is 6-way (maths must agree) |
| L15 | Giant-symbol board (base 5×3 + giant 3×3 reel in middle) | `grid` + `giantSymbol` | spin | none | multi-cell sprite occupying a rect of cells |
| L16 | Single-reel / wheel bonus | `wheel` | static | none | bonus picker, multiplier wheel; book gives the segment |
| L17 | Pick-me screen | `pick` | static | none | book gives picks and reveals |
| L18 | Plinko/pinball/crash style | not a reel game | — | `math-sdk/games/crash` | separate app family; out of scope here, noted because Paperclip ships them |

Portrait rule: the board scales to ≤ 94% of the screen width; the bet bar and counters stack below;
logo above. Desktop: board centred, mascot and feature buy at the sides (section 7).

---

## 6. Mechanics catalogue

For each mechanic: our name, what the book must say, how the client plays it (emitter choreography),
which existing code to start from, and the phrase that triggers it. Event field names follow
math-sdk conventions: `reel`, `row`, positions include padding offsets as in the templates (the
`price` handlers subtract 1 from `row`; keep that rule in one place in `kit-board`).

### 6.1 Pays (how wins are formed)

| Mechanic | Book events | Client choreography | Start from |
|---|---|---|---|
| Paylines | `winInfo.wins[] {symbol, kind, win, positions, meta.lineIndex}` | draw line path (Graphics) per win, animate symbols, count up | `lines` |
| Ways | `winInfo` (positions per reel) | highlight reels left→right, animate symbols | `ways` |
| Cluster | `winInfo.wins[].meta.overlay` | outline cluster, win amount at overlay cell, explode | `cluster` |
| Scatter pays | `winInfo` | all matching symbols pulse together, amount at centre | `scatter` |
| Collect (cash values) | `collect {collector, sources[], total}` | values fly to collector, total pops | new |

### 6.2 Board dynamics

| Mechanic (our name) | Book events | Choreography | Start from |
|---|---|---|---|
| Tumble | `tumbleBoard {explodingSymbols, newSymbols}`, `updateTumbleWin` | explode → remove → slide down → fall in → settle | `scatter`, `cluster` |
| Expanding wild | `newExpandingWilds {reel,row,mult}`, `updateExpandingWilds` | wild grows to full reel, multiplier badge, idles | `price` |
| **Expanding symbol** (book-style special symbol in free spins) | `selectSpecialSymbol {symbol}` at bonus start, `expandSymbols {symbol, reels[]}` after reveal, `winInfo` with `meta.expanded` | pick animation (cards flip), after landing the chosen symbol stretches up/down to fill its reels, then pays on any reels | new; reuse ExpandingWilds pattern |
| Sticky wild | `addStickyWilds {positions}`, `clearSticky` | land → lock badge; stays across spins (render on overlay layer above reels) | `price` StickyBoard |
| Walking wild | `moveStickyWilds {from,to}[]` | sticky layer tweens one cell per spin | StickyBoard |
| Nudging wild (+multiplier per nudge) | `nudgeWild {reel, steps, direction, mult}` | reel nudges cell by cell, multiplier ticks up each step, then fills the reel | new (reel engine `nudge()`) |
| Mystery reveal | reveal board contains `M`; `mysteryReveal {symbol, positions}` | all M flip/burst into the revealed symbol simultaneously | new |
| Mystery multi-reveal (mystery cells reveal 2–4 copies → more ways) | `mysteryExpand {reel,row,count,symbol}` | cell splits into n stacked mini-cells | new (needs megaways geometry) |
| Split symbol | `splitSymbol {reel,row,count}` | symbol cracks into 2/3/4 smaller copies in one cell | new |
| Giant symbol (2×2, 3×3) | reveal includes `{name, size:[w,h], anchor}` | one big sprite over n×n cells | new |
| Symbol upgrade / transform | `transformSymbols {from,to,positions}` | shine sweep, swap texture mid-flash | new |
| Versus / duel | `versus {positions, outcome:[{position, mult}]}` | two cells face off, winner shows multiplier, loser wiped | new |
| Collector | `collect` (6.1) | collector symbol pulls values with trails | new |
| Cell multiplier grid | `updateGrid {gridMultipliers}` | cell badges appear/double/persist | `cluster` MultiplierGrid |
| Multiplier symbols board | `boardMultiplierInfo` | multiplier orbs collected to a total | `scatter` MultiplierBoard |
| Global/progressive multiplier | `updateGlobalMult {globalMult}` | meter ticks up, flash on each step | `lines`, `scatter` |
| Expanding board | `boardExpand {rows}` | mask grows, new rows fall in | new |
| Hold & Win | `holdTrigger {positions,values}`, `respin {new, remaining}`, `holdEnd {total}` | locks, respin counter 3→reset, collect at end, "grand" if full | `price` superspin |
| Anticipation | `reveal.anticipation[]` | reels slow, glow, sound rises | all templates |
| Win cap | `wincap {amount}` | stop remaining sequence, max-win scene | `price`, `cluster` |

### 6.3 Bonus structure

| Mechanic | Book / RGS | Client | Notes |
|---|---|---|---|
| Free spins (trigger, retrigger, end) | `freeSpinTrigger`, `freeSpinRetrigger`, `updateFreeSpin`, `freeSpinEnd` | intro, counter, outro | all templates |
| **Multiple bonus games** (2–3 per title) | separate bet modes (`BONUS`, `BONUS2`, `BONUS3`) and trigger events that say which (`freeSpinTrigger.bonusType`) | different intro, rules and board per type | needs maths per mode |
| **Bonus buy menu** (tiered) | one RGS bet mode per buy, priced via `costMultiplier` | buy sheet with cards per bonus, price, volatility, confirm | `components-ui-html` BonusCards; extend |
| **Boost / ante spins** (feature odds up for a premium) | bet mode with cost e.g. 2× | toggle in bet sheet, persistent until turned off | RGS mode `type: activate` |
| Gamble / double-up | not supported by stateless books | skip | — |

### 6.4 Win presentation

Small win: in-board (symbols + amount at cell/line). Big/mega/epic/max: full-screen scene with
count-up, coins/particles, mascot reaction, skippable on tap. Tiers from `winLevelMap.ts`
(already present). Max win: special scene, stop autoplay.

---

## 7. Screen layout presets (kit-layout)

| Preset | Portrait (phone) | Desktop / landscape |
|---|---|---|
| `board-hero` (Hacksaw-like) | logo top (≤ 10% height), board 92–94% width, feature counters directly above board, bet bar bottom | board centred ~62% height, logo top-left over board edge, mascot left, buy-bonus card right, counters above board |
| `stage` (character-led) | mascot behind/above board, board 88% width | mascot large on one side reacting to wins, board offset |
| `split` | two boards stacked | two boards side by side |
| `classic` | current templates | current templates |

Rules: nothing important within 4% of edges (notches); buy-bonus button never overlaps the
board; free-spin counter replaces the logo slot during bonus; everything scales from
`mainLayout()` so one design covers all screens.

---

## 8. Animation without Spine

### 8.1 Five tools, in order of cost

| Tool | Cost | Use for | Tech |
|---|---|---|---|
| **Juice** (programmatic) | free | land bounce, win pulse, anticipation shake, idle breathing, button feedback | Svelte `Tween` on scale/rotation/position/alpha + `pixi-filters` (Glow, Bloom, Outline, Shockwave, ColorMatrix) + a shine-sweep shader |
| **Clip** (video → sprite sheet) | low | symbol win/land/expand/transform, wild effects, small FX | `tools/video-to-sprites` → `spriteSheet` asset → `SymbolSpriteSheet` (**working now**) |
| **Video texture** | low | full-screen backgrounds, big-win scenes, transitions, bonus intros | Pixi `VideoSource` from WebM (VP9 with alpha) / MP4; loop, play once, events on end (**to build**) |
| **Layer rig** | medium | mascot idle/cheer/sad without Spine | 3–8 separate PNG parts (body, head, arm…) with tweened transforms; presets `breathe`, `nod`, `wave`, `jump` |
| **Particles** | free | coins, sparks, dust, confetti | existing `ParticleEmitter` + `constants-shared/particleConfig` |

**Juice presets** (`juice:<name>`, defaults tuned per state):
`bounce` (land: scale 1.15→0.92→1, 220 ms), `pulse` (win: 1→1.12 loop + glow),
`shake` (anticipation: ±3 px jitter), `wiggle` (idle: ±4° rotation), `pop` (appear: 0→1.2→1),
`shine` (diagonal light sweep), `flash` (white additive 80 ms), `squash` (cascade landing),
`float` (idle bob), `hitstop` (freeze 60 ms on big hits), `screenShake` (board container shake).

### 8.2 Making the videos (for the art team / AI video tools)

| Clip | Aspect / size | Length | Background | Rules |
|---|---|---|---|---|
| Symbol win | 1:1, 512–1024 px source | 0.8–1.6 s | alpha or `#00FF00` | first and last frame = the static symbol pose (seamless swap); stay inside the central 80% |
| Symbol land | 1:1 | 0.3–0.5 s | alpha / green | starts slightly above, settles to static pose |
| Wild expand | 1:N (1 cell wide × N rows) | 0.6–1.2 s | alpha / green | ends filling the full reel height |
| Mascot idle/cheer | 1:1 or 3:4 | 2–4 s loop / 1–2 s | alpha / green | idle must loop cleanly |
| Background loop | 16:9 and 9:16 | 6–20 s loop | opaque | subtle motion; delivered as video texture, not sprites |
| Big-win scene | 16:9 / 9:16 | 3–5 s | alpha preferred | text is added by the game (localisation), not baked in |
| Transition | 16:9 / 9:16 | 0.8–1.5 s | alpha | covers the screen at its midpoint (swap happens there) |

Naming (auto-wiring): `<SYMBOL>_<state>.mp4` (`H1_win.mp4`, `W_land.mp4`, `W_expand.mp4`,
`S_anticipate.mp4`), `mascot_<state>.mp4`, `bg_base.mp4`, `bg_bonus.mp4`,
`bigwin_<tier>.webm`, `transition.webm`. Green screen: pure `#00FF00`, no green on the subject,
no motion blur crossing the key, even lighting.

### 8.3 Budgets

- Symbol clips: 256 px cells, 24 fps, ≤ 64 frames, one 2048² sheet (16 MB GPU) per clip; share a
  sheet between symbols when clips are short.
- Total GPU textures per game ≤ 150 MB; load symbol clips after "press to continue"
  (not `preload`), bonus-only clips lazily on bonus trigger.
- Video textures: ≤ 1080p, ≤ 4 Mbps, WebM VP9 (alpha) with MP4 fallback for iOS (no alpha: use
  black-to-alpha blend mode `add` for FX).

---

## 9. Betting controls and the RGS contract

### 9.1 Current state

`components-ui-html/BettingBar.svelte` (shared on `dev`) handles spin/stop, bet ±, turbo,
autoplay, buy bonus, free-spin counter, awarded free spins; operators theme it through `--bc-*`
variables from the backoffice (`config.uiTheme`).

> **Standing rule (from the product owner, 2026-10-03):** the betting bar's design and layout are
> fixed; operator theming may change colours and corner radius only. Any Hacksaw-style control
> variant below is a **new opt-in skin that needs explicit product-owner approval before
> anyone builds it**, and backoffice previews must keep using the real bar markup.

### 9.2 Proposed control features (for approval)

- Large circular spin button with hold-to-turbo and tap-to-slam-stop.
- Bet sheet (bottom sheet on mobile) with the level grid from `stateConfig.betMenuOptions`.
- Autoplay sheet: counts, stop on bonus, stop on single win ≥ X, stop on loss limit.
- Buy sheet: one card per bonus mode (name, art, price = bet × `costMultiplier`, volatility
  meter), boost toggles, confirm step (already in `ModalBuyBonusConfirm`).
- Skins as data: `uiSkin: "default" | "minimal" | "chunky"` rendering the same state and events.

### 9.3 RGS contract (what any book or mock must satisfy)

- `authenticate` → `balance {amount, currency}`, `config {betLevels[], defaultBetLevel, betModes{MODE:{costMultiplier}}, jurisdiction{...}}`,
  optional `round` (active round to resume). Amounts: API 1,000,000 = 1 unit; books 100 = 1×.
- `play {mode, amount}` → `round {state: events[], payoutMultiplier, active}`.
- `end-round` → credits the win; `bet/event` records the resume index during bonuses.
- Bet modes the game shows must exist in `config.betModes` (Authenticate reconciles them with
  `stateMeta.betModeMeta`).

### 9.4 Stake Engine compliance checklist

Honour every `jurisdiction` flag: `socialCasino` (alternative wording, see
`components-ui-pixi/src/i18n/i18nDerived.ts`), `disabledTurbo`, `disabledSuperTurbo`,
`disabledAutoplay`, `disabledSlamstop`, `disabledSpacebar`, `disabledBuyFeature`,
`displayRTP`, `displayNetPosition`, `displaySessionTimer`, `minimumRoundDuration`. Support replay
mode (`replay=true` URL), resume of active rounds, currency formatting via
`numberToCurrencyString`, end-round timing per `BET_TYPE_METHODS_MAP`. Never bake
`localhost`/`*.ts.net` RGS URLs into release builds (GAME-PIPELINE.md §3).

---

## 10. Books for development and testing

1. **Mock RGS (done):** `tools/mock-rgs` serves template story books for `lines`, `ways`,
   `scatter`, `cluster`, `price` out of the box, plus any books dropped in
   `tools/mock-rgs/books/<gameId>/`. Force outcomes with `/mock/queue`. See its README.
2. **Synthetic book generator (Phase 4):** `tools/book-gen` produces *visual test* books for any
   spec + mechanic: valid boards for the topology, the mechanic's events in the right order,
   wins in plausible ranges, plus a scenario per feature (trigger, retrigger, max win, empty
   bonus). **Not maths:** never shipped, never used for RTP.
3. **Real maths:** `math-sdk/games` already has `0_0_lines`, `0_0_ways`, `0_0_scatter`,
   `0_0_expwilds`, `hold_and_win`, `0_0_lines_feature_match` sources, none published locally.
   Run them, publish `library/publish_files`, mount into `gambit-books-api` in
   `C:\source\docker-compose-local-stack.yml`, register in the backoffice. The kit's book event
   names must match what math-sdk emits; the mechanic tables above are the contract to hand to the
   maths author.

---

## 11. Local test workflow (verified 2026-10-04)

```bash
# once
cd C:\source\_studio-kit\web-sdk
pnpm install
pnpm run build --filter=pixi-svelte

# terminal 1: mock RGS
node tools/mock-rgs/server.mjs 5099

# terminal 2: any app
cd apps/lines
npx vite dev --host --port 3201 --strictPort
```

Open `http://localhost:3201/?sessionID=dev-1&game_id=lines&currency=ZAR&lang=en&device=desktop&rgs_url=http://localhost:5099`
(phone: replace `localhost` with the Tailscale host for both the page and `rgs_url`).

To test the real Docker RGS instead (cluster books only): start the stack with Docker Compose
(GAME-PIPELINE.md §2), then `rgs_url=https://<tailscale-host>:5078` with a real session
token and registered `game_id`.

Claude-desktop preview entries exist in `C:\source\.claude\launch.json`: `kit-mock-rgs`,
`kit-lines`, `kit-price`. **Hidden browser panes pause `requestAnimationFrame`**, which freezes
Pixi/Spine/tweens and makes the game look stuck on the loading transition. Run
`tools/qa/hidden-pane-raf-shim.js` in the page (after load, and again after "press to continue")
or keep the pane visible.

What was verified:
- All five templates authenticate and play through the mock RGS (balance, debit, win credit on
  end-round).
- `lines` played a queued free-spins book (book 5968: 3 scatters → free spins).
- A green-screen test video was converted with `video-to-sprites` and played as H1's in-game win
  animation; `oncomplete` advanced the win sequence correctly. (Test wiring reverted; the
  `spriteSheet` symbol support stays in `lines`.)

---

## 12. Roadmap (agent-sized tasks with acceptance criteria)

Work on branch `studio-kit` (or a branch off it). One mechanic or one package per PR. Each task
ends with: stories pass, the mock-RGS flow plays the feature, screenshots attached.

### Phase 0: Foundations for testing (done)
- [x] `tools/mock-rgs`: any books, forced outcomes, resume behaviour.
- [x] `tools/video-to-sprites`: video/PNG frames → Pixi sprite sheet + preview.
- [x] `lines`: `spriteSheet` symbol state (`SymbolSpriteSheet.svelte`).
- [x] `tools/qa/hidden-pane-raf-shim.js`.
- [x] First teardown → own build: `docs/teardowns/coin-reel-5x5-teardown.md` → `apps/coin-reel`
      (5×5 pays-anywhere, trigger row, coin reel, free-spin reel, per-reel stash) with
      `tools/book-gen/coin-reel.mjs` synthetic books. Pattern for future teardowns: study the
      demo, write the teardown (layout, mechanics → book events, timing), build with our own art.

### Phase 1: Board and symbols out of the apps
1. `packages/kit-board`: grid + jagged topologies, geometry API (section 5), unit tests for
   cell positions and masks. *Accept:* `lines` renders unchanged using it; a 3-4-5-4-3 story
   renders correctly.
2. `packages/kit-symbols`: one `Symbol` with `sprite | spriteSheet | spine | layers` and juice
   presets. *Accept:* the five templates use it with no visual change; a symbol with only a PNG
   gets bounce/pulse automatically.
3. Move `spriteSheet` support from `lines` into `kit-symbols`; port all templates.
4. Video texture component in `pixi-svelte` (`Video` with `loop`, `play`, `onended`) + asset type
   `video`. *Accept:* background plays a looping WebM; a transition plays once and resolves.

### Phase 2: Kit template and spec
5. `packages/kit-spec`: JSON schema (section 3.3) + loader + validation errors in plain English.
6. `apps/kit`: shell app driven by `game.spec.json` (board, symbols, layout preset, mechanics
   list). *Accept:* `lines`, `ways`, `scatter`, `cluster`, `price` each reproducible as a spec.
7. `kit-layout` presets `board-hero`, `stage`, `classic` (section 7). *Accept:* screenshots at
   360×780, 768×1024, 1920×1080 for each.

### Phase 3: FX and win presentation
8. `kit-fx`: screen shake, hit-stop, flash, shine sweep, glow/bloom wrappers, particles presets.
9. Win tiers as data (colours, clip or video per tier, count-up curve, mascot reaction).
10. Mascot layer rig + clip states (`idle`, `anticipate`, `cheer`, `bigwin`).

### Phase 4: Mechanics library (one PR each, in this order)
11. `tools/book-gen` (synthetic books per topology + mechanic, scenario flags).
12. Expanding symbol, sticky wild, walking wild, nudging wild.
13. Mystery reveal, split symbol, giant symbol, transform.
14. Versus, collector, hold & win (respin engine).
15. Megaways geometry + mystery multi-reveal; expanding board; multi-board bonus.
16. Multiple bonus types + tiered buy sheet + boost modes (UI part gated by 9.1 approval).

### Phase 5: Studio pipeline integration
17. Extend `gambit-game-studio` `GameSpec` with `board`, `mechanics`, `bonuses`, `boosts`,
    per-symbol `clips`, `look` (section 3.3); build from `apps/kit` instead of copying a template.
18. Art intake: individual symbol PNGs (any count) instead of the fixed 5×2 sheet; videos folder
    auto-converted with `video-to-sprites` by naming convention.
19. `create-slot-game` skill: accept a natural-language request, write the spec via the
    phrasebook (section 4), run the build, start mock RGS + Vite, return the launch link.

### Phase 6: QA automation
20. Story per mechanic + per scenario; headless playthrough of every queued scenario book
    (Playwright with the rAF shim) with screenshots and console-error gate.
21. Performance gate: FPS sampling during a bonus, GPU texture total, bundle size.

### Phase 7: Production
22. Real maths per mechanic in math-sdk (event names per section 6), books in books-api,
    backoffice registration, release via the existing "Release games" workflow.

---

## 13. Rules for agents

- Read `C:\source\gambit-slot-games\docs\GAME-PIPELINE.md` before building or releasing.
- Work in the `studio-kit` worktree or a branch from it. Do **not** touch
  `C:\source\web-sdk` (`main` has someone's uncommitted work) or `_dev-worktrees`, `_merge`,
  `_promo` worktrees (other sessions).
- After editing `packages/pixi-svelte`, rebuild it (`pnpm run build --filter=pixi-svelte`).
- Never change outcome logic in the client; if a visual needs data, add it to the book event.
- Betting bar: colours and radius only, unless the product owner approved a skin (section 9.1).
- Never ship a build whose RGS URL is localhost or Tailscale.
- Use only original names and art; no competitor trademarks, characters, or assets.
- Keep `docs/STUDIO-KIT-PLAN.md` current: tick roadmap items and update "Last checked".

---

## Appendix A: file map for common changes

| I want to… | Edit |
|---|---|
| change board size (today) | `src/game/constants.ts` `INITIAL_BOARD`, `SYMBOL_SIZE`; `config.ts` `numReels/numRows`; books must match |
| change a symbol's look per state | `SYMBOL_INFO_MAP` in `constants.ts`, asset in `assets.ts`, file in `static/assets` |
| add a book event | `typesBookEvent.ts`, `bookEventHandlerMap.ts`, component with `subscribeOnMount`, `stories/data/*_events.ts`, a story |
| change spin feel | `SPIN_OPTIONS_DEFAULT/FAST` in `constants.ts` (speeds px/ms, bounce, delays) |
| change layout sizes | `stateLayout.ts` `mainSizesMap`; positions in components from `mainLayout()` / `boardLayout()` |
| change win tiers | `winLevelMap.ts`, `Win.svelte` |
| change bar colours | backoffice → game → Betting bar (`--bc-*`) |

## Appendix B: sources

- Stake Engine web-sdk README (this repo) and `packages/rgs-fetcher/src/schema.ts`.
- Hacksaw Gaming overviews: [casinos.com](https://www.casinos.com/hacksaw-gaming), [pokernews](https://www.pokernews.com/casino/games/hacksaw-gaming.htm), [wagermaniacs](https://wagermaniacs.com/hacksaw-gaming/).
- Paperclip Gaming: [paperclip-gaming.com](https://paperclip-gaming.com/games), [slotcatalog](https://slotcatalog.com/en/soft/paperclip-gaming), [Minedrop](https://slotcatalog.com/en/slots/minedrop), [Deadspin Bonanza on Stake](https://stake.com/casino/games/paperclip-deadspin-bonanza).
