import { normalizeSpec, symbolNames, type ShellSpec } from 'kit-spec';

// One engine, many games: the game is picked from ?game_id=... (every spec in /games is bundled).
const rawSpecs = import.meta.glob('../../../../games/*/game.spec.json', { eager: true, import: 'default' }) as Record<
	string,
	Partial<ShellSpec> & { gameId: string }
>;

export const SPECS: Record<string, ShellSpec> = {};
for (const raw of Object.values(rawSpecs)) SPECS[raw.gameId] = normalizeSpec(raw);

const params = typeof location !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams();
export const GAME_ID = params.get('game_id') && SPECS[params.get('game_id')!] ? params.get('game_id')! : 'lines_classic';
export const SPEC: ShellSpec = SPECS[GAME_ID];

// ?art=none  -> ignore every art file (proves the code fallbacks); ?art=game -> game art only, no demo art
export const ART_MODE = (params.get('art') ?? 'demo') as 'demo' | 'game' | 'none';

export const SYMBOL_NAMES = symbolNames(SPEC);
export const isDrop = SPEC.reveal === 'drop';
export const hasTumble = SPEC.features.includes('tumble');
