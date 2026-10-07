#!/usr/bin/env node
// Synthetic VISUAL-TEST books for every shell (games/<id>/game.spec.json): valid boards for the topology,
// every pay type, tumbles, free spins (with retrigger), global multiplier, bonus buys, boosts, win cap.
// NOT maths: RTP is whatever falls out. Never ship or certify these books.
// Usage: node tools/book-gen/shell.mjs [gameId ...] [--count=300] [--bonus=60] [--seed=7]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SDK = path.resolve(HERE, '..', '..');
const args = process.argv.slice(2);
const flag = (name, def) => Number((args.find((a) => a.startsWith(`--${name}=`)) ?? '').split('=')[1] ?? def);
const COUNT = flag('count', 300);
const BONUS_COUNT = flag('bonus', 60);
const SEED = flag('seed', 7);
const gameIds = args.filter((a) => !a.startsWith('--'));

const BOOK = 100; // 100 = 1x bet
const PAY_SCALE = 1.0; // demo pays: tuned so base games feel plausible (visual tests, not maths)
const WINCAP = 5000 * BOOK;

// ---- deterministic rng (re-seeded per game) ----
let seed = SEED >>> 0;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
const int = (a, b) => a + Math.floor(rand() * (b - a + 1));
const pick = (weights) => {
	const total = Object.values(weights).reduce((s, w) => s + w, 0);
	let r = rand() * total;
	for (const [k, w] of Object.entries(weights)) if ((r -= w) <= 0) return k;
	return Object.keys(weights)[0];
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

// ---- spec helpers ----
function loadSpec(id) {
	const raw = JSON.parse(fs.readFileSync(path.join(SDK, 'games', id, 'game.spec.json'), 'utf8'));
	const pays = raw.pays ?? { type: 'lines', lines: 20 };
	return {
		...raw,
		pays,
		reveal: raw.reveal ?? (pays.type === 'lines' || pays.type === 'ways' ? 'spin' : 'drop'),
		symbols: { low: 4, high: 4, wild: true, scatter: true, ...(raw.symbols ?? {}) },
		features: raw.features ?? [],
		bonuses: raw.bonuses ?? [],
		boosts: raw.boosts ?? [],
		buys: raw.buys ?? [],
	};
}

const triggerCount = (b) => Number((b.trigger ?? '3 S').split(' ')[0]) || 3;

// ---- pay tables (demo values) ----
function buildPays(spec) {
	const pays = {};
	for (let i = 1; i <= spec.symbols.low; i++) pays[`L${i}`] = (0.08 + i * 0.03) * PAY_SCALE;
	for (let i = 1; i <= spec.symbols.high; i++) pays[`H${i}`] = (0.5 + (spec.symbols.high - i + 1) * 0.45) * PAY_SCALE;
	return pays;
}

// N deterministic paylines for any reels x rows: the straight rows first, then seeded random walks (step -1/0/+1)
function buildLines(spec) {
	const { reels, rows } = spec.board;
	const want = spec.pays.lines ?? 20;
	const lines = [];
	for (let r = 0; r < rows; r++) lines.push(Array(reels).fill(r));
	let s = 99991;
	const r2 = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
	let guard = 0;
	while (lines.length < want && guard++ < 5000) {
		const line = [Math.floor(r2() * rows)];
		for (let c = 1; c < reels; c++) line.push(Math.max(0, Math.min(rows - 1, line[c - 1] + Math.floor(r2() * 3) - 1)));
		const key = line.join('');
		if (!lines.some((l) => l.join('') === key)) lines.push(line);
	}
	return lines;
}

// ---- win evaluators: return [{ symbol, win, positions, meta }] ; rows are PADDED (visible row + 1) ----
function evalLines(spec, board, pays, lines, mult) {
	const wins = [];
	const { reels } = spec.board;
	lines.forEach((line, lineIndex) => {
		const cells = line.map((row, reel) => ({ reel, row: row + 1, name: board[reel][row + 1].name }));
		let base = cells.find((c) => c.name !== 'W' && c.name !== 'S');
		if (!base) return;
		const sym = base.name;
		let len = 0;
		for (const c of cells) {
			if (c.name === sym || c.name === 'W') len++;
			else break;
		}
		if (len < 3 || !pays[sym]) return;
		const win = Math.round(pays[sym] * (len === 3 ? 1 : len === 4 ? 4 : 12) * BOOK);
		wins.push({ symbol: sym, win: win * mult, positions: cells.slice(0, len).map(({ reel, row }) => ({ reel, row })), meta: { lineIndex, globalMult: mult, winWithoutMult: win } });
	});
	return wins;
}

function evalWays(spec, board, pays, mult) {
	const wins = [];
	const { reels, rows } = spec.board;
	for (const sym of Object.keys(pays)) {
		const perReel = [];
		for (let r = 0; r < reels; r++) {
			const hit = [];
			for (let row = 1; row <= rows; row++) if (board[r][row].name === sym || board[r][row].name === 'W') hit.push({ reel: r, row });
			if (!hit.length) break;
			perReel.push(hit);
		}
		if (perReel.length < 3) continue;
		const ways = perReel.reduce((a, h) => a * h.length, 1);
		const len = perReel.length;
		const win = Math.round(pays[sym] * (len === 3 ? 1 : len === 4 ? 3 : 8) * ways * BOOK * 0.5);
		wins.push({ symbol: sym, win: win * mult, positions: perReel.flat(), meta: { globalMult: mult, winWithoutMult: win, ways } });
	}
	return wins;
}

const buckets = (n, min) => Math.min(4, Math.floor((n - min) / 2));
function evalScatter(spec, board, pays, mult) {
	const { reels, rows } = spec.board;
	const min = spec.pays.min ?? 8;
	const counts = {};
	for (let r = 0; r < reels; r++)
		for (let row = 1; row <= rows; row++) {
			const n = board[r][row].name;
			if (n === 'S' || n === 'W') continue;
			(counts[n] ??= []).push({ reel: r, row });
		}
	return Object.entries(counts)
		.filter(([, pos]) => pos.length >= min)
		.map(([symbol, positions]) => {
			const win = Math.round(pays[symbol] * [1, 2.2, 4.5, 9, 22][buckets(positions.length, min)] * BOOK * 2);
			const overlay = positions[Math.floor(positions.length / 2)];
			return { symbol, win: win * mult, positions, meta: { globalMult: mult, winWithoutMult: win, overlay } };
		});
}

function evalCluster(spec, board, pays, mult) {
	const { reels, rows } = spec.board;
	const min = spec.pays.min ?? 5;
	const seen = Array.from({ length: reels }, () => Array(rows + 2).fill(false));
	const wins = [];
	for (let r = 0; r < reels; r++)
		for (let row = 1; row <= rows; row++) {
			if (seen[r][row]) continue;
			const sym = board[r][row].name;
			if (sym === 'S' || sym === 'W' || !pays[sym]) continue;
			const stack = [[r, row]];
			const cells = [];
			seen[r][row] = true;
			while (stack.length) {
				const [cr, crow] = stack.pop();
				cells.push({ reel: cr, row: crow });
				for (const [dr, drow] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
					const nr = cr + dr;
					const nrow = crow + drow;
					if (nr < 0 || nr >= reels || nrow < 1 || nrow > rows || seen[nr][nrow]) continue;
					if (board[nr][nrow].name !== sym) continue;
					seen[nr][nrow] = true;
					stack.push([nr, nrow]);
				}
			}
			if (cells.length < min) continue;
			const win = Math.round(pays[sym] * Math.pow(cells.length / min, 1.6) * 3 * BOOK);
			wins.push({ symbol: sym, win: win * mult, positions: cells, meta: { globalMult: mult, winWithoutMult: win, clusterMult: 1, overlay: cells[Math.floor(cells.length / 2)] } });
		}
	return wins;
}

// ---- generator ----
function makeGame(spec) {
	const { reels, rows } = spec.board;
	const pays = buildPays(spec);
	const lines = spec.pays.type === 'lines' ? buildLines(spec) : [];
	const hasWild = spec.symbols.wild;
	const hasTumble = spec.features.includes('tumble');
	const hasGlobalMult = spec.features.includes('globalMultiplier');
	const names = [];
	for (let i = 1; i <= spec.symbols.low; i++) names.push(`L${i}`);
	for (let i = 1; i <= spec.symbols.high; i++) names.push(`H${i}`);
	const weightsFor = (gameType, sBoost = 1) => {
		const w = {};
		for (let i = 1; i <= spec.symbols.low; i++) w[`L${i}`] = 22;
		for (let i = 1; i <= spec.symbols.high; i++) w[`H${i}`] = 4 + i * 2.2;
		if (hasWild) w.W = gameType === 'freegame' ? 3.0 : 2.4;
		if (spec.symbols.scatter) w.S = (gameType === 'freegame' ? 0.8 : 1.5) * sBoost;
		return w;
	};
	const draw = (weights) => ({ name: pick(weights) });
	const evalWins = (board, mult) =>
		spec.pays.type === 'lines' ? evalLines(spec, board, pays, lines, mult)
		: spec.pays.type === 'ways' ? evalWays(spec, board, pays, mult)
		: spec.pays.type === 'scatter' ? evalScatter(spec, board, pays, mult)
		: evalCluster(spec, board, pays, mult);

	const trigger = (bonus) => triggerCount(bonus ?? spec.bonuses[0] ?? { trigger: '3 S' });

	// one spin: reveal, wins (with tumbles when the shell tumbles), returns what happened
	function playSpin({ events, gameType, forceS = 0, sBoost = 1, mult = 1, multState }) {
		const weights = weightsFor(gameType, sBoost);
		const board = Array.from({ length: reels }, () => Array.from({ length: rows + 2 }, () => draw(weights)));
		// no accidental scatters unless asked (keeps free-spin frequency under control with forced counts)
		if (forceS) {
			const free = [...Array(reels).keys()].sort(() => rand() - 0.5).slice(0, forceS);
			free.forEach((r) => (board[r][int(1, rows)] = { name: 'S' }));
		}
		// at most one scatter per reel
		board.forEach((reel) => {
			let seenS = false;
			reel.forEach((s, row) => {
				if (s.name === 'S') {
					if (seenS || row === 0 || row === rows + 1) reel[row] = draw({ ...weights, S: 0 });
					seenS = true;
				}
			});
		});
		const sPositions = [];
		board.forEach((reel, r) => reel.forEach((s, row) => row >= 1 && row <= rows && s.name === 'S' && sPositions.push({ reel: r, row })));
		// anticipation: slow the reels after the (trigger-1)th scatter
		const needed = trigger();
		const anticipation = Array(reels).fill(0);
		let seen = 0;
		for (let r = 0; r < reels; r++) {
			if (seen >= needed - 1 && sPositions.length >= needed) anticipation[r] = 1;
			seen += sPositions.filter((p) => p.reel === r).length;
		}
		events.push({ type: 'reveal', board: clone(board), paddingPositions: board.map(() => int(0, 59)), gameType, anticipation });

		let spinWin = 0;
		const steps = hasTumble ? 12 : 1;
		for (let step = 0; step < steps; step++) {
			const m = hasGlobalMult && gameType === 'freegame' ? multState.value : 1;
			const wins = evalWins(board, m);
			if (!wins.length) break;
			const stepWin = wins.reduce((a, w) => a + w.win, 0);
			spinWin += stepWin;
			events.push({ type: 'winInfo', totalWin: stepWin, wins });
			if (hasTumble) {
				events.push({ type: 'updateTumbleWin', amount: spinWin });
				const exploding = wins.flatMap((w) => w.positions);
				const wd = weightsFor(gameType);
				const newSymbols = board.map((reel, r) => {
					const gone = exploding.filter((p) => p.reel === r).map((p) => p.row);
					const adding = gone.map(() => draw({ ...wd, S: 0 }));
					board[r] = [...adding, ...reel.filter((_, row) => !gone.includes(row))];
					return adding;
				});
				events.push({ type: 'tumbleBoard', newSymbols, explodingSymbols: exploding });
				if (hasGlobalMult && gameType === 'freegame') {
					multState.value += 1;
					events.push({ type: 'updateGlobalMult', globalMult: multState.value });
				}
			} else if (hasGlobalMult && gameType === 'freegame') {
				multState.value += 1;
				events.push({ type: 'updateGlobalMult', globalMult: multState.value });
			}
		}
		return { spinWin, scatters: sPositions.length, sPositions };
	}

	function makeBook(id, mode, setup = {}) {
		const events = [];
		let total = 0;
		const bonus = setup.bonus;
		const base = playSpin({ events, gameType: 'basegame', forceS: setup.forceS ?? 0, sBoost: setup.sBoost ?? 1 });
		total += base.spinWin;
		if (base.spinWin > 0) events.push({ type: 'setWin', amount: base.spinWin, winLevel: winLevel(base.spinWin) });
		events.push({ type: 'setTotalWin', amount: total });

		const needed = trigger(bonus);
		if (base.scatters >= needed) {
			const b = bonus ?? spec.bonuses.find((x) => triggerCount(x) <= base.scatters) ?? spec.bonuses[0];
			let spinsTotal = (b?.spins ?? 10) + (base.scatters - triggerCount(b ?? { trigger: '3 S' })) * 2;
			events.push({ type: 'freeSpinTrigger', totalFs: spinsTotal, positions: base.sPositions, bonusType: b?.id ?? 'BONUS', bonusName: b?.name });
			const multState = { value: 1 };
			if (hasGlobalMult) events.push({ type: 'updateGlobalMult', globalMult: 1 });
			let bonusWin = 0;
			let retriggers = 0;
			for (let spin = 1; spin <= spinsTotal && total < WINCAP; spin++) {
				events.push({ type: 'updateFreeSpin', amount: spin, total: spinsTotal });
				const sp = playSpin({ events, gameType: 'freegame', multState, forceS: setup.forceRetrigger && spin === 2 ? 3 : 0 });
				bonusWin += sp.spinWin;
				total += sp.spinWin;
				if (sp.scatters >= 3 && retriggers < 2) {
					retriggers++;
					spinsTotal += 5;
					events.push({ type: 'updateFreeSpin', amount: spin, total: spinsTotal });
				}
				events.push({ type: 'setTotalWin', amount: Math.min(total, WINCAP) });
			}
			if (setup.forceMax) {
				total = WINCAP;
				bonusWin = WINCAP;
				events.push({ type: 'setTotalWin', amount: WINCAP });
			}
			if (total >= WINCAP) {
				total = WINCAP;
				events.push({ type: 'wincap', amount: WINCAP });
			}
			events.push({ type: 'freeSpinEnd', amount: Math.min(bonusWin, WINCAP), winLevel: winLevel(bonusWin) });
		}
		events.push({ type: 'finalWin', amount: total });
		events.forEach((e, index) => (e.index = index));
		const criteria = events.some((e) => e.type === 'freeSpinTrigger') ? 'freegame' : total ? 'basegame' : '0';
		return { id, payoutMultiplier: total / BOOK, events, criteria };
	}

	return { makeBook };
}

async function generate(id) {
	seed = SEED >>> 0;
	const spec = loadSpec(id);
	const { makeBook } = makeGame(spec);
	const outDir = path.join(SDK, 'tools', 'mock-rgs', 'books', id);
	fs.mkdirSync(outDir, { recursive: true });
	const modes = { BASE: { cost: 1 } };
	const write = (mode, books) => {
		fs.writeFileSync(path.join(outDir, `${mode.toLowerCase()}.json`), JSON.stringify(books));
		const natural = books.filter((b) => b.payoutMultiplier < WINCAP / BOOK);
		const mean = natural.reduce((a, b) => a + b.payoutMultiplier, 0) / natural.length;
		const hit = natural.filter((b) => b.payoutMultiplier > 0).length / natural.length;
		const fs_ = books.filter((b) => b.criteria === 'freegame').length;
		console.log(`[book-gen] ${id} ${mode}: ${books.length} books, mean ${mean.toFixed(2)}x (no cap books), hit ${(hit * 100).toFixed(0)}%, ${fs_} with free spins`);
	};

	const base = Array.from({ length: COUNT }, (_, i) => makeBook(i + 1, 'BASE'));
	// scenario books: a bonus with a retrigger, and a win-capped bonus (visual tests of those moments)
	const first = spec.bonuses[0];
	if (first) {
		base.push(makeBook(COUNT + 1, 'BASE', { bonus: first, forceS: triggerCount(first), forceRetrigger: true }));
		base.push(makeBook(COUNT + 2, 'BASE', { bonus: first, forceS: triggerCount(first), forceMax: true }));
		base.push(makeBook(COUNT + 3, 'BASE', { bonus: first, forceS: triggerCount(first) + 1 }));
	}
	// feature scenario books (tools/book-gen/features/<featureId>.mjs, `export function scenarios(ctx)`): appended to BASE after the generic books
	const lowHigh = Array.from({ length: spec.symbols.low }, (_, i) => `L${i + 1}`).concat(Array.from({ length: spec.symbols.high }, (_, i) => `H${i + 1}`));
	const randomBoard = () => Array.from({ length: spec.board.reels }, () => Array.from({ length: spec.board.rows + 2 }, () => ({ name: lowHigh[int(0, lowHigh.length - 1)] })));
	for (const featureId of spec.features) {
		const file = path.join(HERE, 'features', `${featureId}.mjs`);
		if (!fs.existsSync(file)) continue;
		const { scenarios } = await import(pathToFileURL(file).href);
		const extra = scenarios({ spec, rand, int, pick, BOOK, winLevel, WINCAP, randomBoard, firstId: base.length + 1 });
		base.push(...extra);
		console.log(`[book-gen] ${id} ${featureId}: ${extra.length} scenario books in BASE (ids ${extra[0]?.id}-${extra[extra.length - 1]?.id})`);
	}
	write('BASE', base);

	for (const bonus of spec.bonuses) {
		const buy = spec.buys.find((b) => b.mode === bonus.id);
		modes[bonus.id] = { cost: buy?.cost ?? 100 };
		const books = Array.from({ length: BONUS_COUNT }, (_, i) => makeBook(i + 1, bonus.id, { bonus, forceS: triggerCount(bonus) }));
		books.push(makeBook(BONUS_COUNT + 1, bonus.id, { bonus, forceS: triggerCount(bonus), forceRetrigger: true }));
		books.push(makeBook(BONUS_COUNT + 2, bonus.id, { bonus, forceS: triggerCount(bonus), forceMax: true }));
		write(bonus.id, books);
	}
	for (const boost of spec.boosts) {
		modes[boost.id] = { cost: boost.cost };
		write(boost.id, Array.from({ length: COUNT }, (_, i) => makeBook(i + 1, boost.id, { sBoost: 5 })));
	}
	fs.writeFileSync(path.join(outDir, 'modes.json'), JSON.stringify(modes));
}

const all = fs.readdirSync(path.join(SDK, 'games')).filter((d) => fs.existsSync(path.join(SDK, 'games', d, 'game.spec.json')));
for (const id of gameIds.length ? gameIds : all) await generate(id);
