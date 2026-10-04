<script lang="ts">
	import { SpriteSheet } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		loop?: boolean;
		oncomplete?: () => void;
	};

	const props: Props = $props();
	// Clips are cut at their source fps; Pixi advances animationSpeed frames per 60fps tick.
	const fps = $derived('fps' in props.symbolInfo ? (props.symbolInfo.fps as number) : 24);
</script>

<SpriteSheet
	key={props.symbolInfo.assetKey}
	x={props.x}
	y={props.y}
	anchor={0.5}
	width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
	height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	animationSpeed={fps / 60}
	loop={props.loop ?? false}
	play={true}
	onComplete={() => props.oncomplete?.()}
/>
