<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { THEME } from '../game/theme';
	import { boardOnCanvas, hudSpace, isPortraitHud } from './hud/layout';

	// Where the logo and the two mascots go, measured from Hacksaw's Coffee Dealer.
	// Phone: logo above the board, mascots under it either side of the spin button.
	// Desktop: logo top-left, mascots standing in the bottom corners beside the board.
	// Theme art fills a slot (logo 1200x600, mascots 800x1000, both transparent PNG/WebP);
	// a slot without art shows a faint placeholder.
	const SHOW_PLACEHOLDERS = true;
	const LOGO_RATIO = 1200 / 600;
	const MASCOT_RATIO = 800 / 1000;

	type Slot = { x: number; y: number; width: number; height: number };

	// largest image of the given width/height ratio that fits the slot, standing on its bottom edge
	const fit = (slot: Slot, ratio: number) => {
		const width = Math.min(slot.width, slot.height * ratio);
		const height = width / ratio;
		return { x: slot.x, y: slot.y + slot.height / 2, width, height, anchor: { x: 0.5, y: 1 } };
	};

	const context = getContext();

	const slots = $derived.by(() => {
		const canvas = context.stateLayoutDerived.canvasSizes();
		// measure from the outside of the theme frame (if any) so nothing tucks under it
		const reels = boardOnCanvas();
		const grow = THEME.frame ? (reels.width * (THEME.frameScale - 1)) / 2 : 0;
		const board = {
			left: reels.left - grow,
			right: reels.right + grow,
			top: reels.top - grow,
			bottom: reels.bottom + grow,
		};
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

{#if THEME.logo}
	<!-- the logo is centred in its slot; mascots stand on the slot's bottom edge -->
	<Sprite key="themeLogo" {...fit(slots.logo, LOGO_RATIO)} anchor={0.5} y={slots.logo.y} />
{/if}
{#if THEME.mascots}
	<Sprite key="themeMascotLeft" {...fit(slots.mascots[0], MASCOT_RATIO)} />
	<Sprite key="themeMascotRight" {...fit(slots.mascots[1], MASCOT_RATIO)} />
{/if}

{#if SHOW_PLACEHOLDERS}
	{#each [...(THEME.logo ? [] : [slots.logo]), ...(THEME.mascots ? [] : slots.mascots)] as slot}
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
