<script lang="ts">
	import { Container, Graphics } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { BOARD_SIZES } from '../../game/constants';
	import Collector from './Collector.svelte';
	import { collectorLayer } from './collectorState.svelte';
</script>

<BoardContainer zIndex={105}>
	{#if collectorLayer.dimmed}
		<Graphics
			draw={(g) =>
				g.rect(0, 0, BOARD_SIZES.width, BOARD_SIZES.height).fill({ color: 0x000000, alpha: 0.6 })}
		/>
	{/if}
	{#each collectorLayer.views as view (view.id)}
		<Collector {view} />
	{/each}
</BoardContainer>
