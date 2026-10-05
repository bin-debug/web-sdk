<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const isPortrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const canvasSizes = $derived(context.stateLayoutDerived.canvasSizes());
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType === 'freeSpins');
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

<FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<Sprite
		key={isPortrait ? 'baseBackgroundPortrait' : 'baseBackgroundLandscape'}
		anchor={0.5}
		x={canvasSizes.width * 0.5}
		y={canvasSizes.height * 0.5}
		width={canvasSizes.width}
		height={canvasSizes.height}
	/>
</FadeContainer>

<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-1}>
	<Sprite
		key={isPortrait ? 'bonusBackgroundPortrait' : 'bonusBackgroundLandscape'}
		anchor={0.5}
		x={canvasSizes.width * 0.5}
		y={canvasSizes.height * 0.5}
		width={canvasSizes.width}
		height={canvasSizes.height}
	/>
</FadeContainer>
