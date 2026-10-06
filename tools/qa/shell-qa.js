// Paste into a shell page (javascript tool / devtools) after "press to continue". Dev builds only.
// Plays scenario books through the demo RGS and reports how each round ended:
//   shellQA('http://localhost:5119', 'lines_classic', [{ mode: 'BASE', ids: [173] }, { mode: 'BONUS', ids: [3] }])
// then read JSON.stringify(window.__qa). It presses Space whenever the game waits for "press to continue" and gives up after `timeoutMs`.
window.shellQA = (rgs, gameId, scenarios, timeoutMs = 90000) => {
	// returns immediately; poll window.__qa = { done, out } (the javascript tool times out after 45 s)
	window.__qa = { done: false, out: [] };
	(async () => {
	const errors = [];
	const onErr = (e) => errors.push(String(e.error?.stack || e.message || e.reason).slice(0, 300));
	window.addEventListener('error', onErr);
	window.addEventListener('unhandledrejection', onErr);
	const origError = console.error;
	console.error = (...a) => (errors.push(a.map(String).join(' ').slice(0, 300)), origError(...a));
	const out = window.__qa.out;
	const shell = window.__shell;
	for (const sc of scenarios) {
		await fetch(`${rgs}/mock/queue`, { method: 'POST', body: JSON.stringify({ gameId, mode: sc.mode, id: sc.ids }) });
		for (const id of sc.ids) {
			const t0 = performance.now();
			const events = [];
			const before = errors.length;
			shell.stateBet.activeBetModeKey = sc.mode;
			shell.eventEmitter.broadcast({ type: 'bet' });
			let left = false;
			let ok = false;
			while (performance.now() - t0 < timeoutMs) {
				await new Promise((r) => setTimeout(r, 400));
				const v = shell.stateXstate.value;
				if (v !== 'idle') left = true;
				if (left && v === 'idle') {
					ok = true;
					break;
				}
				window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ', bubbles: true }));
				window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space', key: ' ', bubbles: true }));
			}
			out.push({ mode: sc.mode, id, ok, seconds: +((performance.now() - t0) / 1000).toFixed(1), errors: errors.slice(before) });
		}
	}
	window.removeEventListener('error', onErr);
	window.removeEventListener('unhandledrejection', onErr);
	console.error = origError;
	window.__qa.done = true;
	})();
	return 'started';
};
