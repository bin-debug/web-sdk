<script lang="ts">
	import { Button } from 'components-pixi';
	import { OnHotkey } from 'components-shared';
	import { Graphics } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';
	import ButtonBetProvider from 'components-ui-pixi/src/components/ButtonBetProvider.svelte';

	import { getContext } from '../../game/context';
	import { drawSpin } from './icons';

	type Props = { x: number; y: number; size: number };

	const props: Props = $props();
	const context = getContext();
	const disabled = $derived(!stateBetDerived.isBetCostAvailable());

	// the arrow turns while a round plays
	let rotation = $state(0);
	$effect(() => {
		if (context.stateXstateDerived.isIdle()) {
			rotation = 0;
			return;
		}
		let frame = requestAnimationFrame(function tick() {
			rotation += 0.12;
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});
</script>

<ButtonBetProvider>
	{#snippet children({ key, onpress })}
		<OnHotkey hotkey="Space" {disabled} {onpress} />
		<Button
			x={props.x}
			y={props.y}
			anchor={0.5}
			sizes={{ width: props.size, height: props.size }}
			{disabled}
			{onpress}
		>
			{#snippet children({ center, pressed })}
				{@const autoplayStop = stateBetDerived.hasAutoBetCounter() && key === 'stop_default'}
				<Graphics
					x={center.x}
					y={center.y}
					alpha={disabled || key === 'stop_disabled' ? 0.5 : 1}
					scale={pressed ? 0.93 : 1}
					rotation={autoplayStop ? 0 : rotation}
					draw={(g) => drawSpin(g, props.size, autoplayStop)}
				/>
			{/snippet}
		</Button>
	{/snippet}
</ButtonBetProvider>
