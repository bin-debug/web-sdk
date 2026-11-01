<script lang="ts">
	import { Rectangle, SpineProvider, SpineTrack, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { SECOND } from 'constants-shared/time';

	import { getContext } from '../game/context';
	import { THEME } from '../game/theme';

	const context = getContext();
	const backgroundProps = $derived(
		context.stateLayoutDerived.normalBackgroundLayout({ scale: 0.5 }),
	);
	const showBaseBackground = $derived(context.stateGame.gameType === 'basegame');
	const showFeatureBackground = $derived(context.stateGame.gameType !== 'basegame');

	// theme backgrounds are 1920x1080 and 1080x1920 images, scaled to cover the canvas
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const themeCover = $derived.by(() => {
		const canvas = context.stateLayoutDerived.canvasSizes();
		const image = portrait ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 };
		const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
		return {
			x: canvas.width / 2,
			y: canvas.height / 2,
			anchor: 0.5,
			width: image.width * scale,
			height: image.height * scale,
		};
	});
	const themeBonus = $derived(THEME.bonusBackground && showFeatureBackground);
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-3} />

{#if THEME.background}
	<!-- theme images arrive with the main asset load, after the loading screen starts -->
	{#if context.stateApp.loaded}
	<Sprite
		zIndex={-2}
		{...themeCover}
		key={themeBonus
			? portrait
				? 'themeBonusBackgroundPortrait'
				: 'themeBonusBackground'
			: portrait
				? 'themeBackgroundPortrait'
				: 'themeBackground'}
	/>
	{/if}
{:else}
<FadeContainer show={showBaseBackground} duration={SECOND} zIndex={-2}>
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'idle'} loop />
	</SpineProvider>
	<SpineProvider key="foregroundAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'dust'} loop />
	</SpineProvider>
</FadeContainer>

<FadeContainer show={showFeatureBackground} duration={SECOND} zIndex={-1}>
	<SpineProvider key="foregroundFeatureAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'idle'} loop />
	</SpineProvider>
	<SpineProvider key="foregroundFeatureAnimation" {...backgroundProps}>
		<SpineTrack trackIndex={0} animationName={'dust'} loop />
	</SpineProvider>
</FadeContainer>
{/if}
