<script lang="ts" module>
	export type EmitterEventWinBurst = { type: 'symbolBurst'; x: number; y: number; color: number };
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PIXI, getContextParent } from 'pixi-svelte';

	import { SYMBOL_SIZE } from '../game/constants';
	import { getContext } from '../game/context';

	// When a winning symbol explodes it bursts into stone chips (tumbling, falling) and embers
	// (additive, floating up), with a quick shock ring. Coordinates are board-local: this sits
	// inside a BoardContainer next to the tumble board.
	//
	// Performance: a fixed pool of sprites built once on the WHITE texture and one ticker callback
	// that moves them in place, so a burst allocates nothing and Svelte does no per-frame work.
	const context = getContext();
	const parent = getContextParent();

	const POOL = 180;
	const RINGS = 12;
	const CHIPS = 7;
	const EMBERS = 6;

	type Bit = {
		s: PIXI.Sprite;
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
		return { s, vx: 0, vy: 0, vr: 0, g: 0, life: 0, age: 1, size: 1 };
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
		for (let i = 0; i < CHIPS; i++) {
			spawn((b) => {
				const a = rand(0, Math.PI * 2);
				const v = rand(90, 220) * u;
				b.vx = Math.cos(a) * v;
				b.vy = Math.sin(a) * v - 120 * u;
				b.vr = rand(-12, 12);
				b.g = 620 * u;
				b.life = rand(0.45, 0.7);
				b.size = rand(4, 9) * u;
				b.s.blendMode = 'normal';
				b.s.tint = i % 3 === 0 ? 0x8a7a5c : color; // a few stone chips in the accent colour among the coloured ones
				b.s.position.set(x + rand(-10, 10) * u, y + rand(-10, 10) * u);
				b.s.rotation = rand(0, Math.PI);
			});
		}
		for (let i = 0; i < EMBERS; i++) {
			spawn((b) => {
				const a = rand(-Math.PI, 0); // upwards half
				const v = rand(40, 120) * u;
				b.vx = Math.cos(a) * v;
				b.vy = Math.sin(a) * v - 40 * u;
				b.vr = 0;
				b.g = -60 * u; // embers rise
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
			b.s.x += b.vx * dt;
			b.s.y += b.vy * dt;
			b.s.rotation += b.vr * dt;
			const sz = b.size * (1 - t * 0.5);
			b.s.width = sz;
			b.s.height = sz;
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
