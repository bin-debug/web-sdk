<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PIXI, getContextParent } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Ambient sparkle dust: motes in the theme's colours drifting up with a little
	// sway and twinkle, plus a few big soft glows. A win livens them for a few seconds
	// (faster, brighter). The count/palette/drift are the knobs a different theme would tune.
	//
	// Performance: sprites on the WHITE texture, built once and mutated in place by one ticker
	// callback; nothing is allocated or redrawn per frame and Svelte does no per-frame work.
	const context = getContext();
	const parent = getContextParent();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const PALETTE = [0x5fb4ff, 0xffffff, 0xffd23a, 0xa070ff];
	const SPARKS = 28;
	const GLOWS = 4;

	type Ember = {
		s: PIXI.Sprite;
		x: number;
		y: number;
		size: number;
		speed: number; // px/s upwards
		sway: number;
		phase: number;
		base: number; // resting alpha
	};

	let boost = 0; // 1 on a win, decays over ~3 s
	const stoke = () => (boost = 1);
	context.eventEmitter.subscribeOnMount({
		showClusterWinAmounts: stoke,
		winShow: stoke,
		freeSpinIntroShow: stoke,
	});

	const root = new PIXI.Container();
	root.zIndex = -1;
	const GLOW_R = 64;
	const glowTexture = (() => {
		// soft radial dot, drawn once
		const g = new PIXI.Graphics();
		for (let i = 8; i >= 1; i--) g.circle(0, 0, (GLOW_R * i) / 8).fill({ color: 0xffffff, alpha: 0.06 });
		return context.stateApp.pixiApplication?.renderer.generateTexture(g) ?? PIXI.Texture.WHITE;
	})();

	const make = (texture: PIXI.Texture, size: () => number, speed: () => number, base: number) => {
		const s = new PIXI.Sprite(texture);
		s.anchor.set(0.5);
		s.blendMode = 'add';
		s.tint = PALETTE[Math.floor(Math.random() * PALETTE.length)];
		root.addChild(s);
		return {
			s,
			x: Math.random(),
			y: Math.random(),
			size: size(),
			speed: speed(),
			sway: 6 + Math.random() * 14,
			phase: Math.random() * Math.PI * 2,
			base,
		} as Ember;
	};
	const embers: Ember[] = [
		...Array.from({ length: GLOWS }, () => make(glowTexture, () => 60 + Math.random() * 80, () => 5 + Math.random() * 6, 0.25)),
		...Array.from({ length: SPARKS }, () => make(PIXI.Texture.WHITE, () => 1.6 + Math.random() * 2.6, () => 8 + Math.random() * 18, 0.75)),
	];
	parent.addToParent(root);

	let time = 0;
	function update() {
		const ticker = context.stateApp.pixiApplication?.ticker;
		if (!ticker) return;
		const dt = Math.min(0.1, ticker.deltaMS / 1000); // clamp: no teleporting after a background tab
		time += dt;
		boost = Math.max(0, boost - dt * 0.35);
		const { width: W, height: H } = canvas;
		root.visible = W > 0;
		if (!W) return;
		const heat = 1 + boost * 1.8;

		for (const e of embers) {
			e.y -= (e.speed * heat * dt) / H;
			if (e.y < -0.05) {
				e.y = 1.05;
				e.x = Math.random();
			}
			const flicker = 0.6 + 0.4 * Math.sin(time * 7 + e.phase * 3);
			e.s.x = e.x * W + Math.sin(time * 1.3 + e.phase) * e.sway;
			e.s.y = e.y * H;
			e.s.width = e.s.height = e.size;
			// fade in from the bottom and out near the top
			const edge = Math.min(1, (1.05 - e.y) * 4, e.y * 3);
			e.s.alpha = Math.max(0, e.base * flicker * edge * Math.min(1, 0.7 + boost));
		}
	}

	const ticker = context.stateApp.pixiApplication?.ticker;
	ticker?.add(update);
	onDestroy(() => {
		ticker?.remove(update);
		root.destroy({ children: true });
		if (glowTexture !== PIXI.Texture.WHITE) glowTexture.destroy(true);
	});
</script>
