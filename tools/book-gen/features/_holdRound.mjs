// Shared by the hold-and-win and jackpot-ladder scenario generators (not a feature itself: shell.mjs only loads
// features/<featureId>.mjs for ids in a game's feature list). Builds ONE real hold round in engine order (industry hold and win):
//   reveal (a base spin that lands the trigger coins as `C` symbols) -> holdStart (those coins stick, 3 respins)
//   -> respin x N (empty cells spin; new coins stick; lives back to 3 when any lands, +1 per plus coin)
//      each landing multiplier coin is followed by holdMultiply, each collect coin by holdCollectAll
//   -> the end-of-round collect: every held coin, reel by reel / row by row: holdCollect (cash) or jackpotWin (jackpot coin pays its tier)
//      each with the book's running total; a full grid adds a grand jackpotWin (reason fullGrid)
//   -> holdEnd -> setWin / setTotalWin / finalWin.
// Amounts: 100 = 1x bet. reveal rows are PADDED (visible row + 1); every hold event uses visible rows.
const CASH = ['bronze', 'silver', 'gold', 'diamond', 'bag'];

export function holdBook(ctx, id, criteria, mode, start, steps, { fullGrid = false, lives = 3 } = {}) {
	const { spec, BOOK, winLevel, randomBoard, cell } = ctx;
	const { reels, rows } = spec.board;
	const k = (p) => `${p.reel}:${p.row}`;
	const board = randomBoard();
	for (const c of start) board[c.pos.reel][c.pos.row + 1] = { name: 'C' };
	const held = new Map(start.map((c) => [k(c.pos), { ...c }]));
	const events = [
		{ type: 'reveal', board, paddingPositions: Array(reels).fill(0), anticipation: Array(reels).fill(0), gameType: 'basegame' },
		{ type: 'holdStart', board: board.map((reel) => reel.map(() => ({ name: 'X' }))), coins: start, lives, mode },
	];
	let left = lives;
	for (const step of steps) {
		for (const c of step.new) held.set(k(c.pos), { ...c });
		const plus = step.new.filter((c) => c.kind === 'plus').length;
		left = step.new.length ? lives + plus : left - 1;
		events.push({ type: 'respin', new: step.new, lives: left, remaining: left });
		for (const c of step.new) {
			if (c.kind === 'multiplier') {
				const targets = [...held.values()].filter((h) => k(h.pos) !== k(c.pos) && (h.value ?? 0) > 0);
				for (const h of targets) h.value = Math.round(h.value * c.mult * 100) / 100;
				events.push({ type: 'holdMultiply', pos: c.pos, mult: c.mult, targets: targets.map((h) => h.pos) });
			}
			if (c.kind === 'collect') {
				const sources = [...held.values()].filter((h) => CASH.includes(h.kind));
				const total = sources.reduce((sum, h) => sum + h.value, 0);
				sources.forEach((h) => held.delete(k(h.pos)));
				held.get(k(c.pos)).value = Math.round(total * 100) / 100;
				events.push({ type: 'holdCollectAll', pos: c.pos, sources: sources.map((h) => h.pos), total: Math.round(total * BOOK) });
			}
		}
	}
	let running = 0;
	const finalCoins = [...held.values()].sort((a, b) => a.pos.reel - b.pos.reel || a.pos.row - b.pos.row);
	for (const c of finalCoins) {
		if (c.kind === 'jackpot') {
			const amount = spec.jackpots[c.tier].mult * BOOK;
			running += amount;
			events.push({ type: 'jackpotWin', tier: c.tier, amount, positions: [c.pos], running, reason: 'coin' });
		} else {
			const amount = Math.round((c.value ?? 0) * BOOK);
			running += amount;
			events.push({ type: 'holdCollect', pos: c.pos, amount, running });
		}
	}
	if (fullGrid && spec.jackpots?.grand) {
		const amount = spec.jackpots.grand.mult * BOOK;
		running += amount;
		const positions = Array.from({ length: reels * rows }, (_, n) => cell(n));
		events.push({ type: 'jackpotWin', tier: 'grand', amount, positions, running, reason: 'fullGrid' });
	}
	const total = running;
	events.push(
		{ type: 'holdEnd', total, fullGrid },
		{ type: 'setWin', amount: total, winLevel: winLevel(total) },
		{ type: 'setTotalWin', amount: total },
		{ type: 'finalWin', amount: total },
	);
	events.forEach((e, index) => (e.index = index));
	return { id, payoutMultiplier: total / BOOK, events, criteria };
}
