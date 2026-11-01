<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { stateApp } from '../game/stateApp';
	import { INTRO_PANELS, THEME } from '../game/theme';

	// THEME.intro: three Hacksaw-style feature panels under the logo (a sign board each, with an icon
	// on top and the feature's title and line of text on the board)
	const ICONS = ['icon_wild', 'icon_bonus', 'icon_maxwin'];
	const panels = THEME.intro
		? ((THEME as { introPanels?: typeof INTRO_PANELS }).introPanels ?? INTRO_PANELS).map((panel, i) => ({
				...panel,
				icon: `./assets/theme/intro/${ICONS[i]}.webp`,
			}))
		: [];
	const panelUrl = './assets/theme/intro/panel.webp';

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
	// JavaScript loads, and this component only feeds it progress (window.__boot.set, shown on the
	// logo's chip ring) and asks it to finish, so the screen is never re-rendered. Progress follows
	// the real loading (art, mascot and audio), and the screen only leaves once everything is in, so
	// the board, mascot and sound are ready on the tap.
	type BootSplash = { t0: number; set: (p: number) => void; finish: () => Promise<void> };
	const MIN_MS = 3000; // long enough for the logo, studio name and tagline to finish animating in
	const ASSET_TIMEOUT_MS = 8000;
	const HARD_TIMEOUT_MS = 30000; // never trap the player on the splash (e.g. an auth error behind it)
	const AUDIO_GRACE_MS = 6000; // on a slow network, stop waiting for the audio this long after the art

	// The Pixi loader only fetches sounds.json; Howler downloads and decodes the audio file itself
	// once EnableSound mounts. Wait for that too, so music and effects work from the first spin.
	// howler.js exposes its global on window; the app doesn't depend on it directly.
	const audioReady = () => {
		const howls = (window as { Howler?: { _howls: { state: () => string }[] } }).Howler?._howls ?? [];
		// only the first sprite: the bonus music downloads after it, while the player is playing
		return howls.length > 0 && howls[0].state() === 'loaded';
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
		const boot = (window as unknown as { __boot?: BootSplash }).__boot;
		// Measured from the splash's first frame; until that frame (it never comes in a background
		// tab) fall back to page open, so the player is never held on the splash.
		const sinceSplash = (now: number) => (boot && boot.t0 <= now ? now - boot.t0 : now);

		let imagesReady = false;
		const urls = [props.logoUrl, props.bgUrl, ...(panels.length ? [panelUrl, ...panels.map((p) => p.icon)] : [])].filter(
			(u): u is string => !!u,
		);
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
			const audioDone = true; // this game ships without audio
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

			boot?.set(shown / 100);

			if (!done && shown >= 100 && sinceSplash(now) >= MIN_MS) {
				done = true;
				clearInterval(id);
				// finish() lets the ring's last segment light, bursts, then fades over the logo screen
				stateApp.releaseLazy(); // bonus art downloads while the player is on the tap screen
				if (boot) boot.finish().then(() => (phase = 'features'));
				else phase = 'features';
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
		<img class="logo" class:small={panels.length} src={props.logoUrl} alt="game logo" in:scale={{ duration: 700, easing: backOut, start: 0.6 }} />
		{#if panels.length}
			<div class="panels">
				{#each panels as panel, i}
					<div class="panel" style:background-image="url({panelUrl})" in:scale={{ duration: 600, delay: 250 + i * 140, easing: backOut, start: 0.5 }}>
						<img class="icon" src={panel.icon} alt="" />
						<div class="board">
							<div class="title">{panel.title}</div>
							<div class="text">{panel.text}</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
		<div class="tap" class:chunky={panels.length}>{panels.length ? 'Tap to continue' : 'Tap to play'}</div>
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

	/* ── Feature panels (THEME.intro) ─────────────────────────────── */
	.logo.small { width: min(70%, 26rem); max-height: 24vh; }
	.panels {
		display: flex; justify-content: center; align-items: flex-end;
		gap: clamp(0.4rem, 2vw, 2rem); width: 100%; max-width: 64rem;
	}
	.panel {
		position: relative; flex: 0 1 15rem; aspect-ratio: 3 / 4; max-height: 46vh;
		background: center / contain no-repeat;
		filter: drop-shadow(0 0.6rem 1.2rem rgba(0,0,0,.55));
	}
	/* the icon sits on the top of the sign and overhangs it a little */
	.icon { position: absolute; left: 50%; top: -9%; width: 68%; transform: translateX(-50%); }
	.board {
		position: absolute; left: 11%; right: 11%; top: 47%; bottom: 8%;
		display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 0.35em;
		text-align: center; font-size: clamp(0.6rem, 1.7vw, 1.15rem); line-height: 1.15;
	}
	.title, .chunky {
		font-family: 'Arial Black', 'Avenir Next', system-ui, sans-serif; font-weight: 900;
		text-transform: uppercase; letter-spacing: 0.02em;
	}
	.title {
		font-size: 1.25em; color: #ffd24a;
		text-shadow: 0 0.12em 0 #4a2208, 0 0 0.3em rgba(0,0,0,.6);
		-webkit-text-stroke: 0.04em #4a2208;
	}
	.text { color: #fff4dc; font-weight: 700; text-shadow: 0 0.1em 0.2em rgba(0,0,0,.85); }
	.tap.chunky {
		font-size: clamp(1.1rem, 3.2vw, 2rem); letter-spacing: 0.04em; color: #ffd24a;
		text-shadow: 0 0.12em 0 #4a2208, 0 0 0.5em rgba(0,0,0,.7);
	}

	@media (orientation: portrait) {
		.panel { flex-basis: 31vw; }
		.board { font-size: clamp(0.5rem, 2.8vw, 1rem); }
	}

	@media (orientation: landscape) and (min-width: 900px) {
		.logo { width: min(55%, 28rem); }
	}
	@media (max-height: 500px) {
		.features { gap: 3vh; }
		.logo { width: min(60%, 20rem); }
		.tap { font-size: 0.9rem; }
	}
</style>
