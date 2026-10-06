import type { BetType } from 'rgs-requests';

import type { RawSymbol, GameType, Position } from './types';

// The shell's book events. Names follow math-sdk (reveal, winInfo, tumbleBoard, freeSpin*, ...).
// A visual that needs data must have it in the event: the client never decides outcomes.
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
		symbol: string;
		win: number;
		positions: Position[];
		meta?: {
			globalMult?: number;
			clusterMult?: number;
			winWithoutMult?: number;
			overlay?: Position;
			lineIndex?: number;
			ways?: number;
		};
	}[];
};

type BookEventUpdateTumbleWin = { index: number; type: 'updateTumbleWin'; amount: number };
type BookEventSetTotalWin = { index: number; type: 'setTotalWin'; amount: number };
type BookEventFreeSpinTrigger = {
	index: number;
	type: 'freeSpinTrigger';
	totalFs: number;
	positions: Position[];
	bonusType?: string;
	bonusName?: string;
};
type BookEventUpdateFreeSpin = { index: number; type: 'updateFreeSpin'; amount: number; total: number };
type BookEventUpdateGlobalMult = { index: number; type: 'updateGlobalMult'; globalMult: number };
type BookEventFreeSpinEnd = { index: number; type: 'freeSpinEnd'; amount: number; winLevel: number };
type BookEventTumbleBoard = {
	index: number;
	type: 'tumbleBoard';
	explodingSymbols: Position[];
	newSymbols: RawSymbol[][];
};
type BookEventFinalWin = { index: number; type: 'finalWin'; amount: number };
type BookEventSetWin = { index: number; type: 'setWin'; amount: number; winLevel: number };
type BookEventWincap = { index: number; type: 'wincap'; amount: number };

// customised
type BookEventCreateBonusSnapshot = { index: number; type: 'createBonusSnapshot'; bookEvents: BookEvent[] };

export type BookEvent =
	| BookEventReveal
	| BookEventWinInfo
	| BookEventUpdateTumbleWin
	| BookEventSetTotalWin
	| BookEventFreeSpinTrigger
	| BookEventUpdateFreeSpin
	| BookEventUpdateGlobalMult
	| BookEventFreeSpinEnd
	| BookEventTumbleBoard
	| BookEventFinalWin
	| BookEventSetWin
	| BookEventWincap
	| BookEventCreateBonusSnapshot;

export type Bet = BetType<BookEvent>;
export type BookEventOfType<T> = Extract<BookEvent, { type: T }>;
export type BookEventContext = { bookEvents: BookEvent[] };
