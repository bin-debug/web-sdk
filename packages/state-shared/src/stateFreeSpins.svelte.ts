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
	showAwardPopup: false,
});
