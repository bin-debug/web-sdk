<script lang="ts" module>
	export type EmitterEventRetrigger = { type: 'retriggerShow'; extra: number };
</script>

<script lang="ts">
	import { Container, Rectangle, Text } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';
	import { FadeContainer } from 'components-pixi';
	import { stateBet } from 'state-shared';

	import { getContext } from '../../game/context';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../../game/constants';
	import { ACCENT, textStyle } from '../../game/ui';

	const context = getContext();
	const W = SYMBOL_SIZE * Math.max(BOARD_DIMENSIONS.x, 4);

	let show = $state(false);
	let extra = $state(0);

	context.eventEmitter.subscribeOnMount({
		retriggerShow: async (e) => {
			extra = e.extra;
			show = true;
			const turbo = stateBet.isTurbo || stateBet.isSpaceHold;
			await new Promise((r) => setTimeout(r, turbo ? 500 : 1400));
			show = false;
			await new Promise((r) => setTimeout(r, turbo ? 80 : 250));
		},
	});
</script>

<MainContainer>
	<FadeContainer {show} x={context.stateLayoutDerived.mainLayout().width * 0.5} y={context.stateLayoutDerived.mainLayout().height * 0.46}>
		<Container x={-W * 0.5} y={-SYMBOL_SIZE * 0.6}>
			<Rectangle width={W} height={SYMBOL_SIZE * 1.2} borderRadius={20} backgroundColor={0x14233a} backgroundAlpha={0.94} borderColor={ACCENT} borderWidth={5} />
			<Text anchor={0.5} x={W * 0.5} y={SYMBOL_SIZE * 0.34} text="RETRIGGER" style={textStyle(SYMBOL_SIZE * 0.3, ACCENT)} />
			<Text anchor={0.5} x={W * 0.5} y={SYMBOL_SIZE * 0.82} text={`+${extra} FREE SPINS`} style={textStyle(SYMBOL_SIZE * 0.34)} />
		</Container>
	</FadeContainer>
</MainContainer>
