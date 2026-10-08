import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import type { Position } from '../../game/types';
import { flipIn } from '../coins/coinState.svelte';
import type { Coin } from '../coins/tiers';

// Trigger row: a special symbol on the bottom row stretches into a full-reel pillar (expandReel), then the reel's cells
// flip into coins (kind 'coin', via the coin layer) or into free-spin tiles (kind 'fs'). The book lists the cells in
// flip order; nothing here decides a value, a reel or an order.

export class Pillar {
	readonly reel: number;
	readonly kind: 'coin' | 'fs';
	readonly grow = new Tween(0); // 0 = the trigger cell only, 1 = the full reel
	readonly fade = new Tween(1);
	constructor(reel: number, kind: 'coin' | 'fs') {
		this.reel = reel;
		this.kind = kind;
	}
}

export class FsTile {
	readonly id: number;
	readonly pos: Position;
	readonly flip = new Tween(0);
	readonly pop = new Tween(1);
	constructor(id: number, pos: Position) {
		this.id = id;
		this.pos = pos;
	}
}

export const triggerLayer = $state<{ pillars: Pillar[]; tiles: FsTile[] }>({ pillars: [], tiles: [] });
let nextId = 1;

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const PILLAR_MS = 650;
const STAGGER_MS = 80;

export function clearTrigger() {
	triggerLayer.pillars = [];
	triggerLayer.tiles = [];
}

async function flipTiles(cells: Coin[]) {
	await Promise.all(
		cells.map(async (cell, i) => {
			const tile = new FsTile(nextId++, cell.pos);
			triggerLayer.tiles = triggerLayer.tiles.filter((x) => `${x.pos.reel}:${x.pos.row}` !== `${cell.pos.reel}:${cell.pos.row}`);
			triggerLayer.tiles.push(tile);
			const live = triggerLayer.tiles[triggerLayer.tiles.length - 1];
			await wait(t(STAGGER_MS) * i);
			await live.flip.set(1, { duration: t(250), easing: backOut });
			await live.pop.set(1.2, { duration: t(120), easing: cubicOut });
			await live.pop.set(1, { duration: t(180), easing: backOut });
		}),
	);
}

export async function expandReel(reel: number, kind: 'coin' | 'fs', cells: Coin[]) {
	triggerLayer.pillars = triggerLayer.pillars.filter((p) => p.reel !== reel);
	const pillar = new Pillar(reel, kind);
	triggerLayer.pillars.push(pillar);
	const live = triggerLayer.pillars[triggerLayer.pillars.length - 1];
	await live.grow.set(1, { duration: t(PILLAR_MS), easing: cubicOut });
	if (kind === 'coin') await flipIn(cells);
	else await flipTiles(cells);
	// the pillar has done its job once the cells are shown
	await wait(t(250));
	await live.fade.set(0, { duration: t(300), easing: cubicOut });
	triggerLayer.pillars = triggerLayer.pillars.filter((p) => p !== live);
}

if (import.meta.env.DEV && typeof window !== 'undefined') (window as unknown as { __trigger: unknown }).__trigger = { triggerLayer };
