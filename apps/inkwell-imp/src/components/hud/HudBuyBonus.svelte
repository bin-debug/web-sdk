<script lang="ts">
	import { Button } from 'components-pixi';
	import { Circle, Text } from 'pixi-svelte';
	import { stateBet, stateBetDerived, stateModal } from 'state-shared';
	import { i18nDerived } from 'components-ui-pixi';

	import { getContext } from '../../game/context';
	import { GOLD } from './icons';

	type Props = { x: number; y: number; size: number };

	const props: Props = $props();
	const context = getContext();
	const disabled = $derived(!context.stateXstateDerived.isIdle());
	// an "activate" mode (superspin) stays on until this button turns it off
	const active = $derived(stateBetDerived.activeBetMode()?.type === 'activate');
	const label = $derived((active ? i18nDerived.disable() : i18nDerived.buyBonus()).toUpperCase());

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		if (active) stateBet.activeBetModeKey = 'BASE';
		else stateModal.modal = { name: 'buyBonus' };
	};
</script>

<Button
	x={props.x}
	y={props.y}
	anchor={0.5}
	sizes={{ width: props.size, height: props.size }}
	{disabled}
	{onpress}
>
	{#snippet children({ center, pressed })}
		<Circle
			{...center}
			anchor={0.5}
			diameter={props.size}
			scale={pressed ? 0.92 : 1}
			alpha={disabled ? 0.45 : 1}
			backgroundColor={active ? 0xffffff : GOLD}
			borderColor={0x000000}
			borderWidth={props.size * 0.05}
		/>
		<Text
			{...center}
			anchor={0.5}
			rotation={-0.35}
			alpha={disabled ? 0.45 : 1}
			text={label.split(' ').join('\n')}
			style={{
				align: 'center',
				fontFamily: 'proxima-nova',
				fontWeight: '800',
				fontSize: props.size * 0.2,
				lineHeight: props.size * 0.22,
				fill: 0x000000,
			}}
		/>
	{/snippet}
</Button>
