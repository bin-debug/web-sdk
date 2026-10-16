<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Twinkles: a few soft star glints that bloom and fade around the big top's lights.
	// Kept sparse and slow on purpose (never more than COUNT at once, long gaps, warm
	// white/gold only) so they read as the tent's lights catching, not confetti.
	// Drawn behind the board, so only the ones around the edges are seen.
	type Twinkle = {
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

	const COUNT = 7;
	const TINTS = [0xfff6dc, 0xfff6dc, 0xffd98a];

	const twinkles = $state<Twinkle[]>([]);

	function respawn(tw: Twinkle, first = false) {
		const { width, height } = canvas;
		const unit = Math.min(width, height) / 1000;
		tw.x = Math.random() * width;
		tw.y = Math.random() * height * 0.7; // upper part: tent lights, bunting, balloons
		tw.size = (32 + Math.random() * 36) * unit;
		tw.tint = TINTS[Math.floor(Math.random() * TINTS.length)];
		tw.spin = (Math.random() - 0.5) * 0.6;
		tw.life = 1.1 + Math.random() * 0.7;
		tw.age = -(first ? Math.random() * 3 : 0.6 + Math.random() * 2.4);
		tw.t = 0;
	}

	onMount(() => {
		for (let i = 0; i < COUNT; i++) {
			const tw = {} as Twinkle;
			respawn(tw, true);
			twinkles.push(tw);
		}

		let last = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			for (const tw of twinkles) {
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

{#if context.stateApp.loadedAssets?.twinkle}
	{#each twinkles as tw, i (i)}
		{#if tw.t > 0}
			<Sprite
				key="twinkle"
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
