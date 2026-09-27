// Promo engine state. Amounts from the API are micro-units (API_AMOUNT_MULTIPLIER).
// Promo rewards are paid by the RGS as separate wallet credits. The wallet balance in the
// play response already includes them, so the shown balance holds the credit back until
// the reward pop-up appears after the game's own win presentation has finished.

export type PromoSummary = {
	promoId: string;
	type: string;
	title: string;
	subtitle: string;
	termsText?: string | null;
	phase: 'accumulating' | 'live' | 'ended';
	pot: number;
	currency: string;
	prizesRemaining: number;
	prizesTotal: number;
	windowStart: string;
	windowEnd: string;
	endsAt: string;
	boost?: { multiplier: number; minWinMultiplier: number; maxPerAward: number; budgetLeft: number };
	mission?: {
		steps: { goal: 'spins' | 'wins_at_least' | 'total_win' | 'total_wagered'; target: number; threshold: number; reward: number; label: string }[];
		step: number;
		current: number;
	};
	leaderboard?: {
		scoreBy: 'max_multiplier' | 'total_win' | 'spins' | 'total_wagered';
		top: PromoLeaderboardEntry[];
		you: PromoLeaderboardEntry | null;
		paidPlaces: number;
	};
	prizes?: { tier: number; label: string; count: number; amount: number }[];
};

export type PromoLeaderboardEntry = { position: number; player: string; score: number; you: boolean };

export type PromoAward = {
	// 'result' = a final placing paid when a leaderboard closed (already in the wallet balance).
	display?: 'result';
	promoId: string;
	type: string;
	kind: string;
	tier: number;
	label: string;
	amount: number;
	currency: string;
	title: string;
};

export const statePromo = $state({
	active: [] as PromoSummary[],
	// Awarded on a spin whose game presentation is still running.
	pending: [] as PromoAward[],
	// Micro-units credited by the wallet but not yet revealed to the player.
	pendingAmount: 0,
	// Awards ready to show, oldest first. The pop-up shows queue[0].
	queue: [] as PromoAward[],
	// Promo shown in the info sheet (null = closed).
	infoPromoId: null as string | null,
	// Leaderboard results already announced to this player.
	resultsShown: [] as string[],
});

const isShowable = (p: PromoSummary) =>
	p.phase !== 'ended' || (p.type === 'leaderboard' && !!p.leaderboard?.you);

export const statePromoDerived = {
	current: () => statePromo.queue[0] ?? null,
	/** Promos for the banner: live/upcoming ones, plus finished leaderboards the player was on. */
	showable: () => statePromo.active.filter(isShowable),
	info: () => statePromo.active.find((p) => p.promoId === statePromo.infoPromoId) ?? null,
};

export const promoActions = {
	setActive: (active: PromoSummary[] | null | undefined) => {
		statePromo.active = active ?? [];
	},
	holdAwards: (awards: PromoAward[] | null | undefined) => {
		if (!awards?.length) return;
		statePromo.pending = [...statePromo.pending, ...awards];
		statePromo.pendingAmount += awards.reduce((sum, a) => sum + a.amount, 0);
	},
	/** Moves held awards to the pop-up queue. Returns the micro-units now revealed. */
	revealAwards: () => {
		const revealed = statePromo.pendingAmount;
		if (statePromo.pending.length) statePromo.queue = [...statePromo.queue, ...statePromo.pending];
		statePromo.pending = [];
		statePromo.pendingAmount = 0;
		return revealed;
	},
	dismissCurrent: () => {
		statePromo.queue = statePromo.queue.slice(1);
	},
	/** Announces a final leaderboard placing once (the prize was credited when the board closed). */
	announceResult: (award: PromoAward) => {
		if (statePromo.resultsShown.includes(award.promoId)) return;
		statePromo.resultsShown = [...statePromo.resultsShown, award.promoId];
		statePromo.queue = [...statePromo.queue, { ...award, display: 'result' }];
	},
};
