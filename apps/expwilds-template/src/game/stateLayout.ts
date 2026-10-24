import { createLayout } from 'utils-layout';

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio: {
		normal: 2039 / 1000,
		portrait: 1242 / 2208,
	},
	mainSizesMap: {
		// Board-first sizing, matched to Hacksaw: the 450px board spans the full phone width
		// and about 70% of a desktop's height.
		desktop: { width: 1125, height: 633 },
		tablet: { width: 680, height: 680 },
		landscape: { width: 1125, height: 633 },
		portrait: { width: 450, height: 800 },
	},
});
