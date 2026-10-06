<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventFreeSpinOutro =
		| { type: 'freeSpinOutroShow' }
		| { type: 'freeSpinOutroHide' }
		| { type: 'freeSpinOutroCountUp'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Text } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider } from 'components-pixi';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';
	import { waitForResolve } from 'utils-shared/wait';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';

	import { getContext } from '../game/context';
	import FreeSpinAnimation from './FreeSpinAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import { ACCENT, textStyle } from '../game/ui';

	const context = getContext();

	let show = $state(false);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let oncomplete = $state(() => {});

	context.eventEmitter.subscribeOnMount({
		freeSpinOutroShow: () => (show = true),
		freeSpinOutroHide: async () => (show = false),
		freeSpinOutroCountUp: async (e) => {
			amount = e.amount;
			winLevelData = e.winLevelData;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		<WinCountUpProvider {amount} duration={Math.max(winLevelData.presentDuration, 1200)} oncomplete={() => {}}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount onmount={() => startCountUp()} />
				<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.55} />
				<FreeSpinAnimation>
					{#snippet children({ sizes })}
						<Text anchor={0.5} x={sizes.width * 0.5} y={sizes.height * 0.2} text={winLevelData?.text ?? 'BONUS COMPLETE'} style={textStyle(sizes.width * 0.09, ACCENT)} />
						<Text anchor={0.5} x={sizes.width * 0.5} y={sizes.height * 0.5} text={bookEventAmountToCurrencyString(countUpAmount)} style={textStyle(sizes.width * 0.15)} />
						<Text anchor={0.5} x={sizes.width * 0.5} y={sizes.height * 0.78} text="TOTAL WIN" style={textStyle(sizes.width * 0.065, 0xffffff)} />
					{/snippet}
				</FreeSpinAnimation>
				<PressToContinue onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
