<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicIn, cubicOut, backOut } from 'svelte/easing';
	import { Container, Graphics, Sprite } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import { getContext } from '../game/context';
	import { FX, fx } from '../game/fx.svelte';

	// Iris wipe with a red rim: it closes on the centre, a pair of dice slams in while the screen
	// is covered (that is when the base/bonus look swaps), then it opens again.
	type Props = { oncomplete: () => void };
	const props: Props = $props();
	const context = getContext();

	const iris = new Tween(1);
	const dice = new Tween(0);
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const full = $derived(Math.hypot(canvas.width, canvas.height) / 2 + 12);
	const diceSize = $derived(Math.min(canvas.width, canvas.height) * 0.32);

	(async () => {
		const speed = stateBetDerived.timeScale();
		await iris.set(0, { duration: 480 / speed, easing: cubicIn });
		fx.bonus = !fx.pendingExit;
		fx.pendingExit = false;
		await dice.set(1, { duration: 420 / speed, easing: backOut });
		await new Promise((resolve) => setTimeout(resolve, 260 / speed));
		dice.set(0, { duration: 200 / speed, easing: cubicIn });
		await iris.set(1, { duration: 520 / speed, easing: cubicOut });
		props.oncomplete();
	})();
</script>

<Graphics
	draw={(g) => {
		const r = full * iris.current;
		g.rect(-20, -20, canvas.width + 40, canvas.height + 40).fill(0x0a0a0a);
		if (r > 0.5) {
			g.circle(canvas.width / 2, canvas.height / 2, r).cut();
			g.circle(canvas.width / 2, canvas.height / 2, r).stroke({ color: FX.red, width: Math.max(6, full * 0.025) });
		}
	}}
/>
{#if dice.current > 0.01}
	<Container x={canvas.width / 2} y={canvas.height / 2} scale={dice.current} rotation={(1 - dice.current) * 2.4}>
		<Sprite key="h2.webp" anchor={0.5} width={diceSize} height={diceSize} />
	</Container>
{/if}
