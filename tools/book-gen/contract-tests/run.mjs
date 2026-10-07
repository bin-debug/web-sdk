#!/usr/bin/env node
// Runs every contract-tests/*.json: { expect: string | null, board: "5x3", books: [...] }.
// A case with `expect` must produce at least one problem containing that text; `expect: null` must produce none.
// Add one bad-book file per new rule (name it <eventType>.<what-is-wrong>.json). Exit code 1 if any case misbehaves.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRules, checkBooks } from '../check-contract.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const rules = await loadRules();
let failed = 0;
const files = fs.readdirSync(dir).filter((n) => n.endsWith('.json')).sort();
for (const f of files) {
	const { expect, board, books } = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
	const [reels, rows] = board.split('x').map(Number);
	const problems = checkBooks(books, { rules, board: { reels, rows }, file: f });
	const ok = expect === null ? problems.length === 0 : problems.some((p) => p.message.includes(expect));
	if (!ok) {
		failed++;
		console.log(`FAIL ${f}: ${expect === null ? 'expected no problems' : `expected "${expect}"`}, got ${problems.length ? problems.map((p) => p.message).join(' | ') : 'no problems'}`);
	}
}
console.log(`[contract-tests] ${files.length - failed}/${files.length} cases behaved as expected`);
process.exit(failed ? 1 : 0);
