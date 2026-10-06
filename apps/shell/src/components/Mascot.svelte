<script lang="ts" module>
	export type MascotMood = 'win' | 'bigwin' | 'bonus' | 'anticipate' | 'throw';
	export type EmitterEventMascot = { type: 'mascotReact'; mood: MascotMood };
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { sineInOut, backOut, cubicOut } from 'svelte/easing';
	import { Container, Sprite, SpriteSheet } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import { getArt } from '../game/art';

	const context = getContext();
	const art = getArt();
	const place = $derived(context.stateGameDerived.composition().mascot);

	const CLIP: Record<MascotMood, string> = {
		win: 'mascot.win_small',
		bigwin: 'mascot.win_big',
		bonus: 'mascot.bonus_trigger',
		anticipate: 'mascot.anticipate',
		throw: 'mascot.throw',
	};

	// a clip (sprite sheet) when the art has one; otherwise code reactions on the still
	let clip = $state<string | null>(null);
	const bob = new Tween(0);
	const lift = new Tween(0);
	const tilt = new Tween(0);
	const punch = new Tween(1);
	let busy = false;

	const hasIdle = $derived(art.has('mascot.idle') && Boolean(context.stateApp.loadedAssets?.['mascot.idle']));
	const master = $derived(context.stateApp.loadedAssets?.['mascot.master'] as { width: number; height: number } | undefined);
	const aspect = $derived(master && master.height ? master.width / master.height : 0.6);

	const react = async (mood: MascotMood) => {
		if (busy) return;
		busy = true;
		const id = CLIP[mood];
		if (art.has(id) && context.stateApp.loadedAssets?.[id]) {
			clip = id;
			await new Promise<void>((resolve) => (finishClip = resolve));
			clip = null;
		} else if (mood === 'bigwin' || mood === 'bonus' || mood === 'win') {
			for (let i = 0; i < (mood === 'win' ? 1 : 2); i++) {
				await lift.set(-place.height * 0.14, { duration: 180, easing: cubicOut });
				await lift.set(0, { duration: 220, easing: backOut });
			}
		} else {
			await Promise.all([tilt.set(0.2, { duration: 160, easing: cubicOut }), punch.set(1.1, { duration: 160, easing: backOut })]);
			await new Promise((r) => setTimeout(r, 350));
			await Promise.all([tilt.set(0, { duration: 260 }), punch.set(1, { duration: 260 })]);
		}
		busy = false;
	};
	let finishClip: () => void = () => {};

	onMount(() => {
		let alive = true;
		(async () => {
			while (alive) {
				await bob.set(-place.height * 0.012, { duration: 1100, easing: sineInOut });
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

{#if place.visible}
	<MainContainer>
		<Container x={place.x} y={place.y + (hasIdle || clip ? 0 : bob.current + lift.current)} rotation={tilt.current} scale={punch.current} zIndex={40}>
			{#if clip}
				<SpriteSheet
					key={clip}
					anchor={0.5}
					width={place.height}
					height={place.height}
					animationSpeed={15 / 60}
					loop={false}
					play={true}
					onComplete={() => finishClip()}
				/>
			{:else if hasIdle}
				<SpriteSheet key="mascot.idle" anchor={0.5} width={place.height} height={place.height} animationSpeed={15 / 60} loop={true} play={true} />
			{:else}
				<Sprite key="mascot.master" anchor={0.5} width={place.height * aspect} height={place.height} />
			{/if}
		</Container>
	</MainContainer>
{/if}
