<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Container, Rectangle, Text, type Sizes } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		children: Snippet<[{ frameSizes: Sizes }]>;
	};

	const props: Props = $props();
	const TITLE_HEIGHT = SYMBOL_SIZE * 0.28;

	const PANEL_HEIGHT = SYMBOL_SIZE * 0.8;
	const PANEL_SIZES = {
		width: PANEL_HEIGHT * 1.9,
		height: PANEL_HEIGHT,
	};
</script>

<Rectangle
	anchor={0.5}
	{...PANEL_SIZES}
	borderRadius={14}
	backgroundColor={0x1a1038}
	backgroundAlpha={0.92}
	borderColor={0x13c4a3}
	borderWidth={3}
/>

<Container y={-TITLE_HEIGHT * 1.2}>
	<Rectangle
		anchor={0.5}
		width={TITLE_HEIGHT * 3.6}
		height={TITLE_HEIGHT}
		borderRadius={10}
		backgroundColor={0xf5c542}
	/>
	<Text
		anchor={0.5}
		text="TUMBLE WIN"
		style={{
			fontFamily: 'proxima-nova',
			fontWeight: '800',
			fontSize: TITLE_HEIGHT * 0.42,
			fill: 0x1a1038,
		}}
	/>
</Container>

{@render props.children({ frameSizes: PANEL_SIZES })}
