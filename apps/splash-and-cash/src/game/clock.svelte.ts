// One requestAnimationFrame loop shared by the small idle animations (mascots, glowing wilds and
// scatters). Reading clock.t inside a component re-renders it every frame, so keep it to a few items.
let seconds = $state(0);
let started = false;

export const clock = {
	get t() {
		if (!started && typeof window !== 'undefined') {
			started = true;
			const tick = (ms: number) => {
				seconds = ms / 1000;
				requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		}
		return seconds;
	},
};
