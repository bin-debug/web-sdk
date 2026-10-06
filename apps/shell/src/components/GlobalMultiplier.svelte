<script lang="ts" module>
	export type EmitterEventGlobalMultiplier =
		| { type: 'globalMultiplierShow' }
		| { type: 'globalMultiplierHide' }
		| { type: 'globalMultiplierUpdate'; multiplier: number };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';

	import { Container, Circle, Text } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';

	import BoardContainer from './BoardContainer.svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, BOARD_SIZES } from '../game/constants';
	import { ACCENT, DARK, textStyle } from '../game/ui';

	const context = getContext();
	let show = $state(false);
	let multiplier = $state(1);
	const pop = new Tween(1);

	context.eventEmitter.subscribeOnMount({
		globalMultiplierShow: () => (show = true),
		globalMultiplierHide: () => (show = false),
		globalMultiplierUpdate: async ({ multiplier: m }) => {
			const up = m > multiplier;
			multiplier = m;
			if (up) context.eventEmitter.broadcast({ type: 'soundOnce', name: 'clover' });
			await pop.set(1.35, { duration: 120 });
			await pop.set(1, { duration: 220, easing: backOut });
		},
	});
	const D = SYMBOL_SIZE * 0.8;
</script>

<BoardContainer>
	<FadeContainer {show} x={BOARD_SIZES.width - D * 0.5} y={-SYMBOL_SIZE * 0.42}>
		<Container scale={pop.current}>
			<Circle anchor={0.5} diameter={D} backgroundColor={DARK} borderColor={ACCENT} borderWidth={4} />
			<Text anchor={0.5} text={`x${multiplier}`} style={textStyle(D * 0.46, 0xffe27a)} />
		</Container>
	</FadeContainer>
</BoardContainer>
