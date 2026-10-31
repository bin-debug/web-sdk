<script lang="ts">
	import { onMount } from 'svelte';
	import { Graphics } from 'pixi-svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { FX } from '../game/fx.svelte';

	// Our own winning-cell / multiplier-spot frame (in place of the template's gold spine): a
	// rounded square with a black edge and a red outline that pulses.
	type Props = { x?: number; y?: number; fill?: boolean };
	const props: Props = $props();

	let pulse = $state(0);
	onMount(() => {
		let raf = 0;
		const tick = (now: number) => {
			pulse = 0.5 + 0.5 * Math.sin(now / 160);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<Graphics
	x={props.x ?? 0}
	y={props.y ?? 0}
	draw={(g) => {
		const s = SYMBOL_SIZE * 0.92;
		const r = s * 0.16;
		if (props.fill) g.roundRect(-s / 2, -s / 2, s, s, r).fill({ color: FX.red, alpha: 0.16 });
		g.roundRect(-s / 2, -s / 2, s, s, r).stroke({ color: FX.red, width: SYMBOL_SIZE * (0.1 + 0.05 * pulse), alpha: 0.25 });
		g.roundRect(-s / 2, -s / 2, s, s, r).stroke({ color: 0x000000, width: SYMBOL_SIZE * 0.07 });
		g.roundRect(-s / 2, -s / 2, s, s, r).stroke({ color: FX.red, width: SYMBOL_SIZE * 0.035, alpha: 0.75 + 0.25 * pulse });
	}}
/>
