<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	import { Rectangle } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { SPEC } from '../game/spec';

	type Props = { oncomplete: () => void };

	const props: Props = $props();
	const context = getContext();
	const accent = parseInt(SPEC.ui.accent.slice(1), 16);
	const dark = parseInt(SPEC.palette[0].slice(1), 16);

	// code transition: a curtain wipes across, covers the screen at its midpoint, then clears
	const t = new Tween(0, { duration: 1 });
	const canvas = $derived(context.stateLayoutDerived.canvasSizes());

	onMount(async () => {
		await t.set(1, { duration: 520, easing: cubicInOut });
		await t.set(2, { duration: 520, easing: cubicInOut });
		props.oncomplete();
	});
	const left = $derived(t.current <= 1 ? canvas.width * (1 - t.current) : canvas.width * -(t.current - 1));
</script>

<Rectangle x={left} y={0} width={canvas.width} height={canvas.height} backgroundColor={dark} zIndex={900} />
<Rectangle x={left + (t.current <= 1 ? 0 : 0)} y={0} width={canvas.width} height={14} backgroundColor={accent} zIndex={901} />
<Rectangle x={left} y={canvas.height - 14} width={canvas.width} height={14} backgroundColor={accent} zIndex={901} />
<Rectangle x={left - 18} y={0} width={18} height={canvas.height} backgroundColor={accent} zIndex={901} />
