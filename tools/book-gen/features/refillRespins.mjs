// Refill-respin visual scenario: each reveal is a server-booked respin and the shared counter follows the
// accompanying event. The round deliberately runs 3 -> 2 -> reset 3 -> 2 -> 1 -> 0.
export function scenarios(ctx) {
	const { spec, int, randomBoard, BOOK, winLevel } = ctx;
	const { reels } = spec.board;
	const events = [];
	for (const [remaining, reset] of [[3, false], [2, false], [3, true], [2, false], [1, false], [0, false]]) {
		events.push({ type: 'reveal', board: randomBoard(), paddingPositions: Array.from({ length: reels }, () => int(0, 59)), gameType: 'basegame', anticipation: Array(reels).fill(0) });
		events.push({ type: 'respinCounter', remaining, reset });
	}
	const total = BOOK;
	events.push(
		{ type: 'setWin', amount: total, winLevel: winLevel(total) },
		{ type: 'setTotalWin', amount: total },
		{ type: 'finalWin', amount: total },
	);
	events.forEach((event, index) => (event.index = index));
	return [{ id: ctx.firstId, payoutMultiplier: total / BOOK, events, criteria: 'refill_basic' }];
}
