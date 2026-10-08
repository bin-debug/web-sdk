<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolX } from '../game/utils';
	import type { TumbleSymbol } from '../game/stateGame.svelte';
	import { Container, Graphics } from 'pixi-svelte';
	import { createSquash } from '../game/squash.svelte';
	import { getArt } from '../game/art';

	type Props = {
		reelIndex: number;
		tumbleSymbol: TumbleSymbol;
	};

	const props: Props = $props();
	const squash = createSquash();
	const art = getArt();
	const visual = $derived(art.symbolVisual(props.tumbleSymbol.rawSymbol.name, props.tumbleSymbol.symbolState === 'sympathy' ? 'static' : props.tumbleSymbol.symbolState));
</script>

<SymbolWrap x={getSymbolX(props.reelIndex)} y={props.tumbleSymbol.symbolY.current} animating={visual.kind === 'sheet'}>
	<Container y={squash.offsetY()} scale={{ x: squash.sx.current, y: squash.sy.current }}>
		{#if props.tumbleSymbol.symbolState === 'sympathy'}
			<!-- code shimmer; an fx.poof art slot is not wired yet -->
			<Graphics draw={(g) => g.circle(0, 0, 34).fill({ color: 0xfff3a1, alpha: 0.7 })} />
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
