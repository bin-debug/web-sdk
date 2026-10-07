// Squares, reveal, clovers, collectors (BOOK-EVENTS.md "Squares and reveal")
import { num, str, oneOf, positions, position, coins, array, isObj, isNum } from '../helpers.mjs';

export const rules = {
	squaresAdd: (e, c) => positions(e, c, 'positions', { nonEmpty: true }),
	squaresClear: (e, c) => positions(e, c, 'positions', { optional: true }),
	squaresReveal(e, c) {
		coins(e, c, 'cells', { });
		num(e, c, 'total', { min: 0 });
	},
	cloverApply(e, c) {
		position(e.pos, c, 'pos');
		oneOf(e, c, 'scope', ['adjacent', 'global']);
		num(e, c, 'mult', { min: 0 });
		positions(e, c, 'targets');
	},
	collect(e, c) {
		const who = e.collector;
		if (who === undefined) c.fail('collector is missing');
		else if (who !== 'global' && who !== 'pot') position(who, c, 'collector');
		positions(e, c, 'sources');
		num(e, c, 'total', { min: 0 });
	},
};
