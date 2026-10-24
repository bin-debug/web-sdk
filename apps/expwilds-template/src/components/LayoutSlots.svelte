<script lang="ts">
	import { Rectangle } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { boardOnCanvas, hudSpace, isPortraitHud } from './hud/layout';

	// Where the logo and the two mascots go, measured from Hacksaw's Coffee Dealer.
	// Phone: logo above the board, mascots under it either side of the spin button.
	// Desktop: logo top-left, mascots standing in the bottom corners beside the board.
	// Drawn as faint placeholders until a theme supplies the art.
	const SHOW_PLACEHOLDERS = true;

	const context = getContext();

	const slots = $derived.by(() => {
		const canvas = context.stateLayoutDerived.canvasSizes();
		const board = boardOnCanvas();
		const s = hudSpace().scale;

		if (isPortraitHud()) {
			const mascotHeight = Math.max(0, canvas.height - board.bottom - 70 * s);
			return {
				logo: { x: canvas.width / 2, y: board.top / 2, width: Math.min(260 * s, canvas.width * 0.7), height: board.top * 0.7 },
				mascots: [0.25, 0.75].map((fx) => ({
					x: canvas.width * fx,
					y: board.bottom + 10 * s + mascotHeight / 2,
					width: Math.min(mascotHeight * 0.8, canvas.width * 0.42),
					height: mascotHeight,
				})),
			};
		}

		const side = board.left;
		const mascotHeight = Math.min(380 * s, canvas.height * 0.45);
		return {
			logo: { x: side / 2, y: 150 * s, width: Math.min(side * 0.8, 260 * s), height: 160 * s },
			mascots: [side / 2, canvas.width - side / 2].map((x) => ({
				x,
				y: canvas.height - mascotHeight / 2 - 10 * s,
				width: Math.min(side * 0.85, mascotHeight * 0.8),
				height: mascotHeight,
			})),
		};
	});
</script>

{#if SHOW_PLACEHOLDERS}
	{#each [slots.logo, ...slots.mascots] as slot}
		{#if slot.width > 0 && slot.height > 0}
			<Rectangle
				anchor={0.5}
				x={slot.x}
				y={slot.y}
				width={slot.width}
				height={slot.height}
				borderRadius={16}
				backgroundColor={0xffffff}
				backgroundAlpha={0.08}
				borderColor={0xffffff}
				borderWidth={2}
				borderAlpha={0.35}
			/>
		{/if}
	{/each}
{/if}
