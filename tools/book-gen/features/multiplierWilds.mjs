// Scenario books for the multiplierWilds feature (visual tests, not maths). Called by shell.mjs for every game whose spec lists
// "multiplierWilds". Each book: reveal, wildMults, winInfo (the amount already includes the multipliers, added together),
// setWin, setTotalWin, finalWin. Amounts: 100 = 1x bet. Board rows in reveal/winInfo are padded (visible row + 1); wildMults uses visible rows.
const BASE_PAY = { 3: 0.6, 4: 1.5, 5: 4 }; // x bet per line length (demo values)

export function scenarios(ctx) {
	const { spec, rand, int, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;

	// A board where one row pays `len` H1 from reel 0, `wilds` ([{reel, value, hidden}]) standing in; every other wild-free cell is random
	// and never W, the cell after the line is a different symbol so the line length is what the book says.
	const makeBook = (id, criteria, { len, wilds, extraWilds = [], win = true }) => {
		const board = randomBoard().map((reel) => reel.map((s) => (s.name === 'W' || s.name === 'S' || s.name === 'H1' ? { name: 'L1' } : s)));
		const row = int(1, rows); // padded row of the line
		const lineCells = [];
		for (let r = 0; r < len; r++) {
			if (win) board[r][row] = { name: 'H1' };
			lineCells.push({ reel: r, row });
		}
		if (win && len < reels) board[len][row] = { name: 'L2' };
		const all = [...wilds.map((w) => ({ ...w, row })), ...extraWilds.filter((w) => !(w.reel === wilds[0]?.reel && w.row === row))];
		for (const w of all) board[w.reel][w.row] = { name: 'W' };
		const sum = wilds.reduce((s, w) => s + w.value, 0) || 1;
		const total = win ? Math.round(BASE_PAY[len] * sum * BOOK) : 0;
		const events = [
			{ type: 'reveal', board, paddingPositions: Array.from({ length: reels }, () => int(0, 59)), gameType: 'basegame', anticipation: Array(reels).fill(0) },
			{
				type: 'wildMults',
				positions: all.map((w) => ({ reel: w.reel, row: w.row - 1 })),
				values: all.map((w) => w.value),
				hidden: all.map((w) => Boolean(w.hidden)),
			},
		];
		if (win) {
			events.push({ type: 'winInfo', totalWin: total, wins: [{ symbol: 'H1', win: total, positions: lineCells, meta: { lineIndex: 0, globalMult: 1, winWithoutMult: Math.round(BASE_PAY[len] * BOOK) } }] });
			events.push({ type: 'setWin', amount: total, winLevel: winLevel(total) });
		}
		events.push({ type: 'setTotalWin', amount: total }, { type: 'finalWin', amount: total });
		events.forEach((e, index) => (e.index = index));
		return { id, payoutMultiplier: total / BOOK, events, criteria };
	};

	const books = [];
	let id = ctx.firstId;
	// mwild_single: one visible wood crate x2 on a 3-line
	books.push(makeBook(id++, 'mwild_single', { len: 3, wilds: [{ reel: 1, value: 2 }] }));
	// mwild_stacked: the whole of reel 1 is wild (stacked crates, three tiers); only the line row pays, the others show their value
	books.push(
		makeBook(id++, 'mwild_stacked', {
			len: 4,
			wilds: [{ reel: 1, value: 3 }],
			extraWilds: Array.from({ length: rows }, (_, k) => ({ reel: 1, row: k + 1, value: [3, 8, 30][k % 3] })).filter((w) => w.row !== 0),
		}),
	);
	// mwild_hidden: closed crates (rare/epic) that open on the win: an iron 12x and a gold 50x
	books.push(makeBook(id++, 'mwild_hidden', { len: 4, wilds: [{ reel: 1, value: 12, hidden: true }, { reel: 2, value: 50, hidden: true }] }));
	// mwild_hidden_nowin: hidden crates and no win: they stay closed
	books.push(makeBook(id++, 'mwild_hidden_nowin', { len: 3, win: false, wilds: [], extraWilds: [{ reel: 2, row: 1, value: 25, hidden: true }, { reel: 3, row: rows, value: 8, hidden: true }] }));
	// mwild_additive: two crates on one 5-line, 2 + 4 add to x6
	books.push(makeBook(id++, 'mwild_additive', { len: 5, wilds: [{ reel: 1, value: 2 }, { reel: 3, value: 4 }] }));
	return books;
}
