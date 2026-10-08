<script lang="ts">
	import BoardContainer from '../../components/BoardContainer.svelte';
	import MultiplierWild from './MultiplierWild.svelte';
	import { wildLayer } from './wildState.svelte';
</script>

<BoardContainer>
	{#each wildLayer.sticky as view (view.id)}
		<MultiplierWild {view} />
	{/each}
	{#each wildLayer.views as view (view.id)}
		<MultiplierWild {view} />
	{/each}
</BoardContainer>
