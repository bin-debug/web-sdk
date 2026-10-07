import { recordBookEvent, type BookEventHandlerMap } from 'utils-book';

import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { startHold, respin, endHold } from './holdState.svelte';

// holdStart opens the mode, each respin spins the empty cells only, holdEnd pays the grid and closes the mode.
// Every respin is recorded as a resume point (restoreHold rebuilds the held coins and lives from the earlier events).
export const holdHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	holdStart: async (bookEvent: BookEventOfType<'holdStart'>) => {
		await startHold(bookEvent.coins, bookEvent.lives, bookEvent.mode);
	},
	respin: async (bookEvent: BookEventOfType<'respin'>) => {
		recordBookEvent({ bookEvent });
		await respin(bookEvent.new, bookEvent.lives);
	},
	holdEnd: async (bookEvent: BookEventOfType<'holdEnd'>) => {
		await endHold(bookEvent.total, bookEvent.fullGrid);
	},
};
