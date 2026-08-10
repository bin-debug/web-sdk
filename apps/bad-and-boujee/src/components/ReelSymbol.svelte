<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolInfo, getSymbolX } from '../game/utils';
	import type { ReelSymbol } from '../game/stateGame.svelte';
	import { triggerScreenShake } from '../game/stateShake.svelte';

	// Special symbols get a little screen shake the instant they land, on top
	// of whatever their own land animation does — makes them feel weightier.
	const SPECIAL_SYMBOL_NAMES = new Set(['W', 'S', 'M']);

	type Props = {
		reelIndex: number;
		reelSymbol: ReelSymbol;
	};

	const props: Props = $props();
	// rawSymbol can be missing if a spin response came back incomplete (e.g. an
	// RGS error mid-bet) — render nothing for that tile instead of throwing and
	// taking down the whole board.
	const symbolInfo = $derived(
		props.reelSymbol.rawSymbol
			? getSymbolInfo({ rawSymbol: props.reelSymbol.rawSymbol, state: props.reelSymbol.symbolState })
			: null,
	);
</script>

{#if symbolInfo}
	<SymbolWrap
		x={getSymbolX(props.reelIndex)}
		y={props.reelSymbol.symbolY.current}
		animating={symbolInfo.type === 'spine' &&
			(props.reelSymbol.symbolState === 'land' || props.reelSymbol.symbolState === 'win')}
	>
		<Symbol
			state={props.reelSymbol.symbolState}
			rawSymbol={props.reelSymbol.rawSymbol}
			oncomplete={() => {
				if (props.reelSymbol.symbolState === 'win') props.reelSymbol.oncomplete();
				if (props.reelSymbol.symbolState === 'land') {
					if (props.reelSymbol.rawSymbol && SPECIAL_SYMBOL_NAMES.has(props.reelSymbol.rawSymbol.name)) {
						triggerScreenShake({});
					}
					props.reelSymbol.symbolState = 'static';
				}
			}}
		/>
	</SymbolWrap>
{/if}
