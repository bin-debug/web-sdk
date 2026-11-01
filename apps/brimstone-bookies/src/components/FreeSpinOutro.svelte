<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventFreeSpinOutro =
		| { type: 'freeSpinOutroShow' }
		| { type: 'freeSpinOutroHide' }
		| { type: 'freeSpinOutroCountUp'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { Container, Text } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider } from 'components-pixi';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { waitForResolve } from 'utils-shared/wait';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';

	import { getContext } from '../game/context';
	import { fx, fxText } from '../game/fx.svelte';
	import FxPanel from './FxPanel.svelte';
	import FxBurst from './FxBurst.svelte';
	import FxTapToContinue from './FxTapToContinue.svelte';

	// Bonus total on our own panel: counts up, dice burst on each milestone and at the end.
	const context = getContext();
	const PW = 980;
	const PH = 600;
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const k = $derived(Math.min((canvas.width * 0.9) / PW, (canvas.height * 0.5) / PH));

	let show = $state(true);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let fired = $state(0);
	let oncomplete = $state(() => {});
	const pop = new Tween(0);

	context.eventEmitter.subscribeOnMount({
		freeSpinOutroShow: () => {
			show = true;
			fx.pendingExit = true;
		},
		freeSpinOutroHide: async () => (show = false),
		freeSpinOutroCountUp: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			pop.set(0.3, { duration: 0 });
			pop.set(1, { duration: 520, easing: backOut });
			fired++;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		<WinCountUpProvider {amount} duration={winLevelData.presentDuration} oncomplete={() => fired++}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount onmount={() => startCountUp()} />
				<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.65} />
				<Container x={canvas.width / 2} y={canvas.height / 2} scale={k}>
					<FxBurst size={PW * 0.9} key={fired} />
					<Container scale={pop.current}>
						<FxPanel width={PW} height={PH} />
						<Text anchor={0.5} y={-PH * 0.27} text="TOTAL WIN" style={fxText(PH * 0.14, '#ffffff')} />
						<Text
							anchor={0.5}
							y={PH * 0.04}
							text={bookEventAmountToCurrencyString(countUpAmount)}
							style={fxText(PH * 0.2, '#F7C23A')}
						/>
						<Text anchor={0.5} y={PH * 0.3} text="BONUS COMPLETE" style={fxText(PH * 0.06, '#3FCF5E')} />
					</Container>
				</Container>
				<FxTapToContinue y={canvas.height / 2 + (PH * k) / 2 + 18} onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
