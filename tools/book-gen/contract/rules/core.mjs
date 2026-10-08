// Existing SDK events (apps/shell/src/game/typesBookEvent.ts). Positions here may sit in the padding rows.
import { num, str, bool, oneOf, positions, array, symbolGrid, isObj, isNum, sub } from '../helpers.mjs';

export const rules = {
	reveal(e, c) {
		symbolGrid(e, c, 'board');
		array(e, c, 'paddingPositions', { length: c.board.reels });
		array(e, c, 'anticipation', { length: c.board.reels });
		oneOf(e, c, 'gameType', ['basegame', 'freegame']);
	},
	winInfo(e, c) {
		num(e, c, 'totalWin', { min: 0 });
		const wins = array(e, c, 'wins');
		wins?.forEach((w, i) => {
			if (!isObj(w)) return c.fail(`wins[${i}] must be an object`);
			const s = sub(c, `wins[${i}].`);
			str(w, s, 'symbol');
			num(w, s, 'win', { min: 0 });
			positions(w, s, 'positions', { padded: true, nonEmpty: true });
			if (w.meta !== undefined && !isObj(w.meta)) c.fail(`wins[${i}].meta must be an object`);
		});
		if (wins && isNum(e.totalWin)) {
			const sum = wins.reduce((t, w) => t + (isNum(w?.win) ? w.win : 0), 0);
			if (Math.abs(sum - e.totalWin) > 1) c.fail(`totalWin ${e.totalWin} does not equal the sum of wins[].win (${sum})`);
		}
	},
	updateTumbleWin: (e, c) => num(e, c, 'amount', { min: 0 }),
	setTotalWin: (e, c) => num(e, c, 'amount', { min: 0 }),
	finalWin: (e, c) => num(e, c, 'amount', { min: 0 }),
	wincap: (e, c) => num(e, c, 'amount', { min: 0 }),
	setWin(e, c) {
		num(e, c, 'amount', { min: 0 });
		num(e, c, 'winLevel', { min: 1, int: true });
	},
	freeSpinTrigger(e, c) {
		num(e, c, 'totalFs', { min: 1, int: true });
		positions(e, c, 'positions', { padded: true });
		str(e, c, 'bonusType', { optional: true });
		str(e, c, 'bonusName', { optional: true });
		bool(e, c, 'hidden', { optional: true });
		if (e.retrigger !== undefined) {
			if (!isObj(e.retrigger)) c.fail('retrigger must be { extra: number }');
			else num(e.retrigger, sub(c, 'retrigger.'), 'extra', { min: 1, int: true });
		}
	},
	updateFreeSpin(e, c) {
		num(e, c, 'amount', { min: 0, int: true });
		num(e, c, 'total', { min: 1, int: true });
		if (isNum(e.amount) && isNum(e.total) && e.amount > e.total) c.fail(`amount ${e.amount} is greater than total ${e.total}`);
	},
	updateGlobalMult: (e, c) => num(e, c, 'globalMult', { min: 0 }),
	freeSpinEnd(e, c) {
		num(e, c, 'amount', { min: 0 });
		num(e, c, 'winLevel', { min: 1, int: true });
	},
	tumbleBoard(e, c) {
		positions(e, c, 'explodingSymbols', { padded: true, nonEmpty: true });
		symbolGrid(e, c, 'newSymbols', { ragged: true });
		positions(e, c, 'sympathyPositions', { padded: true, optional: true });
	},
	// events inside the snapshot are checked recursively by the runner
	createBonusSnapshot: (e, c) => array(e, c, 'bookEvents'),
};

const key = ({ reel, row }) => `${reel}:${row}`;

export const bookRules = [
	(book, { board, fail }) => {
		let boardEvent;
		for (const event of book.events) {
			if (event.type === 'reveal') boardEvent = event;
			if (event.type !== 'tumbleBoard' || !event.sympathyPositions || !boardEvent) continue;
			const previous = [...book.events.slice(0, event.index)].reverse().find((candidate) => candidate.type === 'winInfo');
			const symbols = new Set(previous?.wins?.flatMap((win) => win.symbol) ?? []);
			const wins = new Set(previous?.wins?.flatMap((win) => win.positions.map(key)) ?? []);
			const exploding = new Set(event.explodingSymbols.map(key));
			const sympathy = new Set(event.sympathyPositions.map(key));
			const matching = new Set();
			for (let reel = 0; reel < board.reels; reel++)
				for (let row = 1; row <= board.rows; row++)
					if (symbols.has(boardEvent.board?.[reel]?.[row]?.name)) matching.add(`${reel}:${row}`);
			if ([...matching].some((cell) => !exploding.has(cell)) || [...exploding].some((cell) => !matching.has(cell)))
				fail(event.index, event.type, 'super tumble must remove every matching paid symbol');
			if ([...sympathy].some((cell) => wins.has(cell) || !exploding.has(cell)) || [...exploding].some((cell) => !wins.has(cell) && !sympathy.has(cell)))
				fail(event.index, event.type, 'sympathyPositions must be exactly the non-winning removed cells');
			boardEvent = {
				...boardEvent,
				board: boardEvent.board.map((reel, index) => [
					...(event.newSymbols[index] ?? []),
					...reel.filter((_, row) => !event.explodingSymbols.some((position) => position.reel === index && position.row === row)),
				]),
			};
		}
	},
];
