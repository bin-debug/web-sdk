<script lang="ts">
	import { Container, Text } from 'pixi-svelte';

	type Props = {
		x: number;
		y: number;
		label: string;
		value: string;
		size: number;
		align?: 'left' | 'center';
		onpress?: () => void;
	};

	const props: Props = $props();
	const anchorX = $derived(props.align === 'left' ? 0 : 0.5);
</script>

<Container
	x={props.x}
	y={props.y}
	eventMode={props.onpress ? 'static' : 'auto'}
	cursor={props.onpress ? 'pointer' : 'default'}
	onpointerup={() => props.onpress?.()}
>
	<Text
		anchor={{ x: anchorX, y: 1 }}
		text={props.label.toUpperCase()}
		style={{ fontFamily: 'proxima-nova', fontWeight: '600', fontSize: props.size * 0.75, fill: 0xd0d0d0 }}
	/>
	<Text
		anchor={{ x: anchorX, y: 0 }}
		y={2}
		text={props.value}
		style={{ fontFamily: 'proxima-nova', fontWeight: '700', fontSize: props.size, fill: 0xffffff }}
	/>
</Container>
