<script lang="ts">
	import { Circle } from 'pixi-svelte';
	import { onMount } from 'svelte';
	import { getContext } from '../game/context';

	// Ambient particles: slow-drifting gold sparkle dust with a soft twinkle. Kept as a
	// small, self-contained, game-scoped layer — the count/palette/drift are
	// the knobs a different game's theme would tune.
	//
	// Performance: each circle is drawn once (fixed colour, full alpha) and only its
	// position and display alpha change per frame. Particles are mutated in place, so
	// there are no per-frame allocations and no Graphics redraws / GPU re-uploads.
	type Particle = {
		x: number;
		y: number;
		size: number;
		speed: number;
		phase: number;
		color: number;
		alpha: number;
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const PALETTE = [0xffe9a0, 0xf5a524, 0x4ecdc4, 0xff6fb0];
	const COUNT = 26;

	const particles = $state<Particle[]>([]);
	let raf = 0;

	function seed(width: number, height: number) {
		particles.length = 0;
		for (let i = 0; i < COUNT; i++) {
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				size: 1.5 + Math.random() * 2.5,
				speed: 6 + Math.random() * 14, // px/sec upward drift
				phase: Math.random() * Math.PI * 2,
				color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
				alpha: 0.6,
			});
		}
	}

	onMount(() => {
		seed(canvas.width, canvas.height);
		let last = performance.now();

		const tick = (now: number) => {
			// Clamp so a backgrounded tab doesn't teleport particles on return.
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			const height = canvas.height;

			for (const p of particles) {
				let y = p.y - p.speed * dt;
				if (y < -10) y = height + 10;
				p.y = y;
				p.alpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(p.phase + y * 0.02));
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
