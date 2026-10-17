<script lang="ts">
	import * as PIXI from 'pixi.js';
	import { onMount, onDestroy, type Snippet } from 'svelte';
	import { devicePixelRatio } from 'svelte/reactivity/window';

	import { getContextApp } from '../context.svelte';
	import { preloadFont } from '../utils.svelte';

	type Props = { children: Snippet };

	const props: Props = $props();
	const context = getContextApp();

	let wrap: HTMLDivElement;
	let initialised = $state(false);

	const initialiseApplication = async () => {
		PIXI.Assets.reset();

		await preloadFont();
		// Capped at 2: phones report 3, which renders 2.25x the pixels of 2 for no visible gain and
		// keeps the GPU at full load (the phone gets hot, then throttles and the game slows down).
		// At 2x density edges are already smooth, so multisampling is only paid for below that.
		const resolution = Math.min(devicePixelRatio.current ?? 1, 2);
		context.stateApp.pixiApplication = new PIXI.Application<PIXI.Renderer<HTMLCanvasElement>>();
		await context.stateApp.pixiApplication.init({
			autoDensity: true,
			backgroundAlpha: 0,
			hello: true,
			multiView: false,
			antialias: resolution < 2,
			clearBeforeRender: true,
			preference: 'webgpu',
			powerPreference: 'high-performance',
			resolution,
			resizeTo: window,
		});

		wrap.appendChild(context.stateApp.pixiApplication.canvas);

		// to prevent that you can't scroll the page with touch on the canvas. https://github.com/pixijs/pixijs/issues/4824
		context.stateApp.pixiApplication.renderer.events.autoPreventDefault = false;
		context.stateApp.pixiApplication.renderer.canvas.style.touchAction = 'auto';
	};

	onMount(async () => {
		try {
			if (!initialised) await initialiseApplication();
			initialised = true;
		} catch (error) {
			console.error(error);
		}
	});

	onDestroy(() => {
		if (context.stateApp.pixiApplication) {
			context.stateApp.pixiApplication.destroy();
		}
	});
</script>

<div bind:this={wrap}>
	{#if initialised}
		{@render props.children()}
	{/if}
</div>

<style>
	/* Game layouts wrap <GlobalStyle> in <div class:intro-active={introVisible}>.
	   WebGPU/WebGL canvases get their own GPU compositor layer and render above
	   position:fixed HTML overlays regardless of z-index. visibility:hidden is
	   the only CSS property that suppresses the compositor layer entirely. */
	:global(.intro-active canvas) { visibility: hidden; }
</style>
