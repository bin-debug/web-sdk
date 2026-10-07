import type { BookEventHandlerMap } from 'utils-book';

import { eventEmitter } from '../../game/eventEmitter';
import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { addCollected, collect } from './collectorState.svelte';

export const collectorHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	collect: async (bookEvent: BookEventOfType<'collect'>) => {
		await collect(bookEvent.collector, bookEvent.sources, bookEvent.total);
		eventEmitter.broadcast({ type: 'tumbleWinAmountShow' });
		eventEmitter.broadcast({
			type: 'tumbleWinAmountUpdate',
			amount: addCollected(bookEvent.total),
			animate: true,
		});
	},
};
