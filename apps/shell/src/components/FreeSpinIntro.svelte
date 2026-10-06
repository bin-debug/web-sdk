<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number; title?: string };
</script>

<script lang="ts">
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { Circle, Text } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import PressToContinue from './PressToContinue.svelte';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';
	import { ACCENT, textStyle } from '../game/ui';
	import { SPEC } from '../game/spec';

	const context = getContext();

	let show = $state(false);
	let total = $state(0);
	let title = $state(SPEC.bonuses[0]?.name ?? 'FREE SPINS');
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => (show = true),
		freeSpinIntroHide: () => (show = false),
		freeSpinIntroUpdate: async (e) => {
			total = e.totalFreeSpins;
			if (e.title) title = e.title;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.55} />

	<FreeSpinAnimation>
		{#snippet children({ sizes })}
			<Text anchor={0.5} x={sizes.width * 0.5} y={sizes.height * 0.2} text={title.toUpperCase()} style={textStyle(sizes.width * 0.085, ACCENT)} />
			<Circle anchor={0.5} x={sizes.width * 0.5} y={sizes.height * 0.52} diameter={sizes.width * 0.3} backgroundColor={0x14233a} borderColor={ACCENT} borderWidth={6} />
			<Text anchor={0.5} x={sizes.width * 0.5} y={sizes.height * 0.52} text={total} style={textStyle(sizes.width * 0.17)} />
			<Text anchor={0.5} x={sizes.width * 0.5} y={sizes.height * 0.82} text="FREE SPINS" style={textStyle(sizes.width * 0.07, 0xffffff)} />
		{/snippet}
	</FreeSpinAnimation>

	<PressToContinue onpress={() => oncomplete()} />
</FadeContainer>
