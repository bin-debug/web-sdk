# video-to-sprites

Turns a short video (or a folder of PNG frames) into a PixiJS sprite sheet the games load as a
`spriteSheet` asset. This is the no-Spine animation path: make a clip, convert it, point a symbol
state at it. Needs only `ffmpeg`/`ffprobe` on PATH.

```bash
node tools/video-to-sprites/video-to-sprites.mjs art/H1_win.mp4 --name H1_win --out apps/<game>/static/assets/sprites/clips --cell 256 --fps 24 --key 00ff00
```

Writes `H1_win.webp` (sheet), `H1_win.json` (frames in play order + `animations`), and
`H1_win.preview.webp` (animated preview to check the loop and keying). `--png` also writes a
lossless PNG master. Try it on `samples/greenscreen-orb.mp4`.

| Source | Flags |
|---|---|
| Green screen (`#00FF00`) | `--key 00ff00` (despill is automatic) |
| Blue screen | `--key 0000ff` |
| FX on black (fire, sparks, glow) | `--black-to-alpha` |
| WebM with alpha / ProRes 4444 / PNG frames | no key needed |

Budgets: cells default to 256 px and sheets are capped at 2048 px (16 MB of GPU memory). A 2048
sheet holds 64 frames at 256 px, about 2.5 s at 24 fps. If a clip does not fit, the tool shrinks the
cells and warns; shorten the clip or lower `--fps` instead. Full-screen loops (backgrounds, big-win
scenes, transitions) should be played as video textures, not sprite sheets (planned: see
`docs/STUDIO-KIT-PLAN.md`, Phase 3).

## Wiring a clip into a game (lines template shows the pattern)

```ts
// src/game/assets.ts
H1_win: { type: 'spriteSheet', src: new URL('../../assets/sprites/clips/H1_win.json', import.meta.url).href },

// src/game/constants.ts  SYMBOL_INFO_MAP.H1
win: { type: 'spriteSheet', assetKey: 'H1_win', fps: 24, sizeRatios: { width: 1, height: 1 } },
```

`Symbol.svelte` renders `type: 'spriteSheet'` with `SymbolSpriteSheet.svelte`, which plays the
clip once and calls `oncomplete` at the end, exactly as a Spine win animation does.
