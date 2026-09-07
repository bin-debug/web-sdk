/**
 * Game Router Worker — games.atomic-labs.co
 *
 * Routes requests to the correct Cloudflare Pages project based on gameId.
 * Initial request: ?gameId=skull_fiesta_frenzy → proxy from skull-fiesta-frenzy.pages.dev, set cookie.
 * Subsequent asset requests (/_app/, /assets/): read cookie, proxy transparently.
 *
 * Operators only need to change gameId and sessionID per launch.
 * All other params (operator_id, brand_id, currency, lang, device) stay constant.
 */

const GAME_MAP = {
	skull_fiesta_frenzy: 'skull-fiesta-frenzy',
	fruit_pop_frenzy: 'fruit-pop-frenzy',
	amapiano_after_dark: 'amapiano-after-dark',
	boulder_bash: 'boulder-bash',
	cheerful_charlie: 'cheerful-charlie',
	ke_dezemba: 'ke-dezemba',
	mzansi_magic: 'mzansi-magic',
	pops_and_bangs: 'pops-and-bangs',
	shamrocks_and_shenanigans: 'shamrocks-and-shenanigans',
	sugar_pop_cascade: 'sugar-pop-cascade',
	brimstone_bookies: 'brimstone-bookies',
};

const COOKIE = '__game';
const PAGES_SUFFIX = '.pages.dev';

function getGameOriginFromCookie(request) {
	const cookie = request.headers.get('cookie') || '';
	const match = cookie.match(new RegExp(`${COOKIE}=([^;\\s]+)`));
	return match ? `https://${match[1]}${PAGES_SUFFIX}` : null;
}

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const gameId = url.searchParams.get('gameId');

		let gameSlug = gameId ? GAME_MAP[gameId] : null;
		let gameOrigin = gameSlug ? `https://${gameSlug}${PAGES_SUFFIX}` : getGameOriginFromCookie(request);

		if (!gameOrigin) {
			return new Response(
				'Missing gameId. Example: games.atomic-labs.co?gameId=skull_fiesta_frenzy&sessionID=...&operator_id=...&brand_id=...',
				{ status: 400, headers: { 'content-type': 'text/plain' } },
			);
		}

		// Forward the request to the correct Pages project, preserving path + query
		const proxyUrl = new URL(url.pathname + url.search, gameOrigin);
		const proxyRequest = new Request(proxyUrl.toString(), {
			method: request.method,
			headers: request.headers,
			body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
		});

		const response = await fetch(proxyRequest);

		// On the initial page request (gameId present), stamp the cookie so asset
		// requests (/_app/, /assets/) know which Pages project to proxy from.
		const mutable = new Response(response.body, response);
		if (gameSlug) {
			mutable.headers.append(
				'Set-Cookie',
				`${COOKIE}=${gameSlug}; Path=/; SameSite=Strict; Max-Age=3600`,
			);
		}

		return mutable;
	},
};
