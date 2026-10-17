<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { stateApp } from '../game/stateApp';

	type Props = {
		logoUrl: string;
		bgUrl?: string;
		studioName?: string;
		tagline?: string;
		features?: unknown[];
		ondismiss: () => void;
	};

	const props: Props = $props();
	let phase = $state<'studio' | 'features'>('studio');

	// The studio screen itself is #boot-splash in app.html: it is painted and animating before any
	// JavaScript loads, and this component only drives its progress bar and fades it out, so the
	// screen is never re-rendered. Progress follows the real loading (art, mascot and audio), and the
	// screen only leaves once everything is in, so the board, mascot and sound are ready on the tap.
	const MIN_MS = 1800; // long enough for the name and tagline to finish animating in
	const ASSET_TIMEOUT_MS = 8000;
	const HARD_TIMEOUT_MS = 30000; // never trap the player on the splash (e.g. an auth error behind it)
	const AUDIO_GRACE_MS = 6000; // on a slow network, stop waiting for the audio this long after the art

	// The Pixi loader only fetches sounds.json; Howler downloads and decodes the audio file itself
	// once EnableSound mounts. Wait for that too, so music and effects work from the first spin.
	// howler.js exposes its global on window; the app doesn't depend on it directly.
	const audioReady = () => {
		const howls = (window as { Howler?: { _howls: { state: () => string }[] } }).Howler?._howls ?? [];
		return howls.length > 0 && howls.every((h) => h.state() === 'loaded');
	};

	const preload = (url: string) =>
		new Promise<void>((resolve) => {
			const img = new Image();
			// decode() waits for a rendered frame, so it never settles in a background tab: start it, don't wait on it
			img.onload = () => {
				img.decode().catch(() => {});
				resolve();
			};
			img.onerror = () => resolve();
			img.src = url;
		});

	onMount(() => {
		const splash = document.getElementById('boot-splash');
		const fill = document.getElementById('boot-fill');
		const head = document.getElementById('boot-head');
		const label = document.getElementById('boot-pc');

		let imagesReady = false;
		const urls = [props.logoUrl, props.bgUrl].filter((u): u is string => !!u);
		const timeout = new Promise<void>((resolve) => setTimeout(resolve, ASSET_TIMEOUT_MS));
		Promise.race([Promise.all(urls.map(preload)), timeout]).then(() => (imagesReady = true));

		// A timer, not requestAnimationFrame: rAF stops in a background tab, which would leave the
		// player stuck on the splash. The bar's CSS transition does the smoothing.
		let shown = 0;
		let done = false;
		let artLoadedAt = 0;
		const start = performance.now();
		const tick = () => {
			const now = performance.now();
			const preDone = Object.keys(stateApp.loadedAssets).length > 0;
			if (stateApp.loaded && !artLoadedAt) artLoadedAt = now;
			const audioDone = audioReady() || (artLoadedAt > 0 && now - artLoadedAt > AUDIO_GRACE_MS);
			// preload set 0–40%, rest of the art 40–90%, audio decoded 90–100%
			let target = stateApp.loaded
				? audioDone
					? 100
					: 90
				: preDone
					? 40 + stateApp.loadingProgress * 0.5
					: Math.min(38, (now - start) / 40);
			if (!imagesReady) target = Math.min(target, 97);
			if (now > HARD_TIMEOUT_MS) target = 100;
			// the bar never moves backwards, and moves at most 12% per tick so it reads as filling
			shown = Math.max(shown, Math.min(target, shown + 12));

			if (fill) fill.style.transform = `scaleX(${shown / 100})`;
			if (head) head.style.left = `${shown}%`;
			if (label) label.textContent = `${Math.round(shown)}%`;

			if (!done && shown >= 100 && now >= MIN_MS) {
				done = true;
				clearInterval(id);
				// let the bar's last stretch finish before fading
				setTimeout(() => {
					phase = 'features';
					splash?.classList.add('out');
					setTimeout(() => splash?.remove(), 500);
				}, 300);
			}
		};
		const id = setInterval(tick, 80);
		tick();
		return () => clearInterval(id);
	});

	function dismiss() {
		if (phase !== 'features') return;
		props.ondismiss();
	}
</script>

<!-- Opaque backdrop: nothing behind the intro shows through while the two screens cross-fade. -->
<div class="backdrop"></div>

{#if phase === 'features'}
	<div
		class="features"
		style="background-image:linear-gradient(rgba(4,10,14,.45),rgba(4,10,14,.65)),url({props.bgUrl});"
		role="button" tabindex="0" onclick={dismiss} onkeydown={(e) => e.key === 'Enter' && dismiss()}
		in:fade={{ duration: 500 }}
	>
		<img class="logo" src={props.logoUrl} alt="game logo" in:scale={{ duration: 700, easing: backOut, start: 0.6 }} />
		<div class="tap">Tap to play</div>
	</div>
{/if}

<style>
	.features { position: fixed; inset: 0; z-index: 500; user-select: none; overflow: hidden; }
	.backdrop { position: fixed; inset: 0; z-index: 499; background: #000; }

	/* ── Logo screen ───────────────────────────────────────────────── */
	.features {
		display: flex; flex-direction: column; align-items: center; justify-content: center;
		gap: 6vh; padding: 4vh 4vw; box-sizing: border-box;
		background-size: cover; background-position: center; cursor: pointer;
		font-family: 'Jura', system-ui, sans-serif; height: 100vh; height: 100dvh;
	}

	.logo {
		width: min(88%, 36rem); height: auto; object-fit: contain;
		filter: drop-shadow(0 0 2.5rem rgba(255,220,80,.35)) drop-shadow(0 0.8rem 2rem rgba(0,0,0,.7));
		animation: logopulse 2.2s ease-in-out infinite;
	}
	@keyframes logopulse {
		0%,100% { transform: scale(1); }
		50%      { transform: scale(1.06); }
	}

	.tap {
		font-family: 'Jura', system-ui, sans-serif; font-weight: 700;
		letter-spacing: .22em; text-transform: uppercase;
		font-size: clamp(1rem, 3.5vw, 1.35rem); color: #ffe9a0;
		text-shadow: 0 0.15rem 0.4rem rgba(0,0,0,.75);
		animation: pulse 1.4s ease-in-out infinite;
		padding-bottom: env(safe-area-inset-bottom, 0);
	}
	@keyframes pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

	@media (orientation: landscape) and (min-width: 900px) {
		.logo { width: min(55%, 28rem); }
	}
	@media (max-height: 500px) {
		.features { gap: 3vh; }
		.logo { width: min(60%, 20rem); }
		.tap { font-size: 0.9rem; }
	}
</style>
