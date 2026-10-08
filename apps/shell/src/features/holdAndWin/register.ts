import { recordBookEvent, type BookEventHandlerMap } from 'utils-book';

import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { startHold, respin, endHold, multiplyHeld, gatherHeld, collectHeld } from './holdState.svelte';

// holdStart opens the mode, each respin spins the empty cells only, holdMultiply / holdCollect / jackpotWin (jackpots feature)
// run the end-of-round collect, holdEnd closes the mode.
// Every respin is recorded as a resume point (restoreHold rebuilds the held coins and lives from the earlier events).
export const holdHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	holdStart: async (bookEvent: BookEventOfType<'holdStart'>) => {
		await startHold(bookEvent.coins, bookEvent.lives, bookEvent.mode);
	},
	respin: async (bookEvent: BookEventOfType<'respin'>) => {
		recordBookEvent({ bookEvent });
		await respin(bookEvent.new, bookEvent.lives);
	},
	holdMultiply: async (bookEvent: BookEventOfType<'holdMultiply'>) => {
		await multiplyHeld(bookEvent.mult, bookEvent.targets);
	},
	holdCollectAll: async (bookEvent: BookEventOfType<'holdCollectAll'>) => {
		await gatherHeld(bookEvent.pos, bookEvent.sources, bookEvent.total);
	},
	holdCollect: async (bookEvent: BookEventOfType<'holdCollect'>) => {
		await collectHeld(bookEvent.pos, bookEvent.running);
	},
	holdEnd: async (bookEvent: BookEventOfType<'holdEnd'>) => {
		await endHold(bookEvent.total, bookEvent.fullGrid);
	},
};
