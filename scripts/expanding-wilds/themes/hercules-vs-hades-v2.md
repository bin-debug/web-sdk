# Art brief v2: Hercules vs Hades (premium pass)

The first set worked in the game but didn't look premium. This brief replaces it. What was wrong,
so you avoid it this time:

- **The board frame was far too thick** (about 17% of the image per side). It swallowed the screen
  on phones and squeezed the logo and mascots.
- **The symbols didn't stand out.** The white-marble letters, dark Cerberus and thin bident blurred
  into the starfield behind the reels. At phone size (about 80px) they weren't clear.
- **The logo and mascots had lots of empty margin**, so they came out tiny once fitted to the screen.
- **The look was generic "AI slot art"**: too much fine detail and soft gradients. We want the
  bold, graphic, comic look of Hacksaw Gaming titles (Coffee Dealer, Wanted Dead or a Wild,
  Le Bandit, Chaos Crew).

Save every file with the exact name below into this **new** folder (create it and its `symbols\`
subfolder):

```
C:\source\shared\expwilds-themes\hercules-vs-hades-v2\
```

Only write images there. Don't change any code or touch the v1 folder.

## The game (for context)

5x5 slot on a phone. Each symbol shows at about 80px, so **every symbol must be recognisable as a
silhouette at 64px**. The wild expands into a whole reel (a tall column) and gets a multiplier.
Superspin lands gold coins with cash amounts. Hercules (left) and Hades (right) stand beside the
reels and will be animated later, so draw them as clean single characters.

## Style: apply to every image

- **Hacksaw-style graphic comic art**: thick, even, near-black outlines (about 3% of the image
  width) around every shape; flat colour fills with one highlight tone and one shadow tone (cel
  shading); bold simple shapes. No photo-realism, no soft airbrush gradients, no tiny detail, no
  texture noise.
- **High contrast and saturated colours**: every symbol has one dominant colour that is different
  from all the others.
- Light from the top left. Same line weight, shading and palette across the whole set, as if one
  artist drew it.
- No watermarks or signatures; no text except where a word is asked for.

## Symbols: `symbols\` (1024x1024, transparent background)

**Fill the square**: the object should touch or almost touch the edges (about 95% of the width or
height), centred, with no tile, plate, card or frame behind it, and no drop shadow on the background.

| File | Dominant colour | Draw |
| --- | --- | --- |
| `symbols\h1.png` | Gold | The Nemean lion's head, roaring, front view: chunky golden mane in big flame-like locks, bright blue eyes, white fangs. The most premium-looking symbol |
| `symbols\h2.png` | Electric cyan | Hades' bident as a big, thick, short weapon set diagonally from bottom left to top right, black iron with glowing cyan flames wrapping the prongs. Make it **chunky**, not a thin stick |
| `symbols\h3.png` | Purple and green | Cerberus: three dog heads, front view, **purple-grey fur with lighter purple highlights** (not black), glowing green eyes, red spiked collars |
| `symbols\h4.png` | Red | A golden Corinthian helmet in three-quarter view with a huge, bright red horsehair crest |
| `symbols\l1.png` | Red | The letter **A**: a fat, rounded, solid **red** letter with a gold rim and thick black outline |
| `symbols\l2.png` | Blue | The letter **K**: same style, solid **royal blue** |
| `symbols\l3.png` | Green | The letter **Q**: same style, solid **emerald green** |
| `symbols\l4.png` | Purple | The letter **J**: same style, solid **purple** |
| `symbols\l5.png` | Orange | The number **10**: same style, solid **orange** (both digits fill the square side by side) |
| `symbols\w.png` | Gold and electric blue | A round gold Greek shield with a crackling blue lightning bolt and Hercules' club crossed behind it, the word **WILD** in huge chunky white letters with a black outline across the middle. Must be the loudest symbol |
| `symbols\wild_reel.png` | Gold and electric blue | **1024x1536 portrait, transparent.** One fat white-marble Greek column with a gold top and base, **filling the full height**, about **40% of the image width**, wrapped in thick crackling blue lightning, the word **WILD** stacked vertically (W-I-L-D, one letter above the other) in chunky white letters with black outlines on the shaft |
| `symbols\s.png` | Bright yellow-white | A golden temple on a cloud with a bright starburst of light rays behind it, and the word **BONUS** on a red ribbon across the bottom |
| `symbols\p.png` | Gold | A thick, shiny gold coin, face-on, with a laurel rim and a **plain, flat, slightly darker gold centre** (no face or number: the game prints the amount there) |

## Backgrounds (no characters, no text)

Keep the area behind the reels (the middle 60% of the width) **calmer, darker and less detailed**
so the reels pop. Put the interesting detail at the sides and top. Same graphic comic style.

| File | Size | Draw |
| --- | --- | --- |
| `background.png` | 1536x1024 | Mount Olympus above the clouds at golden hour: marble temples at the left and right edges, a big glowing sun low behind the centre, warm orange and pink clouds |
| `background_portrait.png` | 1024x1536 | The same scene composed vertically: temples at the top corners, clouds below |
| `bonus_background.png` | 1536x1024 | The Underworld: cavern walls at the sides, the river Styx glowing cyan along the bottom, green ghost-fire braziers at left and right, dark purple centre |
| `bonus_background_portrait.png` | 1024x1536 | The same Underworld scene composed vertically |

## Board frame: `frame.png` (1024x1024, transparent outside the frame)

- **Thin.** The border is **at most 5% of the image on each side** (about 50px), so the window is
  **exactly the middle 90%** (from 51px to 973px). Corner ornaments (small gold lion heads) may
  stick **outward** a little but must **not** cover the window.
- Border: white marble with a gold Greek-key (meander) line and a thick black outer outline.
- Window: a **plain, solid, very dark navy panel (#0b1020)** at about 92% opacity with a soft darker
  vignette at the edges. **No stars, no pattern, no texture**: the symbols sit on it and must pop.
- Perfectly centred, square, straight on.

## Logo: `logo.png` (1536x1024, transparent)

**HERCULES VS HADES** in huge chunky 3D comic lettering that **fills the whole canvas edge to edge**
(no empty margin): "HERCULES" on the top line in gold with blue lightning cracks, a small red "VS"
badge between, and "HADES" on the bottom line in dark purple with cyan-green flames. Thick black
outline around the whole logo so it reads on any background.

## Mascots (1024x1536, transparent background)

Full body, **filling the canvas height from the top of the head to the feet** (no empty space above
the head or around the sides), feet on the bottom edge. Big, expressive, chunky cartoon proportions
(large head and hands), same comic style as the symbols. Keep props inside the canvas. Plain
transparent background with no ground shadow, since these will be animated with an image-to-video
tool later.

| File | Draw |
| --- | --- |
| `mascot_left.png` | **Hercules**: huge shoulders, small legs, lion pelt with the lion's head as a hood, gold bracers, wooden club over one shoulder, flexing the other arm with a big cocky grin, turned three-quarters to the **right** |
| `mascot_right.png` | **Hades**: tall, thin and theatrical, blue-grey skin, black and purple robe, a tall crown of cyan-green flame for hair, holding his bident, sly toothy grin, one hand raised as if casting a spell, turned three-quarters to the **left** |

## Checklist before you finish

1. 21 files: 13 in `symbols\` and 8 in the main folder, named exactly as above (lowercase `.png`).
2. Symbols, wild reel, frame, logo and mascots have **transparent** backgrounds; backgrounds are opaque.
3. Shrink every symbol to 64px wide in your head: can you still tell all 12 apart at a glance? The
   five letters are five different colours; nothing is mostly black or white.
4. The frame border is at most 5% per side and the window is plain dark navy.
5. The logo and both mascots touch their canvas edges (no wasted margin).
6. Reply with every file and its pixel size.
