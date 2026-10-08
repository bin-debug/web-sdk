<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolX } from '../game/utils';
	import type { TumbleSymbol } from '../game/stateGame.svelte';
	import { Container, Graphics, Sprite } from 'pixi-svelte';
	import { createSquash } from '../game/squash.svelte';
	import { getArt } from '../game/art';
	import { getContext } from '../game/context';

	type Props = {
		reelIndex: number;
		tumbleSymbol: TumbleSymbol;
	};

	const props: Props = $props();
	const squash = createSquash();
	const art = getArt();
	const context = getContext();
	const hasPoof = $derived(Boolean(context.stateApp.loadedAssets?.['fx.poof']));
	const visual = $derived(art.symbolVisual(props.tumbleSymbol.rawSymbol.name, props.tumbleSymbol.symbolState === 'sympathy' ? 'static' : props.tumbleSymbol.symbolState));
</script>

<SymbolWrap x={getSymbolX(props.reelIndex)} y={props.tumbleSymbol.symbolY.current} animating={visual.kind === 'sheet'}>
	<Container y={squash.offsetY()} scale={{ x: squash.sx.current, y: squash.sy.current }}>
		{#if props.tumbleSymbol.symbolState === 'sympathy'}
			<!-- fx.poof when supplied, otherwise the code shimmer fallback. -->
			{#if hasPoof}
				<Sprite key="fx.poof" anchor={0.5} width={SYMBOL_SIZE * 0.7} height={SYMBOL_SIZE * 0.7} />
			{:else}
				<Graphics draw={(g) => g.circle(0, 0, 34).fill({ color: 0xfff3a1, alpha: 0.7 })} />
			{/if}
		{/if}
		<Symbol
			state={props.tumbleSymbol.symbolState === 'sympathy' ? 'static' : props.tumbleSymbol.symbolState}
			rawSymbol={props.tumbleSymbol.rawSymbol}
			oncomplete={() => {
				if (props.tumbleSymbol.symbolState === 'land') squash.squash();
				props.tumbleSymbol.oncomplete();
			}}
		/>
	</Container>
</SymbolWrap>
