# Demo Art Library spec: one shared asset set for every game shell

**Who runs this:** one Sonnet session with the Artlist MCP, `ffmpeg`, and `tools/video-to-sprites`.
**Goal:** generate, key, sheet and file every demo asset that the shells in `docs/SHELL-PLAN.md`
need, so every shell is playable with real-looking art and full animation. The assets don't have
to be fancy. They must be **complete, consistent and correctly named**.
**Decided by the product owner (2026-10-06):** fox treasure-hunter mascot · treasure & gems
symbol set · video clips for high symbols, specials and the mascot (low symbols animate in code).
**Budget:** about 8,500 Artlist credits one-off (section 9). Log actuals in section 10.

---

## 1. Where things go

| What | Path | In git? |
|---|---|---|
| Raw masters (PNG stills, MP4 clips, rejects) | `C:\source\shared\demo-art-library\masters\<slot>\` | No |
| Game-ready files (keyed WebP stills, sprite sheets, audio) | `packages/kit-demo-art/static/demo/<group>/` | Yes |
| Manifest every shell reads | `packages/kit-demo-art/static/demo/manifest.json` | Yes |
| Contact sheet for owner review | `packages/kit-demo-art/static/demo/contact-sheet.html` | Yes |

`packages/kit-demo-art` is a plain package (`package.json` + `static/`). Shells copy or serve
`static/demo` at `/assets/demo/`.

### Manifest format

```jsonc
{
  "version": 1,
  "style": "demo-treasure",
  "slots": {
    "symbol.H1.static": { "type": "sprite", "file": "symbols/H1.webp", "w": 512, "h": 512 },
    "symbol.H1.win":    { "type": "spriteSheet", "file": "symbols/H1_win.json", "fps": 24, "frames": 48, "loop": false },
    "symbol.L3.win":    { "type": "juice", "preset": "pulse" },
    "mascot.idle":      { "type": "spriteSheet", "file": "mascot/idle.json", "fps": 15, "frames": 45, "loop": true, "anchor": [0.5, 1] }
  }
}
```

Slot ids are `group.NAME.state` and must match section 4–7 exactly. `type: "juice"` means the
engine animates it in code (no file).

---

## 2. Style lock (use for every generation)

**Prefix (every still and clip):**
> Bold cel-shaded cartoon illustration, thick dark ink outlines, flat colour with one shadow tone
> and one highlight tone, light from top-left, chunky readable shapes, saturated jewel colours,
> original design, no text, no watermark, no logos.

**Add for symbols, specials and mascot:**
> Single object centred, filling the middle 80% of the frame, pure solid #00FF00 green background,
> even flat lighting, no shadow on the background, no green on the subject.

**Palette:** deep teal/indigo backgrounds; gold `#FFC83D` trim on all premium items; each high
symbol owns one hue (section 4). Light always from top-left, outline weight the same on every
asset.

**Models (proven on coin-reel, see `docs/games/coin-reel/BUILD-PLAN.md` §3):**
- Stills: **z-image Turbo** (modelId 2113), 1:1 at 2K, ~10 credits.
- Mascot master and backgrounds: **Nano Banana 2** (modelId 2250), ~90–130 credits.
- Clips: **Seedance 2.0 Mini** (modelId 2467), image-to-video from the approved still, 480p, 4 s,
  no audio, ~200 credits. The minimum length is 4 s, so trim with `--duration`.

Check `get_generation_cost` before each batch. If a model id changed, pick the cheapest model
that passes section 8 and note it in section 10.

---

## 3. Mascot: "Rusty", fox treasure hunter (original)

**Look:** a young red fox, cheeky grin, one ear with a notch, brass aviator goggles pushed up on
his head, a short brown bomber jacket with a sheepskin collar, a green scarf, a small leather
satchel across his body, fingerless gloves, chunky boots. Big expressive eyes, 3-heads-tall
cartoon proportions. No real-brand resemblance (not Tails, not Fox McCloud, not Nick Wilde).

| Slot | Kind | Spec | Used for |
|---|---|---|---|
| `mascot.master` | still (Nano Banana 2) | 1024×1536, full body, 3/4 front, neutral stance, green screen | **Owner approves before any clip.** The only source image for every mascot clip |
| `mascot.idle` | clip, loop | 3 s, breathing, tail sway, blink, glance around; first frame = last frame | Always on screen |
| `mascot.anticipate` | clip | 1.5 s, leans in, rubs hands, eyes wide | Scatter/bonus anticipation |
| `mascot.win_small` | clip | 1.5 s, grin and thumbs-up, back to idle pose | Small wins |
| `mascot.win_big` | clip | 2.5 s, jumps and punches the air, coins pop from the satchel | Big/mega wins |
| `mascot.bonus_trigger` | clip | 2 s, points at the board, shouts (mouth open, no text) | Bonus trigger |
| `mascot.throw` | clip | 1.5 s, pulls an item from the satchel and throws it forward-left | Dynamite, coin collect, collector actions |

Sheet settings: `--cell 320 --fps 15`, idle 3 s = 45 frames. Anchor bottom-centre (feet). If a
clip drifts off the master's design (extra limbs, different jacket), regenerate. Never ship a
mismatched mascot.

Code-driven reactions the engine also adds (free): bob, squash on land, tilt toward wins,
mirror for `mascotSide: "left"`.

---

## 4. Base symbols

Every symbol has 7 states. **Clip** = video → sprite sheet. **Code** = juice preset in
`kit-symbols` (no file).

| State | Lows L1–L6 | Highs H1–H6 |
|---|---|---|
| `static` | still | still |
| `spin` | code: vertical motion blur | code: vertical motion blur |
| `land` | code: `squash` | code: `squash` + small `shine` |
| `win` | code: `pulse` + glow | **clip** |
| `postWin` | code: settle | code: settle |
| `explode` | shared FX clip `fx.poof` + code shrink | shared FX clip `fx.poof` + code shrink |
| `dim` | code: 30% brightness | code: 30% brightness |

### Lows (stills only, 6)

Chunky 3D-ish card ranks, each on a small gold-rimmed shield badge, one colour each:

| Slot | Rank | Colour |
|---|---|---|
| L1 | 9 | teal |
| L2 | 10 | blue |
| L3 | J | green |
| L4 | Q | purple |
| L5 | K | orange |
| L6 | A | red |

AI letters can come out malformed. If one fails twice, generate the **blank badge** in that colour
and the engine draws the rank in the display font (manifest `"rankOverlay": "J"`).

### Highs (stills + win clips, 6 + 6)

| Slot | Object | Hue | Pay rank | Win clip action (1.5–2 s, first/last frame = still) |
|---|---|---|---|---|
| H1 | Golden crown with red jewels | gold | top | rises slightly, jewels sparkle, light sweep |
| H2 | Ruby heart gem | red | 2 | pulses, inner glow beats like a heart |
| H3 | Sapphire teardrop gem | blue | 3 | spins a quarter-turn, glint |
| H4 | Emerald square-cut gem | green | 4 | facets flash in sequence |
| H5 | Purple potion bottle | purple | 5 | liquid bubbles, cork pops up and back |
| H6 | Lucky gold horseshoe | gold/grey | 6 | swings, star sparkles |

### Epic variants (stills only, 4), for the symbol-upgrade feature

| Slot | Object |
|---|---|
| E1–E4 | H1–H4 redrawn "supercharged": a cracked-open glowing core, orbiting sparks, a thicker gold rim, the same silhouette so players recognise them |

Their `win` reuses H1–H4's clip plus a code glow filter. The upgrade moment uses `fx.upgrade`.

---

## 5. Bonus and feature symbols

| Slot | Object | Stills | Clips | Used by features |
|---|---|---|---|---|
| W | Wild: a gold star badge with a bold "W" shape cut into it | 1 | `land` (0.5 s slam + shine), `win` (2 s burst) | all |
| S | Bonus scatter: a rolled treasure map with a red X, purple glow | 1 | `land` (map unrolls a little, glow pulse) | free spins |
| S2 | Super scatter: the same map but gold, with a diamond on the X | 1 | `land` | super bonus / hidden bonus |
| RB | Rainbow trigger: a rainbow arc over a small gold pot (blank, no text) | 1 | `activate` (rainbow flares and sweeps) | goldenSquares reveal |
| RB2 | Epic rainbow: the same, but with a double rainbow and sparkles | 1 | reuses `RB.activate` + code tint | full-grid reveal |
| C1–C4 | Coins: bronze, silver, gold, diamond-encrusted; **blank centre** (value drawn in code) | 4 | `C.flip` (one gold coin flip, tinted per tier in code) | coins, H&W, collectors |
| CL1, CL2 | Clovers: green four-leaf, gold four-leaf (blank centre for the ×N text) | 2 | `CL.burst` (leaves spin out, sparkle) | multipliers |
| COL1 | Local collector: a leather loot sack | 1 | `COL.collect` (sack opens, sucks in, cinches) | 3×3 collector |
| COL2 | Global collector: an open treasure chest | 1 | reuses `COL.collect` motion via code | global collector |
| J1–J4 | Jackpot markers: round gem badges green / blue / pink / orange with a gold rim, **blank centre** (MINI/MAJOR/MEGA/GRAND written in code) | 4 | code: `pop` + shine | jackpotLadder, H&W |
| MW1–MW3 | Multiplier wild crates: wooden, iron-banded, golden (blank lid plate for the ×N) | 3 | `MW.open` (lid bursts open, light rays), tinted per tier | multiplierWilds |
| DW | Dynamite wild: a bundle of 3 red sticks with a lit fuse | 1 | `DW.explode` (fuse burns, blast) | dynamite, layers |
| T1–T3 | Layer tiles: sand slab, cracked rock slab, gold-vein slab (full-cell squares, no subject, opaque) | 3 | code: crack + `fx.poof` | layers |
| X | Dead/blank cell: an empty dusty rock slot | 1 | none | H&W blanks |
| M | Mystery: a wooden crate with a big question mark burned in | 1 | code: shake + flash reveal | mystery reveal |

---

## 6. Shared FX clips

| Slot | Clip | Format | Notes |
|---|---|---|---|
| `fx.poof` | Dust and sparkle burst | 1:1, 0.5 s, green | every symbol removal |
| `fx.upgrade` | Gold energy swirl that flashes white | 1:1, 0.8 s, green | symbol upgrade, transform |
| `fx.bigwin` | Gold coin explosion with light rays, **no text** | 16:9, 3 s, green or black (`--black-to-alpha`) | win-tier scene; tier words drawn in code |
| `fx.transition` | Swirl of gold coins and map paper covering the screen at the mid-point | 16:9, 1.2 s, black-to-alpha | base ↔ bonus |

Code-only FX (no file): anticipation glow, screen shake, hit-stop, gold-square tile, collect
trails, count-up, particles (coins, sparks).

---

## 7. Scene and UI stills

| Slot | Asset | Spec |
|---|---|---|
| `bg.base` | Jungle temple ruins entrance at dusk, vines, torches, a dark centre area where the board sits | Nano Banana 2, 16:9 2K; 9:16 by ffmpeg centre crop |
| `bg.bonus` | Inside a treasure cave full of gold piles and glowing crystals | same |
| `board.frame` | Carved stone frame with gold corner caps, transparent centre, 9-slice friendly (even border) | 1:1 2K, green; record the slice insets in the manifest |
| `board.cell` / `board.cell_gold` | Dark stone cell tile / the same with a gold glow (the golden-square state) | 512², opaque |
| `logo.demo` | "DEMO SLOTS" style logo: gold chunky letters on a wooden sign (retry if the letters are wrong; fallback: code text on a sign still) | 2:1, green |
| `ui.buy.*` | Buy-menu card art: reuse S, S2, RB and C3 stills (no new generations) | — |

---

## 8. Pipeline and quality gates

**Batch order (stop after each for a quick owner look via `contact-sheet.html`):**
1. **Style test:** H1, L3, W, `bg.base`, `mascot.master`. *Owner approves the look and the mascot.*
2. Remaining stills (sections 4, 5, 7).
3. Symbol and special clips (sections 4, 5).
4. Mascot clips (section 3), only from the approved master.
5. FX clips (section 6) + audio (section 8a).
6. Manifest, contact sheet, verify in the `lines` shell (section 8b).

**Per still:** remove the green screen with a key against the **sampled** background colour (AI
"green" is often `#1ac95e`, not `#00FF00`; see coin-reel logo note). Despill, trim, centre, pad to
square, export WebP 512² (symbols), 1024 long side (mascot). Check at 2× zoom: no green fringe, no
cut-off edges, readable at 60 px.

**Per clip:**
```
node tools/video-to-sprites/video-to-sprites.mjs <in>.mp4 --name <SLOT> --key <sampled hex> \
  --cell 256 --fps 24 --duration <s> --out packages/kit-demo-art/static/demo/<group>/
```
Mascot: `--cell 320 --fps 15`. 16:9 FX: `--crop` to square for symbol FX, or keep 16:9 as a
`video` asset (WebM) for `fx.bigwin` / `fx.transition`. Gates: ≤ 64 frames per symbol clip; first
and last frame match the still (no pop when it hands back to `static`); loops seamless for idle.

### 8a. Audio (shared demo pack)

Base loop (60–90 s), bonus loop (45–60 s) via Artlist `generate_music` or the `game-audio` skill.
SFX via `search_sfx` (library, pick and download): spin_start, reel_stop, land_low, land_high,
land_special, win_small, win_medium, tumble_pop, coin_flip, coin_collect, clover, rainbow,
dynamite, jackpot, bonus_trigger, bigwin_sting, button, buy_confirm. Normalise music to about
−16 LUFS, peaks ≤ −1 dBFS. Write to `static/demo/audio/` with the same slot names.

### 8b. Done means

- Every slot in sections 3–8a is in `manifest.json` (or explicitly `juice`).
- `contact-sheet.html` shows every still and plays every sheet.
- The `lines` template, switched to the manifest (SHELL-PLAN Phase 1), plays a base spin, a win
  and free spins with zero template assets and zero console errors, desktop and 375×812.

---

## 9. Budget (estimate; replace with actuals)

| Block | Count | Credits |
|---|---|---|
| Symbol, special, scene stills (z-image Turbo) | 45 finals, about 70 tries | ~700 |
| Backgrounds (Nano Banana 2) | 2 | ~260 |
| Mascot master (Nano Banana 2) | 1, 2 tries | ~180 |
| Clips (Seedance Mini): H1–H6, W×2, S, S2, RB, C, CL, COL, MW, DW, 4 FX, 6 mascot | 27 finals, about 34 tries | ~6,800 |
| Music (2) | | ~300 |
| SFX | library | ~0–200 |
| **Total** | | **~8,300–8,500** |

---

## 10. Actuals log

| Date | Batch | Credits | Notes |
|---|---|---|---|
| 2026-10-06 | 1 style test + 2 stills (all 54 stills, mascot master, 2 bgs, board, logo) | 14,300 -> 13,450 (850) | z-image Turbo 2113 stills at 10cr (about 25% fail with TRANSACTION_FAILED or concurrency, no charge; keep batches at 6-12); Nano Banana 2 2250 for bgs (90) and mascot (90). Z-image invents text on "blank" faces: avoid the words "letters/symbol", say "smooth glossy dome face". Magenta #FF00FF bg used for green items (emerald, clover, rainbow, J1). Keying is flood-fill from the border (tools/demo-art/key_still.py), so teal/green faces survive. |
| 2026-10-06 | 3 symbol clips H1-H6, W land | 13,450 -> 12,910 (+200 for H1 test earlier) | Seedance 2.0 Mini 2467, endFrame mode with start=end=still (loops back exactly), 1:1 480p 4s no audio, 200cr each; sped 2x to 2s (51 frames) in sheet.py |
| 2026-10-06 | 4 mascot clips x6, S/S2/RB/C/CL/COL clips | 12,910 -> 9,310 (3,600 incl. next batch) | mascot from padded 3:4 master (uploaded asset), cell 320 fps 15, crop 480:752:40:0; sim 0.36 for glowing clips |
| 2026-10-06 | 5 MW/DW/W-win clips + 4 FX (poof, upgrade, bigwin, transition), 2 music tracks | 9,310 -> 7,310 | FX via Seedance Mini text-to-video (modelId 2468, 200cr) on black; poof/upgrade sheeted with --black-to-alpha, bigwin/transition kept as 854px WebM (play additive). Music: Lyria 3 Pro instrumental (2285, 300cr each), trimmed to 78 s / 53 s with a 2 s loop crossfade, loudnorm -16 LUFS / -1.2 dBTP. SFX: 18 sounds synthesised in tools/demo-art/synth_sfx.py (search_sfx cannot download). |
| | **Total** | **14,300 -> 7,310 = 6,990** | Under the 8,500 plan. 3 clip batches (6x200) + 2 FX batches were confirmed under the owner's standing pre-authorisation. |

---

## 11. Art requests from feature sessions

- `COL1` / `COL2`: collector sack and chest stills are requested for the demo manifest; code fallbacks are active until these slots are delivered.

Feature sessions never generate art. If a slot they need is missing from `manifest.json`, they add one
line here (slot id, what it is, which feature) and use the code fallback. Session A (demo art) works
through this list.

| Slot | What | Requested by | Done |
|---|---|---|---|
