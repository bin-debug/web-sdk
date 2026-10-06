<script lang="ts" module>
	export type EmitterEventBoardFrame = { type: 'boardFrameGlowShow' } | { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import _ from 'lodash';
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	import { Rectangle, Sprite } from 'pixi-svelte';
	import { NineSlice } from 'kit-fx';

	import BoardContainer from './BoardContainer.svelte';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS, BOARD_SIZES } from '../game/constants';
	import { getSymbolX, getSymbolY } from '../game/utils';
	import { getContext } from '../game/context';
	import { getArt } from '../game/art';
	import { SPEC } from '../game/spec';

	const context = getContext();
	const art = getArt();
	const cell = SYMBOL_SIZE - (SPEC.board.gap ?? 4);
	const accent = parseInt(SPEC.ui.accent.slice(1), 16);
	const backing = parseInt(SPEC.palette[0].slice(1), 16);
	const frameSlice = art.slot('board.frame')?.slice;
	const margin = SYMBOL_SIZE * 0.12;

	const glow = new Tween(0);
	let glowing = $state(false);
	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => (glowing = true),
		boardFrameGlowHide: () => (glowing = false),
	});
	onMount(() => {
		let alive = true;
		(async () => {
			while (alive) {
				await glow.set(glowing ? 1 : 0, { duration: 700, easing: sineInOut });
				await glow.set(glowing ? 0.35 : 0, { duration: 700, easing: sineInOut });
			}
		})();
		return () => (alive = false);
	});
</script>

<BoardContainer>
	<Rectangle
		x={-margin}
		y={-margin}
		width={BOARD_SIZES.width + margin * 2}
		height={BOARD_SIZES.height + margin * 2}
		borderRadius={SYMBOL_SIZE * 0.16}
		backgroundColor={backing}
		backgroundAlpha={0.82}
	/>
	{#each _.range(BOARD_DIMENSIONS.x) as reel}
		{#each _.range(BOARD_DIMENSIONS.y) as row}
			<Sprite key="board.cell" anchor={0.5} x={getSymbolX(reel)} y={getSymbolY(row)} width={cell} height={cell} alpha={0.9} />
		{/each}
	{/each}
	{#if frameSlice && art.has('board.frame')}
		<NineSlice
			key="board.frame"
			x={-margin * 2.2}
			y={-margin * 2.2}
			width={BOARD_SIZES.width + margin * 4.4}
			height={BOARD_SIZES.height + margin * 4.4}
			inset={frameSlice}
			border={SYMBOL_SIZE * 0.3}
		/>
	{:else}
		<Rectangle
			x={-margin}
			y={-margin}
			width={BOARD_SIZES.width + margin * 2}
			height={BOARD_SIZES.height + margin * 2}
			borderRadius={SYMBOL_SIZE * 0.16}
			borderColor={accent}
			borderWidth={4}
		/>
	{/if}
	{#if glow.current > 0.02}
		<Rectangle
			x={-margin}
			y={-margin}
			width={BOARD_SIZES.width + margin * 2}
			height={BOARD_SIZES.height + margin * 2}
			borderRadius={SYMBOL_SIZE * 0.16}
			borderColor={accent}
			borderWidth={8}
			alpha={glow.current}
		/>
	{/if}
</BoardContainer>
