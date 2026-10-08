<script lang="ts">
	import { Container, Graphics, Rectangle } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import Symbol from '../../components/Symbol.svelte';
	import { BOARD_DIMENSIONS, BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { SYMBOL_NAMES } from '../../game/spec';
	import { hold, holdFx, heldKeys } from './holdState.svelte';

	const S = SYMBOL_SIZE;
	const cells = Array.from({ length: BOARD_DIMENSIONS.x * BOARD_DIMENSIONS.y }, (_, i) => ({
		reel: Math.floor(i / BOARD_DIMENSIONS.y),
		row: i % BOARD_DIMENSIONS.y,
	}));
	// empty cell = no coin or marker on it right now (a collector that frees a cell makes it empty again)
	const empty = $derived.by(() => {
		const taken = heldKeys();
		return cells.filter((c) => !taken.has(`${c.reel}:${c.row}`));
	});
	// filler symbols that scroll through a spinning cell (cosmetic only, never tied to a result)
	const FILLER = SYMBOL_NAMES.filter((n) => n[0] === 'L' || n[0] === 'H');
	const SPEED = 0.42; // cells per phase tick
	const strip = (cell: { reel: number; row: number }) => {
		const travel = hold.phase * SPEED + cell.reel * 1.9 + cell.row * 0.7;
		const offset = (travel % 1) * S;
		const base = Math.floor(travel) + cell.reel * 3 + cell.row;
		return [-1, 0, 1].map((k) => ({ y: offset + k * S, name: FILLER[(((base - k) % FILLER.length) + FILLER.length) % FILLER.length] }));
	};

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
		<!-- empty cells: dark tiles; on a respin the reel spins (a scrolling symbol strip per cell) and stops left to right -->
		{#each empty as cell (`${cell.reel}:${cell.row}`)}
			<Container x={S * (cell.reel + 0.5)} y={S * (cell.row + 0.5)}>
				<Rectangle x={-S * 0.45} y={-S * 0.45} width={S * 0.9} height={S * 0.9} borderRadius={S * 0.12} backgroundColor={0x0d1220} backgroundAlpha={0.92} borderColor={0x3b4a6b} borderWidth={S * 0.03} />
				{#if hold.spinCols[cell.reel]}
					<Container>
						<Rectangle isMask x={-S * 0.45} y={-S * 0.45} width={S * 0.9} height={S * 0.9} borderRadius={S * 0.12} />
						{#each strip(cell) as piece, i (i)}
							<Container y={piece.y - S * 0.5} alpha={0.9}>
								<Symbol state="spin" rawSymbol={{ name: piece.name }} />
							</Container>
						{/each}
					</Container>
				{/if}
			</Container>
		{/each}
		<!-- life meter under the board, right side (above it sit the running win pill and, with jackpots, the pills) -->
		<Container x={BOARD_SIZES.width - S * 0.3} y={BOARD_SIZES.height + S * 0.38} scale={holdFx.pulse.current}>
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
