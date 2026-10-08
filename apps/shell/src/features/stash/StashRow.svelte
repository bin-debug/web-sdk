<script lang="ts">
	import { Container, Rectangle, Text } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { BOARD_DIMENSIONS, SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import { stashLayer } from './stashState.svelte';

	const S = SYMBOL_SIZE;
	const label = (value: number, banked: boolean) => (banked ? `${Math.round(value) / 100}x` : `x${Math.round(value * 100) / 100}`);
</script>

<!-- below the board: the area above it holds the win pill and multiplier badge -->
<BoardContainer zIndex={125}>
	{#each stashLayer.boxes as box (box.reel)}
		{@const text = label(box.value.current, box.banked)}
		<Container x={S * (box.reel + 0.5)} y={S * (BOARD_DIMENSIONS.y + 0.3)} scale={box.bump.current} alpha={1 - box.drain.current}>
			<Rectangle anchor={0.5} width={S * 0.86} height={S * 0.38} borderRadius={S * 0.1} backgroundColor={box.banked ? 0xffc83d : 0x5b3abf} borderColor={0xfff0a8} borderWidth={S * 0.035} />
			<Text anchor={0.5} {text} style={textStyle(S * (text.length > 4 ? 0.18 : 0.23), box.banked ? 0x2a1a05 : 0xffffff, 0x1a1030)} />
		</Container>
	{/each}
</BoardContainer>
