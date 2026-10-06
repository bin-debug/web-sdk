import { SECOND } from 'constants-shared/time';

// Win tiers as data. Big tiers are full-screen code-drawn scenes (kit win scene); art can replace them via slots.
const tier = (level: number, alias: string, type: 'small' | 'medium' | 'big', text: string | null, seconds: number, music?: 'bonus') => ({
	level,
	alias,
	type,
	text,
	presentDuration: seconds * SECOND,
	sound: { sfx: undefined as string | undefined, bgm: music as string | undefined },
	animation: undefined,
});

export const winLevelMap = {
	1: tier(1, 'zero', 'small', null, 0),
	2: tier(2, 'standard', 'small', null, 0.6),
	3: tier(3, 'small', 'small', null, 1),
	4: tier(4, 'nice', 'medium', null, 1.5),
	5: tier(5, 'substantial', 'medium', null, 2),
	6: tier(6, 'big', 'big', 'BIG WIN', 3),
	7: tier(7, 'superwin', 'big', 'SUPER WIN', 4),
	8: tier(8, 'mega', 'big', 'MEGA WIN', 5),
	9: tier(9, 'epic', 'big', 'EPIC WIN', 6),
	10: tier(10, 'max', 'big', 'MAX WIN', 7),
} as const;

export type WinLevelMap = typeof winLevelMap;
export type WinLevel = keyof typeof winLevelMap;
export type WinLevelData = WinLevelMap[WinLevel];
export type WinLevelAlias = WinLevelData['alias'];
