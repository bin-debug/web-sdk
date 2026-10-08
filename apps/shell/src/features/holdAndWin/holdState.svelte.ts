import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { eventEmitter } from '../../game/eventEmitter';
import type { Coin } from '../coins/tiers';
import { flipIn, payOut, placeCoins, clearCoins, coinLayer } from '../coins/coinState.svelte';
import { BOARD_DIMENSIONS } from '../../game/constants';
import { addJackpotMarkers, clearJackpots, jackpot } from '../jackpots/jackpotState.svelte';

// Hold and win: the board turns into coin cells that stick. This module only stages what the book says
// (holdStart / respin / holdEnd): lives, coins and totals all come from the events, never from the client.

export const hold = $state({
	active: false,
	lives: 0,
	maxLives: 3,
	mode: 'standard',
	spinCols: [] as boolean[], // reels whose empty cells are spinning right now
	phase: 0, // ticks while empty cells spin (drives the strip scroll)
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
const SPIN_MS = 700; // every empty reel spins this long before the first one stops
const STOP_MS = 220; // then they stop one after another, left to right

let timer: ReturnType<typeof setInterval> | undefined;
const key = (reel: number, row: number) => `${reel}:${row}`;
// a cell is held when a coin or a jackpot marker sits on it; every other cell is empty and spins on a respin
export const heldKeys = () =>
	new Set([...coinLayer.views.map((v) => key(v.coin.pos.reel, v.coin.pos.row)), ...jackpot.markers.map((m) => key(m.pos.reel, m.pos.row))]);
const emptyReels = () => {
	const held = heldKeys();
	return Array.from({ length: BOARD_DIMENSIONS.x }, (_, reel) => reel).filter((reel) =>
		Array.from({ length: BOARD_DIMENSIONS.y }, (_, row) => row).some((row) => !held.has(key(reel, row))),
	);
};
const spinStart = (reels: number[]) => {
	hold.spinCols = Array.from({ length: BOARD_DIMENSIONS.x }, (_, reel) => reels.includes(reel));
	clearInterval(timer);
	timer = setInterval(() => hold.phase++, 33);
};
const spinStop = () => {
	hold.spinCols = [];
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
	addJackpotMarkers(coins);
	hold.active = true;
	hold.lives = lives;
	hold.maxLives = Math.max(lives, 1);
	hold.mode = mode;
	await showBanner(mode === 'epic' ? 'EPIC HOLD & WIN' : 'HOLD & WIN', `${lives} respins`, INTRO_MS);
	await flipIn(coins);
}

// One respin: only the empty cells spin (the coins already held stay put). The reels stop left to right and the
// coins / markers in `landed` stick as their reel stops. Which cells land is the book's call, never ours.
export async function respin(landed: Coin[], lives: number) {
	const reels = emptyReels();
	if (reels.length) spinStart(reels);
	await wait(t(SPIN_MS));
	const jobs: Promise<void>[] = [];
	for (const reel of reels) {
		await wait(t(STOP_MS));
		hold.spinCols = hold.spinCols.map((spinning, i) => spinning && i !== reel);
		const here = landed.filter((coin) => coin.pos.reel === reel);
		if (here.length) {
			jobs.push(flipIn(here));
			addJackpotMarkers(here);
		}
	}
	await Promise.all(jobs);
	spinStop();
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
	clearJackpots();
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
	addJackpotMarkers([...held.values()]);
	placeCoins([...held.values()]);
	hold.lives = lives;
	hold.active = true;
}

// a new spin always starts outside the mode (an interrupted or skipped round must not leave it open)
export function clearHold() {
	spinStop();
	hold.active = false;
	hold.banner = '';
	holdFx.banner.set(0, { duration: 0 });
}
