// Wilds (BOOK-EVENTS.md "Wilds")
import { num, str, positions, array, isNum } from '../helpers.mjs';

export const rules = {
	wildMults(e, c) {
		positions(e, c, 'positions', { nonEmpty: true });
		const n = e.positions?.length;
		const values = array(e, c, 'values', { length: n });
		values?.forEach((v, i) => !isNum(v) && c.fail(`values[${i}] must be a number`));
		const hidden = array(e, c, 'hidden', { optional: true, length: n });
		hidden?.forEach((v, i) => typeof v !== 'boolean' && c.fail(`hidden[${i}] must be a boolean`));
	},
	addStickyWilds(e, c) {
		positions(e, c, 'positions', { nonEmpty: true });
		const mults = array(e, c, 'mults', { optional: true, length: e.positions?.length });
		mults?.forEach((v, i) => !isNum(v) && c.fail(`mults[${i}] must be a number`));
	},
	expandingWildReel(e, c) {
		num(e, c, 'reel', { min: 0, int: true });
		if (Number.isInteger(e.reel) && e.reel >= c.board.reels) c.fail(`reel ${e.reel} is outside the ${c.board.reels}x${c.board.rows} board`);
		num(e, c, 'mult', { min: 0 });
		str(e, c, 'who', { optional: true });
	},
};
