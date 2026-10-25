<script lang="ts">
	import { Container, Graphics, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';
	import { clock } from '../game/clock.svelte';

	// The in-game logo, centred on (x, y): it pulses gently, slow light rays turn behind it with a
	// warm glow, and small sparkles twinkle over the lettering.
	type Props = { x: number; y: number; width: number; height: number };

	const props: Props = $props();
	const context = getContext();
	const t = $derived(clock.t);
	const pulse = $derived(1 + 0.035 * Math.sin(t * 2.2));
	const hasGlow = $derived(!!context.stateApp.loadedAssets?.['glow.webp']);

	// fixed spots over the lettering (fractions of the logo size), each twinkling on its own beat
	const SPARKLES = [
		[-0.36, -0.22],
		[0.3, -0.3],
		[0.05, -0.05],
		[-0.18, 0.24],
		[0.38, 0.18],
		[-0.42, 0.05],
	];
	const RAYS = 14;
</script>

<Container x={props.x} y={props.y}>
	<!-- light rays: soft additive wedges that slowly turn -->
	<Graphics
		rotation={t * 0.12}
		alpha={0.22 + 0.06 * Math.sin(t * 1.6)}
		blendMode="add"
		draw={(g) => {
			const r = props.width * 0.72;
			for (let i = 0; i < RAYS; i++) {
				const a = (i / RAYS) * Math.PI * 2;
				const half = Math.PI / RAYS / 2.4;
				g.moveTo(0, 0)
					.lineTo(Math.cos(a - half) * r, Math.sin(a - half) * r)
					.lineTo(Math.cos(a + half) * r, Math.sin(a + half) * r)
					.closePath();
			}
			g.fill(0xffd987);
		}}
	/>
	{#if hasGlow}
		<Sprite
			key="glow.webp"
			anchor={0.5}
			width={props.width * 1.35}
			height={props.height * 1.25}
			tint={0xffc95a}
			alpha={0.45 + 0.15 * Math.sin(t * 2.2)}
			blendMode="add"
		/>
	{/if}
	<Container scale={pulse}>
		<Sprite key="themeLogo" anchor={0.5} width={props.width} height={props.height} />
		{#each SPARKLES as [fx, fy], i}
			{@const twinkle = Math.max(0, Math.sin(t * 2.6 + i * 1.9)) ** 4}
			{#if twinkle > 0.02}
				<Graphics
					x={fx * props.width}
					y={fy * props.height}
					scale={0.4 + twinkle}
					rotation={t * 1.5 + i}
					alpha={twinkle}
					blendMode="add"
					draw={(g) => {
						const s = props.height * 0.09;
						g.poly([0, -s, s * 0.18, -s * 0.18, s, 0, s * 0.18, s * 0.18, 0, s, -s * 0.18, s * 0.18, -s, 0, -s * 0.18, -s * 0.18]).fill(0xffffff);
						g.circle(0, 0, s * 0.22).fill(0xfff2c0);
					}}
				/>
			{/if}
		{/each}
	</Container>
</Container>
