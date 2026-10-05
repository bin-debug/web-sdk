<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Container } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import BoardContainer from './BoardContainer.svelte';

	type Props = {
		show: boolean;
		children: Snippet;
	};

	const props: Props = $props();
	const context = getContext();

	// Stash boxes own the strip above the board during free spins, so the meter moves aside.
	const inBonus = $derived(context.stateGame.gameType !== 'basegame');
	const desktopPosition = $derived(
		inBonus
			? { x: context.stateGameDerived.boardLayout().width + SYMBOL_SIZE * 1.35, y: SYMBOL_SIZE * 0.6 }
			: { x: context.stateGameDerived.boardLayout().width * 0.5, y: -SYMBOL_SIZE * 0.8 * 0.58 },
	);

	// Shifted left of board-centre so it doesn't fight the mascot (upper-right) for space.
	const portraitPosition = $derived({
		x: context.stateGameDerived.boardLayout().width * 0.36,
		y: inBonus ? -SYMBOL_SIZE * 1.15 : -SYMBOL_SIZE * 0.8 * 0.68,
	});

	const position = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()) ? desktopPosition : portraitPosition,
	);

	const scale = $derived(context.stateLayoutDerived.isStacked() ? 1.28 : 1);
</script>

<FadeContainer show={props.show}>
	<BoardContainer>
		<Container {...position} {scale}>
			{@render props.children()}
		</Container>
	</BoardContainer>
</FadeContainer>
