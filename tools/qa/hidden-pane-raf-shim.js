// Paste into the page (devtools / an agent's javascript tool) when testing in a hidden or
// background browser pane. Browsers pause requestAnimationFrame there, which freezes Pixi,
// Spine and Svelte tweens, so the game looks stuck on the loading transition.
// Dev builds only: it imports Vite's pre-bundled pixi module to restart the shared ticker.
(async () => {
	if (!window.__rafPatched) {
		window.__rafPatched = true;
		let id = 0;
		const timers = new Map();
		window.requestAnimationFrame = (cb) => {
			const i = ++id;
			timers.set(i, setTimeout(() => (timers.delete(i), cb(performance.now())), 16));
			return i;
		};
		window.cancelAnimationFrame = (i) => (clearTimeout(timers.get(i)), timers.delete(i));
	}
	const app = globalThis.__PIXI_APP__;
	if (app) (app.ticker.stop(), app.ticker.start());
	const urls = performance
		.getEntriesByType('resource')
		.map((e) => e.name)
		.filter((n) => /\.vite\/deps\/pixi__js\.js/.test(n));
	for (const u of urls) {
		const m = await import(u);
		if (m.Ticker?.shared) (m.Ticker.shared.stop(), m.Ticker.shared.start());
	}
	return 'raf shim active';
})();
