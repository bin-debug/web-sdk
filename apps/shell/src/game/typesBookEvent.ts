import type { BetType } from 'rgs-requests';

import type { RawSymbol, GameType, Position } from './types';
import type { Coin } from '../features/coins/tiers';

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
	hidden?: boolean;
	retrigger?: { extra: number };
};
type BookEventUpdateFreeSpin = {
	index: number;
	type: 'updateFreeSpin';
	amount: number;
	total: number;
};
type BookEventUpdateGlobalMult = { index: number; type: 'updateGlobalMult'; globalMult: number };
type BookEventFreeSpinEnd = {
	index: number;
	type: 'freeSpinEnd';
	amount: number;
	winLevel: number;
};
type BookEventTumbleBoard = {
	index: number;
	type: 'tumbleBoard';
	explodingSymbols: Position[];
	newSymbols: RawSymbol[][];
};
type BookEventFinalWin = { index: number; type: 'finalWin'; amount: number };
type BookEventSetWin = { index: number; type: 'setWin'; amount: number; winLevel: number };
type BookEventWincap = { index: number; type: 'wincap'; amount: number };

// feature events (docs/features/BOOK-EVENTS.md)
type BookEventSquaresReveal = {
	index: number;
	type: 'squaresReveal';
	cells: Coin[];
	total: number;
};
type BookEventCloverApply = {
	index: number;
	type: 'cloverApply';
	pos: Position;
	scope: 'adjacent' | 'global';
	mult: number;
	targets: Position[];
};
type BookEventCollect = {
	index: number;
	type: 'collect';
	collector: Position | 'global' | 'pot';
	sources: Position[];
	total: number;
};
type BookEventHoldStart = { index: number; type: 'holdStart'; board: RawSymbol[][]; coins: Coin[]; lives: number; mode: string };
type BookEventRespin = { index: number; type: 'respin'; new: Coin[]; lives: number; remaining?: number };
type BookEventHoldEnd = { index: number; type: 'holdEnd'; total: number; fullGrid: boolean };
type BookEventSquaresAdd = { index: number; type: 'squaresAdd'; positions: Position[] };
type BookEventSquaresClear = { index: number; type: 'squaresClear'; positions?: Position[] };

type BookEventAddStickyWilds = { index: number; type: 'addStickyWilds'; positions: Position[]; mults?: number[] };
type BookEventRespinCounter = { index: number; type: 'respinCounter'; remaining: number; reset: boolean };

type BookEventExpandingWildReel = { index: number; type: 'expandingWildReel'; reel: number; mult: number; who?: string };

type BookEventWildMults = {
	index: number;
	type: 'wildMults';
	positions: Position[];
	values: number[];
	hidden?: boolean[];
};

// customised
type BookEventCreateBonusSnapshot = {
	index: number;
	type: 'createBonusSnapshot';
	bookEvents: BookEvent[];
};

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
	| BookEventSquaresReveal
	| BookEventCloverApply
	| BookEventCollect
	| BookEventSquaresAdd
	| BookEventSquaresClear
	| BookEventWildMults
	| BookEventExpandingWildReel
	| BookEventAddStickyWilds
	| BookEventRespinCounter
	| BookEventHoldStart
	| BookEventRespin
	| BookEventHoldEnd
	| BookEventCreateBonusSnapshot;

export type Bet = BetType<BookEvent>;
export type BookEventOfType<T> = Extract<BookEvent, { type: T }>;
export type BookEventContext = { bookEvents: BookEvent[] };
