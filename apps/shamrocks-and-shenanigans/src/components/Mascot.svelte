<script lang="ts">
	import { Container, SpriteSheet, anchorToPivot } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Mascot = two sprite-sheet loops cut from one video: idle plays all the time,
	// cheer plays once on a cluster win, big win or free spins trigger, then idle again.
	const context = getContext();
	const bl = () => context.stateGameDerived.boardLayout();
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);

	const FPS = 12;
	const FRAME = 330; // px height of the (untrimmed) sprite-sheet frames
	let state = $state<'idle' | 'cheer'>('idle');

	const cheer = () => (state = 'cheer');

	context.eventEmitter.subscribeOnMount({
		showClusterWinAmounts: cheer,
		winShow: cheer,
		freeSpinIntroShow: cheer,
	});

	// Landscape: right of the reels, feet level with the bottom of the frame.
	// Portrait: bottom-right next to the spin button, feet on the pub floor. The background
	// is stretched to the canvas, so the floor sits at a fixed fraction of the canvas height;
	// convert it into MainContainer space (it is scaled and centred) so he stands on it.
	const FLOOR = 0.875; // floorboards in bg-mobile, where the barrel and drum stand
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const ml = $derived(context.stateLayoutDerived.mainLayout());
	const pivot = $derived(
		anchorToPivot({ anchor: ml.anchor, sizes: { width: ml.width, height: ml.height } }),
	);
	const floorY = $derived((canvas.height * FLOOR - ml.y) / ml.scale + pivot.y);
	const rightX = $derived((canvas.width - ml.x) / ml.scale + pivot.x);
	// as big as fits between the reels and the floor (his hat may overlap the reel frame a little)
	const size = $derived(
		isLandscape
			? bl().height * 0.95
			: Math.min(bl().width * 0.9, (floorY - (bl().y + bl().height * 0.5)) * 1.4),
	);
	const x = $derived(
		// portrait: against the right edge (fiddle tip may just touch it), feet clear of the spin button
		isLandscape ? bl().x + bl().width * 0.5 + size * 0.38 : rightX - size * 0.31,
	);
	const y = $derived(isLandscape ? bl().y + bl().height * 0.56 : floorY);
</script>

<!-- Layout lives on the Container: changing any SpriteSheet prop re-applies its textures,
     which stops the animation (so resizes would freeze him). -->
<!-- The sheets aren't preloaded: show him once both have arrived. -->
{#if context.stateApp.loadedAssets?.mascotIdle && context.stateApp.loadedAssets?.mascotCheer}
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
