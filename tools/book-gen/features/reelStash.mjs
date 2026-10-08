// Visual-test bonus rounds for the two reel-stash variants. The book owns each coin value, every
// displayed stash/bank number and the running win; the renderer never derives a payout from them.
export function scenarios(ctx) {
	const { spec, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const reveal = () => ({
		type: 'reveal',
		board: randomBoard(),
		paddingPositions: Array(reels).fill(0),
		anticipation: Array(reels).fill(0),
		gameType: 'freegame',
	});
	const baseReveal = () => ({ ...reveal(), gameType: 'basegame' });
	const cells = (reel, values) => values.map((value, row) => ({ pos: { reel, row }, kind: ['bronze', 'silver', 'gold'][row % 3], value }));
	const finish = (criteria, events, total) => {
		events.forEach((event, index) => (event.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};
	const trigger = {
		type: 'freeSpinTrigger',
		totalFs: 3,
		positions: [{ reel: 0, row: 1 }, { reel: 2, row: 2 }, { reel: 4, row: 3 }],
		bonusType: spec.bonuses[0]?.id ?? 'BONUS',
		bonusName: spec.bonuses[0]?.name,
	};

	// x1 -> x4: each expandReel carries coin values already multiplied by the book. No collect event
	// follows, because the free-spin ending owns the payout and the stash only displays book values.
	const multiplyTotal = 1600;
	const multiply = finish(
		'stash_multiply',
		[
			baseReveal(), trigger, { type: 'updateGlobalMult', globalMult: 1 },
			{ type: 'updateFreeSpin', amount: 1, total: 3 }, reveal(),
			{ type: 'expandReel', reel: 0, kind: 'coin', cells: cells(0, [1, 2]) },
			{ type: 'stashUpdate', reel: 0, value: 2 }, { type: 'updateTumbleWin', amount: 300 }, { type: 'setTotalWin', amount: 300 },
			{ type: 'updateFreeSpin', amount: 2, total: 3 }, reveal(),
			{ type: 'expandReel', reel: 0, kind: 'coin', cells: cells(0, [4]) },
			{ type: 'stashUpdate', reel: 0, value: 3 }, { type: 'updateTumbleWin', amount: 700 }, { type: 'setTotalWin', amount: 700 },
			{ type: 'updateFreeSpin', amount: 3, total: 3 }, reveal(),
			{ type: 'expandReel', reel: 0, kind: 'coin', cells: cells(0, [9]) },
			{ type: 'stashUpdate', reel: 0, value: 4 }, { type: 'updateTumbleWin', amount: multiplyTotal }, { type: 'setTotalWin', amount: multiplyTotal },
			{ type: 'freeSpinEnd', amount: multiplyTotal, winLevel: winLevel(multiplyTotal) }, { type: 'finalWin', amount: multiplyTotal },
		],
		multiplyTotal,
	);

	// A bank starts at 0x. The second expansion applies a neighbour multiplier: the three stashUpdate
	// events carry the resulting bank totals directly, and the final bank total is the bonus payout.
	const bankTotal = 1000;
	const bank = finish(
		'stash_bank',
		[
			baseReveal(), trigger, { type: 'updateGlobalMult', globalMult: 1 },
			{ type: 'updateFreeSpin', amount: 1, total: 3 }, reveal(),
			{ type: 'expandReel', reel: 2, kind: 'coin', cells: cells(2, [1, 2]) },
			{ type: 'stashUpdate', reel: 2, value: 1, banked: 300 }, { type: 'updateTumbleWin', amount: 300 }, { type: 'setTotalWin', amount: 300 },
			{ type: 'updateFreeSpin', amount: 2, total: 3 }, reveal(),
			{ type: 'expandReel', reel: 1, kind: 'coin', cells: cells(1, [2]) },
			{ type: 'stashUpdate', reel: 1, value: 2, banked: 200 }, { type: 'stashUpdate', reel: 2, value: 2, banked: 600 }, { type: 'stashUpdate', reel: 3, value: 2, banked: 200 },
			{ type: 'updateTumbleWin', amount: bankTotal }, { type: 'setTotalWin', amount: bankTotal },
			{ type: 'updateFreeSpin', amount: 3, total: 3 }, reveal(), { type: 'setTotalWin', amount: bankTotal },
			{ type: 'freeSpinEnd', amount: bankTotal, winLevel: winLevel(bankTotal) }, { type: 'finalWin', amount: bankTotal },
		],
		bankTotal,
	);
	return [multiply, bank];
}
