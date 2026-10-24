<script lang="ts">
	import { SpineProvider, SpineTrack, Sprite } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import SymbolPrize from './SymbolPrize.svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { THEME } from '../game/theme';
	import type { StickySymbol } from '../game/stateGame.svelte';

	const STICKY_SYMBOL_ANIMATION_MAP = {
		hit: 'scatter_hit',
		open: 'scatter_open',
		idle: 'scatter_loop',
		win: 'scatter_trigger',
	} as const;

	type Props = {
		x?: number;
		y?: number;
		stickySymbol: StickySymbol;
	};

	const props: Props = $props();

	// theme art has no coin animations: show the flat prize coin and finish each step right away
	$effect(() => {
		if (!THEME.staticSymbols) return;
		props.stickySymbol.state;
		const timer = setTimeout(() => props.stickySymbol.oncomplete(), 150);
		return () => clearTimeout(timer);
	});
</script>

{#if THEME.staticSymbols}
	<Sprite x={props.x} y={props.y} anchor={0.5} key="p.webp" width={SYMBOL_SIZE} height={SYMBOL_SIZE} />
{:else}
<SpineProvider x={props.x} y={props.y} key="symbols" height={SYMBOL_SIZE}>
	<SpineTrack
		trackIndex={0}
		animationName={STICKY_SYMBOL_ANIMATION_MAP[props.stickySymbol.state]}
		timeScale={stateBetDerived.timeScale()}
		loop={props.stickySymbol.state === 'idle'}
		listener={{
			complete: () => {
				props.stickySymbol.oncomplete();
			},
		}}
	/>
</SpineProvider>
{/if}

{#if props.stickySymbol.isOpen}
	<SymbolPrize x={props.x} y={props.y} prize={props.stickySymbol.prize.prize} />
{/if}
