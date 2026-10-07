import _ from 'lodash';

import { stateBet } from 'state-shared';
import { checkIsMultipleRevealEvents } from 'utils-book';
import { createPrimaryMachines, createIntermediateMachines, createGameActor } from 'utils-xstate';

import type { Bet } from './typesBookEvent';
import { stateXstateDerived } from './stateXstate';
import { playBet, convertTorResumableBet } from './utils';
import { stateGame, stateGameDerived } from './stateGame.svelte';
import config from './config';

const primaryMachines = createPrimaryMachines<Bet>({
	onResumeGameActive: (betToResume) => convertTorResumableBet(betToResume),
	onResumeGameInactive: (betToResume) => {
		const lastRevealEvent = _.findLast(
			betToResume.state,
			(bookEvent) => bookEvent?.type === 'reveal',
		);

		if (lastRevealEvent) stateGameDerived.enhancedBoard.settle(lastRevealEvent.board);
	},
	onNewGameStart: async () => {
		if ((stateBet.isTurbo && stateXstateDerived.isAutoBetting()) || stateBet.isSpaceHold) return;
		stateBet.winBookEventAmount = 0;
		// spin reels scroll through the padding strips; drop reels ignore them
		await stateGameDerived.enhancedBoard.preSpin({ paddingBoard: config.paddingReels[stateGame.gameType] });
	},
	onNewGameError: () => stateGameDerived.enhancedBoard.settle(),
	onPlayGame: async (bet) => {
		try {
			await playBet(bet);
		} catch (e) {
			// an event that throws must not leave the round hanging silently
			console.error('[shell] playing the book failed', e);
			throw e;
		}
	},
	// a bonus book keeps its round open until the last event (so a reload resumes it): free spins have several reveals,
	// hold and win has respins (each one is recorded as a resume point)
	checkIsBonusGame: (bet) =>
		checkIsMultipleRevealEvents({ bookEvents: bet.state }) || bet.state.some((bookEvent) => bookEvent.type === 'holdStart'),
});

const intermediateMachines = createIntermediateMachines(primaryMachines);

export const gameActor = createGameActor(intermediateMachines);
