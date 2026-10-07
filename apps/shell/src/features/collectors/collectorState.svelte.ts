import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { BOARD_DIMENSIONS, SYMBOL_SIZE } from '../../game/constants';
import type { Position } from '../../game/types';
import { collectCoins } from '../coins/coinState.svelte';

export type Collector = Position | 'global' | 'pot';

export class CollectorView {
	readonly id: number;
	readonly collector: Collector;
	readonly total: number;
	readonly squash = new Tween(1);
	readonly totalPop = new Tween(0);
	constructor(id: number, collector: Collector, total: number) {
		this.id = id;
		this.collector = collector;
		this.total = total;
	}
	get x() {
		return typeof this.collector === 'object'
			? SYMBOL_SIZE * (this.collector.reel + 0.5)
			: SYMBOL_SIZE * (BOARD_DIMENSIONS.x / 2);
	}
	get y() {
		return typeof this.collector === 'object'
			? SYMBOL_SIZE * (this.collector.row + 0.5)
			: SYMBOL_SIZE * (BOARD_DIMENSIONS.y / 2);
	}
}

export const collectorLayer = $state<{ views: CollectorView[]; dimmed: boolean }>({
	views: [],
	dimmed: false,
});
let nextId = 1;
const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);

export async function collect(collector: Collector, sources: Position[], total: number) {
	const view = new CollectorView(nextId++, collector, total);
	collectorLayer.views.push(view);
	collectorLayer.dimmed = collector === 'global';
	await view.squash.set(1.18, { duration: t(120), easing: cubicOut });
	await collectCoins(sources, { x: view.x, y: view.y });
	await Promise.all([
		view.squash.set(1, { duration: t(160), easing: backOut }),
		view.totalPop.set(1, { duration: t(220), easing: backOut }),
	]);
	collectorLayer.views = collectorLayer.views.filter((item) => item.id !== view.id);
	collectorLayer.dimmed = false;
}
