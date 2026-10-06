<script lang="ts">
	import { Container, Rectangle, Sprite } from 'pixi-svelte';
	import { FadeContainer } from 'components-pixi';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';
	import TransitionAnimation from './TransitionAnimation.svelte';
	import PressToContinue from './PressToContinue.svelte';
	import { ACCENT, DARK } from '../game/ui';

	type Props = { onloaded: () => void };

	const props: Props = $props();
	const context = getContext();

	let loadingType = $state<'start' | 'transition'>('start');
	const aspect = $derived.by(() => {
		const tex = context.stateApp.loadedAssets?.['logo.game'] as { width: number; height: number } | undefined;
		return tex && tex.height ? tex.width / tex.height : 3;
	});
	const logoH = $derived(Math.min(420 / aspect, 380));
	const BAR_W = 460;
</script>

<!-- logo and loading progress -->
<FadeContainer show={loadingType === 'start'}>
	<MainContainer>
		<Container x={context.stateLayoutDerived.mainLayout().width * 0.5} y={context.stateLayoutDerived.mainLayout().height * 0.5}>
			<Sprite key="logo.game" anchor={0.5} width={logoH * aspect} height={logoH} />
			{#if !context.stateApp.loaded}
				<Rectangle x={-BAR_W / 2} y={logoH * 0.5 + 40} width={BAR_W} height={22} borderRadius={11} backgroundColor={DARK} borderColor={ACCENT} borderWidth={3} />
				<Rectangle
					x={-BAR_W / 2 + 4}
					y={logoH * 0.5 + 44}
					width={Math.max(14, (BAR_W - 8) * (context.stateApp.loadingProgress / 100))}
					height={14}
					borderRadius={7}
					backgroundColor={ACCENT}
				/>
			{/if}
		</Container>
	</MainContainer>
</FadeContainer>

<!-- press to continue -->
<FadeContainer show={loadingType === 'start' && context.stateApp.loaded}>
	<PressToContinue onpress={() => (loadingType = 'transition')} />
</FadeContainer>

<!-- transition between the loading screen and the game -->
<FadeContainer show={loadingType === 'transition'}>
	<TransitionAnimation oncomplete={props.onloaded} />
</FadeContainer>
