import { Tween } from 'svelte/motion';
import { backOut, cubicIn, cubicOut } from 'svelte/easing';

import { stateBet } from 'state-shared';

import { eventEmitter } from '../../game/eventEmitter';
import { SYMBOL_SIZE } from '../../game/constants';
import type { Position } from '../../game/types';
import { isCoinKind, type Coin } from './tiers';

// The coin layer: coins by board position, drawn by CoinLayer.svelte. Other features (rainbow reveal, hold and
// win, layers, trigger row) call flipIn / payOut / clearCoins with the coins their events carry; this module
// never decides a value or an order, it only animates what it is given.

export class CoinView {
	readonly id: number;
	readonly coin: Coin;
	readonly flip = new Tween(0); // 0 = hidden (edge on), 1 = fully shown
	readonly pop = new Tween(1); // value text pop and payout pop
	readonly glint = new Tween(0); // 0..1 sweep of the gold glint
	readonly fade = new Tween(1);
	readonly rise = new Tween(0); // payout: how far the coin has flown up (in cells)
	constructor(id: number, coin: Coin) {
		this.id = id;
		this.coin = coin;
	}
	get x() {
		return SYMBOL_SIZE * (this.coin.pos.reel + 0.5);
	}
	get y() {
		return SYMBOL_SIZE * (this.coin.pos.row + 0.5);
	}
}

export const coinLayer = $state<{ views: CoinView[] }>({ views: [] });
let nextId = 1;

// turbo and skip (the stop button turns turbo on, holding space does too) run the same steps at 0.4x time
const t = (ms: number) => ms * (stateBet.isTurbo || stateBet.isSpaceHold ? 0.4 : 1);
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const key = (p: Position) => `${p.reel}:${p.row}`;

const FLIP_MS = 250;
const STAGGER_MS = 80;
const GLINT_MS = 300;
const POP_MS = 120;

const spawn = (coin: Coin) => {
	// one coin per cell: a new coin replaces the old one on that cell
	coinLayer.views = coinLayer.views.filter((v) => key(v.coin.pos) !== key(coin.pos));
	const view = new CoinView(nextId++, coin);
	coinLayer.views.push(view);
	return coinLayer.views[coinLayer.views.length - 1]; // the reactive proxy of the view
};

// Flip the coins in one after another (book order). Resolves when the last coin has landed.
export async function flipIn(coins: Coin[], { stagger = STAGGER_MS }: { stagger?: number } = {}) {
	const list = coins.filter((c) => isCoinKind(c.kind));
	const jobs: Promise<void>[] = [];
	for (let i = 0; i < list.length; i++) {
		const view = spawn(list[i]);
		jobs.push(
			(async () => {
				await wait(t(stagger) * i);
				eventEmitter.broadcast({ type: 'soundOnce', name: 'coin_flip' });
				await view.flip.set(1, { duration: t(FLIP_MS), easing: backOut });
				view.glint.set(1, { duration: t(GLINT_MS), easing: cubicOut });
				await view.pop.set(1.2, { duration: t(POP_MS), easing: cubicOut });
				await view.pop.set(1, { duration: t(POP_MS * 1.5), easing: backOut });
			})(),
		);
	}
	await Promise.all(jobs);
}

// Pop the coins up to the win meter and remove them. No arguments = every coin on the layer.
export async function payOut(coins?: Coin[]) {
	const targets = coins ? coinLayer.views.filter((v) => coins.some((c) => key(c.pos) === key(v.coin.pos))) : [...coinLayer.views];
	if (!targets.length) return;
	eventEmitter.broadcast({ type: 'soundOnce', name: 'coin_collect' });
	await Promise.all(
		targets.map(async (v, i) => {
			await wait(t(STAGGER_MS * 0.5) * i);
			await v.pop.set(1.3, { duration: t(POP_MS), easing: cubicOut });
			await Promise.all([
				v.rise.set(1.6, { duration: t(360), easing: cubicIn }),
				v.fade.set(0, { duration: t(360), easing: cubicIn }),
				v.pop.set(0.6, { duration: t(360), easing: cubicIn }),
			]);
		}),
	);
	const gone = new Set(targets.map((v) => v.id));
	coinLayer.views = coinLayer.views.filter((v) => !gone.has(v.id));
}

export function clearCoins() {
	coinLayer.views = [];
}
