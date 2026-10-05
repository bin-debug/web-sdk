<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { Circle, Text } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';

	const context = getContext();

	let show = $state(false);
	let freeSpinsFromEvent = $state(0);
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => (show = true),
		freeSpinIntroHide: () => (show = false),
		freeSpinIntroUpdate: async (emitterEvent) => {
			// if (emitterEvent.extraSpins) {
			// 	context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_fs_respins' });
			// }
			// freeSpinsFromEvent = emitterEvent.extraSpins ?? emitterEvent.totalFreeSpins;
			freeSpinsFromEvent = emitterEvent.totalFreeSpins;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.5} />

	<FreeSpinAnimation>
		{#snippet children({ sizes })}
			<Text
				anchor={{ x: 0.5, y: 0.5 }}
				x={sizes.width * 0.5}
				y={sizes.height * 0.22}
				text="FREE SPINS"
				style={{
					fontFamily: 'proxima-nova',
					fontWeight: '800',
					fontSize: sizes.width * 0.11,
					fill: 0xf5c542,
					stroke: { color: 0x1a1038, width: 6 },
				}}
			/>

			<Circle
				anchor={0.5}
				x={sizes.width * 0.5}
				y={sizes.height * 0.52}
				diameter={sizes.width * 0.32}
				backgroundColor={0x0e2f2b}
				borderColor={0x13c4a3}
				borderWidth={6}
			/>
			<Text
				anchor={{ x: 0.5, y: 0.5 }}
				x={sizes.width * 0.5}
				y={sizes.height * 0.52}
				text={freeSpinsFromEvent}
				style={{
					fontFamily: 'proxima-nova',
					fontWeight: '800',
					fontSize: sizes.width * 0.16,
					fill: 0xffffff,
				}}
			/>
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
