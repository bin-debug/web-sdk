import { Tween } from 'svelte/motion';
import { backOut, cubicIn, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { BOARD_DIMENSIONS } from '../../game/constants';

export class StashBox {
	readonly reel: number;
	readonly value: Tween<number>;
	readonly bump = new Tween(1);
	readonly drain = new Tween(0);
	banked = false;
	constructor(reel: number, value: number, banked = false) {
		this.reel = reel;
		this.value = new Tween(value);
		this.banked = banked;
	}
}

export const stashLayer = $state<{ boxes: StashBox[] }>({ boxes: [] });
const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const makeBoxes = (banked = false) =>
	Array.from({ length: BOARD_DIMENSIONS.x }, (_, reel) => new StashBox(reel, banked ? 0 : 1, banked));

// A bonus always starts from book-independent visual defaults: x1 for multiplier stashes, 0x for banks.
// The first stashUpdate says which variant is active and then supplies every displayed number.
export function startStash() {
	stashLayer.boxes = makeBoxes();
}

export function clearStash() {
	stashLayer.boxes = [];
}

export async function updateStash(reel: number, value: number, banked?: number) {
	if (!stashLayer.boxes.length) startStash();
	if (banked !== undefined && !stashLayer.boxes.some((box) => box.banked)) stashLayer.boxes = makeBoxes(true);
	const box = stashLayer.boxes[reel];
	if (!box) return;
	box.banked = banked !== undefined;
	await box.bump.set(1.22, { duration: t(100), easing: cubicOut });
	await Promise.all([
		box.value.set(banked ?? value, { duration: t(250), easing: cubicOut }),
		box.bump.set(1, { duration: t(150), easing: backOut }),
	]);
}

// Bank totals are paid by freeSpinEnd, so the boxes simply drain in book reel order. The win meter itself
// remains owned by the normal free-spin event; this renderer never totals or pays anything.
export async function payOutStash() {
	const boxes = stashLayer.boxes.filter((box) => box.banked && box.value.current > 0);
	for (const box of boxes) {
		await box.bump.set(1.16, { duration: t(100), easing: cubicOut });
		await Promise.all([
			box.drain.set(1, { duration: t(260), easing: cubicIn }),
			box.bump.set(0.45, { duration: t(260), easing: cubicIn }),
		]);
		await wait(t(45));
	}
	clearStash();
}

type SnapshotEvent = { type: string; reel?: number; value?: number; banked?: number };

// Snapshot reconstruction is deliberately instant. A bonus snapshot contains just the latest updates and
// freeSpinTrigger, so a reload never replays the earlier expansion animation.
export function restoreStash(bookEvents: SnapshotEvent[]) {
	const first = bookEvents.findIndex((event) => event.type === 'freeSpinTrigger');
	if (first < 0) return;
	const updates = bookEvents.slice(first).filter((event) => event.type === 'stashUpdate');
	const banked = updates.some((event) => event.banked !== undefined);
	stashLayer.boxes = makeBoxes(banked);
	for (const event of updates) {
		if (event.reel === undefined || event.value === undefined) continue;
		const box = stashLayer.boxes[event.reel];
		if (!box) continue;
		box.banked = event.banked !== undefined;
		box.value.set(event.banked ?? event.value, { duration: 0 });
	}
}
