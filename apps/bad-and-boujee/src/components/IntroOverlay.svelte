<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	type Feature = { icon: string; image?: string; title: string; subtitle: string };
	type Props = {
		logoUrl: string;
		bgUrl?: string;
		studioName?: string;
		tagline?: string;
		features?: Feature[];
		ondismiss: () => void;
	};

	const props: Props = $props();
	const studioName = props.studioName ?? 'Atomic-Labs';
	const tagline = props.tagline ?? 'Fortune Favours The Brave';
	const features: Feature[] = props.features ?? [
		{ icon: '💥', image: '/assets/features/1.png', title: 'Tumbling Reels', subtitle: 'Winning symbols vanish — new ones drop in for more wins' },
		{ icon: '🎁', image: '/assets/features/2.png', title: 'Free Spins', subtitle: 'Land Scatters across the reels to trigger the bonus' },
		{ icon: '💰', image: '/assets/features/3.png', title: '5,000× Max Win', subtitle: 'Chase the biggest treasure payout' },
	];

	let phase = $state<'studio' | 'features'>('studio');
	let progress = $state(0);
	let current = $state(0);
	let imgFailed = $state<boolean[]>(features.map(() => false));
	let carouselTimer: ReturnType<typeof setInterval> | null = null;

	const STUDIO_MS = 3000;

	onMount(() => {
		const start = performance.now();
		let raf = 0;
		const step = (now: number) => {
			progress = Math.min(100, Math.round(((now - start) / STUDIO_MS) * 100));
			if (progress < 100) raf = requestAnimationFrame(step);
			else {
				phase = 'features';
				carouselTimer = setInterval(() => { current = (current + 1) % features.length; }, 3000);
			}
		};
		raf = requestAnimationFrame(step);
		return () => { cancelAnimationFrame(raf); if (carouselTimer) clearInterval(carouselTimer); };
	});

	function dismiss() {
		if (phase !== 'features') return;
		if (carouselTimer) clearInterval(carouselTimer);
		props.ondismiss();
	}
</script>

{#if phase === 'studio'}
	<div class="studio" out:fade={{ duration: 400 }}>
		<div class="studio-inner">
			<div class="studio-name" in:fly={{ y: 26, duration: 700 }}>{studioName}</div>
			<div class="studio-rule" in:fade={{ delay: 300, duration: 700 }}></div>
			<div class="studio-tag" in:fade={{ delay: 450, duration: 800 }}>{tagline}</div>
			<div class="pbar" in:fade={{ delay: 600, duration: 600 }}>
				<div class="pbar-fill" style="width:{progress}%"></div>
			</div>
			<div class="pbar-label">Loading… {progress}%</div>
		</div>
	</div>
{:else}
	<div
		class="features"
		style="background-image:linear-gradient(rgba(4,10,14,.35),rgba(4,10,14,.62)),url({props.bgUrl});"
		role="button" tabindex="0" onclick={dismiss} onkeydown={(e) => e.key === 'Enter' && dismiss()}
		in:fade={{ duration: 500 }}
	>
		<img class="logo" src={props.logoUrl} alt="game logo" in:fly={{ y: -24, duration: 600 }} />

		<div class="carousel">
			{#each features as f, i}
				{#if i === current}
					<div class="fbox" in:scale={{ duration: 520, easing: backOut, start: 0.7 }}>
						<div class="fbox-art">
							{#if f.image && !imgFailed[i]}
								<img src={f.image} alt={f.title} onerror={() => (imgFailed[i] = true)} />
							{:else}
								<div class="fbox-icon">{f.icon}</div>
							{/if}
						</div>
						<div class="fbox-title">{f.title}</div>
						<div class="fbox-sub">{f.subtitle}</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class="dots">
			{#each features as _f, i}<span class="dot" class:on={i === current}></span>{/each}
		</div>

		<div class="tap">Press to continue</div>
	</div>
{/if}

<style>
	.studio, .features { position: fixed; inset: 0; z-index: 500; user-select: none; overflow: hidden; }

	/* ── Studio splash ─────────────────────────────────────────────── */
	.studio { display: flex; align-items: center; justify-content: center; background: #000; }
	.studio-inner { position: relative; text-align: center; padding: 0 6vw; width: 100%; box-sizing: border-box; }

	.studio-name { position: relative; display: inline-block;
		font-family: 'Megrim', system-ui, sans-serif; font-weight: 700; letter-spacing: 0.08em;
		font-size: clamp(3.6rem, 17vw, 8rem); line-height: 1; color: #ffe9a0;
		text-shadow: 0 0 1.8rem rgba(240,196,80,.55), 0 0.2rem 0.6rem rgba(0,0,0,.6); }

	.studio-rule { width: min(72%, 34rem); height: 0.14rem; margin: 1.4rem auto;
		background: linear-gradient(90deg, transparent, rgba(245,197,24,.9), transparent); }
	.studio-tag { font-family: 'Jura', system-ui, sans-serif; font-weight: 600;
		letter-spacing: 0.34em; text-transform: uppercase;
		font-size: clamp(0.95rem, 4vw, 1.6rem); color: #eaf3f2; opacity: .95; }
	.pbar { width: min(74%, 30rem); height: 0.8rem; margin: 2.6rem auto 0.8rem;
		background: rgba(255,255,255,.12); border-radius: 1rem; overflow: hidden;
		box-shadow: inset 0 0 0 0.08rem rgba(245,197,24,.35); }
	.pbar-fill { height: 100%; background: linear-gradient(90deg, #e0932f, #ffe9a0);
		box-shadow: 0 0 1rem rgba(240,196,80,.6); border-radius: 1rem; transition: width .1s linear; }
	.pbar-label { font-family: 'Jura', system-ui, sans-serif; font-size: 1rem;
		letter-spacing: .18em; color: #cfe; opacity: .72; }

	/* ── Feature page (on the themed game background) ──────────────── */
	.features { display: flex; flex-direction: column; align-items: center; justify-content: space-between;
		gap: 1.4rem; padding: 5vh 5vw 7vh; box-sizing: border-box;
		background-size: cover; background-position: center; cursor: pointer;
		font-family: 'Jura', system-ui, sans-serif; }
	.logo { width: min(78%, 26rem); height: auto; margin-top: 1vh;
		filter: drop-shadow(0 0.5rem 1.2rem rgba(0,0,0,.6)); }

	.carousel { flex: 1 1 auto; width: min(94%, 32rem); display: flex; align-items: center; justify-content: center; }
	.fbox { width: 100%; box-sizing: border-box; padding: 1.8rem 1.6rem 2.2rem; text-align: center; border-radius: 1.4rem;
		background: linear-gradient(180deg, rgba(18,40,33,.95), rgba(8,18,15,.97));
		border: 0.24rem solid #e0932f;
		box-shadow: 0 0 0 0.32rem rgba(20,40,34,.9), 0 0.9rem 2.2rem rgba(0,0,0,.6), inset 0 0 2.6rem rgba(224,147,47,.16); }
	.fbox-art { height: 8.5rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
	.fbox-art img { max-height: 8.5rem; max-width: 90%; object-fit: contain;
		filter: drop-shadow(0 0.4rem 0.8rem rgba(0,0,0,.5)); animation: bob 2.6s ease-in-out infinite; }
	.fbox-icon { font-size: 5.5rem; line-height: 1; animation: bob 2.6s ease-in-out infinite; }
	@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-0.5rem); } }
	.fbox-title { font-size: 2.2rem; font-weight: 700; letter-spacing: .02em; color: #f7d271; margin-bottom: 0.6rem;
		text-shadow: 0 0.1rem 0.3rem rgba(0,0,0,.5); }
	.fbox-sub { font-size: 1.35rem; font-weight: 500; line-height: 1.4; color: #eef5f2; opacity: .96; }

	.dots { display: flex; gap: .7rem; }
	.dot { width: .75rem; height: .75rem; border-radius: 50%; background: rgba(255,255,255,.4); transition: all .25s;
		box-shadow: 0 0.1rem 0.3rem rgba(0,0,0,.5); }
	.dot.on { background: #ffd83a; transform: scale(1.35); }

	.tap { font-family: 'Jura', system-ui, sans-serif; font-weight: 700;
		letter-spacing: .22em; text-transform: uppercase; font-size: 1.45rem; color: #ffe9a0;
		text-shadow: 0 0.15rem 0.4rem rgba(0,0,0,.75); animation: pulse 1.4s ease-in-out infinite; }
	@keyframes pulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
</style>
