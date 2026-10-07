import _ from 'lodash';

import { recordBookEvent, checkIsMultipleRevealEvents, type BookEventHandlerMap } from 'utils-book';
import { stateBet } from 'state-shared';

import { eventEmitter } from './eventEmitter';
import { playBookEvent } from './utils';
import { winLevelMap, type WinLevel } from './winLevelMap';
import { stateGame, stateGameDerived } from './stateGame.svelte';
import type { BookEvent, BookEventOfType, BookEventContext } from './typesBookEvent';
import type { Position } from './types';
import config from './config';
import { coinHandlers } from '../features/coins/register';
import { bonusTier } from '../features/bonusTiers/tiers';

// The shell's director: book event -> choreography of emitter events. Feature modules register more handlers
// (kit-mechanics); this map is the core every shell has: reveal, wins, tumbles, free spins, win scenes.

const winLevelSoundsPlay = (winLevel: number) => {
	const data = winLevelMap[winLevel as WinLevel];
	if (data?.alias === 'max') eventEmitter.broadcastAsync({ type: 'uiHide' });
	if (data?.type === 'big') eventEmitter.broadcast({ type: 'soundOnce', name: 'bigwin_sting' });
	else if (data?.type === 'medium') eventEmitter.broadcast({ type: 'soundOnce', name: 'win_medium' });
};

const winLevelSoundsStop = () => {
	eventEmitter.broadcast({ type: 'soundMusic', name: stateGame.gameType === 'freegame' ? 'bonus' : 'base' });
	eventEmitter.broadcastAsync({ type: 'uiShow' });
};

const animateSymbols = async ({ positions }: { positions: Position[] }) => {
	eventEmitter.broadcast({ type: 'boardShow' });
	// two wins can share cells (lines, ways): animate each cell once or its completion promise is overwritten
	const unique = _.uniqBy(positions, (p) => `${p.reel}:${p.row}`);
	await eventEmitter.broadcastAsync({ type: 'boardWithAnimateSymbols', symbolPositions: unique });
};

const handlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	reveal: async (bookEvent: BookEventOfType<'reveal'>, { bookEvents }: BookEventContext) => {
		eventEmitter.broadcast({ type: 'tumbleWinAmountReset' });
		eventEmitter.broadcast({ type: 'soundOnce', name: 'spin_start' });
		const isBonusGame = checkIsMultipleRevealEvents({ bookEvents });
		if (isBonusGame) {
			eventEmitter.broadcast({ type: 'stopButtonEnable' });
			recordBookEvent({ bookEvent });
		}

		stateGame.gameType = bookEvent.gameType;
		await stateGameDerived.enhancedBoard.spin({
			revealEvent: bookEvent,
			paddingBoard: config.paddingReels[bookEvent.gameType],
		});
	},
	winInfo: async (bookEvent: BookEventOfType<'winInfo'>) => {
		eventEmitter.broadcast({ type: 'soundOnce', name: 'win_small' });
		const positions = _.flatten(bookEvent.wins.map((win) => win.positions));
		await Promise.all([
			animateSymbols({ positions }),
			eventEmitter.broadcastAsync({
				type: 'showWinAmounts',
				wins: bookEvent.wins.map((win) => {
					const overlay = win.meta?.overlay ?? win.positions[Math.floor(win.positions.length / 2)];
					const mult = win.meta?.globalMult ?? 1;
					return { win: win.meta?.winWithoutMult ?? win.win, mult, result: win.win, reel: overlay.reel, row: overlay.row };
				}),
			}),
		]);
	},
	updateTumbleWin: async (bookEvent: BookEventOfType<'updateTumbleWin'>) => {
		if (bookEvent.amount > 0) {
			eventEmitter.broadcast({ type: 'tumbleWinAmountShow' });
			eventEmitter.broadcast({ type: 'tumbleWinAmountUpdate', amount: bookEvent.amount, animate: false });
		}
	},
	setTotalWin: async (bookEvent: BookEventOfType<'setTotalWin'>) => {
		stateBet.winBookEventAmount = bookEvent.amount;
	},
	freeSpinTrigger: async (bookEvent: BookEventOfType<'freeSpinTrigger'>) => {
		eventEmitter.broadcast({ type: 'soundOnce', name: 'bonus_trigger' });
		eventEmitter.broadcast({ type: 'mascotReact', mood: 'bonus' });
		await animateSymbols({ positions: bookEvent.positions });
		if (bookEvent.retrigger) {
			// more spins inside a running bonus: banner and a longer counter, no intro, same music
			await eventEmitter.broadcastAsync({ type: 'retriggerShow', extra: bookEvent.retrigger.extra });
			eventEmitter.broadcast({ type: 'freeSpinCounterUpdate', current: undefined, total: bookEvent.totalFs });
			return;
		}
		const tier = bonusTier(bookEvent.bonusType, bookEvent.bonusName, bookEvent.hidden);
		await eventEmitter.broadcastAsync({ type: 'uiHide' });
		await eventEmitter.broadcastAsync({ type: 'transition' });
		eventEmitter.broadcast({ type: 'freeSpinIntroShow' });
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bonus' });
		await eventEmitter.broadcastAsync({
			type: 'freeSpinIntroUpdate',
			totalFreeSpins: bookEvent.totalFs,
			title: tier.name,
			kicker: tier.hidden ? 'Secret bonus unlocked' : tier.trigger ? `${tier.trigger.replace(' S', '')} scatters` : undefined,
			colour: tier.colour,
		});
		stateGame.gameType = 'freegame';
		eventEmitter.broadcast({ type: 'freeSpinIntroHide' });
		eventEmitter.broadcast({ type: 'boardFrameGlowShow' });
		eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		eventEmitter.broadcast({ type: 'freeSpinCounterUpdate', current: undefined, total: bookEvent.totalFs });
		await eventEmitter.broadcastAsync({ type: 'uiShow' });
		await eventEmitter.broadcastAsync({ type: 'drawerButtonShow' });
		eventEmitter.broadcast({ type: 'drawerFold' });
	},
	updateFreeSpin: async (bookEvent: BookEventOfType<'updateFreeSpin'>) => {
		eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		eventEmitter.broadcast({ type: 'freeSpinCounterUpdate', current: bookEvent.amount, total: bookEvent.total });
	},
	updateGlobalMult: async (bookEvent: BookEventOfType<'updateGlobalMult'>) => {
		eventEmitter.broadcast({ type: 'globalMultiplierShow' });
		if (bookEvent.globalMult === 1) eventEmitter.broadcast({ type: 'tumbleWinAmountReset' });
		await eventEmitter.broadcastAsync({ type: 'globalMultiplierUpdate', multiplier: bookEvent.globalMult });
	},
	freeSpinEnd: async (bookEvent: BookEventOfType<'freeSpinEnd'>) => {
		await eventEmitter.broadcastAsync({ type: 'uiHide' });
		stateGame.gameType = 'basegame';
		eventEmitter.broadcast({ type: 'boardFrameGlowHide' });
		eventEmitter.broadcast({ type: 'globalMultiplierHide' });
		eventEmitter.broadcast({ type: 'freeSpinOutroShow' });
		eventEmitter.broadcast({ type: 'soundOnce', name: 'win_medium' });
		winLevelSoundsPlay(bookEvent.winLevel);
		await eventEmitter.broadcastAsync({
			type: 'freeSpinOutroCountUp',
			amount: bookEvent.amount,
			winLevelData: winLevelMap[bookEvent.winLevel as WinLevel],
		});
		winLevelSoundsStop();
		eventEmitter.broadcast({ type: 'freeSpinOutroHide' });
		eventEmitter.broadcast({ type: 'freeSpinCounterHide' });
		eventEmitter.broadcast({ type: 'tumbleWinAmountHide' });
		await eventEmitter.broadcastAsync({ type: 'transition' });
		await eventEmitter.broadcastAsync({ type: 'uiShow' });
		await eventEmitter.broadcastAsync({ type: 'drawerUnfold' });
		eventEmitter.broadcast({ type: 'drawerButtonHide' });
	},
	tumbleBoard: async (bookEvent: BookEventOfType<'tumbleBoard'>) => {
		eventEmitter.broadcast({ type: 'boardHide' });
		eventEmitter.broadcast({ type: 'tumbleBoardShow' });
		eventEmitter.broadcast({ type: 'tumbleBoardInit', addingBoard: bookEvent.newSymbols });
		eventEmitter.broadcast({ type: 'soundOnce', name: 'tumble_pop' });
		await eventEmitter.broadcastAsync({ type: 'tumbleBoardExplode', explodingPositions: bookEvent.explodingSymbols });
		eventEmitter.broadcast({ type: 'tumbleBoardRemoveExploded' });
		await eventEmitter.broadcastAsync({ type: 'tumbleBoardSlideDown' });
		eventEmitter.broadcast({
			type: 'boardSettle',
			board: stateGameDerived.tumbleBoardCombined().map((tumbleReel) => tumbleReel.map((tumbleSymbol) => tumbleSymbol.rawSymbol)),
		});
		eventEmitter.broadcast({ type: 'tumbleBoardReset' });
		eventEmitter.broadcast({ type: 'tumbleBoardHide' });
		eventEmitter.broadcast({ type: 'boardShow' });
	},
	setWin: async (bookEvent: BookEventOfType<'setWin'>) => {
		const winLevelData = winLevelMap[bookEvent.winLevel as WinLevel];
		eventEmitter.broadcast({ type: 'winShow' });
		if (bookEvent.winLevel >= 6) eventEmitter.broadcast({ type: 'mascotReact', mood: 'bigwin' });
		else if (bookEvent.winLevel >= 3) eventEmitter.broadcast({ type: 'mascotReact', mood: 'win' });
		winLevelSoundsPlay(bookEvent.winLevel);
		await eventEmitter.broadcastAsync({ type: 'winUpdate', amount: bookEvent.amount, winLevelData });
		winLevelSoundsStop();
		eventEmitter.broadcast({ type: 'winHide' });
	},
	finalWin: async () => {
		eventEmitter.broadcast({ type: 'globalMultiplierHide' });
		eventEmitter.broadcast({ type: 'tumbleWinAmountHide' });
	},
	wincap: async (bookEvent: BookEventOfType<'wincap'>) => {
		stateBet.winBookEventAmount = bookEvent.amount;
	},
	// customised
	createBonusSnapshot: async (bookEvent: BookEventOfType<'createBonusSnapshot'>) => {
		const { bookEvents } = bookEvent;
		const last = <T extends BookEvent['type']>(type: T) => _.findLast(bookEvents, (e) => e.type === type) as BookEventOfType<T> | undefined;

		// resume: rebuild from the first trigger (the intro) but with the latest spin total (retriggers add spins)
		const triggers = bookEvents.filter((e) => e.type === 'freeSpinTrigger') as BookEventOfType<'freeSpinTrigger'>[];
		const first = triggers.find((e) => !e.retrigger);
		const trigger = first && { ...first, totalFs: triggers[triggers.length - 1].totalFs };
		const update = last('updateFreeSpin');
		const total = last('setTotalWin');
		const mult = last('updateGlobalMult');

		if (trigger) await playBookEvent(trigger, { bookEvents });
		if (update) playBookEvent(update, { bookEvents });
		if (total) playBookEvent(total, { bookEvents });
		if (mult) playBookEvent(mult, { bookEvents });
	},
};

// feature modules add their handlers here (one line each)
Object.assign(handlers, coinHandlers);

// Dev only: trace every book event (start and end) so a stuck round shows which handler is waiting.
export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = { ...handlers };
if (import.meta.env.DEV) {
	for (const key of Object.keys(handlers) as BookEvent['type'][]) {
		const fn = handlers[key] as (e: BookEvent, c: BookEventContext) => Promise<void>;
		(bookEventHandlerMap as Record<string, unknown>)[key] = async (e: BookEvent, c: BookEventContext) => {
			console.debug('[shell] >', key);
			await fn(e, c);
			console.debug('[shell] <', key);
		};
	}
}
