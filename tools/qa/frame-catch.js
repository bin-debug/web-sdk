// Paste into a shell page (dev build) after the hidden-pane-raf-shim. Plays one scenario book and freezes the render
// on the first frame where your predicate is true, so a screenshot shows that exact moment (game logic keeps running
// in the background; only drawing stops). Resume with globalThis.__PIXI_APP__.ticker.start().
//   await __catch('http://localhost:5119', 'lines_classic', 318, () => window.__hold.hold.banner === 'FULL GRID!')
// `window.__hold` exists for hold and win; other features can expose their own state the same way.
window.__catch = async (rgs, gameId, id, pred, maxMs = 40000) => {
	const key = () => {
		window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }));
		window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space', key: ' ', bubbles: true }));
	};
	const state = () => window.__shell.stateXstate.value;
	globalThis.__PIXI_APP__.ticker.start();
	// wait until the shell is calm (win screens need a key press), then queue the book and bet
	for (let calm = 0, t = 0; calm < 6 && t < 90000; t += 300) {
		await new Promise((r) => setTimeout(r, 300));
		if (state() === 'idle') calm++;
		else (calm = 0), key();
	}
	await fetch(`${rgs}/mock/queue`, { method: 'POST', body: JSON.stringify({ gameId, mode: 'BASE', id: [id] }) });
	window.__shell.stateBet.activeBetModeKey = 'BASE';
	window.__shell.eventEmitter.broadcast({ type: 'bet' });
	const t0 = performance.now();
	let left = false;
	while (performance.now() - t0 < maxMs) {
		await new Promise((r) => setTimeout(r, 25));
		if (state() !== 'idle') left = true;
		try {
			if (pred()) return (globalThis.__PIXI_APP__.ticker.stop(), `caught after ${Math.round(performance.now() - t0)} ms`);
		} catch {}
		if (left && state() === 'idle') return 'round ended without the frame';
	}
	return 'timeout';
};
