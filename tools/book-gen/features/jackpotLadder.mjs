// Jackpot rounds: a hold-and-win round where jackpot coins (kind 'jackpot' + tier) land. A tier is won only when the hold ends with 3 or
// more coins of that tier on the grid: then ONE jackpotWin pays it (amount = the spec's mult x bet, positions = all coins of that tier).
// Jackpot coins of a tier with fewer than 3 pay nothing. A full grid also pays GRAND. Built on features/_holdRound.mjs.
// Rows are visible, 0-based. 100 = 1x bet.
import { holdBook } from './_holdRound.mjs';

export function scenarios(ctx) {
	const { spec } = ctx;
	const { rows } = spec.board;
	let id = ctx.firstId;
	const cell = (n) => ({ reel: Math.floor(n / rows), row: n % rows });
	const coin = (n, kind, value) => ({ pos: cell(n), kind, value });
	const jp = (n, tier) => ({ pos: cell(n), kind: 'jackpot', tier });
	const c = { ...ctx, cell };
	const make = (criteria, start, steps, opts) => holdBook(c, id++, criteria, 'standard', start, steps, opts);

	// jackpot_mini: two MINI coins on the trigger, the third lands on respin 2 (lives reset): 3 MINI = MINI pays
	const mini = make('jackpot_mini',
		[jp(1, 'mini'), jp(4, 'mini'), coin(6, 'bronze', 1), coin(8, 'gold', 5), coin(11, 'silver', 3), coin(13, 'bronze', 0.5)],
		[{ new: [] }, { new: [jp(2, 'mini'), coin(9, 'bronze', 1)] }, { new: [] }, { new: [] }, { new: [] }]);
	// jackpot_grand: three GRAND coins over the round (one on the trigger, one on respin 1, one on respin 3): GRAND pays
	const grand = make('jackpot_grand',
		[jp(0, 'grand'), coin(3, 'silver', 2), coin(5, 'bronze', 1), coin(7, 'gold', 4), coin(10, 'bronze', 1), coin(12, 'silver', 2)],
		[{ new: [jp(8, 'grand')] }, { new: [] }, { new: [jp(14, 'grand')] }, { new: [] }, { new: [] }, { new: [] }]);
	// jackpot_two_tiers: 3 MINI and 3 MINOR (both pay, two jackpotWin events), plus a lone MAJOR coin that pays nothing
	const two = make('jackpot_two_tiers',
		[jp(0, 'mini'), jp(3, 'mini'), jp(6, 'minor'), jp(9, 'minor'), jp(12, 'major'), coin(14, 'bronze', 1)],
		[{ new: [jp(1, 'minor')] }, { new: [jp(4, 'mini')] }, { new: [] }, { new: [] }, { new: [] }]);
	return [mini, grand, two];
}
