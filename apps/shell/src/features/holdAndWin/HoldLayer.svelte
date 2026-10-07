<script lang="ts">
	import { Container, Graphics, Rectangle } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { BOARD_DIMENSIONS, BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { ACCENT } from '../../game/ui';
	import { coinLayer } from '../coins/coinState.svelte';
	import { hold, holdFx } from './holdState.svelte';

	const S = SYMBOL_SIZE;
	const cells = Array.from({ length: BOARD_DIMENSIONS.x * BOARD_DIMENSIONS.y }, (_, i) => ({
		reel: Math.floor(i / BOARD_DIMENSIONS.y),
		row: i % BOARD_DIMENSIONS.y,
	}));
	// empty cell = no coin on it right now (a collector that frees a cell makes it empty again)
	const empty = $derived.by(() => {
		const taken = new Set(coinLayer.views.map((v) => `${v.coin.pos.reel}:${v.coin.pos.row}`));
		return cells.filter((c) => !taken.has(`${c.reel}:${c.row}`));
	});

	const heart = (filled: boolean) => (g: any) => {
		const s = S * 0.2;
		g.clear();
		g.moveTo(0, s * 0.45)
			.bezierCurveTo(-s * 1.1, -s * 0.2, -s * 0.55, -s * 0.95, 0, -s * 0.3)
			.bezierCurveTo(s * 0.55, -s * 0.95, s * 1.1, -s * 0.2, 0, s * 0.45)
			.fill({ color: filled ? 0xff4d6d : 0x2a2030, alpha: filled ? 1 : 0.85 })
			.stroke({ color: filled ? 0xffd0d8 : 0x6b5a73, width: s * 0.14 });
	};
</script>

{#if hold.active}
	<BoardContainer zIndex={95}>
		<!-- empty cells: dark tiles; while a respin runs a ghost coin shimmers on each -->
		{#each empty as cell (`${cell.reel}:${cell.row}`)}
			{@const wave = 0.5 + 0.5 * Math.sin(hold.phase * 0.9 + cell.reel * 1.7 + cell.row * 2.3)}
			<Container x={S * (cell.reel + 0.5)} y={S * (cell.row + 0.5)}>
				<Rectangle x={-S * 0.45} y={-S * 0.45} width={S * 0.9} height={S * 0.9} borderRadius={S * 0.12} backgroundColor={0x0d1220} backgroundAlpha={0.88} borderColor={0x3b4a6b} borderWidth={S * 0.03} />
				{#if hold.spinning}
					<Graphics draw={(g) => g.clear().circle(0, 0, S * 0.3).fill({ color: ACCENT, alpha: 0.12 + wave * 0.3 })} />
				{/if}
			</Container>
		{/each}
		<!-- life meter above the board, right side (the running win pill sits in the middle) -->
		<Container x={BOARD_SIZES.width - S * 0.3} y={-S * 0.42} scale={holdFx.pulse.current}>
			{#each Array.from({ length: hold.maxLives }) as _, i}
				<Container x={-(hold.maxLives - 1 - i) * S * 0.46}>
					<Graphics draw={heart(i < hold.lives)} />
				</Container>
			{/each}
		</Container>
		{#if holdFx.flash.current > 0}
			<Rectangle width={BOARD_SIZES.width} height={BOARD_SIZES.height} backgroundColor={0xffe887} backgroundAlpha={holdFx.flash.current * 0.35} />
		{/if}
	</BoardContainer>
{/if}
