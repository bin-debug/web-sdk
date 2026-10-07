import type { BookEventHandlerMap } from 'utils-book';

import type { BookEvent, BookEventContext, BookEventOfType } from '../../game/typesBookEvent';
import { addSquares, clearSquares } from './squaresState.svelte';

export const squareHandlers: BookEventHandlerMap<BookEvent, BookEventContext> = {
	squaresAdd: async (bookEvent: BookEventOfType<'squaresAdd'>) => addSquares(bookEvent.positions),
	squaresClear: async (bookEvent: BookEventOfType<'squaresClear'>) => clearSquares(bookEvent.positions),
};
