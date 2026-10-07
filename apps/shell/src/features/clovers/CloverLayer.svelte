<script lang="ts">
	import BoardContainer from '../../components/BoardContainer.svelte';
	import Clover from './Clover.svelte';
	import { cloverLayer } from './cloverState.svelte';
</script>

<BoardContainer>
	{#each cloverLayer.views as view (view.id)}
		<Clover {view} />
	{/each}
</BoardContainer>
