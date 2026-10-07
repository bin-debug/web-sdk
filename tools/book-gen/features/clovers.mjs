// Visual-test books for clover choreography. Targets and multipliers are explicit book data; the client only
// animates those changes and takes the round total from the final event.
export function scenarios(ctx) {
	const { spec, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const pos = (reel, row) => ({ reel, row });
	const make = (criteria, coins, clovers) => {
		let running = coins.reduce((sum, coin) => sum + coin.value, 0);
		for (const clover of clovers) {
			const targetValues = clover.targets.map((target) =>
				coins.find((coin) => coin.pos.reel === target.reel && coin.pos.row === target.row),
			);
			targetValues.forEach((coin) => {
				coin.value *= clover.mult;
			});
			running = coins.reduce((sum, coin) => sum + coin.value, 0);
		}
		const total = Math.round(running * BOOK);
		const events = [
			{
				type: 'reveal',
				board: randomBoard(),
				paddingPositions: Array(reels).fill(0),
				gameType: 'basegame',
				anticipation: Array(reels).fill(0),
			},
			// Values here are their pre-clover values. Subsequent cloverApply events name each affected cell.
			{
				type: 'squaresReveal',
				cells: coins.map((coin) => ({ ...coin, value: coin.initial })),
				total: 0,
			},
			...clovers.map(({ initial: _initial, ...clover }) => ({ type: 'cloverApply', ...clover })),
			{ type: 'setWin', amount: total, winLevel: winLevel(total) },
			{ type: 'setTotalWin', amount: total },
			{ type: 'finalWin', amount: total },
		];
		events.forEach((event, index) => (event.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};
	const coin = (reel, row, kind, value) => ({ pos: pos(reel, row), kind, value, initial: value });

	const adjacentCoins = [
		coin(0, 0, 'bronze', 1),
		coin(1, 0, 'silver', 2),
		coin(1, 1, 'gold', 4),
		coin(2, 1, 'diamond', 8),
	];
	const adjacent = {
		pos: pos(0, 1),
		scope: 'adjacent',
		mult: 3,
		targets: [pos(0, 0), pos(1, 0), pos(1, 1)],
	};
	const globalCoins = [
		coin(0, 0, 'bronze', 1),
		coin(2, 2, 'silver', 2),
		coin(4, 3, 'gold', 5),
		coin(reels - 1, rows - 1, 'diamond', 10),
	];
	const global = {
		pos: pos(Math.floor(reels / 2), Math.floor(rows / 2)),
		scope: 'global',
		mult: 2,
		targets: globalCoins.map((item) => item.pos),
	};
	const chainCoins = [
		coin(0, 0, 'bronze', 1),
		coin(1, 1, 'silver', 2),
		coin(2, 2, 'gold', 3),
		coin(3, 3, 'diamond', 4),
	];
	const chain = [
		{ pos: pos(0, 1), scope: 'adjacent', mult: 2, targets: [pos(0, 0), pos(1, 1)] },
		{
			pos: pos(reels - 1, 0),
			scope: 'global',
			mult: 2,
			targets: chainCoins.map((item) => item.pos),
		},
	];
	return [
		make('clover_adjacent', adjacentCoins, [adjacent]),
		make('clover_global', globalCoins, [global]),
		make('clover_chain', chainCoins, chain),
	];
}
