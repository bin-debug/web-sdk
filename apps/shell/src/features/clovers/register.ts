import type { BookEventHandlerMap } from 'utils-book';

import { eventEmitter } from '../../game/eventEmitter';
import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { applyClover } from './cloverState.svelte';
import { payOut } from '../coins/coinState.svelte';

export const cloverHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	cloverApply: async (
		bookEvent: BookEventOfType<'cloverApply'>,
		{ bookEvents }: BookEventContext,
	) => {
		eventEmitter.broadcast({ type: 'soundOnce', name: 'clover' });
		await applyClover(bookEvent.pos, bookEvent.scope, bookEvent.mult, bookEvent.targets);
		// a later clover or a collector takes the coins on from here; otherwise they pay out now
		const later = bookEvents.slice(bookEvent.index + 1);
		if (!later.some((event) => event.type === 'cloverApply' || event.type === 'collect')) await payOut();
	},
};
