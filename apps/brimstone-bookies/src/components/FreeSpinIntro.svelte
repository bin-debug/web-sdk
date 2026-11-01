<script lang="ts" module>
	export type EmitterEventFreeSpinIntro =
		| { type: 'freeSpinIntroShow' }
		| { type: 'freeSpinIntroHide' }
		| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut, cubicOut } from 'svelte/easing';
	import { CanvasSizeRectangle } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { waitForResolve } from 'utils-shared/wait';
	import { Container, Text } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { fxText } from '../game/fx.svelte';
	import FxPanel from './FxPanel.svelte';
	import FxBurst from './FxBurst.svelte';
	import FxTapToContinue from './FxTapToContinue.svelte';

	// "FREE SPINS" award on our own panel: it slams in, the number rolls up, dice burst out.
	const context = getContext();
	const PW = 900;
	const PH = 600;
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const k = $derived(Math.min((canvas.width * 0.88) / PW, (canvas.height * 0.5) / PH));

	let show = $state(false);
	let total = $state(0);
	let fired = $state(0);
	let oncomplete = $state(() => {});
	const pop = new Tween(0);
	const roll = new Tween(0);

	context.eventEmitter.subscribeOnMount({
		freeSpinIntroShow: () => (show = true),
		freeSpinIntroHide: () => (show = false),
		freeSpinIntroUpdate: async (emitterEvent) => {
			total = emitterEvent.totalFreeSpins;
			pop.set(0.3, { duration: 0 });
			roll.set(0, { duration: 0 });
			pop.set(1, { duration: 520, easing: backOut });
			roll.set(total, { duration: 900, easing: cubicOut }).then(() => fired++);
			fired++;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.65} />
	<Container x={canvas.width / 2} y={canvas.height / 2} scale={k}>
		<FxBurst size={PW * 0.9} key={fired} />
		<Container scale={pop.current}>
			<FxPanel width={PW} height={PH} />
			<Text anchor={0.5} y={-PH * 0.29} text="FREE SPINS" style={fxText(PH * 0.15, '#ffffff')} />
			<Text anchor={0.5} y={PH * 0.03} text={String(Math.round(roll.current))} style={fxText(PH * 0.38, '#3FCF5E')} />
			<Text anchor={0.5} y={PH * 0.3} text="AWARDED" style={fxText(PH * 0.08, '#F7C23A')} />
		</Container>
	</Container>
	{#if show}
		<FxTapToContinue y={canvas.height / 2 + (PH * k) / 2 + 18} onpress={() => oncomplete()} />
	{/if}
</FadeContainer>
