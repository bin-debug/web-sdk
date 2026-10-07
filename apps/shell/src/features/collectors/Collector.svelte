<script lang="ts">
	import { Container, Graphics, Sprite, Text } from 'pixi-svelte';

	import { getContext } from '../../game/context';
	import { SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import type { CollectorView } from './collectorState.svelte';

	type Props = { view: CollectorView };
	const { view }: Props = $props();
	const context = getContext();
	const global = $derived(view.collector === 'global');
	const pot = $derived(view.collector === 'pot');
	const slot = $derived(global ? 'symbol.COL2.static' : 'symbol.COL1.static');
	const hasArt = $derived(Boolean(context.stateApp.loadedAssets?.[slot]));
	const D = SYMBOL_SIZE * 0.8;
	// collect.total is in book units (100 = 1x bet)
	const total = $derived(`${Math.round(view.total) / 100}x`);
	const label = $derived(global ? 'CHEST' : pot ? 'POT' : 'SACK');
</script>

<Container x={view.x} y={view.y} scale={view.squash.current} zIndex={45}>
	<!-- Keep the code fallback visible even if a malformed art slot reports as loaded. -->
	<Graphics
		draw={(g) =>
			g
				.roundRect(-D / 2, -D * 0.35, D, D * 0.7, D * 0.12)
				.fill(global ? 0xc99321 : pot ? 0x9e6529 : 0x70411f)
				.stroke({ color: 0xffdf7a, width: D * 0.06 })}
	/>
	{#if hasArt}
		<Sprite key={slot} anchor={0.5} width={D} height={D} alpha={0.7} />
	{/if}
	<Text anchor={0.5} text={label} style={textStyle(D * 0.18, 0xffed9a, 0x38200d)} />
	{#if view.totalPop.current > 0}
		<Text
			anchor={0.5}
			y={-D * (0.65 + view.totalPop.current * 0.25)}
			text={total}
			scale={view.totalPop.current}
			style={textStyle(D * 0.34, 0xfff3b0, 0x3b2509)}
		/>
	{/if}
</Container>
