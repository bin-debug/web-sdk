// Code fallbacks: every visual slot can be drawn without any art file (SHELL-PLAN section 1).
// Textures are drawn on a canvas and handed to Pixi as data URLs, so a shell plays with an EMPTY art folder.

const HIGH_COLOURS = ['#ffc83d', '#e0245e', '#2f7bff', '#2fcf6a', '#a54cff', '#ff8a3d', '#3ee0d0'];
const LOW_COLOURS = ['#2a9d8f', '#3b6fd8', '#58b84a', '#8a4fd0', '#e68a2e', '#d6403f'];

const canvas = (w: number, h: number) => {
	const c = document.createElement('canvas');
	c.width = w;
	c.height = h;
	return c;
};

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
};

export function symbolColour(name: string): string {
	const n = Number(name.slice(1));
	if (name[0] === 'L') return LOW_COLOURS[(n - 1) % LOW_COLOURS.length];
	if (name[0] === 'H') return HIGH_COLOURS[(n - 1) % HIGH_COLOURS.length];
	if (name === 'W') return '#ffc83d';
	if (name === 'S') return '#a54cff';
	return '#7a8499';
}

// A coloured tile with the symbol name on it.
export function drawSymbolFallback(name: string, size = 256): string {
	const c = canvas(size, size);
	const ctx = c.getContext('2d')!;
	const col = symbolColour(name);
	const pad = size * 0.08;
	roundRect(ctx, pad, pad, size - pad * 2, size - pad * 2, size * 0.18);
	const g = ctx.createLinearGradient(0, 0, 0, size);
	g.addColorStop(0, col);
	g.addColorStop(1, shade(col, -0.35));
	ctx.fillStyle = g;
	ctx.fill();
	ctx.lineWidth = size * 0.04;
	ctx.strokeStyle = '#1a1226';
	ctx.stroke();
	ctx.fillStyle = 'rgba(255,255,255,0.22)';
	roundRect(ctx, pad * 1.6, pad * 1.6, size - pad * 3.2, size * 0.32, size * 0.12);
	ctx.fill();
	ctx.fillStyle = '#ffffff';
	ctx.strokeStyle = '#1a1226';
	ctx.lineWidth = size * 0.035;
	ctx.font = `900 ${size * 0.42}px system-ui, sans-serif`;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.strokeText(name, size / 2, size * 0.54);
	ctx.fillText(name, size / 2, size * 0.54);
	return c.toDataURL('image/png');
}

export function drawBackgroundFallback(palette: string[], portrait: boolean, bonus: boolean): string {
	const w = portrait ? 540 : 960;
	const h = portrait ? 960 : 540;
	const c = canvas(w, h);
	const ctx = c.getContext('2d')!;
	const a = palette[0] ?? '#1b1030';
	const b = bonus ? (palette[1] ?? '#e0245e') : shade(a, 0.25);
	const g = ctx.createRadialGradient(w / 2, h * 0.45, h * 0.05, w / 2, h / 2, Math.max(w, h) * 0.75);
	g.addColorStop(0, b);
	g.addColorStop(1, shade(a, -0.5));
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, w, h);
	return c.toDataURL('image/jpeg', 0.8);
}

export function drawCellFallback(gold: boolean, size = 128): string {
	const c = canvas(size, size);
	const ctx = c.getContext('2d')!;
	roundRect(ctx, 3, 3, size - 6, size - 6, size * 0.16);
	ctx.fillStyle = gold ? '#4a3a12' : '#1c2030';
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.strokeStyle = gold ? '#ffc83d' : '#2c3550';
	ctx.stroke();
	return c.toDataURL('image/png');
}

export function drawLogoFallback(name: string, accent: string): string {
	const w = 900;
	const h = 300;
	const c = canvas(w, h);
	const ctx = c.getContext('2d')!;
	ctx.font = '900 120px system-ui, sans-serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.lineJoin = 'round';
	ctx.lineWidth = 22;
	ctx.strokeStyle = '#1a1226';
	ctx.strokeText(name.toUpperCase(), w / 2, h / 2, w - 40);
	ctx.fillStyle = accent;
	ctx.fillText(name.toUpperCase(), w / 2, h / 2, w - 40);
	return c.toDataURL('image/png');
}

// Silhouette stand-in for the mascot (the engine bobs it in code).
export function drawMascotFallback(accent: string): string {
	const w = 256;
	const h = 384;
	const c = canvas(w, h);
	const ctx = c.getContext('2d')!;
	ctx.fillStyle = shade(accent, -0.25);
	ctx.strokeStyle = '#1a1226';
	ctx.lineWidth = 8;
	ctx.beginPath();
	ctx.ellipse(w / 2, h * 0.72, 70, 110, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(w / 2, h * 0.3, 62, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(w / 2 - 50, h * 0.2);
	ctx.lineTo(w / 2 - 36, h * 0.04);
	ctx.lineTo(w / 2 - 10, h * 0.16);
	ctx.moveTo(w / 2 + 50, h * 0.2);
	ctx.lineTo(w / 2 + 36, h * 0.04);
	ctx.lineTo(w / 2 + 10, h * 0.16);
	ctx.fill();
	ctx.stroke();
	return c.toDataURL('image/png');
}

function shade(hex: string, amt: number): string {
	const n = parseInt(hex.slice(1), 16);
	const f = (v: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
	const r = f((n >> 16) & 255);
	const g = f((n >> 8) & 255);
	const b = f(n & 255);
	return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
