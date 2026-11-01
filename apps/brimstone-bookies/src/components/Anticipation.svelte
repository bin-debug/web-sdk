<script lang="ts">
	import { onMount } from 'svelte';
	import { Graphics } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import { getContext } from '../game/context';
	import type { Reel } from '../game/stateGame.svelte';
	import { BOARD_DIMENSIONS, REEL_PADDING, SYMBOL_SIZE } from '../game/constants';
	import { FX } from '../game/fx.svelte';

	// Our own anticipation (in place of the template's gold spine): the reel gets a pulsing red
	// column with a black edge while it is still spinning, and fades out when it stops.
	type Props = {
		reel: Reel;
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	let t = $state(0);
	let fade = $state(0);
	let done = false;

	onMount(() => {
		let raf = 0;
		let last = performance.now();
		const tick = (now: number) => {
			const dt = ((now - last) / 1000) * stateBetDerived.timeScale();
			last = now;
			t += dt;
			const stopping = props.reel.reelState.motion === 'stopped';
			fade = Math.max(0, Math.min(1, fade + (stopping ? -dt * 4 : dt * 5)));
			if (stopping && fade === 0 && !done) {
				done = true;
				props.oncomplete();
				return;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	const x = $derived(
		context.stateGameDerived.boardLayout().x -
			context.stateGameDerived.boardLayout().width * 0.5 +
			(props.reel.reelIndex + REEL_PADDING) * SYMBOL_SIZE,
	);
</script>

<Graphics
	{x}
	y={context.stateGameDerived.boardLayout().y}
	draw={(g) => {
		const w = SYMBOL_SIZE * 1.02;
		const h = SYMBOL_SIZE * BOARD_DIMENSIONS.y * 1.02;
		const pulse = 0.5 + 0.5 * Math.sin(t * 9);
		g.roundRect(-w / 2, -h / 2, w, h, w * 0.14).fill({ color: FX.red, alpha: (0.1 + 0.08 * pulse) * fade });
		g.roundRect(-w / 2, -h / 2, w, h, w * 0.14).stroke({ color: 0x000000, width: SYMBOL_SIZE * 0.08, alpha: fade });
		g.roundRect(-w / 2, -h / 2, w, h, w * 0.14).stroke({ color: FX.red, width: SYMBOL_SIZE * (0.04 + 0.03 * pulse), alpha: fade });
	}}
/>
