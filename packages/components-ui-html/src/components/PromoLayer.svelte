<script lang="ts">
	import { onMount } from 'svelte';

	import { requestActivePromos } from 'rgs-requests';
	import { statePromo, statePromoDerived, promoActions, stateUrlDerived, stateModal, stateBet } from 'state-shared';
	import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';

	import PromoBanner from './promo/PromoBanner.svelte';
	import PromoAwardPopup from './promo/PromoAwardPopup.svelte';
	import PromoInfoSheet from './promo/PromoInfoSheet.svelte';


	// Operator promos for every game (mounted from the shared Modals layer):
	// prize drops, win boosts, multiplier windows, missions and leaderboards.
	// Promo rewards are always presented separately from — and after — the game's own win.

	const POLL_ACTIVE_MS = 15_000;
	const POLL_IDLE_MS = 60_000;

	let now = $state(Date.now());
	const showable = $derived(statePromoDerived.showable());
	// Step aside for full-screen game UI, like the game's own ticker does.
	const hideBanner = $derived(stateModal.modal?.name === 'buyBonus');

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
		let last = Date.now();
		const poll = setInterval(() => {
			const every = statePromo.active.length > 0 ? POLL_ACTIVE_MS : POLL_IDLE_MS;
			if (Date.now() - last >= every) {
				last = Date.now();
				refresh();
			}
		}, 5_000);
		return () => {
			clearInterval(tick);
			clearInterval(poll);
		};
	});

	// Results paid outside the player's own spin — leaderboards, guaranteed wins and cashback when the promo
	// closes, and jackpot-race rounds while it is live — are announced once per result (promoId + resultSeq).
	// Remembered in localStorage too, so a reload doesn't show the same result again.
	const SEEN_KEY = 'promo-results-seen';
	const seen = (): string[] => {
		try { return JSON.parse(localStorage.getItem(SEEN_KEY) ?? '[]'); } catch { return []; }
	};
	const remember = (key: string) => {
		try { localStorage.setItem(SEEN_KEY, JSON.stringify([...seen(), key].slice(-50))); } catch { /* optional */ }
	};
	$effect(() => {
		for (const p of statePromo.active) {
			const you = p.you;
			if (!you?.resultLabel || you.resultAmount <= 0) continue;
			const seq = you.resultSeq ?? 0;
			if (p.phase !== 'ended' && seq === 0) continue;
			const key = `${p.promoId}:${seq}`;
			if (statePromo.resultsShown.includes(key)) continue;
			if (seen().includes(key)) { statePromo.resultsShown = [...statePromo.resultsShown, key]; continue; }
			remember(key);
			promoActions.announceResult({
				promoId: p.promoId, type: p.type, kind: 'cash', tier: 0,
				label: you.resultLabel, amount: you.resultAmount, currency: p.currency, title: p.title,
			}, key);
			// Already in the wallet; the next RGS response sets the exact balance again.
			stateBet.balanceAmount += you.resultAmount / API_AMOUNT_MULTIPLIER;
		}
	});
</script>

<div class="promo-root">
	{#if showable.length && !hideBanner}
		<PromoBanner promos={showable} {now} />
	{/if}
	<PromoAwardPopup />
	<PromoInfoSheet {now} />
</div>

<style>
	/*
	 * Responsive: each promo element takes one font-size from the viewport (portrait → width,
	 * landscape → height) and sizes everything inside in em, so it scales with the game on any
	 * device. No rem — games set the root font-size to 50% on small screens.
	 * Games can theme promos by defining the --game-promo-* variables.
	 */
	.promo-root {
		display: contents;
		--promo-accent: var(--game-promo-accent, #f5c542);
		--promo-accent-deep: var(--game-promo-accent-deep, #b7791f);
		--promo-surface: var(--game-promo-surface, rgb(14 16 28 / 86%));
		--promo-text: var(--game-promo-text, #fff8e6);
		--promo-muted: var(--game-promo-muted, #d9cfb8);
		--promo-top: calc(env(safe-area-inset-top, 0px) + clamp(26px, 4.2vh, 44px));
	}
</style>
