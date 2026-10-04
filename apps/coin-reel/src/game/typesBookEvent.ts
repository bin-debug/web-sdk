import type { BetType } from 'rgs-requests';

import type { SymbolName, RawSymbol, GameType, Position } from './types';

type BookEventReveal = {
	index: number;
	type: 'reveal';
	board: RawSymbol[][];
	paddingPositions: number[];
	anticipation: number[];
	gameType: GameType;
};

type BookEventWinInfo = {
	index: number;
	type: 'winInfo';
	totalWin: number;
	wins: {
		symbol: SymbolName;
		win: number;
		positions: Position[];
		meta: {
			globalMult: number;
			clusterMult: number;
			winWithoutMult: number;
			overlay: Position;
		};
	}[];
};

type BookEventSetTumbleWin = {
	index: number;
	type: 'updateTumbleWin';
	amount: number;
};

type BookEventSetTotalWin = {
	index: number;
	type: 'setTotalWin';
	amount: number;
};

type BookEventFreeSpinTrigger = {
	index: number;
	type: 'freeSpinTrigger';
	totalFs: number;
	positions: Position[];
	bonusType?: 'stash' | 'collector';
};

type BookEventUpdateFreeSpin = {
	index: number;
	type: 'updateFreeSpin';
	amount: number;
	total: number;
};

type BookEventUpdateGlobalMult = {
	index: number;
	type: 'updateGlobalMult';
	globalMult: number;
};

type BookEventFreeSpinEnd = {
	index: number;
	type: 'freeSpinEnd';
	amount: number;
	winLevel: number;
};

type BookEventBoardMultiplierInfo = {
	index: number;
	type: 'boardMultiplierInfo';
	multInfo: {
		positions: (Position & { multiplier: number })[];
	};
	winInfo: {
		tumbleWin: 400;
		boardMult: 5;
		totalWin: 2000;
	};
};

type BookEventTumbleBoard = {
	index: number;
	type: 'tumbleBoard';
	explodingSymbols: Position[];
	newSymbols: RawSymbol[][];
};

type BookEventFinalWin = {
	index: number;
	type: 'finalWin';
	amount: number;
};

type BookEventSetWin = {
	index: number;
	type: 'setWin';
	amount: number;
	winLevel: number;
};

// customised
type BookEventCreateBonusSnapshot = {
	index: number;
	type: 'createBonusSnapshot';
	bookEvents: BookEvent[];
};

type CoinTier = 'bronze' | 'silver' | 'gold' | 'diamond';
type BookEventCoinReelExpand = { index: number; type: 'coinReelExpand'; reel: number; coins: { row: number; tier: CoinTier; value: number }[] };
type BookEventCoinReelCollect = { index: number; type: 'coinReelCollect'; reel: number; total: number; multiplier: number; pot?: number };
type BookEventCollectorShow = { index: number; type: 'collectorShow'; totals: number[] };
type BookEventCollectorUpdate = { index: number; type: 'collectorUpdate'; reel: number; total: number };
type BookEventCollectorHide = { index: number; type: 'collectorHide' };
type BookEventFreeSpinReelExpand = { index: number; type: 'freeSpinReelExpand'; reel: number; cells: { row: number; spins: number }[] };
type BookEventStashShow = { index: number; type: 'stashShow'; multipliers: number[] };
type BookEventStashUpdate = { index: number; type: 'stashUpdate'; reel: number; multiplier: number };
type BookEventStashHide = { index: number; type: 'stashHide' };
type BookEventWincap = { index: number; type: 'wincap'; amount: number };

export type BookEvent =
	| BookEventCoinReelExpand
	| BookEventCoinReelCollect
	| BookEventFreeSpinReelExpand
	| BookEventStashShow
	| BookEventStashUpdate
	| BookEventStashHide
	| BookEventWincap
	| BookEventCollectorShow
	| BookEventCollectorUpdate
	| BookEventCollectorHide
	| BookEventReveal
	| BookEventWinInfo
	| BookEventBoardMultiplierInfo
	| BookEventSetTumbleWin
	| BookEventSetTotalWin
	| BookEventFreeSpinTrigger
	| BookEventUpdateFreeSpin
	| BookEventUpdateGlobalMult
	| BookEventTumbleBoard
	| BookEventCreateBonusSnapshot
	| BookEventFinalWin
	| BookEventSetWin
	| BookEventFreeSpinEnd
	// customised
	| BookEventCreateBonusSnapshot;

export type Bet = BetType<BookEvent>;
export type BookEventOfType<T> = Extract<BookEvent, { type: T }>;
export type BookEventContext = { bookEvents: BookEvent[] };
