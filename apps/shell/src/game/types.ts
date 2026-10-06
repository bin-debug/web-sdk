import { type CascadingReelSymbolState } from 'utils-slots';

export type SymbolName = string;
export type RawSymbol = { name: SymbolName; multiplier?: number; scatter?: boolean };
export type GameType = 'basegame' | 'freegame';

export const SYMBOL_STATES = ['static', 'spin', 'land', 'win', 'postWinStatic', 'explosion'] as const;

export type SymbolState = CascadingReelSymbolState | (typeof SYMBOL_STATES)[number];

export type Position = {
	reel: number;
	row: number;
};
