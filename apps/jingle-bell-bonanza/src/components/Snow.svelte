<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Snow: lots of flakes falling across the whole game at three depths, plus a frost glaze on
	// the screen edges, so the village reads as cold. Far flakes are small, slow and faint; near
	// flakes are bigger, faster and soft, and a few of them are six-arm crystals. A shared wind
	// drifts them sideways and now and then gusts.
	type Flake = {
		x: number;
		y: number;
		size: number;
		fall: number; // px per second, downwards
		sway: number; // sideways wobble amplitude, px
		drift: number; // how strongly the wind pushes this depth
		spin: number; // radians per second (crystals only)
		phase: number;
		alpha: number;
		crystal: boolean;
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	// far, mid, near
	const LAYERS = [
		{ count: 60, size: [9, 14], fall: [35, 55], alpha: 0.75, drift: 0.4, crystals: 0 },
		{ count: 45, size: [15, 22], fall: [65, 95], alpha: 0.9, drift: 0.7, crystals: 0.15 },
		{ count: 20, size: [26, 40], fall: [120, 170], alpha: 0.85, drift: 1, crystals: 0.4 },
	];

	const flakes = $state<Flake[]>([]);
	let time = $state(0);
	let wind = 0; // px per second at the near layer

	const rand = ([a, b]: number[]) => a + Math.random() * (b - a);

	function respawn(f: Flake, layer: (typeof LAYERS)[number], first = false) {
		const { width, height } = canvas;
		// floor so phones still see them; min side is under 400 px there
		const unit = Math.max(Math.min(width, height) / 1000, 0.6);
		f.crystal = Math.random() < layer.crystals;
		f.size = width ? rand(layer.size) * unit * (f.crystal ? 1.4 : 1) : 0;
		f.x = Math.random() * width * 1.2 - width * 0.1;
		f.y = first ? Math.random() * height : -f.size - Math.random() * height * 0.1;
		f.fall = rand(layer.fall) * unit;
		f.sway = rand([6, 18]) * unit;
		f.drift = layer.drift;
		f.spin = (Math.random() - 0.5) * 1.2;
		f.phase = Math.random() * Math.PI * 2;
		f.alpha = layer.alpha * (0.7 + Math.random() * 0.3);
	}

	onMount(() => {
		const owner: (typeof LAYERS)[number][] = [];
		for (const layer of LAYERS) {
			for (let i = 0; i < layer.count; i++) {
				const f = {} as Flake;
				respawn(f, layer, true);
				flakes.push(f);
				owner.push(layer);
			}
		}

		let last = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			time += dt;
			const { width, height } = canvas;
			const unit = Math.max(Math.min(width, height) / 1000, 0.6);
			// slow breeze with an occasional gust
			const gust = Math.max(0, Math.sin(time * 0.23) * Math.sin(time * 0.61)) * 140;
			wind = (25 + Math.sin(time * 0.17) * 30 + gust) * unit;
			for (let i = 0; i < flakes.length; i++) {
				const f = flakes[i];
				// size 0 = spawned while the window had no size yet (hidden tab): try again
				if (f.size === 0 || f.y > height + f.size || f.x > width * 1.15 || f.x < -width * 0.15)
					respawn(f, owner[i]);
				f.y += f.fall * dt;
				f.x += wind * f.drift * dt;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

{#if context.stateApp.loadedAssets?.snowDot && context.stateApp.loadedAssets?.snowCrystal}
	{#each flakes as f, i (i)}
		<Sprite
			key={f.crystal ? 'snowCrystal' : 'snowDot'}
			anchor={0.5}
			x={f.x + Math.sin(f.phase + time * 1.3) * f.sway}
			y={f.y}
			width={f.size}
			height={f.size}
			rotation={f.crystal ? f.phase + f.spin * time : 0}
			alpha={f.alpha}
		/>
	{/each}
{/if}

{#if context.stateApp.loadedAssets?.frost}
	<Sprite key="frost" width={canvas.width} height={canvas.height} alpha={1} />
{/if}
