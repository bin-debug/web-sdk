<script lang="ts">
	import { Container, Rectangle, Text } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { BOARD_DIMENSIONS, BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { textStyle } from '../../game/ui';
	import { triggerLayer } from './triggerState.svelte';

	const S = SYMBOL_SIZE;
	const H = BOARD_SIZES.height;
	const lastRow = BOARD_DIMENSIONS.y - 1;
</script>

<BoardContainer zIndex={22}>
	<!-- the trigger row: a red glow strip around the bottom row (code only) -->
	<Rectangle x={0} y={S * lastRow} width={BOARD_SIZES.width} height={S} backgroundColor={0xff3b30} backgroundAlpha={0.12} borderColor={0xff3b30} borderWidth={S * 0.03} borderAlpha={0.7} />
	{#each triggerLayer.pillars as p (p.reel)}
		{@const h = S + (H - S) * p.grow.current}
		<Rectangle
			x={S * p.reel + S * 0.04}
			y={H - h}
			width={S * 0.92}
			height={h}
			borderRadius={S * 0.14}
			backgroundColor={p.kind === 'fs' ? 0x7a3cff : 0xff3b30}
			backgroundAlpha={0.85 * p.fade.current}
			borderColor={0xffe887}
			borderWidth={S * 0.04}
			borderAlpha={p.fade.current}
		/>
	{/each}
	{#each triggerLayer.tiles as tile (tile.id)}
		<Container x={S * (tile.pos.reel + 0.5)} y={S * (tile.pos.row + 0.5)} scale={{ x: Math.max(0.001, tile.flip.current * tile.pop.current), y: tile.pop.current }} zIndex={30}>
			<Rectangle anchor={0.5} width={S * 0.82} height={S * 0.82} borderRadius={S * 0.16} backgroundColor={0x7a3cff} borderColor={0xffe887} borderWidth={S * 0.05} />
			<Text anchor={0.5} text="FS" style={textStyle(S * 0.34, 0xffffff, 0x2a1050)} />
		</Container>
	{/each}
</BoardContainer>
