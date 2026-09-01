// Tiny additive screen-shake offset. BoardContainer reads this and adds it to
// its position; anything that wants a shake just calls triggerScreenShake().
export const stateShake = $state({ x: 0, y: 0 });

let raf = 0;

export function triggerScreenShake({
	intensity = 9,
	duration = 240,
}: { intensity?: number; duration?: number } = {}) {
	cancelAnimationFrame(raf);
	const start = performance.now();

	const tick = (now: number) => {
		const t = now - start;
		if (t >= duration) {
			stateShake.x = 0;
			stateShake.y = 0;
			return;
		}
		const decay = 1 - t / duration;
		stateShake.x = Math.sin(t * 0.09 * 7) * intensity * decay;
		stateShake.y = Math.cos(t * 0.09 * 5) * intensity * decay;
		raf = requestAnimationFrame(tick);
	};
	raf = requestAnimationFrame(tick);
}
