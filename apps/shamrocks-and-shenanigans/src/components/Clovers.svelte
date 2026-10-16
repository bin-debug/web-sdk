<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Clovers: a few shamrock leaves tumbling slowly down across the whole game.
	// Kept sparse and faint (small, low alpha, slow fall, gentle sway and spin) so they
	// read as atmosphere in the pub without getting in the way of the symbols.
	type Leaf = {
		x: number;
		y: number;
		size: number;
		fall: number; // px per second, downwards
		sway: number; // sideways drift amplitude, px
		spin: number; // radians per second
		phase: number;
		age: number; // seconds into this leaf; negative = waiting to appear
		life: number;
		t: number; // 0..1 through its life, read by the template
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const COUNT = 12;

	const leaves = $state<Leaf[]>([]);

	function respawn(l: Leaf, first = false) {
		const { width, height } = canvas;
		// floor so phones still see them; min side is under 400 px there
		const unit = Math.max(Math.min(width, height) / 1000, 0.6);
		l.x = Math.random() * width;
		l.y = height * (first ? Math.random() * 0.6 : -0.05 + Math.random() * 0.3);
		l.size = width ? (26 + Math.random() * 18) * unit : 0;
		l.fall = (22 + Math.random() * 22) * unit;
		l.sway = (14 + Math.random() * 22) * unit;
		l.spin = (Math.random() - 0.5) * 1.6;
		l.phase = Math.random() * Math.PI * 2;
		l.life = 7 + Math.random() * 5;
		l.age = first ? Math.random() * l.life * 0.8 : -Math.random() * 3;
		l.t = 0;
	}

	onMount(() => {
		for (let i = 0; i < COUNT; i++) {
			const l = {} as Leaf;
			respawn(l, true);
			leaves.push(l);
		}

		let last = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			for (const l of leaves) {
				l.age += dt;
				// size 0 = spawned while the window had no size yet (hidden tab): try again
				if (l.age >= l.life || l.size === 0) respawn(l);
				if (l.age > 0) l.y += l.fall * dt;
				l.t = l.age > 0 ? l.age / l.life : 0;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	// fade in, hold, fade out
	const alpha = (l: Leaf) => (l.t <= 0 ? 0 : 0.85 * Math.min(1, Math.sin(Math.PI * l.t) * 2));
</script>

{#if context.stateApp.loadedAssets?.clover}
	{#each leaves as l, i (i)}
		{#if l.t > 0}
			<Sprite
				key="clover"
				anchor={0.5}
				x={l.x + Math.sin(l.phase + l.age * 0.9) * l.sway}
				y={l.y}
				width={l.size}
				height={l.size * (0.75 + 0.25 * Math.cos(l.phase + l.age * 1.7))}
				rotation={l.phase + l.spin * l.age}
				alpha={alpha(l)}
			/>
		{/if}
	{/each}
{/if}
