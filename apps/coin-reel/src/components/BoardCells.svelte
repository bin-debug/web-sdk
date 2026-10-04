<script lang="ts">
	import _ from 'lodash';
	import { Rectangle } from 'pixi-svelte';

	import BoardContainer from './BoardContainer.svelte';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS, BOARD_SIZES } from '../game/constants';
	import { getSymbolX, getSymbolY } from '../game/utils';

	// Rows are visible indices (0 = top). The bottom row is the trigger row.
	const CELL = SYMBOL_SIZE * 0.94;
	const TRIGGER_ROW = BOARD_DIMENSIONS.y - 1;
</script>

<BoardContainer>
	<Rectangle
		x={getSymbolX(0) - SYMBOL_SIZE * 0.5 - 10}
		y={-10}
		width={BOARD_SIZES.width + 20}
		height={BOARD_SIZES.height + 20}
		borderRadius={18}
		backgroundColor={0x0d0e12}
		backgroundAlpha={0.92}
		borderColor={0x3a3d48}
		borderWidth={3}
	/>
	<Rectangle
		x={getSymbolX(0) - SYMBOL_SIZE * 0.5}
		y={getSymbolY(TRIGGER_ROW) - SYMBOL_SIZE * 0.5}
		width={BOARD_SIZES.width}
		height={SYMBOL_SIZE}
		borderRadius={12}
		backgroundColor={0x13c4a3}
		backgroundAlpha={0.22}
	/>
	{#each _.range(BOARD_DIMENSIONS.x) as reel}
		{#each _.range(BOARD_DIMENSIONS.y) as row}
			<Rectangle
				anchor={0.5}
				x={getSymbolX(reel)}
				y={getSymbolY(row)}
				width={CELL}
				height={CELL}
				borderRadius={12}
				backgroundColor={row === TRIGGER_ROW ? 0x123a35 : 0x1c1f27}
				backgroundAlpha={0.9}
				borderColor={row === TRIGGER_ROW ? 0x13c4a3 : 0x2c303b}
				borderWidth={2}
			/>
		{/each}
	{/each}
</BoardContainer>
