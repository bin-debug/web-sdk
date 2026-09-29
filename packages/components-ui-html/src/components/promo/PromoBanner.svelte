<script lang="ts">
	import { statePromo, type PromoSummary } from 'state-shared';

	import PromoIcon from './PromoIcon.svelte';
	import { money, multiplier, timing, goalText, progressText, scoreText, ordinal, clock } from './promoFormat';

	type Props = { promos: PromoSummary[]; now: number };
	const props: Props = $props();

	// Several promos at once: rotate through them.
	const ROTATE_MS = 6_000;
	let index = $state(0);
	const promo = $derived(props.promos[index % Math.max(1, props.promos.length)]);

	// Depend on the count only, so the 15s data refresh doesn't restart the rotation timer.
	// Paused while an info sheet is open.
	const count = $derived(props.promos.length);
	const paused = $derived(statePromo.infoPromoId !== null);
	$effect(() => {
		if (count < 2 || paused) return;
		const id = setInterval(() => (index = (index + 1) % count), ROTATE_MS);
		return () => clearInterval(id);
	});

	const view = $derived.by(() => {
		const p = promo;
		if (!p) return null;
		const t = timing(p, props.now);
		switch (p.type) {
			case 'win_boost':
			case 'multiplier_window': {
				const b = p.boost!;
				return {
					icon: 'bolt' as const,
					main: p.type === 'win_boost' ? `Win Boost ${multiplier(b.multiplier)}` : `All wins ${multiplier(b.multiplier)}`,
					line: b.maxPerAward > 0 ? `Up to ${money(b.maxPerAward)} per win` : b.minWinMultiplier > 0 ? `Wins ${multiplier(b.minWinMultiplier)}+` : 'On winning spins',
					progress: null,
					t,
				};
			}
			case 'jackpot': {
				const tiers = [...(p.jackpot ?? [])].sort((a, b) => a.tier - b.tier);
				const top = tiers[0];
				return {
					icon: 'crown' as const,
					main: top ? `${top.label} ${money(top.pot)}` : money(p.pot),
					line: tiers.slice(1).map((t) => `${t.label} ${money(t.pot)}`).join(' · ') || `Must drop by ${money(top?.cap ?? 0)}`,
					progress: top ? Math.min(1, top.pot / top.cap) : null,
					t,
				};
			}
			case 'jackpot_race': {
				const rounds = p.jackpotRace ?? [];
				const live = rounds.find((r) => r.status === 'live');
				const next = live ?? rounds.find((r) => r.status === 'upcoming');
				const done = rounds.filter((r) => r.status === 'won' || r.status === 'rolled_over').length;
				const won = [...rounds].reverse().find((r) => r.youWon);
				return {
					icon: 'crown' as const,
					main: money(p.pot),
					line: won && !next
						? `You won the ${won.label}!`
						: live
							? `${live.label} can hit any second`
							: next
								? `${next.label} from ${clock(next.windowStart)}`
								: `${done} of ${rounds.length} jackpots paid`,
					progress: rounds.length ? done / rounds.length : null,
					t,
				};
			}
			case 'race': {
				const r = p.race!;
				const left = Math.max(0, r.placesTotal - r.placesTaken);
				return {
					icon: 'flag' as const,
					main: r.position
						? `You finished ${ordinal(r.position)}`
						: left === 0
							? 'All places taken'
							: r.goal.target === 1 ? goalText(r.goal) : progressText(r.goal, r.current),
					line: `${left} of ${r.placesTotal} places left`,
					progress: r.position ? 1 : Math.min(1, r.current / r.goal.target),
					t,
				};
			}
			case 'guaranteed_win': {
				const g = p.rules!;
				const spins = p.you?.spins ?? 0;
				const done = spins >= g.minSpins;
				return {
					icon: 'shield' as const,
					main: done ? 'Qualified ✓' : `${spins} / ${g.minSpins} spins`,
					line: `Guaranteed ${multiplier(g.targetMultiplier)} win`,
					progress: Math.min(1, spins / g.minSpins),
					t,
				};
			}
			case 'loss_rebate': {
				const g = p.rules!;
				const net = p.you?.windowNet ?? 0;
				return {
					icon: 'shield' as const,
					main: `${p.you?.windowSpins ?? 0} / ${g.everySpins} spins`,
					line: `${g.pct}% back · ${net > 0 ? `down ${money(net)}` : 'no loss yet'}`,
					progress: Math.min(1, (p.you?.windowSpins ?? 0) / g.everySpins),
					t,
				};
			}
			case 'cashback': {
				const g = p.rules!;
				const lost = Math.max(0, (p.you?.turnover ?? 0) - (p.you?.gameWin ?? 0));
				return {
					icon: 'coins' as const,
					main: money(Math.floor((lost * g.pct) / 100 / 10_000) * 10_000),
					line: `${g.pct}% cashback so far`,
					progress: null,
					t,
				};
			}
			case 'stake_discount': {
				const g = p.rules!;
				return {
					icon: 'tag' as const,
					main: `${g.pct}% off every spin`,
					line: (p.you?.won ?? 0) > 0 ? `Saved ${money(p.you!.won)}` : g.maxPerSpin > 0 ? `Up to ${money(g.maxPerSpin)} per spin` : 'On your stake',
					progress: null,
					t,
				};
			}
			case 'achievement':
			case 'mission': {
				const m = p.mission!;
				const step = m.steps[m.step];
				if (!step) return { icon: 'flag' as const, main: 'All complete ✓', line: `${m.steps.length} of ${m.steps.length} done`, progress: 1, t };
				return {
					icon: 'flag' as const,
					main: progressText(step, m.current),
					line: m.steps.length > 1 ? `Step ${m.step + 1} of ${m.steps.length} · ${money(step.reward)}` : `Reward ${money(step.reward)}`,
					progress: Math.min(1, m.current / step.target),
					t,
				};
			}
			case 'leaderboard': {
				const lb = p.leaderboard!;
				const you = lb.you;
				const main = you ? `${p.phase === 'ended' ? 'Final ' : ''}${ordinal(you.position)} place` : 'Spin to enter';
				return {
					icon: 'trophy' as const,
					main,
					line: you ? `Your best ${scoreText(lb.scoreBy, you.score)}` : `Top ${lb.paidPlaces} win prizes`,
					progress: null,
					t,
				};
			}
			default:
				return { icon: 'star' as const, main: money(p.pot), line: `${p.prizesRemaining}/${p.prizesTotal} prizes left`, progress: null, t };
		}
	});
</script>

{#if promo && view}
	<button
		class="promo-banner"
		class:promo-banner--live={promo.phase === 'live'}
		onclick={() => (statePromo.infoPromoId = promo.promoId)}
		aria-label={`${promo.title}: ${view.main}. Tap for details`}
	>
		<span class="promo-banner__badge" aria-hidden="true"><PromoIcon name={view.icon} /></span>
		<span class="promo-banner__text">
			<span class="promo-banner__title">{promo.title}</span>
			<span class="promo-banner__main">{view.main}</span>
			{#if view.progress !== null}
				<span class="promo-banner__bar"><span style:width={`${Math.round(view.progress * 100)}%`}></span></span>
			{/if}
		</span>
		<span class="promo-banner__meta">
			<span>{view.t.label} {#if view.t.value}<strong>{view.t.value}</strong>{/if}</span>
			<span>{view.line}</span>
		</span>
		{#if props.promos.length > 1}
			<span class="promo-banner__dots" aria-hidden="true">
				{#each props.promos as p, i (p.promoId)}<i class:on={i === index % props.promos.length}></i>{/each}
			</span>
		{/if}
	</button>
{/if}

<style lang="scss">
	/* Sized from the viewport, everything inside in em (see PromoLayer). */
	.promo-banner {
		font-size: clamp(13px, 3.9vw, 24px);
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
		/* No backdrop-filter: blurring the WebGL canvas behind it costs a GPU pass every frame on phones. */
		contain: layout style;
		cursor: pointer;
		font-family: inherit;
		line-height: 1.15;
		white-space: nowrap;
	}
	:global(.intro-active) .promo-banner {
		display: none;
	}
	/* Live glow: a static shadow on a pseudo-element, only its opacity animates (compositor-only, no repaints). */
	.promo-banner--live::after {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		box-shadow: 0 0 1.2em 0.15em rgb(245 197 66 / 45%);
		pointer-events: none;
		opacity: 0;
		will-change: opacity;
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
		color: #6b3d00;
	}
	.promo-banner__text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}
	.promo-banner__title {
		max-width: 12em;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--promo-muted);
		font-size: 0.8em;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.promo-banner__main {
		color: var(--promo-accent);
		font-size: 1.3em;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}
	.promo-banner__bar {
		width: 100%;
		min-width: 6em;
		height: 0.3em;
		margin-top: 0.2em;
		border-radius: 999px;
		background: rgb(255 255 255 / 15%);
		overflow: hidden;
	}
	.promo-banner__bar span {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: var(--promo-accent);
		transition: width 0.4s ease;
	}
	.promo-banner__meta {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-left: 0.75em;
		border-left: 1px solid rgb(255 255 255 / 15%);
		color: var(--promo-muted);
		font-size: 0.9em;
		font-variant-numeric: tabular-nums;
	}
	.promo-banner__meta strong {
		color: var(--promo-text);
	}
	.promo-banner__dots {
		position: absolute;
		bottom: -0.75em;
		left: 50%;
		display: flex;
		gap: 0.3em;
		transform: translateX(-50%);
	}
	.promo-banner__dots i {
		width: 0.4em;
		height: 0.4em;
		border-radius: 50%;
		background: rgb(255 255 255 / 35%);
	}
	.promo-banner__dots i.on {
		background: var(--promo-accent);
	}

	@media (orientation: landscape) {
		.promo-banner { font-size: clamp(13px, 2.6vh, 28px); }
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
	@keyframes promo-glow {
		0%, 100% { opacity: 0; }
		50% { opacity: 1; }
	}
	@media (prefers-reduced-motion: reduce) {
		.promo-banner--live::after { animation: none; }
	}
</style>
