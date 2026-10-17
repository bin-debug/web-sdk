<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PIXI, getContextParent } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Ambient particles: slow-drifting gold sparkle dust with a soft twinkle. Kept as a
	// small, self-contained, game-scoped layer — the count/palette/drift are
	// the knobs a different game's theme would tune.
	//
	// Performance: the dots are tinted sprites of one small circle texture in one container
	// (one draw call), moved in place by a single ticker callback. No Svelte state changes per
	// frame, and the callback and textures are released when the component goes away.
	type Particle = { sprite: PIXI.Sprite; speed: number; phase: number };

	const context = getContext();
	const parent = getContextParent();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const PALETTE = [0xffe9a0, 0xf5a524, 0x4ecdc4, 0xff6fb0];
	const COUNT = 26;

	function dotTexture() {
		const size = 16;
		const c = document.createElement('canvas');
		c.width = c.height = size;
		const g = c.getContext('2d')!;
		g.fillStyle = '#fff';
		g.beginPath();
		g.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
		g.fill();
		return PIXI.Texture.from(c);
	}

	const texture = dotTexture();
	const root = new PIXI.Container({ zIndex: -1 });
	let seeded = false;
	const particles: Particle[] = Array.from({ length: COUNT }, () => {
		const sprite = new PIXI.Sprite(texture);
		sprite.anchor.set(0.5);
		sprite.width = sprite.height = 1.5 + Math.random() * 2.5;
		sprite.tint = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		root.addChild(sprite);
		return {
			sprite,
			speed: 6 + Math.random() * 14, // px/sec upward drift
			phase: Math.random() * Math.PI * 2,
		};
	});
	parent.addToParent(root);

	function update() {
		const ticker = context.stateApp.pixiApplication?.ticker;
		const { width, height } = canvas;
		if (!ticker || !width) return;
		if (!seeded) {
			seeded = true;
			for (const p of particles) p.sprite.position.set(Math.random() * width, Math.random() * height);
		}
		// Clamp so a backgrounded tab doesn't teleport particles on return.
		const dt = Math.min(0.1, ticker.deltaMS / 1000);
		for (const p of particles) {
			const s = p.sprite;
			let y = s.y - p.speed * dt;
			if (y < -10) y = height + 10;
			s.y = y;
			s.alpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(p.phase + y * 0.02));
		}
	}

	const ticker = context.stateApp.pixiApplication?.ticker;
	ticker?.add(update);
	onDestroy(() => {
		ticker?.remove(update);
		root.destroy({ children: true });
		texture.destroy(true);
	});
</script>
