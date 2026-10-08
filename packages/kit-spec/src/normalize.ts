import { PAY_TYPE_DEFAULT_REVEAL } from './features.ts';
import type { ShellSpec } from './types.ts';

// Fill every optional field so the engine never checks for undefined.
export function normalizeSpec(raw: Partial<ShellSpec> & { gameId: string }): ShellSpec {
	const pays = raw.pays ?? { type: 'lines', lines: 20 };
	const symbols = { low: 4, high: 4, epicVariants: false, wild: true, scatter: true, ...(raw.symbols ?? {}) };
	return {
		gameId: raw.gameId,
		name: raw.name ?? raw.gameId,
		shell: raw.shell ?? 'custom',
		board: { cell: 120, gap: 4, reels: 5, rows: 3, ...(raw.board ?? {}) },
		reveal: raw.reveal ?? PAY_TYPE_DEFAULT_REVEAL[pays.type] ?? 'spin',
		pays,
		symbols,
		features: raw.features ?? [],
		bonuses: raw.bonuses ?? [],
		boosts: raw.boosts ?? [],
		buys: raw.buys ?? [],
		reelStash: raw.reelStash,
		jackpots: raw.jackpots,
		layout: { preset: 'board-hero', mascotSide: 'right', ...(raw.layout ?? {}) },
		ui: { accent: '#F5C400', bar: 'kit', ...(raw.ui ?? {}) },
		palette: raw.palette ?? ['#1b1030', '#e0245e', '#ffd23f'],
		artStyle: raw.artStyle,
	} as ShellSpec;
}

// Symbol names in play order for a spec: L1..Ln, H1..Hn, W, S.
export function symbolNames(spec: ShellSpec) {
	const names: string[] = [];
	for (let i = 1; i <= spec.symbols.low; i++) names.push(`L${i}`);
	for (let i = 1; i <= spec.symbols.high; i++) names.push(`H${i}`);
	if (spec.symbols.wild) names.push('W');
	if (spec.symbols.scatter) names.push('S');
	return names;
}
