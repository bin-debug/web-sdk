<script lang="ts">
	import { onMount } from 'svelte';

	import { requestActivePromos } from 'rgs-requests';
	import { statePromo, statePromoDerived, promoActions, stateUrlDerived, stateModal } from 'state-shared';
	import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
	import { numberToCurrencyString } from 'utils-shared/amount';

	// Operator promos (prize drops). Shown for every game from the shared Modals layer.
	// Promo rewards are always presented separately from — and after — the game's own win.

	const POLL_MS = 15_000;
	const AUTO_DISMISS_MS = 5_000;

	let now = $state(Date.now());
	const banner = $derived(statePromoDerived.banner());
	// Step aside for full-screen game UI, like the game's own ticker does.
	const hideBanner = $derived(stateModal.modal?.name === 'buyBonus');
	const award = $derived(statePromoDerived.current());

	const money = (micro: number) => numberToCurrencyString(micro / API_AMOUNT_MULTIPLIER);

	const countdown = (targetIso: string) => {
		const ms = Math.max(0, new Date(targetIso).getTime() - now);
		const s = Math.floor(ms / 1000);
		const h = Math.floor(s / 3600);
		const m = Math.floor((s % 3600) / 60);
		const sec = s % 60;
		const pad = (n: number) => String(n).padStart(2, '0');
		return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
	};

	const timing = $derived.by(() => {
		if (!banner) return null;
		const start = new Date(banner.windowStart).getTime();
		if (now < start) return { label: 'Drops start in', value: countdown(banner.windowStart) };
		return { label: 'Ends in', value: countdown(banner.windowEnd) };
	});

	const refresh = async () => {
		if (stateUrlDerived.replay()) return;
		try {
			const data = await requestActivePromos({
				rgsUrl: stateUrlDerived.rgsUrl(),
				sessionID: stateUrlDerived.sessionID(),
				operatorId: stateUrlDerived.operatorId(),
				brandId: stateUrlDerived.brandId(),
			});
			if (data) promoActions.setActive(data.active);
		} catch {
			// Banner data is cosmetic — never interrupt play.
		}
	};

	onMount(() => {
		const tick = setInterval(() => (now = Date.now()), 1000);
		const poll = setInterval(() => {
			if (statePromo.active.length > 0) refresh();
		}, POLL_MS);
		return () => {
			clearInterval(tick);
			clearInterval(poll);
		};
	});

	// Auto-dismiss each reward after a few seconds; tapping dismisses immediately.
	$effect(() => {
		if (!award) return;
		const id = setTimeout(() => promoActions.dismissCurrent(), AUTO_DISMISS_MS);
		return () => clearTimeout(id);
	});
</script>

{#if banner && !hideBanner}
	<button
		class="promo-banner"
		class:promo-banner--live={banner.phase === 'live'}
		onclick={() => (statePromo.infoOpen = true)}
		aria-label={`${banner.title}: pot ${money(banner.pot)}. Tap for details`}
	>
		<span class="promo-banner__badge" aria-hidden="true">
			<svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.3L21 9l-5 4.4L17.5 20 12 16.6 6.5 20 8 13.4 3 9l6.4-.7L12 2Z" /></svg>
		</span>
		<span class="promo-banner__text">
			<span class="promo-banner__title">{banner.title}</span>
			<span class="promo-banner__pot">{money(banner.pot)}</span>
		</span>
		{#if timing}
			<span class="promo-banner__meta">
				<span>{timing.label} <strong>{timing.value}</strong></span>
				<span>{banner.prizesRemaining}/{banner.prizesTotal} prizes left</span>
			</span>
		{/if}
	</button>
{/if}

{#if award}
	{#key award}
		<div class="promo-drop" role="status" aria-live="polite">
			<button class="promo-drop__card" onclick={() => promoActions.dismissCurrent()} aria-label="Dismiss prize">
				<span class="promo-drop__ribbon">{award.title || 'Prize Drop'}</span>
				<span class="promo-drop__label">{award.label} prize</span>
				<span class="promo-drop__amount">{money(award.amount)}</span>
				<span class="promo-drop__note">Promo reward · added to your balance</span>
			</button>
		</div>
	{/key}
{/if}

{#if statePromo.infoOpen && banner}
	<div class="promo-info" role="dialog" aria-modal="true" aria-labelledby="promo-info-title">
		<button class="promo-info__backdrop" aria-label="Close" onclick={() => (statePromo.infoOpen = false)}></button>
		<section class="promo-info__sheet">
			<p class="promo-info__eyebrow">Promotion</p>
			<h2 id="promo-info-title">{banner.title}</h2>
			{#if banner.subtitle}<p class="promo-info__subtitle">{banner.subtitle}</p>{/if}
			<dl class="promo-info__stats">
				<div><dt>Prize pot</dt><dd>{money(banner.pot)}</dd></div>
				<div><dt>Prizes left</dt><dd>{banner.prizesRemaining} of {banner.prizesTotal}</dd></div>
				{#if timing}<div><dt>{timing.label}</dt><dd>{timing.value}</dd></div>{/if}
			</dl>
			{#if banner.termsText}<p class="promo-info__terms">{banner.termsText}</p>{/if}
			<p class="promo-info__fine">Prizes are operator rewards paid separately from game wins. Game rules and RTP are unchanged.</p>
			<button class="promo-info__close" onclick={() => (statePromo.infoOpen = false)}>Got it</button>
		</section>
	</div>
{/if}

<style lang="scss">
	/*
	 * Responsive sizing: every promo element sets one font-size from the viewport
	 * (portrait → width, landscape → height) and sizes everything inside in em, so it
	 * scales with the game on any phone, tablet or desktop. No rem — games set the root
	 * font-size to 50% on small screens.
	 */
	.promo-banner,
	.promo-drop,
	.promo-info {
		--promo-accent: var(--game-promo-accent, #f5c542);
		--promo-accent-deep: var(--game-promo-accent-deep, #b7791f);
		--promo-surface: var(--game-promo-surface, rgb(14 16 28 / 86%));
		--promo-text: var(--game-promo-text, #fff8e6);
		--promo-muted: var(--game-promo-muted, #d9cfb8);
		--promo-top: calc(env(safe-area-inset-top, 0px) + clamp(26px, 4.2vh, 44px));
		font-family: inherit;
	}

	/* Game layouts wrap everything in .intro-active while the splash / tap-to-play screen shows. */
	:global(.intro-active) .promo-banner {
		display: none;
	}

	/* ── Banner ─────────────────────────────────────────────── */
	.promo-banner {
		font-size: clamp(11px, 3.1vw, 22px);
		position: fixed;
		top: var(--promo-top);
		left: 50%;
		transform: translateX(-50%);
		z-index: 900;
		display: flex;
		align-items: center;
		gap: 0.7em;
		max-width: calc(100vw - 24px);
		box-sizing: border-box;
		padding: 0.42em 1em 0.42em 0.42em;
		border: 1px solid rgb(245 197 66 / 55%);
		border-radius: 999px;
		background: var(--promo-surface);
		color: var(--promo-text);
		box-shadow: 0 0.45em 1.5em rgb(0 0 0 / 40%);
		backdrop-filter: blur(6px);
		cursor: pointer;
		line-height: 1.15;
		white-space: nowrap;
	}
	.promo-banner--live {
		animation: promo-glow 2.4s ease-in-out infinite;
	}
	.promo-banner__badge {
		flex: none;
		display: grid;
		place-items: center;
		width: 2.4em;
		height: 2.4em;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, #fff2b8, var(--promo-accent) 55%, var(--promo-accent-deep));
	}
	.promo-banner__badge svg {
		width: 1.35em;
		height: 1.35em;
		fill: #6b3d00;
	}
	.promo-banner__text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}
	.promo-banner__title {
		color: var(--promo-muted);
		font-size: 0.75em;
		font-weight: 800;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.promo-banner__pot {
		color: var(--promo-accent);
		font-size: 1.3em;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}
	.promo-banner__meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-left: 0.75em;
		border-left: 1px solid rgb(255 255 255 / 15%);
		color: var(--promo-muted);
		font-size: 0.85em;
		font-variant-numeric: tabular-nums;
	}
	.promo-banner__meta strong {
		color: var(--promo-text);
	}

	/* ── Prize pop-up ───────────────────────────────────────── */
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
		font-size: 1em;
		box-shadow: 0 0 0 0.4em rgb(245 197 66 / 18%), 0 1.1em 3em rgb(0 0 0 / 60%);
		cursor: pointer;
		animation: promo-pop 0.45s cubic-bezier(0.2, 1.4, 0.4, 1) both;
	}
	.promo-drop__ribbon {
		margin-top: -0.9em;
		padding: 0.4em 1.2em;
		border-radius: 999px;
		background: linear-gradient(180deg, #ffe58a, var(--promo-accent) 60%, var(--promo-accent-deep));
		color: #3d2300;
		font-size: 0.85em;
		font-weight: 900;
		letter-spacing: 0.12em;
		text-transform: uppercase;
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

	/* ── Info sheet ─────────────────────────────────────────── */
	.promo-info {
		font-size: clamp(12px, 3.6vw, 17px);
		position: fixed;
		inset: 0;
		z-index: 1200;
		display: grid;
		place-items: center;
		padding: 16px;
	}
	.promo-info__backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		background: rgb(0 0 0 / 60%);
		cursor: pointer;
	}
	.promo-info__sheet {
		position: relative;
		width: min(26em, 100%);
		max-height: calc(100vh - 32px);
		overflow-y: auto;
		box-sizing: border-box;
		padding: 1.5em;
		border: 1px solid rgb(245 197 66 / 45%);
		border-radius: 1.1em;
		background: #15131c;
		color: var(--promo-text);
		text-align: center;
	}
	.promo-info__eyebrow {
		margin: 0;
		color: var(--promo-accent);
		font-size: 0.75em;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.promo-info h2 {
		margin: 0.25em 0;
		font-size: 1.6em;
	}
	.promo-info__subtitle {
		margin: 0 0 0.9em;
		color: var(--promo-muted);
		font-size: 0.95em;
	}
	.promo-info__stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(6.5em, 1fr));
		gap: 0.5em;
		margin: 0 0 0.9em;
	}
	.promo-info__stats div {
		padding: 0.6em;
		border-radius: 0.6em;
		background: rgb(255 255 255 / 6%);
	}
	.promo-info__stats dt {
		color: var(--promo-muted);
		font-size: 0.7em;
		text-transform: uppercase;
	}
	.promo-info__stats dd {
		margin: 0.25em 0 0;
		color: var(--promo-accent);
		font-size: 1.1em;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}
	.promo-info__terms,
	.promo-info__fine {
		margin: 0 0 0.6em;
		color: var(--promo-muted);
		font-size: 0.8em;
		line-height: 1.45;
	}
	.promo-info__fine {
		font-size: 0.7em;
		opacity: 0.8;
	}
	.promo-info__close {
		width: 100%;
		min-height: 2.8em;
		margin-top: 0.4em;
		border: 0;
		border-radius: 0.75em;
		background: var(--promo-accent);
		color: #3d2300;
		font: inherit;
		font-size: 1em;
		font-weight: 800;
		cursor: pointer;
	}

	/* ── Landscape / desktop: size from height, board fills the height ── */
	@media (orientation: landscape) {
		.promo-banner { font-size: clamp(11px, 2.3vh, 26px); }
		.promo-drop { font-size: clamp(12px, 2.9vh, 30px); padding-top: 14vh; }
		.promo-info { font-size: clamp(11px, 2.4vh, 22px); }
	}
	/* Wide layouts: sit in the free space top-right instead of over the reels. */
	@media (min-aspect-ratio: 4/3) {
		.promo-banner {
			right: calc(env(safe-area-inset-right, 0px) + 16px);
			left: auto;
			transform: none;
			max-width: calc(50vw - 16px);
		}
	}
	/* Very narrow screens: drop the divider meta into a tighter layout. */
	@media (max-width: 340px) {
		.promo-banner__meta { padding-left: 0.5em; }
	}

	@keyframes promo-glow {
		0%, 100% { box-shadow: 0 0.45em 1.5em rgb(0 0 0 / 40%), 0 0 0 0 rgb(245 197 66 / 0%); }
		50% { box-shadow: 0 0.45em 1.5em rgb(0 0 0 / 40%), 0 0 1.2em 0.15em rgb(245 197 66 / 45%); }
	}
	@keyframes promo-pop {
		from { opacity: 0; transform: scale(0.6) translateY(20px); }
		to { opacity: 1; transform: none; }
	}
	@media (prefers-reduced-motion: reduce) {
		.promo-banner--live, .promo-drop__card { animation: none; }
	}
</style>
