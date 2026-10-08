import type { Position } from '../../game/types';
import { SPEC } from '../../game/spec';

// The `coin` shape from docs/features/BOOK-EVENTS.md
export type Coin = {
	pos: Position;
	kind: 'bronze' | 'silver' | 'gold' | 'diamond' | 'bag' | 'pot' | 'clover' | 'collector' | 'jackpot' | 'multiplier' | 'plus' | 'collect';
	value?: number; // payout in x bet
	tier?: 'mini' | 'minor' | 'major' | 'grand';
	mult?: number;
};

// Kinds this feature draws. Clovers, collectors and jackpot markers belong to their own features.
// Hold and win coins: cash coins, jackpot coins (they carry a tier label and pay that tier), multiplier and plus-spin coins.
const VALUE_KINDS = ['bronze', 'silver', 'gold', 'diamond', 'bag', 'pot', 'jackpot', 'multiplier', 'plus', 'collect'];
export const isCoinKind = (kind: string) => VALUE_KINDS.includes(kind);

// tier look: still slot (C1..C4 in the art manifest) and the code colours used by the fallback disc
export const TIERS = {
	bronze: { slot: 'symbol.C1.static', face: 0xcd7f32, rim: 0x8a4f1d, shine: 0xf2b27a },
	silver: { slot: 'symbol.C2.static', face: 0xcfd6e0, rim: 0x7d8796, shine: 0xffffff },
	gold: { slot: 'symbol.C3.static', face: 0xffc83d, rim: 0xb9830a, shine: 0xfff0a8 },
	diamond: { slot: 'symbol.C4.static', face: 0x7fe9ff, rim: 0x2a8fb0, shine: 0xe8fbff },
} as const;

// jackpot coin colours (the jackpot pills use the same ones)
export const JACKPOT_LOOK = {
	mini: { face: 0x35be76, rim: 0x0f643b },
	minor: { face: 0x4298e8, rim: 0x19558c },
	major: { face: 0xdf4f9b, rim: 0x8b2158 },
	grand: { face: 0xee8b35, rim: 0x9a4612 },
} as const;

// how a coin looks: art slot (cash coins only) plus the code colours
export const coinFace = (coin: Coin): { slot?: string; face: number; rim: number; shine: number } => {
	if (coin.kind === 'jackpot') return { ...JACKPOT_LOOK[coin.tier ?? 'mini'], shine: 0xffffff };
	if (coin.kind === 'multiplier') return { face: 0x9b5de5, rim: 0x4a1f8f, shine: 0xe8d4ff };
	if (coin.kind === 'plus') return { face: 0x2ecc71, rim: 0x146b3a, shine: 0xdfffe9 };
	if (coin.kind === 'collect') return { face: 0xe8a33d, rim: 0x7a4a0a, shine: 0xfff0c2 };
	return TIERS[tierOf(coin.kind)];
};

// the text on a special coin (cash coins show their value instead)
export const coinLabel = (coin: Coin, value = 0): string | undefined => {
	if (coin.kind === 'collect') return value > 0 ? undefined : 'COLLECT'; // shows what it gathered once it has
	if (coin.kind === 'jackpot') return SPEC.jackpots?.[coin.tier ?? 'mini']?.name ?? (coin.tier ?? 'mini').toUpperCase();
	if (coin.kind === 'multiplier') return `x${coin.mult ?? 2}`;
	if (coin.kind === 'plus') return '+1';
	return undefined;
};

export const tierOf = (kind: Coin['kind']): keyof typeof TIERS => (kind in TIERS ? (kind as keyof typeof TIERS) : 'gold'); // bags and pots use the gold look

// value text: 0.5x, 2.5x, 120x
export const formatCoinValue = (value: number | undefined) => {
	if (value === undefined) return '';
	const v = value >= 100 ? Math.round(value) : Math.round(value * 100) / 100;
	return `${v}x`;
};
