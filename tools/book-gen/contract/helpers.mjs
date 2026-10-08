// Small checkers shared by every rule file. A rule is `(e, c) => void`; report problems with `c.fail(msg)`.
// `c.board` = { reels, rows } from the game spec. `c.fail` is already tagged with book id + event index.
export const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
export const isInt = (v) => Number.isInteger(v);
export const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

export const TIERS = ['mini', 'minor', 'major', 'grand'];
export const COIN_KINDS = ['bronze', 'silver', 'gold', 'diamond', 'bag', 'pot', 'clover', 'collector', 'jackpot', 'multiplier', 'plus', 'collect'];

// a context whose messages get a prefix (used for items inside arrays)
export const sub = (c, prefix) => ({ ...c, fail: (m) => c.fail(`${prefix}${m}`) });

export function num(e, c, key, { min, int, optional } = {}) {
	const v = e[key];
	if (v === undefined) return optional ? undefined : c.fail(`${key} is missing`);
	if (!isNum(v)) return c.fail(`${key} must be a number, got ${JSON.stringify(v)}`);
	if (int && !isInt(v)) c.fail(`${key} must be an integer, got ${v}`);
	if (min !== undefined && v < min) c.fail(`${key} must be >= ${min}, got ${v}`);
}

export function oneOf(e, c, key, allowed, { optional } = {}) {
	const v = e[key];
	if (v === undefined) return optional ? undefined : c.fail(`${key} is missing`);
	if (!allowed.includes(v)) c.fail(`${key} must be one of ${allowed.join('|')}, got ${JSON.stringify(v)}`);
}

export function str(e, c, key, { optional } = {}) {
	const v = e[key];
	if (v === undefined) return optional ? undefined : c.fail(`${key} is missing`);
	if (typeof v !== 'string' || !v) c.fail(`${key} must be a non-empty string, got ${JSON.stringify(v)}`);
}

export function bool(e, c, key, { optional } = {}) {
	const v = e[key];
	if (v === undefined) return optional ? undefined : c.fail(`${key} is missing`);
	if (typeof v !== 'boolean') c.fail(`${key} must be a boolean, got ${JSON.stringify(v)}`);
}

// A position. `padded` allows the SDK's padding rows (existing events); new events must sit on the visible board.
export function position(p, c, label, { padded = false } = {}) {
	if (!isObj(p) || !isInt(p.reel) || !isInt(p.row)) return c.fail(`${label} must be { reel, row } integers, got ${JSON.stringify(p)}`), false;
	const { reels, rows } = c.board;
	const rowMax = padded ? rows + 1 : rows - 1;
	if (p.reel < 0 || p.reel >= reels || p.row < 0 || p.row > rowMax) {
		c.fail(`${label} ${JSON.stringify(p)} is outside the ${reels}x${rows} board`);
		return false;
	}
	return true;
}

export function positions(e, c, key, opts = {}) {
	const v = e[key];
	if (v === undefined) return opts.optional ? undefined : c.fail(`${key} is missing`);
	if (!Array.isArray(v)) return c.fail(`${key} must be an array of positions`);
	if (opts.nonEmpty && !v.length) c.fail(`${key} must not be empty`);
	v.forEach((p, i) => position(p, c, `${key}[${i}]`, opts));
}

// returns the array (or undefined after reporting a problem)
export function array(e, c, key, { optional, length } = {}) {
	const v = e[key];
	if (v === undefined) {
		if (!optional) c.fail(`${key} is missing`);
		return undefined;
	}
	if (!Array.isArray(v)) return c.fail(`${key} must be an array`), undefined;
	if (length !== undefined && v.length !== length) c.fail(`${key} has ${v.length} items, expected ${length}`);
	return v;
}

// coin shape: { pos, kind, value?, tier?, mult? }
export function coin(v, c, label) {
	if (!isObj(v)) return c.fail(`${label} must be an object`);
	position(v.pos, c, `${label}.pos`);
	if (!COIN_KINDS.includes(v.kind)) c.fail(`${label}.kind must be one of ${COIN_KINDS.join('|')}, got ${JSON.stringify(v.kind)}`);
	for (const k of ['value', 'mult']) if (v[k] !== undefined && !isNum(v[k])) c.fail(`${label}.${k} must be a number`);
	if (v.tier !== undefined && !TIERS.includes(v.tier)) c.fail(`${label}.tier must be one of ${TIERS.join('|')}`);
	if (v.kind === 'jackpot' && v.tier === undefined) c.fail(`${label}.tier is required for kind "jackpot"`);
}

export function coins(e, c, key, opts = {}) {
	const v = array(e, c, key, opts);
	v?.forEach((x, i) => coin(x, c, `${key}[${i}]`));
	return v;
}

// A grid of { name } symbols: reels x (rows, or rows + 2 SDK padding rows). `ragged` = tumble refills (any length up to rows + 2).
export function symbolGrid(e, c, key, { ragged } = {}) {
	const g = array(e, c, key);
	if (!g) return;
	const { rows, reels } = c.board;
	if (g.length !== reels) c.fail(`${key} has ${g.length} reels, the board has ${reels}`);
	g.forEach((reel, r) => {
		if (!Array.isArray(reel)) return c.fail(`${key}[${r}] must be an array of symbols`);
		if (!ragged && reel.length !== rows && reel.length !== rows + 2) c.fail(`${key}[${r}] has ${reel.length} symbols, expected ${rows} (or ${rows + 2} with padding)`);
		if (ragged && reel.length > rows + 2) c.fail(`${key}[${r}] has ${reel.length} symbols, more than the ${rows} rows`);
		reel.forEach((s, i) => {
			if (!isObj(s) || typeof s.name !== 'string' || !s.name) c.fail(`${key}[${r}][${i}] must be { name: string }, got ${JSON.stringify(s)}`);
		});
	});
}
