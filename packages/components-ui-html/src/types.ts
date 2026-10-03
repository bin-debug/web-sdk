export type EmitterEventModal =
	| { type: 'soundPressGeneral' }
	| { type: 'buyBonusConfirm' }
	| { type: 'bet' }
	| { type: 'autoBet' };

/** What the shared BettingBar needs from a game's context (see each app's game/context.ts). */
export type BettingBarContext = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	eventEmitter: { broadcast: (event: any) => void; subscribeOnMount: (handlers: any) => void };
	stateLayoutDerived: { layoutType: () => string; mainLayout: () => { width: number; height: number } };
	stateXstateDerived: { isIdle: () => boolean };
	stateGameDerived: { boardLayout: () => { height: number } };
};
