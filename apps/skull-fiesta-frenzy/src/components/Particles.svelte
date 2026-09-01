<script lang="ts">
	import { Circle } from 'pixi-svelte';
	import { onMount } from 'svelte';
	import { getContext } from '../game/context';

	// Ambient particles picked to match Bad & Boujee's neon-city, glitter/gold
	// theme: slow-drifting gold sparkle dust with a soft twinkle. Kept as a
	// small, self-contained, game-scoped layer — the count/palette/drift are
	// the knobs a different game's theme would tune.
	type Particle = {
		x: number;
		y: number;
		baseY: number;
		size: number;
		speed: number;
		phase: number;
		color: number;
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const PALETTE = [0xffe9a0, 0xf5a524, 0x4ecdc4, 0xff6fb0];
	const COUNT = 26;

	let particles = $state<Particle[]>([]);
	let raf = 0;

	function seed(width: number, height: number): Particle[] {
		return Array.from({ length: COUNT }, () => {
			const y = Math.random() * height;
			return {
				x: Math.random() * width,
				y,
				baseY: y,
				size: 1.5 + Math.random() * 2.5,
				speed: 6 + Math.random() * 14, // px/sec upward drift
				phase: Math.random() * Math.PI * 2,
				color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
			};
		});
	}

	onMount(() => {
		particles = seed(canvas.width, canvas.height);
		let last = performance.now();

		const tick = (now: number) => {
			const dt = (now - last) / 1000;
			last = now;
			const { width, height } = canvas;

			particles = particles.map((p) => {
				let y = p.y - p.speed * dt;
				if (y < -10) y = height + 10;
				return { ...p, y };
			});

			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(raf);
	});
</script>

{#each particles as p, i (i)}
	{@const twinkle = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(p.phase + p.y * 0.02))}
	<Circle
		x={p.x}
		y={p.y}
		diameter={p.size}
		backgroundColor={p.color}
		backgroundAlpha={twinkle}
		anchor={0.5}
		zIndex={-1}
	/>
{/each}
