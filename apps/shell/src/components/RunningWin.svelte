<script lang="ts" module>
	export type EmitterEventTumbleWinAmount =
		| { type: 'tumbleWinAmountShow' }
		| { type: 'tumbleWinAmountHide' }
		| { type: 'tumbleWinAmountReset' }
		| { type: 'tumbleWinAmountUpdate'; amount: number; animate: boolean };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import { Container, Rectangle, Text } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { bookEventAmountToCurrencyString } from 'utils-shared/amount';

	import BoardContainer from './BoardContainer.svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, BOARD_SIZES } from '../game/constants';
	import { ACCENT, DARK, textStyle } from '../game/ui';

	// Running win of a tumble sequence: a pill above the board that counts up.
	const context = getContext();
	let show = $state(false);
	const amount = new Tween(0);
	const pop = new Tween(1);

	const W = SYMBOL_SIZE * 2.6;
	const H = SYMBOL_SIZE * 0.5;

	context.eventEmitter.subscribeOnMount({
		tumbleWinAmountShow: () => (show = true),
		tumbleWinAmountHide: () => (show = false),
		tumbleWinAmountReset: () => amount.set(0, { duration: 0 }),
		tumbleWinAmountUpdate: async ({ amount: to, animate }) => {
			pop.set(1.12, { duration: 90 }).then(() => pop.set(1, { duration: 140 }));
			await amount.set(to, { duration: animate ? 700 : 220, easing: cubicOut });
		},
	});
</script>

<BoardContainer>
	<FadeContainer {show} x={BOARD_SIZES.width / 2} y={-SYMBOL_SIZE * 0.42}>
		<Container scale={pop.current}>
			<Rectangle x={-W / 2} y={-H / 2} width={W} height={H} borderRadius={H / 2} backgroundColor={DARK} backgroundAlpha={0.92} borderColor={ACCENT} borderWidth={3} />
			<Text anchor={0.5} text={bookEventAmountToCurrencyString(amount.current)} style={textStyle(H * 0.62, 0xffffff)} />
		</Container>
	</FadeContainer>
</BoardContainer>
