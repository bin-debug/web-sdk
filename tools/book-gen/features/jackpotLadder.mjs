// Visual-test hold-and-win jackpot rounds. The jackpotWin amount and marker positions are supplied by the
// book (after the last respin, before holdEnd: jackpots pay when the hold ends); setWin owns the payout once, so the client never derives or pays a jackpot a second time.
export function scenarios(ctx) {
	const { spec, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const cell = (n) => ({ reel: Math.floor(n / rows), row: n % rows });
	const coin = (n, kind, value, tier) => ({ pos: cell(n), kind, value, ...(tier ? { tier } : {}) });
	const blank = () => randomBoard().map((reel) => reel.map(() => ({ name: 'X' })));
	const reveal = () => ({ type: 'reveal', board: randomBoard(), paddingPositions: Array(reels).fill(0), anticipation: Array(reels).fill(0), gameType: 'basegame' });
	const finish = (criteria, events, total) => {
		events.push({ type: 'setWin', amount: total, winLevel: winLevel(total) }, { type: 'setTotalWin', amount: total }, { type: 'finalWin', amount: total });
		events.forEach((event, index) => (event.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};
	const hold = (coins) => ({ type: 'holdStart', board: blank(), coins, lives: 3, mode: 'standard' });
	const misses = () => [{ type: 'respin', new: [], lives: 2 }, { type: 'respin', new: [], lives: 1 }, { type: 'respin', new: [], lives: 0 }];
	const jackpot = (tier, n, amount) => ({ type: 'jackpotWin', tier, amount, positions: [cell(n)] });

	const miniAmount = 5 * BOOK;
	const miniTotal = miniAmount + BOOK;
	const mini = finish('jackpot_mini', [reveal(), hold([coin(0, 'bronze', 1), coin(4, 'jackpot', undefined, 'mini')]), ...misses(), jackpot('mini', 4, miniAmount), { type: 'holdEnd', total: miniTotal, fullGrid: false }], miniTotal);
	const grandAmount = 2500 * BOOK;
	const grandTotal = grandAmount + 2 * BOOK;
	const grand = finish('jackpot_grand', [reveal(), hold([coin(2, 'silver', 2), coin(10, 'jackpot', undefined, 'grand')]), ...misses(), jackpot('grand', 10, grandAmount), { type: 'holdEnd', total: grandTotal, fullGrid: false }], grandTotal);
	const twoAmount = (5 + 250) * BOOK;
	const two = finish('jackpot_two_tiers', [reveal(), hold([coin(1, 'jackpot', undefined, 'mini'), coin(13, 'jackpot', undefined, 'major')]), ...misses(), jackpot('mini', 1, miniAmount), jackpot('major', 13, 250 * BOOK), { type: 'holdEnd', total: twoAmount, fullGrid: false }], twoAmount);
	return [mini, grand, two];
}
