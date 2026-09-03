<script lang="ts">
	import { stateBet, stateConfig } from 'state-shared';
	import { Button, OptionsToggle } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
	import type { EmitterEventModal } from '../types';

	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

	const iconSize = 'clamp(4.5rem, 13vw, 5.5rem)';
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
					<span class="toggle-symbol">−</span>
				</BaseButtonContent>
			</Button>

			<span class="amount">{numberToCurrencyString(stateBet.betAmount)}</span>

			<Button data-test="up-button" disabled={disabledUp} onclick={toggleUp}>
				<BaseIcon width={iconSize} height={iconSize} />
				<BaseButtonContent>
					<span class="toggle-symbol">+</span>
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
		gap: 0.4rem;
		padding: 0.4rem 0.6rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.45);
		border: 2px solid rgba(255, 255, 255, 0.25);
	}

	.amount {
		font-size: clamp(1.65rem, 6.7vw, 2.25rem);
		font-weight: 800;
		min-width: 7.2rem;
		text-align: center;
		letter-spacing: 0.01em;
	}

	.toggle-symbol {
		font-size: clamp(2.45rem, 10vw, 3.3rem);
		font-weight: 500;
		line-height: 1;
	}
</style>
