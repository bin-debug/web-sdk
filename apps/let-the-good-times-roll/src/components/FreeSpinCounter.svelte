<script lang="ts" module>
	export type EmitterEventFreeSpinCounter =
		| { type: 'freeSpinCounterShow' }
		| { type: 'freeSpinCounterHide' }
		| { type: 'freeSpinCounterUpdate'; current?: number; total?: number };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { Container, Text, type Sizes } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import { fxText } from '../game/fx.svelte';
	import FxPanel from './FxPanel.svelte';

	// Free-spins counter on our own drawn panel right of the board (the mascot stands on the left), desktop/landscape only: on
	// phones the betting bar already shows the free spins left. The number pops when it changes.
	const context = getContext();
	const W = SYMBOL_SIZE * 2.4;
	const H = SYMBOL_SIZE * 1.3;
	const landscape = $derived(['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()));
	const position = $derived.by(() => {
		const b = context.stateGameDerived.boardLayout();
		return landscape
			? { x: b.x + b.width / 2 + W / 2 + SYMBOL_SIZE * 0.6, y: b.y - b.height / 2 + H }
			: { x: b.x, y: b.y + b.height / 2 + H / 2 + SYMBOL_SIZE * 0.35 };
	});

	let show = $state(false);
	let current = $state(0);
	let total = $state(0);
	let leftSizes: Sizes = $state({ width: 0, height: 0 });
	let rightSizes: Sizes = $state({ width: 0, height: 0 });
	const pop = new Tween(1);

	context.eventEmitter.subscribeOnMount({
		freeSpinCounterShow: () => (show = true),
		freeSpinCounterHide: () => (show = false),
		freeSpinCounterUpdate: (emitterEvent) => {
			if (emitterEvent.current !== undefined) current = emitterEvent.current;
			if (emitterEvent.total !== undefined) total = emitterEvent.total;
			pop.set(1.35, { duration: 0 });
			pop.set(1, { duration: 380, easing: backOut });
		},
	});

	const numberSize = H * 0.42;
	const numbersWidth = $derived(leftSizes.width + rightSizes.width);
</script>

<MainContainer>
	<FadeContainer show={show && landscape} {...position}>
		<FxPanel width={W} height={H} />
		<Text anchor={0.5} y={-H * 0.22} text="FREE SPINS" style={fxText(H * 0.17, '#d9d9d9')} />
		<Container y={H * 0.12} scale={pop.current}>
			<Text
				anchor={{ x: 0, y: 0.5 }}
				x={-numbersWidth / 2}
				text={String(current)}
				style={fxText(numberSize, '#E1121B')}
				onresize={(s) => (leftSizes = s)}
			/>
			<Text
				anchor={{ x: 0, y: 0.5 }}
				x={-numbersWidth / 2 + leftSizes.width}
				text={` / ${total}`}
				style={fxText(numberSize, '#ffffff')}
				onresize={(s) => (rightSizes = s)}
			/>
		</Container>
	</FadeContainer>
</MainContainer>
