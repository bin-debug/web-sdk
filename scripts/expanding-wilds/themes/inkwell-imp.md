# Art brief: Inkwell Imp

A new expanding-wilds game. The look is a **1930s rubber-hose cartoon**: mostly ink black, cream
and grey, with red and gold as the only strong accents, plus a few bright symbols. It must be our
own characters and art. **Don't copy or resemble** any existing character or game: not Hacksaw's
Wicked Grin, Cuphead, Bendy, Mickey Mouse or any Disney or Fleischer character. In particular, the
Imp must not have a black head, a white mask-like face, pie-cut eyes, a bow tie or white gloves
with three lines on the back.

Save every file with the exact name below into this **new** folder (create it and its `symbols\`
subfolder):

```
C:\source\shared\expwilds-themes\inkwell-imp\
```

Only write images there. Don't change any code or touch other folders.

## The game (for context)

5x5 slot on a phone. Each symbol shows at about 80px, so **every symbol must be recognisable as a
silhouette at 64px**. The wild expands into a whole reel (a tall column) and gets a multiplier.
Superspin lands gold coins with cash amounts. The Imp (left) and his sidekick Blot (right) stand
beside the reels and will be animated later, so draw them as clean single characters.

The story: a mischievous little devil climbs out of a spilled inkwell on an old cartoonist's desk
and splashes ink everywhere, turning it into gold.

## Style: apply to every image

- **Vintage rubber-hose cartoon, drawn bold**: thick, even, ink-black outlines (about 3% of the image
  width) around every shape; flat fills with one highlight tone and one shadow tone; simple, round,
  bouncy shapes. A slight hand-inked wobble in the lines is good. No photo-realism, no airbrush
  gradients, no tiny detail, no texture noise **on the symbols** (backgrounds may have a light paper
  grain).
- **Palette**: ink black `#141414`, cream `#f3ead2`, warm greys, accent red `#d7262b`, gold
  `#f2b632`. The high symbols add one bright colour each (listed below). Nothing else.
- Light from the top left. Same line weight, shading and palette across the whole set, as if one
  artist drew it.
- No watermarks or signatures; no text except where a word is asked for.

## Symbols: `symbols\` (1024x1024, transparent background)

**Fill the square**: the object should touch or almost touch the edges (about 95% of the width or
height), centred, with no tile, plate, card or frame behind it, and no drop shadow on the background.
Each symbol sits on a near-black board, so **nothing may be mostly black**: black objects get a
cream or coloured fill with black outlines.

| File | Dominant colour | Draw |
| --- | --- | --- |
| `symbols\h1.png` | Gold | A fat gold money sack tied with a red cord, a big black **$** on the front, a few gold coins spilling out of the top. The most premium-looking symbol |
| `symbols\h2.png` | Red | Two chunky red dice tumbling, cream pips, one showing six and one showing five |
| `symbols\h3.png` | Green | A big four-leaf clover in bright green, with a curly stem |
| `symbols\h4.png` | Purple | A tall, slightly bent cartoon top hat in **purple** with a cream band and a red feather |
| `symbols\l1.png` | Red | A fat, rounded **heart** in red with a cream highlight |
| `symbols\l2.png` | Cream | A fat, rounded **diamond** (card suit) in cream |
| `symbols\l3.png` | Cream | A fat, rounded **spade** in cream |
| `symbols\l4.png` | Cream | A fat, rounded **club** in cream |
| `symbols\l5.png` | Gold | A fat, rounded five-point **star** in gold |
| `symbols\w.png` | Red and gold | The Imp's grinning face in a gold coin rim, the word **WILD** in huge chunky cream letters with a black outline across the bottom, little ink splashes around the rim. Must be the loudest symbol |
| `symbols\wild_reel.png` | Red, gold and ink | **1024x1536 portrait, transparent.** A tall gush of black ink shooting up **the full height** of the image, about **45% of the image width**, with the Imp riding on top of it, arms up and cheering, gold coins and ink drops flying out of it, and the word **WILD** stacked vertically (W-I-L-D, one letter above the other) in chunky cream letters with black outlines down the middle |
| `symbols\s.png` | Cream and red | An old film projector with two reels on top, a bright cream light beam bursting out, and the word **BONUS** on a red ribbon across the bottom |
| `symbols\p.png` | Gold | A thick, shiny gold coin, face-on, with a rim of little ink splats and a **plain, flat, slightly darker gold centre** (no face or number: the game prints the amount there) |

## Backgrounds (no characters, no text)

Keep the area behind the reels (the middle 60% of the width) **calmer, darker and less detailed**
so the reels pop. Put the interesting detail at the sides and top. Same cartoon style, mostly
black, cream and grey with touches of red and gold, light paper grain allowed.

| File | Size | Draw |
| --- | --- | --- |
| `background.png` | 1536x1024 | An old cartoonist's desk at night seen close up: a tipped-over inkwell at the left edge with ink spilling across sketch paper, dip pens and a desk lamp at the right edge casting a warm cone of light, grey wall behind with pinned-up sketches |
| `background_portrait.png` | 1024x1536 | The same scene composed vertically: the inkwell at the bottom left, the lamp at the top right |
| `bonus_background.png` | 1536x1024 | Down inside the inkwell: a swirling ink-black whirlpool with rings of grey and deep red going into the distance, gold coins and red sparks floating at the sides |
| `bonus_background_portrait.png` | 1024x1536 | The same whirlpool composed vertically |

## Board frame: `frame.png` (1024x1024, transparent outside the frame)

- **Thin.** The border is **at most 5% of the image on each side** (about 50px), so the window is
  **exactly the middle 90%** (from 51px to 973px). Two small red devil horns may stick **outward**
  from the top corners but must **not** cover the window.
- Border: a brushed ink-black border with a thin cream line on the inside and a hand-inked wobble.
- Window: a **plain, solid, very dark charcoal panel (`#161616`)** at about 92% opacity with a soft
  darker vignette at the edges. **No pattern, no texture**: the symbols sit on it and must pop.
- Perfectly centred, square, straight on.

## Logo: `logo.png` (1536x1024, transparent)

**INKWELL IMP** in huge chunky, bouncy 1930s cartoon lettering that **fills the whole canvas edge
to edge** (no empty margin): "INKWELL" on the top line in cream with ink drips running off the
bottom of the letters, "IMP" on the bottom line, bigger, in red with a gold outline, a little
devil tail curling off the P. Thick black outline around the whole logo so it reads on any
background.

## Mascots (1024x1536, transparent background)

Full body, **filling the canvas height from the top of the head to the feet** (no empty space above
the head or around the sides), feet on the bottom edge. Big, expressive, rubber-hose proportions
(large head, bendy arms and legs, big feet), same style as the symbols. Keep props inside the
canvas. Plain transparent background with no ground shadow, since these will be animated with an
image-to-video tool later.

| File | Draw |
| --- | --- |
| `mascot_left.png` | **The Imp**: a short, round-bellied little devil with **red** skin and a cream belly and muzzle, two stubby gold horns, big pointed ears, round cream eyes with black pupils, a huge cheeky toothy grin, a long thin tail with an arrow tip, and a dip-pen nib as a pitchfork, held up in one hand. Ink drips on his feet. Turned three-quarters to the **right** |
| `mascot_right.png` | **Blot**: a living, waddling glass ink bottle with stubby rubber-hose arms and legs, full of black ink, a cream label on the front, a cork worn like a little hat, big nervous cream eyes and a worried wobbly smile, clutching a gold coin. Turned three-quarters to the **left** |

## Checklist before you finish

1. 21 files: 13 in `symbols\` and 8 in the main folder, named exactly as above (lowercase `.png`).
2. Symbols, wild reel, frame, logo and mascots have **transparent** backgrounds; backgrounds are opaque.
3. Shrink every symbol to 64px wide in your head: can you still tell all 12 apart at a glance?
   Nothing is mostly black.
4. The frame border is at most 5% per side and the window is plain dark charcoal.
5. The logo and both mascots touch their canvas edges (no wasted margin).
6. Nothing looks like Wicked Grin, Cuphead, Bendy or a Disney or Fleischer character.
7. Reply with every file and its pixel size.
