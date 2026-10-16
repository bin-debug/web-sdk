<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);
	const OVERSCAN = 24; // px of bleed so edges never expose the black backdrop
</script>

<Rectangle x={0} y={0} width={canvas.width} height={canvas.height} backgroundColor={0x000000} zIndex={-3} />

<Sprite
	key={isLandscape ? 'bgDesktop' : 'bgMobile'}
	anchor={0.5}
	x={canvas.width / 2}
	y={canvas.height / 2}
	width={canvas.width + OVERSCAN * 2}
	height={canvas.height + OVERSCAN * 2}
	zIndex={-2}
/>
