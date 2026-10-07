// The feature library (SHELL-PLAN section 5). `needs` = other features that must be on.
// `reveal` = reveal styles the feature works with. `pays` = pay types it works with.
export type FeatureInfo = {
	id: string;
	title: string;
	needs?: string[];
	reveal?: ('spin' | 'drop' | 'respin')[];
	pays?: ('lines' | 'ways' | 'cluster' | 'scatter')[];
	events: string[]; // book events the maths must emit
	implemented: boolean;
};

const f = (info: FeatureInfo) => info;

export const FEATURES: Record<string, FeatureInfo> = {
	tumble: f({
		id: 'tumble',
		title: 'Tumble',
		reveal: ['drop'],
		events: ['tumbleBoard'],
		implemented: true,
	}),
	superTumble: f({
		id: 'superTumble',
		title: 'Super tumble',
		needs: ['tumble'],
		events: ['tumbleBoard'],
		implemented: false,
	}),
	globalMultiplier: f({
		id: 'globalMultiplier',
		title: 'Global multiplier',
		events: ['updateGlobalMult'],
		implemented: true,
	}),
	goldenSquares: f({
		id: 'goldenSquares',
		title: 'Golden squares',
		needs: ['tumble'],
		events: ['squaresAdd', 'squaresClear'],
		implemented: true,
	}),
	rainbowReveal: f({
		id: 'rainbowReveal',
		title: 'Rainbow reveal',
		needs: ['goldenSquares'],
		events: ['squaresReveal'],
		implemented: false,
	}),
	coins: f({ id: 'coins', title: 'Coins', events: ['squaresReveal', 'reveal'], implemented: true }),
	clovers: f({
		id: 'clovers',
		title: 'Clovers',
		needs: ['coins'],
		events: ['cloverApply'],
		implemented: true,
	}),
	collectors: f({
		id: 'collectors',
		title: 'Collectors',
		needs: ['coins'],
		events: ['collect'],
		implemented: true,
	}),
	layers: f({ id: 'layers', title: 'Layers', events: ['layerBreak'], implemented: false }),
	dynamite: f({
		id: 'dynamite',
		title: 'Dynamite',
		needs: ['layers'],
		events: ['dynamite'],
		implemented: false,
	}),
	holdAndWin: f({
		id: 'holdAndWin',
		title: 'Hold and win',
		needs: ['coins'],
		reveal: ['spin', 'respin'],
		events: ['holdStart', 'respin', 'holdEnd'],
		implemented: true,
	}),
	jackpotLadder: f({
		id: 'jackpotLadder',
		title: 'Jackpot ladder',
		events: ['jackpotWin'],
		implemented: false,
	}),
	bottomRowExpand: f({
		id: 'bottomRowExpand',
		title: 'Bottom row expand',
		needs: ['coins'],
		reveal: ['drop'],
		events: ['expandReel'],
		implemented: false,
	}),
	reelStash: f({
		id: 'reelStash',
		title: 'Reel stash',
		events: ['stashUpdate'],
		implemented: false,
	}),
	multiplierWilds: f({
		id: 'multiplierWilds',
		title: 'Multiplier wilds',
		pays: ['lines', 'ways'],
		events: ['wildMults'],
		implemented: true,
	}),
	stickyWilds: f({
		id: 'stickyWilds',
		title: 'Sticky wilds',
		events: ['addStickyWilds'],
		implemented: false,
	}),
	expandingReelWild: f({
		id: 'expandingReelWild',
		title: 'Expanding reel wild',
		reveal: ['spin'],
		events: ['expandingWildReel'],
		implemented: false,
	}),
	symbolUpgrade: f({
		id: 'symbolUpgrade',
		title: 'Symbol upgrade',
		events: ['upgradeSymbol'],
		implemented: false,
	}),
	symbolBar: f({
		id: 'symbolBar',
		title: 'Symbol bar',
		needs: ['symbolUpgrade'],
		events: ['barLevel'],
		implemented: false,
	}),
	refillRespins: f({
		id: 'refillRespins',
		title: 'Refill respins',
		needs: ['holdAndWin'],
		events: ['respinCounter'],
		implemented: false,
	}),
	persistSquares: f({
		id: 'persistSquares',
		title: 'Persist squares',
		needs: ['goldenSquares'],
		events: ['squaresAdd'],
		implemented: false,
	}),
	squaresStay: f({
		id: 'squaresStay',
		title: 'Squares stay',
		needs: ['goldenSquares'],
		events: ['squaresAdd'],
		implemented: false,
	}),
	revealEverySpin: f({
		id: 'revealEverySpin',
		title: 'Reveal every spin',
		needs: ['rainbowReveal'],
		events: ['squaresReveal'],
		implemented: false,
	}),
};

export const PAY_TYPE_DEFAULT_REVEAL: Record<string, 'spin' | 'drop'> = {
	lines: 'spin',
	ways: 'spin',
	cluster: 'drop',
	scatter: 'drop',
};
