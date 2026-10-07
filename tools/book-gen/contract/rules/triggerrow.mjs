// Trigger row (BOOK-EVENTS.md "Trigger row")
import { num, oneOf, coins } from '../helpers.mjs';

export const rules = {
	expandReel(e, c) {
		num(e, c, 'reel', { min: 0, int: true });
		if (Number.isInteger(e.reel) && e.reel >= c.board.reels) c.fail(`reel ${e.reel} is outside the ${c.board.reels}x${c.board.rows} board`);
		oneOf(e, c, 'kind', ['coin', 'fs']);
		coins(e, c, 'cells');
	},
	stashUpdate(e, c) {
		num(e, c, 'reel', { min: 0, int: true });
		if (Number.isInteger(e.reel) && e.reel >= c.board.reels) c.fail(`reel ${e.reel} is outside the ${c.board.reels}x${c.board.rows} board`);
		num(e, c, 'value', { min: 0 });
		num(e, c, 'banked', { min: 0, optional: true });
	},
};
