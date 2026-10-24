# Expanding-wilds art spec

`New-ExpandingWildsGame.ps1 -ArtPath <folder>` reads this folder layout. Image sizes don't have to be
exact: the script scales, crops and packs everything (PNG, WebP or JPG all work).

```
<art folder>/
  symbols/            transparent PNG, square (1024x1024)
    h1.png h2.png h3.png h4.png      high symbols, h1 pays most
    l1.png l2.png l3.png l4.png l5.png   low symbols
    w.png             wild (single cell)
    wild_reel.png     the wild expanded over a whole reel (portrait 1024x1536, keep it in the middle third)
    s.png             scatter (3+ start free spins)
    p.png             prize coin for superspin (the game prints the amount on top, keep the centre plain)
  background.png            landscape 16:9 (1536x1024 is fine, edges get cropped)
  background_portrait.png   portrait 9:16 (1024x1536 is fine)
  bonus_background.png            optional, free spins (landscape)
  bonus_background_portrait.png   optional, free spins (portrait)
  frame.png           optional, square board frame; aim for the centre ~83% as the reel window (the script measures the real window, but a thick border leaves less room for the logo and mascots on phones)
  logo.png            optional, transparent, wide (1536x1024)
  mascot_left.png     optional, transparent, portrait (1024x1536), faces right
  mascot_right.png    optional, transparent, portrait (1024x1536), faces left
```

What the script makes of it (`static/assets/theme/`):

| File | Contents |
| --- | --- |
| `symbols.webp` + `symbols.json` | One sprite sheet, 1280x1280: a 4-column grid of 256x256 cells (h1-h5, l1-l5, w, s, p, x) plus the wild reel as a 256x1280 strip on the right. Frame names are `h1.webp`, ..., `wild_reel.webp`. `h5` copies `h1` (it's in the stock front end but not the maths) and `x` (superspin's empty cell) is blank. |
| `background*.webp` | 1920x1080 and 1080x1920, cropped to cover |
| `frame.webp` | 1200x1200; the board sits in the centre 1000x1000 |
| `logo.webp` | 1200x800, empty margins trimmed |
| `mascot_left.webp`, `mascot_right.webp` | 800x1200, empty margins trimmed, feet on the bottom edge |

Maths symbols (Stake's sample `0_0_expwilds`, 5x5, 15 lines): H1-H4, L1-L5, W (wild, also pays),
S (scatter), P (superspin prize coin), X (superspin blank).

Still stock art after a re-skin (next stage): loading screen, big-win and free-spins intro/outro
panels, the scene transition, number fonts and sounds.

---

## First theme: Shisa Nyama Wilds

A South African township braai (shisa nyama) at sunset. The wild is braai fire: it lands as flaming
tongs and expands into a column of fire up the reel, keeping its multiplier through free spins.
Two mascots, as in Hacksaw's Coffee Dealer: **Bra Sizwe**, the grill master (left), and
**Mama Thandi** with her chakalaka pot (right).

| Code | Symbol |
| --- | --- |
| H1 | Coil of boerewors sizzling on a grill grid (top pay) |
| H2 | T-bone steak with grill marks |
| H3 | Two lamb chops on a skewer |
| H4 | Grilled mielie (corn cob) with melting butter |
| L1-L5 | Chunky carved-wood letters A, K, Q, J, 10, charred edges, each with its own colour glow |
| W | Crossed flaming braai tongs on a gold badge reading WILD |
| wild_reel | A tall column of braai fire with the tongs at the top |
| S | A glowing half-drum braai stand throwing sparks |
| P | Gold coin with a flame rim and a plain centre |

### Prompt for Codex

Paste this as one message. It asks for every file with the right name, so the folder can go
straight into the script.

```text
Create the complete art set for a mobile slot game called "Shisa Nyama Wilds" and save every image
into C:\source\shared\expwilds-themes\shisa-nyama-wilds using the exact file names below.

STYLE (apply to every image): bold cartoon slot-game art like modern Hacksaw Gaming titles: thick dark
outlines, chunky readable shapes, saturated warm colours (ember orange, flame yellow, charcoal, deep
red, township turquoise accents), soft cel shading, light from the top left. Setting: a South African
township shisa nyama (braai/grill spot) at golden hour. Everything must read clearly at 90px on a
phone. No watermarks, no signatures, no extra text except where a word is asked for.

SYMBOLS: save in symbols/, 1024x1024, TRANSPARENT background, the object centred and filling about
85% of the square, no frame or tile behind it, all symbols the same scale and style:
- symbols/h1.png: a glossy coil of boerewors sausage sizzling on a small grill grid, smoke wisps
- symbols/h2.png: a thick T-bone steak with dark grill marks, juicy highlights
- symbols/h3.png: two lamb chops on a metal skewer, charred edges
- symbols/h4.png: a grilled mielie (corn cob) with melting butter and char spots
- symbols/l1.png: the letter "A" as chunky carved wood with charred edges and an ember-red glow
- symbols/l2.png: the letter "K", same wood style, amber-orange glow
- symbols/l3.png: the letter "Q", same wood style, chakalaka-green glow
- symbols/l4.png: the letter "J", same wood style, turquoise glow
- symbols/l5.png: the number "10", same wood style, purple glow
- symbols/w.png: two crossed braai tongs wrapped in flames over a round gold badge with the word
  "WILD" in bold flame-yellow letters
- symbols/s.png: a half oil-drum braai stand glowing with hot coals and throwing sparks, gold rim,
  clearly the special symbol (most eye-catching of the set)
- symbols/p.png: a shiny gold coin with a ring of small flames around the rim and a PLAIN flat centre
  (no symbol or text in the middle; the game prints the prize amount there)
- symbols/wild_reel.png: 1024x1536 portrait, transparent background: a tall narrow pillar of braai
  fire rising from glowing coals at the bottom, the flaming tongs at the top, with the word "WILD"
  running down the middle. Keep the whole pillar inside the middle third of the image width; the
  sides get cropped.

BACKGROUNDS (no characters, no text, keep the middle area calmer and darker because the 5x5 reels
sit on top of it):
- background.png: 1536x1024 landscape: an open-air township shisa nyama at sunset: corrugated-iron
  butchery with a hand-painted sign shape (no readable words), string lights, braai smoke, plastic
  tables and chairs, warm orange sky
- background_portrait.png: 1024x1536 portrait version of the same scene, composed vertically
- bonus_background.png: 1536x1024 the same place at night: neon glow, fire light, sparks in the air,
  more dramatic and purple-orange
- bonus_background_portrait.png: 1024x1536 portrait version of the night scene

FRAME:
- frame.png: 1024x1024, transparent outside the frame: a square welded black-steel braai grill frame
  with rivets and faint ember glow on the edges. The inside window (the middle 83% of the image) is a
  dark charcoal panel at about 85% opacity with a subtle grill-grid texture. Perfectly centred,
  straight on, no perspective.

LOGO:
- logo.png: 1536x1024, transparent background: the words "SHISA NYAMA WILDS" in chunky 3D cartoon
  lettering, "SHISA NYAMA" on top and "WILDS" larger below, flames licking off the letters, charcoal
  outline, a small pair of braai tongs as an accent

MASCOTS (full body, standing, feet at the bottom edge, transparent background, 1024x1536):
- mascot_left.png: Bra Sizwe, a cheerful round-bellied grill master in a striped apron and bucket
  hat, holding braai tongs and a sausage, turned three-quarters to the RIGHT, big confident grin
- mascot_right.png: Mama Thandi, a warm, sassy auntie in a colourful headwrap and shweshwe-print
  dress, holding a steaming pot of chakalaka, turned three-quarters to the LEFT, laughing

After saving, list every file with its pixel size so I can check nothing is missing.
```

Then build the game:

```powershell
C:\source\_wt_brand-loader\scripts\expanding-wilds\New-ExpandingWildsGame.ps1 -GameName "Shisa Nyama Wilds" -ArtPath C:\source\shared\expwilds-themes\shisa-nyama-wilds
```
