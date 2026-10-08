<script lang="ts">
	import { Container, Graphics, Text } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { ACCENT, textStyle } from '../../game/ui';
	import { stickyCounter, stickyFx } from './wildState.svelte';

	// Stub respin counter for sticky bonuses (pips + number above the board, right side). A reset flashes it.
	// The refill-respins feature owns the full counter; this one only follows `respinCounter` events.
	const S = SYMBOL_SIZE;
	const flash = $derived(stickyFx.flash);
	const pips = $derived(Array.from({ length: stickyCounter.max }));
	const pip = (filled: boolean) => (g: any) => {
		g.clear().circle(0, 0, S * 0.12).fill({ color: filled ? ACCENT : 0x2a2030, alpha: filled ? 1 : 0.85 }).stroke({ color: filled ? 0xfff2b0 : 0x6b5a73, width: S * 0.025 });
	};
</script>

{#if stickyCounter.active}
	<BoardContainer zIndex={96}>
		<Container x={BOARD_SIZES.width - S * 0.3} y={-S * 0.42} scale={1 + flash * 0.35}>
			{#each pips as _, i}
				<Container x={-(stickyCounter.max - 1 - i) * S * 0.34 - S * 1.25}>
					<Graphics draw={pip(i < stickyCounter.remaining)} />
				</Container>
			{/each}
			<Text anchor={{ x: 1, y: 0.5 }} x={0} text={flash > 0.05 ? 'RESET' : `${stickyCounter.remaining} left`} style={textStyle(S * 0.22, flash > 0.05 ? 0xffe887 : 0xffffff)} />
		</Container>
	</BoardContainer>
{/if}
