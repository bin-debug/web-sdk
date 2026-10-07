<script lang="ts">
	import { Container, Circle, Sprite, Text } from 'pixi-svelte';

	import { getContext } from '../../game/context';
	import { SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import type { CoinView } from './coinState.svelte';
	import { TIERS, tierOf, formatCoinValue } from './tiers';

	type Props = { view: CoinView };
	const { view }: Props = $props();
	const context = getContext();

	const tier = $derived(TIERS[tierOf(view.coin.kind)]);
	// the art slot when it loaded; otherwise a coloured disc drawn here (?art=none)
	const hasArt = $derived(Boolean(context.stateApp.loadedAssets?.[tier.slot]));
	const D = SYMBOL_SIZE * 0.82;
	const text = $derived(formatCoinValue(view.coin.value));
	const fontSize = $derived(D * (text.length > 5 ? 0.26 : text.length > 4 ? 0.3 : 0.36));
</script>

<Container
	x={view.x}
	y={view.y - view.rise.current * SYMBOL_SIZE - (1 - view.flip.current) * SYMBOL_SIZE * 0.25}
	scale={{ x: Math.max(0.001, view.flip.current * view.pop.current), y: view.pop.current }}
	alpha={view.fade.current}
	zIndex={30}
>
	{#if hasArt}
		<Sprite key={tier.slot} anchor={0.5} width={D} height={D} />
	{:else}
		<Circle anchor={0.5} diameter={D} backgroundColor={tier.face} borderColor={tier.rim} borderWidth={D * 0.07} />
		<Circle anchor={0.5} diameter={D * 0.72} backgroundAlpha={0} borderColor={tier.rim} borderWidth={D * 0.03} borderAlpha={0.6} />
	{/if}
	<!-- glint sweeps once across the face when the coin lands -->
	<Circle
		anchor={0.5}
		x={(view.glint.current - 0.5) * D * 0.9}
		y={-D * 0.18}
		diameter={D * 0.16}
		backgroundColor={tier.shine}
		backgroundAlpha={Math.sin(view.glint.current * Math.PI) * 0.85}
	/>
	<Text anchor={0.5} {text} style={textStyle(fontSize, 0xffffff, 0x2a1a05)} />
</Container>
