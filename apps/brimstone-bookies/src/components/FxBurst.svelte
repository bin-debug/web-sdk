<script lang="ts">
	import { Graphics } from 'pixi-svelte';
	import { FX } from '../game/fx.svelte';

	// A burst of little red/white dice and yellow sparks flying out from the centre, falling
	// with gravity and fading. Changing `key` fires it again.
	type Props = { size: number; count?: number; key?: unknown };
	const props: Props = $props();

	type Bit = { a: number; v: number; spin: number; s: number; color: number; dice: boolean };
	const LIFE = 1.6;
	let bits: Bit[] = [];
	let t = $state(LIFE);

	$effect(() => {
		props.key;
		bits = Array.from({ length: props.count ?? 34 }, (_, i) => {
			const dice = i % 3 !== 0;
			return {
				a: Math.random() * Math.PI * 2,
				v: 0.55 + Math.random() * 0.75,
				spin: (Math.random() - 0.5) * 12,
				s: dice ? 0.05 + Math.random() * 0.04 : 0.018 + Math.random() * 0.02,
				color: dice ? (Math.random() < 0.6 ? FX.red : 0xf2f2f2) : FX.yellow,
				dice,
			};
		});
		let raf = 0;
		let t0 = 0;
		const tick = (now: number) => {
			if (!t0) t0 = now;
			t = (now - t0) / 1000;
			if (t < LIFE) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<Graphics
	draw={(g) => {
		if (t >= LIFE) return;
		const S = props.size;
		const fade = 1 - Math.max(0, (t - LIFE * 0.55) / (LIFE * 0.45));
		for (const b of bits) {
			const d = b.v * S * (1 - Math.exp(-t * 3));
			const x = Math.cos(b.a) * d;
			const y = Math.sin(b.a) * d + S * 0.45 * t * t;
			const s = b.s * S;
			if (b.dice) {
				const w = Math.max(0.25, Math.abs(Math.cos(b.spin * t))) * s;
				g.roundRect(x - w / 2, y - s / 2, w, s, s * 0.22)
					.fill({ color: b.color, alpha: fade })
					.stroke({ color: 0x000000, width: Math.max(1.5, s * 0.12), alpha: fade });
				g.circle(x, y, s * 0.12).fill({ color: b.color === FX.red ? 0xffffff : 0x111111, alpha: fade });
			} else {
				g.star(x, y, 4, s, s * 0.35, b.spin * t).fill({ color: b.color, alpha: fade });
			}
		}
	}}
/>
