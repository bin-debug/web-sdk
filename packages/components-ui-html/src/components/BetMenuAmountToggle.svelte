<script lang="ts">
	import { stateBet, stateConfig } from 'state-shared';
	import { Button, OptionsToggle } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
	import type { EmitterEventModal } from '../types';

	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

	const iconSize = '3.25rem';
</script>

<OptionsToggle
	value={stateBet.betAmount}
	options={stateConfig.betAmountOptions}
	onchange={(value) => {
		stateBet.betAmount = value;
		eventEmitter.broadcast({ type: 'soundPressGeneral' });
	}}
>
	{#snippet children({ disabledDown, disabledUp, toggleDown, toggleUp })}
		<div class="toggle-wrap">
			<Button data-test="down-button" disabled={disabledDown} onclick={toggleDown}>
				<BaseIcon width={iconSize} height={iconSize} />
				<BaseButtonContent>
					<span style="font-size: 2.25rem;">-</span>
				</BaseButtonContent>
			</Button>

			<span class="amount">{numberToCurrencyString(stateBet.betAmount)}</span>

			<Button data-test="up-button" disabled={disabledUp} onclick={toggleUp}>
				<BaseIcon width={iconSize} height={iconSize} />
				<BaseButtonContent>
					<span style="font-size: 2.25rem;">+</span>
				</BaseButtonContent>
			</Button>
		</div>
	{/snippet}
</OptionsToggle>

<style lang="scss">
	.toggle-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 1rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.amount {
		font-size: 1.4rem;
		font-weight: 700;
		min-width: 5.5rem;
		text-align: center;
	}
</style>
