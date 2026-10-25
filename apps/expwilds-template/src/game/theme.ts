// Which parts of the stock Stake art a theme replaces. The template ships with all of them off (stock art);
// name is the game name shown in the top bar. New-ExpandingWildsGame.ps1 rewrites this file and drops the files into static/assets/theme/.
//   staticSymbols  theme/symbols.{json,webp}: h1-h5, l1-l5, w, s, p, x frames + wild_reel.webp
//   background     theme/background.webp (landscape) + background_portrait.webp
//   bonusBackground theme/bonus_background.webp + bonus_background_portrait.webp (free spins)
//   frame          theme/frame.webp, drawn behind the 5x5 board; frameScale = frame size / board size,
//                  measured from the art so the frame's window sits just outside the reels
//   logo           theme/logo.webp (1200x800)
//   mascots        theme/mascot_left.webp + mascot_right.webp (800x1200)
//   mascotAnim     theme/mascot_{left,right}_anim/{idle,cheer}.json sprite sheets (300x400 frames, feet at
//                  the bottom): idle loops, cheer plays on a win; the stills show until they load
//   windowColor    colour of the frame's reel window, measured from the art; the expanded wild sits on it
//   accentColor    the wild's main colour, measured from wild_reel; tints its landing flash
//   film           old-cartoon look: film grain, flicker and vignette over the game, iris wipe into
//                  and out of the bonus (New-ExpandingWildsGame.ps1 -FilmEffects)
export const THEME = {
	name: 'Expanding Wilds',
	staticSymbols: false,
	background: false,
	bonusBackground: false,
	frame: false,
	logo: false,
	mascots: false,
	mascotAnim: false,
	frameScale: 1.2,
	windowColor: 0x0b1020,
	accentColor: 0x9fdcff,
	film: false,
};
