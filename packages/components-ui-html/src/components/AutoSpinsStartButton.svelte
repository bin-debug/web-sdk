<script lang="ts">
	import { Button } from 'components-shared';
	import {
		stateUi,
		stateBet,
		stateModal,
		stateBetDerived,
		AUTO_SPINS_TEXT_OPTION_MAP,
		AUTO_SPINS_LOSS_LIMIT_MULTIPLIER_MAP,
		AUTO_SPINS_SINGLE_WIN_LIMIT_MULTIPLIER_MAP,
	} from 'state-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { i18nDerived } from '../i18n/i18nDerived';
	import type { EmitterEventModal } from '../types';

	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

	const startAutoBet = () => {
		stateBet.autoSpinsCounter = AUTO_SPINS_TEXT_OPTION_MAP[stateUi.autoSpinsText];
		stateBet.autoSpinsLossLimitAmount = stateBet.betAmount * AUTO_SPINS_LOSS_LIMIT_MULTIPLIER_MAP[stateUi.autoSpinsLossLimitText]; // prettier-ignore
		stateBet.autoSpinsSingleWinLimitAmount = stateBet.betAmount * AUTO_SPINS_SINGLE_WIN_LIMIT_MULTIPLIER_MAP[stateUi.autoSpinsSingleWinLimitText]; // prettier-ignore
		if (stateBetDerived.activeBetMode().type === 'buy') stateBet.activeBetModeKey = 'BASE';
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
		eventEmitter.broadcast({ type: 'autoBet' });
		stateModal.modal = null;
	};

	const canStart = $derived(stateBetDerived.isBetCostAvailable());
</script>

<button
	class="start-btn"
	class:disabled={!canStart}
	disabled={!canStart}
	onclick={startAutoBet}
>
	{i18nDerived.startAutoplay()}
</button>

<style lang="scss">
	.start-btn {
		width: 100%;
		padding: 1.4rem 1rem;
		border-radius: 14px;
		font-family: 'proxima-nova', sans-serif;
		font-size: clamp(1.5rem, 5.5vw, 1.85rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #ffffff;
		background: var(--bc-secondary, #f5a524);
		border: none;
		cursor: pointer;
		box-shadow: 0 4px 16px rgba(245, 165, 36, 0.4);
		transition: opacity 0.12s;

		&.disabled {
			opacity: 0.45;
			cursor: not-allowed;
		}
	}
</style>
