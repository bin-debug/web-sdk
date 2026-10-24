import { Tween } from 'svelte/motion';

import { stateBet, stateBetDerived, stateConfig, stateModal, stateUi } from 'state-shared';
import { i18nDerived } from 'components-ui-pixi';
import { numberToCurrencyString, bookEventAmountToCurrencyString } from 'utils-shared/amount';

import { getContext } from '../../game/context';

// Labels and actions shared by the phone and desktop HUDs; same behaviour as the stock UI buttons.
// Call from a component's script (it sets up tweens and effects).
export const createHud = () => {
	const context = getContext();
	const balanceTween = new Tween(stateBet.balanceAmount);
	const winTween = new Tween(stateBet.winBookEventAmount);
	$effect(() => {
		balanceTween.set(stateBet.balanceAmount);
	});
	$effect(() => {
		winTween.set(stateBet.winBookEventAmount);
	});

	const idle = () => context.stateXstateDerived.isIdle();
	const options = () => [...stateConfig.betAmountOptions].sort((a, b) => a - b);
	const press = () => context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

	return {
		balance: () => ({
			label: i18nDerived.balance(),
			value: numberToCurrencyString(balanceTween.current),
		}),
		win: () => ({
			label: i18nDerived.win(),
			value: bookEventAmountToCurrencyString(winTween.current),
		}),
		bet: () =>
			stateUi.freeSpinCounterShow
				? {
						label: i18nDerived.freeSpins(),
						value: `${stateUi.freeSpinCounterCurrent} / ${stateUi.freeSpinCounterTotal}`,
					}
				: {
						label: stateBetDerived.activeBetMode()?.text.betAmountLabel || i18nDerived.bet(),
						value: numberToCurrencyString(stateBetDerived.betCost()),
					},
		canDecrease: () => idle() && stateBet.betAmount > options()[0],
		canIncrease: () => idle() && stateBet.betAmount < options()[options().length - 1],
		decrease: () => {
			press();
			const next = [...options()].reverse().find((option) => option < stateBet.betAmount);
			stateBetDerived.setBetAmount(next ?? options()[0]);
		},
		increase: () => {
			press();
			const next = options().find((option) => option > stateBet.betAmount);
			stateBetDerived.setBetAmount(next ?? options()[options().length - 1]);
		},
		openBetMenu: () => {
			if (!idle()) return;
			press();
			stateModal.modal = { name: 'betAmountMenu' };
		},
		autoplayActive: () => stateBetDerived.hasAutoBetCounter(),
		autoplayDisabled: () =>
			stateBet.isSpaceHold ||
			(!idle() && !stateBetDerived.hasAutoBetCounter()) ||
			!stateBetDerived.isBetCostAvailable(),
		autoplay: () => {
			press();
			if (stateBetDerived.hasAutoBetCounter()) stateBet.autoSpinsCounter = 0;
			else stateModal.modal = { name: 'autoSpin' };
		},
		turboActive: () => stateBet.isTurbo,
		turbo: () => {
			press();
			stateBetDerived.updateIsTurbo(!stateBet.isTurbo, { persistent: true });
		},
		menu: () => {
			press();
			stateUi.menuOpen = true;
		},
	};
};
