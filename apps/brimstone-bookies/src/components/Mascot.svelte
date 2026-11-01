<script lang="ts">
	import { Container, SpriteSheet } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Bruiser (bulldog) left of the board and The Guv'nor (fox) right of it, Coffee Dealer style:
	// one idle loop each. Each clip starts and ends on the same pose, so it loops straight through.
	const context = getContext();
	const bl = () => context.stateGameDerived.boardLayout();
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);

	const FPS = 12;
	const FRAME = 360; // px height of the (untrimmed) sprite-sheet frames

	// Landscape: either side of the reels, feet level with the bottom of the frame (the free-spins
	// counter sits above The Guv'nor). Portrait: on the pavement under the reels, one each side.
	const size = $derived(isLandscape ? bl().height * 0.66 : bl().width * 0.46);
	const sideX = $derived(isLandscape ? bl().width * 0.5 + size * 0.42 : bl().width * 0.27);
	const y = $derived(
		isLandscape ? bl().y + bl().height * 0.5 : bl().y + bl().height * 0.5 + bl().width * 0.53,
	);
	const mascots = $derived([
		{ key: 'mascotBruiser', x: bl().x - sideX },
		{ key: 'mascotGuvnor', x: bl().x + sideX },
	]);
</script>

<!-- Layout lives on the Container: changing any SpriteSheet prop re-applies its textures,
     which stops the animation (so resizes would freeze them). -->
{#each mascots as m (m.key)}
	{#if context.stateApp.loadedAssets?.[m.key]}
		<Container x={m.x} {y} scale={size / FRAME}>
			<SpriteSheet key={m.key} anchor={{ x: 0.5, y: 1 }} animationSpeed={FPS / 60} loop play />
		</Container>
	{/if}
{/each}
