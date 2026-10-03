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
	/* Same look as the promo layer (black and gold). Sized from the viewport, everything inside in em. */
	.complete {
		--accent: var(--game-promo-accent, #f5c542);
		--accent-deep: var(--game-promo-accent-deep, #b7791f);
		--text: var(--game-promo-text, #fff8e6);
		--muted: var(--game-promo-muted, #d9cfb8);
		font-size: clamp(12px, 3.6vw, 18px);
		width: min(24em, calc(100vw - 32px));
		box-sizing: border-box;
		padding: 1.8em 1.6em 1.6em;
		border: 1px solid rgb(245 197 66 / 55%);
		border-radius: 1.1em;
		background: linear-gradient(180deg, #1d1a26, #121019);
		box-shadow: 0 0 0 0.35em rgb(245 197 66 / 10%), 0 1.2em 3.5em rgb(0 0 0 / 60%);
		color: var(--text);
		font-family: inherit;
		text-align: center;
	}
	.complete__eyebrow { margin: 0; color: var(--accent); font-size: 0.75em; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }
	h2 { margin: 0.3em 0 1em; color: var(--text); font-size: 1.8em; line-height: 1.1; }
	.complete__label { margin: 0; color: var(--muted); font-size: 0.8em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
	.complete__win {
		display: block;
		margin-top: 0.2em;
		color: var(--accent);
		font-size: 3.2em;
		font-weight: 900;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		text-shadow: 0 2px 18px rgb(245 197 66 / 40%);
	}
	.complete__note { margin: 1.1em auto; max-width: 20em; color: var(--muted); font-size: 0.95em; line-height: 1.45; }
	.complete__button {
		width: 100%;
		min-height: 2.9em;
		border: 0;
		border-radius: 0.75em;
		background: var(--accent);
		color: #3d2300;
		cursor: pointer;
		font: inherit;
		font-size: 1em;
		font-weight: 800;
	}
	.complete__button:hover { filter: brightness(1.08); }
	@media (orientation: landscape) { .complete { font-size: clamp(11px, 2.6vh, 18px); } }
</style>
