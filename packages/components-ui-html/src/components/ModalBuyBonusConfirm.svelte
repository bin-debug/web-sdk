<script lang="ts">
	import { Button, Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateBet, stateModal, stateUi, INFINITY_MARK } from 'state-shared';
	import { getContextEventEmitter } from 'utils-event-emitter';
	import { numberToCurrencyString } from 'utils-shared/amount';

	import BaseIcon from './BaseIcon.svelte';
	import BaseButtonContent from './BaseButtonContent.svelte';
	import { stateBonus, stateBonusDerived } from '../stateBonus.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
	import type { EmitterEventModal } from '../types';

	const { eventEmitter } = getContextEventEmitter<EmitterEventModal>();

	const confirm = () => {
		stateBet.activeBetModeKey = stateBonus.selectedBetModeKey;

		if (stateBonusDerived.selectedBetModeData().type === 'buy') {
			eventEmitter.broadcast({ type: 'bet' });
		}

		if (stateBonusDerived.selectedBetModeData().type === 'activate') {
			stateUi.autoSpinsLossLimitText = INFINITY_MARK;
			stateUi.autoSpinsSingleWinLimitText = INFINITY_MARK;
		}
	};

	const isBuy = $derived(stateBonusDerived.selectedBetModeData().type === 'buy');
	const totalCost = $derived(stateBet.betAmount * stateBonusDerived.selectedBetModeData().costMultiplier);
</script>

{#if stateModal.modal?.name === 'buyBonusConfirm'}
	<Popup zIndex={zIndex.dialog} onclose={() => (stateModal.modal = { name: 'buyBonus' })}>
		<div class="confirm-wrap">
			<div class="confirm-card">
				<div class="title" class:title--buy={isBuy} class:title--activate={!isBuy}>
					{stateBonusDerived.selectedBetModeData().text.title}
				</div>

				<div class="dialog-text">
					{stateBonusDerived.selectedBetModeData().text.dialog}
				</div>

				{#if isBuy}
					<div class="cost">
						{numberToCurrencyString(totalCost)}
					</div>
				{/if}

				<Button
					data-test="confirm-button"
					onclick={() => {
						confirm();
						eventEmitter.broadcast({ type: 'soundPressGeneral' });
						stateModal.modal = null;
					}}
				>
					<BaseIcon width="100%" height="5rem" />
					<BaseButtonContent>
						<div class="confirm-btn" class:confirm-btn--buy={isBuy} class:confirm-btn--activate={!isBuy}>
							{i18nDerived.confirm()}
						</div>
					</BaseButtonContent>
				</Button>
			</div>
		</div>
	</Popup>
{/if}

<style lang="scss">
	.confirm-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 1.5rem;
		box-sizing: border-box;
		position: relative;
		z-index: 10;
	}

	/* Same look as the promo layer (black and gold); games can restyle it with the --game-promo-* variables. */
	.confirm-card {
		--accent: var(--game-promo-accent, #f5c542);
		--accent-deep: var(--game-promo-accent-deep, #b7791f);
		--text: var(--game-promo-text, #fff8e6);
		--muted: var(--game-promo-muted, #d9cfb8);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		background: linear-gradient(180deg, #1d1a26, #121019);
		border: 1px solid rgb(245 197 66 / 55%);
		border-radius: 20px;
		padding: 2rem 1.75rem 1.75rem;
		width: 100%;
		max-width: 420px;
		box-shadow: 0 0 0 0.35rem rgb(245 197 66 / 10%), 0 1.2rem 3.5rem rgb(0 0 0 / 60%);
		color: var(--text);
		box-sizing: border-box;
	}

	.title {
		font-size: clamp(1.9rem, 7vw, 2.5rem);
		font-weight: 900;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 0.02em;
		line-height: 1.15;
		color: var(--text);

		&--buy {
			color: var(--accent);
			text-shadow: 0 2px 14px rgb(245 197 66 / 35%);
		}

		&--activate {
			color: #0a5753;
		}
	}

	.dialog-text {
		font-size: clamp(1.2rem, 4.5vw, 1.5rem);
		line-height: 1.55;
		text-align: center;
		color: var(--muted);
	}

	.cost {
		font-size: clamp(2rem, 7.5vw, 2.75rem);
		font-weight: 900;
		color: var(--accent);
		text-align: center;
		font-variant-numeric: tabular-nums;
		text-shadow: 0 2px 18px rgb(245 197 66 / 40%);
	}

	.confirm-btn {
		width: 100%;
		padding: 1.35rem 1rem;
		border-radius: 12px;
		font-size: clamp(1.4rem, 5.5vw, 1.75rem);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #3d2300;

		&--buy {
			background: linear-gradient(180deg, #ffe58a, var(--accent) 60%, var(--accent-deep));
			box-shadow: 0 0.4rem 1.2rem rgb(245 197 66 / 30%);
		}

		&--activate {
			color: #062b29;
			background: var(--bc-accent, #4ecdc4);
		}
	}
</style>
