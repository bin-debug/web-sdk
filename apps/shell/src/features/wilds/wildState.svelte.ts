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
	constructor(id: number, pos: Position, value: number, hidden: boolean) {
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

export const wildLayer = $state<{ views: WildView[] }>({ views: [] });
let nextId = 1;

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const key = (p: Position) => `${p.reel}:${p.row}`;

const APPEAR_MS = 220;
const OPEN_MS = 350;
const STAGGER_MS = 80;

export function clearWilds() {
	wildLayer.views = [];
}

// Show the wild crates for a wildMults event. Visible ones are open, hidden ones closed. Resolves when all landed.
export async function placeWilds(positions: Position[], values: number[], hidden: boolean[] = []) {
	clearWilds();
	const jobs: Promise<unknown>[] = [];
	positions.forEach((pos, i) => {
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
	if (!wildLayer.views.length) return;
	const hit = new Set(winPositions.map((p) => key({ reel: p.reel, row: p.row - 1 })));
	const views = wildLayer.views.filter((v) => hit.has(key(v.pos))).sort((a, b) => a.pos.reel - b.pos.reel || a.pos.row - b.pos.row);
	const jobs = views.map((v, i) =>
		wait(t(i * STAGGER_MS)).then(async () => {
			if (v.hidden && v.open.current < 1) await v.open.set(1, { duration: t(OPEN_MS), easing: cubicOut });
			await v.pop.set(1.3, { duration: t(OPEN_MS * 0.4), easing: cubicOut });
			await v.pop.set(1, { duration: t(OPEN_MS * 0.4), easing: cubicOut });
		}),
	);
	await Promise.all(jobs);
}
