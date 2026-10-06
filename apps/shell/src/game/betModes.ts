import type { BetModeMeta, BetModeData } from 'state-shared';

import { SPEC } from './spec';

// Bet-mode cards (buy menu) come from the spec: one card per bonus buy, one per boost.
// Prices come from the RGS (config.betModes costMultiplier); these are display defaults.
const NO_ASSETS = { icon: '', volatility: '', button: '', dialogImage: '', dialogVolatility: '' };

const mode = (data: Omit<BetModeData, 'parent' | 'children' | 'assets'>): BetModeData => ({
	parent: '',
	children: '',
	assets: NO_ASSETS,
	...data,
});

const meta: BetModeMeta = {
	BASE: mode({
		mode: 'BASE',
		costMultiplier: 1,
		type: 'default',
		text: { title: '', dialog: '', button: '', tickerIdle: '', tickerSpin: '' },
	}),
};

for (const buy of SPEC.buys) {
	const bonus = SPEC.bonuses.find((b) => b.id === buy.mode);
	if (!bonus) continue;
	meta[buy.mode] = mode({
		mode: buy.mode,
		costMultiplier: buy.cost,
		type: 'buy',
		text: {
			title: bonus.name.toUpperCase(),
			description: `Buy the ${bonus.name} bonus (${bonus.spins ?? 10} free spins).`,
			dialog: `Buy the ${bonus.name} bonus. The cost is taken from your balance.`,
			button: 'BUY',
			tickerIdle: '',
			tickerSpin: '',
		},
	});
}

for (const boost of SPEC.boosts) {
	meta[boost.id] = mode({
		mode: boost.id,
		costMultiplier: boost.cost,
		type: 'activate',
		text: {
			title: boost.name.toUpperCase(),
			description: `${boost.name}: bonuses are more likely. Stays on until you turn it off.`,
			dialog: `${boost.name} stays on until you turn it off.`,
			button: 'ACTIVATE',
			betAmountLabel: boost.name.toUpperCase(),
			tickerIdle: `${boost.name.toUpperCase()} IS ACTIVE`,
			tickerSpin: 'GOOD LUCK',
		},
	});
}

export const BET_MODE_META = meta;
