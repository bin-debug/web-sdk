<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolX, getSymbolInfo } from '../game/utils';
	import type { TumbleSymbol } from '../game/stateGame.svelte';
	import { Container } from 'pixi-svelte';
	import { createSquash } from '../game/squash.svelte';

	type Props = {
		reelIndex: number;
		tumbleSymbol: TumbleSymbol;
	};

	const props: Props = $props();
	const squash = createSquash();
	const symbolInfo = $derived(
		getSymbolInfo({
			rawSymbol: props.tumbleSymbol.rawSymbol,
			state: props.tumbleSymbol.symbolState,
		}),
	);
</script>

<SymbolWrap
	x={getSymbolX(props.reelIndex)}
	y={props.tumbleSymbol.symbolY.current}
	animating={symbolInfo.type === 'spine'}
>
	<Container y={squash.offsetY()} scale={{ x: squash.sx.current, y: squash.sy.current }}>
		<Symbol
			state={props.tumbleSymbol.symbolState}
			rawSymbol={props.tumbleSymbol.rawSymbol}
			oncomplete={() => {
				if (props.tumbleSymbol.symbolState === 'land') squash.squash();
				props.tumbleSymbol.oncomplete();
			}}
		/>
	</Container>
</SymbolWrap>
