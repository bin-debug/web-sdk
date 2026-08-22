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
			{#snippet title()}
				<div class="title" class:title--buy={betModeData.type === 'buy'} class:title--activate={betModeData.type === 'activate'}>
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

			{#snippet price()}
				<div class="price">
					{`${numberToCurrencyString(stateBet.betAmount * betModeData.costMultiplier)}`}
				</div>
				<div class="stake-note">
					Wins based on your <strong>{numberToCurrencyString(stateBet.betAmount)}</strong> stake
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
	.title {
		font-size: clamp(1.6rem, 6vw, 2.1rem);
		font-weight: 900;
		line-height: 1.15;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: #0d0d0d;
	}

	.description {
		font-size: clamp(1.15rem, 4.5vw, 1.45rem);
		line-height: 1.45;
		text-align: center;
		white-space: pre-line;
		color: #14141a;
		opacity: 0.65;
	}

	.description:empty {
		display: none;
	}

	.price {
		font-size: clamp(1.75rem, 6.5vw, 2.25rem);
		font-weight: 800;
		line-height: 1.2;
		text-align: center;
		white-space: nowrap;
		color: #0d0d0d;
	}

	.stake-note {
		font-size: clamp(1rem, 3.5vw, 1.25rem);
		text-align: center;
		color: #14141a;
		opacity: 0.55;
		line-height: 1.35;
	}

	.stake-note strong {
		opacity: 1;
		font-weight: 700;
	}

	.buy-button {
		width: 100%;
		padding: 1.35rem 0.5rem;
		border-radius: 10px;
		font-size: clamp(1.3rem, 5.5vw, 1.6rem);
		font-weight: 700;
		text-transform: uppercase;
		color: #ffffff;
		background: var(--bc-secondary, #f5a524);

		&.activate {
			background: var(--bc-accent, #4ecdc4);
		}
	}
</style>
