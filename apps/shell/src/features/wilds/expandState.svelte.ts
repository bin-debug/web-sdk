import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

// Expanding reel wild: a wild lands on a reel and expands into a full-reel wild that stays for the bonus. Every spin the
// book re-sends `expandingWildReel` for each expanded reel with the new multiplier (display only: the amounts are in the
// wins). The first event for a reel plays the expansion, later ones re-roll the number.

export type ExpandedReel = { reel: number; mult: number; who: string; expand: Tween<number>; pop: Tween<number>; shown: Tween<number> };

export const expandLayer = $state<{ reels: ExpandedReel[] }>({ reels: [] });

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);

// character look per tier (a stand-in for the mascot stills): small 2-4, medium 5-20, large 25+
export const whoOfMult = (mult: number) => (mult < 5 ? 'small' : mult < 25 ? 'medium' : 'large');
export const WHO_LOOK: Record<string, { face: number; rim: number }> = {
	small: { face: 0x4aa3df, rim: 0x1d5f8f },
	medium: { face: 0xa56bd9, rim: 0x5b2f8a },
	large: { face: 0xf2c230, rim: 0x9a6b05 },
};

export function clearExpanding() {
	expandLayer.reels = [];
}

export async function expandReel(reel: number, mult: number, who?: string, animate = true) {
	const found = expandLayer.reels.find((r) => r.reel === reel);
	if (found) {
		// a new spin: a character pops up and the number counts to the new roll
		found.who = who ?? whoOfMult(mult);
		found.mult = mult;
		if (!animate) return found.shown.set(mult, { duration: 0 });
		found.pop.set(0, { duration: 0 });
		await Promise.all([found.pop.set(1, { duration: t(380), easing: backOut }), found.shown.set(mult, { duration: t(380), easing: cubicOut })]);
		return;
	}
	const view: ExpandedReel = { reel, mult, who: who ?? whoOfMult(mult), expand: new Tween(0), pop: new Tween(1), shown: new Tween(mult) };
	expandLayer.reels.push(view);
	const live = expandLayer.reels[expandLayer.reels.length - 1];
	await live.expand.set(1, { duration: animate ? t(600) : 0, easing: backOut });
}

type ExpandEvent = { type: string; reel?: number; mult?: number; who?: string };

// Resume after a reload: put back each expanded reel with its latest multiplier (no animation).
export function restoreExpanding(bookEvents: ExpandEvent[]) {
	clearExpanding();
	for (const e of bookEvents) if (e.type === 'expandingWildReel' && e.reel !== undefined) expandReel(e.reel, e.mult ?? 0, e.who, false);
}

if (import.meta.env.DEV && typeof window !== 'undefined') (window as unknown as { __expand: unknown }).__expand = { expandLayer };
