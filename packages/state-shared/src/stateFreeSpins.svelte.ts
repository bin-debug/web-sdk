export type FreeSpinAllocation = {
	id: string;
	type: 'welcome_bonus' | 'campaign';
	spinCount: number;
	spinsUsed: number;
	spinValue: number;
	gameIds: string[] | null;
	wageringMultiplier: number;
	expiresAt: string | null;
};

export const stateFreeSpins = $state({
	allocations: [] as FreeSpinAllocation[],
	activeAllocation: null as FreeSpinAllocation | null,
	currentSpin: 0,
	totalWinnings: 0,
	// Set when the final awarded spin is received. The game actor promotes this
	// to a dialog only after the reel and win animations have returned to idle.
	pendingCompletion: null as { totalWinnings: number; wageringTarget: number } | null,
	showAwardPopup: false,
});
