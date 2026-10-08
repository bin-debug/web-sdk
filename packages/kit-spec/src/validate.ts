import { FEATURES } from './features.ts';
import type { ShellSpec, SpecIssue } from './types.ts';

const isHex = (s: unknown) => typeof s === 'string' && /^#[0-9a-fA-F]{6}$/.test(s);

// Plain-English validation: every message says what is wrong and how to fix it.
export function validateSpec(spec: ShellSpec): SpecIssue[] {
	const out: SpecIssue[] = [];
	const err = (path: string, message: string) => out.push({ level: 'error', path, message });
	const warn = (path: string, message: string) => out.push({ level: 'warning', path, message });

	if (!spec.gameId || !/^[a-z0-9_]+$/.test(spec.gameId))
		err('gameId', 'The game id must be lower-case letters, digits and underscores (for example "neon_heist").');
	if (!spec.name) err('name', 'The game needs a name.');

	const { reels, rows } = spec.board ?? ({} as ShellSpec['board']);
	if (!Number.isInteger(reels) || reels < 3 || reels > 8) err('board.reels', `The board needs 3 to 8 reels, but has ${reels}.`);
	if (!Number.isInteger(rows) || rows < 3 || rows > 8) err('board.rows', `The board needs 3 to 8 rows, but has ${rows}.`);
	if (reels * rows > 49) warn('board', `A ${reels}x${rows} board has ${reels * rows} cells; on a phone the symbols get very small.`);

	if (!['spin', 'drop', 'respin'].includes(spec.reveal)) err('reveal', 'The reveal style must be "spin", "drop" or "respin".');
	const pt = spec.pays?.type;
	if (!['lines', 'ways', 'cluster', 'scatter'].includes(pt)) err('pays.type', 'The pay type must be "lines", "ways", "cluster" or "scatter".');
	if (pt === 'lines' && !(spec.pays.lines >= 1)) err('pays.lines', 'Line pays need a number of lines (for example 20).');
	if ((pt === 'cluster' || pt === 'scatter') && !(spec.pays.min >= 2)) err('pays.min', `${pt} pays need a minimum count (for example 8).`);
	if ((pt === 'cluster' || pt === 'scatter') && spec.reveal === 'spin')
		warn('reveal', `${pt} pays normally use "drop" so winning symbols can tumble out.`);

	const { low, high } = spec.symbols ?? ({} as ShellSpec['symbols']);
	if (!(low >= 2 && low <= 6)) err('symbols.low', `Use 2 to 6 low symbols (L1-L6), not ${low}.`);
	if (!(high >= 2 && high <= 6)) err('symbols.high', `Use 2 to 6 high symbols (H1-H6), not ${high}.`);
	if (spec.symbols?.epicVariants && high > 4) warn('symbols.epicVariants', 'Epic variants exist for H1-H4 only; H5 and H6 stay normal.');

	const features = spec.features ?? [];
	for (const id of features) {
		const info = FEATURES[id];
		if (!info) {
			err('features', `Unknown feature "${id}". Known features: ${Object.keys(FEATURES).join(', ')}.`);
			continue;
		}
		for (const need of info.needs ?? [])
			if (!features.includes(need)) err('features', `Feature "${id}" needs "${need}" to be switched on as well.`);
		if (info.reveal && !info.reveal.includes(spec.reveal))
			err('features', `Feature "${id}" works with reveal style ${info.reveal.map((r) => `"${r}"`).join(' or ')}, but this game uses "${spec.reveal}".`);
		if (info.pays && !info.pays.includes(pt)) err('features', `Feature "${id}" works with ${info.pays.join(' or ')} pays, but this game uses "${pt}".`);
		if (!info.implemented) warn('features', `Feature "${id}" is in the library but not built yet; it will show its code fallback only.`);
	}
	const ids = new Set<string>();
	for (const b of spec.bonuses ?? []) {
		for (const a of b.adds ?? []) {
			if (!FEATURES[a]) err('bonuses', `Bonus ${b.id} adds unknown feature "${a}".`);
			else
				for (const need of FEATURES[a].needs ?? [])
					if (!features.includes(need) && !(b.adds ?? []).includes(need)) err('bonuses', `Bonus ${b.id} adds "${a}", which needs "${need}".`);
		}
		if (ids.has(b.id)) err('bonuses', `Two bonuses use the id "${b.id}".`);
		ids.add(b.id);
		if (!/^BONUS\d*$/.test(b.id)) warn('bonuses', `Bonus id "${b.id}" should look like BONUS, BONUS2, BONUS3 (it is the RGS bet mode).`);
	}
	for (const buy of spec.buys ?? []) if (!ids.has(buy.mode)) err('buys', `The buy for mode "${buy.mode}" has no matching bonus in "bonuses".`);
	if (spec.reelStash && (!Array.isArray(spec.reelStash.variants) || !spec.reelStash.variants.length || spec.reelStash.variants.some((v) => !['multiply', 'bank'].includes(v))))
		err('reelStash.variants', 'Reel stash variants must be a non-empty list containing "multiply" and/or "bank".');
	if ((spec.bonuses?.length ?? 0) > 0 && spec.symbols?.scatter === false) warn('symbols.scatter', 'Bonuses are triggered by the scatter symbol S, but scatter is switched off.');

	if (!['board-hero', 'stage', 'classic'].includes(spec.layout?.preset)) err('layout.preset', 'The layout preset must be "board-hero", "stage" or "classic".');
	if (!isHex(spec.ui?.accent)) err('ui.accent', 'The accent colour must look like "#F5C400".');
	for (const [i, c] of (spec.palette ?? []).entries()) if (!isHex(c)) err(`palette[${i}]`, `Palette colour "${c}" must look like "#1b1030".`);
	return out;
}

export function formatIssues(issues: SpecIssue[]) {
	return issues.map((i) => `${i.level === 'error' ? 'ERROR  ' : 'warning'} ${i.path}: ${i.message}`).join('\n');
}
