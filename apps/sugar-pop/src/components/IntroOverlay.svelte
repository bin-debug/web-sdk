<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	type Props = {
		logoUrl: string;
		bgUrl?: string;
		studioName?: string;
		tagline?: string;
		features?: unknown[];
		ondismiss: () => void;
	};

	const props: Props = $props();
	const studioName = props.studioName ?? 'Atomic-Labs';
	const tagline = props.tagline ?? 'Fortune Favors The Brave';

	let phase = $state<'studio' | 'features'>('studio');
	let progress = $state(0);

	const STUDIO_MS = 3000;

	onMount(() => {
		const start = performance.now();
		let raf = 0;
		const step = (now: number) => {
			progress = Math.min(100, Math.round(((now - start) / STUDIO_MS) * 100));
			if (progress < 100) raf = requestAnimationFrame(step);
			else phase = 'features';
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	});

	function dismiss() {
		if (phase !== 'features') return;
		props.ondismiss();
	}
</script>

{#if phase === 'studio'}
	<div class="studio" out:fade={{ duration: 400 }}>
		<div class="studio-inner">
			<div class="studio-name" in:fade={{ duration: 600 }}>{studioName}</div>
			<div class="studio-rule" in:fade={{ delay: 200, duration: 600 }}></div>
			<div class="studio-tag" in:fade={{ delay: 350, duration: 700 }}>{tagline}</div>
			<div class="pbar" in:fade={{ delay: 500, duration: 600 }}>
				<div class="pbar-fill" style="width:{progress}%"></div>
			</div>
			<div class="pbar-label">Loading… {progress}%</div>
		</div>
	</div>
{:else}
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
	.studio, .features { position: fixed; inset: 0; z-index: 500; user-select: none; overflow: hidden; }

	/* ── Studio splash ─────────────────────────────────────────────── */
	.studio { display: flex; align-items: center; justify-content: center; background: #000; }
	.studio-inner { text-align: center; padding: 0 6vw; width: 100%; box-sizing: border-box; }

	.studio-name {
		font-family: 'Megrim', system-ui, sans-serif; font-weight: 700; letter-spacing: 0.08em;
		font-size: clamp(3.6rem, 17vw, 8rem); line-height: 1; color: #ffe9a0;
		text-shadow: 0 0 1.8rem rgba(240,196,80,.55), 0 0.2rem 0.6rem rgba(0,0,0,.6);
	}
	.studio-rule {
		width: min(72%, 34rem); height: 0.14rem; margin: 1.4rem auto;
		background: linear-gradient(90deg, transparent, rgba(245,197,24,.9), transparent);
	}
	.studio-tag {
		font-family: 'Jura', system-ui, sans-serif; font-weight: 600;
		letter-spacing: 0.34em; text-transform: uppercase;
		font-size: clamp(0.95rem, 4vw, 1.6rem); color: #eaf3f2; opacity: .95;
	}
	.pbar {
		width: min(74%, 30rem); height: 0.8rem; margin: 2.6rem auto 0.8rem;
		background: rgba(255,255,255,.12); border-radius: 1rem; overflow: hidden;
		box-shadow: inset 0 0 0 0.08rem rgba(245,197,24,.35);
	}
	.pbar-fill {
		height: 100%; background: linear-gradient(90deg, #e0932f, #ffe9a0);
		box-shadow: 0 0 1rem rgba(240,196,80,.6); border-radius: 1rem; transition: width .1s linear;
	}
	.pbar-label {
		font-family: 'Jura', system-ui, sans-serif; font-size: 1rem;
		letter-spacing: .18em; color: #cfe; opacity: .72;
	}

	/* ── Logo screen ───────────────────────────────────────────────── */
	.features {
		display: flex; flex-direction: column; align-items: center; justify-content: center;
		gap: 6vh; padding: 4vh 4vw; box-sizing: border-box;
		background-size: cover; background-position: center; cursor: pointer;
		font-family: 'Jura', system-ui, sans-serif; height: 100dvh;
	}

	.logo {
		width: min(88%, 36rem); height: auto; object-fit: contain;
		filter: drop-shadow(0 0 2.5rem rgba(255,220,80,.35)) drop-shadow(0 0.8rem 2rem rgba(0,0,0,.7));
		animation: logopulse 2.2s ease-in-out infinite;
	}
	@keyframes logopulse {
		0%,100% { transform: scale(1);    filter: drop-shadow(0 0 2.5rem rgba(255,220,80,.35)) drop-shadow(0 0.8rem 2rem rgba(0,0,0,.7)); }
		50%      { transform: scale(1.06); filter: drop-shadow(0 0 4.5rem rgba(255,220,80,.75)) drop-shadow(0 0.8rem 2rem rgba(0,0,0,.7)); }
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
