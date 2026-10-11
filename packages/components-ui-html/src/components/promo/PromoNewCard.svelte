<script lang="ts">
	import { onDestroy } from 'svelte';
	import { requestInsuranceOptIn } from 'rgs-requests';
	import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';
	import { statePromo, stateUrlDerived, stateBet, promoActions, type PromoSummary } from 'state-shared';

	import { money } from './promoFormat';

	// Spin insurance (spec 04) and Collect & Win (spec 05) cards for the promo banner.
	type Props = { promo: PromoSummary };
	const props: Props = $props();
	const p = $derived(props.promo);

	const pct = (n: number) => `${Math.round(n)}%`;

	// ── Spin insurance ───────────────────────────────────────────────────────
	let confirming = $state(false);
	// Opening the confirm step stops the banner rotating, so the sheet stays on this promo.
	const setConfirming = (open: boolean) => {
		confirming = open;
		statePromo.confirmingPromoId = open ? p.promoId : null;
	};
	onDestroy(() => {
		if (statePromo.confirmingPromoId === p.promoId) statePromo.confirmingPromoId = null;
	});
	let busy = $state(false);
	let error = $state<string | null>(null);
	const policy = $derived(p.insurance?.policy ?? null);
	const offer = $derived(p.insurance?.offer ?? null);
	const betMicro = $derived(stateBet.betAmount * API_AMOUNT_MULTIPLIER);
	const betDiffers = $derived(!!policy && betMicro !== policy.stake);

	const insure = async () => {
		busy = true;
		error = null;
		try {
			const r = await requestInsuranceOptIn({
				sessionID: stateUrlDerived.sessionID(),
				rgsUrl: stateUrlDerived.rgsUrl(),
				operatorId: stateUrlDerived.operatorId(),
				brandId: stateUrlDerived.brandId(),
				promoId: p.promoId,
				gameId: stateUrlDerived.gameId(),
				stake: stateBet.betAmount,
			});
			// Show the policy straight away; the next 15-second refresh replaces it with the server's copy.
			statePromo.active = statePromo.active.map((x) =>
				x.promoId === p.promoId && x.insurance
					? { ...x, insurance: { offer: x.insurance.offer, policy: { policyId: r.policyId, status: 'active', spinsDone: 0, spinsTarget: r.spins, stake: r.stake, staked: 0, won: 0, expiresAt: r.expiresAt } } }
					: x,
			);
			setConfirming(false);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Could not insure your spins';
		} finally {
			busy = false;
		}
	};

	// No-claim notice: a policy that finished above the threshold.
	const settled = $derived(statePromo.insuranceSettled.find((s) => s.promoId === p.promoId) ?? null);
	$effect(() => {
		if (!settled) return;
		const id = setTimeout(() => promoActions.dismissInsuranceSettled(), 4000);
		return () => clearTimeout(id);
	});

	// ── Collect & Win ────────────────────────────────────────────────────────
	// The letter that landed on the last spin lights its tile for 600ms; a duplicate shows a short note.
	let landed = $state<string | null>(null);
	let duplicate = $state(false);
	$effect(() => {
		const seq = statePromo.collectEventSeq;
		const ev = statePromo.collectEvent;
		if (!seq || !ev || ev.promoId !== p.promoId) return;
		duplicate = ev.duplicate;
		landed = ev.letter;
		const id = setTimeout(() => { landed = null; duplicate = false; }, 600);
		return () => clearTimeout(id);
	});
	const cards = $derived(p.collect?.words ?? []);
	const odds = $derived(p.collect?.letterOdds ?? {});
	// The rarest letter: the lowest odds on the card.
	const rarest = $derived(Object.entries(odds).sort((a, b) => a[1] - b[1])[0]?.[0] ?? null);
</script>

{#if p.type === 'spin_insurance' && offer}
	<div class="pnc">
		{#if policy}
			<div class="pnc-chip" role="status">
				<span class="pnc-title">🛡 {policy.spinsDone}/{policy.spinsTarget} · {money(policy.won)} back of {money(policy.staked)}</span>
				{#if betDiffers}<span class="pnc-hint">Insured stake {money(policy.stake)}. Spins at another stake don't count.</span>{/if}
			</div>
		{:else if confirming}
			<div class="pnc-sheet">
				<strong>Insure your next {offer.spins} spins</strong>
				<span>Stake {money(betMicro)} a spin. Back under {pct(offer.thresholdPct)} of your stake, we pay {pct(offer.coverPct)} of the shortfall, up to {money(offer.maxPayout)}.</span>
				<span class="pnc-muted">{p.termsText ?? ''}</span>
				{#if error}<span class="pnc-error">{error}</span>{/if}
				<div class="pnc-row">
					<button type="button" class="pnc-btn pnc-btn--ghost" onclick={() => setConfirming(false)} disabled={busy}>Not now</button>
					<button type="button" class="pnc-btn" onclick={insure} disabled={busy}>{busy ? 'Insuring…' : 'Confirm insurance'}</button>
				</div>
			</div>
		{:else}
			<div class="pnc-offer">
				<div class="pnc-text">
					<span class="pnc-title">🛡 Insure your next {offer.spins} spins</span>
					<span class="pnc-muted">Back under {pct(offer.thresholdPct)} pays {pct(offer.coverPct)} of the gap, up to {money(offer.maxPayout)}</span>
				</div>
				<button type="button" class="pnc-btn" onclick={() => setConfirming(true)}>Insure</button>
			</div>
		{/if}
		{#if settled && settled.status === 'settled_nil'}
			<div class="pnc-toast" role="status">You beat the cover: no claim needed</div>
		{/if}
	</div>
{:else if p.type === 'collect_win' && p.collect}
	<div class="pnc">
		<div class="pnc-words">
			{#each cards as card (card.word)}
				<div class="pnc-word" class:pnc-word--done={card.completions > 0 && card.collected === card.word.replace(/./g, '_')}>
					<span class="pnc-word-name">{card.word} · {money(card.prize)}{card.repeatable ? '' : ' (once)'}</span>
					<span class="pnc-tiles">
						{#each card.word.split('') as letter, i (i)}
							{@const lit = card.collected[i] !== '_'}
							<span
								class="pnc-tile"
								class:pnc-tile--lit={lit}
								class:pnc-tile--rare={letter === rarest}
								class:pnc-tile--landed={landed === letter}
							>{lit ? card.collected[i] : ''}</span>
						{/each}
					</span>
					{#if card.completions > 0}<span class="pnc-muted">Completed {card.completions}×</span>{/if}
				</div>
			{/each}
		</div>
		<div class="pnc-muted">
			{pct((p.collect.letterChance ?? 0) * 100)} chance of a letter a spin
			{#if duplicate}<span class="pnc-puff">already collected</span>{/if}
		</div>
		{#if p.termsText}<span class="pnc-muted">{p.termsText}</span>{/if}
	</div>
{/if}

<style>
	/* Placed like the banner: top centre on phones and portrait, top right in the free space on wide screens. */
	.pnc {
		position: fixed;
		top: var(--promo-top);
		left: 50%;
		transform: translateX(-50%);
		z-index: 900;
		width: max-content;
		max-width: calc(100vw - 24px);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px 12px;
		border: 1px solid rgb(245 197 66 / 55%);
		border-radius: 14px;
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		font-size: 13px;
		box-shadow: 0 0.45em 1.5em rgb(0 0 0 / 40%);
	}
	@media (min-aspect-ratio: 4/3) {
		.pnc {
			right: calc(env(safe-area-inset-right, 0px) + 16px);
			left: auto;
			transform: none;
			max-width: calc(50vw - 16px);
		}
	}
	.pnc-offer, .pnc-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
	.pnc-text, .pnc-sheet, .pnc-chip, .pnc-words { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
	.pnc-title { font-weight: 600; }
	.pnc-muted { opacity: 0.75; font-size: 12px; }
	.pnc-hint { font-size: 12px; color: #fbbf24; }
	.pnc-error { color: #fca5a5; font-size: 12px; }
	.pnc-btn { border: 0; border-radius: 999px; padding: 6px 14px; font-weight: 600; background: #fff; color: #111; cursor: pointer; }
	.pnc-btn:disabled { opacity: 0.6; cursor: default; }
	.pnc-btn--ghost { background: transparent; color: #fff; border: 1px solid rgba(255, 255, 255, 0.4); }
	.pnc-word { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; }
	.pnc-word-name { font-weight: 600; min-width: 120px; }
	.pnc-tiles { display: inline-flex; gap: 4px; }
	.pnc-tile { display: inline-grid; place-items: center; width: 26px; height: 26px; border-radius: 6px; border: 1px dashed rgba(255, 255, 255, 0.35); font-weight: 700; }
	.pnc-tile--lit { border-style: solid; background: #fbbf24; color: #111; }
	.pnc-tile--rare { box-shadow: 0 0 8px rgba(251, 191, 36, 0.8); }
	.pnc-tile--landed { animation: pnc-land 600ms ease-out; }
	.pnc-word--done .pnc-word-name { color: #86efac; }
	.pnc-toast { align-self: flex-start; padding: 4px 10px; border-radius: 999px; background: #fff; color: #111; font-weight: 600; }
	.pnc-puff { margin-left: 8px; color: #fbbf24; }
	@keyframes pnc-land { 0% { transform: scale(1.6); } 100% { transform: scale(1); } }
	@media (prefers-reduced-motion: reduce) { .pnc-tile--landed { animation: none; } }
</style>
