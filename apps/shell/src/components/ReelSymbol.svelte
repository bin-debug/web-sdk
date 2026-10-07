<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolX } from '../game/utils';
	import type { ReelSymbol } from '../game/stateGame.svelte';
	import { Container } from 'pixi-svelte';
	import { createSquash } from '../game/squash.svelte';
	import { getArt } from '../game/art';
	import { isDrop } from '../game/spec';
	import { isCoinCovered } from '../features/coins/coinState.svelte';

	type Props = {
		reelIndex: number;
		reelSymbol: ReelSymbol;
	};

	const props: Props = $props();
	const squash = createSquash();
	const art = getArt();
	// symbols stretch while they fall or spin (squash and stretch)
	$effect(() => squash.stretch(props.reelSymbol.symbolState === 'spin'));
	// the spinning reel exposes symbolY() as a function, the dropping reel a Tween
	const symbolY = () => {
		const y = props.reelSymbol.symbolY as unknown as (() => number) | { current: number };
		return typeof y === 'function' ? y() : y.current;
	};
	const visual = $derived(art.symbolVisual(props.reelSymbol.rawSymbol.name, props.reelSymbol.symbolState));
	const covered = $derived(isCoinCovered({ reel: props.reelIndex, row: Math.round(symbolY() / SYMBOL_SIZE - 0.5) }));
</script>

	<Container alpha={covered ? 0 : 1}>
		<SymbolWrap
			x={getSymbolX(props.reelIndex)}
			y={symbolY()}
			animating={visual.kind === 'sheet' && (props.reelSymbol.symbolState === 'land' || props.reelSymbol.symbolState === 'win')}
		>
			<Container y={squash.offsetY()} scale={{ x: squash.sx.current, y: squash.sy.current }}>
				<Symbol
					state={props.reelSymbol.symbolState}
					rawSymbol={props.reelSymbol.rawSymbol}
					oncomplete={() => {
						if (props.reelSymbol.symbolState === 'win') props.reelSymbol.oncomplete();
						if (props.reelSymbol.symbolState === 'land') {
							if (isDrop) squash.squash();
							props.reelSymbol.symbolState = 'static';
						}
					}}
				/>
			</Container>
		</SymbolWrap>
	</Container>
