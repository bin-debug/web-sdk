<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	// ── Mock data, shaped like what the RGS will eventually send ──────────────
	// Swap this block for a real fetch/subscription later; the template below
	// doesn't need to change, just where `missions` / `leaderboard` come from.
	type Mission = {
		id: string;
		title: string;
		description: string;
		progress: number;
		target: number;
		reward: string;
		icon: string;
		style: 'bar' | 'radial';
	};

	type LeaderEntry = {
		rank: number;
		name: string;
		score: number;
		isPlayer?: boolean;
	};

	const missions: Mission[] = [
		{ id: 'm1', title: 'Street Warm-Up', description: 'Play 20 spins', progress: 14, target: 20, reward: 'R10 Free Bet', icon: '🎰', style: 'bar' },
		{ id: 'm2', title: 'Wild Block', description: 'Land 5 Wild symbols', progress: 3, target: 5, reward: '5 Free Spins', icon: '🃏', style: 'radial' },
		{ id: 'm3', title: 'Scatter Run', description: 'Trigger Free Spins twice', progress: 1, target: 2, reward: 'R25 Bonus Cash', icon: '🎁', style: 'radial' },
		{ id: 'm4', title: 'Big Boujee', description: 'Land a win of 25× bet or more', progress: 0, target: 1, reward: 'Exclusive Badge', icon: '💎', style: 'bar' },
		{ id: 'm5', title: 'Daily Grind', description: 'Play every day this week', progress: 4, target: 7, reward: 'R50 Free Bet', icon: '📅', style: 'bar' },
	];

	const leaderboard: LeaderEntry[] = [
		{ rank: 1, name: 'Ziggy_R', score: 48250 },
		{ rank: 2, name: 'QueenB88', score: 41120 },
		{ rank: 3, name: 'MikeyMoney', score: 38990 },
		{ rank: 4, name: 'You', score: 27430, isPlayer: true },
		{ rank: 5, name: 'CashCarla', score: 25100 },
		{ rank: 6, name: 'DJ_Loot', score: 21980 },
		{ rank: 7, name: 'Sipho_23', score: 19640 },
	];
	// ── end mock data ──────────────────────────────────────────────────────

	let open = $state(false);
	let tab = $state<'missions' | 'leaderboard'>('missions');

	const RADIUS = 26;
	const CIRC = 2 * Math.PI * RADIUS;
	const pct = (m: Mission) => Math.min(100, Math.round((m.progress / m.target) * 100));
</script>

<!-- Call-to-action tag, pinned to the left edge, vertically centred -->
<button class="tag" class:hidden={open} onclick={() => (open = true)} aria-label="Open missions and leaderboard">
	<span class="tag-trophy">🏆</span>
</button>

{#if open}
	<div class="backdrop" transition:fade={{ duration: 200 }} onclick={() => (open = false)} role="presentation"></div>

	<div class="drawer" transition:fly={{ x: -420, duration: 320 }}>
		<header>
			<div class="tabs">
				<button class:active={tab === 'missions'} onclick={() => (tab = 'missions')}>Missions</button>
				<button class:active={tab === 'leaderboard'} onclick={() => (tab = 'leaderboard')}>Leaderboard</button>
			</div>
			<button class="close" onclick={() => (open = false)} aria-label="Close">×</button>
		</header>

		<div class="body">
			{#if tab === 'missions'}
				<div class="list">
					{#each missions as m (m.id)}
						<div class="card">
							{#if m.style === 'radial'}
								<svg class="radial" viewBox="0 0 64 64" width="64" height="64">
									<circle cx="32" cy="32" r={RADIUS} class="radial-track" />
									<circle
										cx="32" cy="32" r={RADIUS}
										class="radial-fill"
										style="stroke-dasharray:{CIRC}; stroke-dashoffset:{CIRC - (CIRC * pct(m)) / 100};"
									/>
									<text x="32" y="37" text-anchor="middle" class="radial-label">{pct(m)}%</text>
								</svg>
							{:else}
								<div class="icon">{m.icon}</div>
							{/if}

							<div class="info">
								<div class="row-top">
									<span class="title">{m.title}</span>
									<span class="reward">{m.reward}</span>
								</div>
								<div class="desc">{m.description}</div>
								{#if m.style === 'bar'}
									<div class="bar-track">
										<div class="bar-fill" style="width:{pct(m)}%"></div>
									</div>
									<div class="bar-label">{m.progress} / {m.target}</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="board">
					{#each leaderboard as e (e.rank)}
						<div class="lrow" class:me={e.isPlayer}>
							<span class="rank" class:top={e.rank <= 3}>{e.rank}</span>
							<span class="name">{e.name}</span>
							<span class="score">{e.score.toLocaleString()}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.tag {
		position: fixed; left: 0; top: 50%; transform: translateY(-50%);
		z-index: 400; display: flex; align-items: center; justify-content: center;
		width: clamp(4rem, 12vw, 5.5rem); height: clamp(4rem, 12vw, 5.5rem);
		padding: 0; border: none; cursor: pointer;
		background: linear-gradient(135deg, #f5a524, #e0932f);
		border-radius: 0 1.4rem 1.4rem 0;
		box-shadow: 0.25rem 0 1.4rem rgba(0,0,0,.55);
		animation: tag-attract 2.6s ease-in-out infinite;
		transition: opacity .2s, transform .2s;
	}
	.tag.hidden { opacity: 0; pointer-events: none; transform: translateY(-50%) translateX(-100%); }
	.tag-trophy { font-size: clamp(2.4rem, 7vw, 3.4rem); line-height: 1; animation: trophy-bounce 1.8s ease-in-out infinite; }

	@keyframes tag-attract {
		0%, 100% { transform: translateY(-50%) scale(1); }
		50% { transform: translateY(-50%) scale(1.06); }
	}
	@keyframes trophy-bounce {
		0%, 100% { transform: translateY(0) rotate(0deg); }
		25% { transform: translateY(-3px) rotate(-8deg); }
		75% { transform: translateY(-3px) rotate(8deg); }
	}
	@media (prefers-reduced-motion: reduce) {
		.tag, .tag-trophy { animation: none; }
	}

	.backdrop { position: fixed; inset: 0; z-index: 490; background: rgba(0,0,0,.55); backdrop-filter: blur(6px); }

	.drawer {
		position: fixed; left: 0; top: 0; bottom: 0; z-index: 491;
		width: min(96vw, 480px); max-width: 100vw;
		display: flex; flex-direction: column;
		background: linear-gradient(160deg, #111827 0%, #080c18 100%);
		border-right: 1px solid #1e2a40;
		box-shadow: 1.2rem 0 3rem rgba(0,0,0,.6);
		font-family: 'Jura', system-ui, sans-serif;
		color: #fff;
	}

	header { flex: 0 0 auto; display: flex; align-items: center; gap: 0.6rem;
		padding: 1.1rem 0.85rem; border-bottom: 1px solid rgba(255,255,255,.08); }
	.tabs { flex: 1 1 auto; display: flex; gap: 0.4rem; background: rgba(255,255,255,.05);
		border-radius: 999px; padding: 0.35rem; }
	.tabs button { flex: 1 1 0; border: none; background: transparent; color: rgba(255,255,255,.6);
		font-family: inherit; font-size: clamp(1.35rem, 5.2vw, 1.65rem); font-weight: 700; letter-spacing: .03em;
		padding: 0.9rem 0.6rem; border-radius: 999px; cursor: pointer; transition: background .15s, color .15s; }
	.tabs button.active { background: linear-gradient(135deg, #4ecdc4, #33b8ae); color: #06211f; }
	.close { flex: 0 0 auto; width: 3rem; height: 3rem; border-radius: 50%; background: rgba(255,255,255,.08);
		border: 1px solid rgba(255,255,255,.15); color: #fff; font-size: 1.8rem; line-height: 1; cursor: pointer; }

	.body { flex: 1 1 auto; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 1rem 0.9rem 2rem; }

	/* ── Missions ── */
	.list { display: flex; flex-direction: column; gap: 0.9rem; }
	.card { display: flex; gap: 1rem; align-items: flex-start; background: rgba(255,255,255,.04);
		border: 1px solid rgba(255,255,255,.08); border-radius: 14px; padding: 1.1rem; }
	.icon { flex: 0 0 auto; width: 4.8rem; height: 4.8rem; border-radius: 10px; background: rgba(245,165,36,.14);
		display: flex; align-items: center; justify-content: center; font-size: 2.3rem; }

	.radial { flex: 0 0 auto; width: 4.8rem; height: 4.8rem; }
	.radial-track { fill: none; stroke: rgba(255,255,255,.1); stroke-width: 6; }
	.radial-fill { fill: none; stroke: #4ecdc4; stroke-width: 6; stroke-linecap: round;
		transform: rotate(-90deg); transform-origin: 32px 32px; transition: stroke-dashoffset .4s ease; }
	.radial-label { fill: #fff; font-size: 15px; font-weight: 700; font-family: 'Jura', system-ui, sans-serif; }

	.info { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 0.45rem; }
	.row-top { display: flex; align-items: baseline; justify-content: space-between; gap: 0.6rem; flex-wrap: wrap; }
	.title { font-size: clamp(1.45rem, 5.6vw, 1.8rem); font-weight: 700; color: #fff; }
	.reward { flex: 0 0 auto; font-size: clamp(1.05rem, 4vw, 1.25rem); font-weight: 700; color: #ffe9a0;
		background: rgba(255,216,58,.12); padding: 0.3rem 0.7rem; border-radius: 999px; white-space: nowrap; }
	.desc { font-size: clamp(1.25rem, 4.6vw, 1.5rem); color: rgba(255,255,255,.8); line-height: 1.4; }

	.bar-track { height: 0.75rem; border-radius: 999px; background: rgba(255,255,255,.1); overflow: hidden; margin-top: 0.25rem; }
	.bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #f5a524, #ffe9a0);
		transition: width .4s ease; }
	.bar-label { font-size: clamp(1.05rem, 3.8vw, 1.25rem); color: rgba(255,255,255,.65); font-variant-numeric: tabular-nums; }

	/* ── Leaderboard ── */
	.board { display: flex; flex-direction: column; gap: 0.6rem; }
	.lrow { display: flex; align-items: center; gap: 0.9rem; background: rgba(255,255,255,.04);
		border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 0.9rem 1rem; }
	.lrow.me { border-color: rgba(78,205,196,.5); background: rgba(78,205,196,.1); }
	.rank { flex: 0 0 auto; width: 2.6rem; text-align: center; font-weight: 800;
		font-size: clamp(1.4rem, 5.2vw, 1.7rem); color: rgba(255,255,255,.55); }
	.rank.top { color: #ffd83a; }
	.name { flex: 1 1 auto; font-size: clamp(1.35rem, 5vw, 1.6rem); font-weight: 600; color: #fff;
		overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.score { flex: 0 0 auto; font-size: clamp(1.35rem, 5vw, 1.6rem); font-weight: 700; color: #ffe9a0;
		font-variant-numeric: tabular-nums; }

	@media (max-width: 380px) {
		.drawer { width: 100vw; }
	}
</style>
