import type { Position } from '../../game/types';

// The `coin` shape from docs/features/BOOK-EVENTS.md
export type Coin = {
	pos: Position;
	kind: 'bronze' | 'silver' | 'gold' | 'diamond' | 'bag' | 'pot' | 'clover' | 'collector' | 'jackpot';
	value?: number; // payout in x bet
	tier?: 'mini' | 'minor' | 'major' | 'grand';
	mult?: number;
};

// Kinds this feature draws. Clovers, collectors and jackpot markers belong to their own features.
const VALUE_KINDS = ['bronze', 'silver', 'gold', 'diamond', 'bag', 'pot'];
export const isCoinKind = (kind: string) => VALUE_KINDS.includes(kind);

// tier look: still slot (C1..C4 in the art manifest) and the code colours used by the fallback disc
export const TIERS = {
	bronze: { slot: 'symbol.C1.static', face: 0xcd7f32, rim: 0x8a4f1d, shine: 0xf2b27a },
	silver: { slot: 'symbol.C2.static', face: 0xcfd6e0, rim: 0x7d8796, shine: 0xffffff },
	gold: { slot: 'symbol.C3.static', face: 0xffc83d, rim: 0xb9830a, shine: 0xfff0a8 },
	diamond: { slot: 'symbol.C4.static', face: 0x7fe9ff, rim: 0x2a8fb0, shine: 0xe8fbff },
} as const;

export const tierOf = (kind: Coin['kind']): keyof typeof TIERS => (kind in TIERS ? (kind as keyof typeof TIERS) : 'gold'); // bags and pots use the gold look

// value text: 0.5x, 2.5x, 120x
export const formatCoinValue = (value: number | undefined) => {
	if (value === undefined) return '';
	const v = value >= 100 ? Math.round(value) : Math.round(value * 100) / 100;
	return `${v}x`;
};
