import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { SYMBOL_SIZE } from '../../game/constants';
import type { Position } from '../../game/types';
import { multiplyCoins } from '../coins/coinState.svelte';

export type CloverScope = 'adjacent' | 'global';

export class CloverView {
	readonly id: number;
	readonly pos: Position;
	readonly scope: CloverScope;
	readonly mult: number;
	readonly targets: Position[];
	readonly burst = new Tween(0);
	readonly trails: Tween<number>[];
	constructor(id: number, pos: Position, scope: CloverScope, mult: number, targets: Position[]) {
		this.id = id;
		this.pos = pos;
		this.scope = scope;
		this.mult = mult;
		this.targets = targets;
		this.trails = targets.map(() => new Tween(0));
	}
	get x() {
		return SYMBOL_SIZE * (this.pos.reel + 0.5);
	}
	get y() {
		return SYMBOL_SIZE * (this.pos.row + 0.5);
	}
}

export const cloverLayer = $state<{ views: CloverView[] }>({ views: [] });
let nextId = 1;
const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// The book supplies the scope, multiplier and exact target order. This module only stages them.
export async function applyClover(
	pos: Position,
	scope: CloverScope,
	mult: number,
	targets: Position[],
) {
	const view = new CloverView(nextId++, pos, scope, mult, targets);
	cloverLayer.views.push(view);
	await view.burst.set(1, { duration: t(300), easing: backOut });
	await Promise.all(
		view.trails.map(async (trail, i) => {
			await wait(t(60) * i);
			await trail.set(1, { duration: t(250), easing: cubicOut });
		}),
	);
	await multiplyCoins(targets, mult);
	await view.burst.set(0, { duration: t(120) });
	cloverLayer.views = cloverLayer.views.filter((item) => item.id !== view.id);
}
