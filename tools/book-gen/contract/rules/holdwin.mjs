// Hold and win, jackpots, refill respins (BOOK-EVENTS.md "Hold and win")
import { num, str, bool, oneOf, position, positions, coins, symbolGrid, TIERS } from '../helpers.mjs';

export const rules = {
	holdStart(e, c) {
		symbolGrid(e, c, 'board');
		coins(e, c, 'coins');
		num(e, c, 'lives', { min: 0, int: true });
		str(e, c, 'mode');
	},
	respin(e, c) {
		const added = coins(e, c, 'new');
		num(e, c, 'lives', { min: 0, int: true });
		num(e, c, 'remaining', { min: 0, int: true, optional: true });
		if (added?.length && Number.isInteger(e.lives) && e.lives === 0) c.fail('lives must reset (be above 0) when new coins land');
	},
	holdMultiply(e, c) {
		position(e.pos, c, 'pos');
		num(e, c, 'mult', { min: 1 });
		positions(e, c, 'targets');
	},
	holdCollectAll(e, c) {
		position(e.pos, c, 'pos');
		positions(e, c, 'sources');
		num(e, c, 'total', { min: 0 });
	},
	holdCollect(e, c) {
		position(e.pos, c, 'pos');
		num(e, c, 'amount', { min: 0 });
		num(e, c, 'running', { min: 0 });
	},
	holdEnd(e, c) {
		num(e, c, 'total', { min: 0 });
		bool(e, c, 'fullGrid');
	},
	jackpotWin(e, c) {
		oneOf(e, c, 'tier', TIERS);
		num(e, c, 'amount', { min: 0 });
		positions(e, c, 'positions');
		num(e, c, 'running', { min: 0, optional: true });
		oneOf(e, c, 'reason', ['coin', 'fullGrid'], { optional: true });
	},
	respinCounter(e, c) {
		num(e, c, 'remaining', { min: 0, int: true });
		bool(e, c, 'reset');
	},
};

// Whole-round checks (run once per book after the per-event rules). Hold and win is only valid as a real round, in order:
// reveal (trigger coins land as C symbols) -> holdStart -> respins (lives: -1 on a miss, back to the start value when something lands)
// -> holdMultiply / holdCollectAll right after the respin that landed those coins -> the end collect: every held coin once, reel by
// reel and row by row, as holdCollect (cash) or jackpotWin (a jackpot coin pays its own tier), with a correct running total
// -> a full grid adds a grand jackpotWin -> holdEnd (total = the last running total).
const key = (p) => `${p.reel}:${p.row}`;
const MARKERS_NEEDED = 3; // 3 coins of one jackpot tier held when the hold ends win that tier; fewer pay nothing
const CASH = ['bronze', 'silver', 'gold', 'diamond', 'bag'];
export const bookRules = [
	(book, c) => {
		const events = book.events;
		const startAt = events.findIndex((e) => e?.type === 'holdStart');
		if (startAt < 0) return;
		const start = events[startAt];
		const cells = c.board.reels * c.board.rows;
		const reveal = [...events.slice(0, startAt)].reverse().find((e) => e?.type === 'reveal');
		const triggerCells = new Set();
		(reveal?.board ?? []).forEach((reel, r) => reel.forEach((sym, row) => sym?.name === 'C' && triggerCells.add(`${r}:${row - 1}`)));
		if (triggerCells.size) {
			const coinCells = new Set((start.coins ?? []).map((coin) => key(coin.pos)));
			const same = triggerCells.size === coinCells.size && [...triggerCells].every((cell) => coinCells.has(cell));
			if (!same) c.fail(startAt, 'holdStart', 'coins must sit exactly on the C symbols the reveal landed (reveal rows are padded: visible row + 1)');
		}
		const held = new Map((start.coins ?? []).map((coin) => [key(coin.pos), { ...coin }]));
		let lives = start.lives;
		let collecting = false;
		let running = 0;
		let lastKey = '';
		const remaining = new Set();
		let fullGridPaid = false;
		const paidTiers = new Set();
		events.forEach((e, i) => {
			if (i <= startAt || !e) return;
			const phaseFail = (m) => c.fail(i, e.type, m);
			if (e.type === 'respin' || e.type === 'holdMultiply' || e.type === 'holdCollectAll') {
				if (collecting) return phaseFail(`${e.type} comes after the end collect started`);
			}
			if (e.type === 'respin') {
				const landed = e.new ?? [];
				if (!landed.length && e.lives !== lives - 1) phaseFail(`a miss must take one respin off: expected lives ${lives - 1}, got ${e.lives}`);
				if (landed.length && e.lives < start.lives) phaseFail(`a landing must put the respins back to ${start.lives} (or more), got ${e.lives}`);
				for (const coin of landed) {
					if (held.has(key(coin.pos))) phaseFail(`a coin lands on ${key(coin.pos)} which already holds one`);
					held.set(key(coin.pos), { ...coin });
				}
				lives = e.lives;
			}
			if (e.type === 'holdMultiply') {
				if (held.get(key(e.pos))?.kind !== 'multiplier') phaseFail('pos must be a held multiplier coin');
				for (const p of e.targets ?? []) {
					const coin = held.get(key(p));
					if (!coin || !(coin.value > 0)) phaseFail(`target ${key(p)} is not a held coin with a value`);
					else coin.value = Math.round(coin.value * e.mult * 100) / 100;
				}
			}
			if (e.type === 'holdCollectAll') {
				const target = held.get(key(e.pos));
				if (target?.kind !== 'collect') return phaseFail('pos must be a held collect coin');
				let sum = 0;
				for (const p of e.sources ?? []) {
					const coin = held.get(key(p));
					if (!coin || !CASH.includes(coin.kind)) phaseFail(`source ${key(p)} is not a held cash coin`);
					else sum += coin.value;
					held.delete(key(p));
				}
				if (Math.abs(Math.round(sum * 100) - e.total) > 1) phaseFail(`total ${e.total} is not the sum of the sources (${Math.round(sum * 100)})`);
				target.value = Math.round(sum * 100) / 100;
			}
			if (e.type === 'holdCollect' || (e.type === 'jackpotWin' && e.reason !== 'fullGrid')) {
				if (!collecting) {
					collecting = true;
					const full = held.size === cells;
					if (lives !== 0 && !full) phaseFail(`the hold ended with ${lives} respins left and the grid not full`);
					[...held.keys()].forEach((k) => remaining.add(k));
				}
				const group = e.type === 'holdCollect' ? [e.pos] : (e.positions ?? []);
				const keys = group.map((p) => key(p));
				const coins = keys.map((k) => held.get(k));
				if (!keys.length || coins.some((coin, i) => !coin || !remaining.has(keys[i]))) return phaseFail(`${keys.join(', ')}: not held coins that are still to be collected`);
				const first = Math.min(...keys.map((k) => k.split(':').map(Number)).map(([reel, row]) => reel * 1000 + row));
				if (lastKey !== '' && first <= lastKey) phaseFail('coins are collected in reel order, row by row, each once');
				lastKey = first;
				keys.forEach((k) => remaining.delete(k));
				const tierHeld = (tier) => [...held.values()].filter((h) => h.kind === 'jackpot' && h.tier === tier).length;
				if (e.type === 'jackpotWin') {
					if (coins.some((coin) => coin.kind !== 'jackpot' || coin.tier !== e.tier)) phaseFail(`positions must all be held ${e.tier} jackpot coins`);
					if (tierHeld(e.tier) < MARKERS_NEEDED) phaseFail(`${e.tier} needs ${MARKERS_NEEDED} coins held, the hold has ${tierHeld(e.tier)}`);
					if (keys.length !== tierHeld(e.tier)) phaseFail(`${e.tier} pays with every ${e.tier} coin held (${tierHeld(e.tier)}), positions lists ${keys.length}`);
					if (paidTiers.has(e.tier)) phaseFail(`${e.tier} is paid twice`);
					paidTiers.add(e.tier);
				} else if (coins[0].kind === 'jackpot') {
					if (tierHeld(coins[0].tier) >= MARKERS_NEEDED) phaseFail(`${coins[0].tier} has ${tierHeld(coins[0].tier)} coins held: it pays with jackpotWin`);
					else if (e.amount !== 0) phaseFail(`a ${coins[0].tier} coin without ${MARKERS_NEEDED} of its tier pays nothing`);
				} else if (Math.abs(Math.round((coins[0].value ?? 0) * 100) - e.amount) > 1) phaseFail(`amount ${e.amount} is not the coin's value (${Math.round((coins[0].value ?? 0) * 100)})`);
				running += e.amount;
				if (e.running !== undefined && e.running !== running) phaseFail(`running total must be ${running}, got ${e.running}`);
			}
			if (e.type === 'jackpotWin' && e.reason === 'fullGrid') {
				if (remaining.size) phaseFail('the full-grid jackpot comes after every coin is collected');
				if (held.size !== cells) phaseFail('a full-grid jackpot needs the grid full');
				if (fullGridPaid) phaseFail('the full-grid jackpot is paid twice');
				fullGridPaid = true;
				running += e.amount;
				if (e.running !== undefined && e.running !== running) phaseFail(`running total must be ${running}, got ${e.running}`);
			}
			if (e.type === 'holdEnd') {
				if (!collecting && held.size) phaseFail('holdEnd comes before the end collect');
				if (remaining.size) phaseFail(`${remaining.size} held coins were never collected`);
				if (e.total !== running) phaseFail(`total ${e.total} is not the collected running total ${running}`);
				if (e.fullGrid !== (held.size === cells)) phaseFail(`fullGrid must be ${held.size === cells}`);
				if (e.fullGrid && !fullGridPaid) phaseFail('a full grid must pay the grand jackpot (jackpotWin reason fullGrid) before holdEnd');
			}
		});
	},
];
