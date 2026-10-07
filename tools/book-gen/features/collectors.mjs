// Visual-test books for collector choreography. Sources, collector and paid total are all explicit book data.
export function scenarios(ctx) {
	const { spec, BOOK, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const pos = (reel, row) => ({ reel, row });
	const coin = (reel, row, kind, value) => ({ pos: pos(reel, row), kind, value });
	const make = (criteria, collector, coins, sources) => {
		const total = Math.round(
			coins
				.filter((item) =>
					sources.some((source) => source.reel === item.pos.reel && source.row === item.pos.row),
				)
				.reduce((sum, item) => sum + item.value, 0) * BOOK,
		);
		const events = [
			{
				type: 'reveal',
				board: randomBoard(),
				paddingPositions: Array(reels).fill(0),
				anticipation: Array(reels).fill(0),
				gameType: 'basegame',
			},
			{ type: 'squaresReveal', cells: coins, total: 0 },
			{ type: 'collect', collector, sources, total },
			{ type: 'updateTumbleWin', amount: total },
			{ type: 'setTotalWin', amount: total },
			{ type: 'finalWin', amount: total },
		];
		events.forEach((event, index) => (event.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};
	const localCoins = [
		coin(2, 2, 'bronze', 1),
		coin(3, 2, 'silver', 2),
		coin(2, 3, 'gold', 5),
		coin(4, 4, 'diamond', 9),
	];
	const globalCoins = [
		coin(0, 0, 'bronze', 1),
		coin(2, 2, 'silver', 2),
		coin(4, 3, 'gold', 5),
		coin(reels - 1, rows - 1, 'diamond', 10),
	];
	const potCoins = [coin(1, 1, 'bronze', 1), coin(1, 2, 'gold', 4), coin(5, 5, 'diamond', 12)];
	return [
		make('collect_local', pos(3, 3), localCoins, [pos(2, 2), pos(3, 2), pos(2, 3)]),
		make(
			'collect_global',
			'global',
			globalCoins,
			globalCoins.map((item) => item.pos),
		),
		make('collect_pot', 'pot', potCoins, [pos(1, 1), pos(1, 2)]),
	];
}
