<script lang="ts">
	import { onMount } from 'svelte';
	import { OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { Text } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { fxText } from '../game/fx.svelte';

	// "TAP TO CONTINUE" in our own type, pulsing at the bottom of the screen.
	type Props = { onpress: () => void; y?: number };
	const props: Props = $props();
	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const size = $derived(Math.max(16, Math.min(canvas.width, canvas.height) * 0.04));

	let alpha = $state(1);
	onMount(() => {
		let raf = 0;
		const tick = (now: number) => {
			alpha = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(now / 260));
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<Text
	anchor={{ x: 0.5, y: 0 }}
	x={canvas.width / 2}
	y={Math.min(props.y ?? canvas.height * 0.8, canvas.height - 112 - size * 1.4)}
	{alpha}
	text="TAP TO CONTINUE"
	style={fxText(size, '#ffffff')}
/>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />
