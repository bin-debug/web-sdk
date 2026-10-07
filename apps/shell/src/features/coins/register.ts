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
		// Clover and collector events own the revealed coins. Do not run the generic payout first: those
		// later book events animate the same cells in their supplied order and remove them themselves.
		if (
			bookEvents
				.slice(bookEvent.index + 1)
				.some((event) => event.type === 'cloverApply' || event.type === 'collect')
		)
			return;
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
