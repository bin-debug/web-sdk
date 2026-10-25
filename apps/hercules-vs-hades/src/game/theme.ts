// Which parts of the stock Stake art a theme replaces. The template ships with all of them off (stock art);
// New-ExpandingWildsGame.ps1 rewrites this file and drops the files into static/assets/theme/.
//   staticSymbols  theme/symbols.{json,webp}: h1-h5, l1-l5, w, s, p, x frames + wild_reel.webp
//   background     theme/background.webp (landscape) + background_portrait.webp
//   bonusBackground theme/bonus_background.webp + bonus_background_portrait.webp (free spins)
//   frame          theme/frame.webp, drawn behind the 5x5 board; frameScale = frame size / board size,
//                  measured from the art so the frame's window sits just outside the reels
//   logo           theme/logo.webp (1200x800)
//   mascots        theme/mascot_left.webp + mascot_right.webp (800x1200)
export const THEME = {
	staticSymbols: true,
	background: true,
	bonusBackground: true,
	frame: true,
	logo: true,
	mascots: true,
	frameScale: 1.23,
};
