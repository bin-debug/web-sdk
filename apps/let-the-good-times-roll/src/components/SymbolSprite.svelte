<script lang="ts">
	import { Container, Sprite, type SpriteProps } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import { onMount } from 'svelte';
	import type { SymbolState } from '../game/types';

	type Props = {
		x?: number;
		y?: number;
		state?: SymbolState;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		oncomplete?: () => void;
	};

	const props: Props = $props();

	// Winning symbols get a quick shake -> shrink -> pop beat before the tumble
	// removes them and new symbols drop in. Everything else (idle/spin/land)
	// keeps the previous instant-complete behaviour untouched.
	let winScale = $state(1);
	let winRotation = $state(0);
	let winRaf = 0;

	const SHAKE_MS = 180;
	const MINIMIZE_MS = 130;
	const POP_MS = 150;
	const TOTAL_MS = SHAKE_MS + MINIMIZE_MS + POP_MS;

	function animateWin(oncomplete?: () => void) {
		cancelAnimationFrame(winRaf);
		const start = performance.now();

		const tick = (now: number) => {
			const t = now - start;
			if (t < SHAKE_MS) {
				const p = t / SHAKE_MS;
				winScale = 1;
				winRotation = Math.sin(p * Math.PI * 6) * 0.09 * (1 - p * 0.3);
			} else if (t < SHAKE_MS + MINIMIZE_MS) {
				const p = (t - SHAKE_MS) / MINIMIZE_MS;
				winRotation = 0;
				winScale = 1 - p * 0.45;
			} else if (t < TOTAL_MS) {
				const p = (t - SHAKE_MS - MINIMIZE_MS) / POP_MS;
				winScale = p < 0.4 ? 0.55 + (p / 0.4) * 0.6 : 1.15 * (1 - (p - 0.4) / 0.6);
			} else {
				winScale = 0;
				winRotation = 0;
				oncomplete?.();
				return;
			}
			winRaf = requestAnimationFrame(tick);
		};
		winRaf = requestAnimationFrame(tick);
	}

	onMount(() => {
		if (props.state !== 'win') props.oncomplete?.();
		return () => cancelAnimationFrame(winRaf);
	});

	$effect(() => {
		props.symbolInfo;

		if (props.state === 'win') {
			animateWin(props.oncomplete);
		} else {
			cancelAnimationFrame(winRaf);
			winScale = 1;
			winRotation = 0;
			props.oncomplete?.();
		}
	});
</script>

<Container x={props.x} y={props.y} scale={{ x: winScale, y: winScale }} rotation={winRotation}>
	<Sprite
		anchor={0.5}
		key={props.symbolInfo.assetKey}
		width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
		height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	/>
</Container>
