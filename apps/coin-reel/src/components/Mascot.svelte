<script lang="ts" module>
	export type MascotMood = 'point' | 'cheer';
	export type EmitterEventMascot = { type: 'mascotReact'; mood: MascotMood };
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { sineInOut, backOut, cubicOut } from 'svelte/easing';
	import { Container, Sprite } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';

	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';

	// Captain Kachink master still; idle/point/cheer video clips land in a later step.
	const MASCOT_TEXTURE = 'captainKachink';

	const context = getContext();
	const bob = new Tween(0);
	const lift = new Tween(0);
	const tilt = new Tween(0);
	const punch = new Tween(1);

	const isPortrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const SIZE = $derived(isPortrait ? SYMBOL_SIZE * 1.6 : SYMBOL_SIZE * 2.6);
	const visible = true;
	const position = $derived(
		isPortrait
			? {
					x:
						context.stateGameDerived.boardLayout().x +
						context.stateGameDerived.boardLayout().width * 0.5 -
						SIZE * 0.55,
					y: context.stateGameDerived.boardLayout().y - context.stateGameDerived.boardLayout().height * 0.5 - SIZE * 0.58,
				}
			: {
					x:
						context.stateGameDerived.boardLayout().x -
						context.stateGameDerived.boardLayout().width * 0.5 -
						SIZE * 0.62,
					y: context.stateGameDerived.boardLayout().y + SYMBOL_SIZE * 0.9,
				},
	);

	let busy = false;
	const react = async (mood: MascotMood) => {
		if (busy) return;
		busy = true;
		if (mood === 'point') {
			await Promise.all([
				tilt.set(0.22, { duration: 160, easing: cubicOut }),
				punch.set(1.12, { duration: 160, easing: backOut }),
			]);
			await new Promise((r) => setTimeout(r, 450));
			await Promise.all([tilt.set(0, { duration: 260 }), punch.set(1, { duration: 260 })]);
		} else {
			for (let i = 0; i < 2; i++) {
				await lift.set(-SYMBOL_SIZE * 0.45, { duration: 180, easing: cubicOut });
				await lift.set(0, { duration: 220, easing: backOut });
			}
		}
		busy = false;
	};

	onMount(() => {
		let alive = true;
		(async () => {
			while (alive) {
				await bob.set(-SYMBOL_SIZE * 0.08, { duration: 1100, easing: sineInOut });
				await bob.set(0, { duration: 1100, easing: sineInOut });
			}
		})();
		return () => (alive = false);
	});

	context.eventEmitter.subscribeOnMount({
		mascotReact: ({ mood }) => {
			react(mood);
		},
	});
</script>

{#if visible}
	<MainContainer>
		<Container
			x={position.x}
			y={position.y + bob.current + lift.current}
			rotation={tilt.current}
			scale={punch.current}
		>
			<Sprite key={MASCOT_TEXTURE} anchor={0.5} width={SIZE} height={SIZE} />
		</Container>
	</MainContainer>
{/if}
