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

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
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
</script>

<Button disabled={!stateBetDerived.isBetCostAvailable()} onclick={startAutoBet}>
	<BaseIcon width="100%" height="5rem" />
	<BaseButtonContent>
		<div class="start-btn">
			{i18nDerived.startAutoplay()}
		</div>
	</BaseButtonContent>
</Button>

<style lang="scss">
	.start-btn {
		width: 100%;
		padding: 1.35rem 1rem;
		border-radius: 12px;
		font-size: clamp(1.4rem, 5.5vw, 1.75rem);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #ffffff;
		background: var(--bc-secondary, #f5a524);
	}
</style>
