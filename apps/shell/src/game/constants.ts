import _ from 'lodash';
import { cubicIn } from 'svelte/easing';

import { SPEC, SYMBOL_NAMES } from './spec';
import type { RawSymbol, SymbolState } from './types';

export const SYMBOL_SIZE = SPEC.board.cell ?? 120;
export const REEL_PADDING = 0.5;

// deterministic start board (padded one symbol above and below)
const start = SYMBOL_NAMES.filter((n) => n[0] === 'L' || n[0] === 'H');
export const INITIAL_BOARD: RawSymbol[][] = _.range(SPEC.board.reels).map((reel) =>
	_.range(SPEC.board.rows + 2).map((row) => ({ name: start[(reel * 3 + row * 5 + 1) % start.length] })),
);

export const BOARD_DIMENSIONS = { x: SPEC.board.reels, y: SPEC.board.rows };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const SPIN_OPTIONS_SHARED = {
	reelBounceBackSpeed: 0.15,
	reelSpinSpeedBeforeBounce: 4,
	reelPaddingMultiplierNormal: 1.2,
	reelPaddingMultiplierAnticipated: 10,
	reelSpinDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT_SPIN = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 2,
	reelSpinSpeed: 3,
	reelBounceSizeMulti: 0.3,
};

export const SPIN_OPTIONS_FAST_SPIN = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 5,
	reelSpinSpeed: 5,
	reelBounceSizeMulti: 0.05,
};

const DROP_SHARED = {
	reelFallInDelay: 80,
	reelPaddingMultiplierNormal: 1.25,
	reelPaddingMultiplierAnticipated: 18,
	reelFallOutDelay: 145,
};

// Drop feel: gravity easing, columns stagger left to right, a short overshoot and a squash on landing.
export const SPIN_OPTIONS_DEFAULT_DROP = {
	...DROP_SHARED,
	reelFallInDelay: 60,
	reelFallOutDelay: 55,
	symbolFallInSpeed: 2.6,
	symbolFallInInterval: 45,
	symbolFallInBounceSpeed: 0.22,
	symbolFallInBounceSizeMulti: 0.12,
	symbolFallOutSpeed: 2.8,
	symbolFallOutInterval: 25,
	symbolFallInEasing: cubicIn,
	symbolFallOutEasing: cubicIn,
};

export const SPIN_OPTIONS_FAST_DROP = {
	...DROP_SHARED,
	symbolFallInSpeed: 7,
	symbolFallInInterval: 0,
	symbolFallInBounceSpeed: 0.3,
	symbolFallInBounceSizeMulti: 0.25,
	symbolFallOutSpeed: 7,
	symbolFallOutInterval: 0,
	symbolFallInEasing: cubicIn,
};

export const MOTION_BLUR_VELOCITY = 31;

export const MAIN_SIZES = {
	desktop: { width: 1422, height: 800 },
	tablet: { width: 1000, height: 1000 },
	landscape: { width: 1600, height: 900 },
	portrait: { width: 800, height: 1422 },
};
