import { createLayout } from 'utils-layout';

import { THEME } from './theme';

// With a theme frame, desktop and tablet size the whole frame (not just the reels) to the space
// Hacksaw's board takes: ~78% of the height. Phones keep the reels big and let the frame bleed.
const desktopHeight = THEME.frame ? (450 * THEME.frameScale) / 0.78 : 633;
const tabletSize = THEME.frame ? (450 * THEME.frameScale) / 0.8 : 680;

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio: {
		normal: 2039 / 1000,
		portrait: 1242 / 2208,
	},
	mainSizesMap: {
		// Board-first sizing, matched to Hacksaw: the 450px board spans the full phone width
		// and about 70% of a desktop's height.
		desktop: { width: desktopHeight * (1125 / 633), height: desktopHeight },
		tablet: { width: tabletSize, height: tabletSize },
		landscape: { width: desktopHeight * (1125 / 633), height: desktopHeight },
		// a theme frame is wider than the board, so on phones the board steps in to ~89% width
		// and the frame's border only just bleeds off the screen edges
		portrait: THEME.frame ? { width: 504, height: 896 } : { width: 450, height: 800 },
	},
});
