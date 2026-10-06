import _ from 'lodash';

import { SPEC, SYMBOL_NAMES } from './spec';
import type { RawSymbol } from './types';

// Shell config built from the spec. The paytable for the info screen is a demo table; real maths replaces it.
const WEIGHTS: Record<string, number> = {};
SYMBOL_NAMES.forEach((n) => {
	WEIGHTS[n] = n[0] === 'L' ? 14 : n[0] === 'H' ? 8 : n === 'W' ? 1.2 : 0.35;
});

// Deterministic reel strips: the symbols that scroll past while a spin reel is running.
let seed = 12345;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
const draw = (): RawSymbol => {
	const total = _.sum(Object.values(WEIGHTS));
	let r = rand() * total;
	for (const [name, w] of Object.entries(WEIGHTS)) if ((r -= w) <= 0) return { name };
	return { name: SYMBOL_NAMES[0] };
};
const strips = () => _.range(SPEC.board.reels).map(() => _.range(60).map(() => draw()));

export default {
	gameID: SPEC.gameId,
	gameName: SPEC.name,
	numReels: SPEC.board.reels,
	numRows: SPEC.board.rows,
	paddingReels: { basegame: strips(), freegame: strips() } as Record<string, RawSymbol[][]>,
	symbolNames: SYMBOL_NAMES,
};
