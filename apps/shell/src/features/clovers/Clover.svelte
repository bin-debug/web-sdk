<script lang="ts">
	import { Circle, Container, Sprite, Text } from 'pixi-svelte';

	import { getContext } from '../../game/context';
	import { SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import type { CloverView } from './cloverState.svelte';

	type Props = { view: CloverView };
	const { view }: Props = $props();
	const context = getContext();
	const slot = $derived(view.scope === 'global' ? 'symbol.CL2.static' : 'symbol.CL1.static');
	const hasArt = $derived(Boolean(context.stateApp.loadedAssets?.[slot]));
	const D = SYMBOL_SIZE * 0.76;
</script>

<Container
	x={view.x}
	y={view.y}
	zIndex={40}
	scale={1 + view.burst.current * 0.15}
	alpha={1 - Math.max(0, view.burst.current - 0.85) * 5}
>
	{#if hasArt}
		<Sprite key={slot} anchor={0.5} width={D} height={D} />
	{:else}
		<Circle
			anchor={0.5}
			diameter={D}
			backgroundColor={view.scope === 'global' ? 0xf4c542 : 0x43b85b}
			borderColor={0xffffff}
			borderWidth={D * 0.06}
		/>
	{/if}
	<Circle
		anchor={0.5}
		diameter={D * (0.9 + view.burst.current * 0.65)}
		backgroundAlpha={0}
		borderColor={view.scope === 'global' ? 0xffe887 : 0x92f09d}
		borderWidth={D * 0.045}
		alpha={1 - view.burst.current}
	/>
	<Text anchor={0.5} text={`x${view.mult}`} style={textStyle(D * 0.29, 0xffffff, 0x173818)} />
	{#each view.targets as target, i}
		{@const p = view.trails[i].current}
		<Circle
			x={(target.reel - view.pos.reel) * SYMBOL_SIZE * p}
			y={(target.row - view.pos.row) * SYMBOL_SIZE * p}
			diameter={D * 0.16}
			backgroundColor={view.scope === 'global' ? 0xffdf6d : 0x7df08a}
			alpha={Math.sin(p * Math.PI)}
		/>
	{/each}
</Container>
