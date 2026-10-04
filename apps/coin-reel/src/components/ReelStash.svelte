<script lang="ts" module>
	export type EmitterEventReelStash =
		| { type: 'stashShow'; multipliers: number[] }
		| { type: 'stashUpdate'; reel: number; multiplier: number }
		| { type: 'stashHide' }
		| { type: 'collectorShow'; totals: number[] }
		| { type: 'collectorUpdate'; reel: number; total: number }
		| { type: 'collectorHide' };
</script>

<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { Container, Rectangle, Text } from 'pixi-svelte';
	import { BOOK_AMOUNT_MULTIPLIER } from 'constants-shared/bet';

	import BoardContainer from './BoardContainer.svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getSymbolX } from '../game/utils';
	import { getContext } from '../game/context';

	// One box above each reel. Stash bonus: a multiplier for that reel's coins.
	// Collector bonus: a pot of every coin value collected on that reel so far.
	type Kind = 'stash' | 'collector';
	const context = getContext();

	let kind = $state<Kind>('stash');
	let boxes = $state<{ value: number; scale: Tween<number> }[]>([]);
	const Y = -SYMBOL_SIZE * 0.42;

	const label = (value: number) =>
		kind === 'stash' ? `x${value}` : value > 0 ? `${value / BOOK_AMOUNT_MULTIPLIER}X` : '0X';
	const active = (value: number) => (kind === 'stash' ? value > 1 : value > 0);

	const show = (k: Kind, values: number[]) => {
		kind = k;
		boxes = values.map((value) => ({ value, scale: new Tween(1) }));
	};
	const update = async (reel: number, value: number) => {
		const box = boxes[reel];
		if (!box) return;
		await box.scale.set(1.35, { duration: 140 });
		box.value = value;
		await box.scale.set(1, { duration: 260, easing: backOut });
	};

	context.eventEmitter.subscribeOnMount({
		stashShow: ({ multipliers }) => show('stash', multipliers),
		stashUpdate: ({ reel, multiplier }) => update(reel, multiplier),
		stashHide: () => (boxes = []),
		collectorShow: ({ totals }) => show('collector', totals),
		collectorUpdate: ({ reel, total }) => update(reel, total),
		collectorHide: () => (boxes = []),
	});
</script>

<BoardContainer>
	{#each boxes as box, reel}
		<Container x={getSymbolX(reel)} y={Y} scale={box.scale.current}>
			<Rectangle
				anchor={0.5}
				width={SYMBOL_SIZE * 0.86}
				height={SYMBOL_SIZE * 0.42}
				borderRadius={10}
				backgroundColor={active(box.value) ? (kind === 'stash' ? 0x13c4a3 : 0xf2b91c) : 0x262a34}
				borderColor={0xe9edf5}
				borderWidth={3}
			/>
			<Text
				anchor={0.5}
				text={label(box.value)}
				style={{
					fontFamily: 'proxima-nova',
					fontWeight: '800',
					fontSize: SYMBOL_SIZE * (label(box.value).length > 4 ? 0.19 : 0.24),
					fill: active(box.value) ? 0x101215 : 0xffffff,
				}}
			/>
		</Container>
	{/each}
</BoardContainer>
