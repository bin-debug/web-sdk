<script lang="ts">
	import { untrack } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Container, Sprite } from 'pixi-svelte';

	import { getSymbolInfo } from '../game/utils';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		symbolInfo: ReturnType<typeof getSymbolInfo>;
		oncomplete?: () => void;
		// flat theme art has no win animation, so a win pops the sprite instead
		pulse?: boolean;
	};

	const props: Props = $props();
	const scale = new Tween(1);

	$effect(() => {
		props.symbolInfo;
		if (!props.pulse) {
			props.oncomplete?.();
			return;
		}
		untrack(async () => {
			await scale.set(1.18, { duration: 180 });
			await scale.set(1, { duration: 260 });
			props.oncomplete?.();
		});
	});
</script>

<Container x={props.x} y={props.y} scale={scale.current}>
	<Sprite
		anchor={0.5}
		key={props.symbolInfo.assetKey}
		width={SYMBOL_SIZE * props.symbolInfo.sizeRatios.width}
		height={SYMBOL_SIZE * props.symbolInfo.sizeRatios.height}
	/>
</Container>
