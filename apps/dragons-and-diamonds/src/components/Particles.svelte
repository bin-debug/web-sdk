<script lang="ts">
	import { Circle } from 'pixi-svelte';
	import { onMount } from 'svelte';
	import { getContext } from '../game/context';

	// Ambient particles: torch embers and gem dust that rise from the bottom of the
	// screen, sway side to side and fade out as they climb. Drawn behind the board, so
	// they show around the reels and never over the symbols.
	//
	// Each circle is drawn once; only position and alpha change per frame, mutated in
	// place, so there are no per-frame allocations.
	type Particle = {
		x: number;
		y: number;
		baseX: number;
		size: number;
		speed: number;
		sway: number;
		phase: number;
		color: number;
		alpha: number;
		peak: number;
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const PALETTE = [0xffd27a, 0xffb347, 0xffffff, 0x5fb4ff, 0xff5a6e, 0x4ee6a0];
	const COUNT = 30;

	const particles = $state<Particle[]>([]);
	let raf = 0;

	// first = spread over the whole screen at start; afterwards they enter from below
	function spawn(p: Particle, width: number, height: number, first = false) {
		const unit = Math.min(width, height) / 1000;
		p.baseX = Math.random() * width;
		p.x = p.baseX;
		p.y = first ? Math.random() * height : height + 20 * unit + Math.random() * 120 * unit;
		p.size = (9 + Math.random() * 11) * unit;
		p.speed = (35 + Math.random() * 55) * unit; // px/sec upward
		p.sway = (8 + Math.random() * 22) * unit;
		p.phase = Math.random() * Math.PI * 2;
		p.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		p.peak = 0.85 + Math.random() * 0.15;
		p.alpha = 0;
	}

	onMount(() => {
		for (let i = 0; i < COUNT; i++) {
			const p = {} as Particle;
			spawn(p, canvas.width, canvas.height, true);
			particles.push(p);
		}
		let last = performance.now();

		const tick = (now: number) => {
			// Clamp so a backgrounded tab doesn't teleport particles on return.
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			const { width, height } = canvas;
			const t = now / 1000;

			for (const p of particles) {
				p.y -= p.speed * dt;
				// size 0 = spawned while the window had no size yet (hidden tab): try again
				if (p.y < height * 0.08 || p.size === 0) spawn(p, width, height);
				p.x = p.baseX + Math.sin(t * 1.3 + p.phase) * p.sway;
				// fade in over the bottom 15%, fade out over the top 45%
				const h = p.y / height;
				const fade = Math.min(1, (1 - h) / 0.15, Math.max(0, (h - 0.08) / 0.45));
				p.alpha = Math.max(0, fade) * p.peak * (0.75 + 0.25 * Math.sin(t * 4 + p.phase));
			}

			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(raf);
	});
</script>

{#each particles as p, i (i)}
	<Circle
		x={p.x}
		y={p.y}
		alpha={p.alpha}
		diameter={p.size}
		backgroundColor={p.color}
		anchor={0.5}
		zIndex={-1}
	/>
{/each}
