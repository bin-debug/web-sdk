import { Tween } from 'svelte/motion';
import { backOut, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { eventEmitter } from '../../game/eventEmitter';
import { stateGame } from '../../game/stateGame.svelte';
import { BOARD_DIMENSIONS } from '../../game/constants';
import type { Position } from '../../game/types';
import type { Coin } from '../coins/tiers';
import { flipIn, payOut, placeCoins, clearCoins, coinLayer, multiplyCoins, collectCoins } from '../coins/coinState.svelte';
import { SYMBOL_SIZE } from '../../game/constants';
import { clearJackpots } from '../jackpots/jackpotState.svelte';

// Hold and win: a base spin lands coin symbols, the board swaps to the bonus grid, the coins stick and the empty cells
// respin (3 respins, back to 3 whenever a coin lands). When the respins run out every coin is collected one by one
// (holdCollect / jackpotWin events), then holdEnd. This module only stages what the book says: lives, coins, multipliers,
// payout order and every running total come from the events, never from the client.

export const hold = $state({
	active: false,
	lives: 0, // respins left
	mode: 'standard',
	spinCols: [] as boolean[], // reels whose empty cells are spinning right now
	phase: 0, // ticks while empty cells spin (drives the strip scroll)
	banner: '',
	bannerSub: '',
});
export const holdFx = {
	banner: new Tween(0), // banner pop 0..1
	pulse: new Tween(1), // respin counter pop
	flash: new Tween(0), // full-grid flash
};

// dev handle for the QA scripts (tools/qa): poll hold / holdFx to stop on a frame
if (import.meta.env.DEV && typeof window !== 'undefined') (window as unknown as { __hold: unknown }).__hold = { hold, holdFx };

const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const INTRO_MS = 900;
const SPIN_MS = 700; // every empty reel spins this long before the first one stops
const STOP_MS = 220; // then they stop one after another, left to right

let timer: ReturnType<typeof setInterval> | undefined;
const key = (reel: number, row: number) => `${reel}:${row}`;
// a cell is held when a coin sits on it; every other cell is empty and spins on a respin
export const heldKeys = () => new Set(coinLayer.views.map((v) => key(v.coin.pos.reel, v.coin.pos.row)));
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

const pulseCounter = async () => {
	await holdFx.pulse.set(1.3, { duration: t(120), easing: cubicOut });
	await holdFx.pulse.set(1, { duration: t(180), easing: backOut });
};

const showWin = (amount: number, animate: boolean) => {
	eventEmitter.broadcast({ type: 'tumbleWinAmountShow' });
	eventEmitter.broadcast({ type: 'tumbleWinAmountUpdate', amount, animate });
};

// the bonus screen: the bonus background and the hold grid replace the base reels while the feature runs
const enterBonus = () => {
	hold.active = true;
	stateGame.gameType = 'freegame';
	eventEmitter.broadcast({ type: 'boardHide' });
};
const leaveBonus = () => {
	hold.active = false;
	stateGame.gameType = 'basegame';
	eventEmitter.broadcast({ type: 'boardShow' });
};

export async function startHold(coins: Coin[], lives: number, mode: string) {
	clearCoins();
	hold.lives = lives;
	hold.mode = mode;
	enterBonus();
	await showBanner(mode === 'epic' ? 'EPIC HOLD & WIN' : 'HOLD & WIN', `${lives} respins`, INTRO_MS);
	await flipIn(coins);
}

// One respin: only the empty cells spin (the coins already held stay put). The reels stop left to right and the
// coins in `landed` stick as their reel stops. Which cells land is the book's call, never ours.
export async function respin(landed: Coin[], lives: number) {
	const reels = emptyReels();
	if (reels.length) spinStart(reels);
	await wait(t(SPIN_MS));
	const jobs: Promise<void>[] = [];
	for (const reel of reels) {
		await wait(t(STOP_MS));
		hold.spinCols = hold.spinCols.map((spinning, i) => spinning && i !== reel);
		const here = landed.filter((coin) => coin.pos.reel === reel);
		if (here.length) jobs.push(flipIn(here));
	}
	await Promise.all(jobs);
	spinStop();
	hold.lives = lives;
	await pulseCounter();
}

// A multiplier coin landed: the book lists the coins it multiplies.
export async function multiplyHeld(mult: number, targets: Position[]) {
	await multiplyCoins(targets, mult);
}

// A collect coin landed: the cash coins the book lists fly into it, their cells free up (they respin) and it shows the book's total.
export async function gatherHeld(pos: Position, sources: Position[], total: number) {
	const target = { x: SYMBOL_SIZE * (pos.reel + 0.5), y: SYMBOL_SIZE * (pos.row + 0.5) };
	await collectCoins(sources, target);
	const view = coinLayer.views.find((v) => v.coin.pos.reel === pos.reel && v.coin.pos.row === pos.row);
	if (view) {
		await view.pop.set(1.25, { duration: t(120), easing: cubicOut });
		view.value.set(total / 100, { duration: t(300), easing: cubicOut });
		await view.pop.set(1, { duration: t(180), easing: backOut });
	}
}

// One coin of the end-of-round collect: it flies to the win meter and the book's running total shows.
export async function collectHeld(pos: Position, running: number) {
	showWin(running, true);
	await payOut([{ pos, kind: 'bronze' }]);
}

export async function endHold(total: number, fullGrid: boolean) {
	spinStop();
	if (fullGrid) {
		holdFx.flash.set(1, { duration: t(260) });
		await showBanner('FULL GRID!', 'Every cell is filled', 900);
		await holdFx.flash.set(0, { duration: t(250) });
	}
	showWin(total, true);
	await wait(t(350));
	leaveBonus();
	clearCoins();
	clearJackpots();
}

type SnapshotEvent = {
	type: string;
	coins?: Coin[];
	new?: Coin[];
	lives?: number;
	mode?: string;
	pos?: Position;
	positions?: Position[];
	mult?: number;
	targets?: Position[];
	sources?: Position[];
	total?: number;
	running?: number;
};

// Resume after a reload: rebuild the held coins, multipliers, collected coins and respins from the events that already played (no animation).
export function restoreHold(bookEvents: SnapshotEvent[]) {
	const startAt = bookEvents.map((e) => e.type).lastIndexOf('holdStart');
	if (startAt < 0 || bookEvents.slice(startAt).some((e) => e.type === 'holdEnd')) return;
	const held = new Map<string, Coin>();
	let lives = 0;
	let running = 0;
	for (const e of bookEvents.slice(startAt)) {
		if (e.type === 'holdStart') {
			lives = e.lives ?? 0;
			hold.mode = e.mode ?? 'standard';
		}
		if (e.type === 'respin') lives = e.lives ?? lives;
		const landed = e.type === 'holdStart' ? e.coins : e.type === 'respin' ? e.new : undefined;
		for (const coin of landed ?? []) held.set(key(coin.pos.reel, coin.pos.row), coin);
		if (e.type === 'holdMultiply')
			for (const p of e.targets ?? []) {
				const coin = held.get(key(p.reel, p.row));
				if (coin?.value !== undefined) held.set(key(p.reel, p.row), { ...coin, value: coin.value * (e.mult ?? 1) });
			}
		if (e.type === 'holdCollectAll' && e.pos) {
			for (const p of e.sources ?? []) held.delete(key(p.reel, p.row));
			const gatherer = held.get(key(e.pos.reel, e.pos.row));
			if (gatherer) held.set(key(e.pos.reel, e.pos.row), { ...gatherer, value: (e.total ?? 0) / 100 });
		}
		if (e.type === 'holdCollect' && e.pos) held.delete(key(e.pos.reel, e.pos.row));
		if (e.type === 'jackpotWin') for (const p of e.positions ?? []) held.delete(key(p.reel, p.row));
		if (e.type === 'holdCollect' || e.type === 'jackpotWin') running = e.running ?? running;
	}
	clearCoins();
	placeCoins([...held.values()]);
	hold.lives = lives;
	enterBonus();
	if (running) showWin(running, false);
}

// a new spin always starts outside the mode (an interrupted or skipped round must not leave it open)
export function clearHold() {
	spinStop();
	hold.active = false;
	hold.banner = '';
	holdFx.banner.set(0, { duration: 0 });
}
