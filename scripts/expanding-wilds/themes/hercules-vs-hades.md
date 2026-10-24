# Art brief: Hercules vs Hades

You are making the complete art set for an expanding-wilds slot game called **Hercules vs Hades**.
Generate every image listed below and save it with the **exact file name** in this folder:

```
C:\source\shared\expwilds-themes\hercules-vs-hades\
```

Create the folder (and its `symbols\` subfolder) if it doesn't exist. Only write images there:
do not change any code, and do not put files anywhere else. A build script
(`New-ExpandingWildsGame.ps1`) later resizes, crops and packs these images into the game, so the
sizes below are what to generate, not exact final sizes.

## The game, so the art makes sense

- A 5x5 slot (5 reels, 5 rows) on a phone screen; each symbol is shown at about 90px, so every
  symbol must read instantly at small size.
- **The wild expands**: when it lands, it grows into a full reel (a tall column) and gets a
  multiplier (2x-50x) printed on it. In free spins those expanded reels stay put.
- **Superspin**: gold coins with cash amounts land and stick; the game prints the amount on the coin.
- Two rival gods stand beside the reels as mascots, like Hacksaw Gaming's Coffee Dealer:
  **Hercules** on the left (hero, gold and sky blue), **Hades** on the right (villain, black and
  ghostly blue-green fire).
- Base game = Mount Olympus in golden light. Free spins = the Underworld.

## Style (apply to every image)

Bold cartoon slot-game art in the spirit of modern Hacksaw Gaming titles: thick dark outlines, chunky
readable shapes, soft cel shading, light from the top left, slightly exaggerated proportions.
Palette: Olympus gold, marble white, sky blue and lightning blue for Hercules' side; charcoal, deep
purple and ghostly cyan-green fire for Hades' side. Same art style, line weight and lighting across
the whole set. No watermarks, signatures or extra text, except where a word is asked for.

## Files

### Symbols: `symbols\` (1024x1024, transparent background)

The object centred, filling about 85% of the square, no tile, card or frame behind it, all at the
same scale.

| File | What it replaces in the game | Draw |
| --- | --- | --- |
| `symbols\h1.png` | H1, top-paying symbol | The golden Nemean lion head (Hercules' lion-pelt helmet), roaring, gold with blue gem eyes |
| `symbols\h2.png` | H2 | Hades' black-iron bident (two-pronged spear) crackling with cyan-green fire |
| `symbols\h3.png` | H3 | Cerberus: three snarling dog heads side by side, dark fur, glowing green eyes |
| `symbols\h4.png` | H4 | A golden Greek helmet (Corinthian style) with a red crest |
| `symbols\l1.png` | L1, low | The letter **A** in chunky carved white marble with gold trim and a red gem glow |
| `symbols\l2.png` | L2, low | The letter **K**, same marble style, blue gem glow |
| `symbols\l3.png` | L3, low | The letter **Q**, same marble style, green gem glow |
| `symbols\l4.png` | L4, low | The letter **J**, same marble style, purple gem glow |
| `symbols\l5.png` | L5, lowest | The number **10**, same marble style, orange gem glow |
| `symbols\w.png` | W, wild (one cell) | Hercules' wooden club crossed with a lightning bolt over a round gold Greek shield with the word **WILD** in bold gold-and-blue letters |
| `symbols\wild_reel.png` | The wild after it expands over a whole reel | **1024x1536 portrait, transparent.** A tall white-marble Greek column wrapped in crackling blue-gold lightning, a gold capital at the top, the word **WILD** running down the shaft. Keep the whole column inside the **middle third** of the image width: the sides get cropped to a 1:5 strip |
| `symbols\s.png` | S, scatter (3+ start free spins) | A glowing golden Greek temple on a cloud, light beams and sparks; the most eye-catching symbol of the set |
| `symbols\p.png` | P, superspin prize coin | A shiny gold drachma coin with a laurel-wreath rim and a **plain flat centre**: no face, symbol or number in the middle (the game prints the amount there) |

### Backgrounds (no characters, no text)

Keep the centre calmer and darker: the 5x5 reels cover it. The edges get cropped, so nothing
important near them.

| File | Replaces | Size | Draw |
| --- | --- | --- | --- |
| `background.png` | Base-game background, desktop | 1536x1024 | Mount Olympus above the clouds at golden hour: white marble temples and columns, gold statues, sun rays, soft clouds |
| `background_portrait.png` | Base-game background, phone | 1024x1536 | The same Olympus scene composed vertically |
| `bonus_background.png` | Free-spins background, desktop | 1536x1024 | The Underworld: dark cavern, the river Styx glowing cyan, ghostly green flames, Hades' black throne far in the back, purple mist |
| `bonus_background_portrait.png` | Free-spins background, phone | 1024x1536 | The same Underworld scene composed vertically |

### Board frame

| File | Replaces | Size | Draw |
| --- | --- | --- | --- |
| `frame.png` | The frame around the 5x5 reels | 1024x1024, transparent outside the frame | A square white-marble frame with gold Greek-key (meander) trim and small gold lion heads on the corners. The window inside (**the middle 83%** of the image) is a dark navy panel at about 85% opacity with a faint starfield. Perfectly centred, straight on, no perspective |

### Logo

| File | Replaces | Size | Draw |
| --- | --- | --- | --- |
| `logo.png` | Game logo (above the reels on phones, top-left on desktop) | 1536x1024, transparent | The words **HERCULES VS HADES** in chunky 3D cartoon lettering: "HERCULES" in gold with blue lightning, a small "VS" in the middle, "HADES" in charcoal with cyan-green flames. Stacked on two or three lines |

### Mascots

Full body, standing, feet touching the bottom edge, transparent background, 1024x1536.

| File | Replaces | Draw |
| --- | --- | --- |
| `mascot_left.png` | Left mascot (under the reels on phones, bottom-left on desktop) | **Hercules**: muscular, friendly and confident, Nemean lion pelt over his shoulders, gold armour, wooden club resting on one shoulder, flexing the other arm, turned three-quarters to the **right**, big grin |
| `mascot_right.png` | Right mascot (bottom-right) | **Hades**: tall and lanky, grey-blue skin, black robe, hair made of cyan-green flame, holding his bident, sly smirk, turned three-quarters to the **left** |

## Checklist before you finish

1. Exactly 21 files: 13 in `symbols\`, 8 in the main folder, named exactly as above (lowercase, `.png`).
2. Symbols, wild reel, frame, logo and mascots have **transparent** backgrounds; the four
   backgrounds are fully opaque.
3. `p.png` has a plain centre; `wild_reel.png` keeps the column in the middle third.
4. All files share one style, as if one artist drew the set.
5. Reply with a list of every file and its pixel size.
