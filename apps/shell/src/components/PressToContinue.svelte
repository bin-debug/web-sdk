<script lang="ts">
	import { MainContainer, OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { Text } from 'pixi-svelte';

	import { getContext } from '../game/context';

	type Props = { onpress: () => void; label?: string };

	const props: Props = $props();
	const context = getContext();
</script>

<MainContainer alignVertical="bottom">
	<Text
		text={props.label ?? 'PRESS ANYWHERE TO CONTINUE'}
		anchor={{ x: 0.5, y: 1 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height - 60}
		style={{
			fontFamily: 'proxima-nova, system-ui, sans-serif',
			fontWeight: '800',
			fontSize: 44,
			fill: 0xffffff,
			stroke: { color: 0x1a1226, width: 8 },
			letterSpacing: 2,
		}}
	/>
</MainContainer>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />
