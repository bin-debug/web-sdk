// Progression (BOOK-EVENTS.md "Progression")
import { num, str, bool } from '../helpers.mjs';

export const rules = {
	upgradeSymbol: (e, c) => str(e, c, 'symbol'),
	barLevel(e, c) {
		num(e, c, 'level', { min: 0, int: true });
		num(e, c, 'spinsAdded', { min: 0, int: true });
		bool(e, c, 'guaranteeReveal', { optional: true });
	},
};
