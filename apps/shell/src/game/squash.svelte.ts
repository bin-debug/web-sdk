import { Tween } from 'svelte/motion';
import { cubicOut, elasticOut } from 'svelte/easing';

import { SYMBOL_SIZE } from './constants';

// Squash-and-stretch for symbols: stretch while falling, squash on impact, spring back.
// The symbol is scaled around its bottom edge so it looks like it hits the cell floor.
export const createSquash = () => {
	const sx = new Tween(1);
	const sy = new Tween(1);
	let playing = false;

	const squash = async () => {
		playing = true;
		await Promise.all([
			sx.set(1.18, { duration: 70, easing: cubicOut }),
			sy.set(0.76, { duration: 70, easing: cubicOut }),
		]);
		await Promise.all([
			sx.set(1, { duration: 420, easing: elasticOut }),
			sy.set(1, { duration: 420, easing: elasticOut }),
		]);
		playing = false;
	};

	const stretch = (on: boolean) => {
		if (playing) return;
		sx.set(on ? 0.9 : 1, { duration: 90 });
		sy.set(on ? 1.12 : 1, { duration: 90 });
	};

	// Keep the bottom edge fixed while scaling vertically.
	const offsetY = () => SYMBOL_SIZE * 0.45 * (1 - sy.current);

	return { sx, sy, squash, stretch, offsetY };
};
