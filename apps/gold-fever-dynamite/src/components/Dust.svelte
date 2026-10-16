<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Dust: a hot dry wind blowing across the whole game. Lots of grit at two depths, fast wind
	// streaks that show up mostly in gusts, and a few big soft dust clouds rolling low across the
	// canyon floor. Everything rides one shared wind that never stops and gusts every few seconds.
	type Mote = {
		kind: 'grain' | 'streak' | 'puff';
		x: number;
		y: number;
		size: number; // width, px
		speed: number; // own extra px per second along the wind
		drift: number; // how strongly the wind pushes it
		bob: number; // vertical wobble amplitude, px
		fall: number; // px per second, + down / - up
		spin: number; // radians per second (puffs only)
		phase: number;
		alpha: number;
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const KINDS = [
		// far grit, near grit, wind streaks, dust clouds
		{ kind: 'grain', count: 50, size: [6, 11], speed: [0, 40], drift: 0.7, alpha: [0.55, 0.8], band: [0, 1] },
		{ kind: 'grain', count: 25, size: [11, 20], speed: [30, 90], drift: 1, alpha: [0.7, 0.95], band: [0, 1] },
		{ kind: 'streak', count: 16, size: [60, 140], speed: [120, 260], drift: 1.4, alpha: [0.5, 0.8], band: [0.05, 1] },
		{ kind: 'puff', count: 4, size: [380, 720], speed: [0, 30], drift: 0.6, alpha: [0.28, 0.42], band: [0.4, 1.05] },
	] as const;

	const motes = $state<Mote[]>([]);
	let time = $state(0);
	let gust = $state(0); // 0..1, streaks brighten with it

	const rand = ([a, b]: readonly number[]) => a + Math.random() * (b - a);
	const unitOf = (w: number, h: number) => Math.max(Math.min(w, h) / 1000, 0.6);

	function respawn(m: Mote, k: (typeof KINDS)[number], first = false) {
		const { width, height } = canvas;
		const unit = unitOf(width, height);
		m.kind = k.kind;
		m.size = width ? rand(k.size) * unit : 0;
		// enter from the upwind (left) edge; on start-up scatter across the screen
		m.x = first ? Math.random() * width : -m.size * 0.6 - Math.random() * width * 0.2;
		m.y = height * rand(k.band);
		m.speed = rand(k.speed) * unit;
		m.drift = k.drift;
		m.bob = rand([4, 16]) * unit * (k.kind === 'puff' ? 3 : 1);
		m.fall = rand([-12, 18]) * unit;
		m.spin = (Math.random() - 0.5) * 0.3;
		m.phase = Math.random() * Math.PI * 2;
		m.alpha = rand(k.alpha);
	}

	onMount(() => {
		const owner: (typeof KINDS)[number][] = [];
		for (const k of KINDS) {
			for (let i = 0; i < k.count; i++) {
				const m = {} as Mote;
				respawn(m, k, true);
				motes.push(m);
				owner.push(k);
			}
		}

		let last = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			time += dt;
			const { width, height } = canvas;
			const unit = unitOf(width, height);
			// steady breeze that never drops, plus a gust every few seconds
			gust = Math.max(0, Math.sin(time * 0.45) * Math.sin(time * 1.1 + 1));
			const wind = (140 + Math.sin(time * 0.3) * 40 + gust * 320) * unit;
			for (let i = 0; i < motes.length; i++) {
				const m = motes[i];
				// size 0 = spawned while the window had no size yet (hidden tab): try again
				if (m.size === 0 || m.x > width + m.size * 0.6 || m.y > height + m.size || m.y < -m.size)
					respawn(m, owner[i]);
				m.x += (wind * m.drift + m.speed) * dt;
				m.y += m.fall * dt;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

{#if context.stateApp.loadedAssets?.dustGrain && context.stateApp.loadedAssets?.dustStreak && context.stateApp.loadedAssets?.dustPuff}
	{#each motes as m, i (i)}
		{#if m.kind === 'puff'}
			<Sprite
				key="dustPuff"
				anchor={0.5}
				x={m.x}
				y={m.y + Math.sin(m.phase + time * 0.5) * m.bob}
				width={m.size * (1 + 0.08 * Math.sin(m.phase + time * 0.7))}
				height={m.size * 0.55}
				rotation={m.spin * time}
				alpha={m.alpha * (0.75 + gust * 0.5)}
			/>
		{:else if m.kind === 'streak'}
			<Sprite
				key="dustStreak"
				anchor={0.5}
				x={m.x}
				y={m.y + Math.sin(m.phase + time * 2) * m.bob}
				width={m.size * (1 + gust * 0.8)}
				height={m.size * 0.16}
				rotation={Math.sin(m.phase + time * 1.5) * 0.06}
				alpha={Math.min(1, m.alpha * (0.45 + gust * 0.8))}
			/>
		{:else}
			<Sprite
				key="dustGrain"
				anchor={0.5}
				x={m.x}
				y={m.y + Math.sin(m.phase + time * 2.4) * m.bob}
				width={m.size * (1 + gust * 0.6)}
				height={m.size}
				alpha={m.alpha}
			/>
		{/if}
	{/each}
{/if}
