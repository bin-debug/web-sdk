// Scenario books for sticky wilds (visual tests, not maths). Called by shell.mjs for every game whose spec lists "stickyWilds".
// Round = several reveals (respins). Each reveal is followed by addStickyWilds when boxes land and by respinCounter
// (3 on a landing = reset, else one less). Stuck boxes show on every later reveal board. The last reveal pays one line.
// Amounts: 100 = 1x bet. reveal / winInfo rows are PADDED (visible row + 1); addStickyWilds uses visible rows.
const BASE_PAY = { 3: 0.6, 4: 1.5, 5: 4 }; // x bet per line length (demo values)

export function scenarios(ctx) {
	const { spec, int, BOOK, winLevel, randomBoard } = ctx;
	const { reels } = spec.board;
	let id = ctx.firstId;
	const LIVES = 3;

	// landings: one array per respin ([] = nothing landed); misses are appended until the counter reaches 0.
	// payRow: visible row of the paying line, payLen: its length.
	const make = (criteria, landings, { payRow, payLen }) => {
		const stuck = new Map(); // "reel:row" -> { reel, row, mult }
		const events = [];
		let left = LIVES;
		const plan = [...landings];
		for (let i = 0; i < plan.length || left > 0; i++) {
			const land = plan[i] ?? [];
			left = land.length ? LIVES : left - 1;
			if (i >= plan.length) plan.push([]);
			const board = randomBoard().map((reel) => reel.map((s) => (s.name === 'W' || s.name === 'S' || s.name === 'H1' ? { name: 'L1' } : s)));
			for (const w of land) stuck.set(`${w.reel}:${w.row}`, w);
			const last = left === 0;
			if (last) {
				for (let r = 0; r < payLen; r++) board[r][payRow + 1] = { name: 'H1' };
				if (payLen < reels) board[payLen][payRow + 1] = { name: 'L2' };
			}
			for (const w of stuck.values()) board[w.reel][w.row + 1] = { name: 'W' };
			events.push({ type: 'reveal', board, paddingPositions: Array.from({ length: reels }, () => int(0, 59)), gameType: 'basegame', anticipation: Array(reels).fill(0) });
			if (land.length) events.push({ type: 'addStickyWilds', positions: land.map((w) => ({ reel: w.reel, row: w.row })), mults: land.map((w) => w.mult) });
			events.push({ type: 'respinCounter', remaining: left, reset: land.length > 0 });
		}
		// the paying line: sticky boxes on the pay row inside the line add their multipliers
		const onLine = [...stuck.values()].filter((w) => w.row === payRow && w.reel < payLen);
		const sum = onLine.reduce((s, w) => s + w.mult, 0) || 1;
		const total = Math.round(BASE_PAY[payLen] * sum * BOOK);
		events.push(
			{
				type: 'winInfo',
				totalWin: total,
				wins: [{ symbol: 'H1', win: total, positions: Array.from({ length: payLen }, (_, reel) => ({ reel, row: payRow + 1 })), meta: { lineIndex: 0, globalMult: 1, winWithoutMult: Math.round(BASE_PAY[payLen] * BOOK) } }],
			},
			{ type: 'setWin', amount: total, winLevel: winLevel(total) },
			{ type: 'setTotalWin', amount: total },
			{ type: 'finalWin', amount: total },
		);
		events.forEach((e, index) => (e.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};

	// sticky_bonus: 4 boxes land over the round; two landings reset the counter; it runs down to 0
	const bonus = make('sticky_bonus', [[{ reel: 1, row: 1, mult: 2 }, { reel: 3, row: 1, mult: 3 }], [], [{ reel: 2, row: 0, mult: 5 }], [], [], [{ reel: 2, row: 1, mult: 4 }]], { payRow: 1, payLen: 4 });
	// sticky_stacked: a whole reel of boxes lands at once, twice
	const stacked = make('sticky_stacked', [[0, 1, 2].map((row) => ({ reel: 2, row, mult: [2, 3, 5][row] })), [], [0, 1, 2].map((row) => ({ reel: 3, row, mult: [4, 2, 10][row] }))], { payRow: 1, payLen: 5 });
	return [bonus, stacked];
}
