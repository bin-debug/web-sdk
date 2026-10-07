import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { eventEmitter } from '../../game/eventEmitter';
import type { Coin } from '../coins/tiers';
import { flipIn, payOut, placeCoins, clearCoins } from '../coins/coinState.svelte';

// Hold and win: the board turns into coin cells that stick. This module only stages what the book says
// (holdStart / respin / holdEnd): lives, coins and totals all come from the events, never from the client.

export const hold = $state({
	active: false,
	lives: 0,
	maxLives: 3,
	mode: 'standard',
	spinning: false,
	phase: 0, // ticks while empty cells spin (drives the ghost shimmer)
	banner: '',
	bannerSub: '',
});
export const holdFx = {
	banner: new Tween(0), // banner pop 0..1
	pulse: new Tween(1), // life meter pop
	flash: new Tween(0), // full-grid flash
};

// dev handle for the QA scripts (tools/qa): poll hold / holdFx to stop on a frame
if (import.meta.env.DEV && typeof window !== 'undefined') (window as unknown as { __hold: unknown }).__hold = { hold, holdFx };

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const INTRO_MS = 800;
const SPIN_MS = 650;

let timer: ReturnType<typeof setInterval> | undefined;
const spinStart = () => {
	hold.spinning = true;
	clearInterval(timer);
	timer = setInterval(() => hold.phase++, 90);
};
const spinStop = () => {
	hold.spinning = false;
	clearInterval(timer);
};

const showBanner = async (title: string, sub: string, ms: number) => {
	hold.banner = title;
	hold.bannerSub = sub;
	await holdFx.banner.set(1, { duration: t(260), easing: backOut });
	await wait(t(ms));
	await holdFx.banner.set(0, { duration: t(200), easing: cubicOut });
};

const pulseMeter = async () => {
	await holdFx.pulse.set(1.35, { duration: t(120), easing: cubicOut });
	await holdFx.pulse.set(1, { duration: t(180), easing: backOut });
};

export async function startHold(coins: Coin[], lives: number, mode: string) {
	clearCoins();
	hold.active = true;
	hold.lives = lives;
	hold.maxLives = Math.max(lives, 1);
	hold.mode = mode;
	eventEmitter.broadcast({ type: 'boardHide' });
	await showBanner(mode === 'epic' ? 'EPIC HOLD & WIN' : 'HOLD & WIN', `${lives} respins`, INTRO_MS);
	await flipIn(coins);
}

// One respin: only the empty cells spin (the coins already held stay put), then the coins in `landed` stick.
export async function respin(landed: Coin[], lives: number) {
	spinStart();
	await wait(t(SPIN_MS));
	spinStop();
	if (landed.length) await flipIn(landed);
	hold.lives = lives;
	await pulseMeter();
}

export async function endHold(total: number, fullGrid: boolean) {
	spinStop();
	if (fullGrid) {
		holdFx.flash.set(1, { duration: t(260) });
		await showBanner('FULL GRID!', 'Every cell pays', 1000);
		await holdFx.flash.set(0, { duration: t(250) });
	}
	eventEmitter.broadcast({ type: 'tumbleWinAmountShow' });
	eventEmitter.broadcast({ type: 'tumbleWinAmountUpdate', amount: total, animate: true });
	await payOut();
	hold.active = false;
	hold.banner = '';
	eventEmitter.broadcast({ type: 'boardShow' });
}

type SnapshotEvent = { type: string; coins?: Coin[]; new?: Coin[]; lives?: number; mode?: string };

// Resume after a reload: rebuild the held coins and the lives from the events that already played (no animation).
export function restoreHold(bookEvents: SnapshotEvent[]) {
	const startAt = bookEvents.map((e) => e.type).lastIndexOf('holdStart');
	if (startAt < 0 || bookEvents.slice(startAt).some((e) => e.type === 'holdEnd')) return;
	const held = new Map<string, Coin>();
	let lives = 0;
	for (const e of bookEvents.slice(startAt)) {
		if (e.type === 'holdStart') {
			lives = e.lives ?? 0;
			hold.mode = e.mode ?? 'standard';
			hold.maxLives = Math.max(lives, 1);
		}
		if (e.type === 'respin') lives = e.lives ?? lives;
		const landed = e.type === 'holdStart' ? e.coins : e.type === 'respin' ? e.new : undefined;
		for (const coin of landed ?? []) held.set(`${coin.pos.reel}:${coin.pos.row}`, coin);
	}
	clearCoins();
	placeCoins([...held.values()]);
	hold.lives = lives;
	hold.active = true;
	eventEmitter.broadcast({ type: 'boardHide' });
}

// a new spin always starts outside the mode (an interrupted or skipped round must not leave it open)
export function clearHold() {
	spinStop();
	hold.active = false;
	hold.banner = '';
	holdFx.banner.set(0, { duration: 0 });
}
