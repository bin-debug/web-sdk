<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { fx } from '../game/fx.svelte';

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);
	const OVERSCAN = 24; // px of bleed so edges never expose the black backdrop

	// The bonus background fades in over the base one. The transition sets fx.bonus while the
	// screen is covered; a resumed bonus round (no transition) turns it on from the game state.
	$effect(() => {
		if (context.stateGame.gameType === 'freegame') fx.bonus = true;
	});
	const bonusAlpha = new Tween(0);
	$effect(() => {
		bonusAlpha.set(fx.bonus ? 1 : 0, { duration: 400 });
	});

	const cover = $derived({
		anchor: 0.5,
		x: canvas.width / 2,
		y: canvas.height / 2,
		width: canvas.width + OVERSCAN * 2,
		height: canvas.height + OVERSCAN * 2,
	});
</script>

<Rectangle x={0} y={0} width={canvas.width} height={canvas.height} backgroundColor={0x000000} zIndex={-3} />

<Sprite key={isLandscape ? 'bgDesktop' : 'bgMobile'} {...cover} zIndex={-2} />
{#if bonusAlpha.current > 0.001}
	<Sprite key={isLandscape ? 'bgBonusDesktop' : 'bgBonusMobile'} {...cover} alpha={bonusAlpha.current} zIndex={-2} />
{/if}
