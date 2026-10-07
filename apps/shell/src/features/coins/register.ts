import { eventEmitter } from '../../game/eventEmitter';
import type { BookEventHandlerMap } from 'utils-book';
import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { flipIn, payOut } from './coinState.svelte';

// Coins add no book event of their own. squaresReveal carries `cells: coin[]`; until the rainbow-reveal feature
// takes the event over (it should call flipIn / payOut from here), the coins flip in, the total shows, then they pay out.
export const coinHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	squaresReveal: async (
		bookEvent: BookEventOfType<'squaresReveal'>,
		{ bookEvents }: BookEventContext,
	) => {
		await flipIn(bookEvent.cells);
		// Clover events need the revealed coins to remain on the layer. Their final clover handler pays them
		// out after each book-supplied multiplier has been shown.
		if (bookEvents.slice(bookEvent.index + 1).some((event) => event.type === 'cloverApply')) return;
		await new Promise((r) => setTimeout(r, 350));
		eventEmitter.broadcast({ type: 'tumbleWinAmountShow' });
		eventEmitter.broadcast({
			type: 'tumbleWinAmountUpdate',
			amount: bookEvent.total,
			animate: true,
		});
		await payOut();
	},
};
