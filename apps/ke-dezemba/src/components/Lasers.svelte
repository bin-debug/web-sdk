<script lang="ts">
	import { onMount } from 'svelte';
	import { Graphics } from 'pixi-svelte';
	import type * as PIXI from 'pixi.js';
	import { getContext } from '../game/context';

	// Lasers: club laser beams fanning out from two emitters high in the yard, sweeping to the
	// amapiano beat and swapping patterns every few bars. Two layers: `front={false}` is the
	// everyday show behind the reels; `front` only lights up on a cluster win, big win or free
	// spins trigger, sweeping fast over the reels with extra, thicker beams and strobe lights.
	const { front = false }: { front?: boolean } = $props();
	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);

	const BPM = 110; // bgm_main tempo
	const COLOURS = [0x39ff6a, 0xff2d55, 0x3d7bff, 0xb44dff, 0x39ff6a, 0xff2d55];
	const BAR = (60 / BPM) * 4;

	let time = $state(0);
	let boost = $state(0); // 1 on a win, decays

	const cheer = () => (boost = 1);
	context.eventEmitter.subscribeOnMount({
		showClusterWinAmounts: cheer,
		winShow: cheer,
		freeSpinIntroShow: cheer,
	});

	onMount(() => {
		let last = performance.now();
		let raf = 0;
		const tick = (now: number) => {
			const dt = Math.min(0.1, (now - last) / 1000);
			last = now;
			time += dt * (1 + boost * 2);
			boost = Math.max(0, boost - dt * 0.3);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	function draw(g: PIXI.Graphics) {
		const { width: W, height: H } = canvas;
		if (!W) return;
		const u = Math.max(Math.min(W, H) / 1000, 0.5);
		const beatPhase = ((time * BPM) / 60) % 1;
		const thump = Math.exp(-beatPhase * 5);
		const len = Math.hypot(W, H) * 1.2;
		// emitters up among the string lights: top corners on desktop, above the reels on mobile
		const ey = H * (isLandscape ? 0.06 : 0.09);
		const emitters = [
			{ x: W * (isLandscape ? 0.06 : 0.1), y: ey, dir: 1 },
			{ x: W * (isLandscape ? 0.94 : 0.9), y: ey, dir: -1 },
		];
		if (front && boost <= 0) return;
		const beams = front ? 8 : 4;
		const pattern = Math.floor(time / (BAR * 2)) % 3; // fan sweep, scissor, spin
		const level = front ? (0.6 + 0.4 * thump) * Math.min(1, boost * 2) * 1.4 : (0.55 + 0.45 * thump) * 0.85;
		const w = front ? 1.7 : 1;

		for (const e of emitters) {
			for (let i = 0; i < beams; i++) {
				const k = i / Math.max(1, beams - 1); // 0..1 across the fan
				let a: number; // angle from straight down, + towards the middle of the screen
				if (pattern === 0) a = 0.15 + k * 0.9 + Math.sin(time * 0.9) * 0.35;
				else if (pattern === 1) a = 0.55 + Math.sin(time * 1.6 + k * 2.2) * 0.55;
				else a = 0.6 + Math.sin(time * 0.7 + k * 6.28) * 0.6;
				const ang = Math.PI / 2 - a * e.dir; // canvas angle
				const x2 = e.x + Math.cos(ang) * len;
				const y2 = e.y + Math.sin(ang) * len;
				const c = COLOURS[(i + (e.dir > 0 ? 0 : 2)) % COLOURS.length];
				// soft glow, then the hard core
				g.moveTo(e.x, e.y).lineTo(x2, y2).stroke({ width: 18 * w * u, color: c, alpha: 0.2 * level });
				g.moveTo(e.x, e.y).lineTo(x2, y2).stroke({ width: 6 * w * u, color: c, alpha: 0.45 * level });
				g.moveTo(e.x, e.y).lineTo(x2, y2).stroke({ width: 2.2 * w * u, color: 0xffffff, alpha: 0.85 * level });
			}
			g.circle(e.x, e.y, 10 * u * (1 + thump * 0.4)).fill({ color: 0xffffff, alpha: 0.6 * level });
			g.circle(e.x, e.y, 26 * u * (1 + thump * 0.4)).fill({ color: COLOURS[0], alpha: 0.18 * level });
		}
		// win strobe: one hard flash per beat (under 2 a second, kept below the 3 Hz photosensitivity
		// limit), white on the downbeat of each bar, laser colours on the other beats
		if (front && boost > 0.15 && beatPhase < 0.1) {
			const beat = Math.floor((time * BPM) / 60) % 4;
			const color = beat === 0 ? 0xffffff : COLOURS[beat];
			g.rect(0, 0, W, H).fill({ color, alpha: (beat === 0 ? 0.45 : 0.3) * Math.min(1, boost * 1.5) * (1 - beatPhase * 10) });
		}
	}
</script>

<Graphics blendMode="add" {draw} />
