<script lang="ts">
	import { KitSymbol } from 'kit-symbols';

	import { SYMBOL_SIZE } from '../game/constants';
	import { getArt } from '../game/art';
	import type { SymbolState, RawSymbol } from '../game/types';

	type Props = {
		x?: number;
		y?: number;
		state: SymbolState;
		rawSymbol: RawSymbol;
		oncomplete?: () => void;
		loop?: boolean;
	};

	const props: Props = $props();
	const art = getArt();
</script>

<KitSymbol
	{art}
	name={props.rawSymbol.name}
	state={props.state}
	size={SYMBOL_SIZE}
	x={props.x}
	y={props.y}
	loop={props.loop}
	oncomplete={props.oncomplete}
/>
