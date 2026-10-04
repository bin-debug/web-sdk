<script lang="ts" module>
	export type CoinTier = 'bronze' | 'silver' | 'gold' | 'diamond';
	export type EmitterEventCoinReels =
		| { type: 'coinReelExpand'; reel: number; coins: { row: number; tier: CoinTier; value: number }[] }
		| { type: 'coinReelCollect'; reel: number; total: number; multiplier: number; pot?: number }
		| { type: 'freeSpinReelExpand'; reel: number; cells: { row: number; spins: number }[] }
		| { type: 'coinReelsClear' };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut, cubicOut } from 'svelte/easing';
	import { Container, Rectangle, Circle, Text } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';
	import { BOOK_AMOUNT_MULTIPLIER } from 'constants-shared/bet';

	import BoardContainer from './BoardContainer.svelte';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { getSymbolX, getSymbolY } from '../game/utils';
	import { getContext } from '../game/context';

	const context = getContext();

	// Placeholder coin look until the art pack's coin clips exist.
	const TIER_STYLE = {
		bronze: { fill: 0xb8733a, ring: 0xf0b27a, text: 0x2b1405 },
		silver: { fill: 0xa9b3c1, ring: 0xf2f6fb, text: 0x1d2430 },
		gold: { fill: 0xf2b91c, ring: 0xfff0a8, text: 0x3a2500 },
		diamond: { fill: 0x5fd3ff, ring: 0xe6fbff, text: 0x06283a },
		fs: { fill: 0x7b3fe4, ring: 0xd6c2ff, text: 0xffffff },
	} as const;

	type Cell = { row: number; label: string; style: keyof typeof TIER_STYLE; scale: Tween<number> };
	type ColumnState = {
		reel: number;
		grow: Tween<number>;
		cells: Cell[];
		pulse: Tween<number>;
		totalText: string;
		totalScale: Tween<number>;
	};

	let columns = $state<ColumnState[]>([]);
	const dim = new Tween(0);
	const BOTTOM = getSymbolY(BOARD_DIMENSIONS.y - 1) + SYMBOL_SIZE * 0.5;
	const FULL_HEIGHT = SYMBOL_SIZE * BOARD_DIMENSIONS.y;
	const visibleRow = (paddedRow: number) => paddedRow - 1;

	const expand = async (reel: number, cells: Omit<Cell, 'scale'>[]) => {
		const column: ColumnState = {
			reel,
			grow: new Tween(0),
			cells: cells.map((c) => ({ ...c, scale: new Tween(0) })),
			pulse: new Tween(1),
			totalText: '',
			totalScale: new Tween(0),
		};
		columns = [...columns.filter((c) => c.reel !== reel), column];
		const col = columns[columns.length - 1];
		await col.grow.set(1, { duration: 450, easing: cubicOut });
		// reveal bottom-up so it reads as the special "climbing" the reel
		for (const cell of [...col.cells].reverse()) {
			cell.scale.set(1, { duration: 220, easing: backOut });
			await waitForTimeout(70);
		}
		await waitForTimeout(250);
	};

	context.eventEmitter.subscribeOnMount({
		coinReelExpand: async ({ reel, coins }) => {
			context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_landing' });
			await expand(
				reel,
				coins.map((c) => ({
					row: c.row,
					style: c.tier,
					label: `${c.value / BOOK_AMOUNT_MULTIPLIER}X`,
				})),
			);
		},
		freeSpinReelExpand: async ({ reel, cells }) => {
			context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_scatter_win_v2' });
			await expand(
				reel,
				cells.map((c) => ({ row: c.row, style: 'fs' as const, label: `+${c.spins}` })),
			);
		},
		coinReelCollect: async ({ reel, total, multiplier, pot = 0 }) => {
			const col = columns.find((c) => c.reel === reel);
			if (!col) return;
			context.eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_win' });
			context.eventEmitter.broadcast({ type: 'mascotReact', mood: 'point' });
			const coins = (total - pot) / multiplier / BOOK_AMOUNT_MULTIPLIER;
			col.totalText =
				multiplier > 1
					? `${coins}X x${multiplier}`
					: pot > 0
						? `${coins}X + ${pot / BOOK_AMOUNT_MULTIPLIER}X`
						: `${coins}X`;
			dim.set(0.55, { duration: 200 });
			await Promise.all([
				col.pulse.set(1.18, { duration: 160 }).then(() => col.pulse.set(1, { duration: 220 })),
				col.totalScale.set(1, { duration: 300, easing: backOut }),
			]);
			await waitForTimeout(650);
			await dim.set(0, { duration: 200 });
		},
		coinReelsClear: () => (columns = []),
	});
</script>

<BoardContainer>
	{#if dim.current > 0}
		<Rectangle
			x={getSymbolX(0) - SYMBOL_SIZE * 0.5}
			y={0}
			width={SYMBOL_SIZE * BOARD_DIMENSIONS.x}
			height={FULL_HEIGHT}
			borderRadius={14}
			backgroundColor={0x000000}
			backgroundAlpha={dim.current}
		/>
	{/if}
	{#each columns as col (col.reel)}
		{@const x = getSymbolX(col.reel)}
		<Rectangle
			anchor={{ x: 0.5, y: 1 }}
			{x}
			y={BOTTOM}
			width={SYMBOL_SIZE * 0.96}
			height={FULL_HEIGHT * col.grow.current}
			borderRadius={14}
			backgroundColor={col.cells[0]?.style === 'fs' ? 0x2a1250 : 0x0e2f2b}
			backgroundAlpha={0.92}
			borderColor={col.cells[0]?.style === 'fs' ? 0xb38cff : 0x13c4a3}
			borderWidth={3}
		/>
		{#each col.cells as cell (cell.row)}
			{@const style = TIER_STYLE[cell.style]}
			<Container
				{x}
				y={getSymbolY(visibleRow(cell.row))}
				scale={cell.scale.current * col.pulse.current}
			>
				<Circle
					anchor={0.5}
					diameter={SYMBOL_SIZE * 0.8}
					backgroundColor={style.fill}
					borderColor={style.ring}
					borderWidth={6}
				/>
				<Text
					anchor={0.5}
					text={cell.label}
					style={{
						fontFamily: 'proxima-nova',
						fontWeight: '800',
						fontSize: SYMBOL_SIZE * (cell.label.length > 4 ? 0.2 : 0.26),
						fill: style.text,
					}}
				/>
			</Container>
		{/each}
		{#if col.totalText}
			<Container {x} y={getSymbolY(2)} scale={col.totalScale.current}>
				<Rectangle
					anchor={0.5}
					width={SYMBOL_SIZE * 1.5}
					height={SYMBOL_SIZE * 0.5}
					borderRadius={12}
					backgroundColor={0x000000}
					backgroundAlpha={0.8}
					borderColor={0xffffff}
					borderWidth={3}
				/>
				<Text
					anchor={0.5}
					text={col.totalText}
					style={{ fontFamily: 'proxima-nova', fontWeight: '800', fontSize: SYMBOL_SIZE * 0.22, fill: 0xffffff }}
				/>
			</Container>
		{/if}
	{/each}
</BoardContainer>
