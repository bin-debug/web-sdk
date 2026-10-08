// Hold and win, jackpots, refill respins (BOOK-EVENTS.md "Hold and win")
import { num, str, bool, oneOf, positions, coins, symbolGrid, TIERS } from '../helpers.mjs';

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
	holdEnd(e, c) {
		num(e, c, 'total', { min: 0 });
		bool(e, c, 'fullGrid');
	},
	jackpotWin(e, c) {
		oneOf(e, c, 'tier', TIERS);
		num(e, c, 'amount', { min: 0 });
		positions(e, c, 'positions', { optional: true });
	},
	respinCounter(e, c) {
		num(e, c, 'remaining', { min: 0, int: true });
		bool(e, c, 'reset');
	},
};

// Whole-round checks (run once per book after the per-event rules). Hold and win is only valid as a real round:
// the trigger coins are the C symbols the base spin landed, and a jackpot is paid exactly when 3+ markers of one tier are held.
const MARKERS_NEEDED = 3;
const key = (p) => `${p.reel}:${p.row}`;
export const bookRules = [
	(book, c) => {
		const events = book.events;
		const startAt = events.findIndex((e) => e?.type === 'holdStart');
		if (startAt < 0) return;
		const start = events[startAt];
		const reveal = [...events.slice(0, startAt)].reverse().find((e) => e?.type === 'reveal');
		const triggerCells = new Set();
		(reveal?.board ?? []).forEach((reel, r) => reel.forEach((sym, row) => sym?.name === 'C' && triggerCells.add(`${r}:${row - 1}`)));
		if (triggerCells.size) {
			const coinCells = new Set((start.coins ?? []).map((coin) => key(coin.pos)));
			const same = triggerCells.size === coinCells.size && [...triggerCells].every((cell) => coinCells.has(cell));
			if (!same) c.fail(startAt, 'holdStart', 'coins must sit exactly on the C symbols the reveal landed (reveal rows are padded: visible row + 1)');
		}
		const markers = new Map(); // cell -> tier, as the hold goes
		const take = (list) => (list ?? []).forEach((coin) => coin?.kind === 'jackpot' && markers.set(key(coin.pos), coin.tier));
		take(start.coins);
		let lastRespin = startAt;
		const paid = new Set();
		events.forEach((e, i) => {
			if (i <= startAt) return;
			if (e?.type === 'respin') {
				if (paid.size) c.fail(i, 'respin', 'a respin comes after a jackpotWin: jackpots pay once, when the hold ends');
				take(e.new);
				lastRespin = i;
			}
			if (e?.type === 'jackpotWin') {
				if (i < lastRespin) c.fail(i, 'jackpotWin', 'jackpotWin must come after the last respin');
				const held = [...markers].filter(([, tier]) => tier === e.tier).map(([cell]) => cell);
				if (held.length < MARKERS_NEEDED) c.fail(i, 'jackpotWin', `${e.tier} needs ${MARKERS_NEEDED} markers held, the hold has ${held.length}`);
				if (!Array.isArray(e.positions) || !e.positions.length || e.positions.some((p) => markers.get(key(p)) !== e.tier)) c.fail(i, 'jackpotWin', `positions must list held ${e.tier} markers`);
				if (paid.has(e.tier)) c.fail(i, 'jackpotWin', `${e.tier} is paid twice`);
				paid.add(e.tier);
			}
			if (e?.type === 'holdEnd') {
				for (const tier of new Set(markers.values())) {
					const n = [...markers.values()].filter((t) => t === tier).length;
					if (n >= MARKERS_NEEDED && !paid.has(tier)) c.fail(i, 'holdEnd', `${n} ${tier} markers are held but no jackpotWin pays them`);
				}
			}
		});
	},
];
