import type { BetModeMeta, BetModeData } from 'state-shared';

// Four-card buy menu: two per-spin boosts ("activate") and two direct bonus buys.
// Prices come from the RGS (config.betModes costMultiplier); these are display defaults.
const NO_ASSETS = { icon: '', volatility: '', button: '', dialogImage: '', dialogVolatility: '' };

const mode = (data: Omit<BetModeData, 'parent' | 'children' | 'assets'>): BetModeData => ({
	parent: '',
	children: '',
	assets: NO_ASSETS,
	...data,
});

export const BET_MODE_META: BetModeMeta = {
	BASE: mode({
		mode: 'BASE',
		costMultiplier: 1,
		type: 'default',
		text: { title: '', dialog: '', button: '', tickerIdle: '', tickerSpin: '' },
	}),
	BOOST: mode({
		mode: 'BOOST',
		costMultiplier: 3,
		type: 'activate',
		text: {
			title: 'BONUS HUNT',
			description: 'Each spin is 5 times more likely to land a free-spin reel.',
			dialog: 'Every spin is 5 times more likely to trigger a bonus. Stays on until you turn it off.',
			button: 'ACTIVATE',
			betAmountLabel: 'BONUS HUNT',
			tickerIdle: 'BONUS HUNT IS ACTIVE',
			tickerSpin: 'GOOD LUCK',
		},
	}),
	COINSPIN: mode({
		mode: 'COINSPIN',
		costMultiplier: 50,
		type: 'activate',
		text: {
			title: 'COIN RUSH',
			description: 'Every spin lands a coin special on the trigger row.',
			dialog: 'Every spin is guaranteed a coin reel. Stays on until you turn it off.',
			button: 'ACTIVATE',
			betAmountLabel: 'COIN RUSH',
			tickerIdle: 'COIN RUSH IS ACTIVE',
			tickerSpin: 'GOOD LUCK',
		},
	}),
	BONUS: mode({
		mode: 'BONUS',
		costMultiplier: 80,
		type: 'buy',
		text: {
			title: 'MULTIPLIER MINE',
			description: 'Free spins with a multiplier box above each reel that grows on every coin reel.',
			dialog: 'Buy the Multiplier Mine bonus. The cost is taken from your balance.',
			button: 'BUY',
			tickerIdle: '',
			tickerSpin: '',
		},
	}),
	SUPER: mode({
		mode: 'SUPER',
		costMultiplier: 200,
		type: 'buy',
		text: {
			title: 'TREASURE VAULT',
			description: 'Free spins where each reel keeps every coin it collects and pays it again.',
			dialog: 'Buy the Treasure Vault bonus. The cost is taken from your balance.',
			button: 'BUY',
			tickerIdle: '',
			tickerSpin: '',
		},
	}),
};
