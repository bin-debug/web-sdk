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
		if (!bookEvents.slice(bookEvent.index + 1).some((event) => event.type === 'cloverApply'))
			await payOut();
	},
};
