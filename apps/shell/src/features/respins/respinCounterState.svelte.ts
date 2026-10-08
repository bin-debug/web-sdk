import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

export type CounterStyle = 'hearts' | 'counter';

export const respinCounter = $state({
	active: false,
	remaining: 0,
	max: 3,
	style: 'counter' as CounterStyle,
	placement: 'board' as 'board' | 'hold',
});

export const respinCounterFx = {
	pulse: new Tween(1),
	flash: new Tween(0),
};

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function setRespinCounter(remaining: number, reset: boolean, placement = respinCounter.placement, style = respinCounter.style) {
	respinCounter.active = true;
	respinCounter.remaining = remaining;
	respinCounter.max = Math.max(respinCounter.max, remaining);
	respinCounter.placement = placement;
	respinCounter.style = style;
	if (!reset) return;
	respinCounterFx.flash.set(1, { duration: 0 });
	await respinCounterFx.pulse.set(1.28, { duration: t(120), easing: cubicOut });
	await Promise.all([
		respinCounterFx.pulse.set(1, { duration: t(180), easing: backOut }),
		wait(t(300)).then(() => respinCounterFx.flash.set(0, { duration: 0 })),
	]);
}

export function clearRespinCounter() {
	respinCounter.active = false;
	respinCounter.max = 3;
	respinCounterFx.pulse.set(1, { duration: 0 });
	respinCounterFx.flash.set(0, { duration: 0 });
}

type CounterSnapshotEvent = { type: string; remaining?: number; reset?: boolean };

export function restoreRespinCounter(bookEvents: CounterSnapshotEvent[]) {
	const last = [...bookEvents].reverse().find((event) => event.type === 'respinCounter' && event.remaining !== undefined);
	if (last?.remaining === undefined) return;
	respinCounter.active = true;
	respinCounter.remaining = last.remaining;
	respinCounter.max = Math.max(3, ...bookEvents.filter((event) => event.type === 'respinCounter').map((event) => event.remaining ?? 0));
	respinCounter.style = 'counter';
	respinCounter.placement = 'board';
}
