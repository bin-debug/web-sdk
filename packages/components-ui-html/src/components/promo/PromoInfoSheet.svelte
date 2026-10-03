<script lang="ts">
	import { statePromo, statePromoDerived } from 'state-shared';

	import {
		money, multiplier, ordinal, timing, goalText, progressText, scoreText, scoreByText, clock, whenText,
	} from './promoFormat';

	type Props = { now: number };
	const props: Props = $props();

	const p = $derived(statePromoDerived.info());
	const t = $derived(p ? timing(p, props.now) : null);
	const close = () => (statePromo.infoPromoId = null);

	const eyebrow = $derived(
		p
			? ({
					prize_drop: 'Prize drops',
					win_boost: 'Win boost',
					multiplier_window: 'Multiplier window',
					mission: 'Missions',
					achievement: 'Achievements',
					leaderboard: 'Leaderboard',
					jackpot: 'Must-drop jackpot',
					jackpot_race: 'Jackpot race',
					race: 'Race',
					guaranteed_win: 'Guaranteed win',
					loss_rebate: 'Safety net',
					cashback: 'Cashback',
					stake_discount: 'Stake discount',
					welcome_bonus: 'Welcome bonus',
					free_spins: 'Free spins',
				} as Record<string, string>)[p.type] ?? 'Promotion'
			: '',
	);
	const placeLabel = (tier: { count: number }, start: number) =>
		tier.count === 1 ? ordinal(start) : `${ordinal(start)}–${ordinal(start + tier.count - 1)}`;
	const prizeRows = $derived.by(() => {
		let pos = 1;
		return (p?.prizes ?? []).map((x) => {
			const row = { place: placeLabel(x, pos), label: x.label, count: x.count, amount: x.amount };
			pos += x.count;
			return row;
		});
	});
	const youOutsideTop = $derived(
		!!p?.leaderboard?.you && !p.leaderboard.top.some((e) => e.you),
	);
</script>

{#if p}
	<div class="promo-info" role="dialog" aria-modal="true" aria-labelledby="promo-info-title">
		<button class="promo-info__backdrop" aria-label="Close" onclick={close}></button>
		<section class="promo-info__sheet">
			<p class="promo-info__eyebrow">{eyebrow}</p>
			<h2 id="promo-info-title">{p.title}</h2>
			{#if p.subtitle}<p class="promo-info__subtitle">{p.subtitle}</p>{/if}
			{#if p.phase === 'upcoming'}
				<p class="promo-info__soon">Starts {whenText(p.startsAt ?? p.windowStart, props.now)}{#if p.teaserText} — {p.teaserText}{/if}</p>
			{/if}

			<dl class="promo-info__stats">
				{#if p.bonus}
					{#if p.bonus.stage === 'spins'}
						<div><dt>Spins left</dt><dd>{p.bonus.spinsTotal - p.bonus.spinsUsed} of {p.bonus.spinsTotal}</dd></div>
						<div><dt>Spin value</dt><dd>{money(p.bonus.spinValue)}</dd></div>
						<div><dt>Won so far</dt><dd>{money(p.bonus.bonusWinnings)}</dd></div>
						<div><dt>Wagering</dt><dd>{p.bonus.wageringMultiplier > 0 ? multiplier(p.bonus.wageringMultiplier) : 'None'}</dd></div>
					{:else}
						<div><dt>Bonus winnings</dt><dd>{money(p.bonus.bonusWinnings)}</dd></div>
						<div><dt>Wagered</dt><dd>{money(p.bonus.wageringProgress)} / {money(p.bonus.wageringTarget)}</dd></div>
						<div><dt>Still to wager</dt><dd>{money(Math.max(0, p.bonus.wageringTarget - p.bonus.wageringProgress))}</dd></div>
					{/if}
				{:else if p.type === 'jackpot_race'}
					<div><dt>Jackpot pot</dt><dd>{money(p.pot)}</dd></div>
					<div><dt>Jackpots</dt><dd>{(p.jackpotRace ?? []).length}</dd></div>
				{:else if p.type === 'prize_drop'}
					<div><dt>Prize pot</dt><dd>{money(p.pot)}</dd></div>
					<div><dt>Prizes left</dt><dd>{p.prizesRemaining} of {p.prizesTotal}</dd></div>
				{:else if p.boost}
					<div><dt>Boost</dt><dd>{multiplier(p.boost.multiplier)}</dd></div>
					<div><dt>{p.boost.maxPerAward > 0 ? 'Max per win' : 'Min win'}</dt>
						<dd>{p.boost.maxPerAward > 0 ? money(p.boost.maxPerAward) : multiplier(p.boost.minWinMultiplier)}</dd></div>
				{:else if p.leaderboard}
					<div><dt>Your place</dt><dd>{p.leaderboard.you ? ordinal(p.leaderboard.you.position) : '–'}</dd></div>
					<div><dt>Your best</dt><dd>{p.leaderboard.you ? scoreText(p.leaderboard.scoreBy, p.leaderboard.you.score) : '–'}</dd></div>
				{:else if p.race}
					<div><dt>Places left</dt><dd>{Math.max(0, p.race.placesTotal - p.race.placesTaken)} of {p.race.placesTotal}</dd></div>
					<div><dt>You</dt><dd>{p.race.position ? ordinal(p.race.position) : progressText(p.race.goal, p.race.current)}</dd></div>
				{:else if p.type === 'guaranteed_win' && p.rules}
					<div><dt>Your spins</dt><dd>{p.you?.spins ?? 0} / {p.rules.minSpins}</dd></div>
					<div><dt>Your best</dt><dd>{multiplier(p.you?.bestMultiplier ?? 0)}</dd></div>
				{:else if p.type === 'loss_rebate' && p.rules}
					<div><dt>This round</dt><dd>{p.you?.windowSpins ?? 0} / {p.rules.everySpins}</dd></div>
					<div><dt>Back so far</dt><dd>{money(p.you?.won ?? 0)}</dd></div>
				{:else if p.type === 'cashback' && p.rules}
					<div><dt>Cashback</dt><dd>{p.rules.pct}%</dd></div>
					<div><dt>So far</dt><dd>{money(Math.floor((Math.max(0, (p.you?.turnover ?? 0) - (p.you?.gameWin ?? 0)) * p.rules.pct) / 100 / 10_000) * 10_000)}</dd></div>
				{:else if p.type === 'stake_discount' && p.rules}
					<div><dt>Discount</dt><dd>{p.rules.pct}%</dd></div>
					<div><dt>Saved</dt><dd>{money(p.you?.won ?? 0)}</dd></div>
				{/if}
				{#if t}<div><dt>{t.label}</dt><dd>{t.value || '—'}</dd></div>{/if}
			</dl>

			{#if p.bonus}
				{#if p.bonus.stage === 'wagering'}
					<span class="promo-info__wager"><span style:width={`${Math.min(100, (p.bonus.wageringProgress / Math.max(1, p.bonus.wageringTarget)) * 100)}%`}></span></span>
				{/if}
				<p class="promo-info__body">
					{#if p.bonus.stage === 'spins'}Your free spins are played at {money(p.bonus.spinValue)} each.{/if}
					{#if p.bonus.wageringMultiplier > 0}Winnings from the free spins are held as bonus money until you have wagered {multiplier(p.bonus.wageringMultiplier)} those winnings. Every real-money spin counts, in any game. Once the target is reached the winnings are released to your balance.
					{:else}Winnings from the free spins go straight to your balance.{/if}
				</p>
			{:else if p.jackpotRace}
				<ul class="promo-info__jackpots">
					{#each p.jackpotRace as r (r.index)}
						<li>
							<span class="jp__label">{r.label}</span>
							<span class="jp__pot">
								{#if r.status === 'won'}{money(r.wonAmount)}{:else if r.amount > 0}{money(r.amount)}{:else}{r.pctOfPot}% of pot{/if}
							</span>
							<small>
								{clock(r.windowStart)}–{clock(r.windowEnd)} ·
								{#if r.status === 'won'}{r.youWon ? 'You won it! 🎉' : `Won by ${(r.winners ?? []).join(', ')}`}{r.wonAt ? ` at ${clock(r.wonAt)}` : ''}
								{:else if r.status === 'live'}Live now — can hit any second
								{:else if r.status === 'rolled_over'}Nobody played — prize stays in the pot
								{:else}Upcoming{/if}
							</small>
						</li>
					{/each}
				</ul>
				<p class="promo-info__body">Every eligible spin grows the pot. Each jackpot hits at a secret random moment inside its time slot, and the qualifying spin closest to that moment wins it — keep spinning during the slot to be in with a chance.</p>
			{:else if p.jackpot}
				<ul class="promo-info__jackpots">
					{#each [...p.jackpot].sort((a, b) => a.tier - b.tier) as j (j.tier)}
						<li>
							<span class="jp__label">{j.label}</span>
							<span class="jp__pot">{money(j.pot)}</span>
							<span class="jp__bar"><span style:width={`${Math.min(100, (j.pot / j.cap) * 100)}%`}></span></span>
							<small>Must drop before {money(j.cap)}</small>
						</li>
					{/each}
				</ul>
				<p class="promo-info__body">Every eligible spin grows the pots. Each jackpot drops on the spin that reaches its secret drop point — always before it reaches the cap.</p>
			{:else if p.race}
				<p class="promo-info__body">First {p.race.placesTotal} players to {goalText(p.race.goal).toLowerCase()} win, in finishing order.</p>
			{:else if p.type === 'guaranteed_win' && p.rules}
				<p class="promo-info__body">Play {p.rules.minSpins} spins before the timer ends and you're guaranteed a win of {multiplier(p.rules.targetMultiplier)} your average stake. If your best win is lower, the difference is paid when the promo ends.</p>
			{:else if p.type === 'loss_rebate' && p.rules}
				<p class="promo-info__body">After every {p.rules.everySpins} spins, {p.rules.pct}% of what you lost in those spins comes straight back.</p>
			{:else if p.type === 'cashback' && p.rules}
				<p class="promo-info__body">{p.rules.pct}% of your net loss during the promo is paid back when it ends.</p>
			{:else if p.type === 'stake_discount' && p.rules}
				<p class="promo-info__body">Every spin costs {p.rules.pct}% less{p.rules.maxPerSpin > 0 ? ` (up to ${money(p.rules.maxPerSpin)} per spin)` : ''}. Wins are still paid on your full stake.</p>
			{/if}

			{#if p.type === 'win_boost'}
				<p class="promo-info__body">Winning spins can be boosted at random: the promo adds {multiplier(p.boost!.multiplier - 1)} your win on top, paid separately from the game win.</p>
			{:else if p.type === 'multiplier_window'}
				<p class="promo-info__body">Every win{p.boost!.minWinMultiplier > 0 ? ` of ${multiplier(p.boost!.minWinMultiplier)} or more` : ''} is boosted to {multiplier(p.boost!.multiplier)} until the timer runs out.</p>
			{/if}

			{#if p.mission}
				<ol class="promo-info__steps">
					{#each p.mission.steps as step, i}
						{@const state = i < p.mission.step ? 'done' : i === p.mission.step ? 'current' : 'locked'}
						<li class={`step step--${state}`}>
							<span class="step__mark">{state === 'done' ? '✓' : i + 1}</span>
							<span class="step__body">
								<strong>{step.label || goalText(step)}</strong>
								<small>{goalText(step)}</small>
								{#if state === 'current'}
									<span class="step__bar"><span style:width={`${Math.min(100, (p.mission.current / step.target) * 100)}%`}></span></span>
									<small>{progressText(step, p.mission.current)}</small>
								{/if}
							</span>
							<span class="step__reward">{money(step.reward)}</span>
						</li>
					{/each}
				</ol>
			{/if}

			{#if p.leaderboard}
				<p class="promo-info__body">Ranked by {scoreByText(p.leaderboard.scoreBy).toLowerCase()}. Ties go to whoever got there first.</p>
				<ol class="promo-info__board">
					{#each p.leaderboard.top as e (e.position)}
						<li class:you={e.you}><span>{ordinal(e.position)}</span><span>{e.player}</span><span>{scoreText(p.leaderboard.scoreBy, e.score)}</span></li>
					{/each}
					{#if youOutsideTop && p.leaderboard.you}
						<li class="you gap"><span>{ordinal(p.leaderboard.you.position)}</span><span>You</span><span>{scoreText(p.leaderboard.scoreBy, p.leaderboard.you.score)}</span></li>
					{/if}
					{#if p.leaderboard.top.length === 0}<li class="empty">No entries yet — spin to take 1st place</li>{/if}
				</ol>
			{/if}

			{#if prizeRows.length && p.type !== 'mission'}
				<table class="promo-info__prizes">
					<tbody>
						{#each prizeRows as row}
							<tr>
								<td>{p.type === 'leaderboard' || p.type === 'race' ? row.place : `${row.count}× ${row.label}`}</td>
								<td>{p.type === 'leaderboard' || p.type === 'race' ? row.label : ''}</td>
								<td>{money(row.amount)}{p.type === 'prize_drop' && row.count > 1 ? ' each' : ''}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}

			{#if p.termsText}<p class="promo-info__terms">{p.termsText}</p>{/if}
			<p class="promo-info__fine">{p.bonus ? 'Free spins are awarded by the operator. Game rules and RTP are unchanged.' : 'Promo rewards are paid by the operator, separately from game wins. Game rules and RTP are unchanged.'}</p>
			<button class="promo-info__close" onclick={close}>Got it</button>
		</section>
	</div>
{/if}

<style lang="scss">
	.promo-info {
		font-size: clamp(14px, 4.3vw, 20px);
		position: fixed;
		inset: 0;
		z-index: 1200;
		display: grid;
		place-items: center;
		padding: 16px;
		font-family: inherit;
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
		font-size: 0.8em;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	h2 { margin: 0.25em 0; font-size: 1.6em; }
	.promo-info__subtitle, .promo-info__body {
		margin: 0 0 0.9em;
		color: var(--promo-muted);
		font-size: 0.9em;
		line-height: 1.4;
	}
	.promo-info__stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(6.5em, 1fr));
		gap: 0.5em;
		margin: 0 0 0.9em;
	}
	.promo-info__stats div { padding: 0.6em; border-radius: 0.6em; background: rgb(255 255 255 / 6%); }
	.promo-info__stats dt { color: var(--promo-muted); font-size: 0.78em; text-transform: uppercase; }
	.promo-info__stats dd {
		margin: 0.25em 0 0;
		color: var(--promo-accent);
		font-size: 1.1em;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	.promo-info__steps { margin: 0 0 0.9em; padding: 0; list-style: none; text-align: left; }
	.step {
		display: grid;
		grid-template-columns: 1.8em 1fr auto;
		gap: 0.6em;
		align-items: center;
		padding: 0.6em 0;
		border-bottom: 1px solid rgb(255 255 255 / 8%);
	}
	.step__mark {
		display: grid;
		place-items: center;
		width: 1.8em;
		height: 1.8em;
		border-radius: 50%;
		background: rgb(255 255 255 / 10%);
		font-weight: 800;
	}
	.step--done .step__mark { background: var(--promo-accent); color: #3d2300; }
	.step--locked { opacity: 0.5; }
	.step__body { display: flex; flex-direction: column; gap: 0.15em; min-width: 0; }
	.step__body small { color: var(--promo-muted); font-size: 0.82em; }
	.step__bar { height: 0.35em; border-radius: 999px; background: rgb(255 255 255 / 12%); overflow: hidden; }
	.step__bar span { display: block; height: 100%; background: var(--promo-accent); }
	.step__reward { color: var(--promo-accent); font-weight: 800; font-variant-numeric: tabular-nums; }

	.promo-info__board { margin: 0 0 0.9em; padding: 0; list-style: none; font-variant-numeric: tabular-nums; }
	.promo-info__board li {
		display: grid;
		grid-template-columns: 3em 1fr auto;
		gap: 0.5em;
		padding: 0.4em 0.6em;
		border-radius: 0.5em;
		font-size: 0.9em;
		text-align: left;
	}
	.promo-info__board li:nth-child(odd) { background: rgb(255 255 255 / 4%); }
	.promo-info__board li.you { background: rgb(245 197 66 / 18%); color: var(--promo-accent); font-weight: 800; }
	.promo-info__board li.gap { margin-top: 0.4em; }
	.promo-info__board li.empty { display: block; color: var(--promo-muted); text-align: center; }

	.promo-info__jackpots { margin: 0 0 0.9em; padding: 0; list-style: none; }
	.promo-info__jackpots li {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.2em 0.6em;
		padding: 0.6em 0;
		border-bottom: 1px solid rgb(255 255 255 / 8%);
		text-align: left;
	}
	.jp__label { font-weight: 800; }
	.jp__pot { color: var(--promo-accent); font-weight: 900; font-variant-numeric: tabular-nums; }
	.jp__bar { grid-column: 1 / -1; height: 0.35em; border-radius: 999px; background: rgb(255 255 255 / 12%); overflow: hidden; }
	.jp__bar span { display: block; height: 100%; background: var(--promo-accent); }
	.promo-info__soon { margin: 0 0 0.8em; padding: 0.55em 0.8em; border: 1px solid rgb(245 197 66 / 45%); border-radius: 0.6em; background: rgb(245 197 66 / 10%); color: var(--promo-accent); font-weight: 800; }
	.promo-info__wager { display: block; height: 0.45em; margin: 0 0 0.8em; border-radius: 999px; background: rgb(255 255 255 / 12%); overflow: hidden; }
	.promo-info__wager span { display: block; height: 100%; background: var(--promo-accent); }
	.promo-info__jackpots small { grid-column: 1 / -1; color: var(--promo-muted); font-size: 0.82em; }

	.promo-info__prizes { width: 100%; margin: 0 0 0.9em; border-collapse: collapse; font-size: 0.92em; }
	.promo-info__prizes td { padding: 0.35em 0.4em; border-bottom: 1px solid rgb(255 255 255 / 8%); text-align: left; }
	.promo-info__prizes td:last-child { color: var(--promo-accent); font-weight: 800; text-align: right; }

	.promo-info__terms, .promo-info__fine {
		margin: 0 0 0.6em;
		color: var(--promo-muted);
		font-size: 0.86em;
		line-height: 1.45;
	}
	.promo-info__fine { font-size: 0.78em; opacity: 0.8; }
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
	@media (orientation: landscape) {
		.promo-info { font-size: clamp(13px, 2.7vh, 24px); }
	}
</style>
