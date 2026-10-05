<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicIn } from 'svelte/easing';
	import { Sprite } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import type { RawSymbol } from '../game/types';

	type Props = {
		x?: number;
		y?: number;
		rawSymbol: RawSymbol;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const symbolInfo = $derived(getSymbolInfo({ rawSymbol: props.rawSymbol, state: 'static' }));

	const scale = new Tween(1);
	const alpha = new Tween(1);

	onMount(() => {
		(async () => {
			await Promise.all([
				scale.set(1.35, { duration: 260, easing: cubicIn }),
				alpha.set(0, { duration: 260, easing: cubicIn }),
			]);
			props.oncomplete?.();
		})();
	});
</script>

{#if symbolInfo.type !== 'spine'}
	<Sprite
		x={props.x}
		y={props.y}
		anchor={0.5}
		key={symbolInfo.assetKey}
		width={SYMBOL_SIZE * symbolInfo.sizeRatios.width * scale.current}
		height={SYMBOL_SIZE * symbolInfo.sizeRatios.height * scale.current}
		alpha={alpha.current}
	/>
{/if}
