import { createLayout } from 'utils-layout';

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio: {
		normal: 2039 / 1000,
		portrait: 1242 / 2208,
	},
	mainSizesMap: {
		desktop: { width: 1896, height: 1067 },
		tablet: { width: 1000, height: 1000 },
		landscape: { width: 2133, height: 1200 },
		portrait: { width: 807, height: 1434 },
	},
});
