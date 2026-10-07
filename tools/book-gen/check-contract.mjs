#!/usr/bin/env node
// Validates books against docs/features/BOOK-EVENTS.md so synthetic (book-gen) and real (math-sdk) books are held to the same shapes.
// Usage: node tools/book-gen/check-contract.mjs <gameId> [--books=<file|dir>] [--board=RxC] [--max=50] [--quiet]
//   books default to tools/mock-rgs/books/<gameId>/*.json|jsonl ; --books takes a .json array, a math-sdk books_*.jsonl(.zst), or a directory of them
//   board comes from games/<gameId>/game.spec.json unless --board=reelsXrows is given
// One line per problem: `<file> book <id> event <index> <type>: <message>`. Exit code 1 on any problem.
// Rules live in tools/book-gen/contract/rules/*.mjs (each exports `rules = { eventType: (event, ctx) => void }`).
// A feature session adds rules for its events there and one deliberately bad book per rule to tools/book-gen/contract-tests/.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { pathToFileURL, fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SDK = path.resolve(HERE, '..', '..');

export async function loadRules() {
	const dir = path.join(HERE, 'contract', 'rules');
	const all = {};
	for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.mjs')).sort()) {
		const { rules } = await import(pathToFileURL(path.join(dir, f)).href);
		for (const [type, fn] of Object.entries(rules)) {
			if (all[type]) throw new Error(`contract rule "${type}" is defined twice (${f})`);
			all[type] = fn;
		}
	}
	return all;
}

export function readBooks(file) {
	let buf = fs.readFileSync(file);
	let name = file;
	if (name.endsWith('.zst')) {
		if (!zlib.zstdDecompressSync) throw new Error('reading .zst needs Node 22.15+ (zlib.zstdDecompressSync)');
		buf = zlib.zstdDecompressSync(buf);
		name = name.slice(0, -4);
	}
	const text = buf.toString('utf8');
	if (name.endsWith('.jsonl')) return text.split(/\r?\n/).filter((l) => l.trim()).map((l, i) => {
		try {
			return JSON.parse(l);
		} catch (err) {
			return { __parseError: `line ${i + 1}: ${err.message}` };
		}
	});
	const v = JSON.parse(text);
	return Array.isArray(v) ? v : [v];
}

function bookFiles(p) {
	if (!fs.existsSync(p)) return [];
	if (fs.statSync(p).isFile()) return [p];
	return fs
		.readdirSync(p)
		.filter((n) => /\.(json|jsonl|jsonl\.zst)$/.test(n) && n !== 'modes.json' && n !== 'index.json')
		.sort()
		.map((n) => path.join(p, n));
}

// returns problems: [{ file, bookId, index, type, message }]
export function checkBooks(books, { rules, board, file = '' }) {
	const problems = [];
	books.forEach((book, pos) => {
		const bookId = book?.id ?? `#${pos}`;
		const add = (index, type, message) => problems.push({ file, bookId, index, type, message });
		if (book?.__parseError) return add('-', '-', `not valid JSON (${book.__parseError})`);
		if (!book || typeof book !== 'object') return add('-', '-', 'book must be an object');
		if (!Number.isInteger(book.id)) add('-', '-', `id must be an integer, got ${JSON.stringify(book.id)}`);
		if (typeof book.payoutMultiplier !== 'number') add('-', '-', `payoutMultiplier must be a number, got ${JSON.stringify(book.payoutMultiplier)}`);
		if (!Array.isArray(book.events) || !book.events.length) return add('-', '-', 'events must be a non-empty array');
		const walk = (events, nested) => {
			events.forEach((e, i) => {
				const type = e?.type ?? '?';
				const fail = (m) => add(e?.index ?? i, type, nested ? `(in snapshot) ${m}` : m);
				if (!e || typeof e !== 'object') return fail('event must be an object');
				if (!nested && e.index !== i) fail(`index must be sequential: expected ${i}, got ${JSON.stringify(e.index)}`);
				if (nested && !Number.isInteger(e.index)) fail(`index must be an integer, got ${JSON.stringify(e.index)}`);
				if (typeof e.type !== 'string') return fail('type is missing');
				const rule = rules[e.type];
				if (!rule) return fail('unknown event type (not in BOOK-EVENTS.md or the SDK events)');
				rule(e, { board, fail });
				if (e.type === 'createBonusSnapshot' && Array.isArray(e.bookEvents)) walk(e.bookEvents, true);
			});
		};
		if (Array.isArray(book.events)) walk(book.events, false);
	});
	return problems;
}

function loadBoard(gameId, boardArg) {
	if (boardArg) {
		const m = /^(\d+)x(\d+)$/i.exec(boardArg);
		if (!m) throw new Error('--board must look like 5x3 (reels x rows)');
		return { reels: Number(m[1]), rows: Number(m[2]) };
	}
	const specPath = path.join(SDK, 'games', gameId, 'game.spec.json');
	if (!fs.existsSync(specPath)) throw new Error(`no spec at games/${gameId}/game.spec.json; pass --board=5x3`);
	const { reels, rows } = JSON.parse(fs.readFileSync(specPath, 'utf8')).board ?? {};
	if (!reels || !rows) throw new Error(`games/${gameId}/game.spec.json has no board.reels/board.rows`);
	return { reels, rows };
}

async function main() {
	const args = process.argv.slice(2);
	const opt = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
	const gameId = args.find((a) => !a.startsWith('--'));
	if (!gameId) {
		console.error('usage: check-contract.mjs <gameId> [--books=<file|dir>] [--board=RxC] [--max=50]');
		process.exit(2);
	}
	const max = Number(opt('max') ?? 50);
	let board;
	try {
		board = loadBoard(gameId, opt('board'));
	} catch (err) {
		console.error(`check-contract: ${err.message}`);
		process.exit(2);
	}
	const src = opt('books') ?? path.join(SDK, 'tools', 'mock-rgs', 'books', gameId);
	const files = bookFiles(src);
	if (!files.length) {
		console.error(`check-contract: no books found at ${src} (run node tools/book-gen/shell.mjs ${gameId})`);
		process.exit(2);
	}
	const rules = await loadRules();
	let total = 0;
	let bad = 0;
	const lines = [];
	for (const file of files) {
		const books = readBooks(file);
		const problems = checkBooks(books, { rules, board, file: path.basename(file) });
		total += books.length;
		bad += new Set(problems.map((p) => `${p.file}:${p.bookId}`)).size;
		for (const p of problems) lines.push(`${p.file} book ${p.bookId} event ${p.index} ${p.type}: ${p.message}`);
	}
	lines.slice(0, max).forEach((l) => console.log(l));
	if (lines.length > max) console.log(`... and ${lines.length - max} more problems (raise --max)`);
	console.log(`[check-contract] ${gameId} ${board.reels}x${board.rows}: ${total} books in ${files.length} file(s), ${bad} with problems (${lines.length} problems)`);
	process.exit(lines.length ? 1 : 0);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) await main();
