<script lang="ts">
	import { type Snippet, onMount } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoadI18n } from 'components-shared';
	import { stateModal } from 'state-shared';
	import Game from '../components/Game.svelte';
	import IntroOverlay from '../components/IntroOverlay.svelte';
	import MissionsDrawer from '../components/MissionsDrawer.svelte';
	import { setContext } from '../game/context';
	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };
	const props: Props = $props();

	let introVisible = $state(true);
	const introFeatures = [{"icon":"🪨","image":"/assets/features/feature1.png","title":"Cluster Pays","subtitle":"Match 5+ adjacent symbols to win big"},{"icon":"🎁","image":"/assets/features/feature2.png","title":"Free Spins","subtitle":"Land Scatters to trigger the bonus round"},{"icon":"💰","image":"/assets/features/feature3.png","title":"5,000× Max Win","subtitle":"Draw fast, win biggest"}];
	let tickerItems = $state<string[]>(["🎉 MEGA JACKPOT starts 25 Dec, 20:00","🥇 1st Prize  R50,000","🥈 2nd Prize  R20,000","🥉 3rd Prize  R10,000","⭐ Daily Drop every hour — could be YOU"]);
	let timeStr = $state('');
	onMount(() => {
		const tick = () => { const n = new Date(); timeStr = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0'); };
		tick(); const id = setInterval(tick, 10000); return () => clearInterval(id);
	});

	setContext();

	// Ticker + game/studio name bar (and the missions drawer) hide while the
	// Buy Bonus screen is open, and come straight back the instant it closes —
	// driven off stateModal directly, so there's no separate restore step.
	const bonusModalOpen = $derived(stateModal.modal?.name === 'buyBonus');
</script>

<GlobalStyle>
	<Authenticate>
		<LoadI18n {messagesMap}>
			<Game />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>

{#if introVisible}
	<IntroOverlay
		logoUrl="/assets/sprites/game/logo.png"
		bgUrl="/assets/sprites/game/bg-mobile.png"
		studioName="Atomic-Labs"
		tagline="Fortune Favors the Brave"
		features={introFeatures}
		ondismiss={() => (introVisible = false)}
	/>
{/if}

{@render props.children()}

{#if !introVisible && tickerItems.length && !bonusModalOpen}
	<div class="ticker">
		<div class="ticker__viewport">
			<div class="ticker__track">
				{#each [0, 1] as _dup}
					{#each tickerItems as msg}<span class="ticker__item">{msg}</span><span class="ticker__sep">✦</span>{/each}
				{/each}
			</div>
		</div>
	</div>
{/if}

{#if !introVisible && !bonusModalOpen}
	<div class="top-bar">
		<div class="tb-left">
			<span class="tb-time">{timeStr}</span>
			<span class="tb-name">Shamrocks and Shenanigans</span>
		</div>
		<span class="tb-company">Atomic-Labs</span>
	</div>
{/if}

{#if !introVisible && !bonusModalOpen}
	<MissionsDrawer />
{/if}

{#if !introVisible && !bonusModalOpen}
	<img class="game-logo" src="/assets/sprites/game/logo.png" alt="Shamrocks and Shenanigans" />
{/if}

<style>
	.ticker { position: fixed; left: 0; right: 0; top: 0; height: 30px; z-index: 91;
		display: flex; align-items: center; pointer-events: none;
		background: linear-gradient(90deg, rgba(20,8,30,.82), rgba(40,16,55,.82));
		border-bottom: 1px solid rgba(245,197,24,.5); box-shadow: 0 2px 10px rgba(0,0,0,.35);
		overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
	.ticker__viewport { flex: 1 1 auto; overflow: hidden; }
	.ticker__track { display: inline-flex; align-items: center; white-space: nowrap;
		will-change: transform; animation: ticker-scroll 22s linear infinite; }
	.ticker__item { color: #ffe9a0; font-size: 13px; font-weight: 600; padding: 0 6px; }
	.ticker__sep { color: rgba(245,197,24,.65); font-size: 11px; padding: 0 4px; }
	@keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
	.top-bar { position: fixed; left: 0; right: 0; top: 30px; height: 26px; z-index: 90;
		display: flex; align-items: center; justify-content: space-between; padding: 0 12px; pointer-events: none;
		background: linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,0));
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
	.tb-left { display: inline-flex; align-items: baseline; gap: 8px; }
	.tb-time { color: #fff; font-size: 12px; font-weight: 600; }
	.tb-name { color: #ffe9a0; font-size: 12px; font-weight: 600; }
	.tb-company { color: #fff; font-size: 11px; font-weight: 600; opacity: .9; }
	.game-logo { position: fixed; top: 100px; left: 12px; height: 180px; width: auto;
		z-index: 89; pointer-events: none; filter: drop-shadow(0 2px 6px rgba(0,0,0,.5)); display: none;
		animation: logo-pulse 3s ease-in-out infinite; }
	@keyframes logo-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.04); opacity: 0.92; } }
	@media (min-width: 1024px) and (orientation: landscape) { .game-logo { display: block; } }
</style>
