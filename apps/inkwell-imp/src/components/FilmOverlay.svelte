<script lang="ts">
	import { onMount } from 'svelte';

	// Old-cartoon look over the whole game (THEME.film): jittering film grain, a soft projector
	// flicker and a dark vignette. Pure CSS over the canvas, so it costs almost nothing and never
	// takes a tap.
	let grain = $state('');

	onMount(() => {
		const size = 160;
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = size;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const image = ctx.createImageData(size, size);
		for (let i = 0; i < image.data.length; i += 4) {
			const v = Math.random() * 255;
			image.data[i] = image.data[i + 1] = image.data[i + 2] = v;
			image.data[i + 3] = Math.random() < 0.5 ? 0 : 40;
		}
		ctx.putImageData(image, 0, 0);
		grain = canvas.toDataURL();
	});
</script>

<div class="film" aria-hidden="true">
	{#if grain}<div class="grain" style:background-image="url({grain})"></div>{/if}
	<div class="flicker"></div>
	<div class="vignette"></div>
</div>

<style>
	.film { position: fixed; inset: 0; z-index: 80; pointer-events: none; overflow: hidden; }
	.grain {
		position: absolute; inset: -50%; opacity: 0.5; mix-blend-mode: overlay;
		animation: jitter 0.5s steps(5) infinite;
	}
	.flicker { position: absolute; inset: 0; background: #fff8e0; mix-blend-mode: soft-light; animation: flicker 3.2s infinite; }
	.vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.55) 100%); }
	@keyframes jitter {
		0% { transform: translate(0, 0); }
		20% { transform: translate(-7%, 4%); }
		40% { transform: translate(5%, -6%); }
		60% { transform: translate(-3%, 8%); }
		80% { transform: translate(8%, 2%); }
		100% { transform: translate(-5%, -4%); }
	}
	@keyframes flicker {
		0%, 100% { opacity: 0.04; }
		8% { opacity: 0.1; }
		10% { opacity: 0.02; }
		47% { opacity: 0.07; }
		50% { opacity: 0.12; }
		53% { opacity: 0.03; }
		81% { opacity: 0.08; }
	}
	@media (prefers-reduced-motion: reduce) { .grain, .flicker { animation: none; } }
</style>
