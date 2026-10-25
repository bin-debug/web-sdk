<script lang="ts">
	import { untrack } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';
	import { Container, SpineProvider, SpineTrack, Sprite, type SpineTrackProps } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';
	import { THEME } from '../game/theme';
	import { clock } from '../game/clock.svelte';

	type Props = {
		loop: SpineTrackProps['loop'];
		listener?: SpineTrackProps['listener'];
		animationName: SpineTrackProps['animationName'];
		// row the wild landed on: theme art grows up and down from there
		row?: number;
	};

	const props: Props = $props();

	// theme art: one tall wild_reel image that bursts out of the landing cell to fill the reel,
	// kept just inside the reel so it sits on the board like the other symbols; pops on a win
	const grow = new Tween(THEME.staticSymbols ? 0 : 1);
	const pop = new Tween(1);
	const flash = new Tween(0);
	const REEL_FIT = 0.96;
	const reelHeight = SYMBOL_SIZE * BOARD_DIMENSIONS.y;
	// y of the landing cell's centre, measured from the top of the reel
	const origin = $derived(((props.row ?? 0) + 0.5) * SYMBOL_SIZE);
	// while it holds the reel, a brighter copy flickers on top like crackling lightning
	const flicker = $derived(
		THEME.staticSymbols && props.animationName === 'wild_loop'
			? Math.max(0, 0.25 * Math.sin(clock.t * 7) + 0.18 * Math.sin(clock.t * 17.3))
			: 0,
	);
	const complete = () => props.listener?.complete?.(undefined as never);

	$effect(() => {
		if (!THEME.staticSymbols) return;
		const animationName = props.animationName;
		untrack(async () => {
			if (animationName === 'wild_expand') {
				const speed = stateBetDerived.timeScale();
				flash.set(1, { duration: 80 / speed });
				await grow.set(1, { duration: 380 / speed, easing: backOut });
				flash.set(0, { duration: 300 / speed });
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
	<!-- the parent places us at the centre of the reel's top cell; work from the reel's top edge -->
	<Container y={-SYMBOL_SIZE * 0.5}>
		<Sprite
			key="glow.webp"
			anchor={0.5}
			y={origin}
			width={SYMBOL_SIZE * 2.2}
			height={reelHeight * 1.1}
			alpha={flash.current * 0.9}
			tint={0x9fdcff}
			blendMode="add"
		/>
		<!-- fit the reel around its centre, then grow from the landing cell -->
		<Container y={reelHeight / 2} scale={pop.current * REEL_FIT}>
			<Container y={origin - reelHeight / 2} scale={{ x: 1, y: grow.current }}>
				<Sprite
					key="wild_reel.webp"
					anchor={{ x: 0.5, y: 0 }}
					y={-origin}
					width={SYMBOL_SIZE}
					height={reelHeight}
				/>
				{#if flicker > 0.01}
					<Sprite
						key="wild_reel.webp"
						anchor={{ x: 0.5, y: 0 }}
						y={-origin}
						width={SYMBOL_SIZE}
						height={reelHeight}
						alpha={flicker}
						blendMode="add"
					/>
				{/if}
			</Container>
		</Container>
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
