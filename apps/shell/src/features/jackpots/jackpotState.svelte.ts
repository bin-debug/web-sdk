import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import type { Position } from '../../game/types';
import type { Coin } from '../coins/tiers';

export type JackpotTier = 'mini' | 'minor' | 'major' | 'grand';
// tier colours shared by the pills and the markers on the board, so a marker matches its pill
export const TIER_LOOK = {
	mini: { face: 0x35be76, rim: 0x0f643b },
	minor: { face: 0x4298e8, rim: 0x19558c },
	major: { face: 0xdf4f9b, rim: 0x8b2158 },
	grand: { face: 0xee8b35, rim: 0x9a4612 },
} as const;

export const jackpot = $state({
	active: null as JackpotTier | null,
	amount: 0,
	positions: [] as Position[],
	markers: [] as { pos: Position; tier: JackpotTier }[],
	grand: false,
});
export const jackpotFx = {
	flash: new Tween(0),
	amount: new Tween(0),
	pop: new Tween(1),
};

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// The event owns the tier, marker order, positions and amount. This state only stages that supplied result.
export async function winJackpot(tier: JackpotTier, amount: number, positions: Position[] = []) {
	jackpot.active = tier;
	jackpot.amount = amount;
	jackpot.positions = positions;
	jackpot.grand = tier === 'grand';
	jackpotFx.amount.set(0, { duration: 0 });
	await jackpotFx.flash.set(1, { duration: t(160), easing: cubicOut });
	await Promise.all([
		jackpotFx.amount.set(amount, { duration: t(620), easing: cubicOut }),
		jackpotFx.pop.set(1.22, { duration: t(150), easing: backOut }),
	]);
	await jackpotFx.pop.set(1, { duration: t(180), easing: backOut });
	await wait(t(tier === 'grand' ? 900 : 420));
	jackpotFx.flash.set(0, { duration: t(220), easing: cubicOut });
	jackpot.positions = [];
	jackpot.grand = false;
	jackpot.active = null;
}

// Hold and win supplies jackpot markers inside its coin arrays. Keep them visible until its payout event.
export function addJackpotMarkers(coins: Coin[]) {
	for (const coin of coins) {
		if (coin.kind !== 'jackpot' || !coin.tier) continue;
		jackpot.markers = [...jackpot.markers.filter((marker) => marker.pos.reel !== coin.pos.reel || marker.pos.row !== coin.pos.row), { pos: coin.pos, tier: coin.tier }];
	}
}

// A fresh reveal and an interrupted round must not retain a paid marker or celebration.
export function clearJackpots() {
	jackpot.active = null;
	jackpot.amount = 0;
	jackpot.positions = [];
	jackpot.markers = [];
	jackpot.grand = false;
	jackpotFx.flash.set(0, { duration: 0 });
	jackpotFx.amount.set(0, { duration: 0 });
	jackpotFx.pop.set(1, { duration: 0 });
}
