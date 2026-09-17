<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' }
		| { type: 'boardFramePulse' };
</script>

<script lang="ts">
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();
	const bl = () => context.stateGameDerived.boardLayout();

	// Brief expand/contract on the reel frame when a spin starts — a small
	// "something's about to happen" cue rather than anything load-bearing.
	let frameScale = $state(1);
	let pulseRaf = 0;
	const PULSE_MS = 260;

	function pulseFrame() {
		cancelAnimationFrame(pulseRaf);
		const start = performance.now();
		const tick = (now: number) => {
			const t = now - start;
			if (t >= PULSE_MS) {
				frameScale = 1;
				return;
			}
			const p = t / PULSE_MS;
			frameScale = 1 + Math.sin(p * Math.PI) * 0.035;
			pulseRaf = requestAnimationFrame(tick);
		};
		pulseRaf = requestAnimationFrame(tick);
	}

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => {},
		boardFrameGlowHide: () => {},
		boardFramePulse: () => pulseFrame(),
	});
</script>

<!-- panel fills the frame's measured hole (drawn behind the reels) -->
<Sprite key="bgFrame" anchor={0.5} x={bl().x} y={bl().y} width={bl().width * 1.1152} height={bl().height * 1.1145} zIndex={-2} />

<!-- ornate frame: hole aligned to the board via measured insets -->
<Sprite
	key="reelFrame"
	anchor={0.5}
	x={bl().x + bl().width * -0.0020}
	y={bl().y + bl().height * -0.0044}
	width={bl().width * 1.3083 * frameScale}
	height={bl().height * 1.3122 * frameScale}
	zIndex={0}
/>
