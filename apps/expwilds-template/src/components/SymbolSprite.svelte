<script lang="ts">
	import { untrack } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut, cubicOut } from 'svelte/easing';
	import { Container, Sprite } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import { THEME } from '../game/theme';
	import { clock } from '../game/clock.svelte';
	import type { SymbolState } from '../game/types';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		oncomplete?: () => void;
		state?: SymbolState;
	};

	const props: Props = $props();

	// Flat theme art has no Spine animations, so the motion is done here, Hacksaw style:
	// a squash-and-stretch when a reel lands, a pop with a warm glow on a win, and a slow
	// breathing glow on the wild and scatter while they sit on the board.
	const animated = THEME.staticSymbols;
	const special = $derived(['w.webp', 's.webp'].includes(props.symbolInfo.assetKey));
	const scaleX = new Tween(1);
	const scaleY = new Tween(1);
	const winGlow = new Tween(0);

	const land = async () => {
		const strength = special ? 1.6 : 1;
		scaleX.set(1 + 0.1 * strength, { duration: 0 });
		await scaleY.set(1 - 0.16 * strength, { duration: 0 });
		scaleX.set(0.97, { duration: 90, easing: cubicOut });
		await scaleY.set(1 + 0.06 * strength, { duration: 90, easing: cubicOut });
		scaleX.set(1, { duration: 140, easing: backOut });
		await scaleY.set(1, { duration: 140, easing: backOut });
	};

	const win = async () => {
		winGlow.set(1, { duration: 120 });
		for (let pop = 0; pop < 2; pop++) {
			scaleX.set(1.22, { duration: 170, easing: backOut });
			await scaleY.set(1.22, { duration: 170, easing: backOut });
			scaleX.set(1.02, { duration: 230, easing: cubicOut });
			await scaleY.set(1.02, { duration: 230, easing: cubicOut });
		}
		scaleX.set(1, { duration: 120 });
		scaleY.set(1, { duration: 120 });
		await winGlow.set(0, { duration: 160 });
	};

	$effect(() => {
		const state = props.state;
		props.symbolInfo;
		if (!animated || (state !== 'land' && state !== 'win')) {
			props.oncomplete?.();
			return;
		}
		untrack(async () => {
			await (state === 'land' ? land() : win());
			props.oncomplete?.();
		});
	});

	const idleGlow = $derived(
		animated && special && props.state !== 'spin' ? 0.3 + 0.2 * Math.sin(clock.t * 3) : 0,
	);
	const glow = $derived(Math.max(winGlow.current, idleGlow));
</script>

<Container x={props.x} y={props.y}>
	{#if animated && glow > 0.01}
		<Sprite
			key="glow.webp"
			anchor={0.5}
			width={SYMBOL_SIZE * 1.7}
			height={SYMBOL_SIZE * 1.7}
			alpha={glow}
			tint={special ? 0x8fd8ff : 0xffd54a}
			blendMode="add"
		/>
	{/if}
	<Container scale={{ x: scaleX.current, y: scaleY.current }}>
		<Sprite
			anchor={0.5}
			key={props.symbolInfo.assetKey}
			width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
			height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
		/>
	</Container>
</Container>
