import type { BookEventHandlerMap } from 'utils-book';

import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { expandReel } from './triggerState.svelte';

// expandReel: the pillar stretches up the listed reel, then its cells flip in (coins or free-spin tiles).
// The coins are paid by the collect event that follows in the book; fs tiles by freeSpinTrigger.
export const triggerHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	expandReel: async (bookEvent: BookEventOfType<'expandReel'>) => {
		await expandReel(bookEvent.reel, bookEvent.kind, bookEvent.cells);
	},
};
