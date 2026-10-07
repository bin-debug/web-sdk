import { Tween } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import type { Position } from '../../game/types';

export class SquareView {
	readonly id: string;
	readonly pos: Position;
	readonly appear = new Tween(0);
	constructor(pos: Position) {
		this.id = `${pos.reel}:${pos.row}`;
		this.pos = pos;
	}
}

export const squaresState = $state<{ views: SquareView[] }>({ views: [] });
const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const key = (pos: Position) => `${pos.reel}:${pos.row}`;

export async function addSquares(positions: Position[]) {
	const fresh = positions.filter((pos) => !squaresState.views.some((view) => view.id === key(pos)));
	const views = fresh.map((pos) => new SquareView(pos));
	squaresState.views.push(...views);
	await Promise.all(views.map((view) => view.appear.set(1, { duration: t(200), easing: cubicOut })));
}

export async function clearSquares(positions?: Position[]) {
	const selected = positions
		? squaresState.views.filter((view) => positions.some((pos) => key(pos) === view.id))
		: [...squaresState.views];
	await Promise.all(selected.map((view) => view.appear.set(0, { duration: t(250), easing: cubicOut })));
	const removed = new Set(selected.map((view) => view.id));
	squaresState.views = squaresState.views.filter((view) => !removed.has(view.id));
}

// Snapshots restore the already-resolved square state without replaying the entrance animation.
export function restoreSquares(bookEvents: { type: string; positions?: Position[] }[]) {
	const kept = new Map<string, Position>();
	for (const event of bookEvents) {
		if (event.type === 'squaresAdd') event.positions?.forEach((pos) => kept.set(key(pos), pos));
		if (event.type === 'squaresClear') {
			if (!event.positions) kept.clear();
			else event.positions.forEach((pos) => kept.delete(key(pos)));
		}
	}
	squaresState.views = [...kept.values()].map((pos) => {
		const view = new SquareView(pos);
		view.appear.current = 1;
		return view;
	});
}

// a base-game spin starts with no tiles (a bonus keeps them until the book clears them)
export function resetSquares() {
	squaresState.views = [];
}
