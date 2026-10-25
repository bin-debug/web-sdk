<script lang="ts">
	import { MainContainer, OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { Text } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { clock } from '../game/clock.svelte';

	// "Tap to continue" under the free-spins and big-win screens, drawn as text (the stock
	// version was a mining-themed image)
	type Props = {
		onpress: () => void;
	};

	const props: Props = $props();
	const context = getContext();
	const pulse = $derived(0.7 + 0.3 * Math.sin(clock.t * 4));
</script>

<MainContainer alignVertical="bottom">
	<Text
		text="TAP TO CONTINUE"
		anchor={{ x: 0.5, y: 1 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height - 40}
		alpha={pulse}
		style={{
			fontFamily: 'proxima-nova',
			fontWeight: '800',
			fontSize: 44,
			letterSpacing: 6,
			fill: 0xffe9a0,
			stroke: { color: 0x000000, width: 8 },
		}}
	/>
</MainContainer>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />
