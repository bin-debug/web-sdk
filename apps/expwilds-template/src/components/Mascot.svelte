<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut, cubicOut } from 'svelte/easing';
	import { Container, Sprite } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { clock } from '../game/clock.svelte';

	// A still mascot made to feel alive until Artlist animations replace it: it breathes and
	// sways from the feet, and hops when a win lands. Stands on (x, y) = the point between its feet.
	type Props = {
		key: string;
		x: number;
		y: number;
		width: number;
		height: number;
		phase: number;
		facing: 1 | -1;
		anchor?: unknown; // passed along by the slot fitter; the mascot always stands on its feet
	};

	const props: Props = $props();
	const hop = new Tween(0);
	const cheer = new Tween(1);

	let lastWin = stateBet.winBookEventAmount;
	$effect(() => {
		const win = stateBet.winBookEventAmount;
		if (win > lastWin) celebrate();
		lastWin = win;
	});

	const celebrate = async () => {
		cheer.set(1.06, { duration: 160, easing: backOut });
		await hop.set(1, { duration: 180, easing: cubicOut });
		cheer.set(1, { duration: 260, easing: backOut });
		await hop.set(0, { duration: 260, easing: backOut });
	};

	const breath = $derived(Math.sin(clock.t * 2.1 + props.phase));
	const sway = $derived(Math.sin(clock.t * 1.3 + props.phase) * 0.018 * props.facing);
</script>

<Container
	x={props.x}
	y={props.y - hop.current * props.height * 0.07}
	rotation={sway}
	scale={{ x: cheer.current * (1 - 0.008 * breath), y: cheer.current * (1 + 0.016 * breath) }}
>
	<Sprite key={props.key} anchor={{ x: 0.5, y: 1 }} width={props.width} height={props.height} />
</Container>
