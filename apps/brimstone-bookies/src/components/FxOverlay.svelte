<script lang="ts">
	import { onMount } from 'svelte';
	import { fx } from '../game/fx.svelte';

	// Screen texture over the whole game, Hacksaw-style: light grain and a vignette always; in
	// the bonus a pulsing red vignette, drifting red haze and rising embers. CSS only, never
	// takes a tap.
	let grain = $state('');
	const embers = Array.from({ length: 22 }, (_, i) => ({
		left: (i * 37) % 100,
		delay: -((i * 1.7) % 9),
		duration: 6 + ((i * 2.3) % 5),
		size: 3 + (i % 4),
	}));

	onMount(() => {
		const size = 160;
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = size;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const image = ctx.createImageData(size, size);
		for (let i = 0; i < image.data.length; i += 4) {
			const v = Math.random() * 255;
			image.data.fill(v, i, i + 3);
			image.data[i + 3] = Math.random() < 0.5 ? 0 : 34;
		}
		ctx.putImageData(image, 0, 0);
		grain = canvas.toDataURL();
	});
</script>

<div class="fx" aria-hidden="true">
	{#if grain}<div class="grain" style:background-image="url({grain})"></div>{/if}
	<div class="vignette"></div>
	<div class="bonus" class:on={fx.bonus}>
		<div class="redglow"></div>
		<div class="haze"></div>
		{#each embers as e}
			<span
				class="ember"
				style:left="{e.left}%"
				style:width="{e.size}px"
				style:height="{e.size}px"
				style:animation-delay="{e.delay}s"
				style:animation-duration="{e.duration}s"
			></span>
		{/each}
	</div>
</div>

<style>
	.fx { position: fixed; inset: 0; z-index: 40; pointer-events: none; overflow: hidden; }
	.grain { position: absolute; inset: -50%; opacity: 0.45; mix-blend-mode: overlay; animation: jitter 0.6s steps(5) infinite; }
	.vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 58%, rgba(0, 0, 0, 0.5) 100%); }
	.bonus { position: absolute; inset: 0; opacity: 0; transition: opacity 0.6s; }
	.bonus.on { opacity: 1; }
	.redglow {
		position: absolute; inset: 0;
		background: radial-gradient(ellipse at center, transparent 50%, rgba(63, 207, 94, 0.42) 100%);
		animation: pulse 2.4s ease-in-out infinite;
	}
	.haze {
		position: absolute; inset: -20%;
		background: radial-gradient(circle at 20% 80%, rgba(63, 207, 94, 0.16), transparent 40%),
			radial-gradient(circle at 80% 30%, rgba(63, 207, 94, 0.12), transparent 45%);
		animation: drift 14s ease-in-out infinite alternate;
	}
	.ember {
		position: absolute; bottom: -10px; border-radius: 50%;
		background: #F7C23A; box-shadow: 0 0 8px 2px rgba(247, 194, 58, 0.8);
		animation-name: rise; animation-timing-function: linear; animation-iteration-count: infinite;
	}
	@keyframes jitter {
		0% { transform: translate(0, 0); } 20% { transform: translate(-7%, 4%); } 40% { transform: translate(5%, -6%); }
		60% { transform: translate(-3%, 8%); } 80% { transform: translate(8%, 2%); } 100% { transform: translate(-5%, -4%); }
	}
	@keyframes pulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
	@keyframes drift { from { transform: translate(-4%, 2%); } to { transform: translate(4%, -3%); } }
	@keyframes rise {
		0% { transform: translate(0, 0); opacity: 0; } 10% { opacity: 1; }
		50% { transform: translate(18px, -50vh); } 100% { transform: translate(-12px, -105vh); opacity: 0; }
	}
	@media (prefers-reduced-motion: reduce) { .grain, .redglow, .haze, .ember { animation: none; } }
</style>
