<script lang="ts">
	// Generated per-game data (paytable, RTP, max win, labels…).
	import { gameMeta } from '../game/gameMeta';

	type Props = { onclose: () => void };
	const props: Props = $props();

	const fmtTier = (t: [number, number], i: number, arr: [number, number][]) => {
		const [min, pay] = t;
		const next = arr[i + 1];
		const range = next ? (next[0] - min === 1 ? `${min}` : `${min}–${next[0] - 1}`) : `${min}+`;
		return `${range} → ${pay}×`;
	};
</script>

<div class="page">
	<header>
		<h1>GAME INFO — {gameMeta.gameName.toUpperCase()}</h1>
		<button class="x" onclick={props.onclose} aria-label="Close">×</button>
	</header>

	<div class="scroll">
		<h2>About the Game</h2>
		<p>{gameMeta.about}</p>

		<h2>Paytable</h2>
		<p class="note">Payouts are a multiplier of your total bet, by number of matching symbols.</p>
		<div class="pt">
			{#each gameMeta.pays as p}
				<div class="row">
					<img src={`/assets/paytable/${p.name}.png`} alt={p.label} />
					<div class="info">
						<div class="name">{p.label}</div>
						<div class="tiers">{#each p.tiers as t, i}<span>{fmtTier(t as [number, number], i, p.tiers as [number, number][])}</span>{/each}</div>
					</div>
				</div>
			{/each}
		</div>

		{#if gameMeta.specials.length}
			<h2>Special Symbols</h2>
			<div class="pt">
				{#each gameMeta.specials as s}
					<div class="row">
						<img src={`/assets/paytable/${s.name}.png`} alt={s.label} />
						<div class="info"><div class="name">{s.label}</div><p class="sdesc">{s.desc}</p></div>
					</div>
				{/each}
			</div>
		{/if}

		<h2>How to Play</h2>
		<ul>
			<li>Set your bet with the <b>+ / −</b> controls, then press <b>Spin</b>.</li>
			<li><b>Pay anywhere:</b> wins are formed by <b>8+</b> matching symbols anywhere on the grid — no paylines.</li>
			<li><b>Tumbling Reels:</b> winning symbols are removed and new ones drop in; tumbles continue while new wins form.</li>
			<li><b>Free Spins:</b> land enough <b>Scatters</b> to trigger the bonus round.</li>
			<li><b>Wild</b> substitutes for paying symbols; <b>Multiplier</b> boosts the wins it joins.</li>
		</ul>

		<h2>Game Information</h2>
		<table>
			<tbody>
				<tr><td>Return to Player (RTP)</td><td>{gameMeta.rtp}</td></tr>
				<tr><td>Maximum Win</td><td>{gameMeta.maxWin} total bet</td></tr>
				<tr><td>Reels × Rows</td><td>{gameMeta.reels} × {gameMeta.rows}</td></tr>
				<tr><td>Ways to Win</td><td>Pay anywhere (8+)</td></tr>
				<tr><td>Volatility</td><td>{gameMeta.volatility}</td></tr>
			</tbody>
		</table>

		<h2>Disclaimer &amp; Responsible Play</h2>
		<ul>
			<li><b>Malfunction voids all pays and play.</b> Any round affected by a malfunction, disconnection or error is void.</li>
			<li>If this display and the game server disagree, the <b>server result is final</b>.</li>
			<li>You must be of <b>legal age</b> in your jurisdiction. Gambling may be restricted where you live.</li>
			<li><b>Play responsibly.</b> Gambling is entertainment, not a way to make money — never bet more than you can afford to lose.</li>
			<li>If gambling is affecting you or someone you know, seek support from a recognised responsible-gambling organisation.</li>
		</ul>
		<p class="fine">Theoretical RTP {gameMeta.rtp}. Maximum win {gameMeta.maxWin} the total bet. Outcomes are determined by a certified random number generator.</p>
		<div class="spacer"></div>
	</div>
</div>

<style>
	/* Full-screen scrolling info page; clamp(rem, vw, rem) for legibility everywhere. */
	.page { position: fixed; inset: 0; z-index: 1000; display: flex; flex-direction: column;
		background: #0a0f0d; color: #fff; font-family: 'Jura', system-ui, sans-serif; }
	header { position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between;
		gap: 1rem; padding: 1.1rem 1.3rem; background: #0a0f0d; border-bottom: 0.1rem solid rgba(255,255,255,.14); }
	header h1 { margin: 0; font-size: clamp(1.6rem, 6vw, 2.3rem); font-weight: 700; letter-spacing: .02em; }
	.x { flex: 0 0 auto; width: 3.4rem; height: 3.4rem; border-radius: 50%; background: none;
		border: 0.16rem solid rgba(255,255,255,.5); color: #fff; font-size: 2.3rem; line-height: 1; cursor: pointer; }
	.scroll { flex: 1 1 auto; overflow-y: auto; padding: 1.4rem; -webkit-overflow-scrolling: touch; }

	h2 { color: #ffd83a; font-size: clamp(1.6rem, 6vw, 2.15rem); font-weight: 700; letter-spacing: .02em; margin: 2rem 0 1rem; }
	h2:first-child { margin-top: 0.3rem; }
	p { font-size: clamp(1.5rem, 5vw, 2rem); line-height: 1.55; margin: 0 0 1.1rem; }
	.note { font-size: clamp(1.3rem, 4.4vw, 1.7rem); opacity: .82; margin-bottom: 1rem; }
	b { color: #ffe9a0; }

	.pt { display: flex; flex-direction: column; gap: 0.9rem; }
	.row { display: flex; gap: 1.2rem; align-items: center; background: rgba(255,255,255,.05);
		border: 0.1rem solid rgba(255,216,58,.3); border-radius: 1rem; padding: 1rem 1.1rem; }
	.row img { width: clamp(5rem, 17vw, 7.5rem); height: clamp(5rem, 17vw, 7.5rem); object-fit: contain; flex: 0 0 auto; }
	.name { font-size: clamp(1.5rem, 5.2vw, 2rem); font-weight: 700; color: #ffe9a0; margin-bottom: 0.5rem; }
	.tiers { display: flex; flex-wrap: wrap; gap: 0.5rem 0.65rem; }
	.tiers span { font-size: clamp(1.3rem, 4.6vw, 1.75rem); font-weight: 600; background: rgba(255,216,58,.16);
		color: #fff; border-radius: 0.55rem; padding: 0.2rem 0.7rem; white-space: nowrap; }
	.sdesc { font-size: clamp(1.3rem, 4.6vw, 1.75rem); line-height: 1.45; margin: 0; opacity: .95; }

	ul { margin: 0 0 1.1rem; padding-left: 1.5rem; }
	li { font-size: clamp(1.5rem, 5vw, 2rem); line-height: 1.6; margin-bottom: 0.9rem; }
	table { width: 100%; border-collapse: collapse; }
	td { padding: 1.1rem 0.5rem; border-bottom: 0.1rem solid rgba(255,255,255,.1); font-size: clamp(1.5rem, 5vw, 2rem); }
	td:last-child { text-align: right; color: #ffe9a0; font-weight: 700; }
	.fine { font-size: clamp(1.1rem, 3.6vw, 1.45rem); opacity: .68; line-height: 1.5; margin-top: 1.3rem; }
	.spacer { height: 2rem; }
</style>
