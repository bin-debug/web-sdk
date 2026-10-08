// Jackpot rounds: a hold-and-win round where jackpot coins (kind 'jackpot' + tier) land. In the end-of-round collect every jackpot coin
// pays its own tier (a jackpotWin per coin: amount = the spec's mult x bet); a full grid also pays GRAND. Built on features/_holdRound.mjs.
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

	// jackpot_mini: a MINI coin on the trigger and another lands on respin 2 (lives reset): both pay MINI in the collect
	const mini = make('jackpot_mini',
		[jp(1, 'mini'), coin(4, 'silver', 2), coin(6, 'bronze', 1), coin(8, 'gold', 5), coin(11, 'silver', 3), coin(13, 'bronze', 0.5)],
		[{ new: [] }, { new: [jp(2, 'mini'), coin(9, 'bronze', 1)] }, { new: [] }, { new: [] }, { new: [] }]);
	// jackpot_grand: the GRAND coin lands on the last respin that finds anything: GRAND pays
	const grand = make('jackpot_grand',
		[coin(0, 'silver', 2), coin(3, 'silver', 2), coin(5, 'bronze', 1), coin(7, 'gold', 4), coin(10, 'bronze', 1), coin(12, 'silver', 2)],
		[{ new: [coin(8, 'gold', 5)] }, { new: [] }, { new: [jp(14, 'grand')] }, { new: [] }, { new: [] }, { new: [] }]);
	// jackpot_two_tiers: MINI, MINOR and MAJOR coins in one hold: three jackpotWin events in reel order
	const two = make('jackpot_two_tiers',
		[jp(0, 'mini'), coin(3, 'bronze', 1), jp(6, 'minor'), coin(9, 'silver', 2), coin(12, 'gold', 3), coin(14, 'bronze', 1)],
		[{ new: [jp(1, 'major')] }, { new: [coin(4, 'bronze', 1)] }, { new: [] }, { new: [] }, { new: [] }]);
	return [mini, grand, two];
}
