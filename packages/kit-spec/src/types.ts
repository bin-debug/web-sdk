// game.spec.json: everything the owner chooses. No outcome logic lives here.
export type PayType = 'lines' | 'ways' | 'cluster' | 'scatter';
export type RevealStyle = 'spin' | 'drop' | 'respin';
export type LayoutPreset = 'board-hero' | 'stage' | 'classic';

export type BonusSpec = {
	id: string; // BONUS, BONUS2, ... (also the RGS bet mode key)
	name: string;
	trigger: string; // e.g. "3 S"
	spins?: number;
	adds?: string[]; // extra features only active inside this bonus
	hidden?: boolean; // revealed by the book, not announced
};

export type BoostSpec = { id: string; name: string; cost: number };
export type BuySpec = { mode: string; cost: number };
export type ReelStashSpec = { variants: ('multiply' | 'bank')[] };

export type ShellSpec = {
	gameId: string;
	name: string;
	shell: string;
	board: { reels: number; rows: number; cell?: number; gap?: number };
	reveal: RevealStyle;
	pays: { type: PayType; lines?: number; min?: number };
	symbols: { low: number; high: number; epicVariants?: boolean; wild?: boolean; scatter?: boolean };
	features: string[];
	bonuses: BonusSpec[];
	boosts: BoostSpec[];
	buys: BuySpec[];
	reelStash?: ReelStashSpec;
	layout: { preset: LayoutPreset; mascotSide: 'left' | 'right'; widget?: string };
	ui: { accent: string; bar: 'kit' };
	palette: string[];
	artStyle?: string;
};

export type SpecIssue = { level: 'error' | 'warning'; path: string; message: string };
