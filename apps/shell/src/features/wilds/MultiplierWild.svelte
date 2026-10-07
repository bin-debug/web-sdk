<script lang="ts">
	import { Container, Rectangle, Sprite, Text, Circle } from 'pixi-svelte';

	import { getContext } from '../../game/context';
	import { SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import { tierOfValue, TIER_LOOK, TIER_SLOT, type WildView } from './wildState.svelte';

	type Props = { view: WildView };
	const { view }: Props = $props();
	const context = getContext();

	const tier = $derived(view.hidden ? 'iron' : tierOfValue(view.value));
	const look = $derived(TIER_LOOK[tierOfValue(view.value)]);
	const hasArt = $derived(Boolean(context.stateApp.loadedAssets?.[TIER_SLOT[tier]]));
	const S = SYMBOL_SIZE * 0.92;
	const isOpen = $derived(view.open.current >= 0.5);
	const text = $derived(isOpen ? `x${view.value}` : '?');
	// the lid bursts: a ring that grows and fades while the crate opens
	const burst = $derived(view.hidden ? Math.sin(Math.min(1, view.open.current) * Math.PI) : 0);
</script>

<Container x={view.x} y={view.y - (1 - view.appear.current) * SYMBOL_SIZE * 0.4} alpha={view.appear.current} scale={view.appear.current} zIndex={25}>
	{#if hasArt}
		<Sprite key={TIER_SLOT[tier]} anchor={0.5} width={S} height={S} />
	{:else}
		<Rectangle anchor={0.5} width={S} height={S} borderRadius={S * 0.14} backgroundColor={isOpen ? look.face : 0x3a2a1a} borderColor={isOpen ? look.rim : 0xf2c230} borderWidth={S * 0.06} />
	{/if}
	{#if burst > 0}
		<Circle anchor={0.5} diameter={S * (0.6 + burst * 0.9)} backgroundAlpha={0} borderColor={0xffe9a0} borderWidth={S * 0.05} borderAlpha={burst} />
	{/if}
	<Container scale={view.pop.current}>
		<Text anchor={0.5} {text} style={textStyle(S * (text.length > 3 ? 0.3 : 0.4), 0xffffff, 0x2a1a05)} />
	</Container>
</Container>
