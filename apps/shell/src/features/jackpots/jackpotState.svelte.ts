import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { eventEmitter } from '../../game/eventEmitter';
import type { Position } from '../../game/types';
import { payOut } from '../coins/coinState.svelte';

export type JackpotTier = 'mini' | 'minor' | 'major' | 'grand';

export const jackpot = $state({
	active: null as JackpotTier | null,
	grand: false,
});
export const jackpotFx = {
	amount: new Tween(0),
	pop: new Tween(1),
};

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// A jackpot coin is collected like any coin, but it pays its tier: the pill lights, the coin flies up and the book's
// running total shows. The tier, amount, positions and running total are all the event's; this only stages them.
export async function winJackpot(tier: JackpotTier, amount: number, positions: Position[], running?: number) {
	jackpot.active = tier;
	jackpot.grand = tier === 'grand';
	jackpotFx.amount.set(0, { duration: 0 });
	if (running !== undefined) {
		eventEmitter.broadcast({ type: 'tumbleWinAmountShow' });
		eventEmitter.broadcast({ type: 'tumbleWinAmountUpdate', amount: running, animate: true });
	}
	await Promise.all([
		payOut(positions.map((pos) => ({ pos, kind: 'jackpot' as const }))),
		jackpotFx.amount.set(amount, { duration: t(620), easing: cubicOut }),
		jackpotFx.pop.set(1.22, { duration: t(150), easing: backOut }),
	]);
	await jackpotFx.pop.set(1, { duration: t(180), easing: backOut });
	await wait(t(tier === 'grand' ? 900 : 300));
	jackpot.grand = false;
	jackpot.active = null;
}

// A fresh reveal and an interrupted round must not retain a celebration.
export function clearJackpots() {
	jackpot.active = null;
	jackpot.grand = false;
	jackpotFx.amount.set(0, { duration: 0 });
	jackpotFx.pop.set(1, { duration: 0 });
}
