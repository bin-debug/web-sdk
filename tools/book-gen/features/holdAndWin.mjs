// Scenario books for hold and win (visual tests, not maths). Called by shell.mjs for every game whose spec lists "holdAndWin".
// Round: reveal, holdStart (coins that stick + lives), respin x N (new coins, lives already reset to 3 when something landed),
// optional collect {collector:'pot'} (frees cells), holdEnd (total + fullGrid), setWin, setTotalWin, finalWin. 100 = 1x bet.
// Rows are visible, 0-based. ctx = { spec, BOOK, winLevel, randomBoard, firstId }.
export function scenarios(ctx) {
	const { spec, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const cell = (n) => ({ reel: Math.floor(n / rows), row: n % rows }); // 0..reels*rows-1, reel by reel
	const coin = (n, kind, value) => ({ pos: cell(n), kind, value });
	const blank = () => randomBoard().map((reel) => reel.map(() => ({ name: 'X' })));

	// steps: { new: coin[] } | { pot: { at: n, sources: n[] } }; lives follow the rules (3 on a landing, else minus 1)
	const make = (criteria, mode, start, steps, { fullGrid = false, lives = 3 } = {}) => {
		const held = new Map(start.map((c) => [`${c.pos.reel}:${c.pos.row}`, c]));
		const k = (p) => `${p.reel}:${p.row}`;
		const events = [
			{ type: 'reveal', board: randomBoard(), paddingPositions: Array(reels).fill(0), anticipation: Array(reels).fill(0), gameType: 'basegame' },
			{ type: 'holdStart', board: blank(), coins: start, lives, mode },
		];
		let left = lives;
		let collected = 0;
		for (const step of steps) {
			if (step.pot) {
				const sources = step.pot.map(cell);
				const total = sources.reduce((sum, p) => sum + held.get(k(p)).value, 0);
				sources.forEach((p) => held.delete(k(p)));
				collected += total;
				events.push({ type: 'collect', collector: 'pot', sources, total: Math.round(total * BOOK) });
				continue;
			}
			for (const c of step.new) held.set(k(c.pos), c);
			left = step.new.length ? lives : left - 1;
			events.push({ type: 'respin', new: step.new, lives: left, remaining: left });
		}
		const sum = collected + [...held.values()].reduce((s, c) => s + c.value, 0);
		const total = Math.round(sum * BOOK);
		events.push(
			{ type: 'holdEnd', total, fullGrid },
			{ type: 'setWin', amount: total, winLevel: winLevel(total) },
			{ type: 'setTotalWin', amount: total },
			{ type: 'finalWin', amount: total },
		);
		events.forEach((e, index) => (e.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};

	const all = reels * rows;
	// hold_basic: 6 coins, two respins find nothing, one lands (lives back to 3), then three misses end it
	const basic = make('hold_basic', 'standard',
		[coin(1, 'bronze', 1), coin(4, 'silver', 2), coin(6, 'bronze', 1.5), coin(8, 'gold', 5), coin(11, 'silver', 3), coin(13, 'bronze', 0.5)],
		[{ new: [] }, { new: [] }, { new: [coin(2, 'gold', 6)] }, { new: [] }, { new: [] }, { new: [] }]);
	// hold_full: 12 coins, the last 3 cells land over two respins = full grid
	const fullStart = Array.from({ length: 12 }, (_, i) => coin(i, ['bronze', 'silver', 'gold', 'diamond'][i % 4], [1, 2, 4, 10][i % 4]));
	const full = make('hold_full', 'standard', fullStart, [{ new: [coin(12, 'gold', 5)] }, { new: [coin(13, 'silver', 2), coin(14, 'diamond', 20)] }], { fullGrid: true });
	// hold_epic: starts on a full grid with a pot and diamonds, every coin at least 1x
	const epicStart = Array.from({ length: all }, (_, i) => coin(i, i === 7 ? 'pot' : ['silver', 'gold', 'diamond'][i % 3], i === 7 ? 25 : [2, 5, 12][i % 3]));
	const epic = make('hold_epic', 'epic', epicStart, [], { fullGrid: true });
	// hold_pot: a pot takes two coins (cells free up), then new coins land in them
	const pot = make('hold_pot', 'standard',
		[coin(0, 'bronze', 1), coin(1, 'silver', 2), coin(5, 'gold', 4), coin(7, 'pot', 3), coin(9, 'bronze', 1), coin(12, 'silver', 2)],
		[{ new: [] }, { pot: [0, 1] }, { new: [coin(0, 'gold', 5), coin(1, 'diamond', 15)] }, { new: [] }, { new: [] }, { new: [] }]);
	// hold_resume: a longer round (reload on respin 2-4 and it carries on from the held coins and lives)
	const resume = make('hold_resume', 'standard',
		[coin(2, 'bronze', 1), coin(5, 'silver', 2), coin(10, 'gold', 5), coin(12, 'bronze', 1)],
		[{ new: [coin(3, 'silver', 3)] }, { new: [coin(7, 'bronze', 1)] }, { new: [] }, { new: [coin(9, 'gold', 6)] }, { new: [] }, { new: [] }, { new: [] }]);
	return [basic, full, epic, pot, resume];
}
