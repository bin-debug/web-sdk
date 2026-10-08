import type { BookEventHandlerMap } from 'utils-book';
import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { placeWilds, addStickyWilds, setStickyCounter } from './wildState.svelte';
import { expandReel } from './expandState.svelte';

// wildMults arrives after the reveal: the crates show their multipliers (hidden ones closed). They open on the
// winInfo that includes them (see openWilds, called from the winInfo handler) and clear on the next reveal.
// addStickyWilds: boxes that stay for the rest of the round; respinCounter drives the small counter next to the board.
export const wildHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	wildMults: async (bookEvent: BookEventOfType<'wildMults'>) => {
		await placeWilds(bookEvent.positions, bookEvent.values, bookEvent.hidden);
	},
	addStickyWilds: async (bookEvent: BookEventOfType<'addStickyWilds'>) => {
		await addStickyWilds(bookEvent.positions, bookEvent.mults);
	},
	expandingWildReel: async (bookEvent: BookEventOfType<'expandingWildReel'>) => {
		await expandReel(bookEvent.reel, bookEvent.mult, bookEvent.who);
	},
	respinCounter: async (bookEvent: BookEventOfType<'respinCounter'>) => {
		await setStickyCounter(bookEvent.remaining, bookEvent.reset);
	},
};
