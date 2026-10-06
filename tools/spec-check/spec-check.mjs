#!/usr/bin/env node
// Validates games/<id>/game.spec.json in plain English. Usage: node tools/spec-check/spec-check.mjs [gameId...]
// Needs Node 22.18+ (runs the TypeScript spec package directly).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SDK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const { validateSpec, normalizeSpec, formatIssues } = await import(pathToFileURL(path.join(SDK, 'packages/kit-spec/index.ts')).href);

const gamesDir = path.join(SDK, 'games');
const ids = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(gamesDir).filter((d) => fs.existsSync(path.join(gamesDir, d, 'game.spec.json')));
let bad = 0;
for (const id of ids) {
	const file = path.join(gamesDir, id, 'game.spec.json');
	let spec;
	try {
		spec = normalizeSpec(JSON.parse(fs.readFileSync(file, 'utf8')));
	} catch (e) {
		console.log(`${id}: cannot read the spec (${e.message})`);
		bad++;
		continue;
	}
	const issues = validateSpec(spec);
	const errors = issues.filter((i) => i.level === 'error').length;
	console.log(`${id}: ${errors ? 'FAILED' : 'ok'}${issues.length ? '' : ''}`);
	if (issues.length) console.log(formatIssues(issues).replace(/^/gm, '  '));
	if (errors) bad++;
}
process.exit(bad ? 1 : 0);
