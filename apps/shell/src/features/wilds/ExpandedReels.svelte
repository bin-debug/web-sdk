<script lang="ts">
	import { Container, Rectangle, Circle, Text } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import { expandLayer, WHO_LOOK } from './expandState.svelte';

	const S = SYMBOL_SIZE;
	const H = BOARD_SIZES.height;
</script>

<BoardContainer zIndex={24}>
	{#each expandLayer.reels as r (r.reel)}
		{@const look = WHO_LOOK[r.who] ?? WHO_LOOK.small}
		{@const h = H * (0.25 + 0.75 * r.expand.current)}
		<Container x={S * (r.reel + 0.5)} y={H / 2} alpha={Math.min(1, r.expand.current * 2)}>
			<Rectangle x={-S * 0.46} y={-h / 2} width={S * 0.92} height={h} borderRadius={S * 0.14} backgroundColor={look.face} backgroundAlpha={1} borderColor={look.rim} borderWidth={S * 0.05} />
			{#if r.expand.current > 0.6}
				<!-- the character pops up and shows this spin's multiplier -->
				<Container y={-S * 0.55} scale={0.4 + 0.6 * r.pop.current}>
					<Circle anchor={0.5} diameter={S * 0.7} backgroundColor={0xffffff} borderColor={look.rim} borderWidth={S * 0.05} />
					<Text anchor={0.5} text="W" style={textStyle(S * 0.32, look.rim, 0xffffff)} />
				</Container>
				<Container y={S * 0.45} scale={0.85 + 0.15 * r.pop.current}>
					<Text anchor={0.5} text={`x${Math.round(r.shown.current)}`} style={textStyle(S * 0.46, 0xffffff, 0x2a1a05)} />
				</Container>
			{/if}
		</Container>
	{/each}
</BoardContainer>
