<script lang="ts">
	import { Container, SpriteSheet } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Mascot = two sprite-sheet loops cut from one video: idle plays all the time,
	// cheer plays once on a cluster win, big win or free spins trigger, then idle again.
	const context = getContext();
	const bl = () => context.stateGameDerived.boardLayout();
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);

	const FPS = 12;
	const FRAME = 360; // px height of the (untrimmed) sprite-sheet frames
	let state = $state<'idle' | 'cheer'>('idle');

	// the cheer sheet loads lazily: until it's in, he just keeps idling
	const cheer = () => {
		if (context.stateApp.loadedAssets?.mascotCheer) state = 'cheer';
	};

	context.eventEmitter.subscribeOnMount({
		showClusterWinAmounts: cheer,
		winShow: cheer,
		freeSpinIntroShow: cheer,
	});

	// Landscape: right of the reels, feet level with the bottom of the frame.
	// Portrait: under the reels, bottom-right next to the spin button.
	const size = $derived(isLandscape ? bl().height * 0.95 : bl().width * 0.85);
	const x = $derived(
		isLandscape ? bl().x + bl().width * 0.5 + size * 0.38 : bl().x + bl().width * 0.26,
	);
	const y = $derived(
		isLandscape ? bl().y + bl().height * 0.56 : bl().y + bl().height * 0.5 + bl().width * 0.78,
	);
</script>

<!-- Layout lives on the Container: changing any SpriteSheet prop re-applies its textures,
     which stops the animation (so resizes would freeze him). -->
<!-- The idle sheet isn't preloaded: show him once it has arrived. -->
{#if context.stateApp.loadedAssets?.mascotIdle}
	<Container {x} {y} scale={size / FRAME}>
		{#key state}
			<SpriteSheet
				key={state === 'idle' ? 'mascotIdle' : 'mascotCheer'}
				anchor={{ x: 0.5, y: 1 }}
				animationSpeed={FPS / 60}
				loop={state === 'idle'}
				play
				onComplete={() => (state = 'idle')}
			/>
		{/key}
	</Container>
{/if}
