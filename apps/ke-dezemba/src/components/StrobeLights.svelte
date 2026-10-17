<script lang="ts">
	import { onDestroy } from 'svelte';
	import { PIXI, getContextParent } from 'pixi-svelte';
	import { getContext } from '../game/context';

	// Strobe lights: club strobes around the edges of the screen that flash on a win, big win or
	// free spins trigger. Drawn behind the frame and reels, so nothing covers the symbols.
	// Flashes follow the amapiano beat and alternate between the two halves of the lamps, so no
	// lamp flashes more than once a second and the screen under 2 a second (below the 3 Hz
	// photosensitivity limit). Hard white flashes, with a laser-colour fringe on the off-beats.
	//
	// Performance: one shared glow texture, all lamps in one container (one draw call). When no
	// win is showing the container is hidden and its ticker callback is removed, so idle cost
	// is zero; everything is destroyed when the component goes away.
	const context = getContext();
	const parent = getContextParent();
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	const BPM = 110; // bgm_main tempo
	const BEAT_MS = 60000 / BPM;
	const SHOW_MS = 3200; // how long a win keeps the strobes going
	const COLOURS = [0xffffff, 0xffd6e0, 0xd6e4ff, 0xecd9ff]; // white, faintly laser-tinted
	const PER_SIDE = 4; // lamps down each side; top and bottom get 3 each

	function glowTexture() {
		const size = 128;
		const c = document.createElement('canvas');
		c.width = c.height = size;
		const g = c.getContext('2d')!;
		const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
		grad.addColorStop(0, 'rgba(255,255,255,1)');
		grad.addColorStop(0.18, 'rgba(255,255,255,1)');
		grad.addColorStop(0.4, 'rgba(255,255,255,0.5)');
		grad.addColorStop(0.7, 'rgba(255,255,255,0.12)');
		grad.addColorStop(1, 'rgba(255,255,255,0)');
		g.fillStyle = grad;
		g.fillRect(0, 0, size, size);
		return PIXI.Texture.from(c);
	}

	const texture = glowTexture();
	const root = new PIXI.Container();
	root.visible = false;
	const lamps: PIXI.Sprite[] = Array.from({ length: PER_SIDE * 2 + 6 }, () => {
		const s = new PIXI.Sprite(texture);
		s.anchor.set(0.5);
		s.blendMode = 'add';
		root.addChild(s);
		return s;
	});
	parent.addToParent(root);

	// lamps sit on the screen edges, half of each glow off screen
	let placedFor = '';
	function place() {
		const { width: W, height: H } = canvas;
		if (placedFor === `${W}x${H}`) return;
		placedFor = `${W}x${H}`;
		const u = Math.max(Math.min(W, H) / 1000, 0.5);
		let n = 0;
		for (let i = 0; i < PER_SIDE; i++) {
			const y = H * (0.15 + (0.7 * i) / (PER_SIDE - 1));
			lamps[n++].position.set(0, y);
			lamps[n++].position.set(W, y);
		}
		for (let i = 0; i < 3; i++) {
			const x = W * (0.25 + 0.25 * i);
			lamps[n++].position.set(x, 0);
			lamps[n++].position.set(x, H);
		}
		for (const s of lamps) s.width = s.height = 600 * u;
	}

	const ticker = context.stateApp.pixiApplication?.ticker;
	let until = 0;
	let running = false;

	function update() {
		const now = performance.now();
		if (now >= until || !canvas.width) {
			stop();
			return;
		}
		place();
		const beat = Math.floor(now / BEAT_MS);
		const phase = (now % BEAT_MS) / BEAT_MS;
		// hard flash, then a fast fall-off: reads as a strobe, not a pulse
		const flash = phase < 0.08 ? 1 : Math.exp(-(phase - 0.08) * 14);
		const fade = Math.min(1, (until - now) / 600);
		const colour = COLOURS[beat % 4];
		const half = beat % 2;
		for (let i = 0; i < lamps.length; i++) {
			const s = lamps[i];
			s.tint = colour;
			s.alpha = i % 2 === half ? flash * fade : 0;
		}
	}

	function stop() {
		root.visible = false;
		if (running) ticker?.remove(update);
		running = false;
	}

	const strobe = () => {
		until = performance.now() + SHOW_MS;
		place();
		root.visible = true;
		if (!running) ticker?.add(update);
		running = true;
	};
	context.eventEmitter.subscribeOnMount({
		showClusterWinAmounts: strobe,
		winShow: strobe,
		freeSpinIntroShow: strobe,
	});

	onDestroy(() => {
		stop();
		root.destroy({ children: true });
		texture.destroy(true);
	});
</script>
