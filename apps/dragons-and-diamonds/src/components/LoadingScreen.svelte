<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { onloaded: () => void };
	const props: Props = $props();

	onMount(props.onloaded);
</script>
