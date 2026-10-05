<script lang="ts">
	import type { Snippet } from 'svelte';

	import { anchorToPivot, Container, Rectangle, type Sizes } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';

	type Props = {
		children: Snippet<[{ sizes: Sizes }]>;
	};

	const props: Props = $props();

	const context = getContext();
	const BACKGROUND_RATIO = 920 / 720;
	const BACKGROUND_WIDTH = SYMBOL_SIZE * BOARD_DIMENSIONS.x;
	const BACKGROUND_SIZES = {
		width: BACKGROUND_WIDTH,
		height: BACKGROUND_WIDTH / BACKGROUND_RATIO,
	};
</script>

<MainContainer>
	<Container
		x={context.stateGameDerived.boardLayout().x}
		y={context.stateGameDerived.boardLayout().y}
		pivot={anchorToPivot({ anchor: 0.5, sizes: BACKGROUND_SIZES })}
	>
		<Rectangle
			{...BACKGROUND_SIZES}
			borderRadius={24}
			backgroundColor={0x1a1038}
			backgroundAlpha={0.95}
			borderColor={0xf5c542}
			borderWidth={4}
		/>
		{@render props.children({ sizes: BACKGROUND_SIZES })}
	</Container>
</MainContainer>
