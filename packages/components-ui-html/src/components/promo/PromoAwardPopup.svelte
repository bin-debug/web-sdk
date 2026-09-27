<script lang="ts">
	import { promoActions, statePromoDerived } from 'state-shared';

	import { money } from './promoFormat';

	// Shown after the game's own win presentation; separate from game wins. Never blocks play.
	const AUTO_DISMISS_MS = 5_000;
	const award = $derived(statePromoDerived.current());

	const line = $derived.by(() => {
		if (!award) return '';
		if (award.type === 'prize_drop') return `${award.label} prize`;
		return award.label;
	});

	$effect(() => {
		if (!award) return;
		const id = setTimeout(() => promoActions.dismissCurrent(), AUTO_DISMISS_MS);
		return () => clearTimeout(id);
	});
</script>

{#if award}
	{#key award}
		<div class="promo-drop" role="status" aria-live="polite">
			<button class="promo-drop__card" onclick={() => promoActions.dismissCurrent()} aria-label="Dismiss reward">
				<span class="promo-drop__ribbon">{award.title || 'Promo reward'}</span>
				<span class="promo-drop__label">{line}</span>
				<span class="promo-drop__amount">{money(award.amount)}</span>
				<span class="promo-drop__note">
					{award.display === 'result' ? 'Leaderboard prize · credited to your balance' : 'Promo reward · added to your balance'}
				</span>
			</button>
		</div>
	{/key}
{/if}

<style lang="scss">
	.promo-drop {
		font-size: clamp(12px, 3.6vw, 24px);
		position: fixed;
		inset: 0;
		z-index: 1100;
		display: grid;
		place-items: start center;
		padding-top: 18vh;
		pointer-events: none;
	}
	.promo-drop__card {
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4em;
		min-width: min(18em, calc(100vw - 32px));
		max-width: calc(100vw - 32px);
		box-sizing: border-box;
		padding: 0 1.8em 1.3em;
		border: 2px solid var(--promo-accent);
		border-radius: 1.1em;
		background: linear-gradient(180deg, #2a1f05, #120d02);
		color: var(--promo-text);
		font-family: inherit;
		font-size: 1em;
		box-shadow: 0 0 0 0.4em rgb(245 197 66 / 18%), 0 1.1em 3em rgb(0 0 0 / 60%);
		cursor: pointer;
		animation: promo-pop 0.45s cubic-bezier(0.2, 1.4, 0.4, 1) both;
	}
	.promo-drop__ribbon {
		max-width: 100%;
		margin-top: -0.9em;
		padding: 0.4em 1.2em;
		overflow: hidden;
		border-radius: 999px;
		background: linear-gradient(180deg, #ffe58a, var(--promo-accent) 60%, var(--promo-accent-deep));
		color: #3d2300;
		font-size: 0.85em;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-overflow: ellipsis;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.promo-drop__label {
		margin-top: 0.5em;
		color: var(--promo-muted);
		font-size: 0.9em;
		font-weight: 700;
	}
	.promo-drop__amount {
		color: var(--promo-accent);
		font-size: 2.6em;
		font-weight: 900;
		line-height: 1.1;
		font-variant-numeric: tabular-nums;
		text-shadow: 0 2px 18px rgb(245 197 66 / 45%);
	}
	.promo-drop__note {
		color: var(--promo-muted);
		font-size: 0.75em;
	}
	@media (orientation: landscape) {
		.promo-drop { font-size: clamp(12px, 2.9vh, 30px); padding-top: 14vh; }
	}
	@keyframes promo-pop {
		from { opacity: 0; transform: scale(0.6) translateY(20px); }
		to { opacity: 1; transform: none; }
	}
	@media (prefers-reduced-motion: reduce) {
		.promo-drop__card { animation: none; }
	}
</style>
