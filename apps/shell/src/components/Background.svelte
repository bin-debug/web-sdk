<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';

	const context = getContext();
	const isPortrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const canvasSizes = $derived(context.stateLayoutDerived.canvasSizes());
	const showBase = $derived(context.stateGame.gameType === 'basegame');
	const showFeature = $derived(context.stateGame.gameType === 'freegame');
	const ar = $derived(isPortrait ? '9x16' : '16x9');

	// cover-fit: scale the background so it fills the canvas without distortion
	const cover = (w: number, h: number) => {
		const target = isPortrait ? 9 / 16 : 16 / 9;
		const canvas = canvasSizes.width / canvasSizes.height;
		return canvas > target ? { width: canvasSizes.width, height: canvasSizes.width / target } : { width: canvasSizes.height * target, height: canvasSizes.height };
	};
	const size = $derived(cover(canvasSizes.width, canvasSizes.height));
</script>

<Rectangle {...canvasSizes} backgroundColor={0x000000} zIndex={-3} />

<FadeContainer show={showBase} duration={SECOND} zIndex={-2}>
	<Sprite key={`bg.base.${ar}`} anchor={0.5} x={canvasSizes.width * 0.5} y={canvasSizes.height * 0.5} {...size} />
</FadeContainer>

<FadeContainer show={showFeature} duration={SECOND} zIndex={-1}>
	<Sprite key={`bg.bonus.${ar}`} anchor={0.5} x={canvasSizes.width * 0.5} y={canvasSizes.height * 0.5} {...size} />
</FadeContainer>
