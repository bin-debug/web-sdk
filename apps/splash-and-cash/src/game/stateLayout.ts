import { createLayout } from 'utils-layout';

import { THEME } from './theme';

// With a theme frame, desktop and tablet size the whole frame (not just the reels): ~84% of the
// height, and a narrower main area so 16:10 screens are limited by height, not width.
// Phones fit the frame's gold border to the screen width; only its outer edge may bleed off.
const frameHeight = 450 * THEME.frameScale;
const desktopHeight = THEME.frame ? frameHeight / 0.84 : 633;
const desktopWidth = THEME.frame ? desktopHeight * 1.5 : 1125;
const tabletSize = THEME.frame ? frameHeight / 0.84 : 680;
const portraitWidth = THEME.frame ? frameHeight * 0.92 : 450;

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio: {
		normal: 2039 / 1000,
		portrait: 1242 / 2208,
	},
	mainSizesMap: {
		// Board-first sizing, matched to Hacksaw: the 450px board spans the full phone width
		// and about 70% of a desktop's height.
		desktop: { width: desktopWidth, height: desktopHeight },
		tablet: { width: tabletSize, height: tabletSize },
		landscape: { width: desktopWidth, height: desktopHeight },
		portrait: { width: portraitWidth, height: portraitWidth * (16 / 9) },
	},
});
