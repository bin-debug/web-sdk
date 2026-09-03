<script lang="ts">
	import { Popup } from 'components-shared';
	import { stateBet, stateModal } from 'state-shared';

	const modal = $derived(stateModal.modal?.name === 'freeSpinComplete' ? stateModal.modal : null);
	const currencySymbol = $derived(
		({ ZAR: 'R', USD: '$', EUR: '€', GBP: '£', BRL: 'R$', INR: '₹', JPY: '¥' } as Record<string, string>)[
			stateBet.currency
		] ?? `${stateBet.currency} `,
	);
</script>

{#if modal}
	<Popup zIndex={1000} onclose={() => { stateModal.modal = null; }}>
		<section class="complete">
			<p class="complete__eyebrow">Feature complete</p>
			<h2>Free Spins Complete</h2>
			<p class="complete__label">Total win</p>
			<strong class="complete__win">{currencySymbol}{modal.totalWinnings.toFixed(2)}</strong>
			{#if modal.wageringTarget > 0}
				<p class="complete__note">Bet {modal.wageringTarget.toFixed(2)} with real money to unlock your winnings.</p>
			{:else}
				<p class="complete__note">Your free spins have finished.</p>
			{/if}
			<button class="complete__button" onclick={() => { stateModal.modal = null; }}>Continue</button>
		</section>
	</Popup>
{/if}

<style lang="scss">
	.complete { width: min(30rem, calc(100vw - 1.5rem)); box-sizing: border-box; padding: clamp(28px, 6vw, 48px); border: 1px solid #d7dce3; border-radius: clamp(16px, 3vw, 24px); background: #fff; box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 55%); color: #111827; text-align: center; }
	.complete__eyebrow { margin: 0; color: #526070; font-size: clamp(11px, 2.9vw, 13px); font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
	h2 { margin: .5rem 0 1.5rem; font-size: clamp(27px, 7.2vw, 37px); line-height: 1.1; }
	.complete__label { margin: 0; color: #526070; font-size: clamp(14px, 3.7vw, 17px); font-weight: 700; text-transform: uppercase; }
	.complete__win { display: block; margin-top: .35rem; font-size: clamp(48px, 13vw, 62px); font-variant-numeric: tabular-nums; line-height: 1; }
	.complete__note { margin: 1.5rem auto; max-width: 22rem; color: #526070; font-size: clamp(15px, 4vw, 18px); line-height: 1.45; }
	.complete__button { width: 100%; min-height: clamp(50px, 13vw, 56px); border: 0; border-radius: .75rem; background: #111827; color: #fff; cursor: pointer; font: inherit; font-size: clamp(16px, 4vw, 18px); font-weight: 800; }
	.complete__button:hover { filter: brightness(1.15); }
</style>
