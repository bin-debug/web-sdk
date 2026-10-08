// Jackpot rounds: a hold-and-win round where jackpot markers (kind 'jackpot' + tier) land. Three markers of the SAME tier win that
// jackpot when the hold ends (a jackpotWin per tier, after the last respin, before holdEnd); the amount is the spec's mult x bet.
// Fewer than three of a tier pays nothing for it. Built on features/_holdRound.mjs. Rows are visible, 0-based. 100 = 1x bet.
import { holdBook } from './_holdRound.mjs';

export function scenarios(ctx) {
	const { spec } = ctx;
	const { rows } = spec.board;
	let id = ctx.firstId;
	const cell = (n) => ({ reel: Math.floor(n / rows), row: n % rows });
	const coin = (n, kind, value) => ({ pos: cell(n), kind, value });
	const mark = (n, tier) => ({ pos: cell(n), kind: 'jackpot', tier });
	const c = { ...ctx, cell };
	const make = (criteria, start, steps, opts) => holdBook(c, id++, criteria, 'standard', start, steps, opts);

	// jackpot_mini: two MINI markers on the trigger, the third lands on respin 2 (lives reset), then it runs out: MINI pays
	const mini = make('jackpot_mini',
		[mark(1, 'mini'), mark(4, 'mini'), coin(6, 'bronze', 1), coin(8, 'gold', 5), coin(11, 'silver', 3), coin(13, 'bronze', 0.5)],
		[{ new: [] }, { new: [mark(2, 'mini'), coin(9, 'bronze', 1)] }, { new: [] }, { new: [] }, { new: [] }]);
	// jackpot_grand: three GRAND markers over four respins (one on the trigger, one per landing): GRAND pays
	const grand = make('jackpot_grand',
		[mark(0, 'grand'), coin(3, 'silver', 2), coin(5, 'bronze', 1), coin(7, 'gold', 4), coin(10, 'bronze', 1), coin(12, 'silver', 2)],
		[{ new: [mark(8, 'grand')] }, { new: [] }, { new: [mark(14, 'grand')] }, { new: [] }, { new: [] }, { new: [] }]);
	// jackpot_two_tiers: three MINI and three MINOR by the end: both pay. A lone MAJOR marker pays nothing.
	const two = make('jackpot_two_tiers',
		[mark(0, 'mini'), mark(3, 'mini'), mark(6, 'minor'), mark(9, 'minor'), mark(12, 'major'), coin(14, 'bronze', 1)],
		[{ new: [mark(1, 'minor')] }, { new: [mark(4, 'mini')] }, { new: [] }, { new: [] }, { new: [] }]);
	return [mini, grand, two];
}
