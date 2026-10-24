<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { THEME } from '../game/theme';
	import Mascot from './Mascot.svelte';
	import { boardOnCanvas, hudSpace, isPortraitHud } from './hud/layout';

	// Where the logo and the two mascots go, measured from Hacksaw's Coffee Dealer.
	// Phone: logo above the board, mascots under it either side of the spin button.
	// Desktop: logo top-left, mascots standing in the bottom corners beside the board.
	// Theme art fills a slot (logo 1200x800, mascots 800x1200, both transparent PNG/WebP);
	// a slot without art shows a faint placeholder.
	const SHOW_PLACEHOLDERS = true;
	const LOGO_RATIO = 1200 / 800;
	const MASCOT_RATIO = 800 / 1200;

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
			// mascots stand from just under the frame (heads tucked behind it) down to the controls
			const mascotTop = board.bottom - 24 * s;
			const mascotBottom = canvas.height - 46 * s;
			const mascotHeight = Math.max(0, mascotBottom - mascotTop);
			return {
				logo: { x: canvas.width / 2, y: board.top / 2, width: canvas.width * 0.86, height: board.top * 0.92 },
				mascots: [0.27, 0.73].map((fx) => ({
					x: canvas.width * fx,
					y: mascotTop + mascotHeight / 2,
					width: canvas.width * 0.5,
					height: mascotHeight,
				})),
			};
		}

		const side = board.left;
		const logoWidth = Math.min(side * 0.92, 440 * s);
		const mascotHeight = canvas.height * 0.64;
		return {
			logo: { x: side / 2, y: 30 * s + logoWidth / LOGO_RATIO / 2, width: logoWidth, height: logoWidth / LOGO_RATIO },
			// feet at the bottom edge, the bet bar overlaps them like in Hacksaw's games
			mascots: [side / 2, canvas.width - side / 2].map((x) => ({
				x,
				y: canvas.height - mascotHeight / 2 + 8 * s,
				width: side * 0.98,
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
	<Mascot key="themeMascotLeft" {...fit(slots.mascots[0], MASCOT_RATIO)} phase={0} facing={1} />
	<Mascot key="themeMascotRight" {...fit(slots.mascots[1], MASCOT_RATIO)} phase={1.7} facing={-1} />
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
