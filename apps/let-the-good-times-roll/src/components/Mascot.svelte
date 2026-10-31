<script lang="ts">
	import { Container, SpriteSheet } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Snake Eyes: one idle loop (hat tip, coin flip, toe tap), Hacksaw-style. The clip starts and
	// ends on the same pose, so it loops straight through.
	const context = getContext();
	const bl = () => context.stateGameDerived.boardLayout();
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);

	const FPS = 12;
	const FRAME = 360; // px height of the (untrimmed) sprite-sheet frames

	// Landscape: left of the reels, feet level with the bottom of the frame (the free-spins
	// counter sits on the right). Portrait: under the reels, bottom-left.
	const size = $derived(isLandscape ? bl().height * 0.7 : bl().width * 0.5);
	const x = $derived(
		isLandscape ? bl().x - bl().width * 0.5 - size * 0.42 : bl().x - bl().width * 0.3,
	);
	const y = $derived(
		isLandscape ? bl().y + bl().height * 0.5 : bl().y + bl().height * 0.5 + bl().width * 0.45,
	);
</script>

<!-- Layout lives on the Container: changing any SpriteSheet prop re-applies its textures,
     which stops the animation (so resizes would freeze him). -->
{#if context.stateApp.loadedAssets?.mascotIdle}
	<Container {x} {y} scale={size / FRAME}>
		<SpriteSheet key="mascotIdle" anchor={{ x: 0.5, y: 1 }} animationSpeed={FPS / 60} loop play />
	</Container>
{/if}
