<script lang="ts">
	import { Button } from 'components-pixi';
	import { Graphics } from 'pixi-svelte';

	import type { Icon } from './icons';

	type Props = {
		x: number;
		y: number;
		size: number;
		icon: Icon;
		onpress: () => void;
		disabled?: boolean;
	};

	const props: Props = $props();
</script>

<Button
	x={props.x}
	y={props.y}
	anchor={0.5}
	sizes={{ width: props.size, height: props.size }}
	disabled={props.disabled}
	onpress={props.onpress}
>
	{#snippet children({ center, hovered, pressed })}
		<Graphics
			x={center.x}
			y={center.y}
			alpha={props.disabled ? 0.35 : hovered ? 1 : 0.9}
			scale={pressed ? 0.9 : 1}
			draw={(g) => props.icon(g, props.size)}
		/>
	{/snippet}
</Button>
