<script lang="ts">
	import { Container, Sprite } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';

	import { getContext } from '../game/context';

	const context = getContext();
	const logo = $derived(context.stateGameDerived.composition().logo);
	// keep the texture's own aspect ratio
	const aspect = $derived.by(() => {
		const tex = context.stateApp.loadedAssets?.['logo.game'] as { width: number; height: number } | undefined;
		return tex && tex.height ? tex.width / tex.height : 3;
	});
	const inFeature = $derived(context.stateGame.gameType === 'freegame');
	const h = $derived(Math.min(logo.width / aspect, 150));
	const w = $derived(h * aspect);
</script>

{#if !inFeature || context.stateLayoutDerived.layoutType() !== 'portrait'}
	<MainContainer>
		<Container x={logo.x} y={logo.y} zIndex={50}>
			<Sprite key="logo.game" anchor={0.5} width={w} height={h} />
		</Container>
	</MainContainer>
{/if}
