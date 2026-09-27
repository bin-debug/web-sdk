<script lang="ts">
	import { Popup } from 'components-shared';
	import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
	import { stateBet, stateFreeSpins, stateModal } from 'state-shared';

	const allocation = $derived(stateFreeSpins.allocations[0]);
	const remainingSpins = $derived(allocation ? allocation.spinCount - allocation.spinsUsed : 0);
	const close = () => {
		stateFreeSpins.showAwardPopup = false;
		stateModal.modal = null;
	};
	const playNow = () => {
		if (!allocation) return;
		stateFreeSpins.activeAllocation = allocation;
		stateFreeSpins.currentSpin = allocation.spinsUsed;
		stateFreeSpins.totalWinnings = 0;
		stateBet.betAmount = allocation.spinValue / API_AMOUNT_MULTIPLIER;
		close();
	};
</script>

{#if stateModal.modal?.name === 'freeSpinAward' && allocation}
	<Popup zIndex={1000} onclose={close}>
		<section class="award" aria-labelledby="free-spins-title">
			<div class="award__icon" aria-hidden="true">
				<svg viewBox="0 0 48 48" fill="none"><path d="M24 5l4.3 10.7L40 17l-9 7.5L33.8 36 24 30l-9.8 6L17 24.5 8 17l11.7-1.3L24 5Z" /></svg>
			</div>
			<p class="award__eyebrow">{allocation.type === 'welcome_bonus' ? 'Welcome reward' : 'Bonus awarded'}</p>
			<h2 id="free-spins-title">{allocation.type === 'welcome_bonus' ? 'Welcome Bonus' : 'Free Spins Ready'}</h2>
			<p class="award__intro">Your spins are available at the current stake.</p>
			<div class="award__spins"><strong>{remainingSpins}</strong><span>free spins</span></div>
			<dl class="award__details">
				<div><dt>Stake per spin</dt><dd>{(allocation.spinValue / API_AMOUNT_MULTIPLIER).toFixed(2)}</dd></div>
				<div><dt>Wagering</dt><dd>{allocation.wageringMultiplier > 0 ? `${allocation.wageringMultiplier}×` : 'None'}</dd></div>
			</dl>
			<div class="award__actions">
				<button class="award__button award__button--primary" onclick={playNow}>Play now</button>
				<button class="award__button award__button--secondary" onclick={close}>Later</button>
			</div>
		</section>
	</Popup>
{/if}

<style lang="scss">
	/* Same look as the promo layer (black and gold). Sized from the viewport, everything inside in em. */
	.award {
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
	.award__icon {
		width: 3.4em;
		height: 3.4em;
		margin: 0 auto 0.9em;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #fff2b8, var(--accent) 55%, var(--accent-deep));
		box-shadow: 0 0 1.2em rgb(245 197 66 / 45%);
		animation: award-star-pop 2s ease-in-out infinite;
	}
	.award__icon svg { width: 55%; height: 55%; fill: #6b3d00; animation: award-star-twinkle 2s ease-in-out infinite; }
	.award__eyebrow { margin: 0; color: var(--accent); font-size: 0.75em; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }
	h2 { margin: 0.3em 0 0.35em; color: var(--text); font-size: 1.8em; line-height: 1.1; }
	.award__intro { margin: 0 auto; max-width: 20em; color: var(--muted); font-size: 0.95em; line-height: 1.4; }
	.award__spins { margin: 1.1em 0; display: flex; align-items: baseline; justify-content: center; gap: 0.35em; }
	.award__spins strong {
		color: var(--accent);
		font-size: 3.4em;
		font-weight: 900;
		font-variant-numeric: tabular-nums;
		line-height: 0.9;
		text-shadow: 0 2px 18px rgb(245 197 66 / 40%);
	}
	.award__spins span { color: var(--muted); font-size: 1em; font-weight: 700; }
	.award__details { margin: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5em; }
	.award__details div { padding: 0.65em 0.5em; border-radius: 0.6em; background: rgb(255 255 255 / 6%); }
	.award__details dt { color: var(--muted); font-size: 0.7em; letter-spacing: 0.04em; text-transform: uppercase; }
	.award__details dd { margin: 0.25em 0 0; color: var(--accent); font-size: 1.15em; font-weight: 800; font-variant-numeric: tabular-nums; }
	.award__actions { margin-top: 1.2em; display: grid; grid-template-columns: 1fr 1fr; gap: 0.6em; }
	.award__button {
		min-height: 2.9em;
		border: 1px solid transparent;
		border-radius: 0.75em;
		cursor: pointer;
		font: inherit;
		font-size: 1em;
		font-weight: 800;
		transition: transform 0.15s ease, filter 0.15s ease;
	}
	.award__button:hover { filter: brightness(1.08); transform: translateY(-1px); }
	.award__button--primary { background: var(--accent); color: #3d2300; }
	.award__button--secondary { border-color: rgb(245 197 66 / 55%); background: transparent; color: var(--accent); }
	@media (orientation: landscape) { .award { font-size: clamp(11px, 2.6vh, 18px); } }
	@keyframes award-star-pop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
	@keyframes award-star-twinkle { 0%, 100% { transform: rotate(-7deg) scale(0.94); } 50% { transform: rotate(7deg) scale(1.06); } }
	@media (prefers-reduced-motion: reduce) { .award__icon, .award__icon svg { animation: none; } }
</style>
