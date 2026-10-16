<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Gold dust: fine motes drifting up across the whole game, like sunlit dust in a temple.
	// Kept faint and slow (small, low alpha, warm gold only, gentle sway) so it reads as
	// atmosphere over the board without getting in the way of the symbols.
	type Mote = {
		x: number;
		y: number;
		size: number;
		rise: number; // px per second, upwards
		sway: number; // sideways drift amplitude, px
		phase: number;
		age: number; // seconds into this mote; negative = waiting to appear
		life: number;
		t: number; // 0..1 through its life, read by the template
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const COUNT = 26;

	const motes = $state<Mote[]>([]);

	function respawn(m: Mote, first = false) {
		const { width, height } = canvas;
		// floor so phones still see them; min side is under 400 px there
		const unit = Math.max(Math.min(width, height) / 1000, 0.6);
		m.x = Math.random() * width;
		m.y = height * (first ? Math.random() : 0.4 + Math.random() * 0.6);
		m.size = width ? (11 + Math.random() * 13) * unit : 0;
		m.rise = (18 + Math.random() * 26) * unit;
		m.sway = (6 + Math.random() * 14) * unit;
		m.phase = Math.random() * Math.PI * 2;
		m.life = 5 + Math.random() * 4;
		m.age = first ? Math.random() * m.life * 0.8 : -Math.random() * 2;
		m.t = 0;
	}

	onMount(() => {
		for (let i = 0; i < COUNT; i++) {
			const m = {} as Mote;
			respawn(m, true);
			motes.push(m);
		}

		let last = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			for (const m of motes) {
				m.age += dt;
				// size 0 = spawned while the window had no size yet (hidden tab): try again
				if (m.age >= m.life || m.size === 0) respawn(m);
				if (m.age > 0) m.y -= m.rise * dt;
				m.t = m.age > 0 ? m.age / m.life : 0;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	// fade in, hold, fade out, with a slow shimmer
	const alpha = (m: Mote) =>
		m.t <= 0 ? 0 : Math.sin(Math.PI * m.t) * (0.65 + 0.25 * Math.sin(m.phase + m.age * 3));
</script>

{#if context.stateApp.loadedAssets?.dust}
	{#each motes as m, i (i)}
		{#if m.t > 0}
			<Sprite
				key="dust"
				anchor={0.5}
				x={m.x + Math.sin(m.phase + m.age * 0.8) * m.sway}
				y={m.y}
				width={m.size}
				height={m.size}
				alpha={alpha(m)}
				blendMode="add"
			/>
		{/if}
	{/each}
{/if}
