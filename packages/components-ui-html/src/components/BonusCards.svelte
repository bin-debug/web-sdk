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
				<div class="price-panel">
					<span class="price-label">Feature price</span>
					<div class="price">
						{`${numberToCurrencyString(stateBet.betAmount * betModeData.costMultiplier)}`}
					</div>
					<span class="multiplier">{betModeData.costMultiplier}× selected stake</span>
				</div>
				<div class="stake-note">
					Feature wins use your <strong>{numberToCurrencyString(stateBet.betAmount)}</strong> stake
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
		font-size: clamp(1.45rem, 4vw, 2.35rem);
		font-weight: 900;
		line-height: 1.15;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 0.035em;
		color: var(--bonus-text, #0d0d0d);
	}

	.description {
		font-size: clamp(1.05rem, 2.9vw, 1.35rem);
		line-height: 1.5;
		text-align: center;
		white-space: pre-line;
		font-weight: 600;
		color: var(--bonus-supporting-text, #353942);
	}

	.description:empty {
		display: none;
	}

	.price {
		font-size: clamp(1.8rem, 5vw, 2.7rem);
		font-weight: 800;
		line-height: 1.2;
		text-align: center;
		white-space: nowrap;
		color: #0d0d0d;
	}

	.price-panel {
		display: grid;
		gap: 0.18rem;
		padding: 0.85rem 1rem;
		border-radius: 0.9rem;
		background: var(--bonus-price-surface, rgba(13, 13, 13, 0.055));
		border: 1px solid var(--bonus-price-border, rgba(13, 13, 13, 0.08));
	}

	.price-label,
	.multiplier {
		font-size: clamp(0.78rem, 2.4vw, 0.95rem);
		font-weight: 800;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--bonus-label-text, #3d424b);
	}

	.stake-note {
		font-size: clamp(1.05rem, 3.7vw, 1.3rem);
		text-align: center;
		font-weight: 600;
		color: var(--bonus-supporting-text, #353942);
		line-height: 1.35;
	}

	.stake-note strong {
		opacity: 1;
		font-weight: 700;
	}

	.buy-button {
		width: 100%;
		padding: 1.15rem 0.75rem;
		border-radius: 0.8rem;
		font-size: clamp(1.1rem, 3.6vw, 1.45rem);
		font-weight: 800;
		letter-spacing: 0.025em;
		text-transform: uppercase;
		color: #ffffff;
		background: var(--bonus-cta, var(--bc-secondary, #f5a524));
		box-shadow: 0 0.4rem 1rem var(--bonus-cta-shadow, rgba(0, 0, 0, 0.2));

		&.activate {
			background: var(--bc-accent, #4ecdc4);
		}
	}

	/* The buy dialog is often viewed in a browser chrome-constrained phone viewport.
	 * Use a stronger type scale there rather than allowing desktop interpolation to
	 * make the purchase information feel secondary. */
	@media (max-width: 480px) {
		.title {
			font-size: clamp(2.05rem, 8.5vw, 2.6rem);
			line-height: 1.08;
		}

		.description {
			font-size: clamp(1.8rem, 7.4vw, 2.15rem);
			line-height: 1.38;
		}

		.price {
			font-size: clamp(2.5rem, 10.5vw, 3.25rem);
		}

		.price-label,
		.multiplier {
			font-size: clamp(1.35rem, 5.6vw, 1.6rem);
		}

		.stake-note {
			font-size: clamp(1.7rem, 7vw, 2rem);
		}

		.buy-button {
			font-size: clamp(1.4rem, 5.8vw, 1.7rem);
			padding: 1.35rem 0.9rem;
		}
	}
</style>
