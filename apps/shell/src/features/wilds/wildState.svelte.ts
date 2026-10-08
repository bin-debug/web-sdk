import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { SYMBOL_SIZE } from '../../game/constants';
import type { Position } from '../../game/types';

// Multiplier wilds: a crate over each wild cell showing its multiplier. The book says which wilds carry which
// value (wildMults) and which are hidden; hidden crates stay closed until a win line includes them (winInfo).
// Nothing here decides a value, a win or an order: it only draws and opens what the book gave.

export type WildTier = 'wood' | 'iron' | 'gold';
export const tierOfValue = (value: number): WildTier => (value < 5 ? 'wood' : value < 25 ? 'iron' : 'gold');
export const TIER_SLOT: Record<WildTier, string> = { wood: 'symbol.MW1.static', iron: 'symbol.MW2.static', gold: 'symbol.MW3.static' };
export const TIER_LOOK: Record<WildTier, { face: number; rim: number }> = {
	wood: { face: 0x9a6a3a, rim: 0x5a3a1a },
	iron: { face: 0x8a97a8, rim: 0x3d4756 },
	gold: { face: 0xf2c230, rim: 0x9a6b05 },
};

export class WildView {
	readonly id: number;
	readonly pos: Position;
	readonly value: number;
	readonly hidden: boolean;
	readonly appear = new Tween(0); // crate drops in
	readonly open = new Tween(0); // 0 closed, 1 open (visible ones start open)
	readonly pop = new Tween(1); // number pop on open
	readonly slam = new Tween(1); // landing shockwave ring (sticky boxes), 0 -> 1
	readonly sticky: boolean;
	constructor(id: number, pos: Position, value: number, hidden: boolean, sticky = false) {
		this.sticky = sticky;
		this.id = id;
		this.pos = pos;
		this.value = value;
		this.hidden = hidden;
	}
	get x() {
		return SYMBOL_SIZE * (this.pos.reel + 0.5);
	}
	get y() {
		return SYMBOL_SIZE * (this.pos.row + 0.5);
	}
}

export const wildLayer = $state<{ views: WildView[]; sticky: WildView[] }>({ views: [], sticky: [] });
let nextId = 1;

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const key = (p: Position) => `${p.reel}:${p.row}`;

const APPEAR_MS = 220;
const OPEN_MS = 350;
const STAGGER_MS = 80;

// clears the crates of the current spin; sticky boxes stay until the round ends (clearSticky)
export function clearWilds() {
	wildLayer.views = [];
}

// Show the wild crates for a wildMults event. Visible ones are open, hidden ones closed. Resolves when all landed.
export async function placeWilds(positions: Position[], values: number[], hidden: boolean[] = []) {
	clearWilds();
	const jobs: Promise<unknown>[] = [];
	positions.forEach((pos, i) => {
		if (wildLayer.sticky.some((v) => key(v.pos) === key(pos))) return; // a stuck box already shows this cell
		const view = new WildView(nextId++, pos, values[i], Boolean(hidden[i]));
		wildLayer.views.push(view);
		const live = wildLayer.views[wildLayer.views.length - 1];
		if (!live.hidden) live.open.set(1, { duration: 0 });
		jobs.push(wait(t(i * STAGGER_MS)).then(() => live.appear.set(1, { duration: t(APPEAR_MS), easing: backOut })));
	});
	await Promise.all(jobs);
}

// A win line includes these cells (winInfo rows are padded: visible row + 1). Opens the wild crates on them, left to
// right: hidden ones burst open, visible ones pop their number. Resolves when the last one is open.
export async function openWilds(winPositions: Position[]) {
	const all = [...wildLayer.views, ...wildLayer.sticky];
	if (!all.length) return;
	const hit = new Set(winPositions.map((p) => key({ reel: p.reel, row: p.row - 1 })));
	const views = all.filter((v) => hit.has(key(v.pos))).sort((a, b) => a.pos.reel - b.pos.reel || a.pos.row - b.pos.row);
	const jobs = views.map((v, i) =>
		wait(t(i * STAGGER_MS)).then(async () => {
			if (v.hidden && v.open.current < 1) await v.open.set(1, { duration: t(OPEN_MS), easing: cubicOut });
			await v.pop.set(1.3, { duration: t(OPEN_MS * 0.4), easing: cubicOut });
			await v.pop.set(1, { duration: t(OPEN_MS * 0.4), easing: cubicOut });
		}),
	);
	await Promise.all(jobs);
}

// ---- sticky wilds (bonus): boxes that stay on their cells across respins ----
// The book lists each landing (addStickyWilds) and the counter (respinCounter); nothing here decides what sticks.
export const stickyCounter = $state({ active: false, remaining: 0, max: 3 });
export const stickyFx = $state({ phase: 0, flash: 0 });
let glowTimer: ReturnType<typeof setInterval> | undefined;
const glowStart = () => {
	if (glowTimer) return;
	glowTimer = setInterval(() => {
		stickyFx.phase++;
		if (stickyFx.flash > 0) stickyFx.flash = Math.max(0, stickyFx.flash - 0.12);
	}, 90);
};

// New boxes land and stick. mults is optional (0 = plain wild). Cells that already hold a box are skipped.
export async function addStickyWilds(positions: Position[], mults: number[] = [], animate = true) {
	const jobs: Promise<unknown>[] = [];
	let n = 0;
	positions.forEach((pos, i) => {
		if (wildLayer.sticky.some((v) => key(v.pos) === key(pos))) return;
		const view = new WildView(nextId++, pos, mults[i] ?? 0, false, true);
		view.open.set(1, { duration: 0 });
		if (!animate) {
			view.appear.set(1, { duration: 0 });
			view.slam.set(1, { duration: 0 });
		} else view.slam.set(0, { duration: 0 });
		wildLayer.sticky.push(view);
		if (!animate) return;
		const live = wildLayer.sticky[wildLayer.sticky.length - 1];
		jobs.push(
			wait(t(n++ * STAGGER_MS)).then(async () => {
				live.slam.set(1, { duration: t(450), easing: cubicOut });
				await live.appear.set(1, { duration: t(250), easing: backOut });
			}),
		);
	});
	if (wildLayer.sticky.length) glowStart();
	await Promise.all(jobs);
}

export function clearSticky() {
	wildLayer.sticky = [];
	stickyCounter.active = false;
	clearInterval(glowTimer);
	glowTimer = undefined;
}

export async function setStickyCounter(remaining: number, reset: boolean) {
	stickyCounter.active = true;
	stickyCounter.max = Math.max(stickyCounter.max, remaining);
	stickyCounter.remaining = remaining;
	if (reset) {
		stickyFx.flash = 1;
		await wait(t(450));
	}
}

type StickySnapshotEvent = { type: string; positions?: Position[]; mults?: number[]; remaining?: number };

// Resume after a reload: put back every box that already stuck and the counter, with no animation.
export function restoreSticky(bookEvents: StickySnapshotEvent[]) {
	clearSticky();
	for (const e of bookEvents) {
		if (e.type === 'addStickyWilds' && e.positions) addStickyWilds(e.positions, e.mults, false);
		if (e.type === 'respinCounter' && e.remaining !== undefined) {
			stickyCounter.active = true;
			stickyCounter.max = Math.max(stickyCounter.max, e.remaining);
			stickyCounter.remaining = e.remaining;
		}
	}
}

// dev handle for the QA scripts (tools/qa): poll wildLayer / stickyCounter to stop on a frame
if (import.meta.env.DEV && typeof window !== 'undefined') (window as unknown as { __sticky: unknown }).__sticky = { wildLayer, stickyCounter };
