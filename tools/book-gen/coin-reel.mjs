#!/usr/bin/env node
// Synthetic VISUAL-TEST books for apps/coin-reel: 5x5 pays-anywhere (6+), tumbles, trigger-row
// coin reels, free-spin reels and per-reel stash multipliers in the bonus.
// NOT maths: RTP is whatever falls out. Never ship or certify these books.
// Usage: node tools/book-gen/coin-reel.mjs [baseCount=400] [bonusCount=60] [seed=7]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SDK = path.resolve(HERE, '..', '..');
const [baseCount = 400, bonusCount = 60, seedArg = 7] = process.argv.slice(2).map(Number);

// ---- deterministic rng ----
let seed = seedArg >>> 0 || 7;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
const int = (a, b) => a + Math.floor(rand() * (b - a + 1));
const pick = (weights) => {
	const total = Object.values(weights).reduce((s, w) => s + w, 0);
	let r = rand() * total;
	for (const [k, w] of Object.entries(weights)) if ((r -= w) <= 0) return k;
	return Object.keys(weights)[0];
};

// ---- game definition ----
const REELS = 5;
const ROWS = 5; // visible; books carry one padding symbol above and below (rows 0 and 6)
const TRIGGER_ROW = ROWS; // padded index of the bottom visible row
const BOOK = 100; // 100 = 1x bet
const WINCAP = 10_000 * BOOK;
const WEIGHTS = {
	basegame: { L1: 14, L2: 14, L3: 14, L4: 14, H4: 9, H3: 8, H2: 7, H1: 6, W: 0.6, S: 0.35 },
	freeSpins: { L1: 14, L2: 14, L3: 14, L4: 14, H4: 9, H3: 8, H2: 7, H1: 6, W: 1.4, S: 0.2 },
};
const SPECIALS = new Set(['W', 'S']);
// pays for 6-7, 8-9, 10, 11-12, 13+ of a kind anywhere (x bet)
const PAYS = {
	L1: [0.1, 0.2, 0.5, 1, 5], L2: [0.1, 0.2, 0.5, 1, 5], L3: [0.1, 0.2, 0.5, 1, 5], L4: [0.1, 0.2, 0.5, 1, 5],
	H4: [0.2, 0.5, 1, 2, 10], H3: [0.3, 0.6, 1.2, 2.5, 12], H2: [0.4, 0.8, 1.5, 3, 15], H1: [0.5, 1, 2, 4, 25],
};
const bucket = (n) => (n >= 13 ? 4 : n >= 11 ? 3 : n >= 10 ? 2 : n >= 8 ? 1 : 0);
const COIN_TIERS = [
	{ tier: 'bronze', p: 0.6, min: 1, max: 4 },
	{ tier: 'silver', p: 0.28, min: 5, max: 9 },
	{ tier: 'gold', p: 0.117, min: 10, max: 50 },
	{ tier: 'diamond', p: 0.003, min: 100, max: 500 },
];
const FS_PER_CELL = { 1: 50, 2: 30, 3: 12, 4: 6, 6: 2 };

const coin = () => {
	let r = rand();
	const t = COIN_TIERS.find((c) => (r -= c.p) <= 0) ?? COIN_TIERS[0];
	return { tier: t.tier, value: int(t.min, t.max) * BOOK };
};
const winLevel = (amount) => {
	const x = amount / BOOK;
	if (x <= 0) return 1;
	if (x < 1) return 2;
	if (x < 2) return 3;
	if (x < 5) return 4;
	if (x < 15) return 5;
	if (x < 30) return 6;
	if (x < 50) return 7;
	if (x < 100) return 8;
	if (amount < WINCAP) return 9;
	return 10;
};
const clone = (board) => board.map((reel) => reel.map((s) => ({ ...s })));

// One spin: reveal, tumbles, trigger-row specials. Returns win + free spins awarded.
// bonus: { kind: 'stash', values: multipliers[] } | { kind: 'collector', values: pots[] } | undefined
function playSpin({ events, gameType, bonus, forceS = 0, forceW = 0, sBoost = 1 }) {
	const weights = { ...WEIGHTS[gameType], S: WEIGHTS[gameType].S * sBoost };
	const draw = () => ({ name: pick(weights) });
	const board = Array.from({ length: REELS }, () => Array.from({ length: ROWS + 2 }, draw));
	const force = (name, count) => {
		const free = [...Array(REELS).keys()].filter((r) => !SPECIALS.has(board[r][TRIGGER_ROW].name));
		free.sort(() => rand() - 0.5).slice(0, count).forEach((r) => (board[r][TRIGGER_ROW] = { name }));
	};
	force('S', forceS);
	force('W', forceW);
	events.push({
		type: 'reveal',
		board: clone(board),
		paddingPositions: board.map(() => int(0, 200)),
		gameType,
		anticipation: board.map(() => 0),
	});

	let spinWin = 0;
	for (let step = 0; step < 12; step++) {
		const counts = {};
		board.forEach((reel, r) =>
			reel.forEach((sy, row) => {
				if (row < 1 || row > ROWS || SPECIALS.has(sy.name)) return;
				(counts[sy.name] ??= []).push({ reel: r, row });
			}),
		);
		const wins = Object.entries(counts)
			.filter(([, pos]) => pos.length >= 6)
			.map(([symbol, positions]) => {
				const win = Math.round(PAYS[symbol][bucket(positions.length)] * BOOK);
				const overlay = positions[Math.floor(positions.length / 2)];
				return { symbol, win, positions, meta: { globalMult: 1, clusterMult: 1, winWithoutMult: win, overlay } };
			});
		if (!wins.length) break;
		const stepWin = wins.reduce((a, w) => a + w.win, 0);
		spinWin += stepWin;
		events.push({ type: 'winInfo', totalWin: stepWin, wins });
		events.push({ type: 'updateTumbleWin', amount: spinWin });
		const exploding = wins.flatMap((w) => w.positions);
		const newSymbols = board.map((reel, r) => {
			const gone = exploding.filter((p) => p.reel === r).map((p) => p.row);
			const adding = gone.map(draw);
			board[r] = [...adding, ...reel.filter((_, row) => !gone.includes(row))];
			return adding;
		});
		events.push({ type: 'tumbleBoard', newSymbols, explodingSymbols: exploding });
	}

	// trigger row specials, left to right
	let freeSpins = 0;
	const fsPositions = [];
	for (let r = 0; r < REELS; r++) {
		const special = board[r][TRIGGER_ROW].name;
		if (special === 'W') {
			const coins = Array.from({ length: ROWS }, (_, i) => ({ row: i + 1, ...coin() }));
			events.push({ type: 'coinReelExpand', reel: r, coins });
			const coinSum = coins.reduce((a, c) => a + c.value, 0);
			const multiplier = bonus?.kind === 'stash' ? bonus.values[r] : 1;
			const pot = bonus?.kind === 'collector' ? bonus.values[r] : 0;
			const total = coinSum * multiplier + pot;
			events.push({ type: 'coinReelCollect', reel: r, total, multiplier, pot });
			spinWin += total;
			events.push({ type: 'updateTumbleWin', amount: spinWin });
			if (bonus?.kind === 'stash') {
				bonus.values[r] += 1;
				events.push({ type: 'stashUpdate', reel: r, multiplier: bonus.values[r] });
			}
			if (bonus?.kind === 'collector') {
				bonus.values[r] += coinSum;
				events.push({ type: 'collectorUpdate', reel: r, total: bonus.values[r] });
			}
		}
		if (special === 'S') {
			const cells = Array.from({ length: ROWS }, (_, i) => ({ row: i + 1, spins: Number(pick(FS_PER_CELL)) }));
			events.push({ type: 'freeSpinReelExpand', reel: r, cells });
			freeSpins += cells.reduce((a, c) => a + c.spins, 0);
			fsPositions.push({ reel: r, row: TRIGGER_ROW });
		}
	}
	return { spinWin, freeSpins, fsPositions };
}

// mode -> how the paid spin differs from a plain base spin
const MODE_SETUP = {
	base: {},
	boost: { sBoost: 5 }, // 5x the chance of a free-spin reel
	coinspin: { forceW: 1 }, // every spin has a coin reel on the trigger row
	bonus: { forceS: 1 }, // buys the stash bonus
	super: { forceS: 2 }, // buys the collector bonus
};

function makeBook(id, mode) {
	const events = [];
	let total = 0;
	const base = playSpin({ events, gameType: 'basegame', ...MODE_SETUP[mode] });
	total += base.spinWin;
	if (base.spinWin > 0) events.push({ type: 'setWin', amount: base.spinWin, winLevel: winLevel(base.spinWin) });
	events.push({ type: 'setTotalWin', amount: total });

	if (base.freeSpins > 0) {
		// 1 free-spin reel -> stash bonus; 2 or more -> collector bonus
		const kind = base.fsPositions.length >= 2 ? 'collector' : 'stash';
		const bonus = { kind, values: Array(REELS).fill(kind === 'stash' ? 1 : 0) };
		let spinsTotal = base.freeSpins;
		events.push({ type: 'freeSpinTrigger', totalFs: spinsTotal, positions: base.fsPositions, bonusType: kind });
		events.push(kind === 'stash' ? { type: 'stashShow', multipliers: [...bonus.values] } : { type: 'collectorShow', totals: [...bonus.values] });
		let bonusWin = 0;
		for (let spin = 1; spin <= spinsTotal && total < WINCAP; spin++) {
			events.push({ type: 'updateFreeSpin', amount: spin, total: spinsTotal });
			const sp = playSpin({ events, gameType: 'freeSpins', bonus });
			bonusWin += sp.spinWin;
			total += sp.spinWin;
			if (sp.freeSpins) {
				spinsTotal += sp.freeSpins;
				events.push({ type: 'updateFreeSpin', amount: spin, total: spinsTotal });
			}
			events.push({ type: 'setTotalWin', amount: Math.min(total, WINCAP) });
		}
		if (total >= WINCAP) {
			total = WINCAP;
			events.push({ type: 'wincap', amount: WINCAP });
		}
		events.push({ type: kind === 'stash' ? 'stashHide' : 'collectorHide' });
		events.push({ type: 'freeSpinEnd', amount: Math.min(bonusWin, WINCAP), winLevel: winLevel(bonusWin) });
	}
	events.push({ type: 'finalWin', amount: total });
	events.forEach((e, index) => (e.index = index));
	return { id, payoutMultiplier: total / BOOK, events, criteria: base.freeSpins ? 'freegame' : total ? 'basegame' : '0' };
}

const outDir = path.join(SDK, 'tools', 'mock-rgs', 'books', 'coin-reel');
fs.mkdirSync(outDir, { recursive: true });
const write = (mode, count) => {
	const books = Array.from({ length: count }, (_, i) => makeBook(i + 1, mode));
	fs.writeFileSync(path.join(outDir, `${mode}.json`), JSON.stringify(books));
	if (mode === 'base' || mode === 'bonus') {
		const story = path.join(SDK, 'apps', 'coin-reel', 'src', 'stories', 'data', `${mode}_books.ts`);
		fs.writeFileSync(story, `export default ${JSON.stringify(books.slice(0, 40), null, '	')};
`);
	}
	const mean = books.reduce((a, b) => a + b.payoutMultiplier, 0) / count;
	const withFs = books.filter((b) => b.criteria === 'freegame').length;
	console.log(`[book-gen] coin-reel ${mode}: ${count} books, mean ${mean.toFixed(2)}x, ${withFs} with free spins`);
};
write('base', baseCount);
write('boost', baseCount);
write('coinspin', baseCount);
write('bonus', bonusCount);
write('super', bonusCount);
fs.writeFileSync(
	path.join(outDir, 'modes.json'),
	JSON.stringify({ BASE: { cost: 1 }, BOOST: { cost: 3 }, COINSPIN: { cost: 50 }, BONUS: { cost: 80 }, SUPER: { cost: 200 } }),
);
