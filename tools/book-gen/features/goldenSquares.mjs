// Visual books for golden squares: real tumble rounds (reveal, winInfo, squaresAdd, tumbleBoard, ...), so the
// win highlight, the gold tile and the tumble all play in the order a real book has them.
// winInfo / tumbleBoard use PADDED rows (index 0 and rows+1 are the hidden rows); squaresAdd uses visible rows.
export function scenarios(ctx) {
	const { spec, BOOK, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const WIN = 'H1';
	// a 2-reel x 3-row block ending on `bottom` (a padded row index), for the given reels
	const block = (cols, bottom) => cols.flatMap((reel) => [bottom - 2, bottom - 1, bottom].map((row) => ({ reel, row })));
	const visible = (cells) => cells.map(({ reel, row }) => ({ reel, row: row - 1 }));

	// `steps` = [{ cells }] in padded rows. Each step: win highlight, gold tiles, then the tumble drops the cells.
	const make = (criteria, presetCells, steps) => {
		const board = randomBoard();
		for (const { reel, row } of presetCells) board[reel][row] = { name: WIN };
		const events = [{ type: 'reveal', board: structuredClone(board), paddingPositions: Array(reels).fill(0), anticipation: Array(reels).fill(0), gameType: 'basegame' }];
		let running = 0;
		for (const { cells } of steps) {
			running += BOOK;
			events.push({ type: 'winInfo', totalWin: BOOK, wins: [{ symbol: WIN, win: BOOK, positions: cells }] });
			events.push({ type: 'squaresAdd', positions: visible(cells) });
			events.push({ type: 'updateTumbleWin', amount: running });
			// the tumble: each reel drops by the number of cells it lost; new symbols fill the top (winning ones, so a
			// later step can win on them again)
			const newSymbols = board.map((reel, r) => {
				const gone = cells.filter((cell) => cell.reel === r).map((cell) => cell.row);
				const adding = gone.map(() => ({ name: WIN }));
				board[r] = [...adding, ...reel.filter((_, row) => !gone.includes(row))];
				return adding;
			});
			events.push({ type: 'tumbleBoard', newSymbols, explodingSymbols: cells });
		}
		events.push({ type: 'squaresClear' }, { type: 'setTotalWin', amount: running }, { type: 'finalWin', amount: running });
		events.forEach((event, index) => (event.index = index));
		return { id: id++, payoutMultiplier: running / BOOK, events, criteria };
	};

	const bottom = rows; // the lowest visible padded row
	const left = block([0, 1], bottom); // reels 0,1 bottom 3 rows
	const right = block([3, 4], bottom); // reels 3,4 bottom 3 rows
	// golden_basic: two different blocks win one after the other, 12 squares stay until the end
	const basic = make('golden_basic', [...left, ...right], [{ cells: left }, { cells: right }]);
	// golden_overlap: the same block wins twice (the tiles that drop into it were pre-set to win), so cells overlap
	const lifted = block([0, 1], bottom - 3); // these drop into the bottom block after the first tumble
	const overlap = make('golden_overlap', [...left, ...lifted], [{ cells: left }, { cells: left }]);
	return [basic, overlap];
}
