<script lang="ts" module>
	import type { WinLevelData } from '../game/winLevelMap';

	export type EmitterEventWin =
		| { type: 'winShow' }
		| { type: 'winHide' }
		| { type: 'winUpdate'; amount: number; winLevelData: WinLevelData };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { Container, Text } from 'pixi-svelte';
	import { FadeContainer, WinCountUpProvider } from 'components-pixi';
	import { waitForResolve, waitForTimeout } from 'utils-shared/wait';
	import { bookEventAmountToNormalisedAmount } from 'utils-shared/amount';
	import { CanvasSizeRectangle } from 'components-layout';
	import { OnMount } from 'components-shared';

	import FxPanel from './FxPanel.svelte';
	import FxBurst from './FxBurst.svelte';
	import FxTapToContinue from './FxTapToContinue.svelte';
	import { getContext } from '../game/context';
	import { fxText } from '../game/fx.svelte';

	// Win count-up in our own type. Big wins and up get the panel with their title (BIG WIN,
	// SUPER WIN, ...), a slam-in and dice bursts; smaller wins are just the amount over the board.
	const context = getContext();
	const formatWin = (bookAmt: number) => bookEventAmountToNormalisedAmount(bookAmt).toFixed(2);
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const PW = 980;
	const PH = 520;
	const k = $derived(Math.min((canvas.width * 0.9) / PW, (canvas.height * 0.48) / PH));

	let show = $state(false);
	let amount = $state(0);
	let winLevelData = $state<WinLevelData>();
	let fired = $state(0);
	let oncomplete = $state(() => {});
	const pop = new Tween(0);

	context.eventEmitter.subscribeOnMount({
		winShow: () => (show = true),
		winHide: () => (show = false),
		winUpdate: async (emitterEvent) => {
			amount = emitterEvent.amount;
			winLevelData = emitterEvent.winLevelData;
			pop.set(0.3, { duration: 0 });
			pop.set(1, { duration: 480, easing: backOut });
			fired++;
			await waitForResolve((resolve) => (oncomplete = resolve));
		},
	});
</script>

<FadeContainer {show}>
	{#if winLevelData}
		{@const isBigWin = !!winLevelData.animation}
		<WinCountUpProvider {amount} duration={winLevelData.presentDuration} oncomplete={() => isBigWin && fired++}>
			{#snippet children({ countUpAmount, startCountUp, finishCountUp, countUpCompleted })}
				<OnMount
					onmount={async () => {
						await startCountUp();
						await waitForTimeout(300);
						oncomplete();
					}}
				/>
				{#if isBigWin}
					<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.6} />
					<Container x={canvas.width / 2} y={canvas.height / 2} scale={k}>
						<FxBurst size={PW} count={40} key={fired} />
						<Container scale={pop.current}>
							<FxPanel width={PW} height={PH} />
							<Text anchor={0.5} y={-PH * 0.2} text={winLevelData?.text ?? 'BIG WIN'} style={fxText(PH * 0.19, '#3FCF5E')} />
							<Text anchor={0.5} y={PH * 0.14} text={formatWin(countUpAmount)} style={fxText(PH * 0.22, '#F7C23A')} />
						</Container>
					</Container>
					<FxTapToContinue y={canvas.height / 2 + (PH * k) / 2 + 18} onpress={() => (countUpCompleted ? oncomplete() : finishCountUp())} />
				{:else}
					<Container x={canvas.width / 2} y={canvas.height / 2} scale={pop.current}>
						<Text
							anchor={0.5}
							text={formatWin(countUpAmount)}
							style={fxText(Math.min(canvas.width, canvas.height) * 0.09, '#F7C23A')}
						/>
					</Container>
				{/if}
			{/snippet}
		</WinCountUpProvider>
	{/if}
</FadeContainer>
