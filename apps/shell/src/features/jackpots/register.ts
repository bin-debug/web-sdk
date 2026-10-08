import type { BookEventHandlerMap } from 'utils-book';

import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { winJackpot } from './jackpotState.svelte';

export const jackpotHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	jackpotWin: async (bookEvent: BookEventOfType<'jackpotWin'>) => {
		await winJackpot(bookEvent.tier, bookEvent.amount, bookEvent.positions);
	},
};
