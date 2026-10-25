<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut, cubicOut } from 'svelte/easing';
	import { Container, Sprite, SpriteSheet } from 'pixi-svelte';
	import { stateBet } from 'state-shared';

	import { getContext } from '../game/context';
	import { THEME } from '../game/theme';
	import { clock } from '../game/clock.svelte';

	// A mascot standing on (x, y) = the point between its feet.
	// With animated sheets (THEME.mascotAnim) it loops its idle and plays its cheer (attack) once
	// when a win lands. Until the sheets arrive, or without them, the still breathes and sways
	// from the feet and hops on wins.
	type Props = {
		key: string;
		side: 'Left' | 'Right';
		x: number;
		y: number;
		width: number;
		height: number;
		phase: number;
		facing: 1 | -1;
		anchor?: unknown; // passed along by the slot fitter; the mascot always stands on its feet
	};

	const props: Props = $props();
	const context = getContext();

	const FPS = 12;
	// sheet frames are 300x400 with the character's feet on the bottom edge; the frame also holds
	// the room for the attack (raised club, fire blast), so it draws a little taller than the still
	const FRAME_HEIGHT = 400;
	const FRAME_GROWTH = 1.18;
	const idleKey = $derived(`themeMascot${props.side}Idle`);
	const cheerKey = $derived(`themeMascot${props.side}Cheer`);
	const sheetsReady = $derived(
		THEME.mascotAnim &&
			!!context.stateApp.loadedAssets?.[idleKey] &&
			!!context.stateApp.loadedAssets?.[cheerKey],
	);

	let state = $state<'idle' | 'cheer'>('idle');
	const hop = new Tween(0);
	const cheer = new Tween(1);

	let lastWin = stateBet.winBookEventAmount;
	$effect(() => {
		const win = stateBet.winBookEventAmount;
		if (win > lastWin) celebrate();
		lastWin = win;
	});

	const celebrate = async () => {
		if (sheetsReady) {
			state = 'cheer';
			return;
		}
		cheer.set(1.06, { duration: 160, easing: backOut });
		await hop.set(1, { duration: 180, easing: cubicOut });
		cheer.set(1, { duration: 260, easing: backOut });
		await hop.set(0, { duration: 260, easing: backOut });
	};

	const breath = $derived(sheetsReady ? 0 : Math.sin(clock.t * 2.1 + props.phase));
	const sway = $derived(sheetsReady ? 0 : Math.sin(clock.t * 1.3 + props.phase) * 0.018 * props.facing);
</script>

{#if sheetsReady}
	<!-- layout lives on the Container: changing a SpriteSheet prop re-applies its textures and
	     stops the animation, so resizes must not touch it -->
	<Container x={props.x} y={props.y} scale={(props.height * FRAME_GROWTH) / FRAME_HEIGHT}>
		{#key state}
			<SpriteSheet
				key={state === 'idle' ? idleKey : cheerKey}
				anchor={{ x: 0.5, y: 1 }}
				animationSpeed={FPS / 60}
				loop={state === 'idle'}
				play
				onComplete={() => (state = 'idle')}
			/>
		{/key}
	</Container>
{:else}
	<Container
		x={props.x}
		y={props.y - hop.current * props.height * 0.07}
		rotation={sway}
		scale={{ x: cheer.current * (1 - 0.008 * breath), y: cheer.current * (1 + 0.016 * breath) }}
	>
		<Sprite key={props.key} anchor={{ x: 0.5, y: 1 }} width={props.width} height={props.height} />
	</Container>
{/if}
