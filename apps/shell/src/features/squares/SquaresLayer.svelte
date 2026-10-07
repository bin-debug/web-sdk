<script lang="ts">
	import { Graphics, Sprite } from 'pixi-svelte';

	import { getContext } from '../../game/context';
	import { SYMBOL_SIZE } from '../../game/constants';
	import { getSymbolX, getSymbolY } from '../../game/utils';
	import { squaresState } from './squaresState.svelte';

	const context = getContext();
	const hasArt = $derived(Boolean(context.stateApp.loadedAssets?.['board.cell_gold']));
	const size = SYMBOL_SIZE * 0.9;
</script>

{#each squaresState.views as view (view.id)}
	<!-- The outline is intentionally always present: demo symbol cells are opaque. -->
	<Graphics
		draw={(g) => g.roundRect(getSymbolX(view.pos.reel) - size / 2, getSymbolY(view.pos.row) - size / 2, size, size, size * 0.13).fill({ color: 0xf2b833, alpha: 0.12 }).stroke({ color: 0xffe36a, width: size * 0.09 })}
		alpha={view.appear.current}
		scale={0.82 + view.appear.current * 0.18}
		pivot={{ x: getSymbolX(view.pos.reel), y: getSymbolY(view.pos.row) }}
		position={{ x: getSymbolX(view.pos.reel), y: getSymbolY(view.pos.row) }}
	/>
	{#if hasArt}
		<Sprite key="board.cell_gold" anchor={0.5} x={getSymbolX(view.pos.reel)} y={getSymbolY(view.pos.row)} width={size} height={size} alpha={view.appear.current * 0.35} scale={0.82 + view.appear.current * 0.18} />
	{/if}
{/each}
