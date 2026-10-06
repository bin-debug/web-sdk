<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	import { Rectangle } from 'pixi-svelte';
	import { OnMount } from 'components-shared';

	import BoardContainer from './BoardContainer.svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { ACCENT } from '../game/ui';

	// Anticipation: a pulsing frame over the reel that is still spinning while the others have a bonus symbol.
	const context = getContext();
	const pulse = new Tween(0.4);
	onMount(() => {
		let alive = true;
		(async () => {
			while (alive) {
				await pulse.set(1, { duration: 380, easing: sineInOut });
				await pulse.set(0.35, { duration: 380, easing: sineInOut });
			}
		})();
		return () => (alive = false);
	});
	const anticipating = $derived(context.stateGame.board.map((reel) => reel.reelState.anticipating));
	const any = $derived(anticipating.some(Boolean));
</script>

{#if any}
	<OnMount
		onmount={() => {
			context.eventEmitter.broadcast({ type: 'mascotReact', mood: 'anticipate' });
		}}
	/>
{/if}

<BoardContainer>
	{#each anticipating as active, reelIndex}
		{#if active}
			<Rectangle
				x={reelIndex * SYMBOL_SIZE + 3}
				y={-4}
				width={SYMBOL_SIZE - 6}
				height={SYMBOL_SIZE * BOARD_DIMENSIONS.y + 8}
				borderRadius={14}
				borderColor={ACCENT}
				borderWidth={6}
				backgroundColor={ACCENT}
				backgroundAlpha={0.12 * pulse.current}
				alpha={pulse.current}
			/>
		{/if}
	{/each}
</BoardContainer>
