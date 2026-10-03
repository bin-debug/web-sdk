<script lang="ts">
	import { type Snippet, onMount } from 'svelte';
	import { GlobalStyle } from 'components-ui-html';
	import { Authenticate, LoadI18n } from 'components-shared';
	import { stateModal } from 'state-shared';
	import Game from '../components/Game.svelte';
	import IntroOverlay from '../components/IntroOverlay.svelte';
	import FreeSpinAwardPopup from '../components/FreeSpinAwardPopup.svelte';
	import { setContext } from '../game/context';
	import messagesMap from '../i18n/messagesMap';

	type Props = { children: Snippet };
	const props: Props = $props();

	let introVisible = $state(true);
	// app.html starts with <html class="intro-active">, which hides the game canvas until the intro is dismissed.
	$effect(() => {
		document.documentElement.classList.toggle('intro-active', introVisible);
	});
	const introFeatures = [{"icon":"*","title":"Cluster Pays","subtitle":"Match 5+ adjacent symbols to win"},{"icon":"*","title":"Free Spins","subtitle":"Land Scatters to trigger the bonus round"},{"icon":"*","title":"2 500x Max Win","subtitle":"Chase the ultimate top prize"}];
	let timeStr = $state('');
	onMount(() => {
		const tick = () => { const n = new Date(); timeStr = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0'); };
		tick(); const id = setInterval(tick, 10000); return () => clearInterval(id);
	});

	setContext();

	// The game/studio name bar hides while the
	// Buy Bonus screen is open, and comes straight back the instant it closes —
	// driven off stateModal directly, so there's no separate restore step.
	const bonusModalOpen = $derived(stateModal.modal?.name === 'buyBonus');
</script>

<div class:intro-active={introVisible}>
<GlobalStyle>
	<Authenticate>
		<LoadI18n {messagesMap}>
			<Game />
			<FreeSpinAwardPopup />
		</LoadI18n>
	</Authenticate>
</GlobalStyle>
</div>

{#if introVisible}
	<IntroOverlay
		logoUrl="./assets/sprites/game/logo.webp"
		bgUrl="./assets/sprites/game/bg-mobile.webp"
		studioName="Atomic-Labs"
		tagline="Fortune Favours The Brave"
		features={introFeatures}
		ondismiss={() => (introVisible = false)}
	/>
{/if}

{@render props.children()}

{#if !introVisible && !bonusModalOpen}
	<div class="top-bar">
		<div class="tb-left">
			<span class="tb-time">{timeStr}</span>
			<span class="tb-name">Jingle Bell Bonanza</span>
		</div>
		<span class="tb-company">Atomic-Labs</span>
	</div>
{/if}

{#if !introVisible && !bonusModalOpen}
	<img class="game-logo" src="./assets/sprites/game/logo.webp" alt="Jingle Bell Bonanza" />
{/if}

<style>
	.top-bar { position: fixed; left: 0; right: 0; top: 0; height: 26px; z-index: 90;
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
	:global(.intro-active canvas) { visibility: hidden; }
</style>
