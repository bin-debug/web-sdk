import type { BookEventHandlerMap } from 'utils-book';

import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { updateStash } from './stashState.svelte';

export const stashHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	stashUpdate: async (bookEvent: BookEventOfType<'stashUpdate'>) => {
		await updateStash(bookEvent.reel, bookEvent.value, bookEvent.banked);
	},
};
