// Visual books for squares that remain across the book's supplied tumble sequence.
export function scenarios(ctx) {
	const { spec, BOOK, randomBoard } = ctx;
	const { reels } = spec.board;
	let id = ctx.firstId;
	const pos = (reel, row) => ({ reel, row });
	const common = (criteria, additions) => {
		const events = [{ type: 'reveal', board: randomBoard(), paddingPositions: Array(reels).fill(0), anticipation: Array(reels).fill(0), gameType: 'basegame' }];
		for (const positions of additions) {
			events.push({ type: 'winInfo', totalWin: BOOK, wins: [{ symbol: 'H1', win: BOOK, positions, meta: { overlay: positions[0] } }] });
			events.push({ type: 'squaresAdd', positions });
			events.push({ type: 'tumbleBoard', explodingSymbols: positions, newSymbols: randomBoard() });
		}
		events.push({ type: 'squaresClear' }, { type: 'setTotalWin', amount: additions.length * BOOK }, { type: 'finalWin', amount: additions.length * BOOK });
		events.forEach((event, index) => (event.index = index));
		return { id: id++, payoutMultiplier: additions.length, events, criteria };
	};
	return [
		common('golden_basic', [[pos(0, 0), pos(1, 0), pos(2, 1)], [pos(3, 2), pos(4, 2), pos(5, 3)]]),
		common('golden_overlap', [[pos(1, 1), pos(2, 1)], [pos(1, 1), pos(3, 2)]]),
	];
}
