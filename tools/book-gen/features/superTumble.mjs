// Super tumble visual books: winInfo names only the paid group while the book explicitly supplies every
// matching symbol to remove. Rows here are padded, as required by reveal/winInfo/tumbleBoard.
export function scenarios(ctx) {
	const { spec, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const key = ({ reel, row }) => `${reel}:${row}`;
	const cells = (name, board) => board.flatMap((reel, reelIndex) => reel.flatMap((symbol, row) =>
		row >= 1 && row <= rows && symbol.name === name ? [{ reel: reelIndex, row }] : []));
	const tumble = (board, exploding, next) => board.map((reel, reelIndex) => [
		...(next[reelIndex] ?? []),
		...reel.filter((_, row) => !exploding.some((pos) => pos.reel === reelIndex && pos.row === row)),
	]);
	const make = (criteria, steps) => {
		let board = randomBoard().map((reel) => reel.map(() => ({ name: 'L2' })));
		const planned = steps(board);
		const events = [{ type: 'reveal', board: structuredClone(board), paddingPositions: Array(reels).fill(0), anticipation: Array(reels).fill(0), gameType: 'basegame' }];
		let total = 0;
		for (const step of planned) {
			const all = cells(step.symbol, board);
			const paid = all.slice(0, step.paid);
			const sympathyPositions = all.filter((pos) => !paid.some((win) => key(win) === key(pos)));
			total += step.amount;
			events.push({ type: 'winInfo', totalWin: step.amount, wins: [{ symbol: step.symbol, win: step.amount, positions: paid }] });
			events.push({ type: 'updateTumbleWin', amount: total });
			const newSymbols = board.map((_, reel) => all.filter((pos) => pos.reel === reel).map(() => ({ name: step.next })));
			events.push({ type: 'tumbleBoard', explodingSymbols: all, sympathyPositions, newSymbols });
			board = tumble(board, all, newSymbols);
		}
		events.push({ type: 'setWin', amount: total, winLevel: winLevel(total) }, { type: 'setTotalWin', amount: total }, { type: 'finalWin', amount: total });
		events.forEach((event, index) => (event.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};
	const basic = make('supertumble_basic', (board) => {
		for (let reel = 0; reel < 3; reel++) for (let row = 2; row <= 4; row++) board[reel][row] = { name: 'H1' };
		return [{ symbol: 'H1', paid: 8, next: 'L1', amount: BOOK }];
	});
	const chain = make('supertumble_chain', (board) => {
		for (let reel = 0; reel < reels; reel++) for (let row = 2; row <= 4; row++) board[reel][row] = { name: 'H1' };
		return [
			{ symbol: 'H1', paid: 8, next: 'H2', amount: BOOK },
			{ symbol: 'H2', paid: 8, next: 'L2', amount: BOOK * 2 },
		];
	});
	return [basic, chain];
}
