<script lang="ts">
	type Props = { name: 'star' | 'bolt' | 'flag' | 'trophy' };
	const props: Props = $props();

	const paths = {
		star: 'M12 2l2.6 6.3L21 9l-5 4.4L17.5 20 12 16.6 6.5 20 8 13.4 3 9l6.4-.7L12 2Z',
		bolt: 'M13.5 2 4 13.5h6.5L9.5 22 20 9.5h-6.6L13.5 2Z',
		flag: 'M5 3h2v18H5V3Zm3 1h10l-2.5 4L18 12H8V4Z',
		trophy: 'M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3V3Zm0 4H6v1a2 2 0 0 0 1 1.7V7Zm10 0v2.7A2 2 0 0 0 18 8V7h-1Z',
	};
</script>

<svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[props.name]} /></svg>

<style>
	svg {
		width: 1.35em;
		height: 1.35em;
		fill: currentColor;
	}
</style>
