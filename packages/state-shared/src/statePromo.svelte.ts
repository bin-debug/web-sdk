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
};

export type PromoAward = {
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
	infoOpen: false,
});

export const statePromoDerived = {
	current: () => statePromo.queue[0] ?? null,
	banner: () => statePromo.active.find((p) => p.phase !== 'ended') ?? null,
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
};
