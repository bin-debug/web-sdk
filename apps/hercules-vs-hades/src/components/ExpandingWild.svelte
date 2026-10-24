<script lang="ts">
	import { untrack } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Container, SpineProvider, SpineTrack, Sprite, type SpineTrackProps } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { THEME } from '../game/theme';

	type Props = {
		loop: SpineTrackProps['loop'];
		listener?: SpineTrackProps['listener'];
		animationName: SpineTrackProps['animationName'];
	};

	const props: Props = $props();

	// theme art: one tall wild_reel image that grows down the reel, then pops on a win
	const grow = new Tween(THEME.staticSymbols ? 0 : 1);
	const pop = new Tween(1);
	const complete = () => props.listener?.complete?.(undefined as never);

	$effect(() => {
		if (!THEME.staticSymbols) return;
		const animationName = props.animationName;
		untrack(async () => {
			if (animationName === 'wild_expand') {
				await grow.set(1, { duration: 450 / stateBetDerived.timeScale() });
				complete();
			} else if (animationName === 'wild_reveal') {
				grow.set(1, { duration: 0 });
				await pop.set(1.08, { duration: 160 });
				await pop.set(1, { duration: 220 });
				complete();
			}
		});
	});
</script>

{#if THEME.staticSymbols}
	<Container y={-SYMBOL_SIZE * 0.5} scale={{ x: pop.current, y: grow.current * pop.current }}>
		<Sprite
			key="wild_reel.webp"
			anchor={{ x: 0.5, y: 0 }}
			width={SYMBOL_SIZE}
			height={SYMBOL_SIZE * BOARD_DIMENSIONS.y}
		/>
	</Container>
{:else}
	<SpineProvider key="symbols" width={SYMBOL_SIZE * 1.2} height={SYMBOL_SIZE * 1.3}>
		<SpineTrack
			trackIndex={0}
			timeScale={stateBetDerived.timeScale()}
			loop={props.loop}
			listener={props.listener}
			animationName={props.animationName}
		/>
	</SpineProvider>
{/if}
