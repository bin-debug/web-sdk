<script lang="ts">
	import { ParticleContainer, Particles, Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Snow: flakes falling at three depths behind the reels, plus a frost glaze on the screen
	// edges. Far flakes are small, slow and faint; near flakes are bigger, faster, and a few of
	// them are six-arm crystals. A shared wind drifts them sideways and now and then gusts.
	//
	// Performance: the flakes are PIXI particles in two ParticleContainers (dots and crystals),
	// so each set is one draw call and is moved in place every frame. No Svelte state changes
	// per frame, and the ticker callbacks are removed when the component goes away.
	type P = {
		x: number;
		y: number;
		scaleX: number;
		scaleY: number;
		rotation: number;
		alpha: number;
		anchorX: number;
		anchorY: number;
	};
	type Flake = {
		x: number; // centre before sway
		y: number;
		size: number;
		fall: number; // px per second, downwards
		sway: number; // sideways wobble amplitude, px
		drift: number; // how strongly the wind pushes this depth
		spin: number; // radians per second (crystals only)
		phase: number;
		alpha: number;
		layer: (typeof LAYERS)[number];
	};

	const context = getContext();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	// far, mid, near
	const LAYERS = [
		{ count: 45, size: [9, 14], fall: [35, 55], alpha: 0.75, drift: 0.4, crystals: 0 },
		{ count: 32, size: [15, 22], fall: [65, 95], alpha: 0.9, drift: 0.7, crystals: 0.15 },
		{ count: 15, size: [26, 40], fall: [120, 170], alpha: 0.85, drift: 1, crystals: 0.4 },
	];
	const DOT_LAYERS = LAYERS.flatMap((l) => Array(l.count - Math.round(l.count * l.crystals)).fill(l));
	const CRYSTAL_LAYERS = LAYERS.flatMap((l) => Array(Math.round(l.count * l.crystals)).fill(l));

	const rand = ([a, b]: number[]) => a + Math.random() * (b - a);
	const unitOf = (w: number, h: number) => Math.max(Math.min(w, h) / 1000, 0.6); // phones: min side < 400 px

	let time = 0;
	let wind = 0;
	let dt = 0;
	let lastFrame = -1;

	// One clock for both sets: advance time and wind once per ticker frame.
	function advance() {
		const ticker = context.stateApp.pixiApplication?.ticker;
		if (!ticker || ticker.lastTime === lastFrame) return;
		lastFrame = ticker.lastTime;
		dt = Math.min(0.1, ticker.deltaMS / 1000);
		time += dt;
		const { width, height } = canvas;
		const gust = Math.max(0, Math.sin(time * 0.23) * Math.sin(time * 0.61)) * 140;
		wind = (25 + Math.sin(time * 0.17) * 30 + gust) * unitOf(width, height);
	}

	function respawn(f: Flake, crystal: boolean, first = false) {
		const { width, height } = canvas;
		const unit = unitOf(width, height);
		f.size = width ? rand(f.layer.size) * unit * (crystal ? 1.4 : 1) : 0;
		f.x = Math.random() * width * 1.2 - width * 0.1;
		f.y = first ? Math.random() * height : -f.size - Math.random() * height * 0.1;
		f.fall = rand(f.layer.fall) * unit;
		f.sway = rand([6, 18]) * unit;
		f.drift = f.layer.drift;
		f.spin = (Math.random() - 0.5) * 1.2;
		f.phase = Math.random() * Math.PI * 2;
		f.alpha = f.layer.alpha * (0.7 + Math.random() * 0.3);
	}

	function makeSet(layers: Flake['layer'][], key: 'snowDot' | 'snowCrystal') {
		const crystal = key === 'snowCrystal';
		const flakes: Flake[] = layers.map((layer) => {
			const f = { layer } as Flake;
			respawn(f, crystal, true);
			return f;
		});
		const texWidth = () =>
			(context.stateApp.loadedAssets?.[key] as { width?: number } | undefined)?.width || 64;
		return {
			size: flakes.length,
			init: (ps: P[]) => ps.forEach((p) => ((p.anchorX = 0.5), (p.anchorY = 0.5), (p.alpha = 0))),
			update: (ps: P[]) => {
				advance();
				const { width, height } = canvas;
				const tw = texWidth();
				for (let i = 0; i < ps.length; i++) {
					const f = flakes[i];
					// size 0 = spawned while the window had no size yet (hidden tab): try again
					if (f.size === 0 || f.y > height + f.size || f.x > width * 1.15 || f.x < -width * 0.15)
						respawn(f, crystal);
					f.y += f.fall * dt;
					f.x += wind * f.drift * dt;
					const p = ps[i];
					p.x = f.x + Math.sin(f.phase + time * 1.3) * f.sway;
					p.y = f.y;
					p.scaleX = p.scaleY = f.size / tw;
					p.rotation = crystal ? f.phase + f.spin * time : 0;
					p.alpha = f.alpha;
				}
			},
		};
	}

	const dots = makeSet(DOT_LAYERS, 'snowDot');
	const crystals = makeSet(CRYSTAL_LAYERS, 'snowCrystal');
	const dynamicProperties = { position: true, vertex: true, rotation: true, color: true };
</script>

{#if context.stateApp.loadedAssets?.snowDot && context.stateApp.loadedAssets?.snowCrystal}
	<ParticleContainer {dynamicProperties}>
		<Particles key="snowDot" size={dots.size} init={dots.init} update={dots.update} />
	</ParticleContainer>
	<ParticleContainer {dynamicProperties}>
		<Particles key="snowCrystal" size={crystals.size} init={crystals.init} update={crystals.update} />
	</ParticleContainer>
{/if}

{#if context.stateApp.loadedAssets?.frost}
	<Sprite key="frost" width={canvas.width} height={canvas.height} alpha={1} />
{/if}
