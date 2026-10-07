<script lang="ts">
	import { Container, Rectangle, Text } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../../game/context';
	import { SYMBOL_SIZE } from '../../game/constants';
	import { ACCENT, textStyle } from '../../game/ui';
	import { hold, holdFx } from './holdState.svelte';

	const context = getContext();
	const S = SYMBOL_SIZE;
</script>

<MainContainer>
	<Container x={context.stateLayoutDerived.mainLayout().width * 0.5} y={context.stateLayoutDerived.mainLayout().height * 0.46} visible={holdFx.banner.current > 0.02}>
		<Container scale={0.85 + holdFx.banner.current * 0.15} alpha={holdFx.banner.current}>
			<Rectangle x={-S * 2.6} y={-S * 0.62} width={S * 5.2} height={S * 1.24} borderRadius={20} backgroundColor={0x14233a} backgroundAlpha={0.94} borderColor={ACCENT} borderWidth={5} />
			<Text anchor={0.5} y={-S * 0.17} text={hold.banner} style={textStyle(S * 0.4, ACCENT)} />
			<Text anchor={0.5} y={S * 0.28} text={hold.bannerSub} style={textStyle(S * 0.26)} />
		</Container>
	</Container>
</MainContainer>
