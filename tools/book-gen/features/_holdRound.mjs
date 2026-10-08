// Shared by the hold-and-win and jackpot-ladder scenario generators (not a feature itself: shell.mjs only loads
// features/<featureId>.mjs for ids in a game's feature list). Builds ONE real hold round in engine order:
//   reveal (a base spin that lands the trigger coins as `C` symbols) -> holdStart (those coins stick) -> respin x N
//   -> optional collect pot -> jackpotWin per tier with 3+ markers -> holdEnd -> setWin / setTotalWin / finalWin.
// Amounts: 100 = 1x bet. reveal rows are PADDED (visible row + 1); holdStart / respin / collect / jackpotWin use visible rows.
export const JACKPOT_MARKERS_NEEDED = 3;

export function holdBook(ctx, id, criteria, mode, start, steps, { fullGrid = false, lives = 3 } = {}) {
	const { spec, BOOK, winLevel, randomBoard, cell } = ctx;
	const { reels } = spec.board;
	const k = (p) => `${p.reel}:${p.row}`;
	const board = randomBoard();
	for (const c of start) board[c.pos.reel][c.pos.row + 1] = { name: 'C' };
	const held = new Map(start.map((c) => [k(c.pos), c]));
	const events = [
		{ type: 'reveal', board, paddingPositions: Array(reels).fill(0), anticipation: Array(reels).fill(0), gameType: 'basegame' },
		{ type: 'holdStart', board: board.map((reel) => reel.map(() => ({ name: 'X' }))), coins: start, lives, mode },
	];
	let left = lives;
	let collected = 0;
	for (const step of steps) {
		if (step.pot) {
			const sources = step.pot.map(cell);
			const total = sources.reduce((sum, p) => sum + (held.get(k(p)).value ?? 0), 0);
			sources.forEach((p) => held.delete(k(p)));
			collected += total;
			events.push({ type: 'collect', collector: 'pot', sources, total: Math.round(total * BOOK) });
			continue;
		}
		for (const c of step.new) held.set(k(c.pos), c);
		left = step.new.length ? lives : left - 1;
		events.push({ type: 'respin', new: step.new, lives: left, remaining: left });
	}
	const coinSum = collected + [...held.values()].reduce((s, c) => s + (c.value ?? 0), 0);
	let jackpotSum = 0;
	for (const tier of ['mini', 'minor', 'major', 'grand']) {
		const spots = [...held.values()].filter((c) => c.kind === 'jackpot' && c.tier === tier).map((c) => c.pos);
		if (!spec.jackpots?.[tier] || spots.length < JACKPOT_MARKERS_NEEDED) continue;
		spots.sort((a, b) => a.reel - b.reel || a.row - b.row);
		const amount = spec.jackpots[tier].mult * BOOK;
		jackpotSum += amount;
		events.push({ type: 'jackpotWin', tier, amount, positions: spots });
	}
	const total = Math.round(coinSum * BOOK) + jackpotSum;
	events.push(
		{ type: 'holdEnd', total, fullGrid },
		{ type: 'setWin', amount: total, winLevel: winLevel(total) },
		{ type: 'setTotalWin', amount: total },
		{ type: 'finalWin', amount: total },
	);
	events.forEach((e, index) => (e.index = index));
	return { id, payoutMultiplier: total / BOOK, events, criteria };
}
