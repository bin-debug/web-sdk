<script lang="ts">
	import { Graphics } from 'pixi-svelte';
	import { FX } from '../game/fx.svelte';

	// Flat dark panel in the Hacksaw style: hard shadow, thick black outline, thin light inner
	// line and a red tab on top. Drawn, not an image, so it fits any size.
	type Props = { width: number; height: number; x?: number; y?: number; accent?: number };
	const props: Props = $props();
</script>

<Graphics
	x={props.x ?? 0}
	y={props.y ?? 0}
	draw={(g) => {
		const w = props.width;
		const h = props.height;
		const ox = -w / 2;
		const oy = -h / 2;
		const r = Math.min(w, h) * 0.1;
		const s = Math.max(4, Math.min(w, h) * 0.035);
		g.roundRect(ox + s * 1.4, oy + s * 1.4, w, h, r).fill({ color: 0x000000, alpha: 0.55 });
		g.roundRect(ox, oy, w, h, r).fill({ color: FX.panel, alpha: 0.95 }).stroke({ color: 0x000000, width: s });
		g.roundRect(ox + s * 1.5, oy + s * 1.5, w - s * 3, h - s * 3, r * 0.7).stroke({
			color: FX.edge,
			width: Math.max(1.5, s * 0.3),
			alpha: 0.7,
		});
		g.roundRect(-w * 0.18, oy - s * 0.9, w * 0.36, s * 1.9, s * 0.9)
			.fill(props.accent ?? FX.red)
			.stroke({ color: 0x000000, width: s * 0.5 });
	}}
/>
