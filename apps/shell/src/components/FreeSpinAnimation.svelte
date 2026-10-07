<script lang="ts">
	import type { Snippet } from 'svelte';

	import { anchorToPivot, Container, Rectangle, type Sizes } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { ACCENT, DARK } from '../game/ui';

	type Props = { children: Snippet<[{ sizes: Sizes }]>; accent?: number };

	const props: Props = $props();
	const context = getContext();
	const W = Math.max(SYMBOL_SIZE * BOARD_DIMENSIONS.x, SYMBOL_SIZE * 5);
	const SIZES = { width: W, height: W / (920 / 720) };
</script>

<MainContainer>
	<Container
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height * 0.46}
		pivot={anchorToPivot({ anchor: 0.5, sizes: SIZES })}
	>
		<Rectangle {...SIZES} borderRadius={24} backgroundColor={DARK} backgroundAlpha={0.96} borderColor={props.accent ?? ACCENT} borderWidth={5} />
		{@render props.children({ sizes: SIZES })}
	</Container>
</MainContainer>
