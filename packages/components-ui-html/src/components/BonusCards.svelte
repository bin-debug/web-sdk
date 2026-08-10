<script lang="ts">
	import { stateBet, stateModal, type BetModeData } from 'state-shared';
	import { Button } from 'components-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BonusCard from './BonusCard.svelte';
	import { stateBonus } from '../stateBonus.svelte';
	import type { EmitterEventModal } from '../types';

	type Props = {
		list: BetModeData[];
	};

	const props: Props = $props();
	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();
</script>

{#each props.list as betModeData}
	{#if betModeData.type !== 'default'}
		<BonusCard>
			{#snippet icon()}
				{#if betModeData?.assets?.icon}
					<img class="icon-img" src={betModeData.assets.icon} alt={betModeData.text.title} />
				{/if}
			{/snippet}

			{#snippet title()}
				<div class="title">
					{betModeData.text.title}
				</div>
			{/snippet}

			{#snippet description()}
				{#if betModeData?.text?.description}
					<div class="description">
						{betModeData.text.description}
					</div>
				{/if}
			{/snippet}

			{#snippet volatility()}
				{#if betModeData?.assets?.volatility}
					<img
						class="volatility-img"
						src={betModeData.assets.volatility}
						alt="volatility"
					/>
				{/if}
			{/snippet}

			{#snippet price()}
				<div class="price">
					{`${numberToCurrencyString(stateBet.betAmount * betModeData.costMultiplier)}`}
				</div>
			{/snippet}

			{#snippet button()}
				<Button
					onclick={() => {
						stateBonus.selectedBetModeKey = betModeData.mode;
						eventEmitter.broadcast({ type: 'buyBonusConfirm' });
						eventEmitter.broadcast({ type: 'soundPressGeneral' });
					}}
					disabled={stateBet.betAmount <= 0 ||
						stateBet.balanceAmount < stateBet.betAmount * betModeData.costMultiplier}
				>
					<div class="buy-button" class:activate={betModeData.type === 'activate'}>
						{betModeData.text.button}
					</div>
				</Button>
			{/snippet}
		</BonusCard>
	{/if}
{/each}

<style lang="scss">
	.icon-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.title {
		font-size: clamp(1.2rem, 5vw, 1.55rem);
		font-weight: 700;
		line-height: 1.25;
		text-align: center;
		text-transform: uppercase;
	}

	.description {
		font-size: clamp(1.2rem, 5vw, 1.5rem);
		line-height: 1.4;
		text-align: center;
		min-height: 5rem;
		white-space: pre-line;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--bc-card-text, #14141a);
		opacity: 0.92;
	}

	.description:empty {
		display: none;
	}

	.volatility-img {
		height: 1rem;
		object-fit: contain;
		align-self: center;
	}

	.price {
		font-size: clamp(1.4rem, 5.5vw, 1.75rem);
		font-weight: 700;
		line-height: 1.3;
		text-align: center;
		white-space: nowrap;
	}

	.buy-button {
		width: 100%;
		padding: 1.1rem 0.5rem;
		border-radius: 10px;
		font-size: clamp(1.15rem, 4.5vw, 1.35rem);
		font-weight: 700;
		text-transform: uppercase;
		color: #ffffff;
		background: var(--bc-secondary, #f5a524);

		&.activate {
			background: var(--bc-accent, #4ecdc4);
		}
	}
</style>
