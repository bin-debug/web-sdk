#!/usr/bin/env node
// Game Builder server (port 3231): writes specs, runs spec-check/book-gen/builds, starts the demo RGS and
// one shell dev server per game (ports 3240+), queues scenario books, manages game art, exports a zip.
// Zero dependencies. Local use only: it spawns processes and writes files, so do not expose it to the internet.
// Usage: node tools/builder-server/server.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execFile } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SDK = path.resolve(HERE, '..', '..');
const GAMES = path.join(SDK, 'games');
const DEMO = path.join(SDK, 'packages', 'kit-demo-art', 'static', 'demo');
const SHELL = path.join(SDK, 'apps', 'shell');
const STATE_DIR = path.join(HERE, '.state');
const EXPORTS = path.join(STATE_DIR, 'exports');
const PORT = Number(process.argv[2] ?? 3231);
const RGS_PORT = 5119;
const GAME_PORT_BASE = 3240;
fs.mkdirSync(EXPORTS, { recursive: true });

const { validateSpec, normalizeSpec, symbolNames, FEATURES } = await import(pathToFileURL(path.join(SDK, 'packages/kit-spec/index.ts')).href);
const catalogue = JSON.parse(fs.readFileSync(path.join(HERE, 'shells.json'), 'utf8')).shells;
const demoManifest = JSON.parse(fs.readFileSync(path.join(DEMO, 'manifest.json'), 'utf8'));

// ---------- helpers ----------
const send = (res, status, data, type = 'application/json') => {
	res.writeHead(status, { 'Content-Type': type, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS' });
	res.end(type === 'application/json' ? JSON.stringify(data) : data);
};
const readBody = async (req) => {
	const chunks = [];
	for await (const c of req) chunks.push(c);
	return Buffer.concat(chunks);
};
const readJson = async (req) => {
	const b = await readBody(req);
	return b.length ? JSON.parse(b.toString('utf8')) : {};
};
const specPath = (id) => path.join(GAMES, id, 'game.spec.json');
const artDir = (id) => path.join(GAMES, id, 'art');
const gameManifestPath = (id) => path.join(artDir(id), 'manifest.json');
const okId = (id) => /^[a-z0-9_]+$/.test(id ?? '');
const readSpec = (id) => (okId(id) && fs.existsSync(specPath(id)) ? JSON.parse(fs.readFileSync(specPath(id), 'utf8')) : null);
const readGameManifest = (id) => {
	try {
		return JSON.parse(fs.readFileSync(gameManifestPath(id), 'utf8'));
	} catch {
		return { version: 1, slots: {} };
	}
};
const portsFile = path.join(STATE_DIR, 'ports.json');
const readPorts = () => {
	try {
		return JSON.parse(fs.readFileSync(portsFile, 'utf8'));
	} catch {
		return {};
	}
};
const gamePort = (id) => {
	const ports = readPorts();
	if (!ports[id]) {
		const used = new Set(Object.values(ports));
		let p = GAME_PORT_BASE;
		while (used.has(p)) p++;
		ports[id] = p;
		fs.writeFileSync(portsFile, JSON.stringify(ports, null, 1));
	}
	return ports[id];
};
const ping = async (port, p = '/') => {
	try {
		const r = await fetch(`http://127.0.0.1:${port}${p}`, { signal: AbortSignal.timeout(2500) });
		return r.status < 500;
	} catch {
		return false;
	}
};
const waitFor = async (port, p, ms) => {
	const t0 = Date.now();
	while (Date.now() - t0 < ms) {
		if (await ping(port, p)) return true;
		await new Promise((r) => setTimeout(r, 700));
	}
	return false;
};
let tsIp;
const tailscaleIp = () =>
	new Promise((resolve) => {
		if (tsIp !== undefined) return resolve(tsIp);
		execFile('tailscale', ['ip', '-4'], { timeout: 4000 }, (err, out) => resolve((tsIp = err ? '' : String(out).trim().split(/\s+/)[0])));
	});

// ---------- jobs (build log streamed over SSE) ----------
const jobs = new Map();
const newJob = (title) => {
	const job = { id: Math.random().toString(36).slice(2, 10), title, lines: [], done: false, ok: null, result: null, subs: new Set() };
	jobs.set(job.id, job);
	return job;
};
const log = (job, line) => {
	for (const l of String(line).split(/\r?\n/)) {
		if (!l.trim()) continue;
		job.lines.push(l);
		for (const s of job.subs) s.write(`data: ${JSON.stringify({ line: l })}\n\n`);
	}
};
const finish = (job, ok, result) => {
	job.done = true;
	job.ok = ok;
	job.result = result ?? null;
	for (const s of job.subs) {
		s.write(`data: ${JSON.stringify({ done: true, ok, result: job.result })}\n\n`);
		s.end();
	}
	job.subs.clear();
};
const run = (job, cmd, args, { doneWhen, ...opts } = {}) =>
	new Promise((resolve) => {
		log(job, `$ ${[path.basename(cmd), ...args].join(' ')}`);
		const p = spawn(cmd, args, { cwd: SDK, windowsHide: true, ...opts });
		let finished = false;
		// vite build for the shell prints its last line and then never exits: stop it once that line appears
		const watch = (d) => {
			if (doneWhen && !finished && doneWhen.test(String(d))) {
				finished = true;
				setTimeout(() => (p.kill(), resolve(true)), 1500);
			}
		};
		p.stdout.on('data', watch);
		p.stdout.on('data', (d) => log(job, d));
		p.stderr.on('data', (d) => log(job, d));
		p.on('close', (code) => resolve(code === 0));
		p.on('error', (e) => (log(job, `failed to start: ${e.message}`), resolve(false)));
	});

// ---------- long-running children (demo RGS, shell dev servers) ----------
const children = new Map();
const spawnService = (name, args, cwd, logFile) => {
	const out = fs.openSync(path.join(STATE_DIR, logFile), 'a');
	const p = spawn(process.execPath, args, { cwd, windowsHide: true, detached: true, stdio: ['ignore', out, out] });
	p.unref(); // games keep running if the builder server restarts
	children.set(name, p);
	p.on('exit', () => children.delete(name));
};
const ensureRgs = async (job) => {
	if (await ping(RGS_PORT, '/health')) return true;
	log(job, `starting the demo RGS on ${RGS_PORT}`);
	spawnService('rgs', [path.join(SDK, 'tools/mock-rgs/server.mjs'), String(RGS_PORT)], SDK, 'rgs.log');
	return waitFor(RGS_PORT, '/health', 15000);
};
const viteBin = path.join(SHELL, 'node_modules', 'vite', 'bin', 'vite.js');
const ensureShell = async (job, id) => {
	const port = gamePort(id);
	if (await ping(port, '/')) {
		log(job, `shell for ${id} already running on ${port}`);
		return port;
	}
	log(job, `starting the shell for ${id} on ${port} (first load compiles, this takes about 20 s)`);
	spawnService(`shell:${id}`, [viteBin, 'dev', '--host', '--port', String(port), '--strictPort'], SHELL, `shell-${id}.log`);
	const up = await waitFor(port, '/', 90000);
	if (!up) throw new Error(`the shell did not start on port ${port}; see tools/builder-server/.state/shell-${id}.log`);
	return port;
};
process.on('SIGINT', () => process.exit());
process.on('SIGTERM', () => process.exit());

// ---------- games ----------
const listGames = async () => {
	const ports = readPorts();
	const out = [];
	for (const id of fs.existsSync(GAMES) ? fs.readdirSync(GAMES) : []) {
		const spec = readSpec(id);
		if (!spec) continue;
		const issues = validateSpec(normalizeSpec(spec));
		const shell = catalogue.find((s) => s.id === spec.shell);
		const port = ports[id];
		out.push({
			id,
			name: spec.name,
			shell: spec.shell,
			shellVerified: !!shell?.verified,
			errors: issues.filter((i) => i.level === 'error').length,
			warnings: issues.filter((i) => i.level === 'warning').length,
			port: port ?? null,
			running: port ? await ping(port, '/') : false,
			hasBooks: fs.existsSync(path.join(SDK, 'tools/mock-rgs/books', id, 'BASE.json')) || fs.existsSync(path.join(SDK, 'tools/mock-rgs/books', id, 'base.json')),
		});
	}
	return out;
};

const featureList = () =>
	Object.values(FEATURES).map((f) => ({ id: f.id, title: f.title, needs: f.needs ?? [], reveal: f.reveal ?? null, pays: f.pays ?? null, implemented: f.implemented }));

// ---------- art ----------
const extKind = (file) => {
	const e = path.extname(file ?? '').toLowerCase();
	if (['.webp', '.png', '.jpg', '.jpeg'].includes(e)) return 'image';
	if (['.mp3', '.ogg', '.wav'].includes(e)) return 'audio';
	if (['.webm', '.mp4'].includes(e)) return 'video';
	if (e === '.json') return 'sheet';
	return 'code';
};
const thumbFile = (layerDir, file) => {
	if (path.extname(file) !== '.json') return file;
	for (const ext of ['.webp', '.png']) {
		const f = file.replace(/\.json$/, ext);
		if (fs.existsSync(path.join(layerDir, f))) return f;
	}
	return file;
};
const describeSlot = (id) => {
	const [group, a] = id.split('.');
	if (group === 'symbol') return `symbol ${a}, ${id.split('.')[2]}`;
	return id.replace(/\./g, ' ');
};
const STATES = ['static', 'land', 'win'];
const artRows = (spec) => {
	const names = symbolNames(normalizeSpec(spec));
	const game = readGameManifest(spec.gameId).slots;
	const rows = [];
	const demo = { ...demoManifest.slots, 'logo.game': demoManifest.slots['logo.demo'] };
	const wanted = (id) => {
		const p = id.split('.');
		if (p[0] === 'symbol') return names.includes(p[1]) && STATES.includes(p[2]);
		if (id === 'mascot.master') return false;
		return ['bg', 'board', 'mascot', 'fx', 'audio'].includes(p[0]) || id === 'logo.game';
	};
	const ids = new Set([...Object.keys(demo).filter(wanted)]);
	for (const n of names) ids.add(`symbol.${n}.static`);
	for (const [id] of Object.entries(game)) if (wanted(id)) ids.add(id);
	for (const id of ids) {
		const g = game[id];
		const d = demo[id];
		const entry = g ?? d;
		let source = g ? 'game' : d ? 'demo' : 'code';
		if (entry?.type === 'juice') source = g ? 'game' : 'code';
		const layerDir = g ? artDir(spec.gameId) : DEMO;
		const layerUrl = g ? `/art/game/${spec.gameId}` : '/art/demo';
		const file = entry?.file;
		rows.push({
			id,
			label: describeSlot(id),
			group: id.split('.')[0],
			source,
			kind: file ? extKind(file) : 'code',
			url: file ? `${layerUrl}/${thumbFile(layerDir, file)}` : null,
			preset: entry?.type === 'juice' ? entry.preset : null,
			fallback: source === 'code',
		});
	}
	const order = ['bg', 'board', 'logo', 'symbol', 'mascot', 'fx', 'audio'];
	return rows.sort((a, b) => order.indexOf(a.group) - order.indexOf(b.group) || a.id.localeCompare(b.id, 'en', { numeric: true }));
};

const SLOT_SIZE = { 'bg.base.16x9': '1920x1080', 'bg.base.9x16': '1080x1920', 'bg.bonus.16x9': '1920x1080', 'bg.bonus.9x16': '1080x1920', 'board.frame': 'per board', 'logo.game': '1200x400 transparent' };
const promptFor = (spec, id) => {
	const style = spec.artStyle ?? 'thick-outline cel-shaded cartoon, saturated';
	const [g, n] = id.split('.');
	const subject = g === 'symbol' ? `slot symbol "${n}" for the game "${spec.name}", centred, transparent background` : id.replace(/\./g, ' ') + ` for the slot game "${spec.name}"`;
	return `${subject}. Style: ${style}. Palette: ${(spec.palette ?? []).join(', ')}.`;
};

const saveArt = async (id, slot, filename, body) => {
	const ext = path.extname(filename).toLowerCase();
	if (!['.png', '.webp', '.jpg', '.jpeg', '.mp3', '.ogg', '.webm', '.mp4'].includes(ext)) throw new Error(`unsupported file type ${ext}`);
	if (!/^[a-z0-9_.]+$/i.test(slot)) throw new Error('bad slot id');
	if (body.length > 15 * 1024 * 1024) throw new Error('file is larger than 15 MB');
	const rel = `uploads/${slot}${ext}`;
	const file = path.join(artDir(id), rel);
	fs.mkdirSync(path.dirname(file), { recursive: true });
	fs.writeFileSync(file, body);
	const kind = extKind(rel);
	const entry = { type: kind === 'image' ? 'sprite' : kind === 'audio' ? 'audio' : 'video', file: rel };
	if (ext === '.png' && body.length > 24) (entry.w = body.readUInt32BE(16)), (entry.h = body.readUInt32BE(20));
	const manifest = readGameManifest(id);
	manifest.slots[slot] = entry;
	// a new still for a symbol must not play the demo clips of the old art: other states fall back to code juice
	const m = slot.match(/^symbol\.([A-Za-z0-9]+)\.static$/);
	if (m) {
		const juice = { spin: 'motionBlur', land: 'squash', win: 'pulseGlow', postWin: 'settle', explode: 'poofShrink' };
		for (const [state, preset] of Object.entries(juice)) {
			const key = `symbol.${m[1]}.${state}`;
			if (!manifest.slots[key] && demoManifest.slots[key] && demoManifest.slots[key].type !== 'juice') manifest.slots[key] = { type: 'juice', preset };
		}
	}
	fs.writeFileSync(gameManifestPath(id), JSON.stringify(manifest, null, '\t'));
	return entry;
};

// ---------- scenarios ----------
const rgs = async (p, init) => (await fetch(`http://127.0.0.1:${RGS_PORT}${p}`, init)).json();
const queueBooks = (gameId, mode, ids) => rgs('/mock/queue', { method: 'POST', body: JSON.stringify({ gameId, mode, id: ids }) });
const findBooks = (gameId, mode, qs) => rgs(`/mock/books/${gameId}/${mode}?${qs}`);
const choose = (list) => list[Math.floor(Math.random() * list.length)];

const scenarioDefs = (spec) => {
	const features = spec.features ?? [];
	const bonus = (n) => spec.bonuses?.[n - 1];
	const has = (f) => features.includes(f) && !!FEATURES[f]?.implemented;
	const missingFeature = (f) => (features.includes(f) ? `${f} is not built yet` : `this game does not use ${f}`);
	return [
		{ id: 'baseWin', title: 'Base win', hint: 'next spin pays a normal win' },
		{ id: 'bigWin', title: 'Big win', hint: 'next spin pays 20x or more' },
		{ id: 'tumbleChain', title: 'Tumble chain', hint: 'next spin tumbles several times', disabled: has('tumble') ? null : missingFeature('tumble') },
		{ id: 'bonus1', title: bonus(1) ? `Bonus 1: ${bonus(1).name}` : 'Bonus 1', hint: 'next spin triggers the free spins', disabled: bonus(1) ? null : 'this game has no bonus' },
		{ id: 'bonus2', title: bonus(2) ? `Bonus 2: ${bonus(2).name}` : 'Bonus 2', hint: 'queues the bought bonus: press BUY BONUS', disabled: bonus(2) ? null : 'this game has only one bonus' },
		{ id: 'bonus3', title: bonus(3) ? `Bonus 3: ${bonus(3).name}` : 'Bonus 3', hint: 'queues the bought bonus: press BUY BONUS', disabled: bonus(3) ? null : 'this game has fewer than three bonuses' },
		{ id: 'retrigger', title: 'Retrigger', hint: 'free spins that retrigger', disabled: bonus(1) ? null : 'this game has no bonus' },
		{ id: 'holdAndWin', title: 'Hold and win', disabled: has('holdAndWin') ? null : missingFeature('holdAndWin') },
		{ id: 'jackpot', title: 'Jackpot', disabled: has('jackpotLadder') ? null : missingFeature('jackpotLadder') },
		{ id: 'maxWin', title: 'Max win', hint: 'next spin hits the win cap' },
	];
};
const queueScenario = async (spec, scenario) => {
	const id = spec.gameId;
	const def = scenarioDefs(spec).find((s) => s.id === scenario);
	if (!def) throw new Error('unknown scenario');
	if (def.disabled) throw new Error(def.disabled);
	const bonusMode = (n) => spec.bonuses[n - 1].id;
	let mode = 'BASE';
	let ids;
	if (scenario === 'baseWin') ids = [choose((await findBooks(id, 'BASE', 'minWin=1&limit=300')).filter((b) => b.winX < 20 && !b.events.includes('freeSpinTrigger'))).id];
	else if (scenario === 'bigWin') ids = [choose((await findBooks(id, 'BASE', 'minWin=20&limit=300')).filter((b) => !b.events.includes('freeSpinTrigger') && b.winX < 1000)).id];
	else if (scenario === 'tumbleChain') ids = [choose((await findBooks(id, 'BASE', 'minWin=2&event=tumbleBoard&limit=300')).filter((b) => !b.events.includes('freeSpinTrigger'))).id];
	else if (scenario === 'bonus1') ids = [choose(await findBooks(id, 'BASE', 'event=freeSpinTrigger&limit=300')).id];
	else if (scenario === 'retrigger') ids = [301];
	else if (scenario === 'maxWin') ids = [302];
	else if (/^bonus[23]$/.test(scenario)) {
		mode = bonusMode(Number(scenario.slice(5)));
		ids = [choose(await findBooks(id, mode, 'limit=300')).id];
	} else throw new Error(`the ${scenario} scenario has no books yet`);
	if (ids.some((x) => x === undefined)) throw new Error('no matching book in the generated books; run Build first');
	await queueBooks(id, mode, ids);
	return { mode, ids };
};

// ---------- build / export ----------
const buildGame = async (id) => {
	const job = newJob(`Build ${id}`);
	(async () => {
		try {
			const spec = readSpec(id);
			if (!spec) throw new Error('no such game');
			log(job, 'checking the spec');
			const issues = validateSpec(normalizeSpec(spec));
			for (const i of issues) log(job, `${i.level === 'error' ? 'ERROR' : 'warning'} ${i.path}: ${i.message}`);
			if (issues.some((i) => i.level === 'error')) throw new Error('the spec has errors: fix them in the form first');
			const shell = catalogue.find((s) => s.id === spec.shell);
			if (!shell?.implemented) throw new Error(`the shell "${spec.shell}" is not built yet`);
			log(job, 'generating synthetic demo books (visual tests only, not maths)');
			if (!(await run(job, process.execPath, [path.join(SDK, 'tools/book-gen/shell.mjs'), id]))) throw new Error('book generation failed');
			if (!(await ensureRgs(job))) throw new Error(`the demo RGS did not start on ${RGS_PORT}`);
			await rgs('/mock/reset', { method: 'POST', body: '{}' }); // pick up the new books; wallets reset, so each play gets a new sessionID
			const port = await ensureShell(job, id);
			log(job, `ready: shell on port ${port}`);
			finish(job, true, { port });
		} catch (e) {
			log(job, `FAILED: ${e.message}`);
			finish(job, false);
		}
	})();
	return job;
};

const exportGame = async (id) => {
	const job = newJob(`Export ${id}`);
	(async () => {
		try {
			const spec = readSpec(id);
			if (!spec) throw new Error('no such game');
			const issues = validateSpec(normalizeSpec(spec));
			if (issues.some((i) => i.level === 'error')) throw new Error('the spec has errors');
			log(job, 'building the production bundle (this takes a minute)');
			fs.rmSync(path.join(SHELL, 'build'), { recursive: true, force: true });
			const env = { ...process.env, KIT_GAME: id, NODE_ENV: 'production' };
			if (!(await run(job, process.execPath, [viteBin, 'build'], { cwd: SHELL, env, doneWhen: /✔ done/ }))) throw new Error('vite build failed');
			const out = path.join(SHELL, 'build');
			log(job, 'adding the art');
			fs.cpSync(DEMO, path.join(out, 'assets', 'demo'), { recursive: true });
			if (fs.existsSync(artDir(id))) fs.cpSync(artDir(id), path.join(out, 'assets', 'game', id), { recursive: true });
			const zip = path.join(EXPORTS, `${id}.zip`);
			fs.rmSync(zip, { force: true });
			if (!(await run(job, 'tar', ['-a', '-c', '-f', zip, '-C', out, '.']))) throw new Error('zip failed');
			log(job, `zip ready (${(fs.statSync(zip).size / 1048576).toFixed(1)} MB). The RGS url is read from the launch url (rgs_url), nothing is baked in.`);
			finish(job, true, { zip: `/api/exports/${id}.zip` });
		} catch (e) {
			log(job, `FAILED: ${e.message}`);
			finish(job, false);
		}
	})();
	return job;
};

// ---------- http ----------
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.webm': 'video/webm', '.mp4': 'video/mp4', '.zip': 'application/zip' };
const sendFile = (res, file) => {
	if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, { error: 'not found' });
	res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' });
	fs.createReadStream(file).pipe(res);
};

http
	.createServer(async (req, res) => {
		const url = new URL(req.url, `http://${req.headers.host}`);
		const p = url.pathname;
		const m = (re) => p.match(re);
		try {
			if (req.method === 'OPTIONS') return send(res, 204, {});
			if (p === '/api/health') return send(res, 200, { ok: true });

			let r;
			if ((r = m(/^\/art\/demo\/(.+)$/))) return sendFile(res, path.join(DEMO, decodeURIComponent(r[1])));
			if ((r = m(/^\/art\/game\/([a-z0-9_]+)\/(.+)$/))) return sendFile(res, path.join(artDir(r[1]), decodeURIComponent(r[2])));
			if ((r = m(/^\/api\/exports\/([a-z0-9_]+)\.zip$/))) return sendFile(res, path.join(EXPORTS, `${r[1]}.zip`));

			if (p === '/api/state') {
				return send(res, 200, {
					host: await tailscaleIp(),
					ports: { ui: 3230, server: PORT, rgs: RGS_PORT, gameBase: GAME_PORT_BASE },
					rgsUp: await ping(RGS_PORT, '/health'),
					shells: catalogue,
					features: featureList(),
					games: await listGames(),
				});
			}
			if (p === '/api/validate' && req.method === 'POST') {
				const { spec } = await readJson(req);
				return send(res, 200, { issues: validateSpec(normalizeSpec(spec)) });
			}
			if (p === '/api/games' && req.method === 'POST') {
				const { spec, overwrite } = await readJson(req);
				const norm = normalizeSpec(spec);
				const issues = validateSpec(norm);
				const shell = catalogue.find((s) => s.id === spec.shell);
				if (!shell?.implemented) issues.push({ level: 'error', path: 'shell', message: shell ? shell.reason : `Unknown shell "${spec.shell}".` });
				if (issues.some((i) => i.level === 'error')) return send(res, 422, { issues });
				if (fs.existsSync(specPath(spec.gameId)) && !overwrite) return send(res, 409, { error: `A game called "${spec.gameId}" already exists.` });
				fs.mkdirSync(path.join(GAMES, spec.gameId), { recursive: true });
				fs.writeFileSync(specPath(spec.gameId), JSON.stringify(spec, null, '\t') + '\n');
				return send(res, 200, { ok: true, issues });
			}
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)$/))) {
				const spec = readSpec(r[1]);
				if (!spec) return send(res, 404, { error: 'no such game' });
				return send(res, 200, { spec, issues: validateSpec(normalizeSpec(spec)), port: readPorts()[r[1]] ?? null });
			}
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)\/build$/)) && req.method === 'POST') return send(res, 200, { job: (await buildGame(r[1])).id });
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)\/export$/)) && req.method === 'POST') return send(res, 200, { job: (await exportGame(r[1])).id });
			if ((r = m(/^\/api\/jobs\/([a-z0-9]+)\/stream$/))) {
				const job = jobs.get(r[1]);
				if (!job) return send(res, 404, { error: 'no such job' });
				res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' });
				for (const l of job.lines) res.write(`data: ${JSON.stringify({ line: l })}\n\n`);
				if (job.done) {
					res.write(`data: ${JSON.stringify({ done: true, ok: job.ok, result: job.result })}\n\n`);
					return res.end();
				}
				job.subs.add(res);
				req.on('close', () => job.subs.delete(res));
				return;
			}
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)\/scenarios$/))) {
				const spec = readSpec(r[1]);
				if (!spec) return send(res, 404, { error: 'no such game' });
				return send(res, 200, { scenarios: scenarioDefs(spec) });
			}
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)\/scenario$/)) && req.method === 'POST') {
				const spec = readSpec(r[1]);
				if (!spec) return send(res, 404, { error: 'no such game' });
				const { scenario } = await readJson(req);
				if (!(await ping(RGS_PORT, '/health'))) return send(res, 409, { error: 'The demo RGS is not running. Press Build & Play first.' });
				try {
					return send(res, 200, await queueScenario(spec, scenario));
				} catch (e) {
					return send(res, 409, { error: e.message });
				}
			}
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)\/reset$/)) && req.method === 'POST') {
				await rgs('/mock/reset', { method: 'POST', body: '{}' });
				return send(res, 200, { ok: true });
			}
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)\/art$/))) {
				const spec = readSpec(r[1]);
				if (!spec) return send(res, 404, { error: 'no such game' });
				if (req.method === 'GET') return send(res, 200, { rows: artRows(spec), requests: fs.existsSync(path.join(GAMES, r[1], 'art-requests.json')) ? JSON.parse(fs.readFileSync(path.join(GAMES, r[1], 'art-requests.json'), 'utf8')) : [] });
				const slot = url.searchParams.get('slot') ?? '';
				if (req.method === 'PUT') {
					try {
						return send(res, 200, { entry: await saveArt(r[1], slot, url.searchParams.get('name') ?? 'file.png', await readBody(req)) });
					} catch (e) {
						return send(res, 400, { error: e.message });
					}
				}
				if (req.method === 'DELETE') {
					const manifest = readGameManifest(r[1]);
					const entry = manifest.slots[slot];
					delete manifest.slots[slot];
					if (entry?.file) fs.rmSync(path.join(artDir(r[1]), entry.file), { force: true });
					fs.writeFileSync(gameManifestPath(r[1]), JSON.stringify(manifest, null, '\t'));
					return send(res, 200, { ok: true });
				}
			}
			if ((r = m(/^\/api\/games\/([a-z0-9_]+)\/art\/generate$/)) && req.method === 'POST') {
				const spec = readSpec(r[1]);
				if (!spec) return send(res, 404, { error: 'no such game' });
				const { slots, missing } = await readJson(req);
				const rows = artRows(spec);
				const pick = missing ? rows.filter((x) => x.source !== 'game') : rows.filter((x) => (slots ?? []).includes(x.id));
				const file = path.join(GAMES, r[1], 'art-requests.json');
				const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
				const byId = new Map(existing.map((x) => [x.slot, x]));
				for (const row of pick) if (row.kind !== 'audio') byId.set(row.id, { slot: row.id, size: SLOT_SIZE[row.id] ?? '512x512 transparent', prompt: promptFor(spec, row.id), status: 'queued' });
				fs.writeFileSync(file, JSON.stringify([...byId.values()], null, '\t'));
				return send(res, 200, { queued: pick.length, file: `games/${r[1]}/art-requests.json` });
			}
			return send(res, 404, { error: 'not found' });
		} catch (e) {
			return send(res, 500, { error: String(e?.message ?? e) });
		}
	})
	.listen(PORT, '0.0.0.0', () => console.log(`[builder-server] http://0.0.0.0:${PORT}`));
