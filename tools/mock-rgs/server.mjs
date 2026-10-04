#!/usr/bin/env node
// Mock Stake-Engine RGS for local front-end work. Zero dependencies, Node >= 22.6.
// Serves books from tools/mock-rgs/books/<gameId>/<mode>.json(l) or, failing that,
// from apps/<gameId>/src/stories/data/<mode>_books.ts. See README.md.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SDK_ROOT = path.resolve(HERE, '..', '..');
const PORT = Number(process.env.MOCK_RGS_PORT || process.argv[2] || 5099);
const API = 1_000_000; // API amount 1_000_000 = 1 currency unit
const BOOK = 100; // book amount 100 = 1x bet
const START_BALANCE = 10_000 * API;
const CURRENCY = process.env.MOCK_RGS_CURRENCY || 'ZAR';

const BET_LEVELS = [
	0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10,
	12, 14, 16, 18, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 200, 500, 1000,
].map((v) => Math.round(v * API));

const JURISDICTION = {
	socialCasino: false,
	disabledFullscreen: false,
	disabledTurbo: false,
	disabledSuperTurbo: false,
	disabledAutoplay: false,
	disabledSlamstop: false,
	disabledSpacebar: false,
	disabledBuyFeature: false,
	displayNetPosition: false,
	displayRTP: false,
	displaySessionTimer: false,
	minimumRoundDuration: 0,
	disabledMissions: true,
	disabledNoticeBar: true,
};

// ---------- book loading ----------
const cache = new Map(); // `${gameId}/${mode}` -> book[]
const configCache = new Map();

const readBooksFile = async (file) => {
	if (file.endsWith('.ts') || file.endsWith('.mjs') || file.endsWith('.js')) {
		const mod = await import(pathToFileURL(file).href);
		return mod.default;
	}
	const text = fs.readFileSync(file, 'utf8');
	if (file.endsWith('.jsonl')) {
		return text
			.split(/\r?\n/)
			.filter(Boolean)
			.map((line) => JSON.parse(line));
	}
	return JSON.parse(text);
};

const bookFileCandidates = (gameId, mode) => {
	const m = mode.toLowerCase();
	const own = path.join(HERE, 'books', gameId);
	const story = path.join(SDK_ROOT, 'apps', gameId, 'src', 'stories', 'data');
	return [
		path.join(own, `${m}.jsonl`),
		path.join(own, `${m}.json`),
		path.join(own, `${m}.mjs`),
		path.join(story, `${m}_books.ts`),
	];
};

const loadBooks = async (gameId, mode) => {
	const key = `${gameId}/${mode.toLowerCase()}`;
	if (cache.has(key)) return cache.get(key);
	const file = bookFileCandidates(gameId, mode).find((f) => fs.existsSync(f));
	if (!file) return null;
	const books = await readBooksFile(file);
	console.log(`[mock-rgs] loaded ${books.length} books for ${key} from ${path.relative(SDK_ROOT, file)}`);
	cache.set(key, books);
	return books;
};

const loadBetModes = async (gameId) => {
	if (configCache.has(gameId)) return configCache.get(gameId);
	let betModes = null;
	const own = path.join(HERE, 'books', gameId, 'modes.json');
	const appConfig = path.join(SDK_ROOT, 'apps', gameId, 'src', 'game', 'config.ts');
	try {
		if (fs.existsSync(own)) betModes = JSON.parse(fs.readFileSync(own, 'utf8'));
		else if (fs.existsSync(appConfig)) {
			const cfg = (await import(pathToFileURL(appConfig).href)).default;
			betModes = Object.fromEntries(
				Object.entries(cfg.betModes ?? {}).map(([k, v]) => [k.toUpperCase(), { cost: v.cost }]),
			);
		}
	} catch (e) {
		console.warn(`[mock-rgs] could not read bet modes for ${gameId}: ${e.message}`);
	}
	betModes ??= { BASE: { cost: 1 }, BONUS: { cost: 100 } };
	configCache.set(gameId, betModes);
	return betModes;
};

// Final win in book units: prefer the last finalWin/setTotalWin event, else payoutMultiplier.
const bookWin = (book) => {
	const events = book.events ?? book.state ?? [];
	const final = [...events].reverse().find((e) => e.type === 'finalWin' || e.type === 'setTotalWin');
	if (final && typeof final.amount === 'number') return final.amount;
	return Math.round((book.payoutMultiplier ?? 0) * BOOK);
};

// ---------- sessions ----------
const sessions = new Map(); // sessionID -> { balance, gameId, round, roundSeq }
const queue = new Map(); // `${gameId}/${MODE}` -> [bookId,...]
let roundSeq = 1000;

const session = (sessionID, gameId) => {
	if (!sessions.has(sessionID)) sessions.set(sessionID, { balance: START_BALANCE, gameId, round: null });
	const s = sessions.get(sessionID);
	if (gameId) s.gameId = gameId;
	return s;
};

const pickBook = (books, gameId, mode) => {
	const q = queue.get(`${gameId}/${mode}`);
	if (q?.length) {
		const id = q.shift();
		const forced = books.find((b) => String(b.id) === String(id));
		if (forced) return forced;
		console.warn(`[mock-rgs] queued book ${id} not found, picking random`);
	}
	return books[Math.floor(Math.random() * books.length)];
};

const balanceObj = (s) => ({ amount: s.balance, currency: CURRENCY });

// ---------- handlers ----------
const handlers = {
	'/wallet/authenticate': async (body) => {
		const gameId = body.gameId || body.game_id || 'lines';
		const s = session(body.sessionID, gameId);
		const betModes = await loadBetModes(gameId);
		return {
			balance: balanceObj(s),
			config: {
				gameID: gameId,
				minBet: BET_LEVELS[0],
				maxBet: BET_LEVELS.at(-1),
				stepBet: 10_000,
				defaultBetLevel: 1 * API,
				betLevels: BET_LEVELS,
				betModes: Object.fromEntries(
					Object.entries(betModes).map(([k, v]) => [k, { mode: k, costMultiplier: v.cost, feature: k !== 'BASE' }]),
				),
				jurisdiction: JURISDICTION,
			},
			round: s.round?.active ? s.round : null,
		};
	},
	'/wallet/balance': async (body) => ({ balance: balanceObj(session(body.sessionID)) }),
	'/wallet/play': async (body) => {
		const s = session(body.sessionID);
		const mode = String(body.mode || 'BASE').toUpperCase();
		const betModes = await loadBetModes(s.gameId);
		const cost = betModes[mode]?.cost ?? 1;
		const amount = Number(body.amount);
		const debit = Math.round(amount * cost);
		if (s.round?.active) return { error: { code: 'ERR_VAL', message: 'round still active' } };
		if (debit > s.balance) return { error: { code: 'ERR_IPB', message: 'insufficient balance' } };
		const books = await loadBooks(s.gameId, mode);
		if (!books?.length) {
			return { error: { code: 'ERR_VAL', message: `no books for ${s.gameId}/${mode} (see tools/mock-rgs/README.md)` } };
		}
		const book = pickBook(books, s.gameId, mode);
		const win = bookWin(book);
		const payoutMultiplier = win / BOOK;
		const payout = Math.round(amount * payoutMultiplier);
		s.balance -= debit;
		s.round = {
			roundID: ++roundSeq,
			amount,
			payout,
			payoutMultiplier,
			active: payout > 0,
			mode,
			event: null,
			state: book.events ?? book.state,
			bookID: book.id,
		};
		console.log(`[mock-rgs] ${s.gameId}/${mode} book=${book.id} bet=${amount / API} win=${payout / API}`);
		if (!s.round.active) s.round = { ...s.round, active: false };
		return { balance: balanceObj(s), round: s.round };
	},
	'/wallet/end-round': async (body) => {
		const s = session(body.sessionID);
		if (s.round?.active) {
			s.balance += s.round.payout;
			s.round.active = false;
		}
		return { balance: balanceObj(s) };
	},
	'/bet/event': async (body) => {
		const s = session(body.sessionID);
		if (s.round) s.round.event = body.event;
		return { event: body.event };
	},
	// ---- test helpers (not part of the real RGS) ----
	'/mock/queue': async (body) => {
		const key = `${body.gameId}/${String(body.mode || 'BASE').toUpperCase()}`;
		const ids = [].concat(body.id ?? body.ids ?? []);
		queue.set(key, [...(queue.get(key) ?? []), ...ids]);
		return { queued: queue.get(key) };
	},
	'/mock/reset': async (body) => {
		if (body.sessionID) sessions.delete(body.sessionID);
		else sessions.clear();
		queue.clear();
		cache.clear();
		configCache.clear();
		return { ok: true };
	},
};

// GET /mock/books/<gameId>/<mode>?minWin=&event=<type> -> list of {id, win, events}
const listBooks = async (gameId, mode, params) => {
	const books = (await loadBooks(gameId, mode)) ?? [];
	const minWin = Number(params.get('minWin') ?? 0);
	const eventType = params.get('event');
	return books
		.map((b) => ({ id: b.id, winX: bookWin(b) / BOOK, events: [...new Set((b.events ?? []).map((e) => e.type))] }))
		.filter((b) => b.winX >= minWin && (!eventType || b.events.includes(eventType)))
		.slice(0, Number(params.get('limit') ?? 50));
};

const send = (res, status, data) => {
	res.writeHead(status, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
	});
	res.end(JSON.stringify(data));
};

http
	.createServer(async (req, res) => {
		const url = new URL(req.url, `http://${req.headers.host}`);
		try {
			if (req.method === 'OPTIONS') return send(res, 204, {});
			if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true });
			if (req.method === 'GET' && url.pathname === '/promos/active') return send(res, 200, { promos: [] });
			if (req.method === 'GET' && url.pathname.startsWith('/mock/books/')) {
				const [, , , gameId, mode = 'BASE'] = url.pathname.split('/');
				return send(res, 200, await listBooks(gameId, mode, url.searchParams));
			}
			const handler = handlers[url.pathname];
			if (!handler) return send(res, 404, { error: { code: 'ERR_NF', message: url.pathname } });
			let raw = '';
			for await (const chunk of req) raw += chunk;
			const body = raw ? JSON.parse(raw) : {};
			return send(res, 200, await handler(body));
		} catch (e) {
			console.error('[mock-rgs]', e);
			return send(res, 500, { error: { code: 'ERR_GEN', message: e.message } });
		}
	})
	.listen(PORT, '0.0.0.0', () => console.log(`[mock-rgs] listening on http://localhost:${PORT}`));
