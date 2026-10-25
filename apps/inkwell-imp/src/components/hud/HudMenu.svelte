<script lang="ts">
	import { Container, Rectangle } from 'pixi-svelte';
	import { stateUi } from 'state-shared';
	import ButtonPayTable from 'components-ui-pixi/src/components/ButtonPayTable.svelte';
	import ButtonGameRules from 'components-ui-pixi/src/components/ButtonGameRules.svelte';
	import ButtonSettings from 'components-ui-pixi/src/components/ButtonSettings.svelte';
	import ButtonSoundSwitch from 'components-ui-pixi/src/components/ButtonSoundSwitch.svelte';
	import ButtonMenuClose from 'components-ui-pixi/src/components/ButtonMenuClose.svelte';

	import { getContext } from '../../game/context';
	import { hudSpace, isPortraitHud } from './layout';

	// The stock menu buttons (paytable, rules, settings, sound, close) stacked above our menu button.
	const context = getContext();
	const space = $derived(hudSpace());
	const anchorPoint = $derived(
		isPortraitHud()
			? { x: 28, y: space.height - 50, scale: 0.34, step: 60 }
			: { x: space.width / 2 - 430, y: space.height - 64, scale: 0.42, step: 72 },
	);
</script>

{#if stateUi.menuOpen}
	<Rectangle
		eventMode="static"
		cursor="pointer"
		alpha={0.5}
		anchor={0.5}
		backgroundColor={0x000000}
		width={context.stateLayoutDerived.canvasSizes().width}
		height={context.stateLayoutDerived.canvasSizes().height}
		x={context.stateLayoutDerived.canvasSizes().width * 0.5}
		y={context.stateLayoutDerived.canvasSizes().height * 0.5}
		onpointerup={() => (stateUi.menuOpen = false)}
	/>

	<Container scale={space.scale}>
		<Container x={anchorPoint.x + (isPortraitHud() ? 10 : 0)} y={anchorPoint.y}>
			{#each [ButtonMenuClose, ButtonSoundSwitch, ButtonSettings, ButtonGameRules, ButtonPayTable] as MenuButton, index}
				<Container y={-anchorPoint.step * index} scale={anchorPoint.scale}>
					<MenuButton anchor={0.5} />
				</Container>
			{/each}
		</Container>
	</Container>
{/if}
