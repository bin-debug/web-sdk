#!/usr/bin/env node
// Video -> PixiJS sprite sheet (one clip per sheet). Needs ffmpeg + ffprobe on PATH.
// Usage: node tools/video-to-sprites/video-to-sprites.mjs <video> --name h1_win --out <dir> [options]
// Run with --help for options. See README.md next to this file.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const HELP = `
video-to-sprites <video|frames-dir> --name <clip> --out <dir> [options]

  --fps <n>            frames per second to sample (default 24)
  --cell <px>          size of the square cell each frame is fitted into (default 256)
  --start <sec>        trim start (default 0)
  --duration <sec>     trim length (default: whole clip)
  --key <colour|none>  chroma-key a solid background, e.g. 00ff00 (green screen), 000000 (black). default none
  --similarity <0-1>   chroma-key tolerance (default 0.12)
  --blend <0-1>        chroma-key edge softness (default 0.08)
  --black-to-alpha     treat brightness as alpha (for FX shot on black: fire, sparks, glows)
  --max-sheet <px>     max sheet width/height (default 2048 = 16 MB GPU; 4096 = 64 MB)
  --quality <0-100>    webp quality (default 90)
  --png                also write a PNG sheet (lossless master)
  --no-preview         skip the animated preview .webp
`;

const args = process.argv.slice(2);
if (!args.length || args.includes('--help')) {
	console.log(HELP);
	process.exit(0);
}
const input = path.resolve(args[0]);
const opt = (name, def) => {
	const i = args.indexOf(`--${name}`);
	return i === -1 ? def : args[i + 1];
};
const flag = (name) => args.includes(`--${name}`);

const name = opt('name', path.parse(input).name.replace(/[^a-zA-Z0-9_]/g, '_'));
const outDir = path.resolve(opt('out', '.'));
const fps = Number(opt('fps', 24));
let cell = Number(opt('cell', 256));
const start = Number(opt('start', 0));
const duration = opt('duration');
const key = opt('key', 'none');
const similarity = Number(opt('similarity', 0.12));
const blend = Number(opt('blend', 0.08));
const maxSheet = Number(opt('max-sheet', 2048));
const quality = Number(opt('quality', 90));

const run = (cmd, a) => execFileSync(cmd, a, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'v2s-'));
fs.mkdirSync(outDir, { recursive: true });

// 1. extract RGBA frames, fitted and centred in a transparent square cell
const filters = [];
if (fs.statSync(input).isFile()) filters.push(`fps=${fps}`);
filters.push('format=rgba');
if (key !== 'none') {
	const hex = key.replace('#', '').toLowerCase();
	filters.push(`colorkey=0x${hex}:${similarity}:${blend}`);
	// remove the green/blue light bounce left on edges by the screen
	if (hex === '00ff00') filters.push('despill=type=green');
	if (hex === '0000ff') filters.push('despill=type=blue');
}
if (flag('black-to-alpha')) filters.push('geq=r=r(X\\,Y):g=g(X\\,Y):b=b(X\\,Y):a=max(r(X\\,Y)\\,max(g(X\\,Y)\\,b(X\\,Y)))');
const fitFilters = (c) => [
	...filters,
	`scale=${c}:${c}:force_original_aspect_ratio=decrease:flags=lanczos`,
	`pad=${c}:${c}:(ow-iw)/2:(oh-ih)/2:color=0x00000000`,
];

const extract = (c) => {
	for (const f of fs.readdirSync(tmp)) fs.rmSync(path.join(tmp, f));
	const a = ['-y', '-loglevel', 'error'];
	if (fs.statSync(input).isDirectory()) {
		// ffmpeg on Windows has no glob input, so copy to a numbered sequence first
		const seqDir = fs.mkdtempSync(path.join(os.tmpdir(), 'v2s-in-'));
		fs.readdirSync(input)
			.filter((f) => /\.png$/i.test(f))
			.sort((x, y) => x.localeCompare(y, undefined, { numeric: true }))
			.forEach((f, i) => fs.copyFileSync(path.join(input, f), path.join(seqDir, `in_${String(i).padStart(5, '0')}.png`)));
		a.push('-framerate', String(fps), '-i', path.join(seqDir, 'in_%05d.png'));
	} else {
		// libvpx-vp9 decoder keeps the alpha channel of WebM-with-alpha sources
		if (/\.webm$/i.test(input)) a.push('-c:v', 'libvpx-vp9');
		if (start) a.push('-ss', String(start));
		if (duration) a.push('-t', String(duration));
		a.push('-i', input);
	}
	a.push('-vf', fitFilters(c).join(','), path.join(tmp, 'f_%04d.png'));
	run('ffmpeg', a);
	return fs.readdirSync(tmp).filter((f) => f.endsWith('.png')).sort();
};

let frames = extract(cell);
if (!frames.length) throw new Error('no frames extracted');

// 2. shrink cells until every frame fits on one sheet <= maxSheet
const layout = (n, c) => {
	const cols = Math.min(Math.ceil(Math.sqrt(n)), Math.floor(maxSheet / c));
	return { cols, rows: Math.ceil(n / cols) };
};
let { cols, rows } = layout(frames.length, cell);
if (rows * cell > maxSheet) {
	const fitted = Math.floor(Math.sqrt((maxSheet * maxSheet) / frames.length));
	console.warn(
		`[v2s] ${frames.length} frames @${cell}px exceed ${maxSheet}px; shrinking cells to ${fitted}px. ` +
			'Lower --fps or --duration to keep resolution.',
	);
	cell = fitted;
	frames = extract(cell);
	({ cols, rows } = layout(frames.length, cell));
}

// 3. tile into one sheet
const sheetBase = path.join(outDir, name);
const tileArgs = [
	'-y', '-loglevel', 'error',
	'-framerate', '1', '-i', path.join(tmp, 'f_%04d.png'),
	'-vf', `tile=${cols}x${rows}:padding=0:color=0x00000000`,
	'-frames:v', '1',
];
run('ffmpeg', [...tileArgs, '-c:v', 'libwebp', '-lossless', '0', '-quality', String(quality), `${sheetBase}.webp`]);
if (flag('png')) run('ffmpeg', [...tileArgs, `${sheetBase}.png`]);

// 4. Pixi / TexturePacker "hash" JSON (frame order = animation order)
const frameNames = frames.map((_, i) => `${name}_${String(i).padStart(4, '0')}.png`);
const json = {
	frames: Object.fromEntries(
		frameNames.map((fname, i) => [
			fname,
			{
				frame: { x: (i % cols) * cell, y: Math.floor(i / cols) * cell, w: cell, h: cell },
				rotated: false,
				trimmed: false,
				spriteSourceSize: { x: 0, y: 0, w: cell, h: cell },
				sourceSize: { w: cell, h: cell },
			},
		]),
	),
	animations: { [name]: frameNames },
	meta: {
		app: 'web-sdk/tools/video-to-sprites',
		image: `${name}.webp`,
		format: 'RGBA8888',
		size: { w: cols * cell, h: rows * cell },
		scale: '1',
		fps,
		frameCount: frames.length,
	},
};
fs.writeFileSync(`${sheetBase}.json`, JSON.stringify(json, null, '\t'));

// 5. animated preview for eyeballing loops / keying
if (!flag('no-preview')) {
	run('ffmpeg', [
		'-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(tmp, 'f_%04d.png'),
		'-c:v', 'libwebp', '-loop', '0', '-quality', '70', `${sheetBase}.preview.webp`,
	]);
}

fs.rmSync(tmp, { recursive: true, force: true });
const kb = (f) => (fs.existsSync(f) ? `${Math.round(fs.statSync(f).size / 1024)} KB` : '-');
console.log(
	`[v2s] ${name}: ${frames.length} frames, ${cell}px cells, ${cols}x${rows} grid, ` +
		`${cols * cell}x${rows * cell} sheet (${kb(`${sheetBase}.webp`)}), animationSpeed=${(fps / 60).toFixed(3)}`,
);
