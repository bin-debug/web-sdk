import type { BookEventHandlerMap } from 'utils-book';
import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { placeWilds } from './wildState.svelte';

// wildMults arrives after the reveal: the crates show their multipliers (hidden ones closed). They open on the
// winInfo that includes them (see openWilds, called from the winInfo handler) and clear on the next reveal.
export const wildHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	wildMults: async (bookEvent: BookEventOfType<'wildMults'>) => {
		await placeWilds(bookEvent.positions, bookEvent.values, bookEvent.hidden);
	},
};
