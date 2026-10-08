<script lang="ts">
	import { Container, Rectangle, Text } from 'pixi-svelte';

	import BoardContainer from '../../components/BoardContainer.svelte';
	import { getContext } from '../../game/context';
	import Symbol from '../../components/Symbol.svelte';
	import { BOARD_DIMENSIONS, BOARD_SIZES, SYMBOL_SIZE } from '../../game/constants';
	import { SYMBOL_NAMES } from '../../game/spec';
	import { ACCENT, textStyle } from '../../game/ui';
	import { hold, holdFx, heldKeys } from './holdState.svelte';

	const S = SYMBOL_SIZE;
	const context = getContext();
	// on a phone the jackpot pills sit under the board, so the respin counter drops below them
	const portrait = $derived(context.stateLayoutDerived.layoutType() === 'portrait');
	const cells = Array.from({ length: BOARD_DIMENSIONS.x * BOARD_DIMENSIONS.y }, (_, i) => ({
		reel: Math.floor(i / BOARD_DIMENSIONS.y),
		row: i % BOARD_DIMENSIONS.y,
	}));
	// the bonus grid shows every cell; one with no coin on it right now is empty (a collector that frees a cell makes it empty again)
	const emptyKeys = $derived.by(() => {
		const taken = heldKeys();
		return new Set(cells.filter((c) => !taken.has(`${c.reel}:${c.row}`)).map((c) => `${c.reel}:${c.row}`));
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
</script>

{#if hold.active}
	<BoardContainer zIndex={95}>
		<!-- the bonus grid: a dark tile per cell; on a respin every empty cell spins (a scrolling symbol strip) and the reels stop left to right -->
		{#each cells as cell (`${cell.reel}:${cell.row}`)}
			<Container x={S * (cell.reel + 0.5)} y={S * (cell.row + 0.5)}>
				<Rectangle x={-S * 0.45} y={-S * 0.45} width={S * 0.9} height={S * 0.9} borderRadius={S * 0.12} backgroundColor={0x0d1220} backgroundAlpha={0.94} borderColor={0x3b4a6b} borderWidth={S * 0.03} />
				{#if hold.spinCols[cell.reel] && emptyKeys.has(`${cell.reel}:${cell.row}`)}
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
		<!-- respin counter under the board, centred: a number, pops when it resets -->
		<Container x={BOARD_SIZES.width * 0.5} y={BOARD_SIZES.height + S * (portrait ? 1.3 : 0.42)} scale={holdFx.pulse.current}>
			<Rectangle x={-S * 1.05} y={-S * 0.3} width={S * 2.1} height={S * 0.6} borderRadius={S * 0.3} backgroundColor={0x14233a} backgroundAlpha={0.95} borderColor={ACCENT} borderWidth={S * 0.03} />
			<Text anchor={0.5} x={-S * 0.45} text="RESPINS" style={textStyle(S * 0.17, 0xffffff)} />
			<Text anchor={0.5} x={S * 0.62} text={`${hold.lives}`} style={textStyle(S * 0.42, hold.lives <= 1 ? 0xff7a7a : ACCENT)} />
		</Container>
		{#if holdFx.flash.current > 0}
			<Rectangle width={BOARD_SIZES.width} height={BOARD_SIZES.height} backgroundColor={0xffe887} backgroundAlpha={holdFx.flash.current * 0.35} />
		{/if}
	</BoardContainer>
{/if}
