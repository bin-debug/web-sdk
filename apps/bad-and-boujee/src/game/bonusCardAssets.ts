import { stateMeta } from 'state-shared';

// Swaps the default (dead CDN) bonus-card icons for our own paytable symbol art,
// and drops the volatility image since we don't have badge art for it.
const ICON_BY_MODE: Record<string, string> = {
	ANTE: '/assets/paytable/S.png',
	SUPERANTE: '/assets/paytable/S.png',
	SUPERSPIN: '/assets/paytable/W.png',
	BONUS: '/assets/paytable/S.png',
	SUPER: '/assets/paytable/M.png',
};

for (const [mode, icon] of Object.entries(ICON_BY_MODE)) {
	const betMode = stateMeta.betModeMeta[mode];
	if (betMode) {
		betMode.assets.icon = icon;
		betMode.assets.volatility = '';
	}
}
