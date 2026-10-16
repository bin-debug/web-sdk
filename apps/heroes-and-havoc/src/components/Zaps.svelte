<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Zaps: comic-book energy flashes popping over the city, in the background's neon
	// yellow, pink and blue. Quick and sparse (never more than COUNT at once) so they read as
	// the hero fight in the sky, not confetti. Drawn behind the board, so only the ones
	// around the edges are seen.
	type Zap = {
		x: number;
		y: number;
		size: number;
		tint: number;
		spin: number;
		age: number; // seconds into this twinkle; negative = waiting to appear
		life: number;
		t: number; // 0..1 shape of the current bloom, read by the template
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const COUNT = 9;
	const TINTS = [0xffe14a, 0xffe14a, 0xff4fd8, 0x5ad1ff];

	const zaps = $state<Zap[]>([]);

	function respawn(tw: Zap, first = false) {
		const { width, height } = canvas;
		const unit = Math.min(width, height) / 1000;
		tw.x = Math.random() * width;
		tw.y = Math.random() * height * 0.75; // sky and rooftops
		tw.size = (40 + Math.random() * 50) * unit;
		tw.tint = TINTS[Math.floor(Math.random() * TINTS.length)];
		tw.spin = (Math.random() - 0.5) * 2;
		tw.life = 0.5 + Math.random() * 0.4;
		tw.age = -(first ? Math.random() * 2 : 0.4 + Math.random() * 1.6);
		tw.t = 0;
	}

	onMount(() => {
		for (let i = 0; i < COUNT; i++) {
			const tw = {} as Zap;
			respawn(tw, true);
			zaps.push(tw);
		}

		let last = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			for (const tw of zaps) {
				tw.age += dt;
				// size 0 = spawned while the window had no size yet (hidden tab): try again
				if (tw.age >= tw.life || tw.size === 0) respawn(tw);
				tw.t = tw.age > 0 ? tw.age / tw.life : 0;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	// quick bloom, slower fade
	const shape = (t: number) => (t <= 0 ? 0 : Math.sin(Math.PI * Math.pow(t, 0.7)));
</script>

{#if context.stateApp.loadedAssets?.zap}
	{#each zaps as tw, i (i)}
		{#if tw.t > 0}
			<Sprite
				key="zap"
				anchor={0.5}
				x={tw.x}
				y={tw.y}
				width={tw.size * shape(tw.t)}
				height={tw.size * shape(tw.t)}
				rotation={tw.spin * tw.t}
				alpha={0.9 * shape(tw.t)}
				tint={tw.tint}
				blendMode="add"
				zIndex={-1}
			/>
		{/if}
	{/each}
{/if}
