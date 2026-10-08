import type { BookEventHandlerMap } from 'utils-book';

import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { setRespinCounter } from './respinCounterState.svelte';

export const respinHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	respinCounter: async (bookEvent: BookEventOfType<'respinCounter'>) => {
		await setRespinCounter(bookEvent.remaining, bookEvent.reset);
	},
};
