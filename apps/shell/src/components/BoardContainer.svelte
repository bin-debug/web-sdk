<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Container } from 'pixi-svelte';

	import { getContext } from '../game/context';

	type Props = {
		children: Snippet;
		zIndex?: number;
	};

	const props: Props = $props();

	const context = getContext();
</script>

<Container
	x={context.stateGameDerived.boardLayout().x}
	y={context.stateGameDerived.boardLayout().y}
	pivot={context.stateGameDerived.boardLayout().pivot}
	scale={context.stateGameDerived.boardLayout().scale}
	zIndex={props.zIndex}
>
	{@render props.children()}
</Container>
