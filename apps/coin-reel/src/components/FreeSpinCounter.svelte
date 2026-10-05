<script lang="ts" module>
	export type EmitterEventFreeSpinCounter =
		| { type: 'freeSpinCounterShow' }
		| { type: 'freeSpinCounterHide' }
		| { type: 'freeSpinCounterUpdate'; current?: number; total?: number };
</script>

<script lang="ts">
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import { Rectangle, Text } from 'pixi-svelte';

	const context = getContext();
	const panelWidth = $derived(SYMBOL_SIZE * 2);
	const panelSizes = $derived({
		width: panelWidth,
		height: panelWidth * 0.46,
	});
	const scale = 1;
	const position = $derived({
		x:
			context.stateGameDerived.boardLayout().x -
			context.stateGameDerived.boardLayout().width * 0.5 -
			panelSizes.width -
			SYMBOL_SIZE * 0.7,
		y:
			context.stateGameDerived.boardLayout().y -
			context.stateGameDerived.boardLayout().height * 0.5,
	});

	let show = $state(false);
	let current = $state(0);
	let total = $state(0);

	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow: () => (show = true),
		freeSpinCounterHide: () => (show = false),
		freeSpinCounterUpdate: (emitterEvent) => {
			if (emitterEvent.current !== undefined) current = emitterEvent.current;
			if (emitterEvent.total !== undefined) total = emitterEvent.total;
		},
	});
</script>

<MainContainer>
	<FadeContainer {show} {...position} {scale}>
		<Rectangle
			{...panelSizes}
			borderRadius={14}
			backgroundColor={0x1a1038}
			backgroundAlpha={0.92}
			borderColor={0xf5c542}
			borderWidth={3}
		/>
		<Text
			anchor={{ x: 0.5, y: 0.5 }}
			x={panelSizes.width * 0.5}
			y={panelSizes.height * 0.32}
			text="FREE SPIN"
			style={{
				fontFamily: 'proxima-nova',
				fontWeight: '800',
				fontSize: SYMBOL_SIZE * 0.2,
				fill: 0xf5c542,
			}}
		/>
		<Text
			anchor={{ x: 0.5, y: 0.5 }}
			x={panelSizes.width * 0.5}
			y={panelSizes.height * 0.68}
			text={`${current} OF ${total}`}
			style={{
				fontFamily: 'proxima-nova',
				fontWeight: '800',
				fontSize: SYMBOL_SIZE * 0.22,
				fill: 0xffffff,
			}}
		/>
	</FadeContainer>
</MainContainer>
