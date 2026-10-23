<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';
	import { onMount } from 'svelte';
	import type { SymbolState } from '../game/types';

	type Props = {
		x?: number;
		y?: number;
		state?: SymbolState;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		// another cluster is celebrating: sit back so the winners read
		dimmed?: boolean;
		// where on the board (cell centre) and in what colour it bursts when it explodes
		burstAt?: { x: number; y: number };
		burstColor?: number;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	// Symbols are flat sprites, so the motion is done here:
	// land      squash on impact and settle (doesn't hold the board up)
	// win       two glowing pulses, then complete
	// explosion flash, swell and fade while WinBurst throws chips and embers
	let scaleX = $state(1);
	let scaleY = $state(1);
	let rotation = $state(0);
	let alpha = $state(1);
	let glow = $state(0);
	let dim = $state(1);
	let raf = 0;
	let dimRaf = 0;

	const LAND_MS = 260;
	const WIN_MS = 720;
	const EXPLODE_MS = 240;

	function run(duration: number, frame: (t: number) => void, done?: () => void) {
		cancelAnimationFrame(raf);
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / duration);
			frame(t);
			if (t < 1) raf = requestAnimationFrame(tick);
			else done?.();
		};
		raf = requestAnimationFrame(tick);
	}

	function reset() {
		cancelAnimationFrame(raf);
		scaleX = scaleY = alpha = 1;
		rotation = glow = 0;
	}

	function land() {
		run(LAND_MS, (t) => {
			// damped spring: squash on contact, stretch back past 1, settle
			const k = Math.sin(t * Math.PI * 2.5) * Math.exp(-5 * t);
			scaleY = 1 - 0.16 * k;
			scaleX = 1 + 0.1 * k;
		}, reset);
	}

	function win(oncomplete?: () => void) {
		run(
			WIN_MS,
			(t) => {
				const pulse = Math.sin(t * Math.PI * 2) ** 2; // two beats
				const s = 1 + 0.16 * pulse;
				scaleX = scaleY = s;
				rotation = Math.sin(t * Math.PI * 4) * 0.05 * (1 - t);
				glow = 0.25 + 0.75 * pulse;
			},
			() => {
				reset();
				oncomplete?.();
			},
		);
	}

	function explode(oncomplete?: () => void) {
		context.eventEmitter.broadcast({
			type: 'symbolBurst',
			x: props.burstAt?.x ?? props.x ?? 0,
			y: props.burstAt?.y ?? props.y ?? 0,
			color: props.burstColor ?? 0xffd27a,
		});
		run(
			EXPLODE_MS,
			(t) => {
				const s = 1 + 0.35 * t;
				scaleX = scaleY = s;
				glow = 1 - t;
				alpha = 1 - t * t;
			},
			() => {
				alpha = 0;
				oncomplete?.();
			},
		);
	}

	onMount(() => () => {
		cancelAnimationFrame(raf);
		cancelAnimationFrame(dimRaf);
	});

	$effect(() => {
		props.symbolInfo;
		const state = props.state;
		const oncomplete = props.oncomplete;

		if (state === 'win') win(oncomplete);
		else if (state === 'explosion') explode(oncomplete);
		else if (state === 'land') {
			land();
			oncomplete?.();
		} else {
			// 'static' straight after 'land' must not cut the bounce short
			if (state !== 'static') reset();
			oncomplete?.();
		}
	});

	// fade the dimming in and out rather than snapping
	$effect(() => {
		const target = props.dimmed ? 0.4 : 1;
		cancelAnimationFrame(dimRaf);
		const from = dim;
		const start = performance.now();
		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / 160);
			dim = from + (target - from) * t;
			if (t < 1) dimRaf = requestAnimationFrame(tick);
		};
		dimRaf = requestAnimationFrame(tick);
	});

	const width = $derived(SYMBOL_SIZE * props.symbolInfo.sizeRatios.width);
	const height = $derived(SYMBOL_SIZE * props.symbolInfo.sizeRatios.height);
</script>

<Container x={props.x} y={props.y} scale={{ x: scaleX, y: scaleY }} {rotation} alpha={alpha * dim}>
	<Sprite anchor={0.5} key={props.symbolInfo.assetKey} {width} {height} />
	{#if glow > 0.01}
		<!-- the same art added on top, slightly larger: a warm bloom without a shader -->
		<Sprite
			anchor={0.5}
			key={props.symbolInfo.assetKey}
			width={width * 1.08}
			height={height * 1.08}
			blendMode="add"
			tint={0xffc070}
			alpha={glow * 0.55}
		/>
	{/if}
</Container>
