<script lang="ts" module>
	export type EmitterEventWinBurst = { type: 'symbolBurst'; x: number; y: number; color: number };
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PIXI, getContextParent } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';

	// When a winning symbol pops it bursts into confetti (fluttering paper strips in the symbol's
	// colour and the big top's) and gold sparkles, with a quick ring. Coordinates are board-local:
	// this sits inside a BoardContainer next to the tumble board.
	//
	// Performance: a fixed pool of sprites built once on the WHITE texture and one ticker callback
	// that moves them in place, so a burst allocates nothing and Svelte does no per-frame work.
	const context = getContext();
	const parent = getContextParent();

	const POOL = 240;
	const RINGS = 12;
	const CONFETTI = 9;
	const CONFETTI_TINTS = [0xffffff, 0xffd27a, 0x2fb3a8, 0xff4fa8];
	const SPARKLES = 5;

	type Bit = {
		s: PIXI.Sprite;
		aspect: number; // height / width: confetti strips are flat, sparkles square
		flutter: number; // confetti turns over as it falls: 0 = no flutter
		vx: number;
		vy: number;
		vr: number;
		g: number; // gravity, px/s²
		life: number;
		age: number;
		size: number;
	};
	type Ring = { g: PIXI.Graphics; age: number; life: number };

	const root = new PIXI.Container();
	const bits: Bit[] = Array.from({ length: POOL }, () => {
		const s = new PIXI.Sprite(PIXI.Texture.WHITE);
		s.anchor.set(0.5);
		s.visible = false;
		root.addChild(s);
		return { s, aspect: 1, flutter: 0, vx: 0, vy: 0, vr: 0, g: 0, life: 0, age: 1, size: 1 };
	});
	const RING_R = 50; // drawn once at this radius, then scaled
	const rings: Ring[] = Array.from({ length: RINGS }, () => {
		const g = new PIXI.Graphics().circle(0, 0, RING_R).stroke({ width: 6, color: 0xffffff });
		g.blendMode = 'add';
		g.visible = false;
		root.addChild(g);
		return { g, age: 1, life: 0.32 };
	});
	parent.addToParent(root);

	let nextBit = 0;
	let nextRing = 0;
	const rand = (a: number, b: number) => a + Math.random() * (b - a);
	const spawn = (setup: (bit: Bit) => void) => {
		const bit = bits[nextBit];
		nextBit = (nextBit + 1) % POOL;
		bit.age = 0;
		bit.s.visible = true;
		setup(bit);
	};

	const burst = ({ x, y, color }: EmitterEventWinBurst) => {
		const u = SYMBOL_SIZE / 80;
		for (let i = 0; i < CONFETTI; i++) {
			spawn((b) => {
				const a = rand(0, Math.PI * 2);
				const v = rand(80, 200) * u;
				b.vx = Math.cos(a) * v;
				b.vy = Math.sin(a) * v - 140 * u;
				b.vr = rand(-8, 8);
				b.g = 420 * u;
				b.life = rand(0.6, 0.9);
				b.size = rand(5, 9) * u;
				b.aspect = rand(0.35, 0.55);
				b.flutter = rand(10, 18);
				b.s.blendMode = 'normal';
				// mostly the symbol's colour, with a few strips of the big top's
				b.s.tint = i % 3 === 0 ? CONFETTI_TINTS[Math.floor(Math.random() * CONFETTI_TINTS.length)] : color;
				b.s.position.set(x + rand(-10, 10) * u, y + rand(-10, 10) * u);
				b.s.rotation = rand(0, Math.PI);
			});
		}
		for (let i = 0; i < SPARKLES; i++) {
			spawn((b) => {
				const a = rand(-Math.PI, 0); // upwards half
				const v = rand(40, 120) * u;
				b.vx = Math.cos(a) * v;
				b.vy = Math.sin(a) * v - 40 * u;
				b.vr = 0;
				b.g = -60 * u; // sparkles rise
				b.aspect = 1;
				b.flutter = 0;
				b.life = rand(0.6, 1.0);
				b.size = rand(2.5, 5) * u;
				b.s.blendMode = 'add';
				b.s.tint = i % 2 ? 0xffb347 : 0xfff1b0;
				b.s.position.set(x + rand(-16, 16) * u, y + rand(-16, 16) * u);
				b.s.rotation = Math.PI / 4;
			});
		}
		const ring = rings[nextRing];
		nextRing = (nextRing + 1) % RINGS;
		ring.age = 0;
		ring.g.tint = color;
		ring.g.position.set(x, y);
		ring.g.visible = true;
	};

	context.eventEmitter.subscribeOnMount({ symbolBurst: burst });

	function update() {
		const ticker = context.stateApp.pixiApplication?.ticker;
		if (!ticker) return;
		const dt = Math.min(0.05, ticker.deltaMS / 1000);
		for (const b of bits) {
			if (!b.s.visible) continue;
			b.age += dt;
			const t = b.age / b.life;
			if (t >= 1) {
				b.s.visible = false;
				continue;
			}
			b.vy += b.g * dt;
			if (b.flutter) b.vx *= 1 - 2.5 * dt; // paper drag
			b.s.x += b.vx * dt;
			b.s.y += b.vy * dt;
			b.s.rotation += b.vr * dt;
			const sz = b.size * (1 - t * 0.5);
			b.s.width = sz;
			// a strip turning over reads as its height swinging through zero
			b.s.height = sz * b.aspect * (b.flutter ? Math.abs(Math.cos(b.age * b.flutter)) + 0.15 : 1);
			b.s.alpha = 1 - t * t;
		}
		for (const r of rings) {
			if (!r.g.visible) continue;
			r.age += dt;
			const t = r.age / r.life;
			if (t >= 1) {
				r.g.visible = false;
				continue;
			}
			r.g.scale.set(((0.3 + t * 0.9) * SYMBOL_SIZE * 0.6) / RING_R);
			r.g.alpha = 0.7 * (1 - t);
		}
	}

	const ticker = context.stateApp.pixiApplication?.ticker;
	ticker?.add(update);
	onDestroy(() => {
		ticker?.remove(update);
		root.destroy({ children: true });
	});
</script>
