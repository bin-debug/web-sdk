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
//   ground         theme/ground.webp: what the mascots stand on in the phone layout (a dock, a stage),
//                  drawn across the bottom behind them; without it their feet fade into a dark shade
//   intro          theme/intro/panel.webp + icon_{wild,bonus,maxwin}.webp: three Hacksaw-style feature
//                  panels on the tap-to-play screen; their text is INTRO_PANELS unless the art folder's
//                  intro/intro.json gives THEME.introPanels

// Feature panels on the tap-to-play screen, in order wild, bonus, max win. Matches book 0_0_expwilds.
export const INTRO_PANELS = [
	{ title: 'Sticky Wild Reels', text: 'In free spins, wilds fill the reel, stick and add a 2x to 50x multiplier!' },
	{ title: 'Free Spins', text: 'Land 3, 4 or 5 BONUS symbols for 8, 12 or 15 free spins!' },
	{ title: 'Max Win', text: 'Win up to 5 000x your bet!' },
];

export const THEME = {
	name: "Splash & Cash: Catch Your Lucky Fish!",
	staticSymbols: true,
	background: true,
	bonusBackground: true,
	frame: true,
	logo: true,
	mascots: false,
	mascotAnim: false,
	ground: false,
	intro: true,
	frameScale: 1.751,
	windowColor: 0x432418,
	accentColor: 0x82ba84,
	film: false,
};
