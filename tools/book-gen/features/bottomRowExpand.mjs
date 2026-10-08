// Scenario books for the trigger row (visual tests, not maths). Called by shell.mjs for every game whose spec lists
// "bottomRowExpand". A special symbol (S) sits on the bottom row; expandReel stretches a pillar up that reel and its cells flip
// into coins (kind 'coin', paid by a global collect) or free-spin tiles (kind 'fs', followed by freeSpinTrigger).
// Amounts: 100 = 1x bet. reveal / winInfo / tumbleBoard / freeSpinTrigger rows are PADDED (visible row + 1); expandReel and
// collect use visible rows. `cells` are in flip order (bottom up).
export function scenarios(ctx) {
	const { spec, int, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const bottom = rows - 1; // visible bottom row
	const noSpecial = (s) => (s.name === 'S' || s.name === 'W' || s.name === 'H1' ? { name: 'L1' } : s);
	const reveal = (gameType, triggers = [], extra = []) => {
		const board = randomBoard().map((reel) => reel.map(noSpecial));
		for (const reel of triggers) board[reel][bottom + 1] = { name: 'S' };
		for (const { reel, row } of extra) board[reel][row] = { name: 'H1' };
		return { type: 'reveal', board, paddingPositions: Array.from({ length: reels }, () => int(0, 59)), gameType, anticipation: Array(reels).fill(0) };
	};
	const column = (reel) => Array.from({ length: rows }, (_, k) => ({ reel, row: bottom - k })); // bottom up
	const finish = (criteria, events, total) => {
		events.forEach((e, index) => (e.index = index));
		return { id: id++, payoutMultiplier: total / BOOK, events, criteria };
	};
	const KINDS = ['bronze', 'silver', 'gold', 'diamond'];
	const coinReel = (reel, values) => ({
		type: 'expandReel',
		reel,
		kind: 'coin',
		cells: column(reel).map((pos, i) => ({ pos, kind: KINDS[i % 4], value: values[i] })),
	});
	const collect = (reel, values) => ({
		type: 'collect',
		collector: 'global',
		sources: column(reel),
		total: Math.round(values.reduce((s, v) => s + v, 0) * BOOK),
	});
	const sum = (values) => Math.round(values.reduce((s, v) => s + v, 0) * BOOK);
	const end = (total) => [{ type: 'setWin', amount: total, winLevel: winLevel(total) }, { type: 'setTotalWin', amount: total }, { type: 'finalWin', amount: total }];

	// expand_coin: one pillar, five coins flip in from the bottom, the global collector pays them
	const v1 = [1, 2, 5, 1.5, 3];
	const coinBook = finish('expand_coin', [reveal('basegame', [2]), coinReel(2, v1), collect(2, v1), ...end(sum(v1))], sum(v1));

	// expand_two_reels: two trigger symbols, two pillars one after the other
	const va = [2, 1, 4, 1, 2];
	const vb = [5, 3, 1, 8, 2];
	const twoBook = finish('expand_two_reels', [reveal('basegame', [1, 4]), coinReel(1, va), collect(1, va), coinReel(4, vb), collect(4, vb), ...end(sum(va) + sum(vb))], sum(va) + sum(vb));

	// expand_fs: the pillar's cells turn into free-spin tiles, then a short free-spin round (no wins, just the flow)
	const fsCells = column(3).map((pos) => ({ pos, kind: 'gold' }));
	const fsEvents = [
		reveal('basegame', [3]),
		{ type: 'expandReel', reel: 3, kind: 'fs', cells: fsCells },
		{ type: 'freeSpinTrigger', totalFs: 3, positions: fsCells.map(({ pos }) => ({ reel: pos.reel, row: pos.row + 1 })), bonusType: spec.bonuses[0]?.id ?? 'BONUS', bonusName: spec.bonuses[0]?.name },
	];
	if (spec.features.includes('globalMultiplier')) fsEvents.push({ type: 'updateGlobalMult', globalMult: 1 });
	for (let spin = 1; spin <= 3; spin++) fsEvents.push({ type: 'updateFreeSpin', amount: spin, total: 3 }, reveal('freegame'), { type: 'setTotalWin', amount: 0 });
	fsEvents.push({ type: 'freeSpinEnd', amount: 0, winLevel: 1 }, { type: 'finalWin', amount: 0 });
	const fsBook = finish('expand_fs', fsEvents, 0);

	// expand_tumble: a pillar pays first, then an 8-symbol win tumbles on the same board (running win keeps adding up)
	const v2 = [1, 1.5, 2, 3, 0.5];
	const cluster = [0, 1].flatMap((reel) => Array.from({ length: rows - 1 }, (_, k) => ({ reel, row: k + 1 }))); // padded rows 1..4, reels 0-1
	const win = 2 * BOOK;
	const gone = (reel) => cluster.filter((c) => c.reel === reel).length;
	const total = sum(v2) + win;
	const tumbleBook = finish(
		'expand_tumble',
		[
			reveal('basegame', [2], cluster),
			coinReel(2, v2),
			collect(2, v2),
			{ type: 'winInfo', totalWin: win, wins: [{ symbol: 'H1', win, positions: cluster }] },
			{ type: 'updateTumbleWin', amount: total },
			{ type: 'tumbleBoard', newSymbols: Array.from({ length: reels }, (_, reel) => Array.from({ length: gone(reel) }, () => ({ name: 'L2' }))), explodingSymbols: cluster },
			{ type: 'setWin', amount: total, winLevel: winLevel(total) },
			{ type: 'setTotalWin', amount: total },
			{ type: 'finalWin', amount: total },
		],
		total,
	);
	return [coinBook, twoBook, fsBook, tumbleBook];
}
