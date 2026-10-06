import _ from 'lodash';
import type { Tween } from 'svelte/motion';

import { stateBet } from 'state-shared';
import { createEnhanceBoard, createReelForCascading, createReelForSpinning } from 'utils-slots';
import { createGetWinLevelDataByWinLevelAlias } from 'utils-shared/winLevel';
import { compose } from 'kit-layout';

import type { GameType, RawSymbol, SymbolState } from './types';
import { stateLayoutDerived } from './stateLayout';
import { winLevelMap } from './winLevelMap';
import { eventEmitter } from './eventEmitter';
import { SPEC, isDrop } from './spec';
import {
	SYMBOL_SIZE,
	BOARD_SIZES,
	INITIAL_BOARD,
	BOARD_DIMENSIONS,
	SPIN_OPTIONS_DEFAULT_DROP,
	SPIN_OPTIONS_FAST_DROP,
	SPIN_OPTIONS_DEFAULT_SPIN,
	SPIN_OPTIONS_FAST_SPIN,
	INITIAL_SYMBOL_STATE,
} from './constants';

const onSymbolLand = ({ rawSymbol }: { rawSymbol: RawSymbol }) => {
	const n = rawSymbol.name;
	if (n === 'S') eventEmitter.broadcast({ type: 'soundOnce', name: 'land_special' });
	else if (n === 'W') eventEmitter.broadcast({ type: 'soundOnce', name: 'land_special' });
	else if (n[0] === 'H') eventEmitter.broadcast({ type: 'soundOnce', name: 'land_high' });
};

const makeReel = (reelIndex: number) => {
	const options = {
		reelIndex,
		symbolHeight: SYMBOL_SIZE,
		initialSymbols: INITIAL_BOARD[reelIndex],
		initialSymbolState: INITIAL_SYMBOL_STATE,
		onReelStopping: () => {
			eventEmitter.broadcast({ type: 'soundOnce', name: 'reel_stop', forcePlay: !stateBet.isTurbo });
		},
		onSymbolLand,
	};
	// Both reel engines share one state shape; the drop engine ("cascade") and the spin engine differ in motion only.
	const reel = (isDrop ? createReelForCascading(options as never) : createReelForSpinning(options as never)) as unknown as ReturnType<
		typeof createReelForCascading<RawSymbol, SymbolState>
	>;
	reel.reelState.spinOptions = (() => {
		const fast = reel.reelState.spinType === 'fast';
		return isDrop
			? fast ? SPIN_OPTIONS_FAST_DROP : SPIN_OPTIONS_DEFAULT_DROP
			: fast ? SPIN_OPTIONS_FAST_SPIN : SPIN_OPTIONS_DEFAULT_SPIN;
	}) as never;
	return reel;
};

const board = _.range(BOARD_DIMENSIONS.x).map(makeReel);

export type Reel = (typeof board)[number];
export type ReelSymbol = Reel['reelState']['symbols'][number];

export type TumbleSymbol = {
	symbolY: Tween<number>;
	rawSymbol: RawSymbol;
	symbolState: SymbolState;
	oncomplete: () => void;
};

export const stateGame = $state({
	board,
	gameType: 'basegame' as GameType,
	tumbleBoardAdding: [] as TumbleSymbol[][],
	tumbleBoardBase: [] as TumbleSymbol[][],
});

const composition = () =>
	compose({
		preset: SPEC.layout.preset,
		layoutType: stateLayoutDerived.layoutType(),
		main: stateLayoutDerived.mainLayout(),
		board: BOARD_SIZES,
		mascotSide: SPEC.layout.mascotSide,
	});

const boardLayout = () => {
	const c = composition().board;
	return {
		x: c.x,
		y: c.y,
		scale: c.scale,
		anchor: { x: 0.5, y: 0.5 },
		pivot: { x: BOARD_SIZES.width / 2, y: BOARD_SIZES.height / 2 },
		...BOARD_SIZES,
	};
};

const boardRaw = () => board.map((reel) => reel.reelState.symbols.map((reelSymbol) => reelSymbol.rawSymbol));

const tumbleBoardCombined = () =>
	stateGame.tumbleBoardBase.map((tumbleReelBase, reelIndex) => [...(stateGame.tumbleBoardAdding[reelIndex] ?? []), ...tumbleReelBase]);

const { enhanceBoard } = createEnhanceBoard();
const enhancedBoard = enhanceBoard({ board: stateGame.board as never });

export const { getWinLevelDataByWinLevelAlias } = createGetWinLevelDataByWinLevelAlias({ winLevelMap });

export const stateGameDerived = {
	onSymbolLand,
	boardLayout,
	composition,
	boardRaw,
	tumbleBoardCombined,
	enhancedBoard,
	getWinLevelDataByWinLevelAlias,
};
