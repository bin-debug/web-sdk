// Scenario books for the coins feature (visual tests, not maths). Called by shell.mjs for every game whose spec lists "coins".
// Each book: reveal, squaresReveal (coins in book order), setWin, setTotalWin, finalWin. Amounts: 100 = 1x bet.
// ctx = { spec, rand, int, BOOK, winLevel, WINCAP, randomBoard, firstId }  ->  returns complete books.
const RANGES = { bronze: [0.5, 2], silver: [2, 5], gold: [5, 15], diamond: [15, 50] };
const KINDS = Object.keys(RANGES);

export function scenarios(ctx) {
	const { spec, rand, int, BOOK, winLevel } = ctx;
	const { reels, rows } = spec.board;
	const round = (v) => Math.round(v * 2) / 2;

	const cellsFor = (n) => {
		const all = [];
		for (let r = 0; r < reels; r++) for (let row = 0; row < rows; row++) all.push({ reel: r, row });
		all.sort(() => rand() - 0.5);
		return all.slice(0, Math.min(n, all.length));
	};

	const makeBook = (id, criteria, coinSpecs) => {
		const cells = cellsFor(coinSpecs.length);
		const coins = coinSpecs.map(({ kind, value }, i) => ({ pos: cells[i], kind, value }));
		const total = Math.round(coins.reduce((s, c) => s + c.value, 0) * BOOK);
		const events = [
			{ type: 'reveal', board: ctx.randomBoard(), paddingPositions: Array.from({ length: reels }, () => int(0, 59)), gameType: 'basegame', anticipation: Array(reels).fill(0) },
			{ type: 'squaresReveal', cells: coins, total },
			{ type: 'setWin', amount: total, winLevel: winLevel(total) },
			{ type: 'setTotalWin', amount: total },
			{ type: 'finalWin', amount: total },
		];
		events.forEach((e, index) => (e.index = index));
		return { id, payoutMultiplier: total / BOOK, events, criteria };
	};

	const books = [];
	let id = ctx.firstId;
	// coins_basic: 3-8 coins, every tier shows up across the set (the first book has all four tiers)
	for (let i = 0; i < 6; i++) {
		const n = i === 0 ? 4 : int(3, 8);
		const specs = Array.from({ length: n }, (_, k) => {
			const kind = i === 0 ? KINDS[k] : KINDS[int(0, 3)];
			const [lo, hi] = RANGES[kind];
			return { kind, value: round(lo + rand() * (hi - lo)) };
		});
		books.push(makeBook(id++, 'coins_basic', specs));
	}
	// coins_big: a diamond coin worth 100x or more, plus a few small ones
	for (let i = 0; i < 2; i++) {
		const specs = [{ kind: 'diamond', value: int(100, 250) }, ...Array.from({ length: int(2, 4) }, () => ({ kind: KINDS[int(0, 2)], value: round(1 + rand() * 6) }))];
		books.push(makeBook(id++, 'coins_big', specs));
	}
	return books;
}
