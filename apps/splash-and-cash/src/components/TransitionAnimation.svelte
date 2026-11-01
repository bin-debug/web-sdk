<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { Graphics, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { stateBetDerived } from 'state-shared';

	import { getContext } from '../game/context';
	import { THEME } from '../game/theme';

	type Props = {
		oncomplete: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	// THEME.film: an old-cartoon iris wipe instead of the stock spine: a black circle closes on the
	// centre of the screen, holds for a beat, then opens again
	const iris = new Tween(1);
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());
	const fullRadius = $derived(Math.hypot(canvas.width, canvas.height) / 2 + 4);

	if (THEME.film) {
		(async () => {
			const speed = stateBetDerived.timeScale();
			await iris.set(0, { duration: 520 / speed, easing: cubicIn });
			await new Promise((resolve) => setTimeout(resolve, 220 / speed));
			await iris.set(1, { duration: 520 / speed, easing: cubicOut });
			props.oncomplete();
		})();
	}
</script>

{#if THEME.film}
	<Graphics
		draw={(g) => {
			g.rect(0, 0, canvas.width, canvas.height).fill(0x0a0a0a);
			if (iris.current > 0.001) {
				g.circle(canvas.width / 2, canvas.height / 2, fullRadius * iris.current).cut();
			}
		}}
	/>
{:else}
	<SpineProvider
		key="transition"
		x={canvas.width * 0.5}
		y={canvas.height * 0.5}
		height={canvas.height * 1.7}
	>
		<SpineTrack
			trackIndex={0}
			animationName={'animation'}
			listener={{
				complete: props.oncomplete,
			}}
		/>
	</SpineProvider>
{/if}
