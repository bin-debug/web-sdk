<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { backOut } from 'svelte/easing';

	import { Circle, Container, Text } from 'pixi-svelte';
	import { MainContainer, CanvasSizeRectangle } from 'components-layout';

	import { SYMBOL_SIZE } from '../game/constants';
	import { ACCENT, textStyle } from '../game/ui';
	import { getContext } from '../game/context';

	// Full-screen win scene drawn in code: tier word, big number, falling coins.
	type Props = { title: string | null; countText: string; big: boolean; emit: boolean; y?: number };
	const props: Props = $props();
	const context = getContext();

	const scale = new Tween(0.2);
	const t = new Tween(0, { duration: 1 });
	onMount(() => {
		scale.set(1, { duration: 420, easing: backOut });
		let alive = true;
		const loop = async () => {
			while (alive) {
				await t.set(0, { duration: 0 });
				await t.set(1, { duration: 2200 });
			}
		};
		loop();
		return () => (alive = false);
	});

	const coins = Array.from({ length: 26 }, (_, i) => ({ x: (i * 97) % 1000, speed: 0.6 + ((i * 31) % 10) / 14, offset: (i * 13) % 10 / 10, size: 14 + ((i * 7) % 18) }));
	const main = $derived(context.stateLayoutDerived.mainLayout());
</script>

{#if props.big}
	<CanvasSizeRectangle backgroundColor={0x000000} backgroundAlpha={0.55} />
{/if}

<MainContainer>
	<Container x={main.width * 0.5} y={props.y ?? main.height * 0.46} scale={scale.current}>
		{#if props.title}
			<Text anchor={0.5} y={-SYMBOL_SIZE * 1.5} text={props.title} style={textStyle(SYMBOL_SIZE * 1.0, 0xffe27a, 0x5a1a00)} />
		{/if}
		<Text anchor={0.5} text={props.countText} style={textStyle(props.big ? SYMBOL_SIZE * 1.5 : SYMBOL_SIZE * 0.9, 0xffffff)} />
	</Container>
	{#if props.emit}
		{#each coins as coin}
			{@const p = (t.current * coin.speed + coin.offset) % 1}
			<Circle
				anchor={0.5}
				x={(coin.x / 1000) * main.width}
				y={-60 + p * (main.height + 120)}
				diameter={coin.size * (0.7 + Math.sin((p + coin.offset) * 12) * 0.3)}
				backgroundColor={ACCENT}
				borderColor={0x8a5a00}
				borderWidth={3}
			/>
		{/each}
	{/if}
</MainContainer>
