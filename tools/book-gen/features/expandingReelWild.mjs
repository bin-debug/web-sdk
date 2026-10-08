// Scenario books for the expanding reel wild (visual tests, not maths). Called by shell.mjs for every game whose spec lists
// "expandingReelWild". Round = several reveals (the bonus spins). Spin 0: a wild lands on reels 2-4 and expands
// (expandingWildReel, first roll). Every later spin: reveal with those reels full of W, expandingWildReel per reel with the
// new multiplier, then one line win through the wild reels (multipliers on a shared line add). Amounts: 100 = 1x bet.
// reveal / winInfo rows are PADDED (visible row + 1); expandingWildReel has no rows.
const BASE_PAY = { 3: 0.6, 4: 1.5, 5: 4 }; // x bet per line length (demo values)
const WHO = (m) => (m < 5 ? 'small' : m < 25 ? 'medium' : 'large');

export function scenarios(ctx) {
	const { spec, int, BOOK, winLevel, randomBoard } = ctx;
	const { reels, rows } = spec.board;
	let id = ctx.firstId;
	const payRow = 1; // padded row of the paying line (the middle visible row)

	// rolls[reel] = one multiplier per bonus spin (index 0 = the expansion spin); lens[i] = line length of spin i (0 = no win)
	const make = (criteria, expand, rolls, lens) => {
		const events = [];
		let running = 0;
		lens.forEach((len, spin) => {
			const board = randomBoard().map((reel) => reel.map((s) => (s.name === 'W' || s.name === 'S' || s.name === 'H1' ? { name: 'L1' } : s)));
			if (len) {
				for (let r = 0; r < len; r++) board[r][payRow + 1] = { name: 'H1' };
				if (len < reels) board[len][payRow + 1] = { name: 'L2' };
			}
			for (const reel of expand) {
				if (spin === 0) board[reel][payRow + 1] = { name: 'W' }; // the landing cell only
				else for (let row = 0; row < rows + 2; row++) board[reel][row] = { name: 'W' }; // the whole reel (padding too)
			}
			events.push({ type: 'reveal', board, paddingPositions: Array.from({ length: reels }, () => int(0, 59)), gameType: 'basegame', anticipation: Array(reels).fill(0) });
			for (const reel of expand) events.push({ type: 'expandingWildReel', reel, mult: rolls[reel][spin], who: WHO(rolls[reel][spin]) });
			if (len) {
				const sum = expand.filter((reel) => reel < len).reduce((s, reel) => s + rolls[reel][spin], 0) || 1;
				const win = Math.round(BASE_PAY[len] * sum * BOOK);
				running += win;
				events.push(
					{ type: 'winInfo', totalWin: win, wins: [{ symbol: 'H1', win, positions: Array.from({ length: len }, (_, reel) => ({ reel, row: payRow + 1 })), meta: { lineIndex: 0, globalMult: 1, winWithoutMult: Math.round(BASE_PAY[len] * BOOK) } }] },
					{ type: 'setWin', amount: win, winLevel: winLevel(win) },
				);
			}
			events.push({ type: 'setTotalWin', amount: running });
		});
		events.push({ type: 'finalWin', amount: running });
		events.forEach((e, index) => (e.index = index));
		return { id: id++, payoutMultiplier: running / BOOK, events, criteria };
	};

	// expwild_bonus: reels 2 and 4 expand on spin 0, then 9 spins re-roll (small, medium and large looks); two spins pay 5 long (both reels add), the rest 3
	const bonus = make('expwild_bonus', [2, 4], { 2: [3, 8, 2, 6, 4, 12, 3, 6, 2, 4], 4: [2, 5, 30, 4, 3, 9, 25, 2, 4, 3] }, [0, 3, 3, 3, 5, 3, 3, 3, 5, 3]);
	// expwild_adjacent: reels 2 and 3 side by side, a 4-long line crosses both so their multipliers add
	const adjacent = make('expwild_adjacent', [2, 3], { 2: [2, 4, 10, 3], 3: [3, 6, 5, 20] }, [0, 4, 4, 4]);
	return [bonus, adjacent];
}
