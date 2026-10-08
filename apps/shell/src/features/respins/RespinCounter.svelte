<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { getContext } from '../../game/context';
	import { ACCENT, textStyle } from '../../game/ui';
	import { respinCounter, respinCounterFx } from './respinCounterState.svelte';

	let { placement = 'board' }: { placement?: 'board' | 'hold' } = $props();

	const S = SYMBOL_SIZE;
	const context = getContext();
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const pips = $derived(Array.from({ length: respinCounter.max }));
	const pip = (filled: boolean) => (graphics: any) => {
		graphics.clear().circle(0, 0, S * 0.12).fill({ color: filled ? ACCENT : 0x2a2030, alpha: filled ? 1 : 0.85 }).stroke({ color: filled ? 0xfff2b0 : 0x6b5a73, width: S * 0.025 });
	};
	const x = $derived(placement === 'hold' ? BOARD_SIZES.width * 0.5 : BOARD_SIZES.width - S * 0.3);
	// Hold's counter stays above the bonus grid: the space beneath the board belongs to the betting bar on both layouts.
	const y = $derived(placement === 'hold' ? -S * (portrait ? 0.72 : 0.48) : -S * 0.42);
</script>

{#if respinCounter.active && respinCounter.placement === placement}
	<BoardContainer zIndex={96}>
		<Container x={x} y={y} scale={respinCounterFx.pulse.current}>
			{#if placement === 'hold'}
				<Graphics draw={(g) => g.clear().roundRect(-S * 1.05, -S * 0.3, S * 2.1, S * 0.6, S * 0.3).fill({ color: 0x14233a, alpha: 0.95 }).stroke({ color: ACCENT, width: S * 0.03 })} />
				<Text anchor={0.5} x={-S * 0.45} text="RESPINS" style={textStyle(S * 0.17, 0xffffff)} />
				<Text anchor={0.5} x={S * 0.62} text={`${respinCounter.remaining}`} style={textStyle(S * 0.42, respinCounter.remaining <= 1 ? 0xff7a7a : ACCENT)} />
			{:else}
				{#each pips as _, i}
					<Container x={-(respinCounter.max - 1 - i) * S * 0.34 - S * 1.25}>
						<Graphics draw={pip(i < respinCounter.remaining)} />
					</Container>
				{/each}
				<Text anchor={{ x: 1, y: 0.5 }} text={respinCounterFx.flash.current > 0.05 ? 'RESET' : `${respinCounter.remaining} left`} style={textStyle(S * 0.22, respinCounterFx.flash.current > 0.05 ? 0xffe887 : 0xffffff)} />
			{/if}
		</Container>
	</BoardContainer>
{/if}
