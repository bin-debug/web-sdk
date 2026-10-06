import { createLayout } from 'utils-layout';

import { MAIN_SIZES } from './constants';

export const { stateLayout, stateLayoutDerived } = createLayout({
	backgroundRatio: {
		normal: 16 / 9,
		portrait: 9 / 16,
	},
	mainSizesMap: MAIN_SIZES,
});
