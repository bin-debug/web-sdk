<script lang="ts">
	import BoardContainer from '../../components/BoardContainer.svelte';
	import Coin from './Coin.svelte';
	import { coinLayer } from './coinState.svelte';
</script>

<BoardContainer>
	{#each coinLayer.views as view (view.id)}
		<Coin {view} />
	{/each}
</BoardContainer>
