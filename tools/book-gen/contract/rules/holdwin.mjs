// Hold and win, jackpots, refill respins (BOOK-EVENTS.md "Hold and win")
import { num, str, bool, oneOf, positions, coins, symbolGrid, TIERS } from '../helpers.mjs';

export const rules = {
	holdStart(e, c) {
		symbolGrid(e, c, 'board');
		coins(e, c, 'coins');
		num(e, c, 'lives', { min: 0, int: true });
		str(e, c, 'mode');
	},
	respin(e, c) {
		const added = coins(e, c, 'new');
		num(e, c, 'lives', { min: 0, int: true });
		num(e, c, 'remaining', { min: 0, int: true, optional: true });
		if (added?.length && Number.isInteger(e.lives) && e.lives === 0) c.fail('lives must reset (be above 0) when new coins land');
	},
	holdEnd(e, c) {
		num(e, c, 'total', { min: 0 });
		bool(e, c, 'fullGrid');
	},
	jackpotWin(e, c) {
		oneOf(e, c, 'tier', TIERS);
		num(e, c, 'amount', { min: 0 });
		positions(e, c, 'positions', { optional: true });
	},
	respinCounter(e, c) {
		num(e, c, 'remaining', { min: 0, int: true });
		bool(e, c, 'reset');
	},
};
