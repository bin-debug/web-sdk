// @ts-ignore
import config from 'config-vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SDK = path.resolve(HERE, '..', '..');
const DEMO_DIR = path.join(SDK, 'packages', 'kit-demo-art', 'static', 'demo');
const GAMES_DIR = path.join(SDK, 'games');

const MIME = {
	'.webp': 'image/webp',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.json': 'application/json',
	'.mp3': 'audio/mpeg',
	'.webm': 'video/webm',
	'.mp4': 'video/mp4',
	'.html': 'text/html',
};

// Serves the shared demo art at /assets/demo/* and each game's own art at /assets/game/<id>/*
// (games/<id>/art). Missing files are real 404s so the slot loader falls back to code art.
const resolveArtFile = (url) => {
	const clean = decodeURIComponent(url.split('?')[0]);
	let m = clean.match(/^\/assets\/demo\/(.+)$/);
	if (m) return path.join(DEMO_DIR, m[1]);
	m = clean.match(/^\/qa\/([a-z0-9._-]+)$/);
	if (m) return path.join(SDK, 'tools', 'qa', m[1]);
	m = clean.match(/^\/assets\/game\/([a-z0-9_]+)\/(.+)$/);
	if (m) return path.join(GAMES_DIR, m[1], 'art', m[2]);
	return null;
};

const kitArt = () => ({
	name: 'kit-art',
	// Game Builder export: bundle only the chosen game's spec
	transform(code, id) {
		if (process.env.KIT_GAME && id.split(String.fromCharCode(92)).join('/').endsWith('src/game/spec.ts'))
			return code.replace('games/*/game.spec.json', `games/${process.env.KIT_GAME}/game.spec.json`);
	},
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			const file = req.url && resolveArtFile(req.url);
			if (!file) return next();
			if (!file.startsWith(SDK) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
				res.statusCode = 404;
				res.end('not found');
				return;
			}
			res.setHeader('Content-Type', MIME[path.extname(file)] ?? 'application/octet-stream');
			res.setHeader('Cache-Control', 'no-cache');
			fs.createReadStream(file).pipe(res);
		});
	},
	closeBundle() {
		// copy demo art into the build output
		const out = path.join(HERE, '.svelte-kit', 'output', 'client', 'assets');
		if (!fs.existsSync(path.join(HERE, '.svelte-kit', 'output', 'client'))) return;
		fs.cpSync(DEMO_DIR, path.join(out, 'demo'), { recursive: true });
	},
});

const base = config();
base.plugins.push(kitArt());
// the kit packages ship TypeScript source with extensionless imports: let Vite process them (also for SSR)
base.ssr = { ...(base.ssr ?? {}), noExternal: ['kit-spec', 'kit-assets', 'kit-symbols', 'kit-layout', 'kit-ui', 'kit-fx'] };
export default base;
