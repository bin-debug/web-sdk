import type * as PIXI from 'pixi.js';

const WHITE = 0xffffff;
export const GOLD = 0xffc62b;

export type Icon = (g: PIXI.Graphics, size: number) => void;

export const iconMenu: Icon = (g, s) => {
	const w = s * 0.5;
	for (const dy of [-s * 0.16, 0, s * 0.16]) g.roundRect(-w / 2, dy - s * 0.04, w, s * 0.08, s * 0.04);
	g.fill(WHITE);
};

export const iconPlus: Icon = (g, s) => {
	const l = s * 0.5;
	const t = s * 0.11;
	g.roundRect(-l / 2, -t / 2, l, t, t / 2).roundRect(-t / 2, -l / 2, t, l, t / 2).fill(WHITE);
};

export const iconMinus: Icon = (g, s) => {
	g.roundRect(-s * 0.25, -s * 0.055, s * 0.5, s * 0.11, s * 0.055).fill(WHITE);
};

export const iconChevron =
	(direction: 'up' | 'down'): Icon =>
	(g, s) => {
		const d = direction === 'up' ? 1 : -1;
		g.moveTo(-s * 0.26, s * 0.12 * d)
			.lineTo(0, -s * 0.12 * d)
			.lineTo(s * 0.26, s * 0.12 * d)
			.stroke({ width: s * 0.1, color: WHITE, cap: 'round', join: 'round' });
	};

// ring with a looping arrow and a play head, like Hacksaw's autoplay button
export const iconAutoplay =
	(active: boolean): Icon =>
	(g, s) => {
		const r = s * 0.34;
		g.circle(0, 0, r).fill({ color: active ? GOLD : 0x000000, alpha: active ? 1 : 0.35 });
		g.arc(0, 0, r * 0.62, -Math.PI * 0.35, Math.PI * 1.45).stroke({
			width: s * 0.06,
			color: active ? 0x000000 : WHITE,
		});
		g.poly([-s * 0.05, -s * 0.08, s * 0.09, 0, -s * 0.05, s * 0.08]).fill(active ? 0x000000 : WHITE);
		g.circle(0, 0, r).stroke({ width: s * 0.05, color: WHITE });
	};

export const iconTurbo =
	(active: boolean): Icon =>
	(g, s) => {
		g.circle(0, 0, s * 0.34).fill({ color: active ? GOLD : 0x000000, alpha: active ? 1 : 0.35 });
		g.poly([
			s * 0.05, -s * 0.22, -s * 0.12, s * 0.03, -s * 0.01, s * 0.03,
			-s * 0.05, s * 0.22, s * 0.12, -s * 0.04, s * 0.01, -s * 0.04,
		]).fill(active ? 0x000000 : WHITE);
		g.circle(0, 0, s * 0.34).stroke({ width: s * 0.05, color: WHITE });
	};

// big spin button: dark disc, white ring, circular arrow (or a stop square during autoplay)
export const drawSpin = (g: PIXI.Graphics, s: number, stop: boolean) => {
	const r = s / 2;
	g.circle(0, 0, r).fill({ color: 0x000000, alpha: 0.55 }).stroke({ width: s * 0.05, color: WHITE });
	if (stop) {
		g.roundRect(-s * 0.13, -s * 0.13, s * 0.26, s * 0.26, s * 0.04).fill(WHITE);
		return;
	}
	// clockwise loop with the gap at the top and the head pointing back into the gap
	const ar = r * 0.55;
	const start = -Math.PI / 2 + 0.55;
	const end = start + Math.PI * 2 - 1.1;
	g.arc(0, 0, ar, start, end).stroke({ width: s * 0.085, color: WHITE });
	const ex = Math.cos(end) * ar;
	const ey = Math.sin(end) * ar;
	g.poly([ex - s * 0.02, ey - s * 0.12, ex + s * 0.16, ey, ex - s * 0.02, ey + s * 0.12]).fill(WHITE);
};
