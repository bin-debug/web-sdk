<script lang="ts" module>
	export type EmitterEventBoardFrame =
		| { type: 'boardFrameGlowShow' }
		| { type: 'boardFrameGlowHide' };
</script>

<script lang="ts">
	import { Sprite } from 'pixi-svelte';
	import { getContext } from '../game/context';

	const context = getContext();
	const bl = () => context.stateGameDerived.boardLayout();

	context.eventEmitter.subscribeOnMount({
		boardFrameGlowShow: () => {},
		boardFrameGlowHide: () => {},
	});
</script>

<!-- panel fills the frame's measured hole (drawn behind the reels) -->
<Sprite key="bgFrame" anchor={0.5} x={bl().x} y={bl().y} width={bl().width * 1.1868} height={bl().height * 1.2217} zIndex={-2} />

<!-- ornate frame: hole aligned to the board via measured insets -->
<Sprite
	key="reelFrame"
	anchor={0.5}
	x={bl().x + bl().width * 0.0000}
	y={bl().y + bl().height * 0.0070}
	width={bl().width * 1.4560}
	height={bl().height * 1.5448}
	zIndex={0}
/>
