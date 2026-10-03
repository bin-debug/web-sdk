<script lang="ts">
	type Props = { name: 'star' | 'bolt' | 'flag' | 'trophy' | 'crown' | 'shield' | 'tag' | 'coins' | 'gift' };
	const props: Props = $props();

	const paths = {
		star: 'M12 2l2.6 6.3L21 9l-5 4.4L17.5 20 12 16.6 6.5 20 8 13.4 3 9l6.4-.7L12 2Z',
		bolt: 'M13.5 2 4 13.5h6.5L9.5 22 20 9.5h-6.6L13.5 2Z',
		flag: 'M5 3h2v18H5V3Zm3 1h10l-2.5 4L18 12H8V4Z',
		trophy: 'M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3V3Zm0 4H6v1a2 2 0 0 0 1 1.7V7Zm10 0v2.7A2 2 0 0 0 18 8V7h-1Z',
		crown: 'M3 7l4.5 4L12 4l4.5 7L21 7l-2 12H5L3 7Zm2.6 14h12.8v1.5H5.6V21Z',
		shield: 'M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3Zm-1 13.2 6-6-1.4-1.4-4.6 4.6-2.1-2.1L7.5 11.7l3.5 3.5Z',
		tag: 'M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Zm5-5.5A1.5 1.5 0 1 0 8 9.5a1.5 1.5 0 0 0 0-3Z',
		gift: 'M20 7h-2.2A3 3 0 0 0 12 3.8 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h7V7h2v5h7a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Zm-11 0a1 1 0 1 1 1-1v1H9Zm6 0h-1V6a1 1 0 1 1 1 1ZM4 13v7a1 1 0 0 0 1 1h6v-8H4Zm9 8h6a1 1 0 0 0 1-1v-7h-7v8Z',
		coins: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Zm-8 6c0 1.7 3.6 3 8 3s8-1.3 8-3v3c0 1.7-3.6 3-8 3s-8-1.3-8-3V9Zm0 6c0 1.7 3.6 3 8 3s8-1.3 8-3v3c0 1.7-3.6 3-8 3s-8-1.3-8-3v-3Z',
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
