<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PIXI, getContextParent } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Lasers: club laser beams fanning out from two emitters high in the yard, sweeping to the
	// amapiano beat and swapping patterns every few bars, behind the reels. A win speeds the
	// sweep up for a few seconds.
	//
	// Performance: every beam is a stretched white sprite (a straight stroke is a rectangle), so
	// nothing is re-tessellated per frame; one ticker callback moves them in place, no Svelte
	// state changes per frame, and the callback is removed when the component goes away.
	const context = getContext();
	const parent = getContextParent();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const isLandscape = $derived(
		['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType()),
	);

	const BPM = 110; // bgm_main tempo
	const COLOURS = [0x39ff6a, 0xff2d55, 0x3d7bff, 0xb44dff, 0x39ff6a, 0xff2d55];
	const BAR = (60 / BPM) * 4;
	const BEAMS = 4;
	// soft glow, then the hard core: [width, alpha, white core]
	const STROKES = [
		[18, 0.2, false],
		[6, 0.45, false],
		[2.2, 0.85, true],
	] as const;
	const CIRCLE_R = 40; // drawn once at this radius, then scaled

	let time = 0;
	let boost = 0; // 1 on a win, decays

	const cheer = () => (boost = 1);
	context.eventEmitter.subscribeOnMount({
		showClusterWinAmounts: cheer,
		winShow: cheer,
		freeSpinIntroShow: cheer,
	});

	const root = new PIXI.Container();
	type Emitter = { dir: number; beams: PIXI.Sprite[][]; core: PIXI.Graphics; halo: PIXI.Graphics };
	const emitters: Emitter[] = [1, -1].map((dir) => {
		const beams = Array.from({ length: BEAMS }, (_, i) =>
			STROKES.map(([, , white]) => {
				const s = new PIXI.Sprite(PIXI.Texture.WHITE);
				s.anchor.set(0, 0.5);
				s.blendMode = 'add';
				s.tint = white ? 0xffffff : COLOURS[(i + (dir > 0 ? 0 : 2)) % COLOURS.length];
				root.addChild(s);
				return s;
			}),
		);
		const core = new PIXI.Graphics().circle(0, 0, CIRCLE_R).fill(0xffffff);
		const halo = new PIXI.Graphics().circle(0, 0, CIRCLE_R).fill(COLOURS[0]);
		core.blendMode = halo.blendMode = 'add';
		root.addChild(core, halo);
		return { dir, beams, core, halo };
	});
	parent.addToParent(root);

	function update() {
		const ticker = context.stateApp.pixiApplication?.ticker;
		if (!ticker) return;
		const dt = Math.min(0.1, ticker.deltaMS / 1000);
		time += dt * (1 + boost * 2);
		boost = Math.max(0, boost - dt * 0.3);

		const { width: W, height: H } = canvas;
		root.visible = W > 0;
		if (!W) return;
		const u = Math.max(Math.min(W, H) / 1000, 0.5);
		const beatPhase = ((time * BPM) / 60) % 1;
		const thump = Math.exp(-beatPhase * 5);
		const len = Math.hypot(W, H) * 1.2;
		// emitters up among the string lights: top corners on desktop, above the reels on mobile
		const ey = H * (isLandscape ? 0.06 : 0.09);
		const pattern = Math.floor(time / (BAR * 2)) % 3; // fan sweep, scissor, spin
		const level = (0.55 + 0.45 * thump) * 0.85;

		for (const e of emitters) {
			const ex = e.dir > 0 ? W * (isLandscape ? 0.06 : 0.1) : W * (isLandscape ? 0.94 : 0.9);
			for (let i = 0; i < BEAMS; i++) {
				const k = i / (BEAMS - 1); // 0..1 across the fan
				let a: number; // angle from straight down, + towards the middle of the screen
				if (pattern === 0) a = 0.15 + k * 0.9 + Math.sin(time * 0.9) * 0.35;
				else if (pattern === 1) a = 0.55 + Math.sin(time * 1.6 + k * 2.2) * 0.55;
				else a = 0.6 + Math.sin(time * 0.7 + k * 6.28) * 0.6;
				const ang = Math.PI / 2 - a * e.dir; // canvas angle
				const strokes = e.beams[i];
				for (let j = 0; j < STROKES.length; j++) {
					const s = strokes[j];
					s.position.set(ex, ey);
					s.rotation = ang;
					s.width = len;
					s.height = STROKES[j][0] * u;
					s.alpha = STROKES[j][1] * level;
				}
			}
			const grow = 1 + thump * 0.4;
			e.core.position.set(ex, ey);
			e.core.scale.set((10 * u * grow) / CIRCLE_R);
			e.core.alpha = 0.6 * level;
			e.halo.position.set(ex, ey);
			e.halo.scale.set((26 * u * grow) / CIRCLE_R);
			e.halo.alpha = 0.18 * level;
		}
	}

	const ticker = context.stateApp.pixiApplication?.ticker;
	ticker?.add(update);
	onDestroy(() => {
		ticker?.remove(update);
		root.destroy({ children: true });
	});
</script>
