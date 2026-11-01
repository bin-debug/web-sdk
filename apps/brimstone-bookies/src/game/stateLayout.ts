import { createLayout } from 'utils-layout';

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio: {
		normal: 2039 / 1000,
		portrait: 1242 / 2208,
	},
	mainSizesMap: {
		desktop: { width: 1673, height: 941 },
		tablet: { width: 1000, height: 1000 },
		landscape: { width: 1882, height: 1059 },
		portrait: { width: 668, height: 1187 },
	},
});
