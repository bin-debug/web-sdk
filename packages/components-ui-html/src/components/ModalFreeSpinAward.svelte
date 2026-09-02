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
	<Popup zIndex={10} onclose={close}>
		<section class="award" aria-labelledby="free-spins-title">
			<div class="award__icon" aria-hidden="true">
				<svg viewBox="0 0 48 48" fill="none"><path d="M24 5l4.3 10.7L40 17l-9 7.5L33.8 36 24 30l-9.8 6L17 24.5 8 17l11.7-1.3L24 5Z" /></svg>
			</div>
			<p class="award__eyebrow">{allocation.type === 'welcome_bonus' ? 'Welcome reward' : 'Bonus awarded'}</p>
			<h2 id="free-spins-title">Free Spins Ready</h2>
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
	.award {
		--award-accent: #111827; --award-accent-strong: #111827; --award-surface: #ffffff; --award-text: #111827; --award-muted: #526070;
		width: min(30rem, calc(100vw - 1.5rem)); box-sizing: border-box; padding: clamp(1.25rem, 5vw, 2.75rem); border: 1px solid #d7dce3; border-radius: clamp(1rem, 3vw, 1.5rem);
		background: #ffffff; box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 55%); color: var(--award-text); font-family: inherit; text-align: center;
	}
	.award__icon { width: clamp(2.8rem, 12vw, 3.7rem); height: clamp(2.8rem, 12vw, 3.7rem); margin: 0 auto 1rem; display: grid; place-items: center; border: 1px solid #efc55c; border-radius: 50%; background: radial-gradient(circle, #fff7ce, #f4c84c); box-shadow: 0 0 .8rem rgb(232 179 33 / 45%); animation: award-star-pop 2s ease-in-out infinite; }
	.award__icon svg { width: 58%; height: 58%; fill: #d68a08; stroke: #8d5100; stroke-width: 1.5; animation: award-star-twinkle 2s ease-in-out infinite; }
	.award__eyebrow { margin: 0; color: #354152; font-size: clamp(.65rem, 2.7vw, .75rem); font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
	h2 { margin: .45rem 0 .5rem; color: var(--award-text); font-size: clamp(1.55rem, 6vw, 2.25rem); line-height: 1.1; }
	.award__intro { margin: 0 auto; max-width: 22rem; color: var(--award-muted); font-size: clamp(.88rem, 3.5vw, 1rem); line-height: 1.45; }
	.award__spins { margin: 1.5rem 0; display: flex; align-items: baseline; justify-content: center; gap: .45rem; }
	.award__spins strong { color: var(--award-accent-strong); font-size: clamp(2.5rem, 12vw, 3.7rem); font-variant-numeric: tabular-nums; line-height: .9; }
	.award__spins span { color: var(--award-muted); font-size: clamp(.9rem, 3.5vw, 1rem); font-weight: 700; }
	.award__details { margin: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; }
	.award__details div { padding: .8rem .65rem; border: 1px solid #dce2e8; border-radius: .8rem; background: #f8fafc; }
	.award__details dt { color: var(--award-muted); font-size: .68rem; letter-spacing: .04em; text-transform: uppercase; }
	.award__details dd { margin: .3rem 0 0; color: var(--award-text); font-size: 1rem; font-weight: 700; }
	.award__actions { margin-top: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; }
	.award__button { min-height: clamp(2.8rem, 12vw, 3.25rem); border: 1px solid transparent; border-radius: .75rem; cursor: pointer; font: inherit; font-size: clamp(.9rem, 3.5vw, 1rem); font-weight: 800; transition: transform .15s ease, filter .15s ease; }
	.award__button:hover { filter: brightness(1.08); transform: translateY(-1px); }
	.award__button--primary { background: #111827; color: #ffffff; }
	.award__button--secondary { border-color: #bfc8d2; background: #ffffff; color: #111827; }
	@keyframes award-star-pop { 0%, 100% { transform: scale(1); box-shadow: 0 0 .8rem rgb(232 179 33 / 45%); } 50% { transform: scale(1.12); box-shadow: 0 0 1.4rem rgb(232 179 33 / 70%); } }
	@keyframes award-star-twinkle { 0%, 100% { transform: rotate(-7deg) scale(.94); } 50% { transform: rotate(7deg) scale(1.08); } }
	@media (max-width: 500px) {
		.award { width: min(31rem, calc(100vw - 1.25rem)); padding: 2.15rem 1.6rem; }
		.award__eyebrow { font-size: .88rem; }
		h2 { font-size: 2.35rem; }
		.award__intro { font-size: 1.1rem; }
		.award__spins strong { font-size: 4.25rem; }
		.award__spins span { font-size: 1.15rem; }
		.award__details dt { font-size: .78rem; }
		.award__details dd { font-size: 1.2rem; }
		.award__button { font-size: 1.1rem; min-height: 3.4rem; }
	}
	@media (max-width: 360px) { .award { padding: 1.5rem 1.1rem; border-radius: 1.15rem; } .award__actions { gap: .5rem; } }
	@media (prefers-reduced-motion: reduce) { .award__icon, .award__icon svg { animation: none; } }
</style>
